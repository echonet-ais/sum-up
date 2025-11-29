import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

/**
 * POST /api/auth/forgot-password
 * 비밀번호 재설정 이메일 발송
 */
export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // 입력 검증
    if (!email) {
      return NextResponse.json(
        { error: "이메일을 입력해주세요." },
        { status: 400 }
      );
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "올바른 이메일 형식이 아닙니다." },
        { status: 400 }
      );
    }

    const supabase = await createServerClient();

    // Supabase의 비밀번호 재설정 이메일 발송
    // redirectTo는 비밀번호 재설정 페이지로 리다이렉트할 URL
    const redirectTo = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/reset-password`;
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });

    if (error) {
      console.error("Password reset error:", error);
      
      // 보안상 이유로 실제 에러 메시지를 숨기고 일반적인 메시지 반환
      // 이메일이 존재하지 않아도 성공 메시지를 반환 (이메일 열거 공격 방지)
      return NextResponse.json(
        { 
          message: "비밀번호 재설정 이메일이 발송되었습니다. 이메일을 확인해주세요." 
        },
        { status: 200 }
      );
    }

    // 성공 메시지 반환 (보안상 실제 이메일 존재 여부와 관계없이 동일한 메시지)
    return NextResponse.json(
      { 
        message: "비밀번호 재설정 이메일이 발송되었습니다. 이메일을 확인해주세요." 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

