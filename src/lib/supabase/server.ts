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

  // Supabase 쿠키 키 형식: sb-{project-ref}-auth-token
  const supabaseProjectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1] || "project";
  const authTokenKey = `sb-${supabaseProjectRef}-auth-token`;
  
  // 쿠키에서 세션 읽기
  const sessionCookie = cookieStore.get(authTokenKey)?.value;
  
  const client = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
      storage: {
        getItem: (key: string) => {
          if (key === authTokenKey) {
            return sessionCookie ?? null;
          }
          return null;
        },
        setItem: (key: string, value: string) => {
          // 서버 사이드에서는 쿠키를 직접 설정할 수 없음
          // 콜백에서만 설정 가능
        },
        removeItem: (key: string) => {
          // 서버 사이드에서는 쿠키를 직접 삭제할 수 없음
        },
      },
    },
  });

  // 쿠키에 세션이 있으면 설정
  if (sessionCookie) {
    try {
      const sessionData = JSON.parse(sessionCookie);
      if (sessionData.access_token && sessionData.refresh_token) {
        await client.auth.setSession({
          access_token: sessionData.access_token,
          refresh_token: sessionData.refresh_token,
        });
      }
    } catch (error) {
      console.error("Failed to parse session cookie:", error);
    }
  }

  return client;
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

