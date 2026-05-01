export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-[#111] text-zinc-300">
      <div className="mx-auto grid w-full max-w-[1320px] gap-8 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <p className="text-2xl font-black text-[#f1252b]">PandaBite</p>
          <p className="mt-3 max-w-xs text-sm leading-6 text-zinc-400">
            Fast food and premium delivery experience inspired by Papzi aesthetics.
          </p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-white">Explore</p>
          <p>Home</p>
          <p>Shop</p>
          <p>Blog</p>
          <p>Contact</p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-white">Support</p>
          <p>FAQs</p>
          <p>Track order</p>
          <p>Privacy policy</p>
          <p>Terms & conditions</p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-white">Contact</p>
          <p>hello@pandabite.local</p>
          <p>+92 300 0000000</p>
          <p>Lahore, Pakistan</p>
        </div>
      </div>
      <div className="border-t border-zinc-800 py-4 text-center text-xs text-zinc-500">
        Copyright 2026 PandaBite. All rights reserved.
      </div>
    </footer>
  );
}
