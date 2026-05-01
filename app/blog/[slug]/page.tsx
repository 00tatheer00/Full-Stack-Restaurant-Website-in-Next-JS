import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/blog-posts";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BlogDetailsPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="papzi-shell py-10">
      <Link href="/blog" className="text-xs font-bold uppercase tracking-[0.08em] text-[#f1252b]">
        ← Back to blog
      </Link>

      <article className="mt-6 overflow-hidden rounded-3xl border border-zinc-200 bg-white">
        <div className="relative h-72 w-full md:h-96">
          <Image src={post.image} alt={post.title} fill className="object-cover" />
        </div>
        <div className="p-6 md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#f1252b]">
            {post.category}
          </p>
          <h1 className="mt-2 text-4xl font-black text-zinc-900">{post.title}</h1>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.08em] text-zinc-500">
            {post.date}
          </p>
          <div className="mt-6 space-y-4 text-zinc-700">
            {post.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
