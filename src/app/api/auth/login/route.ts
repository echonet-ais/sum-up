import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: 사용자 로그인
 *     description: 이메일과 비밀번호로 로그인합니다. 성공 시 사용자 정보와 세션 토큰을 반환합니다.
 *     tags:
 *       - Authentication
 *     security: []  # 인증 불필요
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *                 description: 사용자 이메일 주소
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *                 description: 사용자 비밀번호
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 로그인 성공
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 session:
 *                   type: object
 *                   properties:
 *                     access_token:
 *                       type: string
 *                       description: Supabase Access Token (Bearer 토큰으로 사용)
 *                     refresh_token:
 *                       type: string
 *                       description: Supabase Refresh Token
 *                     expires_at:
 *                       type: number
 *                       description: 토큰 만료 시간 (Unix timestamp)
 *       400:
 *         description: 입력값 오류
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: 이메일과 비밀번호를 입력해주세요.
 *       401:
 *         description: 인증 실패 (잘못된 자격 증명 또는 이메일 미인증)
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Error'
 *                 - type: object
 *                   properties:
 *                     code:
 *                       type: string
 *                       example: email_not_confirmed
 *                       description: 에러 코드 (이메일 미인증 시 포함)
 *             examples:
 *               invalidCredentials:
 *                 value:
 *                   error: 이메일 또는 비밀번호가 올바르지 않습니다.
 *               emailNotConfirmed:
 *                 value:
 *                   error: 이메일 인증이 필요합니다.
 *                   code: email_not_confirmed
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
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

