import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin-dashboard";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/admin");
  }
  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  const [products, orders] = await Promise.all([
    prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        slug: true,
        category: true,
        price: true,
        active: true,
      },
    }),
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { name: true, email: true },
        },
      },
      take: 50,
    }),
  ]);

  return (
    <div className="section-shell py-10">
      <h1 className="text-3xl font-bold text-zinc-900">Admin Panel</h1>
      <p className="mt-1 text-zinc-600">Manage catalog and order lifecycle.</p>
      <div className="mt-6">
        <AdminDashboard
          initialProducts={products}
          initialOrders={orders.map((order) => ({
            id: order.id,
            status: order.status,
            total: order.total,
            createdAt: order.createdAt.toISOString(),
            user: {
              name: order.user.name,
              email: order.user.email ?? "unknown",
            },
          }))}
        />
      </div>
    </div>
  );
}
