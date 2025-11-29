import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

/**
 * POST /api/auth/reset-password
 * 비밀번호 재설정
 */
export async function POST(request: Request) {
  try {
    const { password, token } = await request.json();

    // 입력 검증
    if (!password) {
      return NextResponse.json(
        { error: "새 비밀번호를 입력해주세요." },
        { status: 400 }
      );
    }

    // 비밀번호 강도 검증
    if (password.length < 8) {
      return NextResponse.json(
        { error: "비밀번호는 최소 8자 이상이어야 합니다." },
        { status: 400 }
      );
    }

    const supabase = await createServerClient();

    // Supabase의 비밀번호 업데이트
    // token은 이메일 링크에서 받은 access_token
    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      console.error("Password reset error:", error);
      
      // 토큰 만료 또는 유효하지 않은 토큰
      if (error.message?.includes("expired") || error.message?.includes("invalid")) {
        return NextResponse.json(
          { error: "비밀번호 재설정 링크가 만료되었거나 유효하지 않습니다. 다시 요청해주세요." },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: error.message || "비밀번호 재설정에 실패했습니다." },
        { status: 400 }
      );
    }

    if (!data.user) {
      return NextResponse.json(
        { error: "사용자를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        message: "비밀번호가 성공적으로 변경되었습니다." 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

