import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Отключаем статическую генерацию для полного SSR
  output: undefined, // или не указывать вообще

  // Принудительное использование SSR
  isrMemorySize: 0,

  // Настройки для лучшей производительности SSR
  poweredByHeader: false,
  compress: true,

  // Если нужно кэширование
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=10, stale-while-revalidate=59",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
