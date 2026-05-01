import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { getProductBySlug } from "@/lib/products";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailsPage({ params }: Props) {
  const resolved = await params;
  let product = null;

  try {
    product = await prisma.product.findUnique({
      where: { slug: resolved.slug, active: true },
    });
  } catch {
    product = getProductBySlug(resolved.slug) ?? null;
  }

  if (!product) {
    notFound();
  }

  return (
    <div className="papzi-shell py-10">
      <div className="mb-6">
        <Link href="/shop" className="text-xs font-bold uppercase tracking-[0.08em] text-[#f1252b]">
          ← Back to shop
        </Link>
      </div>
      <div className="papzi-product-detail">
        <div className="relative min-h-[420px] overflow-hidden rounded-3xl border border-zinc-200">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
        </div>
        <div className="space-y-4 rounded-3xl border border-zinc-200 bg-white p-7">
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#f1252b]">{product.category}</p>
          <h1 className="text-4xl font-black text-zinc-900">{product.name}</h1>
          <p className="text-zinc-600 leading-7">{product.description}</p>
          <div className="flex items-center gap-4 text-sm text-zinc-500">
            <span>⭐ {product.rating.toFixed(1)}</span>
            <span>{product.eta}</span>
          </div>
          <p className="text-3xl font-bold text-[#f1252b]">${product.price.toFixed(2)}</p>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
