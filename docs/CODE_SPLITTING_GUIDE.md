# 코드 스플리팅 가이드

> **Date**: 2025-11-29  
> **Project**: SumUp  
> **Status**: 적용 중

Next.js에서 코드 스플리팅을 통해 초기 번들 크기를 줄이고 성능을 최적화하는 가이드입니다.

---

## 1. 개요

코드 스플리팅은 애플리케이션을 여러 작은 번들로 나누어 필요한 코드만 로드하는 기법입니다. 이를 통해:

- ✅ 초기 로딩 시간 단축
- ✅ 번들 크기 감소
- ✅ 사용하지 않는 코드 제거
- ✅ 성능 향상

---

## 2. Next.js Dynamic Import

Next.js는 `next/dynamic`을 통해 컴포넌트를 동적으로 로드할 수 있습니다.

### 2.1 기본 사용법

```tsx
import dynamic from "next/dynamic";

const Component = dynamic(() => import("./Component"));
```

### 2.2 로딩 상태 포함

```tsx
import dynamic from "next/dynamic";
import { LoadingState } from "@/components/common";

const Component = dynamic(() => import("./Component"), {
  loading: () => <LoadingState message="로딩 중..." />
});
```

### 2.3 SSR 비활성화 (클라이언트 전용)

```tsx
const Component = dynamic(() => import("./Component"), {
  ssr: false
});
```

브라우저 전용 컴포넌트(차트, 드래그 앤 드롭 등)에 사용합니다.

---

## 3. 적용 대상

### 3.1 ✅ 적용 완료

#### KanbanBoard 컴포넌트
- **위치**: `app/kanban/page.tsx`
- **이유**: `@dnd-kit` 라이브러리 포함 (용량 큼)
- **방법**: SSR 비활성화 + 로딩 상태

```tsx
const KanbanBoard = dynamic(
  () => import("@/components/kanban/KanbanBoard"),
  {
    ssr: false,
    loading: () => <LoadingState message="칸반 보드를 불러오는 중..." />
  }
);
```

#### Chart 컴포넌트들
- **위치**: `components/charts/*`
- **이유**: 차트 라이브러리 용량 큼
- **방법**: SSR 비활성화

```tsx
const LineChart = dynamic(() => import("@/components/charts/LineChart"), {
  ssr: false
});

const PieChart = dynamic(() => import("@/components/charts/PieChart"), {
  ssr: false
});
```

---

### 3.2 🔄 향후 적용 예정

#### 폼 컴포넌트들
- **대상**: `IssueForm`, `ProjectForm` (향후 개발)
- **위치**: 모달 내에서 사용
- **방법**: 기본 동적 import

```tsx
const IssueForm = dynamic(() => import("@/components/issue/IssueForm"));
```

#### 상세 페이지 컴포넌트
- **대상**: `CommentList`, `CommentForm`
- **위치**: 상세 페이지에서만 사용
- **방법**: 기본 동적 import

---

## 4. 주의사항

### 4.1 SSR 비활성화 시 주의

- SEO가 중요한 컴포넌트는 SSR 유지
- 클라이언트 전용 기능만 `ssr: false` 사용
- 예: 차트, 드래그 앤 드롭, 복잡한 인터랙션

### 4.2 로딩 상태

- 사용자 경험을 위해 로딩 상태 제공
- `LoadingState` 컴포넌트 활용

### 4.3 타입 안전성

- 동적 import도 타입 체크 유지
- TypeScript 타입 정의 확인

---

## 5. 성능 측정

### 5.1 번들 크기 확인

```bash
# Next.js 빌드 후 번들 분석
npm run build
```

### 5.2 Lighthouse 점수

- Performance 점수 모니터링
- First Contentful Paint (FCP) 개선
- Largest Contentful Paint (LCP) 개선

---

## 6. 모범 사례

### ✅ DO

- 큰 라이브러리 포함 컴포넌트 스플리팅
- 특정 페이지에서만 사용하는 컴포넌트 스플리팅
- 사용자 인터랙션 후 로드되는 컴포넌트 스플리팅

### ❌ DON'T

- 작은 컴포넌트 과도한 스플리팅 (오버헤드)
- 자주 사용되는 컴포넌트 스플리팅
- SEO 중요한 컴포넌트 SSR 비활성화

---

## 7. 예제

### 7.1 칸반 보드 페이지

```tsx
// app/kanban/page.tsx
"use client";

import dynamic from "next/dynamic";
import { AppLayout } from "@/components/layout";
import { LoadingState } from "@/components/common";

const KanbanBoard = dynamic(
  () => import("@/components/kanban/KanbanBoard"),
  {
    ssr: false,
    loading: () => <LoadingState message="칸반 보드를 불러오는 중..." />
  }
);

export default function KanbanPage() {
  return (
    <AppLayout title="칸반 보드" activeItem="kanban">
      <KanbanBoard {...props} />
    </AppLayout>
  );
}
```

### 7.2 대시보드 페이지

```tsx
// app/page.tsx
"use client";

import dynamic from "next/dynamic";

const LineChart = dynamic(() => import("@/components/charts/LineChart"), {
  ssr: false
});

const PieChart = dynamic(() => import("@/components/charts/PieChart"), {
  ssr: false
});

export default function DashboardPage() {
  return (
    <div>
      <LineChart data={data} />
      <PieChart data={data} />
    </div>
  );
}
```

---

## 8. 참고 자료

- [Next.js Dynamic Import](https://nextjs.org/docs/advanced-features/dynamic-import)
- [React Code Splitting](https://react.dev/reference/react/lazy)
- [Webpack Code Splitting](https://webpack.js.org/guides/code-splitting/)

---

**문서 작성일**: 2025-11-29  
**마지막 업데이트**: 2025-11-29

