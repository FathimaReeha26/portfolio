import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: deploys to Vercel or GitHub Pages with no server.
  // For a GitHub Pages *project* site (username.github.io/portfolio/),
  // set basePath: "/portfolio" (see README deploy notes).
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
