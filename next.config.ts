import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ddragon.leagueoflegends.com",
        port: "",
        pathname: "/cdn/15.5.1/img/profileicon/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
