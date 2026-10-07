import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Lets a second dev server (e.g. `npm run dev:drafts`) run alongside the normal one.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // A stray ~/yarn.lock made Next infer the home folder as the workspace root
  turbopack: { root: path.resolve(__dirname) },
};

export default nextConfig;
