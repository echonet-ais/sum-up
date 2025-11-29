# Google OAuth 설정 가이드

> **작성일**: 2025-11-29  
> **상태**: 코드 구현 완료, Supabase 설정 필요

---

## ✅ 구현 완료 사항

Google OAuth 로그인 기능은 **코드 레벨에서 완전히 구현**되어 있습니다:

1. ✅ **OAuthButton 컴포넌트** (`src/components/auth/OAuthButton.tsx`)
   - Google OAuth 버튼 UI
   - Supabase OAuth 로그인 호출
   - 에러 처리

2. ✅ **OAuth 콜백 라우트** (`src/app/auth/callback/route.ts`)
   - OAuth 인증 코드를 세션으로 교환
   - 사용자 프로필 자동 생성
   - 세션 쿠키 저장
   - 리다이렉트 처리

3. ✅ **로그인/회원가입 페이지 통합**
   - 로그인 페이지에 Google OAuth 버튼 표시
   - 회원가입 페이지에 Google OAuth 버튼 표시

4. ✅ **사용자 프로필 자동 생성**
   - OAuth 로그인 시 `public.users` 테이블에 프로필 자동 생성
   - Google에서 제공하는 이름, 이메일, 아바타 정보 사용

---

## ⚙️ Supabase 설정 필요

Google OAuth를 사용하려면 **Supabase 대시보드에서 Google OAuth 제공자를 활성화**해야 합니다.

### 설정 단계

1. **Supabase 대시보드 접속**
   - https://app.supabase.com 접속
   - 프로젝트 선택

2. **Authentication > Providers 메뉴로 이동**
   - 좌측 메뉴: Authentication
   - 하위 메뉴: Providers

3. **Google 제공자 활성화**
   - Google 제공자 찾기
   - "Enable Google provider" 토글 활성화

4. **Google OAuth 클라이언트 정보 입력**
   - **Client ID (for OAuth)**: Google Cloud Console에서 발급받은 Client ID
   - **Client Secret (for OAuth)**: Google Cloud Console에서 발급받은 Client Secret

5. **Redirect URL 설정**
   - Supabase가 자동으로 생성한 Redirect URL을 Google Cloud Console에 등록
   - 형식: `https://{project-ref}.supabase.co/auth/v1/callback`

---

## 🔧 Google Cloud Console 설정

Google OAuth를 사용하려면 Google Cloud Console에서 OAuth 클라이언트를 생성해야 합니다.

### 1. Google Cloud Console 접속
- https://console.cloud.google.com 접속
- 프로젝트 선택 또는 생성

### 2. OAuth 동의 화면 구성
- APIs & Services > OAuth consent screen
- User Type 선택 (External 또는 Internal)
- 앱 정보 입력 (앱 이름, 사용자 지원 이메일 등)
- 범위(Scopes) 추가 (필요 시)

### 3. OAuth 클라이언트 ID 생성
- APIs & Services > Credentials
- "Create Credentials" > "OAuth client ID" 선택
- Application type: "Web application"
- Name: 원하는 이름 (예: "SumUp OAuth")
- Authorized redirect URIs: Supabase Redirect URL 추가
  - 형식: `https://{project-ref}.supabase.co/auth/v1/callback`

### 4. 클라이언트 정보 복사
- 생성된 Client ID와 Client Secret 복사
- Supabase 대시보드에 입력

---

## 📝 환경 변수

코드는 이미 구현되어 있으므로 추가 환경 변수는 필요하지 않습니다. Supabase 클라이언트는 다음 환경 변수를 사용합니다:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

---

## 🧪 테스트 방법

1. **Supabase 설정 완료 후**
   - 로그인 페이지 (`/login`) 접속
   - "Google로 계속하기" 버튼 클릭
   - Google 로그인 진행
   - 콜백 후 대시보드로 리다이렉트 확인

2. **회원가입 페이지에서도 동일하게 작동**
   - 회원가입 페이지 (`/register`) 접속
   - "Google로 계속하기" 버튼 클릭
   - Google 로그인 진행
   - 자동으로 프로필 생성되고 대시보드로 이동

---

## 🔍 문제 해결

### "OAuth가 활성화되지 않았습니다" 에러
- Supabase 대시보드에서 Google 제공자가 활성화되어 있는지 확인
- Client ID와 Client Secret이 올바르게 입력되었는지 확인

### "redirect_uri_mismatch" 에러
- Google Cloud Console의 Authorized redirect URIs에 Supabase Redirect URL이 정확히 등록되어 있는지 확인
- URL 형식이 정확한지 확인 (https, 슬래시 포함 등)

### 사용자 프로필이 생성되지 않음
- `public.users` 테이블의 RLS 정책 확인
- 서비스 클라이언트가 올바르게 작동하는지 확인
- 콜백 라우트 로그 확인

---

## 📚 참고 문서

- [Supabase OAuth 가이드](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Google OAuth 설정 가이드](https://developers.google.com/identity/protocols/oauth2)
- [Supabase Auth 문서](https://supabase.com/docs/guides/auth)

---

## ✅ 완료 체크리스트

- [x] OAuthButton 컴포넌트 구현
- [x] OAuth 콜백 라우트 구현
- [x] 사용자 프로필 자동 생성 로직
- [x] 로그인/회원가입 페이지 통합
- [ ] Supabase 대시보드에서 Google OAuth 활성화 (설정 필요)
- [ ] Google Cloud Console에서 OAuth 클라이언트 생성 (설정 필요)

---

**참고**: 코드는 완전히 구현되어 있으므로, Supabase와 Google Cloud Console 설정만 완료하면 바로 사용할 수 있습니다.

