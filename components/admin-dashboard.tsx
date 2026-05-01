"use client";

import { useState } from "react";

type AdminProduct = {
  id: number;
  name: string;
  slug: string;
  category: string;
  price: number;
  active: boolean;
};

type AdminOrder = {
  id: string;
  status: "PENDING" | "PAID" | "PROCESSING" | "COMPLETED" | "CANCELLED";
  total: number;
  createdAt: string;
  user: { name: string | null; email: string };
};

const ORDER_STATUSES = ["PENDING", "PAID", "PROCESSING", "COMPLETED", "CANCELLED"] as const;

export function AdminDashboard({
  initialProducts,
  initialOrders,
}: {
  initialProducts: AdminProduct[];
  initialOrders: AdminOrder[];
}) {
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [message, setMessage] = useState<string | null>(null);

  const createProduct = async (formData: FormData) => {
    setMessage(null);
    const payload = {
      slug: String(formData.get("slug")),
      name: String(formData.get("name")),
      category: String(formData.get("category")),
      description: String(formData.get("description")),
      price: Number(formData.get("price")),
      rating: Number(formData.get("rating")),
      eta: String(formData.get("eta")),
      image: String(formData.get("image")),
      popular: formData.get("popular") === "on",
      active: true,
    };

    const response = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!response.ok) {
      setMessage(data.error ?? "Failed to create product.");
      return;
    }
    setProducts((prev) => [data.product, ...prev]);
    setMessage("Product added successfully.");
  };

  const updateOrderStatus = async (orderId: string, status: AdminOrder["status"]) => {
    const response = await fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      setMessage("Failed to update order status.");
      return;
    }
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status } : order)));
    setMessage("Order updated.");
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-zinc-900">Add Product</h2>
        <form
          action={async (formData) => {
            await createProduct(formData);
          }}
          className="mt-4 grid gap-3 sm:grid-cols-2"
        >
          <Input name="name" label="Name" />
          <Input name="slug" label="Slug" />
          <Input name="category" label="Category" />
          <Input name="eta" label="ETA" />
          <Input name="price" label="Price" type="number" step="0.01" />
          <Input name="rating" label="Rating" type="number" step="0.1" />
          <Input name="image" label="Image URL" className="sm:col-span-2" />
          <Input name="description" label="Description" className="sm:col-span-2" />
          <label className="inline-flex items-center gap-2 text-sm font-medium text-zinc-700">
            <input name="popular" type="checkbox" className="h-4 w-4" />
            Mark as popular
          </label>
          <button className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-600">
            Save Product
          </button>
        </form>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-zinc-900">Orders</h2>
        <div className="mt-4 space-y-3">
          {orders.map((order) => (
            <article key={order.id} className="rounded-xl border border-zinc-200 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-zinc-900">#{order.id.slice(0, 8)}</p>
                  <p className="text-xs text-zinc-500">
                    {order.user.name ?? "Customer"} ({order.user.email})
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-zinc-700">${order.total.toFixed(2)}</span>
                  <select
                    value={order.status}
                    onChange={(event) =>
                      updateOrderStatus(order.id, event.target.value as AdminOrder["status"])
                    }
                    className="rounded-lg border border-zinc-300 px-2 py-1 text-sm"
                  >
                    {ORDER_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-zinc-900">Products ({products.length})</h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {products.map((product) => (
            <div key={product.id} className="rounded-xl border border-zinc-200 p-3 text-sm">
              <p className="font-semibold text-zinc-900">{product.name}</p>
              <p className="text-zinc-500">
                {product.category} - ${product.price.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </section>
      {message ? <p className="text-sm font-medium text-pink-600">{message}</p> : null}
    </div>
  );
}

function Input({
  name,
  label,
  type = "text",
  className,
  step,
}: {
  name: string;
  label: string;
  type?: string;
  className?: string;
  step?: string;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="mb-1 block text-sm font-medium text-zinc-700">{label}</span>
      <input
        required
        type={type}
        name={name}
        step={step}
        className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-pink-500"
      />
    </label>
  );
}
