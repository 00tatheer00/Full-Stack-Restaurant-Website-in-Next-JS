import Link from "next/link";

const offers = [
  { title: "Combo Rush", desc: "Buy 2 large pizzas and get 1 drink free.", code: "COMBORUSH" },
  { title: "Burger Night", desc: "Flat 20% off on all burger meals.", code: "BURGER20" },
  { title: "First Order", desc: "15% discount for new customers.", code: "WELCOME15" },
];

export default function OffersPage() {
  return (
    <div className="papzi-shell py-10">
      <div className="papzi-shop-hero">
        <h1>Offers</h1>
        <p>Exclusive deals curated to match the Papzi-style campaign experience.</p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {offers.map((offer) => (
          <article key={offer.code} className="rounded-3xl border border-zinc-200 bg-white p-6">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#f1252b]">Hot deal</p>
            <h2 className="mt-2 text-2xl font-black text-zinc-900">{offer.title}</h2>
            <p className="mt-2 text-zinc-600">{offer.desc}</p>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.08em] text-zinc-500">
              Code: {offer.code}
            </p>
            <Link
              href="/shop"
              className="mt-4 inline-flex rounded-full border border-zinc-900 px-5 py-2 text-xs font-bold uppercase tracking-[0.08em] text-zinc-900 transition hover:border-[#f1252b] hover:bg-[#f1252b] hover:text-white"
            >
              Order now
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
