import { Product } from "@/lib/types";

export const products: Product[] = [
  {
    id: 1,
    slug: "truffle-mushroom-pizza",
    name: "Truffle Mushroom Pizza",
    category: "Pizza",
    description: "Wood-fired crust, creamy truffle sauce, mushrooms, and parmesan.",
    price: 17.9,
    rating: 4.9,
    eta: "25-35 min",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80",
    popular: true,
  },
  {
    id: 2,
    slug: "spicy-chicken-burger",
    name: "Spicy Chicken Burger",
    category: "Burgers",
    description: "Crispy chicken, chili mayo, lettuce, cheddar, and potato bun.",
    price: 12.5,
    rating: 4.7,
    eta: "20-30 min",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80",
    popular: true,
  },
  {
    id: 3,
    slug: "avocado-grain-bowl",
    name: "Avocado Grain Bowl",
    category: "Healthy",
    description: "Quinoa, avocado, kale, edamame, seeds, and citrus dressing.",
    price: 13.4,
    rating: 4.8,
    eta: "15-25 min",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    slug: "double-cheese-burger",
    name: "Double Cheese Burger",
    category: "Burgers",
    description: "Two beef patties, molten cheddar, pickles, and house sauce.",
    price: 14.9,
    rating: 4.6,
    eta: "20-30 min",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    slug: "ruby-berry-cheesecake",
    name: "Ruby Berry Cheesecake",
    category: "Desserts",
    description: "Creamy baked cheesecake with fresh berries and berry compote.",
    price: 7.9,
    rating: 4.9,
    eta: "10-20 min",
    image:
      "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 6,
    slug: "matcha-latte-cooler",
    name: "Matcha Latte Cooler",
    category: "Drinks",
    description: "Iced ceremonial matcha, oat milk, and vanilla cloud.",
    price: 5.6,
    rating: 4.5,
    eta: "10-15 min",
    image:
      "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 7,
    slug: "garden-margherita-pizza",
    name: "Garden Margherita Pizza",
    category: "Pizza",
    description: "San Marzano tomato sauce, fresh basil, and mozzarella di bufala.",
    price: 15.2,
    rating: 4.8,
    eta: "20-30 min",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 8,
    slug: "protein-power-salad",
    name: "Protein Power Salad",
    category: "Healthy",
    description: "Grilled chicken, chickpeas, greens, cucumber, feta, and lemon.",
    price: 12.2,
    rating: 4.4,
    eta: "15-25 min",
    image:
      "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=1200&q=80",
  },
];

export const categories = ["All", "Pizza", "Burgers", "Healthy", "Desserts", "Drinks"] as const;

export const getProductBySlug = (slug: string) =>
  products.find((product) => product.slug === slug);

export const getProductById = (id: number) =>
  products.find((product) => product.id === id);
