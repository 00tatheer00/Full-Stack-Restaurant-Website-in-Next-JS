export default function ContactPage() {
  return (
    <div className="section-shell py-10">
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-zinc-900">Contact Us</h1>
          <p className="mt-2 text-zinc-600">
            For support, partnerships, or feedback, reach out and our team will respond quickly.
          </p>
          <div className="mt-6 space-y-2 text-sm text-zinc-700">
            <p>Email: hello@pandabite.local</p>
            <p>Phone: +92 300 0000000</p>
            <p>Office: Lahore, Pakistan</p>
          </div>
        </section>
        <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <form className="space-y-4">
            <Field label="Full name" name="name" />
            <Field label="Email" name="email" type="email" />
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-zinc-700">Message</span>
              <textarea
                required
                name="message"
                rows={5}
                className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-pink-500"
              />
            </label>
            <button
              type="submit"
              className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-pink-600"
            >
              Send Message
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-zinc-700">{label}</span>
      <input
        required
        type={type}
        name={name}
        className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-pink-500"
      />
    </label>
  );
}
