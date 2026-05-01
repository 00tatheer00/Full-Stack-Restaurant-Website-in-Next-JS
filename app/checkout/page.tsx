"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useCart } from "@/components/cart-provider";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clear } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const deliveryFee = items.length > 0 ? 2.5 : 0;
  const total = subtotal + deliveryFee;

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const payment = String(formData.get("payment") ?? "stripe");

    const payload = {
      items: items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      deliveryFee,
    };

    try {
      if (payment === "stripe") {
        const response = await fetch("/api/checkout/stripe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await response.json();
        if (!response.ok) {
          if (response.status === 401) {
            router.push("/login");
            return;
          }
          throw new Error(data.error ?? "Failed to create Stripe checkout session.");
        }
        if (data.url) {
          clear();
          window.location.href = data.url;
          return;
        }
      } else {
        const response = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await response.json();
        if (!response.ok) {
          if (response.status === 401) {
            router.push("/login");
            return;
          }
          throw new Error(data.error ?? "Failed to place order.");
        }
        clear();
        router.push(`/order-success?orderId=${data.order.id}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="papzi-shell py-10">
        <div className="rounded-3xl border border-dashed border-zinc-300 bg-white p-10 text-center">
          <h1 className="text-2xl font-black text-zinc-900">Checkout is empty</h1>
          <p className="mt-2 text-zinc-600">Add products to cart to continue.</p>
          <Link
            href="/shop"
            className="mt-4 inline-flex rounded-full border border-zinc-900 px-6 py-3 text-xs font-bold uppercase tracking-[0.08em] text-zinc-900 transition hover:border-[#f1252b] hover:bg-[#f1252b] hover:text-white"
          >
            Go to shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="papzi-shell py-10">
      <h1 className="text-4xl font-black text-zinc-900">Checkout</h1>
      <p className="mt-1 text-zinc-600">Fill in delivery details and place your order.</p>

      <form onSubmit={onSubmit} className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-4 rounded-3xl border border-zinc-200 bg-white p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="First name" name="firstName" />
            <Field label="Last name" name="lastName" />
          </div>
          <Field label="Phone number" name="phone" type="tel" />
          <Field label="Email address" name="email" type="email" />
          <Field label="Delivery address" name="address" />
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="City" name="city" />
            <Field label="Area" name="area" />
            <Field label="Zip code" name="zip" />
          </div>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-zinc-700">Payment method</span>
            <select
              required
              name="payment"
              defaultValue="stripe"
              className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-pink-500"
            >
              <option value="stripe">Stripe (Card)</option>
              <option value="cod">Cash on Delivery</option>
            </select>
          </label>
        </div>

        <aside className="h-fit rounded-3xl border border-zinc-200 bg-white p-5">
          <h2 className="text-xl font-black text-zinc-900">Order summary</h2>
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
          <button
            type="submit"
            disabled={loading}
            className="mt-5 inline-flex w-full justify-center rounded-full border border-zinc-900 px-5 py-3 text-xs font-bold uppercase tracking-[0.08em] text-zinc-900 transition hover:border-[#f1252b] hover:bg-[#f1252b] hover:text-white"
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
          {error ? <p className="mt-3 text-xs font-medium text-red-600">{error}</p> : null}
          <p className="mt-2 text-xs text-zinc-500">Sign in is required before placing orders.</p>
        </aside>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-zinc-700">{label}</span>
      <input
        required
        type={type}
        name={name}
        defaultValue={defaultValue}
        className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-[#f1252b]"
      />
    </label>
  );
}
