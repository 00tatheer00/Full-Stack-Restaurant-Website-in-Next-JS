export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  date: string;
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "simple-mills-almond-flour",
    title: "Simple Mills Almond Flour",
    category: "News",
    excerpt: "How almond flour changes texture, taste, and nutrition in fast-casual baking.",
    image:
      "https://dq4bmu8usrok56nc-98179514675.shopifypreview.com/cdn/shop/articles/Blog-1.jpg?v=1774328121&width=1200",
    date: "May 1, 2026",
    content: [
      "Almond flour gives a richer texture while keeping recipes lighter and gluten-friendly.",
      "For restaurant menus, it helps create premium baked options with a distinctive flavor profile.",
      "At PandaBite, we pair it with balanced toppings to keep indulgence and nutrition in harmony.",
    ],
  },
  {
    slug: "king-arthur-00-pizza-flour",
    title: "King Arthur 00 Pizza Flour",
    category: "Insights",
    excerpt: "Why fine 00 flour creates smoother dough and a better crust structure.",
    image:
      "https://dq4bmu8usrok56nc-98179514675.shopifypreview.com/cdn/shop/articles/Blog-2.jpg?v=1774328089&width=1200",
    date: "May 2, 2026",
    content: [
      "00 flour is milled extra fine, making dough stretch easier with fewer tears.",
      "It bakes into a balanced crust: crisp edges with a softer center bite.",
      "Using high hydration and controlled fermentation amplifies aroma and chew quality.",
    ],
  },
];

export const getBlogPostBySlug = (slug: string) =>
  blogPosts.find((post) => post.slug === slug);
