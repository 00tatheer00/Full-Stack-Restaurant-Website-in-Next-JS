"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useCart } from "@/components/cart-provider";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/offers", label: "Offers" },
  { href: "/blog", label: "Blog" },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
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
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 text-xs font-bold uppercase md:hidden"
          aria-label="Toggle menu"
        >
          Menu
        </button>
        <Link href="/" className="text-2xl font-black tracking-tight text-[#f1252b] md:mr-0">
          PandaBite
        </Link>
        <nav className="hidden items-center gap-7 text-[13px] font-bold uppercase tracking-[0.08em] md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            if (link.href === "/shop") {
              return (
                <div key={link.href} className="group relative">
                  <Link
                    href={link.href}
                    className={`transition ${
                      isActive ? "text-[#f1252b]" : "text-zinc-700 hover:text-[#f1252b]"
                    }`}
                  >
                    {link.label}
                  </Link>
                  <div className="pointer-events-none absolute left-0 top-full z-30 mt-4 min-w-[360px] rounded-2xl border border-zinc-200 bg-white p-4 opacity-0 shadow-xl transition-all group-hover:pointer-events-auto group-hover:opacity-100">
                    <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-zinc-500">
                      Shop categories
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-bold uppercase tracking-[0.08em] text-zinc-700">
                      <Link href="/shop?category=Pizza" className="rounded-lg px-2 py-2 hover:bg-zinc-50">
                        Pizza
                      </Link>
                      <Link
                        href="/shop?category=Burgers"
                        className="rounded-lg px-2 py-2 hover:bg-zinc-50"
                      >
                        Burgers
                      </Link>
                      <Link
                        href="/shop?category=Healthy"
                        className="rounded-lg px-2 py-2 hover:bg-zinc-50"
                      >
                        Healthy
                      </Link>
                      <Link
                        href="/shop?category=Desserts"
                        className="rounded-lg px-2 py-2 hover:bg-zinc-50"
                      >
                        Desserts
                      </Link>
                    </div>
                  </div>
                </div>
              );
            }
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
      {mobileOpen ? (
        <div className="border-b border-zinc-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3 text-xs font-bold uppercase tracking-[0.08em] text-zinc-700">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Link href="/wishlist" onClick={() => setMobileOpen(false)}>
              Wishlist
            </Link>
            <Link href="/track-order" onClick={() => setMobileOpen(false)}>
              Track Order
            </Link>
            {session?.user ? (
              <Link href="/account/orders" onClick={() => setMobileOpen(false)}>
                My Orders
              </Link>
            ) : (
              <Link href="/login" onClick={() => setMobileOpen(false)}>
                Login
              </Link>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
