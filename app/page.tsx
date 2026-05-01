import { CategoryStrip } from "@/components/home/category-strip";
import { FeaturedProducts } from "@/components/home/featured-products";
import { GalleryStrip } from "@/components/home/gallery-strip";
import { Hero } from "@/components/home/hero";
import { NewsStrip } from "@/components/home/news-strip";
import { PromoBanners } from "@/components/home/promo-banners";
import { AppDownloadCta } from "@/components/home/app-download-cta";
import { ServiceHighlights } from "@/components/home/service-highlights";
import { Testimonials } from "@/components/home/testimonials";
import { prisma } from "@/lib/prisma";
import { products as fallbackProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function Home() {
  let featured = fallbackProducts.filter((item) => item.popular).slice(0, 8);
  let popular = fallbackProducts.slice(0, 8);

  try {
    const dbData = await Promise.all([
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

    featured = dbData[0];
    popular = dbData[1];
  } catch {
    // Fall back to static catalog when local DB is unavailable.
  }

  return (
    <>
      <Hero />
      <CategoryStrip />
      <FeaturedProducts title="Trending Recipes" products={featured} />
      <PromoBanners />
      <ServiceHighlights />
      <FeaturedProducts title="Best Seller Foods" products={popular} accent />
      <Testimonials />
      <AppDownloadCta />
      <NewsStrip />
      <GalleryStrip />
    </>
  );
}
