import { CategoryStrip } from "@/components/home/category-strip";
import { FeaturedProducts } from "@/components/home/featured-products";
import { Hero } from "@/components/home/hero";
import { NewsStrip } from "@/components/home/news-strip";
import { PromoBanners } from "@/components/home/promo-banners";
import { Testimonials } from "@/components/home/testimonials";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [featured, popular] = await Promise.all([
    prisma.product.findMany({
      where: { popular: true, active: true },
      take: 8,
      orderBy: { rating: "desc" },
    }),
    prisma.product.findMany({
      where: { active: true },
      take: 8,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <>
      <Hero />
      <CategoryStrip />
      <FeaturedProducts title="Trending Recipes" products={featured} />
      <PromoBanners />
      <FeaturedProducts title="Best Seller Foods" products={popular} accent />
      <Testimonials />
      <NewsStrip />
    </>
  );
}
