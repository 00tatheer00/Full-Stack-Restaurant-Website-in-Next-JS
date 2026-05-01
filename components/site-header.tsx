"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useCart } from "@/components/cart-provider";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { data: session } = useSession();
  const isAdmin = (session?.user as { role?: string } | undefined)?.role === "ADMIN";

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="border-b border-zinc-200 bg-zinc-50">
        <div className="mx-auto flex w-full max-w-[1320px] items-center justify-between px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-600 sm:px-6">
          <p>Free delivery on orders above $30</p>
          <p className="hidden md:block">Open daily 9:00 AM - 1:00 AM</p>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-[1320px] items-center justify-between border-b border-zinc-200 px-4 py-4 sm:px-6">
        <Link href="/" className="text-2xl font-black tracking-tight text-[#f1252b]">
          PandaBite
        </Link>
        <nav className="hidden items-center gap-7 text-[13px] font-bold uppercase tracking-[0.08em] md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition ${
                  isActive ? "text-[#f1252b]" : "text-zinc-700 hover:text-[#f1252b]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          {session?.user ? (
            <>
              <Link
                href="/account/orders"
                className={`transition ${
                  pathname === "/account/orders"
                    ? "text-[#f1252b]"
                    : "text-zinc-700 hover:text-[#f1252b]"
                }`}
              >
                My Orders
              </Link>
              {isAdmin ? (
                <Link
                  href="/admin"
                  className={`transition ${
                    pathname.startsWith("/admin")
                      ? "text-[#f1252b]"
                      : "text-zinc-700 hover:text-[#f1252b]"
                  }`}
                >
                  Admin
                </Link>
              ) : null}
            </>
          ) : (
            <Link
              href="/login"
              className={`transition ${
                pathname === "/login" ? "text-[#f1252b]" : "text-zinc-700 hover:text-[#f1252b]"
              }`}
            >
              Login
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-900 px-4 py-2 text-[12px] font-bold uppercase tracking-[0.08em] text-zinc-900 transition hover:border-[#f1252b] hover:bg-[#f1252b] hover:text-white"
          >
            Cart
            <span className="rounded-full bg-zinc-900 px-2 py-0.5 text-[10px] text-white">{totalItems}</span>
          </Link>
          {session?.user ? (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="rounded-full border border-zinc-300 px-4 py-2 text-[12px] font-bold uppercase tracking-[0.08em] text-zinc-700 transition hover:border-zinc-600"
            >
              Logout
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
