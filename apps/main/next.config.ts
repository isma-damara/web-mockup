import type { NextConfig } from "next";

const distDir = process.env.NEXT_DIST_DIR?.trim();

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/ui", "@workspace/lib"],
  experimental: {
    externalDir: true,
  },
  ...(distDir ? { distDir } : {}),
};

export default nextConfig;
