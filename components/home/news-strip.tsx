import Image from "next/image";
import Link from "next/link";
import { papziNews } from "@/lib/papzi-home-data";

export function NewsStrip() {
  return (
    <section className="papzi-shell papzi-news-wrap">
      <div className="papzi-section-head">
        <h2>Latest News</h2>
        <Link href="/about">Read all</Link>
      </div>
      <div className="papzi-news-grid">
        {papziNews.map((post) => (
          <article key={post.title} className="papzi-news-card">
            <Link href={post.href} className="papzi-news-image">
              <Image src={post.image} alt={post.title} fill className="object-cover" />
            </Link>
            <div>
              <span>{post.category}</span>
              <h3>
                <Link href={post.href}>{post.title}</Link>
              </h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
