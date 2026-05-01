export type Category = "Pizza" | "Burgers" | "Healthy" | "Desserts" | "Drinks";

export type Product = {
  id: number;
  slug: string;
  name: string;
  category: string;
  description: string;
  price: number;
  rating: number;
  eta: string;
  image: string;
  popular?: boolean;
};

export type CartItem = {
  productId: number;
  slug: string;
  name: string;
  category: string;
  image: string;
  price: number;
  quantity: number;
};
