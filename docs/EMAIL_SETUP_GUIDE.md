# 이메일 발송 설정 가이드

> **작성일**: 2025-11-29  
> **목적**: 팀 초대 및 비밀번호 재설정 이메일 발송 설정 방법

---

## 📋 개요

이 프로젝트는 여러 이메일 서비스를 지원합니다. 개발 환경과 프로덕션 환경에 따라 적절한 서비스를 선택하세요.

---

## 🚀 빠른 시작 (개발 환경)

### 개발 환경에서는 가입 불필요!

`.env.local` 파일에 다음만 추가하면 됩니다:

```env
EMAIL_SERVICE=console
```

이렇게 설정하면:
- ✅ 실제 이메일은 발송되지 않음
- ✅ 콘솔에 로그만 출력됨
- ✅ 기능 테스트는 정상 작동
- ✅ 가입 불필요

---

## 📧 이메일 서비스 옵션

### 1. Console (개발용) - 가입 불필요 ✅

**설정:**
```env
EMAIL_SERVICE=console
```

**특징:**
- 가입 불필요
- 콘솔에 로그만 출력
- 개발/테스트 환경에 적합

---

### 2. Resend (프로덕션 권장) - 가입 필요

**무료 티어:**
- 월 3,000통 무료
- 100통/일 제한

**설정 방법:**
1. [Resend](https://resend.com) 가입 (무료)
2. API Key 생성
3. 도메인 인증 (선택, 무료 티어에서는 `onboarding@resend.dev` 사용 가능)

**환경 변수:**
```env
EMAIL_SERVICE=resend
RESEND_API_KEY=re_xxxxxxxxxxxxx
EMAIL_FROM=noreply@yourdomain.com
```

**장점:**
- 무료 티어 충분
- 설정 간단
- 개발자 친화적

---

### 3. SendGrid (프로덕션) - 가입 필요

**무료 티어:**
- 일 100통 무료
- 월 3,000통 무료

**설정 방법:**
1. [SendGrid](https://sendgrid.com) 가입 (무료)
2. API Key 생성
3. 발신자 인증

**환경 변수:**
```env
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
EMAIL_FROM=noreply@yourdomain.com
```

**장점:**
- 무료 티어 제공
- 안정적인 서비스
- 대용량 지원

---

### 4. Supabase SMTP (Supabase 사용 시) - Supabase 계정 필요

**설정 방법:**
1. Supabase Dashboard → Settings → Auth → SMTP Settings
2. SMTP 서버 정보 입력 (Gmail, SendGrid 등)
3. 또는 Supabase Edge Function으로 이메일 발송 구현

**환경 변수:**
```env
EMAIL_SERVICE=supabase
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

**참고:**
- Supabase 자체 이메일 서비스는 커스텀 이메일을 지원하지 않음
- SMTP 설정 필요 또는 Edge Function 구현 필요

---

## 🔧 환경 변수 설정

### `.env.local` 파일 예시

**개발 환경 (가입 불필요):**
```env
EMAIL_SERVICE=console
```

**프로덕션 환경 (Resend 사용):**
```env
EMAIL_SERVICE=resend
RESEND_API_KEY=re_xxxxxxxxxxxxx
EMAIL_FROM=noreply@yourdomain.com
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

**프로덕션 환경 (SendGrid 사용):**
```env
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
EMAIL_FROM=noreply@yourdomain.com
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

---

## 📝 사용 시나리오

### 시나리오 1: 개발/테스트만 필요
```env
EMAIL_SERVICE=console
```
→ **가입 불필요**, 콘솔 로그만 출력

### 시나리오 2: 프로덕션 배포 (소규모)
```env
EMAIL_SERVICE=resend
RESEND_API_KEY=your_key
EMAIL_FROM=noreply@yourdomain.com
```
→ **Resend 가입 필요** (무료 티어로 충분)

### 시나리오 3: 프로덕션 배포 (대규모)
```env
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=your_key
EMAIL_FROM=noreply@yourdomain.com
```
→ **SendGrid 가입 필요** (무료 티어로 시작 가능)

---

## 🎯 권장 사항

### 개발 단계
- `EMAIL_SERVICE=console` 사용
- 가입 불필요, 빠른 개발 가능

### 프로덕션 배포
- **Resend 추천** (무료 티어 충분, 설정 간단)
- 또는 SendGrid (더 많은 기능 필요 시)

---

## ⚠️ 주의사항

1. **비밀번호 재설정 이메일**은 Supabase Auth가 자동으로 처리합니다.
   - 별도 설정 불필요
   - Supabase Dashboard에서 이메일 템플릿 커스터마이징 가능

2. **팀 초대 이메일**만 커스텀 이메일 서비스가 필요합니다.

3. **프로덕션 배포 전** 반드시 실제 이메일 발송 테스트를 진행하세요.

---

## 🔍 테스트 방법

### 개발 환경 테스트
```bash
# .env.local에 EMAIL_SERVICE=console 설정
# 팀 멤버 초대 시도
# 콘솔에 로그 확인
```

### 프로덕션 테스트
```bash
# .env에 실제 서비스 API 키 설정
# 팀 멤버 초대 시도
# 실제 이메일 수신 확인
```

---

## 📚 참고 자료

- [Resend 문서](https://resend.com/docs)
- [SendGrid 문서](https://docs.sendgrid.com)
- [Supabase Auth 이메일 설정](https://supabase.com/docs/guides/auth/auth-email-templates)

---

**요약: 개발 환경에서는 가입 불필요, 프로덕션에서만 가입 필요!**

