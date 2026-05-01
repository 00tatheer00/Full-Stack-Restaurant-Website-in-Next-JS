import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const createOrderSchema = z.object({
  items: z.array(
    z.object({
      productId: z.number().int().positive(),
      quantity: z.number().int().positive(),
    }),
  ),
  deliveryFee: z.number().min(0),
});

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const where = session.user.role === "ADMIN" ? {} : { userId: session.user.id };

  const orders = await prisma.order.findMany({
    where,
    include: {
      items: {
        include: {
          product: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ orders });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = createOrderSchema.safeParse(body);
  if (!parsed.success || parsed.data.items.length === 0) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const productIds = parsed.data.items.map((item) => item.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds }, active: true },
  });

  if (products.length !== productIds.length) {
    return NextResponse.json({ error: "Some products are unavailable" }, { status: 400 });
  }

  const subtotal = parsed.data.items.reduce((sum, item) => {
    const product = products.find((entry) => entry.id === item.productId);
    return sum + (product?.price ?? 0) * item.quantity;
  }, 0);

  const order = await prisma.order.create({
    data: {
      userId: session.user.id,
      subtotal,
      deliveryFee: parsed.data.deliveryFee,
      total: subtotal + parsed.data.deliveryFee,
      items: {
        create: parsed.data.items.map((item) => {
          const product = products.find((entry) => entry.id === item.productId)!;
          return {
            productId: product.id,
            quantity: item.quantity,
            unitPrice: product.price,
            productName: product.name,
            productImage: product.image,
          };
        }),
      },
    },
    include: {
      items: true,
    },
  });

  return NextResponse.json({ order }, { status: 201 });
}
