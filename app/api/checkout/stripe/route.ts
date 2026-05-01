import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

const payloadSchema = z.object({
  items: z.array(
    z.object({
      productId: z.number().int().positive(),
      quantity: z.number().int().positive(),
    }),
  ),
});

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe is not configured. Add STRIPE_SECRET_KEY in .env." },
      { status: 500 },
    );
  }

  const parsed = payloadSchema.safeParse(await request.json());
  if (!parsed.success || parsed.data.items.length === 0) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const products = await prisma.product.findMany({
    where: {
      id: { in: parsed.data.items.map((item) => item.productId) },
      active: true,
    },
  });

  if (products.length !== parsed.data.items.length) {
    return NextResponse.json({ error: "Unavailable items in cart." }, { status: 400 });
  }

  const subtotal = parsed.data.items.reduce((sum, item) => {
    const product = products.find((entry) => entry.id === item.productId);
    return sum + (product?.price ?? 0) * item.quantity;
  }, 0);
  const deliveryFee = 2.5;
  const total = subtotal + deliveryFee;

  const order = await prisma.order.create({
    data: {
      userId: session.user.id,
      subtotal,
      deliveryFee,
      total,
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
  });

  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
  const stripeSession = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      ...parsed.data.items.map((item) => {
        const product = products.find((entry) => entry.id === item.productId)!;
        return {
          quantity: item.quantity,
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              images: [product.image],
              description: product.description,
            },
            unit_amount: Math.round(product.price * 100),
          },
        };
      }),
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          product_data: {
            name: "Delivery Fee",
          },
          unit_amount: Math.round(deliveryFee * 100),
        },
      },
    ],
    customer_email: session.user.email ?? undefined,
    success_url: `${baseUrl}/order-success?orderId=${order.id}`,
    cancel_url: `${baseUrl}/checkout`,
    metadata: {
      orderId: order.id,
    },
  });

  await prisma.order.update({
    where: { id: order.id },
    data: { stripeSessionId: stripeSession.id },
  });

  return NextResponse.json({ url: stripeSession.url });
}
