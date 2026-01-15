import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Note: If you deploy to https://<user>.github.io/<repo>, you might need to set basePath: '/<repo>'
};

export default nextConfig;
