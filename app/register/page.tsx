"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(data.error ?? "Failed to register.");
      return;
    }

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);
    router.push("/");
    router.refresh();
  };

  return (
    <div className="section-shell py-12">
      <div className="mx-auto max-w-md rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-zinc-900">Create your account</h1>
        <p className="mt-1 text-sm text-zinc-600">Join and start ordering premium meals.</p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <Field label="Full name" name="name" type="text" />
          <Field label="Email" name="email" type="email" />
          <Field label="Password" name="password" type="password" />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-pink-600"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
          {error ? <p className="text-xs font-medium text-red-600">{error}</p> : null}
        </form>
        <p className="mt-5 text-sm text-zinc-600">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-pink-600 hover:text-pink-700">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

function Field({ label, name, type }: { label: string; name: string; type: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-zinc-700">{label}</span>
      <input
        required
        minLength={type === "password" ? 6 : undefined}
        name={name}
        type={type}
        className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-pink-500"
      />
    </label>
  );
}
