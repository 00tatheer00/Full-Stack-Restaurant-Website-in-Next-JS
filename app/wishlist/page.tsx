import Link from "next/link";

export default function WishlistPage() {
  return (
    <div className="papzi-shell py-10">
      <div className="papzi-shop-hero">
        <h1>Wishlist</h1>
        <p>Save favorite meals and revisit them anytime for quick reordering.</p>
      </div>

      <div className="mt-8 rounded-3xl border border-dashed border-zinc-300 bg-white p-10 text-center">
        <h2 className="text-2xl font-black text-zinc-900">No favorites yet</h2>
        <p className="mt-2 text-zinc-600">Start exploring the menu and save dishes you love.</p>
        <Link
          href="/shop"
          className="mt-5 inline-flex rounded-full border border-zinc-900 px-6 py-3 text-xs font-bold uppercase tracking-[0.08em] text-zinc-900 transition hover:border-[#f1252b] hover:bg-[#f1252b] hover:text-white"
        >
          Explore shop
        </Link>
      </div>
    </div>
  );
}
