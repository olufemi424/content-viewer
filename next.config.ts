import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Ensure content files are included in the serverless function bundle
  outputFileTracingIncludes: {
    "/*": ["./content/**/*"],
  },
};

export default nextConfig;
