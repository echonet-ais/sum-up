/**
 * Supabase Client (서버 사이드)
 * Next.js API Routes 및 Server Components에서 사용하는 Supabase 클라이언트
 */

import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
  );
}

/**
 * 서버 사이드에서 사용하는 Supabase 클라이언트
 * 쿠키에서 세션을 읽어와서 인증된 사용자 정보를 포함합니다.
 */
export async function createServerClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
    );
  }

  const cookieStore = await cookies();

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
      storage: {
        getItem: (key: string) => {
          // Supabase는 sb-{project-ref}-auth-token 형식의 키를 사용
          const value = cookieStore.get(key)?.value;
          return value ?? null;
        },
        setItem: (key: string, value: string) => {
          // Next.js 15+ 쿠키 API 사용
          // 동기적으로 설정 (async가 아니어도 됨)
          try {
            cookieStore.set(key, value, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "lax",
              path: "/",
              maxAge: 60 * 60 * 24 * 7, // 7일
            });
          } catch (error) {
            console.error("Failed to set cookie:", error);
          }
        },
        removeItem: (key: string) => {
          try {
            cookieStore.delete(key);
          } catch (error) {
            console.error("Failed to delete cookie:", error);
          }
        },
      },
    },
  });
}

/**
 * 서비스 역할 키를 사용하는 Supabase 클라이언트
 * RLS 정책을 우회하여 관리자 작업에 사용합니다.
 * 절대 클라이언트 사이드에서 사용하지 마세요!
 */
export function createServiceClient() {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error(
      "Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local"
    );
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}

