import Image from "next/image";
import Link from "next/link";

type HomeProduct = {
  id: number;
  slug: string;
  name: string;
  image: string;
  price: number;
  category: string;
};

export function FeaturedProducts({
  title,
  products,
  accent = false,
}: {
  title: string;
  products: HomeProduct[];
  accent?: boolean;
}) {
  return (
    <section className={`papzi-shell ${accent ? "papzi-accent-section" : ""}`}>
      <div className="papzi-section-head">
        <div>
          <p className="papzi-section-kicker">Curated menu</p>
          <h2>{title}</h2>
        </div>
        <Link href="/shop">View all</Link>
      </div>
      <div className="papzi-product-grid">
        {products.map((product) => (
          <article key={product.id} className="papzi-product-card">
            <Link href={`/shop/${product.slug}`} className="papzi-product-image">
              <Image src={product.image} alt={product.name} fill className="object-cover" />
            </Link>
            <div className="papzi-product-meta">
              <p>{product.category}</p>
              <h3>
                <Link href={`/shop/${product.slug}`}>{product.name}</Link>
              </h3>
              <div>
                <span>${product.price.toFixed(2)}</span>
                <Link href={`/shop/${product.slug}`}>View product</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
