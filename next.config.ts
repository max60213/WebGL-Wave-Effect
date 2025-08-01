import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.glsl$/,
      type: 'asset/source',
    });
    return config;
  },
};

export default nextConfig;