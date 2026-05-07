import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.103"],
  async rewrites() {
        return [
            {
                source: "/backend/:path*",
                destination: `${process.env.RUSTECH_API_URL}/:path*`,
            },
        ];
    },
};

export default nextConfig;
