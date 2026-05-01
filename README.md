# PandaBite - Full Stack Restaurant Ecommerce (Next.js)

PandaBite is a full-stack food ecommerce web application built with Next.js App Router, featuring a premium Papzi-inspired UI, authentication, real backend APIs, Stripe checkout support, user order history, and an admin panel for products and orders.

## Table of Contents

- [Overview](#overview)
- [Core Features](#core-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [Database and Seeding](#database-and-seeding)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [Authentication and Roles](#authentication-and-roles)
- [Payment Flow (Stripe)](#payment-flow-stripe)
- [Scripts](#scripts)
- [Deployment Notes](#deployment-notes)
- [Demo Credentials](#demo-credentials)

## Overview

This project includes:

- Marketing + ecommerce frontend with a polished food-commerce design
- Product catalog, product details, cart, and checkout flows
- Credentials-based authentication with role-aware navigation
- Persistent cart state and order creation APIs
- Stripe Checkout session creation + webhook order status updates
- User order history page
- Admin dashboard to manage products and order statuses

## Core Features

- **Home experience**
  - Papzi-inspired landing with hero, categories, featured products, promos, testimonials, and news.
- **Commerce flow**
  - Shop listing with category filters
  - Product details pages
  - Cart with quantity updates and summary
  - Checkout (Stripe card + Cash on Delivery paths)
- **Auth**
  - Register and login using credentials
  - Session-aware UI and protected pages
- **Orders**
  - User-specific order history
  - Admin order status updates (`PENDING`, `PAID`, `PROCESSING`, `COMPLETED`, `CANCELLED`)
- **Admin**
  - Product creation from dashboard
  - Order monitoring and state management

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + custom CSS modules in `globals.css`
- **Database ORM:** Prisma
- **Database:** SQLite (local development)
- **Authentication:** NextAuth (credentials provider) + Prisma adapter
- **Payments:** Stripe Checkout + Stripe Webhooks
- **Validation:** Zod

## Project Structure

```text
app/
  api/
    auth/
    checkout/
    orders/
    products/
    webhooks/
  shop/
  cart/
  checkout/
  account/
  admin/
components/
  home/
  admin-dashboard.tsx
  cart-provider.tsx
lib/
  auth.ts
  prisma.ts
  stripe.ts
  products.ts
  papzi-home-data.ts
prisma/
  schema.prisma
  migrations/
  seed.ts
types/
  next-auth.d.ts
```

## Setup and Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd first-proj
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables (see `.env` section below).

4. Run migrations and seed:

```bash
npm run db:migrate
npm run db:seed
```

5. Start development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create a `.env` file in the project root (already ignored by git) with:

```env
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="change-this-to-a-long-random-secret"
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
```

### Notes

- `NEXTAUTH_SECRET` should be a strong random secret in production.
- For Stripe card payments, `STRIPE_SECRET_KEY` is required.
- For webhook verification, `STRIPE_WEBHOOK_SECRET` is required.

## Database and Seeding

- Prisma schema is defined in `prisma/schema.prisma`.
- Migrations are created under `prisma/migrations`.
- Seed script (`prisma/seed.ts`) inserts:
  - Demo admin user
  - Demo customer user
  - Initial product catalog

## Running the Project

### Development

```bash
npm run dev
```

### Production build

```bash
npm run build
npm run start
```

## API Endpoints

### Auth

- `POST /api/auth/register` - Register a new user
- `GET|POST /api/auth/[...nextauth]` - NextAuth handler

### Products

- `GET /api/products` - Get active products
- `POST /api/products` - Create product (admin only)
- `GET /api/products/[slug]` - Get product by slug

### Orders

- `GET /api/orders` - Get orders (admin: all, customer: own)
- `POST /api/orders` - Create order (authenticated users)
- `PATCH /api/orders/[id]` - Update order status (admin only)

### Checkout / Webhooks

- `POST /api/checkout/stripe` - Create Stripe checkout session and order
- `POST /api/webhooks/stripe` - Stripe webhook for payment completion

## Authentication and Roles

Two roles are used:

- `CUSTOMER`
- `ADMIN`

Access control:

- Admin dashboard (`/admin`) is restricted to `ADMIN`.
- User order page (`/account/orders`) requires authentication.
- Admin-only product/order mutations are guarded in API routes.

## Payment Flow (Stripe)

1. User submits checkout with Stripe payment method.
2. Backend creates an order in DB (`PENDING`) and creates Stripe Checkout session.
3. User is redirected to Stripe.
4. Stripe webhook (`checkout.session.completed`) updates order status to `PAID`.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:migrate` - Run Prisma migrations
- `npm run db:seed` - Seed database
- `npm run db:studio` - Open Prisma Studio

## Deployment Notes

- Use a production database (e.g., Postgres) instead of SQLite for real deployments.
- Set secure production values for all environment variables.
- Configure Stripe webhook endpoint to:
  - `/api/webhooks/stripe`
- Ensure server runtime can access Prisma client and DB path/connection.

## Demo Credentials

After seeding:

- **Admin**
  - Email: `admin@pandabite.local`
  - Password: `admin123`
- **Customer**
  - Email: `user@pandabite.local`
  - Password: `user1234`
