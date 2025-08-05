// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "/**",
      },
      // ✅ Add the new UploadThing subdomain
      {
        protocol: "https",
        hostname: "05z3nnmdtq.ufs.sh",
        port: "",
        pathname: "/**",
      },
      // ✅ Add wildcard pattern for UploadThing subdomains
      {
        protocol: "https",
        hostname: "*.ufs.sh",
        port: "",
        pathname: "/**",
      },
      // Backup for other UploadThing domains
      {
        protocol: "https",
        hostname: "uploadthing.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
