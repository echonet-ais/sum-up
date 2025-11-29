import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel 배포를 위한 설정
  output: "standalone",
  
  // 환경 변수 설정
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
};

export default nextConfig;

