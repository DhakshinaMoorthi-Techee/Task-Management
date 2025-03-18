import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export", // Ensures static export
  images: {
    unoptimized: true, // Required if using Next.js Image component
  },
};

export default nextConfig;
