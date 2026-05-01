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
        <div className="papzi-product-head">
          <div>
            <p>{product.category}</p>
            <h3>{product.name}</h3>
          </div>
        </div>
        <p className="papzi-product-desc line-clamp-2">{product.description}</p>
        <div className="papzi-product-rating">
          <span>⭐ {product.rating.toFixed(1)}</span>
          <span>{product.eta}</span>
        </div>
        <div className="papzi-product-actions">
          <span>${product.price.toFixed(2)}</span>
          <button
            onClick={() => addToCart(product)}
            className="papzi-product-btn"
          >
            Add to cart
          </button>
          <Link
            href={`/shop/${product.slug}`}
            className="papzi-product-btn papzi-product-btn-muted"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
