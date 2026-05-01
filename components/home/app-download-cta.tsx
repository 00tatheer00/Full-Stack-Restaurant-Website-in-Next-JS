import Link from "next/link";

export function AppDownloadCta() {
  return (
    <section className="papzi-shell mt-12">
      <div className="papzi-app-cta">
        <div>
          <p>Mobile experience</p>
          <h2>Download PandaBite app for faster ordering</h2>
          <p className="papzi-app-sub">
            Reorder your favorites, track deliveries, and access exclusive app-only offers.
          </p>
        </div>
        <div className="papzi-app-actions">
          <Link href="/shop">App Store</Link>
          <Link href="/shop">Google Play</Link>
        </div>
      </div>
    </section>
  );
}
