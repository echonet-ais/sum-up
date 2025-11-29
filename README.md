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

**필수 환경 변수 (요약):**
```env
# API 설정
NEXT_PUBLIC_API_BASE_URL=https://api.example.com

# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# JWT 설정
JWT_SECRET=your-jwt-secret-key

# 이메일 발송 설정
EMAIL_PROVIDER=sendgrid
SENDGRID_API_KEY=your-sendgrid-api-key
SENDGRID_FROM_EMAIL=noreply@example.com

# AI 설정
AI_PROVIDER=openai
OPENAI_API_KEY=sk-your-openai-api-key
OPENAI_MODEL=gpt-4o-mini

# 앱 URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

자세한 설명과 선택 변수는 `.env.example` 파일을 참조하세요.  
민감한 값은 **절대 Git에 커밋하지 마세요.**

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
- Supabase (인증 및 데이터베이스)
- Pretendard (폰트)

## Features

### 핵심 기능 (구현됨)

- **인증 시스템**
  - Supabase 기반 이메일/비밀번호 회원가입, 로그인, 로그아웃
  - 세션 관리 및 보호된 라우트
  - 사용자 프로필 관리 (Zustand 상태 관리)
- **프로젝트 / 이슈 관리**
  - 프로젝트 목록 / 상세, 이슈 목록 / 상세 페이지
  - 이슈 생성 / 수정 폼 (Drawer), 프로젝트 생성 / 수정 폼
  - 서브태스크 관리, 우선순위 / 상태 배지, 메타 정보 카드
  - 이슈 페이지네이션 및 프로젝트 필터
- **칸반 보드**
  - dnd-kit 기반 드래그 앤 드롭 칸반 보드
  - 상태 컬럼 간 카드 이동, 순서 변경
- **팀 / 멤버 관리**
  - 팀 목록 / 상세, 팀 생성 폼
  - 멤버 초대, 역할(OWNER/ADMIN/MEMBER) 관리
- **알림 시스템**
  - 헤더 알림 드롭다운, 알림 아이템 컴포넌트
  - 읽음/미읽음 상태 표시
- **전역 검색**
  - `/search` 페이지 (이슈, 프로젝트, 팀 통합 검색)
  - Header 검색 단축키 (Cmd/Ctrl + K)
- **AI 기능**
  - `/api/ai/*` 엔드포인트 5종 (요약, 제안, 자동 라벨, 중복 탐지, 댓글 요약)
  - Rate limiting, 캐싱, 프롬프트 템플릿, `useAI` 훅, `AIFeatures` 컴포넌트
- **데이터베이스**
  - Supabase PostgreSQL 스키마 정의 (12개 테이블)
  - 시드 데이터 (팀, 프로젝트, 이슈, 라벨 등)
  - Row Level Security (RLS) 정책 적용

### 진행 예정 / 보완 예정

- Supabase DB와의 전체 CRUD 연동 (현재 목데이터 기반인 부분을 실제 DB 연동으로 전환)
- 프로필 / 마이페이지 (프로필 수정, 비밀번호 변경, 아바타 업로드)
- 실시간 알림 업데이트 (폴링 또는 WebSocket)
- 이메일 발송 기능 (팀 초대, 비밀번호 재설정 등)

## Project Structure

```
sumup/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   └── api/          # API Routes (인증, AI 등)
│   ├── components/       # Reusable components
│   ├── lib/              # Utilities, API clients
│   │   ├── api/          # API client
│   │   └── supabase/     # Supabase 클라이언트 (클라이언트/서버)
│   ├── store/            # Zustand stores
│   ├── hooks/            # Custom React hooks
│   └── types/            # TypeScript type definitions
├── supabase/             # Supabase 관련 파일
│   ├── schema.sql        # 데이터베이스 스키마
│   ├── seed.sql          # 시드 데이터 (v1)
│   └── seed_v2.sql       # 시드 데이터 (v2)
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
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase 프로젝트 URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase Anon Key
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase Service Role Key (서버 전용)
- `JWT_SECRET`: JWT 토큰 서명용 시크릿 키
- `EMAIL_PROVIDER`: 이메일 서비스 제공자
- `SENDGRID_API_KEY`: SendGrid API 키
- `SENDGRID_FROM_EMAIL`: 발신자 이메일 주소
- `AI_PROVIDER`: AI 서비스 제공자
- `OPENAI_API_KEY`: OpenAI API 키
- `OPENAI_MODEL`: OpenAI 모델 이름
- `NEXT_PUBLIC_APP_URL`: 애플리케이션 URL

자세한 내용은 `docs/DEPLOYMENT_GUIDE.md`를 참조하세요.

## 문서

프로젝트 문서는 [`docs/`](./docs/) 폴더에 있습니다. 문서 인덱스는 [`docs/README.md`](./docs/README.md)를 참조하세요.

### 주요 문서
- [제품 요구사항 문서](./docs/PRD.md) - 프로젝트 목적 및 기능 요구사항
- [개발 계획서](./docs/DEVELOPMENT_PLAN.md) - 개발 단계별 계획
- [협업 가이드라인](./docs/COLLABORATION_GUIDELINES.md) - 팀 협업 규칙
- [Git 워크플로우](./docs/GITFLOW.md) - 브랜치 전략 및 커밋 컨벤션
- [UI 디자인 가이드라인](./docs/UI_DESIGN_GUIDELINES.md) - 디자인 시스템 및 아이콘 가이드
- [작업 가이드라인](./docs/WORKING_GUIDELINES.md) - 리포지토리 사용 및 작업 규칙
- [백엔드 API 가이드](./docs/BACKEND_API_GUIDE.md) - 공개 가능한 API 개요
- [배포 가이드](./docs/DEPLOYMENT_GUIDE.md) - Vercel 배포 및 환경 변수 개요

그 외 코드 리뷰, 리팩토링 분석, 내부 운영 가이드 등은  
내부 참고용 문서로 `docs/` 폴더에 있으나 이 README에서는 링크하지 않습니다.
