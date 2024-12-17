import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    
  },
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
      "via.placeholder.com",
    ]
  }
};

export default nextConfig;
