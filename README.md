# SumUp

Vibe Coding Hackathon Project

## Getting Started

### Prerequisites

- Node.js 20.x LTS
- npm

### Installation

```bash
npm install
```

### Environment Variables

`.env.example` 파일을 복사하여 `.env.local` 파일을 생성하고 실제 값을 입력하세요.

**필수 환경 변수:**
```env
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
JWT_SECRET=your-jwt-secret-key
EMAIL_PROVIDER=sendgrid
SENDGRID_API_KEY=your-sendgrid-api-key
SENDGRID_FROM_EMAIL=noreply@example.com
AI_PROVIDER=openai
OPENAI_API_KEY=sk-your-openai-api-key
OPENAI_MODEL=gpt-4o-mini
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

자세한 설명과 선택 변수는 `.env.example` 파일을 참조하세요.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

```bash
npm run build
npm start
```

## Tech Stack

- Next.js 16.0.3
- React 19.2.0
- TypeScript 5
- Tailwind CSS 4
- Zustand 5.0.8 (상태 관리)
- Pretendard (폰트)

## Project Structure

```
sumup/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # Reusable components
│   ├── lib/              # Utilities, API clients
│   │   └── api/          # API client
│   ├── store/            # Zustand stores
│   ├── hooks/            # Custom React hooks
│   └── types/            # TypeScript type definitions
├── public/               # Static assets
├── docs/                 # Documentation
├── .env.local           # Environment variables
├── .env.example         # Environment variables example
└── package.json
```

## Vercel Deployment

이 프로젝트는 Vercel에 배포할 수 있습니다.

### 배포 방법

1. GitHub 저장소에 코드 푸시
2. Vercel에 프로젝트 연결
3. 환경 변수 설정 (Vercel 대시보드에서)
4. 자동 배포 완료

### 환경 변수 설정 (Vercel)

Vercel 대시보드에서 다음 환경 변수를 설정하세요:

- `NEXT_PUBLIC_API_BASE_URL`: API Base URL

## 참고 프로젝트

이 프로젝트는 `D:\dev\dashboard` (PaysByPays Dashboard) 프로젝트를 참고하여 개발되었습니다.

- 컴포넌트 구조 및 아키텍처 패턴 참고
- 상태 관리 방식 (Zustand) 참고
- UI/UX 패턴 참고

자세한 내용은 `docs/PRD.md`를 참조하세요.

## 문서

프로젝트 문서는 [`docs/`](./docs/) 폴더에 있습니다. 문서 인덱스는 [`docs/README.md`](./docs/README.md)를 참조하세요.

### 주요 문서
- [제품 요구사항 문서](./docs/PRD.md) - 프로젝트 목적 및 기능 요구사항
- [개발 계획서](./docs/DEVELOPMENT_PLAN.md) - 개발 단계별 계획
- [협업 가이드라인](./docs/COLLABORATION_GUIDELINES.md) - 팀 협업 규칙
- [Git 워크플로우](./docs/GITFLOW.md) - 브랜치 전략 및 커밋 컨벤션
- [UI 디자인 가이드라인](./docs/UI_DESIGN_GUIDELINES.md) - 디자인 시스템
