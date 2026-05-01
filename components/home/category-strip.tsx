import Image from "next/image";
import Link from "next/link";
import { papziCollections } from "@/lib/papzi-home-data";

export function CategoryStrip() {
  return (
    <section className="papzi-shell papzi-cat-wrap">
      <div className="papzi-categories">
        {papziCollections.map((item) => (
          <Link key={item.name} href={item.href} className="papzi-category-card">
            <div className="papzi-category-image">
              <Image src={item.image} alt={item.name} fill className="object-cover" />
            </div>
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
