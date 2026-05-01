export default function AboutPage() {
  return (
    <div className="section-shell py-10">
      <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-zinc-900">About PandaBite</h1>
        <p className="mt-3 max-w-3xl text-zinc-600">
          PandaBite is a premium food ecommerce concept inspired by modern delivery platforms.
          We focus on clean design, delightful UX, and a complete ordering flow from discovery to
          checkout.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Card title="Curated Menus" text="Hand-picked products designed for quick browsing and fast decisions." />
          <Card title="Smooth Checkout" text="Simple, elegant checkout that keeps customer focus on completion." />
          <Card title="Fast Experience" text="Built with Next.js for responsive performance and scalable growth." />
        </div>
      </div>
    </div>
  );
}

function Card({ title, text }: { title: string; text: string }) {
  return (
    <article className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
      <h2 className="text-lg font-semibold text-zinc-900">{title}</h2>
      <p className="mt-2 text-sm text-zinc-600">{text}</p>
    </article>
  );
}
