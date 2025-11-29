import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

/**
 * GET /api/auth/verify-email
 * 이메일 인증 상태 확인
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "이메일이 필요합니다." },
        { status: 400 }
      );
    }

    const supabase = await createServerClient();

    // 이메일로 사용자 조회 (서비스 역할 키 필요할 수 있음)
    // Supabase는 직접 이메일로 조회할 수 없으므로, 토큰이 있으면 사용자 정보 확인
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // 토큰이 없거나 다른 사용자인 경우
    if (!user || user.email !== email) {
      // 서비스 역할 키로 확인
      const { createServiceClient } = await import("@/lib/supabase/server");
      const serviceClient = createServiceClient();

      // auth.users 테이블에서 직접 조회는 불가능하므로
      // public.users 테이블에서 확인
      const { data: userProfile } = await serviceClient
        .from("users")
        .select("id, email")
        .eq("email", email)
        .single();

      if (!userProfile) {
        return NextResponse.json(
          { error: "사용자를 찾을 수 없습니다." },
          { status: 404 }
        );
      }

      // Supabase Admin API를 사용하여 인증 상태 확인
      // 여기서는 간단하게 사용자에게 직접 확인하도록 안내
      return NextResponse.json({
        email,
        verified: false, // 정확한 확인을 위해서는 Supabase Admin API 필요
        message: "이메일 인증 링크를 확인해주세요.",
      });
    }

    // 현재 사용자의 인증 상태 확인
    return NextResponse.json({
      email: user.email,
      verified: user.email_confirmed_at !== null,
      confirmedAt: user.email_confirmed_at,
    });
  } catch (error) {
    console.error("Verify email error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

/**
 * POST /api/auth/verify-email
 * 이메일 인증 링크 재전송
 */
export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "이메일이 필요합니다." },
        { status: 400 }
      );
    }

    const supabase = await createServerClient();

    // 이메일 인증 링크 재전송
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
    });

    if (error) {
      console.error("Resend email error:", error);
      
      // Rate Limit 체크
      if (error.code === "over_email_send_rate_limit" || error.status === 429) {
        return NextResponse.json(
          {
            error: "보안을 위해 잠시 후 다시 시도해주세요. (최소 8초 대기)",
            code: "RATE_LIMIT",
            retryAfter: 8,
          },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { error: error.message || "이메일 재전송에 실패했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "이메일 인증 링크를 재전송했습니다.",
    });
  } catch (error) {
    console.error("Resend email error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

