import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Matches the live site's URL format so existing links and rankings carry over.
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
