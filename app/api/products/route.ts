import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const productSchema = z.object({
  slug: z.string().min(3),
  name: z.string().min(2),
  category: z.string().min(2),
  description: z.string().min(10),
  price: z.number().positive(),
  rating: z.number().min(0).max(5),
  eta: z.string().min(3),
  image: z.url(),
  popular: z.boolean().optional(),
  active: z.boolean().optional(),
});

export async function GET() {
  const products = await prisma.product.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = productSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const product = await prisma.product.create({
    data: parsed.data,
  });

  return NextResponse.json({ product }, { status: 201 });
}
