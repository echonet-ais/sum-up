# Swagger/OpenAPI 도입 가이드

> **프로젝트**: SumUp  
> **목적**: API 문서화 및 테스트 인터페이스 제공

---

## 1. 개요

### 1.1 Swagger 도입 목적

- **자동화된 API 문서**: 코드와 동기화된 최신 문서 유지
- **테스트 인터페이스**: Swagger UI를 통한 API 직접 테스트
- **협업 효율성**: 프론트엔드/백엔드 개발자 간 명확한 API 명세 공유
- **클라이언트 코드 생성**: OpenAPI 스펙 기반 자동 코드 생성 가능

### 1.2 기술 스택

- **swagger-jsdoc**: JSDoc 주석에서 OpenAPI 스펙 자동 생성
- **swagger-ui-react**: Swagger UI 컴포넌트 (Next.js에서 사용)
- **OpenAPI 3.0**: 표준 API 명세 형식

---

## 2. 설치 및 설정

### 2.1 패키지 설치

```bash
npm install swagger-jsdoc swagger-ui-react
npm install -D @types/swagger-jsdoc @types/swagger-ui-react
```

### 2.2 Swagger 설정 파일 생성

`src/lib/swagger/config.ts` 파일 생성:

```typescript
import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SumUp API',
      version: '1.0.0',
      description: 'SumUp 이슈 트래킹 시스템 API 문서',
      contact: {
        name: 'SumUp Team',
        email: 'support@sumup.com',
      },
    },
    servers: [
      {
        url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        description: 'Development server',
      },
      {
        url: 'https://sumup.vercel.app',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: '에러 메시지',
            },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            email: { type: 'string', format: 'email' },
            name: { type: 'string' },
            avatar: { type: 'string', format: 'uri', nullable: true },
            role: { type: 'string', enum: ['OWNER', 'ADMIN', 'MEMBER'] },
          },
        },
        Team: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            description: { type: 'string', nullable: true },
            avatar: { type: 'string', format: 'uri', nullable: true },
            ownerId: { type: 'string', format: 'uuid' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Project: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            description: { type: 'string', nullable: true },
            teamId: { type: 'string', format: 'uuid' },
            isArchived: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Issue: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            title: { type: 'string' },
            description: { type: 'string', nullable: true },
            status: { type: 'string', enum: ['TODO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'] },
            priority: { type: 'string', enum: ['HIGH', 'MEDIUM', 'LOW'] },
            projectId: { type: 'string', format: 'uuid' },
            assigneeId: { type: 'string', format: 'uuid', nullable: true },
            dueDate: { type: 'string', format: 'date-time', nullable: true },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    './src/app/api/**/*.ts', // API Routes 파일 경로
  ],
};

export const swaggerSpec = swaggerJsdoc(options);
```

### 2.3 Swagger UI 페이지 생성

`src/app/api/docs/page.tsx` 파일 생성:

```typescript
'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Swagger UI는 클라이언트 사이드에서만 동작
const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });
import 'swagger-ui-react/swagger-ui.css';

export default function ApiDocsPage() {
  const [spec, setSpec] = useState<any>(null);

  useEffect(() => {
    // OpenAPI 스펙 로드
    fetch('/api/docs/spec')
      .then((res) => res.json())
      .then((data) => setSpec(data))
      .catch((err) => console.error('Failed to load API spec:', err));
  }, []);

  if (!spec) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-[var(--text-muted)]">API 문서를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <SwaggerUI spec={spec} />
    </div>
  );
}
```

### 2.4 OpenAPI 스펙 엔드포인트 생성

`src/app/api/docs/spec/route.ts` 파일 생성:

```typescript
import { NextResponse } from 'next/server';
import { swaggerSpec } from '@/lib/swagger/config';

export async function GET() {
  return NextResponse.json(swaggerSpec);
}
```

---

## 3. API Routes에 JSDoc 주석 추가

### 3.1 예시: 로그인 API

`src/app/api/auth/login/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: 사용자 로그인
 *     description: 이메일과 비밀번호로 로그인합니다.
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
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 로그인 성공
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 session:
 *                   type: object
 *                   properties:
 *                     access_token:
 *                       type: string
 *                     refresh_token:
 *                       type: string
 *                     expires_at:
 *                       type: number
 *       400:
 *         description: 입력값 오류
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export async function POST(request: Request) {
  // ... 기존 코드
}
```

### 3.2 예시: 이슈 목록 조회 API

`src/app/api/issues/route.ts`:

```typescript
/**
 * @swagger
 * /api/issues:
 *   get:
 *     summary: 이슈 목록 조회
 *     description: 필터링, 정렬, 페이지네이션을 지원하는 이슈 목록을 조회합니다.
 *     tags:
 *       - Issues
 *     parameters:
 *       - in: query
 *         name: projectId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: 프로젝트 ID로 필터링
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [TODO, IN_PROGRESS, IN_REVIEW, DONE]
 *         description: 상태로 필터링
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *           enum: [HIGH, MEDIUM, LOW]
 *         description: 우선순위로 필터링
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: 검색어 (제목 검색)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: 페이지 번호
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: 페이지당 항목 수
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [created, updated, title]
 *           default: updated
 *         description: 정렬 기준
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: 정렬 순서
 *     responses:
 *       200:
 *         description: 이슈 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Issue'
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *       401:
 *         description: 인증되지 않은 사용자
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export async function GET(request: NextRequest) {
  // ... 기존 코드
}
```

---

## 4. 사용 방법

### 4.1 Swagger UI 접근

개발 서버 실행 후:
- URL: `http://localhost:3000/api/docs`
- 브라우저에서 API 문서 및 테스트 인터페이스 확인

### 4.2 API 테스트

1. Swagger UI에서 API 엔드포인트 선택
2. "Try it out" 버튼 클릭
3. 파라미터 입력
4. "Execute" 버튼 클릭
5. 응답 확인

### 4.3 인증 토큰 설정

Swagger UI 상단의 "Authorize" 버튼 클릭 후:
- Bearer Token 입력 (로그인 후 받은 `access_token`)
- 모든 인증이 필요한 API에 자동 적용

---

## 5. 장점

### 5.1 개발 효율성
- API 명세와 코드가 항상 동기화
- 프론트엔드 개발자가 API를 직접 테스트 가능
- API 변경 시 문서 자동 업데이트

### 5.2 협업
- 명확한 API 계약 정의
- 요청/응답 예시 제공
- 에러 응답 명세

### 5.3 유지보수
- API 버전 관리 용이
- 변경 이력 추적 가능
- 클라이언트 코드 자동 생성 가능

---

## 6. 다음 단계

1. **패키지 설치**: `swagger-jsdoc`, `swagger-ui-react` 설치
2. **설정 파일 생성**: `src/lib/swagger/config.ts` 생성
3. **Swagger UI 페이지 생성**: `src/app/api/docs/page.tsx` 생성
4. **스펙 엔드포인트 생성**: `src/app/api/docs/spec/route.ts` 생성
5. **API Routes에 JSDoc 주석 추가**: 각 API Route에 Swagger 주석 추가
6. **테스트**: `/api/docs` 접속하여 문서 확인

---

## 7. 참고 자료

- [Swagger JSDoc 문서](https://github.com/Surnet/swagger-jsdoc)
- [Swagger UI React 문서](https://github.com/swagger-api/swagger-ui)
- [OpenAPI 3.0 스펙](https://swagger.io/specification/)

---

**작성일**: 2025-11-29

