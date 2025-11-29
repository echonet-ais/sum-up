import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/server";

/**
 * GET /auth/callback
 * OAuth 콜백 처리
 * Supabase OAuth 인증 후 리다이렉트되는 엔드포인트
 */
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const error = requestUrl.searchParams.get("error");
  const errorDescription = requestUrl.searchParams.get("error_description");

  // OAuth 에러 처리
  if (error) {
    console.error("OAuth error:", error, errorDescription);
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(errorDescription || error)}`, request.url)
    );
  }

  if (!code) {
    return NextResponse.redirect(
      new URL("/login?error=missing_code", request.url)
    );
  }

  try {
    // 코드를 세션으로 교환하기 위해 임시 클라이언트 생성
    const { createClient } = await import("@supabase/supabase-js");
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    
    const tempClient = createClient(supabaseUrl, supabaseAnonKey);
    
    // 코드를 세션으로 교환
    const { data: authData, error: authError } = await tempClient.auth.exchangeCodeForSession(code);

    if (authError || !authData.user || !authData.session) {
      console.error("Failed to exchange code for session:", authError);
      return NextResponse.redirect(
        new URL("/login?error=authentication_failed", request.url)
      );
    }

    // public.users 테이블에 프로필이 있는지 확인 (서비스 클라이언트 사용)
    const serviceClient = createServiceClient();
    const { data: existingUser } = await serviceClient
      .from("users")
      .select("*")
      .eq("id", authData.user.id)
      .single();

    // 프로필이 없으면 생성
    if (!existingUser) {
      const { error: insertError } = await serviceClient
        .from("users")
        .insert({
          id: authData.user.id,
          email: authData.user.email!,
          name: authData.user.user_metadata?.name || 
                authData.user.user_metadata?.full_name || 
                authData.user.user_metadata?.preferred_username ||
                authData.user.email?.split("@")[0] || 
                "사용자",
          avatar: authData.user.user_metadata?.avatar_url || 
                  authData.user.user_metadata?.picture ||
                  null,
          role: "MEMBER",
          email_confirmed_at: authData.user.email_confirmed_at || null,
        });

      if (insertError) {
        console.error("Failed to create user profile:", insertError);
        // 프로필 생성 실패해도 로그인은 진행 (나중에 수정 가능)
      }
    }

    // 세션을 쿠키에 저장
    // Supabase가 사용하는 쿠키 키 형식: sb-{project-ref}-auth-token
    const supabaseProjectRef = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1] || "project";
    const authTokenKey = `sb-${supabaseProjectRef}-auth-token`;
    
    // Supabase가 기대하는 세션 형식으로 저장
    // Supabase는 세션 객체를 JSON으로 직렬화하여 저장합니다
    const sessionData = JSON.stringify({
      access_token: authData.session.access_token,
      refresh_token: authData.session.refresh_token,
      expires_at: authData.session.expires_at,
      expires_in: authData.session.expires_in,
      token_type: authData.session.token_type,
      user: {
        id: authData.user.id,
        aud: authData.user.aud,
        role: authData.user.role,
        email: authData.user.email,
        email_confirmed_at: authData.user.email_confirmed_at,
        phone: authData.user.phone,
        confirmed_at: authData.user.confirmed_at,
        last_sign_in_at: authData.user.last_sign_in_at,
        app_metadata: authData.user.app_metadata,
        user_metadata: authData.user.user_metadata,
        identities: authData.user.identities,
        created_at: authData.user.created_at,
        updated_at: authData.user.updated_at,
      },
    });

    // 리다이렉트 응답 생성
    const response = NextResponse.redirect(new URL("/", request.url));
    
    // 쿠키에 세션 저장
    response.cookies.set(authTokenKey, sessionData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7일
    });

    // 디버깅: 쿠키가 설정되었는지 확인
    console.log("OAuth callback: Session cookie set", {
      key: authTokenKey,
      hasToken: !!authData.session.access_token,
      userId: authData.user.id,
    });

    return response;
  } catch (error) {
    console.error("OAuth callback error:", error);
    return NextResponse.redirect(
      new URL("/login?error=server_error", request.url)
    );
  }
}

