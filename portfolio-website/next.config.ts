import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets a second dev server (e.g. `npm run dev:drafts`) run alongside the normal one.
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
