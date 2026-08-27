import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  agentRules: false,
  output: "export",
  basePath: "/traceability",
  assetPrefix: "/traceability",
  trailingSlash: true,
  images: { unoptimized: true },
};
export default nextConfig;
