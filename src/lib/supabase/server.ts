/**
 * Supabase Client (서버 사이드)
 * Next.js API Routes 및 Server Components에서 사용하는 Supabase 클라이언트
 */

import { createServerClient as createSupabaseServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import type { NextRequest, NextResponse } from "next/server";

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
 * Next.js App Router의 cookies()를 사용합니다.
 * Server Components와 API Routes 모두에서 사용 가능합니다.
 * 
 * @param request - API Routes에서 사용할 경우 NextRequest (선택사항)
 * @param response - API Routes에서 사용할 경우 NextResponse (선택사항)
 */
export async function createServerClient(
  request?: NextRequest,
  response?: NextResponse
) {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
    );
  }

  // API Routes에서 사용하는 경우
  if (request) {
    return createSupabaseServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          if (response) {
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options);
            });
          }
          // response가 없으면 쿠키 설정 불가 (읽기 전용)
        },
      },
    });
  }

  // Server Components에서 사용하는 경우
  const cookieStore = await cookies();

  return createSupabaseServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch (error) {
          // 서버 컴포넌트에서는 쿠키를 설정할 수 없을 수 있음
        }
      },
    },
  });
}

/**
 * API Routes에서 사용하는 Supabase 클라이언트
 * NextRequest와 NextResponse를 사용하여 쿠키를 읽고 쓸 수 있습니다.
 */
export function createServerClientForAPI(
  request: NextRequest,
  response: NextResponse
) {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
    );
  }

  return createSupabaseServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
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

