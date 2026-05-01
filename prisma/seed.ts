import bcrypt from "bcryptjs";
import { PrismaClient, UserRole } from "../lib/generated/prisma/client";
import { products } from "../lib/products";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash("admin123", 10);
  const userPassword = await bcrypt.hash("user1234", 10);

  await prisma.user.upsert({
    where: { email: "admin@pandabite.local" },
    update: {
      name: "Admin",
      role: UserRole.ADMIN,
      passwordHash: adminPassword,
    },
    create: {
      name: "Admin",
      email: "admin@pandabite.local",
      role: UserRole.ADMIN,
      passwordHash: adminPassword,
    },
  });

  await prisma.user.upsert({
    where: { email: "user@pandabite.local" },
    update: {
      name: "Demo User",
      role: UserRole.CUSTOMER,
      passwordHash: userPassword,
    },
    create: {
      name: "Demo User",
      email: "user@pandabite.local",
      role: UserRole.CUSTOMER,
      passwordHash: userPassword,
    },
  });

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        category: product.category,
        description: product.description,
        price: product.price,
        rating: product.rating,
        eta: product.eta,
        image: product.image,
        popular: Boolean(product.popular),
      },
      create: {
        slug: product.slug,
        name: product.name,
        category: product.category,
        description: product.description,
        price: product.price,
        rating: product.rating,
        eta: product.eta,
        image: product.image,
        popular: Boolean(product.popular),
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
