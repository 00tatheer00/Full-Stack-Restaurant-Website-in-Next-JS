"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart-provider";

export default function CartPage() {
  const { items, increase, decrease, remove, subtotal } = useCart();
  const deliveryFee = items.length > 0 ? 2.5 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="papzi-shell py-10">
      <h1 className="text-4xl font-black text-zinc-900">Your Cart</h1>
      <p className="mt-1 text-zinc-600">Review your selected meals before checkout.</p>

      {items.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-dashed border-zinc-300 bg-white p-10 text-center">
          <p className="text-zinc-600">Your cart is empty.</p>
          <Link
            href="/shop"
            className="mt-4 inline-flex rounded-full border border-zinc-900 px-6 py-3 text-xs font-bold uppercase tracking-[0.08em] text-zinc-900 transition hover:border-[#f1252b] hover:bg-[#f1252b] hover:text-white"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-4">
            {items.map((item) => {
              return (
                <article
                  key={item.productId}
                  className="flex flex-col gap-4 rounded-3xl border border-zinc-200 bg-white p-5 sm:flex-row"
                >
                  <div className="relative h-28 w-full overflow-hidden rounded-xl sm:w-36">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-1 items-start justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-semibold text-zinc-900">{item.name}</h2>
                      <p className="text-sm text-zinc-600">{item.category}</p>
                      <p className="mt-1 text-sm font-semibold text-zinc-800">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <div className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-2 py-1">
                        <button
                          onClick={() => decrease(item.productId)}
                          className="h-7 w-7 rounded-full text-zinc-700 transition hover:bg-zinc-100"
                        >
                          -
                        </button>
                        <span className="min-w-5 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increase(item.productId)}
                          className="h-7 w-7 rounded-full text-zinc-700 transition hover:bg-zinc-100"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => remove(item.productId)}
                        className="text-xs font-semibold text-pink-600 hover:text-pink-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="h-fit rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <h3 className="text-xl font-black text-zinc-900">Order Summary</h3>
            <div className="mt-4 space-y-2 text-sm text-zinc-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="mt-3 border-t border-zinc-200 pt-3 text-base font-semibold text-zinc-900">
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <Link
              href="/checkout"
              className="mt-5 inline-flex w-full justify-center rounded-full border border-zinc-900 px-5 py-3 text-xs font-bold uppercase tracking-[0.08em] text-zinc-900 transition hover:border-[#f1252b] hover:bg-[#f1252b] hover:text-white"
            >
              Proceed to Checkout
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
