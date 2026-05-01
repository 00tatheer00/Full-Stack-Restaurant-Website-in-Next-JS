import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="papzi-shell pt-0">
      <div className="papzi-hero">
        <Image
          src="https://dq4bmu8usrok56nc-98179514675.shopifypreview.com/cdn/shop/files/4-1.jpg?v=1775012618&width=2400"
          alt="Papzi style hero burger and pizza spread"
          fill
          priority
          className="object-cover"
        />
        <div className="papzi-hero-overlay" />
        <div className="papzi-hero-content">
          <span className="papzi-hero-kicker">Hot deal</span>
          <h1>
            Combo Pizza
            <br />
            With Special Price
          </h1>
          <p>Buy any 2 large pizzas and get a 1.5L Pepsi free</p>
          <div className="papzi-hero-discount">Up to 30% off this weekend</div>
          <Link href="/shop">Order now</Link>
        </div>
      </div>
    </section>
  );
}
