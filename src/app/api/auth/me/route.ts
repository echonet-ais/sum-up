import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

/**
 * GET /api/auth/me
 * 현재 로그인한 사용자 정보 조회
 */
export async function GET(request: Request) {
  try {
    const supabase = await createServerClient();

    // 현재 세션 확인
    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !authUser) {
      return NextResponse.json(
        { error: "인증되지 않은 사용자입니다." },
        { status: 401 }
      );
    }

    // public.users 테이블에서 프로필 정보 조회
    const { data: userProfile, error: profileError } = await supabase
      .from("users")
      .select("*")
      .eq("id", authUser.id)
      .single();

    if (profileError) {
      console.error("Profile fetch error:", profileError);
      // 프로필이 없으면 기본 정보만 반환
      return NextResponse.json(
        {
          user: {
            id: authUser.id,
            email: authUser.email,
            name: authUser.user_metadata?.name || "사용자",
            avatar: authUser.user_metadata?.avatar,
            role: "MEMBER",
          },
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        user: {
          id: userProfile.id,
          email: userProfile.email,
          name: userProfile.name,
          avatar: userProfile.avatar,
          role: userProfile.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

