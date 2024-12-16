import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    
  },
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
    ]
  }
};

export default nextConfig;
