import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

/**
 * POST /api/auth/login
 * 로그인
 */
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // 입력 검증
    if (!email || !password) {
      return NextResponse.json(
        { error: "이메일과 비밀번호를 입력해주세요." },
        { status: 400 }
      );
    }

    const supabase = await createServerClient();

    // Supabase Auth로 로그인
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      console.error("Supabase Auth Error:", authError);
      
      // 이메일 미인증 에러
      if (authError.code === "email_not_confirmed" || authError.message?.includes("Email not confirmed")) {
        // 개발 환경에서는 이메일 인증을 우회할 수 있도록 안내
        const isDevelopment = process.env.NODE_ENV === "development";
        const errorMessage = isDevelopment
          ? "이메일 인증이 필요합니다. Supabase 대시보드에서 이메일 인증을 비활성화하거나, 이메일을 확인해주세요."
          : "이메일 인증이 완료되지 않았습니다. 이메일을 확인해주세요.";
        
        return NextResponse.json(
          { 
            error: errorMessage,
            code: "email_not_confirmed"
          },
          { status: 401 }
        );
      }
      
      // 잘못된 자격 증명
      if (authError.message?.includes("Invalid login credentials") || authError.code === "invalid_credentials") {
        return NextResponse.json(
          { error: "이메일 또는 비밀번호가 올바르지 않습니다." },
          { status: 401 }
        );
      }

      return NextResponse.json(
        { error: authError.message || "로그인에 실패했습니다." },
        { status: 500 }
      );
    }

    if (!authData.user || !authData.session) {
      return NextResponse.json(
        { error: "로그인에 실패했습니다." },
        { status: 500 }
      );
    }

    // public.users 테이블에서 프로필 정보 조회
    const { data: userProfile, error: profileError } = await supabase
      .from("users")
      .select("*")
      .eq("id", authData.user.id)
      .single();

    if (profileError) {
      console.error("Profile fetch error:", profileError);
      // 프로필이 없으면 기본 정보만 반환
    }

    // 세션 토큰을 클라이언트에 반환
    // 클라이언트에서 supabase.auth.setSession()을 호출하여 쿠키에 저장
    return NextResponse.json(
      {
        message: "로그인 성공",
        user: {
          id: authData.user.id,
          email: authData.user.email,
          name: userProfile?.name || authData.user.user_metadata?.name || "사용자",
          avatar: userProfile?.avatar,
          role: userProfile?.role || "MEMBER",
        },
        session: {
          access_token: authData.session.access_token,
          refresh_token: authData.session.refresh_token,
          expires_at: authData.session.expires_at,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

