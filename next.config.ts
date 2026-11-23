import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // Font files never change in place (a new version gets a new file name), so browsers may keep them.
  async headers() {
    return [
      {
        source: "/fonts/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
  turbopack: {
    root: process.cwd(),
  },
  images: {
    qualities: [75, 82, 84],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "**.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "**.fbcdn.net",
      },
    ],
  },
};

export default nextConfig;
