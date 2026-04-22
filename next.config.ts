import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.103"],
  async rewrites() {
        return [
            {
                source: "/backend/:path*",
                destination: `${process.env.NEXT_PUBLIC_RUSTECH_API_URL}/:path*`,
            },
        ];
    },
};

export default nextConfig;
