import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "dq4bmu8usrok56nc-98179514675.shopifypreview.com",
      },
    ],
  },
};

export default nextConfig;
