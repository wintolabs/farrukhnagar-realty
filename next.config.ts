import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["utfs.io"], // ✅ allow UploadThing image domain
  },
};

export default nextConfig;
