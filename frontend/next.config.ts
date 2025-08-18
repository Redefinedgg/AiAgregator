import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React Strict Mode to catch potential issues early
  reactStrictMode: false,
  
  // Performance optimizations
  poweredByHeader: false,
  compress: true,

  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
  
  // Webpack configuration for better bundle optimization
  webpack: (config, { isServer }) => {
    // Optimize bundle size
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    
    return config;
  },

  // Headers for better caching strategy
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=31536000, stale-while-revalidate=86400",
          },
        ],
      },
      // Specific caching for API routes
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Cache-Control", 
            value: "public, s-maxage=10, stale-while-revalidate=59",
          },
        ],
      },
      // No cache for dynamic pages that might cause hydration issues
      {
        source: "/chat/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
    ];
  },
}

export default nextConfig;