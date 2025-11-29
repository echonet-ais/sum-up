# 이메일 인증 문제 해결 가이드

## 문제: 회원가입 시 인증 이메일이 오지 않음

### 확인 사항

#### 1. Supabase Dashboard 설정 확인

**Authentication > Settings > Email Auth**에서 다음을 확인하세요:

1. **Enable email confirmations**가 활성화되어 있는지 확인
   - 활성화되어 있으면: 회원가입 시 이메일 인증 링크가 발송됨
   - 비활성화되어 있으면: 이메일 인증 없이 바로 로그인 가능

2. **Email Templates** 확인
   - `Confirm signup` 템플릿이 설정되어 있는지 확인
   - 기본 템플릿이 있지만 커스터마이징 가능

3. **SMTP Settings** 확인
   - SMTP 설정이 없으면 Supabase의 기본 이메일 발송 기능 사용 (제한적)
   - 프로덕션 환경에서는 SMTP 설정 권장

#### 2. 코드 확인

현재 코드는 다음과 같이 설정되어 있습니다:

```typescript
// src/app/api/auth/signup/route.ts
const emailRedirectTo = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/auth/callback`;

await supabase.auth.signUp({
  email,
  password,
  options: {
    emailRedirectTo, // 이메일 인증 링크 클릭 시 리다이렉트할 URL
    data: {
      name,
    },
  },
});
```

#### 3. 환경 변수 확인

`.env.local` 파일에 다음이 설정되어 있는지 확인:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000  # 또는 실제 배포 URL
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 해결 방법

#### 방법 1: Supabase Dashboard에서 이메일 인증 활성화

1. Supabase Dashboard 접속
2. **Authentication** > **Settings** 이동
3. **Email Auth** 섹션에서 **Enable email confirmations** 체크
4. **Email Templates**에서 `Confirm signup` 템플릿 확인/수정
5. 저장

#### 방법 2: 개발 환경에서 이메일 인증 비활성화 (임시)

개발 중에는 이메일 인증을 비활성화할 수 있습니다:

1. Supabase Dashboard > **Authentication** > **Settings**
2. **Enable email confirmations** 체크 해제
3. 저장

이 경우 회원가입 후 바로 로그인 가능합니다.

#### 방법 3: SMTP 설정 (프로덕션 권장)

프로덕션 환경에서는 SMTP를 설정하여 이메일 발송을 보장하세요:

1. Supabase Dashboard > **Authentication** > **Settings**
2. **SMTP Settings** 섹션에서 SMTP 서비스 설정
   - SendGrid, AWS SES, Mailgun 등 지원
3. SMTP 자격 증명 입력
4. 저장

### 디버깅

회원가입 시 콘솔 로그를 확인하세요:

```typescript
// signup 결과 로그
console.log("Signup result:", {
  user: {
    id: authData.user.id,
    email: authData.user.email,
    email_confirmed_at: authData.user.email_confirmed_at, // null이면 미인증
  },
  session: authData?.session ? "exists" : "none", // 세션이 없으면 이메일 인증 필요
});
```

**예상 결과:**
- 이메일 인증이 활성화된 경우: `session: "none"`, `email_confirmed_at: null`
- 이메일 인증이 비활성화된 경우: `session: "exists"`, `email_confirmed_at: timestamp`

### 이메일 인증 플로우

1. 사용자가 회원가입
2. Supabase가 이메일 인증 링크 발송 (활성화된 경우)
3. 사용자가 이메일 링크 클릭
4. `/auth/callback?code=xxx&type=signup`로 리다이렉트
5. 코드를 세션으로 교환
6. `/verify-email?email=xxx&verified=true`로 리다이렉트
7. 사용자가 로그인 가능

### 참고

- Supabase의 기본 이메일 발송은 개발 환경에서 제한적일 수 있음
- 프로덕션에서는 반드시 SMTP 설정 권장
- 이메일 인증이 비활성화되어 있으면 `signUp` 후 바로 세션이 생성됨

