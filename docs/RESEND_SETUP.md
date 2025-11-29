# Resend 이메일 발송 설정 가이드

> **작성일**: 2025-11-29  
> **목적**: Resend를 사용한 팀 초대 이메일 발송 설정

---

## ✅ 완료된 작업

1. **Resend SDK 설치 완료**
   - `npm install resend` 실행 완료
   - Resend 공식 SDK 사용

2. **코드 수정 완료**
   - `src/lib/utils/email.ts`에서 Resend SDK 사용하도록 변경
   - 공식 예제 코드와 동일한 방식으로 구현

---

## 🔧 환경 변수 설정

`.env.local` 파일에 다음을 추가하세요:

```env
EMAIL_SERVICE=resend
RESEND_API_KEY=re_No2UGQ9n_F5mkLFP7B6cSJ9gL5btL3uP6
EMAIL_FROM=onboarding@resend.dev
```

**참고:**
- `EMAIL_FROM`: 무료 티어에서는 `onboarding@resend.dev` 사용 가능
- 프로덕션에서는 본인 도메인 인증 후 `noreply@yourdomain.com` 사용 권장

---

## 📧 이메일 발송 테스트

### 1. 환경 변수 설정 확인

`.env.local` 파일이 올바르게 설정되었는지 확인:

```env
EMAIL_SERVICE=resend
RESEND_API_KEY=re_No2UGQ9n_F5mkLFP7B6cSJ9gL5btL3uP6
EMAIL_FROM=onboarding@resend.dev
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. 개발 서버 재시작

환경 변수를 변경했으므로 개발 서버를 재시작하세요:

```bash
npm run dev
```

### 3. 팀 멤버 초대 테스트

1. 팀 페이지로 이동
2. "멤버 초대" 버튼 클릭
3. 이메일 주소 입력 (예: `echonet.ais@gmail.com`)
4. 초대 버튼 클릭
5. 실제 이메일 수신 확인

---

## 🎯 코드 변경 사항

### Before (fetch API 사용)
```typescript
const response = await fetch("https://api.resend.com/emails", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${resendApiKey}`,
  },
  body: JSON.stringify({ ... }),
});
```

### After (Resend SDK 사용)
```typescript
import { Resend } from "resend";

const resend = new Resend(resendApiKey);

const { data, error } = await resend.emails.send({
  from: process.env.EMAIL_FROM || "onboarding@resend.dev",
  to: email,
  subject: `${teamName} 팀 초대`,
  html: generateTeamInviteEmailHTML(teamName, inviterName, inviteUrl),
  text: generateTeamInviteEmailText(teamName, inviterName, inviteUrl),
});
```

---

## ✅ 기능 개발 완료!

이제 다음 기능들이 정상 작동합니다:

1. ✅ **팀 멤버 초대 이메일 발송**
   - Resend SDK를 통한 실제 이메일 발송
   - HTML 및 텍스트 형식 지원
   - 팀 초대 링크 포함

2. ✅ **비밀번호 재설정 이메일**
   - Supabase Auth가 자동 처리 (별도 설정 불필요)

---

## 🐛 문제 해결

### 이메일이 발송되지 않는 경우

1. **환경 변수 확인**
   ```bash
   # .env.local 파일 확인
   EMAIL_SERVICE=resend
   RESEND_API_KEY=re_No2UGQ9n_F5mkLFP7B6cSJ9gL5btL3uP6
   ```

2. **서버 재시작**
   - 환경 변수 변경 후 반드시 서버 재시작 필요

3. **Resend 대시보드 확인**
   - [Resend Dashboard](https://resend.com/emails)에서 이메일 발송 로그 확인
   - 에러 메시지 확인

4. **콘솔 로그 확인**
   - 개발 서버 콘솔에서 에러 메시지 확인

---

## 📚 참고 자료

- [Resend 공식 문서](https://resend.com/docs)
- [Resend Node.js SDK](https://resend.com/docs/send-with-nodejs)
- [Resend 이메일 템플릿](https://resend.com/docs/send-with-nodejs#email-templates)

---

**이제 실제 이메일 발송이 가능합니다! 🎉**

