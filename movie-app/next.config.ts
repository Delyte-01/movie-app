import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // Disables ESLint during builds
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**", // TMDB image paths always start with /t/p/
      },
    ],
  },


};

export default nextConfig;
