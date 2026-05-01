import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <div className="section-shell py-16">
      <div className="mx-auto max-w-2xl rounded-3xl border border-zinc-200 bg-white p-10 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-pink-600">Order placed</p>
        <h1 className="mt-2 text-3xl font-bold text-zinc-900">Your meal is on the way!</h1>
        <p className="mt-3 text-zinc-600">
          Thanks for ordering with PandaBite. We have sent your confirmation and the rider will
          reach soon.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/shop"
            className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-pink-600"
          >
            Order Again
          </Link>
          <Link
            href="/"
            className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-700 transition hover:border-zinc-900 hover:text-zinc-900"
          >
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
