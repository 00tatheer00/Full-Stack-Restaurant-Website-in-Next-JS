import { ProductCard } from "@/components/product-card";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export default async function ShopPage({ searchParams }: Props) {
  const params = await searchParams;
  const selected = params.category ?? "All";

  const [allCategories, filtered] = await Promise.all([
    prisma.product.findMany({
      where: { active: true },
      select: { category: true },
      distinct: ["category"],
      orderBy: { category: "asc" },
    }),
    prisma.product.findMany({
      where:
        selected === "All"
          ? { active: true }
          : { active: true, category: selected },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const categories = ["All", ...allCategories.map((entry) => entry.category)];

  return (
    <div className="papzi-shell py-10">
      <div className="papzi-shop-hero">
        <h1>Shop Menu</h1>
        <p>Choose your favorite flavors, handcrafted for fast premium delivery.</p>
      </div>

      <div className="mb-6 mt-8 flex flex-wrap gap-2">
        {categories.map((category) => {
          const active = category === selected;
          const href = category === "All" ? "/shop" : `/shop?category=${encodeURIComponent(category)}`;
          return (
            <Link
              key={category}
              href={href}
              className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[0.08em] transition ${
                active
                  ? "bg-[#f1252b] text-white"
                  : "border border-zinc-300 bg-white text-zinc-700 hover:border-[#f1252b] hover:text-[#f1252b]"
              }`}
            >
              {category}
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-10 text-center text-zinc-600">
          No items found for this category.
        </div>
      ) : (
        <div className="papzi-product-grid">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
