import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

/**
 * POST /api/auth/logout
 * 로그아웃
 */
export async function POST(request: Request) {
  try {
    const supabase = await createServerClient();

    // Supabase Auth에서 로그아웃 (쿠키도 자동으로 삭제됨)
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error);
      return NextResponse.json(
        { error: "로그아웃에 실패했습니다." },
        { status: 500 }
      );
    }

    // 쿠키 명시적으로 삭제 (추가 안전장치)
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    
    // Supabase 관련 쿠키 삭제
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl) {
      const projectRef = supabaseUrl.split("//")[1]?.split(".")[0];
      if (projectRef) {
        cookieStore.delete(`sb-${projectRef}-auth-token`);
      }
    }

    return NextResponse.json(
      { message: "로그아웃되었습니다." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

