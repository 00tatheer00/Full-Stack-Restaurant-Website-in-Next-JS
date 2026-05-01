import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-posts";

export default function BlogPage() {
  return (
    <div className="papzi-shell py-10">
      <div className="papzi-shop-hero">
        <h1>Food Journal</h1>
        <p>Stories, recipes, and ingredient insights inspired by modern restaurant culture.</p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {blogPosts.map((post) => (
          <article key={post.slug} className="papzi-news-card">
            <Link href={`/blog/${post.slug}`} className="papzi-news-image">
              <Image src={post.image} alt={post.title} fill className="object-cover" />
            </Link>
            <div>
              <span>{post.category}</span>
              <h3>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              <p className="mt-2 text-sm text-zinc-600">{post.excerpt}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.08em] text-zinc-500">
                {post.date}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
