# OAuth 설정 가이드

## Supabase 대시보드에서 OAuth 제공자 활성화

### 1. 카카오 OAuth 설정

1. **Supabase 대시보드 접속**
   - https://supabase.com/dashboard 접속
   - 프로젝트 선택

2. **Authentication → Providers 메뉴로 이동**

3. **카카오(Kakao) 제공자 활성화**
   - "Kakao" 제공자를 찾아서 활성화
   - **Client ID (REST API Key)**: 카카오 개발자 콘솔에서 발급받은 REST API Key
   - **Client Secret (Client Secret)**: 카카오 개발자 콘솔에서 발급받은 Client Secret

4. **카카오 개발자 콘솔 설정**
   - https://developers.kakao.com 접속
   - 내 애플리케이션 → 앱 선택
   - **플랫폼 설정**
     - Web 플랫폼 추가
     - 사이트 도메인: `http://localhost:3000` (개발), `https://your-domain.com` (프로덕션)
   - **카카오 로그인 활성화**
     - Redirect URI 추가:
       - 개발: `http://localhost:3000/auth/callback`
       - 프로덕션: `https://your-domain.com/auth/callback`
   - **REST API 키**와 **Client Secret** 복사

5. **Supabase Redirect URL 설정**
   - Supabase 대시보드 → Authentication → URL Configuration
   - Redirect URLs에 추가:
     - `http://localhost:3000/auth/callback`
     - `https://your-domain.com/auth/callback` (프로덕션)

### 2. 구글 OAuth 설정

1. **Google Cloud Console 설정**
   - https://console.cloud.google.com 접속
   - 프로젝트 생성 또는 선택
   - API 및 서비스 → 사용자 인증 정보
   - OAuth 2.0 클라이언트 ID 생성
   - 승인된 리디렉션 URI 추가:
     - `https://{your-project-ref}.supabase.co/auth/v1/callback`

2. **Supabase 대시보드 설정**
   - Authentication → Providers → Google
   - Client ID와 Client Secret 입력
   - 활성화

### 3. GitHub OAuth 설정

1. **GitHub Developer Settings**
   - https://github.com/settings/developers 접속
   - OAuth Apps → New OAuth App
   - Authorization callback URL:
     - `https://{your-project-ref}.supabase.co/auth/v1/callback`

2. **Supabase 대시보드 설정**
   - Authentication → Providers → GitHub
   - Client ID와 Client Secret 입력
   - 활성화

## 개발 환경에서 OAuth 테스트

개발 환경에서는 OAuth 제공자를 활성화하지 않고도 테스트할 수 있도록 Mock 인증을 사용할 수 있습니다. 하지만 프로덕션 환경에서는 반드시 실제 OAuth 제공자를 설정해야 합니다.

## 문제 해결

### "Unsupported provider: provider is not enabled" 에러

이 에러는 Supabase 대시보드에서 해당 OAuth 제공자가 활성화되지 않았을 때 발생합니다.

**해결 방법:**
1. Supabase 대시보드 → Authentication → Providers로 이동
2. 사용하려는 제공자(카카오/구글/GitHub) 활성화
3. 필요한 Client ID와 Client Secret 입력
4. Redirect URL이 올바르게 설정되었는지 확인

### Redirect URI 불일치 에러

OAuth 제공자 콘솔과 Supabase에 설정한 Redirect URI가 일치해야 합니다.

**확인 사항:**
- 카카오: Redirect URI가 `http://localhost:3000/auth/callback` 형식인지 확인
- Supabase: Redirect URL이 `http://localhost:3000/auth/callback` 형식인지 확인

## 참고 자료

- [Supabase OAuth 문서](https://supabase.com/docs/guides/auth/social-login)
- [카카오 로그인 가이드](https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api)
- [Google OAuth 설정](https://developers.google.com/identity/protocols/oauth2)
- [GitHub OAuth 설정](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)

