import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The home directory contains a stray package-lock.json that Turbopack would
  // otherwise try to use; pinning the root keeps dependency resolution in the project.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
