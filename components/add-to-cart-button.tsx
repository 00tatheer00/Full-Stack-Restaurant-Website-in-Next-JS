"use client";

import { useCart } from "@/components/cart-provider";
import { Product } from "@/lib/types";

export function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product)}
      className="rounded-full border border-zinc-900 px-7 py-3 text-xs font-bold uppercase tracking-[0.09em] text-zinc-900 transition hover:border-[#f1252b] hover:bg-[#f1252b] hover:text-white"
    >
      Add to Cart
    </button>
  );
}
