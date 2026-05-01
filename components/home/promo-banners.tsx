import Image from "next/image";
import Link from "next/link";

export function PromoBanners() {
  return (
    <section className="papzi-shell papzi-promo-grid">
      <article className="papzi-promo-card">
        <Image
          src="https://dq4bmu8usrok56nc-98179514675.shopifypreview.com/cdn/shop/files/bg-home-4.png?v=1775012650"
          alt="Background pattern"
          fill
          className="object-cover opacity-30"
        />
        <div>
          <p>Today deal</p>
          <h3>Extra cheesy pizza party combo</h3>
          <Link href="/shop">Shop now</Link>
        </div>
      </article>
      <article className="papzi-promo-card papzi-promo-card-light">
        <div>
          <p>Limited offer</p>
          <h3>Take 15% off your first order</h3>
          <Link href="/shop">Claim offer</Link>
        </div>
      </article>
    </section>
  );
}
