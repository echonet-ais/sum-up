// 테스트 환경 설정
import { vi } from "vitest";

// 환경 변수 모킹
process.env.NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "http://localhost:54321";
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "test-key";

// 전역 모킹 설정
global.console = {
  ...console,
  // 테스트 중 불필요한 로그 숨기기
  log: vi.fn(),
  debug: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
};

