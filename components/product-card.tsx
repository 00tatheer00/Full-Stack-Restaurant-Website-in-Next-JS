"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <article className="papzi-product-card">
      <div className="papzi-product-image">
        <Image src={product.image} alt={product.name} fill className="object-cover" />
        {product.popular ? (
          <span className="absolute left-3 top-3 rounded-full bg-[#f1252b] px-3 py-1 text-xs font-semibold text-white">
            Popular
          </span>
        ) : null}
      </div>
      <div className="papzi-product-meta">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p>{product.category}</p>
            <h3>{product.name}</h3>
          </div>
        </div>
        <p className="line-clamp-2 text-sm text-zinc-600">{product.description}</p>
        <div className="flex items-center justify-between text-xs text-zinc-500">
          <span>⭐ {product.rating.toFixed(1)}</span>
          <span>{product.eta}</span>
        </div>
        <div>
          <span>${product.price.toFixed(2)}</span>
          <button
            onClick={() => addToCart(product)}
            className="rounded-full border border-zinc-900 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em] transition hover:border-[#f1252b] hover:bg-[#f1252b] hover:text-white"
          >
            Add to cart
          </button>
          <Link
            href={`/shop/${product.slug}`}
            className="rounded-full border border-zinc-300 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-zinc-700 transition hover:border-zinc-900 hover:text-zinc-900"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
