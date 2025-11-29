# SumUp

> Vibe Coding Hackathon Project - AI 기반 이슈 트래킹 시스템

[![Next.js](https://img.shields.io/badge/Next.js-16.0.3-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38bdf8)](https://tailwindcss.com/)

## 📋 개요

SumUp은 현대적인 웹 기술 스택을 활용하여 개발된 프로젝트 관리 및 이슈 트래킹 시스템입니다. AI 기능을 통합하여 이슈 요약, 해결 전략 제안, 자동 라벨링 등의 기능을 제공합니다.

## ✨ 주요 기능

### 핵심 기능
- **인증 시스템**: Supabase 기반 이메일/비밀번호 회원가입, 로그인, 세션 관리
- **프로젝트 관리**: 프로젝트 생성/수정/삭제, 즐겨찾기, 아카이브
- **이슈 관리**: 이슈 생성/수정/삭제, 서브태스크, 라벨, 우선순위 관리
- **칸반 보드**: 드래그 앤 드롭 기반 칸반 보드, 커스텀 상태, WIP 제한
- **팀 협업**: 팀 생성/관리, 멤버 초대, 역할 관리 (OWNER/ADMIN/MEMBER)
- **실시간 업데이트**: Supabase Realtime을 활용한 실시간 알림, 댓글, 이슈 업데이트

### 고급 기능
- **AI 기능**: 이슈 요약, 해결 전략 제안, 자동 라벨링, 중복 탐지, 댓글 요약
- **전역 검색**: 이슈, 프로젝트, 팀 통합 검색 (Cmd/Ctrl + K)
- **대시보드**: 통계 카드, 차트, 활동 피드
- **알림 시스템**: 실시간 알림, 읽음/미읽음 상태 관리
- **사용자 설정**: 테마 (다크/라이트/시스템), 언어 설정

## 🚀 빠른 시작

### 필수 요구사항

- Node.js 20.x LTS
- npm 또는 yarn
- Supabase 계정 (무료 플랜 사용 가능)

### 설치

```bash
# 저장소 클론
git clone https://github.com/gr22nist/sum-up.git
cd sum-up

# 의존성 설치
npm install
```

### 환경 변수 설정

`.env.example` 파일을 복사하여 `.env.local` 파일을 생성하고 실제 값을 입력하세요.

**필수 환경 변수:**
```env
# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# JWT 설정
JWT_SECRET=your-jwt-secret-key

# 앱 URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**선택 환경 변수:**
```env
# 이메일 발송 (SendGrid, Resend 등)
EMAIL_PROVIDER=sendgrid
SENDGRID_API_KEY=your-sendgrid-api-key
SENDGRID_FROM_EMAIL=noreply@example.com

# AI 기능 (OpenAI)
AI_PROVIDER=openai
OPENAI_API_KEY=sk-your-openai-api-key
OPENAI_MODEL=gpt-4o-mini
```

자세한 설명은 `.env.example` 파일을 참조하세요.

### 데이터베이스 설정

1. Supabase 프로젝트 생성
2. `supabase/schema.sql` 실행 (Supabase SQL Editor에서)
3. `supabase/seed_complete.sql` 실행 (선택 사항, 데모 데이터)

자세한 내용은 [`docs/SUPABASE_SETUP_GUIDE.md`](./docs/SUPABASE_SETUP_GUIDE.md)를 참조하세요.

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 프로덕션 빌드

```bash
npm run build
npm start
```

## 🛠 기술 스택

- **프레임워크**: Next.js 16.0.3 (App Router)
- **UI 라이브러리**: React 19.2.0
- **언어**: TypeScript 5
- **스타일링**: Tailwind CSS 4
- **상태 관리**: Zustand 5.0.8
- **데이터베이스**: Supabase (PostgreSQL)
- **인증**: Supabase Auth
- **실시간**: Supabase Realtime
- **드래그 앤 드롭**: @dnd-kit
- **차트**: Recharts
- **폰트**: Pretendard

## 📁 프로젝트 구조

```
sumup/
├── src/
│   ├── app/              # Next.js App Router 페이지
│   │   ├── api/          # API Routes
│   │   ├── dashboard/    # 대시보드 페이지
│   │   ├── issues/       # 이슈 페이지
│   │   ├── projects/     # 프로젝트 페이지
│   │   ├── kanban/       # 칸반 보드
│   │   └── ...
│   ├── components/       # 재사용 가능한 컴포넌트
│   ├── hooks/            # 커스텀 React 훅
│   ├── lib/              # 유틸리티, API 클라이언트
│   │   └── supabase/     # Supabase 클라이언트
│   ├── store/            # Zustand 스토어
│   └── types/            # TypeScript 타입 정의
├── supabase/             # Supabase 관련 파일
│   ├── schema.sql        # 데이터베이스 스키마
│   └── seed_complete.sql # 시드 데이터
├── docs/                 # 문서
└── public/               # 정적 자산
```

## 📚 문서

프로젝트 문서는 [`docs/`](./docs/) 폴더에 있습니다. 문서 인덱스는 [`docs/README.md`](./docs/README.md)를 참조하세요.

### 주요 문서

- **[제품 요구사항 문서](./docs/PRD.md)** - 프로젝트 목적 및 기능 요구사항
- **[개발 계획서](./docs/DEVELOPMENT_PLAN.md)** - 개발 단계별 계획
- **[개발 로그](./docs/DEVELOPMENT_LOG.md)** - 개발 진행 내역
- **[협업 가이드라인](./docs/COLLABORATION_GUIDELINES.md)** - 팀 협업 규칙
- **[Git 워크플로우](./docs/GITFLOW.md)** - 브랜치 전략 및 커밋 컨벤션
- **[UI 디자인 가이드라인](./docs/UI_DESIGN_GUIDELINES.md)** - 디자인 시스템
- **[Supabase 설정 가이드](./docs/SUPABASE_SETUP_GUIDE.md)** - 데이터베이스 설정
- **[배포 가이드](./docs/DEPLOYMENT_GUIDE.md)** - Vercel 배포 방법

## 🚢 배포

이 프로젝트는 Vercel에 배포할 수 있습니다.

### 배포 방법

1. GitHub 저장소에 코드 푸시
2. [Vercel](https://vercel.com)에 프로젝트 연결
3. 환경 변수 설정 (Vercel 대시보드에서)
4. 자동 배포 완료

자세한 내용은 [`docs/DEPLOYMENT_GUIDE.md`](./docs/DEPLOYMENT_GUIDE.md)를 참조하세요.

## 🤝 기여

이 프로젝트는 Vibe Coding Hackathon을 위한 프로젝트입니다. 기여 방법은 [`docs/COLLABORATION_GUIDELINES.md`](./docs/COLLABORATION_GUIDELINES.md)를 참조하세요.

## 📄 라이선스

이 프로젝트는 Vibe Coding Hackathon을 위한 프로젝트입니다.

## 🔗 링크

- **GitHub 저장소**: [https://github.com/gr22nist/sum-up](https://github.com/gr22nist/sum-up)
- **문서**: [`docs/README.md`](./docs/README.md)

---

**마지막 업데이트**: 2025-11-30
