import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'framerusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'app.circle.so',
      },
      {
        protocol: 'https',
        hostname: 'assets-v2.circle.so',
      },
      {
        protocol: 'https',
        hostname: 'photos.smugmug.com',
      },
    ],
  },
};

export default nextConfig;
