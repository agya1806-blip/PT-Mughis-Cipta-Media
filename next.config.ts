import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.vercel-storage.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/tentang-kami",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/kontak",
        permanent: true,
      },
      {
        source: "/company/faq",
        destination: "/faq",
        permanent: true,
      },
      {
        source: "/books/:path*",
        destination: "/katalog",
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
