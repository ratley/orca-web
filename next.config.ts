import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/*": ["./ORCA_REFERENCE.md"],
  },
};

export default nextConfig;
