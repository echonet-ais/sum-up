# 배포 가이드

> **프로젝트**: SumUp  
> **버전**: 1.0  
> **날짜**: 2025-11-29  
> **상태**: 초안

---

## 1. 개요

### 1.1 목적
본 문서는 SumUp 프로젝트를 Vercel에 배포하는 방법을 설명합니다.

### 1.2 배포 플랫폼
- **주요 플랫폼**: Vercel
- **대체 플랫폼**: Netlify, AWS Amplify 등 (선택)

---

## 2. 사전 준비

### 2.1 필수 요구사항
- GitHub 저장소에 코드 푸시 완료
- Vercel 계정 생성
- Node.js 20.x LTS 호환 환경

### 2.2 확인 사항
- [ ] `package.json`에 빌드 스크립트가 있는가?
- [ ] 환경 변수가 `.env.example`에 문서화되어 있는가?
- [ ] `vercel.json` 설정 파일이 있는가?
- [ ] Git 저장소가 정상적으로 연결되어 있는가?

---

## 3. Vercel 배포

### 3.1 프로젝트 연결

#### 3.1.1 Vercel 대시보드에서 연결
1. [Vercel 대시보드](https://vercel.com/dashboard)에 로그인
2. "Add New..." → "Project" 클릭
3. GitHub 저장소 선택 (`gr22nist/sum-up`)
4. 프로젝트 설정 확인

#### 3.1.2 프로젝트 설정
- **Framework Preset**: Next.js
- **Root Directory**: `./` (기본값)
- **Build Command**: `npm run build` (자동 감지)
- **Output Directory**: `.next` (자동 감지)
- **Install Command**: `npm install` (자동 감지)

### 3.2 환경 변수 설정

#### 3.2.1 필수 환경 변수
Vercel 대시보드에서 다음 환경 변수를 설정하세요:

```
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
```

#### 3.2.2 환경 변수 설정 방법
1. 프로젝트 설정 → "Environment Variables" 클릭
2. 변수 이름과 값 입력
3. 환경 선택 (Production, Preview, Development)
4. "Save" 클릭

#### 3.2.3 환경별 설정
- **Production**: 프로덕션 환경용 변수
- **Preview**: PR 및 브랜치별 프리뷰용 변수
- **Development**: 로컬 개발용 변수 (Vercel CLI 사용 시)

### 3.3 빌드 설정

#### 3.3.1 vercel.json
프로젝트 루트에 `vercel.json` 파일이 있습니다:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["icn1"]
}
```

#### 3.3.2 빌드 최적화
- Next.js는 자동으로 최적화됩니다
- 이미지 최적화는 Next.js Image 컴포넌트 사용
- 코드 스플리팅은 자동으로 처리됩니다

### 3.4 배포 실행

#### 3.4.1 자동 배포
- `main` 브랜치에 푸시하면 자동으로 프로덕션 배포
- 다른 브랜치에 푸시하면 프리뷰 배포

#### 3.4.2 수동 배포
1. Vercel 대시보드에서 "Deployments" 클릭
2. "Redeploy" 버튼 클릭
3. 배포 설정 확인 후 "Redeploy" 클릭

---

## 4. 배포 후 확인

### 4.1 배포 상태 확인
- Vercel 대시보드에서 배포 상태 확인
- 배포 로그 확인 (에러 발생 시)

### 4.2 기능 테스트
- [ ] 홈 페이지가 정상적으로 로드되는가?
- [ ] API 호출이 정상적으로 작동하는가?
- [ ] 환경 변수가 올바르게 설정되었는가?
- [ ] 이미지가 정상적으로 로드되는가?

### 4.3 성능 확인
- [ ] 페이지 로딩 속도 확인
- [ ] Lighthouse 점수 확인
- [ ] 번들 크기 확인

---

## 5. 커스텀 도메인 설정 (선택)

### 5.1 도메인 추가
1. 프로젝트 설정 → "Domains" 클릭
2. 도메인 입력
3. DNS 설정 안내에 따라 DNS 레코드 추가
4. 인증 완료 대기

### 5.2 SSL 인증서
- Vercel이 자동으로 SSL 인증서를 발급합니다
- Let's Encrypt를 사용하여 무료 SSL 제공

---

## 6. 환경 변수 관리

### 6.1 필수 환경 변수

Vercel 배포 시 다음 환경 변수를 반드시 설정해야 합니다:

```env
# API 설정
NEXT_PUBLIC_API_BASE_URL=https://api.example.com

# Google OAuth 설정
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# JWT 토큰 설정
JWT_SECRET=your-jwt-secret-key-change-this-in-production

# 이메일 발송 설정 (SendGrid 예시)
EMAIL_PROVIDER=sendgrid
SENDGRID_API_KEY=your-sendgrid-api-key
SENDGRID_FROM_EMAIL=noreply@example.com

# AI 기능 설정 (OpenAI 예시)
AI_PROVIDER=openai
OPENAI_API_KEY=sk-your-openai-api-key
OPENAI_MODEL=gpt-4o-mini

# 앱 URL
NEXT_PUBLIC_APP_URL=https://sumup.vercel.app
```

**선택 환경 변수:**
- 이메일 발송: AWS SES 또는 SMTP 설정 (EMAIL_PROVIDER에 따라)
- AI 기능: Anthropic 또는 Google 설정 (AI_PROVIDER에 따라)
- 데이터베이스: PostgreSQL, MySQL 등 (기본값: SQLite)
- 파일 저장소: AWS S3, Cloudinary 등 (기본값: 로컬)

전체 환경 변수 목록은 `.env.example` 파일을 참조하세요.

### 6.2 환경 변수 업데이트
1. 프로젝트 설정 → "Environment Variables" 클릭
2. 수정할 변수 선택
3. 값 수정 후 "Save" 클릭
4. 재배포 필요 (자동 또는 수동)

### 6.3 환경 변수 보안
- 민감한 정보는 환경 변수로 관리
- `.env.local` 파일은 Git에 커밋하지 않음
- Vercel 대시보드에서만 환경 변수 관리

---

## 7. 배포 스크립트

### 7.1 package.json 스크립트
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint ."
  }
}
```

### 7.2 Vercel CLI 사용 (선택)
```bash
# Vercel CLI 설치
npm i -g vercel

# 로그인
vercel login

# 배포
vercel

# 프로덕션 배포
vercel --prod
```

---

## 8. 트러블슈팅

### 8.1 빌드 실패
**문제**: 빌드가 실패하는 경우

**해결 방법**:
1. 빌드 로그 확인
2. 로컬에서 `npm run build` 실행하여 에러 확인
3. 의존성 문제인 경우 `package-lock.json` 확인
4. 환경 변수 누락 확인

### 8.2 환경 변수 미적용
**문제**: 환경 변수가 적용되지 않는 경우

**해결 방법**:
1. 환경 변수 이름이 `NEXT_PUBLIC_`로 시작하는지 확인
2. Vercel 대시보드에서 환경 변수 확인
3. 재배포 실행

### 8.3 API 호출 실패
**문제**: API 호출이 실패하는 경우

**해결 방법**:
1. `NEXT_PUBLIC_API_BASE_URL` 환경 변수 확인
2. CORS 설정 확인
3. API 서버 상태 확인

### 8.4 이미지 로드 실패
**문제**: 이미지가 로드되지 않는 경우

**해결 방법**:
1. 이미지 경로 확인
2. Next.js Image 컴포넌트 사용 확인
3. `next.config.ts`에서 이미지 도메인 설정 확인

---

## 9. CI/CD 통합

### 9.1 GitHub Actions (선택)
Vercel은 자동으로 GitHub와 통합되지만, 추가 CI/CD가 필요한 경우:

```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

### 9.2 배포 알림
- Vercel은 Slack, Discord 등으로 배포 알림을 보낼 수 있습니다
- 프로젝트 설정 → "Integrations"에서 설정

---

## 10. 모니터링 및 로그

### 10.1 Vercel Analytics
- Vercel 대시보드에서 Analytics 확인
- 페이지 뷰, 성능 메트릭 등 확인

### 10.2 로그 확인
- Vercel 대시보드 → "Deployments" → 배포 선택 → "Logs" 탭
- 실시간 로그 스트리밍 가능

---

## 11. 롤백

### 11.1 이전 배포로 롤백
1. Vercel 대시보드 → "Deployments" 클릭
2. 롤백할 배포 선택
3. "..." 메뉴 → "Promote to Production" 클릭

### 11.2 특정 커밋으로 배포
1. "Deployments"에서 특정 커밋 선택
2. "Redeploy" 클릭

---

## 12. 성능 최적화

### 12.1 빌드 최적화
- Next.js 자동 최적화 활용
- 이미지 최적화 (Next.js Image)
- 코드 스플리팅 자동 처리

### 12.2 캐싱
- Vercel은 자동으로 정적 자산 캐싱
- API 응답 캐싱은 필요시 구현

### 12.3 CDN
- Vercel은 전 세계 CDN을 통해 자동 배포
- `regions` 설정으로 특정 리전 선택 가능

---

## 13. 참고 자료

### 13.1 관련 문서
- [README.md](../README.md) - 프로젝트 개요
- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - API 문서
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - 트러블슈팅 가이드

### 13.2 외부 자료
- [Vercel 공식 문서](https://vercel.com/docs)
- [Next.js 배포 가이드](https://nextjs.org/docs/deployment)

---

## 문서 이력

| 버전 | 날짜 | 작성자 | 변경사항 |
|------|------|--------|---------|
| 1.0 | 2025-11-29 | Initial | 초기 배포 가이드 작성 |

---

**문서 종료**

