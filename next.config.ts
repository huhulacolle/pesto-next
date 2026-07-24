import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: "standalone",
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  images: {
    // unoptimized: false,
    remotePatterns: [new URL(`${process.env.API_URL}/image/**`)],
    dangerouslyAllowLocalIP: process.env.NODE_ENV == "development",
  },
  cacheComponents: true,
};

export default nextConfig;
;
