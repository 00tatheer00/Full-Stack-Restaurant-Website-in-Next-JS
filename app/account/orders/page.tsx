import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AccountOrdersPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/account/orders");
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: {
      items: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="section-shell py-10">
      <h1 className="text-3xl font-bold text-zinc-900">My Orders</h1>
      <p className="mt-1 text-zinc-600">Track your recent orders and statuses.</p>

      {orders.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-zinc-300 bg-white p-10 text-center">
          <p className="text-zinc-600">No orders yet.</p>
          <Link
            href="/shop"
            className="mt-4 inline-flex rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-pink-600"
          >
            Start Ordering
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {orders.map((order) => (
            <article key={order.id} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-zinc-500">Order #{order.id.slice(0, 8)}</p>
                  <p className="text-sm text-zinc-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700">
                  {order.status}
                </span>
              </div>
              <div className="mt-4 space-y-2 text-sm text-zinc-600">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>
                      {item.productName} x {item.quantity}
                    </span>
                    <span>${(item.unitPrice * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 border-t border-zinc-200 pt-3 text-right font-semibold text-zinc-900">
                Total: ${order.total.toFixed(2)}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
