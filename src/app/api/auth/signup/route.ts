import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

/**
 * POST /api/auth/signup
 * 회원가입
 */
export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    // 입력 검증
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "이메일, 비밀번호, 이름은 필수입니다." },
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

    // 비밀번호 길이 검증
    if (password.length < 8) {
      return NextResponse.json(
        { error: "비밀번호는 최소 8자 이상이어야 합니다." },
        { status: 400 }
      );
    }

    const supabase = await createServerClient();

    // Supabase Auth로 회원가입
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name, // 사용자 메타데이터에 이름 저장
        },
      },
    });

    if (authError) {
      console.error("Supabase Auth Error:", authError);
      
      // 이메일 중복 체크
      if (authError.message.includes("already registered") || authError.message.includes("User already registered")) {
        return NextResponse.json(
          { error: "이미 사용 중인 이메일입니다." },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { error: authError.message || "회원가입에 실패했습니다." },
        { status: 500 }
      );
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: "회원가입에 실패했습니다." },
        { status: 500 }
      );
    }

    // public.users 테이블에 프로필 정보 저장
    const { error: profileError } = await supabase
      .from("users")
      .insert({
        id: authData.user.id,
        email: authData.user.email!,
        name,
        role: "MEMBER",
      });

    if (profileError) {
      console.error("Profile creation error:", profileError);
      // 프로필 생성 실패해도 회원가입은 성공 (나중에 수정 가능)
    }

    return NextResponse.json(
      {
        message: "회원가입이 완료되었습니다.",
        user: {
          id: authData.user.id,
          email: authData.user.email,
          name,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

