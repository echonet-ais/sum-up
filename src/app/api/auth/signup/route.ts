import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { validatePassword } from "@/lib/password-validation";

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: 회원가입
 *     description: |
 *       새로운 사용자를 등록합니다. 
 *       - Supabase Auth가 자동으로 비밀번호를 bcrypt로 해시 처리합니다
 *       - 비밀번호는 절대 평문으로 저장되지 않습니다
 *       - 비밀번호 검증은 서버 사이드에서도 수행합니다
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
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *                 description: 사용자 이메일 주소
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Password123!
 *                 description: 비밀번호 (최소 8자, 대소문자, 숫자, 특수문자 포함)
 *               name:
 *                 type: string
 *                 example: 홍길동
 *                 description: 사용자 이름
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 회원가입이 완료되었습니다.
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     email:
 *                       type: string
 *                       format: email
 *                     name:
 *                       type: string
 *       400:
 *         description: 입력값 오류 (이메일 형식, 비밀번호 강도 등)
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Error'
 *                 - type: object
 *                   properties:
 *                     details:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: 비밀번호 검증 상세 오류 (비밀번호 강도 검증 실패 시)
 *             examples:
 *               missingFields:
 *                 value:
 *                   error: 이메일, 비밀번호, 이름은 필수입니다.
 *               invalidEmail:
 *                 value:
 *                   error: 올바른 이메일 형식이 아닙니다.
 *               weakPassword:
 *                 value:
 *                   error: 비밀번호가 요구사항을 만족하지 않습니다.
 *                   details: ["비밀번호는 최소 8자 이상이어야 합니다.", "대문자, 소문자, 숫자, 특수문자를 포함해야 합니다."]
 *       409:
 *         description: 이메일 중복
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: 이미 사용 중인 이메일입니다.
 *       429:
 *         description: Rate Limit (이메일 전송 제한)
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Error'
 *                 - type: object
 *                   properties:
 *                     code:
 *                       type: string
 *                       example: RATE_LIMIT
 *                     retryAfter:
 *                       type: integer
 *                       example: 8
 *             example:
 *               error: 보안을 위해 잠시 후 다시 시도해주세요. (최소 8초 대기)
 *               code: RATE_LIMIT
 *               retryAfter: 8
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
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

    // 비밀번호 강도 검증 (서버 사이드에서도 검증)
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        { 
          error: "비밀번호가 요구사항을 만족하지 않습니다.",
          details: passwordValidation.errors 
        },
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

      // 이메일 전송 Rate Limit (보안을 위해 8초 대기 필요)
      if (authError.code === "over_email_send_rate_limit" || authError.status === 429) {
        return NextResponse.json(
          { 
            error: "보안을 위해 잠시 후 다시 시도해주세요. (최소 8초 대기)",
            code: "RATE_LIMIT",
            retryAfter: 8
          },
          { status: 429 }
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
    // RLS 정책 때문에 서비스 역할 키를 사용하여 프로필 생성 (RLS 우회)
    const { createServiceClient } = await import("@/lib/supabase/server");
    const serviceClient = createServiceClient();
    
    const { error: profileError } = await serviceClient
      .from("users")
      .insert({
        id: authData.user.id,
        email: authData.user.email!,
        name,
        role: "MEMBER",
        email_confirmed_at: authData.user.email_confirmed_at || null,
      });

    if (profileError) {
      console.error("Profile creation error:", profileError);
      // 프로필 생성 실패해도 회원가입은 성공 (나중에 수정 가능)
      // 하지만 가능하면 프로필을 생성해야 하므로 에러를 로깅
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

