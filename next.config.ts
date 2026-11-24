import type { NextConfig } from "next";

/**
 * The container runs the standalone server. Vercel sets VERCEL=1 and keeps
 * using its own build output, so this branch stays off there.
 */
const containerOutput: Pick<NextConfig, "output"> = process.env.VERCEL
  ? {}
  : { output: "standalone" };

const nextConfig: NextConfig = {
  ...containerOutput,
  images: {
    qualities: [75, 100],
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
