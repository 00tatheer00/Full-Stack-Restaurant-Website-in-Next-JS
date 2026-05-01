import Link from "next/link";

export default function TrackOrderPage() {
  return (
    <div className="papzi-shell py-10">
      <div className="papzi-shop-hero">
        <h1>Track Order</h1>
        <p>Track your current orders and delivery status in a single place.</p>
      </div>

      <div className="mt-8 rounded-3xl border border-zinc-200 bg-white p-8">
        <h2 className="text-2xl font-black text-zinc-900">Where is my order?</h2>
        <p className="mt-2 max-w-2xl text-zinc-600">
          Sign in and open your order history to see progress updates like `PENDING`, `PAID`,
          `PROCESSING`, and `COMPLETED`.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/account/orders"
            className="rounded-full border border-zinc-900 px-6 py-3 text-xs font-bold uppercase tracking-[0.08em] text-zinc-900 transition hover:border-[#f1252b] hover:bg-[#f1252b] hover:text-white"
          >
            Go to My Orders
          </Link>
          <Link
            href="/login"
            className="rounded-full border border-zinc-300 px-6 py-3 text-xs font-bold uppercase tracking-[0.08em] text-zinc-700 transition hover:border-zinc-900 hover:text-zinc-900"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
