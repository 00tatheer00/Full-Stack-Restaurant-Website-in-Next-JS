const faqs = [
  {
    q: "How long does delivery take?",
    a: "Most deliveries arrive within 20-35 minutes depending on your area and order volume.",
  },
  {
    q: "Can I schedule an order?",
    a: "Yes, you can place an order and choose a preferred delivery time during checkout.",
  },
  {
    q: "Do you support card payments?",
    a: "Yes. We support Stripe card checkout, plus cash on delivery where available.",
  },
  {
    q: "How do I track my order?",
    a: "Open your account order history and check the latest order status updates in real time.",
  },
];

export default function FaqsPage() {
  return (
    <div className="papzi-shell py-10">
      <div className="papzi-shop-hero">
        <h1>FAQs</h1>
        <p>Find answers about delivery, payments, orders, and account support.</p>
      </div>
      <div className="mt-8 space-y-4">
        {faqs.map((item) => (
          <article key={item.q} className="rounded-2xl border border-zinc-200 bg-white p-5">
            <h2 className="text-lg font-bold text-zinc-900">{item.q}</h2>
            <p className="mt-2 text-zinc-600">{item.a}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
