import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "/gh/devicons/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "fmblbxbwvaemmzhuiwou.supabase.co",
      },
    ],
    formats: ["image/avif", "image/webp"],
    // The Devicon/Simple-Icons brand logos are SVGs; next/image refuses to serve
    // SVGs (400) unless this is on. Safe here — every SVG source is trusted
    // (pinned Devicon CDN + our own public/brand). CSP hardens the served files.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
