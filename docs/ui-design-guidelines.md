# UI Design Guidelines / UI 디자인 가이드라인

> **Version**: 1.0  
> **Last Updated**: 2025-11-26  
> **Status**: 확정 / Confirmed  
> **Project**: PaysByPays Dashboard

대시보드 UI 디자인을 위한 가이드라인입니다. 깔끔하고 전문적인 비즈니스 대시보드의 일관된 디자인을 유지하기 위한 규칙과 주의사항을 정의합니다.

This document defines design guidelines for the dashboard UI to maintain a clean, professional, and consistent business dashboard design.

---

## 1. 디자인 철학 / Design Philosophy

### 1.1 핵심 원칙 / Core Principles

**KR**: 
- **명확성 (Clarity)**: 정보가 명확하게 전달되어야 합니다.
- **일관성 (Consistency)**: 모든 컴포넌트는 일관된 디자인 언어를 따릅니다.
- **최소주의 (Minimalism)**: 불필요한 장식은 제거하고 핵심에 집중합니다.
- **전문성 (Professionalism)**: 비즈니스 환경에 적합한 신뢰감 있는 디자인입니다.
- **재사용성 (Reusability)**: `@hua-labs/ui` 패키지의 컴포넌트를 적극 활용합니다.

**EN**:
- **Clarity**: Information must be communicated clearly.
- **Consistency**: All components follow a consistent design language.
- **Minimalism**: Remove unnecessary decorations and focus on essentials.
- **Professionalism**: Trustworthy design suitable for business environments.
- **Reusability**: Actively utilize components from `@hua-labs/ui` package.

### 1.2 목표 톤앤매너 / Target Tone & Manner

- **깔끔하고 정돈된 (Clean & Organized)**: 시각적 노이즈 최소화
- **전문적이고 신뢰감 있는 (Professional & Trustworthy)**: 비즈니스 도구로서의 신뢰성
- **효율적이고 직관적인 (Efficient & Intuitive)**: 빠른 정보 파악과 작업 수행

### 1.3 컴포넌트 라이브러리 사용 / Component Library Usage

**@hua-labs/ui 패키지 적극 활용**:
- ✅ **필수**: 모든 UI 컴포넌트는 `@hua-labs/ui` 패키지에서 가져와 사용
- ✅ **우선순위**: 커스텀 컴포넌트 작성 전에 `@hua-labs/ui`에 적합한 컴포넌트가 있는지 확인
- ✅ **확장**: 필요시 `@hua-labs/ui` 컴포넌트를 확장하거나 래핑하여 사용
- ❌ **금지**: `@hua-labs/ui`에 있는 컴포넌트를 직접 재구현하지 않음

**사용 가능한 주요 컴포넌트**:
- **기본 UI**: Button, Action, Input, Card, Panel, Avatar, Badge
- **레이아웃**: Container, Grid, Stack, Divider
- **대시보드**: StatCard, MetricCard, DashboardGrid, ActivityFeed, NotificationCard, QuickActionCard
- **네비게이션**: Navigation, Breadcrumb, Pagination
- **데이터 표시**: Table, Progress, Skeleton
- **피드백**: Alert, Toast, LoadingSpinner, Tooltip
- **오버레이**: Modal, Drawer, BottomSheet, Popover, Dropdown
- **폼**: Form, Checkbox, Radio, Select, Switch, Slider, Textarea
- **인터랙티브**: Accordion, Tabs, Menu

**링크 연결**:
- 패키지가 로컬 tarball로 설치되어 있으므로, 변경 시 재빌드 및 재설치 필요
- 필요시 `D:/HUA/hua-platform/packages/hua-ui` 경로에서 직접 수정 가능

---

## 2. CSS 변수 시스템 / CSS Variables System

### 2.1 변수 선언 원칙 / Variable Declaration Principles

**⚠️ 필수 규칙**:
- **모든 색상과 스페이싱은 CSS 변수로 선언**
- **직접 값 사용 금지**: 하드코딩된 색상 값이나 스페이싱 값 사용 금지
- **일관성 유지**: 모든 컴포넌트에서 동일한 변수 사용

**변수 선언 위치**:
```css
/* globals.css 또는 theme.css */
:root {
  /* 색상 변수 */
  --color-orange-500: #FF6B35;
  --color-gray-50: #FAFAFA;
  /* ... */
  
  /* 스페이싱 변수 */
  --space-1: 4px;
  --space-2: 8px;
  /* ... */
  
  /* 기타 변수 */
  --radius-sm: 4px;
  --font-family: 'Pretendard', sans-serif;
}
```

**사용 예시**:
```css
/* ✅ 올바른 예: 변수 사용 */
.card {
  padding: var(--space-4);
  background: var(--color-gray-50);
  border-radius: var(--radius-md);
}

/* ❌ 잘못된 예: 직접 값 사용 */
.card {
  padding: 16px;
  background: #FAFAFA;
  border-radius: 6px;
}
```

---

## 3. 색상 시스템 / Color System

### 3.1 브랜드 컬러 / Brand Color

**주요 브랜드 컬러 (Primary Brand Color)**:
- **오렌지 계열 (Orange Palette)**: 브랜드 아이덴티티를 나타내는 메인 컬러
- **사용 용도**: 
  - 주요 액션 버튼 (Primary CTA)
  - 활성 상태 표시
  - 중요한 정보 강조
  - 링크 및 호버 상태

**CSS 변수로 선언된 오렌지 색상**:
```css
/* Primary Orange - CSS Variables */
:root {
  --color-orange-50: #FFF5F2;   /* 배경/하이라이트 */
  --color-orange-100: #FFE5DB;
  --color-orange-200: #FFD4C2;
  --color-orange-300: #FFB8A3;
  --color-orange-400: #FF8C61;  /* 호버 상태 */
  --color-orange-500: #FF6B35;  /* 메인 브랜드 컬러 */
  --color-orange-600: #E55A2B;  /* 활성/프레스 상태 */
  --color-orange-700: #CC4A1F;
  --color-orange-800: #B33A15;
  --color-orange-900: #992A0D;
}
```

**사용 예시**:
```tsx
// ✅ @hua-labs/ui 컴포넌트 사용
import { Action } from '@hua-labs/ui';

<Action 
  appearance="primary"
  style={{ backgroundColor: 'var(--color-orange-500)' }}
>
  Primary Action
</Action>
```

### 3.2 서브 컬러 / Secondary Color

**고려 사항**:
- 오렌지와 조화를 이루는 색상
- 대시보드의 정보 계층 구조를 명확히 구분
- 접근성 고려 (색상 대비)

**후보 색상 제안**:
1. **청록/틸 계열 (Teal/Cyan)**: 오렌지와 보색 관계로 대비 효과
2. **네이비/다크 블루 (Navy/Dark Blue)**: 신뢰감 있는 비즈니스 컬러
3. **그레이스케일 확장**: 모노톤 기반의 다양한 그레이 톤

**최종 결정 필요**: 디자인 리뷰를 통해 서브 컬러 확정 예정

**CSS 변수로 선언**:
```css
:root {
  /* 서브 컬러는 확정 후 추가 */
  --color-secondary-500: /* TBD */;
}
```

### 3.3 모노톤 기반 / Monochrome Base

**CSS 변수로 선언된 그레이스케일 팔레트**:
```css
/* Grayscale Palette - CSS Variables */
:root {
  --color-gray-50: #FAFAFA;   /* 배경 */
  --color-gray-100: #F5F5F5;  /* 경계선 */
  --color-gray-200: #EEEEEE;  /* 구분선 */
  --color-gray-300: #E0E0E0;  /* 비활성 요소 */
  --color-gray-400: #BDBDBD;  /* 플레이스홀더 */
  --color-gray-500: #9E9E9E;  /* 보조 텍스트 */
  --color-gray-600: #757575;  /* 본문 텍스트 */
  --color-gray-700: #616161;  /* 강조 텍스트 */
  --color-gray-800: #424242;  /* 제목 텍스트 */
  --color-gray-900: #212121;  /* 최상위 텍스트 */
}
```

**사용 원칙**:
- 대부분의 UI는 모노톤 기반으로 구성
- 브랜드 컬러(오렌지)는 중요한 액션과 강조에만 사용
- 정보의 계층 구조는 그레이 톤으로 구분

### 3.4 상태 컬러 / Status Colors

**CSS 변수로 선언된 시스템 상태 표시용 컬러** (브랜드 컬러와 구분):
```css
/* Status Colors - CSS Variables */
:root {
  --color-success: #10B981;  /* 성공/승인 */
  --color-warning: #F59E0B;   /* 경고/대기 */
  --color-error: #EF4444;     /* 오류/거부 */
  --color-info: #3B82F6;      /* 정보 */
}
```

**@hua-labs/ui 컴포넌트 사용**:
```tsx
import { Alert, AlertSuccess, AlertError, AlertWarning, AlertInfo } from '@hua-labs/ui';

<AlertSuccess>성공 메시지</AlertSuccess>
<AlertError>오류 메시지</AlertError>
<AlertWarning>경고 메시지</AlertWarning>
<AlertInfo>정보 메시지</AlertInfo>
```

**사용 규칙**:
- 상태 컬러는 브랜드 컬러와 혼동되지 않도록 사용
- 오렌지와 유사한 경고 색상은 구분하여 사용

---

## 4. 금지 사항 / Prohibited Elements

### 3.1 이모지 사용 금지 / No Emojis

**❌ 금지**:
- 모든 UI 요소에서 이모지 사용 금지
- 아이콘은 Lucide 기반 SDK 아이콘만 사용
- 텍스트 내 이모지 사용 금지

**✅ 허용**:
- Lucide 아이콘 라이브러리의 벡터 아이콘
- 필요시 커스텀 SVG 아이콘 (단, 일관된 스타일 유지)

**이유**: 비즈니스 대시보드의 전문성과 일관성 유지

### 3.2 과도한 보더 라디우스 금지 / No Excessive Border Radius

**❌ 금지**:
- `border-radius` 값이 12px 이상인 요소
- 완전히 둥근 모서리 (pill shape)는 버튼에만 제한적으로 사용
- 카드나 컨테이너에 과도하게 둥근 모서리 사용 금지

**✅ 권장**:
```css
/* 권장 Border Radius 값 */
--radius-sm: 4px;    /* 작은 요소 (버튼, 입력 필드) */
--radius-md: 6px;    /* 중간 요소 (카드, 드롭다운) */
--radius-lg: 8px;    /* 큰 요소 (모달, 드로어) */
--radius-none: 0px;  /* 테이블, 구분선 등 */
```

**예외**:
- 작은 버튼이나 배지에는 `border-radius: 999px` (pill shape) 허용
- 단, 대시보드의 주요 컴포넌트에는 적용하지 않음

**이유**: 깔끔하고 정돈된 느낌을 위해 직선적이고 각진 디자인 선호

### 3.3 그림자 자제 / Minimal Shadows

**❌ 금지**:
- 과도한 그림자 효과 (multiple box-shadows, blur 값이 큰 그림자)
- 모든 요소에 그림자 적용
- 깊은 입체감을 주는 그림자

**✅ 권장**:
```css
/* 최소한의 그림자만 사용 */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
--shadow-lg: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

/* 사용 예시 */
.card {
  box-shadow: var(--shadow-sm); /* 호버 시에만 shadow-md 사용 */
}
```

**사용 원칙**:
- 그림자는 최소한으로만 사용
- 호버 상태나 포커스 상태에만 제한적으로 적용
- 대부분의 요소는 그림자 없이 border로 구분

**이유**: 평면적이고 깔끔한 디자인 유지

### 3.4 다중 카드 형태 금지 / No Nested Cards

**❌ 금지**:
- 카드 안에 또 다른 카드가 중첩된 구조
- 다중 레이어의 카드 스택
- 카드 내부에 독립적인 카드 형태의 섹션

**✅ 권장**:
```tsx
// ❌ 나쁜 예: 중첩된 카드
<Card>
  <Card> {/* 중첩된 카드 금지 */}
    ...
  </Card>
</Card>

// ✅ 좋은 예: 섹션으로 구분
<Card>
  <Section> {/* border나 배경색으로 구분 */}
    ...
  </Section>
</Card>
```

**대안**:
- 카드 내부는 섹션(section)으로 구분
- 배경색 차이나 border로 시각적 구분
- 탭(Tab)이나 아코디언(Accordion)으로 콘텐츠 분리

**이유**: 시각적 복잡도 감소, 정보 계층 구조 명확화

### 3.5 그라디언트 사용 자제 / Minimal Gradients

**❌ 금지**:
- 배경에 그라디언트 적용
- 버튼이나 카드에 그라디언트 사용
- 복잡한 다중 색상 그라디언트

**✅ 예외 (제한적 허용)**:
- 매우 미묘한 그라디언트만 허용 (거의 구분되지 않는 수준)
- 차트나 데이터 시각화에서만 제한적으로 사용
- 예: `linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 100%)`

**권장**:
- 대부분의 경우 단색(solid color) 사용
- 필요시 미묘한 그라디언트만 사용 (투명도 기반)

**이유**: 깔끔하고 전문적인 느낌 유지

---

## 5. 레이아웃 원칙 / Layout Principles

### 5.1 여백과 간격 / Spacing

**⚠️ CSS 변수로 선언된 일관된 간격 시스템**:
```css
/* Spacing Scale (8px 기준) - CSS Variables */
:root {
  --space-0: 0px;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
}
```

**사용 예시**:
```tsx
// ✅ @hua-labs/ui 컴포넌트 사용
import { Card, Stack } from '@hua-labs/ui';

<Stack gap="var(--space-4)">
  <Card style={{ padding: 'var(--space-4)' }}>
    Content
  </Card>
</Stack>
```

**사용 원칙**:
- 모든 간격은 CSS 변수로 선언된 값만 사용
- 카드 내부 패딩: `var(--space-4)` (16px)
- 카드 간 간격: `var(--space-6)` (24px)
- 섹션 간 간격: `var(--space-8)` (32px)
- ❌ 직접 값 사용 금지: `16px`, `24px` 등 하드코딩 금지

### 5.2 그리드 시스템 / Grid System

**12-column 그리드**:
- Desktop (≥1280px): 12-column, 최소 컬럼 너비 280px
- Tablet (1024-1279px): 12-column, 최소 컬럼 너비 240px
- Mobile (<1024px): 단일 컬럼, 전체 너비 사용

**카드 배치**:
- KPI 카드: 4개씩 1행 (Desktop), 2개씩 2행 (Tablet), 1개씩 (Mobile)
- 차트/테이블: 2/3 너비 (Desktop), 전체 너비 (Tablet/Mobile)

### 5.3 타이포그래피 / Typography

**⚠️ 폰트 규칙 (Font Rule)**:
- **Pretendard만 사용**: 모든 텍스트는 Pretendard 폰트만 사용
- **다른 폰트 사용 금지**: 시스템 폰트나 다른 웹폰트 사용 금지
- **폴백 폰트**: Pretendard 로딩 실패 시에만 시스템 폰트 사용

**폰트 스택**:
```css
/* ✅ 올바른 예: Pretendard 우선 */
--font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* ❌ 잘못된 예: 다른 폰트 사용 */
--font-family: 'Inter', 'Roboto', sans-serif;
```

**Pretendard 설치 및 사용**:
```tsx
// layout.tsx 또는 _app.tsx
import { Pretendard } from 'pretendard';

// 또는 globals.css
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css');
```

**폰트 웨이트**:
- 400: 기본 본문 텍스트
- 500: 강조 텍스트
- 600: 제목 (semibold)
- 700: 강한 제목 (bold)

**타이포 스케일**:
```css
/* Heading */
--text-4xl: 2.25rem;  /* 36px - 페이지 제목 */
--text-3xl: 1.875rem;  /* 30px - 섹션 제목 */
--text-2xl: 1.5rem;    /* 24px - 카드 제목 */
--text-xl: 1.25rem;   /* 20px - 부제목 */

/* Body */
--text-lg: 1.125rem;  /* 18px - 큰 본문 */
--text-base: 1rem;    /* 16px - 기본 본문 */
--text-sm: 0.875rem;  /* 14px - 작은 텍스트 */
--text-xs: 0.75rem;   /* 12px - 캡션, 라벨 */
```

**사용 원칙**:
- 제목은 `font-weight: 600` 또는 `700`
- 본문은 `font-weight: 400`
- 강조 텍스트는 `font-weight: 500`
- 색상으로 계층 구조 표현 (gray-900 → gray-600 → gray-500)

---

## 6. 컴포넌트 스타일 가이드 / Component Style Guide

### 6.1 카드 / Card

**@hua-labs/ui 컴포넌트 사용**:
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@hua-labs/ui';

<Card className="bg-[var(--color-gray-50)] border border-[var(--color-gray-200)]">
  <CardHeader>
    <CardTitle>카드 제목</CardTitle>
  </CardHeader>
  <CardContent style={{ padding: 'var(--space-4)' }}>
    카드 내용
  </CardContent>
</Card>
```

**또는 Panel 컴포넌트 사용**:
```tsx
import { Panel } from '@hua-labs/ui';

<Panel style="outline" padding="large">
  <h3>패널 제목</h3>
  <p>패널 내용</p>
</Panel>
```

**CSS 변수 기반 스타일**:
```css
.card {
  background: var(--color-gray-50);
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  /* 그림자 없음 또는 최소한의 그림자 */
}
```

**금지 사항**:
- ❌ 과도한 border-radius
- ❌ 그림자 남용
- ❌ 그라디언트 배경
- ❌ 중첩된 카드

### 6.2 버튼 / Button

**@hua-labs/ui Action 컴포넌트 사용 (권장)**:
```tsx
import { Action } from '@hua-labs/ui';

<Action appearance="primary" scale="medium">
  Primary Action
</Action>

<Action appearance="outline" scale="medium">
  Secondary Action
</Action>
```

**또는 Button 컴포넌트 사용**:
```tsx
import { Button } from '@hua-labs/ui';

<Button variant="default">Primary</Button>
<Button variant="outline">Secondary</Button>
<Button variant="ghost">Ghost</Button>
```

**CSS 변수 기반 커스텀 스타일**:
```css
.btn-primary {
  background: var(--color-orange-500);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  padding: var(--space-2) var(--space-4);
  /* 그림자 없음 */
}

.btn-primary:hover {
  background: var(--color-orange-400);
}
```

**금지 사항**:
- ❌ 그라디언트 배경
- ❌ 과도한 border-radius (pill shape는 작은 버튼에만 제한)
- ❌ 그림자 효과

### 6.3 테이블 / Table

**@hua-labs/ui Table 컴포넌트 사용**:
```tsx
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@hua-labs/ui';

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>컬럼 1</TableHead>
      <TableHead>컬럼 2</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>데이터 1</TableCell>
      <TableCell>데이터 2</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

**CSS 변수 기반 스타일**:
```css
.table {
  border-collapse: collapse;
  width: 100%;
}

.table th,
.table td {
  border-bottom: 1px solid var(--color-gray-200);
  padding: var(--space-3) var(--space-4);
  text-align: left;
}

.table th {
  background: var(--color-gray-50);
  font-weight: 600;
  color: var(--color-gray-700);
}
```

**특징**:
- border-radius 없음
- 배경색과 border로만 구분
- 그림자 없음

### 6.4 입력 필드 / Input

**@hua-labs/ui Input 컴포넌트 사용**:
```tsx
import { Input } from '@hua-labs/ui';

<Input placeholder="입력하세요" />
<Input type="password" />
<Input disabled />
```

**CSS 변수 기반 커스텀 스타일**:
```css
.input {
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-sm);
  padding: var(--space-2) var(--space-3);
  background: white;
  font-family: var(--font-family);
}

.input:focus {
  border-color: var(--color-orange-500);
  outline: none;
  /* 그림자 없음 또는 최소한의 그림자 */
}
```

### 6.5 대시보드 컴포넌트 / Dashboard Components

**@hua-labs/ui 대시보드 컴포넌트 적극 활용**:
```tsx
import {
  StatCard,
  MetricCard,
  DashboardGrid,
  ActivityFeed,
  NotificationCard,
  QuickActionCard,
  ProgressCard,
  SummaryCard
} from '@hua-labs/ui';

// KPI 카드
<StatCard
  title="총 거래금액"
  value="1,234,567"
  trend="+12.5%"
/>

// 메트릭 카드
<MetricCard
  label="승인률"
  value="98.5%"
  icon="check-circle"
/>

// 대시보드 그리드
<DashboardGrid columns={4} gap="var(--space-6)">
  {/* 카드들 */}
</DashboardGrid>

// 활동 피드
<ActivityFeed items={activities} />

// 알림 카드
<NotificationCard items={notifications} />
```

---

## 7. 인터랙션 가이드 / Interaction Guidelines

### 6.1 호버 효과 / Hover Effects

**원칙**:
- 미묘하고 빠른 전환 효과
- 색상 변화나 border 강조로 표현
- 그림자 효과는 최소한으로

**예시**:
```css
.card:hover {
  border-color: var(--color-gray-300);
  /* 또는 */
  background: var(--color-gray-100);
  transition: all 0.2s ease;
}
```

### 6.2 포커스 상태 / Focus States

**접근성을 위한 포커스 표시**:
```css
.focusable:focus {
  outline: 2px solid var(--color-orange-500);
  outline-offset: 2px;
}
```

**금지 사항**:
- ❌ `outline: none` (접근성 위반)
- ✅ 명확한 포커스 인디케이터 필수

### 6.3 전환 애니메이션 / Transitions

**원칙**:
- 빠르고 자연스러운 전환 (0.2s ~ 0.3s)
- 과도한 애니메이션 효과 금지
- Easing: `ease` 또는 `ease-in-out`

**예시**:
```css
.transition {
  transition: all 0.2s ease;
}
```

---

## 8. 데이터 시각화 / Data Visualization

### 7.1 차트 스타일 / Chart Styles

**원칙**:
- 단색 또는 최소한의 색상 팔레트 사용
- 브랜드 컬러(오렌지)를 주요 데이터에 사용
- 그라디언트는 매우 제한적으로만 사용

**색상 팔레트 예시**:
```css
/* 차트용 색상 */
--chart-color-1: var(--color-orange-500);  /* 주요 데이터 */
--chart-color-2: var(--color-gray-600);    /* 보조 데이터 */
--chart-color-3: var(--color-gray-400);     /* 기타 데이터 */
--chart-color-4: var(--color-success);     /* 성공/승인 */
--chart-color-5: var(--color-error);       /* 오류/거부 */
```

### 7.2 테이블 스타일 / Table Styles

**원칙**:
- 깔끔한 구분선 (border)
- 행 호버 시 배경색 변화 (미묘하게)
- 그림자 없음

---

## 9. 반응형 디자인 / Responsive Design

### 8.1 브레이크포인트 / Breakpoints

```css
/* Mobile First */
@media (min-width: 1024px) { /* Tablet */ }
@media (min-width: 1280px) { /* Desktop */ }
```

### 8.2 모바일 최적화 / Mobile Optimization

**원칙**:
- 터치 타겟 최소 44px × 44px
- 간격과 패딩 조정
- 단일 컬럼 레이아웃
- 햄버거 메뉴로 네비게이션

---

## 10. 체크리스트 / Checklist

컴포넌트 개발 시 다음 사항을 확인하세요:

### @hua-labs/ui 사용 / Component Library Usage
- [ ] `@hua-labs/ui` 패키지의 컴포넌트를 우선적으로 사용
- [ ] 커스텀 컴포넌트 작성 전에 `@hua-labs/ui`에 적합한 컴포넌트 확인
- [ ] 필요한 경우 `@hua-labs/ui` 컴포넌트를 확장하여 사용

### 폰트 / Font
- [ ] Pretendard 폰트만 사용
- [ ] 다른 폰트 사용하지 않음
- [ ] `var(--font-family)` 변수 사용

### CSS 변수 / CSS Variables
- [ ] 모든 색상은 CSS 변수로 선언하여 사용
- [ ] 모든 스페이싱은 CSS 변수로 선언하여 사용
- [ ] 하드코딩된 색상 값이나 스페이싱 값 사용하지 않음

### 디자인 준수 / Design Compliance
- [ ] 이모지 사용하지 않음
- [ ] border-radius가 12px 이하 (버튼 예외)
- [ ] 그림자 최소화 또는 없음
- [ ] 중첩된 카드 구조 없음
- [ ] 그라디언트 사용하지 않음 (차트 예외)

### 색상 시스템 / Color System
- [ ] 브랜드 컬러(오렌지)는 주요 액션에만 사용
- [ ] 모노톤 기반으로 대부분 구성
- [ ] 상태 컬러는 브랜드 컬러와 구분
- [ ] 모든 색상은 `var(--color-*)` 변수 사용

### 레이아웃 / Layout
- [ ] 간격은 CSS 변수(`var(--space-*)`) 사용
- [ ] 그리드 시스템 준수
- [ ] 일관된 패딩과 마진

### 접근성 / Accessibility
- [ ] 명확한 포커스 인디케이터
- [ ] 색상 대비 WCAG AA 기준 준수
- [ ] 키보드 네비게이션 가능

---

## 11. 예시 / Examples

### 11.1 좋은 예 / Good Examples

```tsx
// ✅ 좋은 예: @hua-labs/ui 컴포넌트 사용 + CSS 변수
import { StatCard } from '@hua-labs/ui';

<StatCard
  title="총 거래금액"
  value="1,234,567"
  trend="+12.5%"
  className="bg-[var(--color-gray-50)] border border-[var(--color-gray-200)]"
/>

// ✅ 좋은 예: Action 컴포넌트 사용
import { Action } from '@hua-labs/ui';

<Action 
  appearance="primary"
  style={{ 
    backgroundColor: 'var(--color-orange-500)',
    padding: 'var(--space-2) var(--space-4)'
  }}
>
  Primary Action
</Action>

// ✅ 좋은 예: CSS 변수 사용
<div style={{ 
  padding: 'var(--space-4)',
  backgroundColor: 'var(--color-gray-50)',
  borderRadius: 'var(--radius-md)'
}}>
  Content
</div>
```

### 11.2 나쁜 예 / Bad Examples

```tsx
// ❌ 나쁜 예: 하드코딩된 값 사용
<div style={{ padding: '16px', backgroundColor: '#FAFAFA' }}>
  Content
</div>

// ❌ 나쁜 예: @hua-labs/ui 컴포넌트 재구현
const CustomButton = () => {
  return <button>Custom</button>; // Button 컴포넌트가 있는데 재구현
};

// ❌ 나쁜 예: 과도한 스타일 + 이모지
<Card className="rounded-3xl shadow-2xl bg-gradient-to-r from-orange-400 to-orange-600">
  <Card className="rounded-2xl"> {/* 중첩된 카드 */}
    <span>📊</span> {/* 이모지 사용 */}
  </Card>
</Card>

// ❌ 나쁜 예: 다른 폰트 사용
<div style={{ fontFamily: 'Inter, sans-serif' }}>
  Text
</div>
```

---

## 12. CSS 변수 전체 목록 / Complete CSS Variables List

### 12.1 색상 변수 / Color Variables

```css
:root {
  /* 브랜드 컬러 (오렌지) */
  --color-orange-50: #FFF5F2;
  --color-orange-100: #FFE5DB;
  --color-orange-200: #FFD4C2;
  --color-orange-300: #FFB8A3;
  --color-orange-400: #FF8C61;
  --color-orange-500: #FF6B35;  /* 메인 브랜드 컬러 */
  --color-orange-600: #E55A2B;
  --color-orange-700: #CC4A1F;
  --color-orange-800: #B33A15;
  --color-orange-900: #992A0D;
  
  /* 그레이스케일 */
  --color-gray-50: #FAFAFA;
  --color-gray-100: #F5F5F5;
  --color-gray-200: #EEEEEE;
  --color-gray-300: #E0E0E0;
  --color-gray-400: #BDBDBD;
  --color-gray-500: #9E9E9E;
  --color-gray-600: #757575;
  --color-gray-700: #616161;
  --color-gray-800: #424242;
  --color-gray-900: #212121;
  
  /* 상태 컬러 */
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  --color-info: #3B82F6;
  
  /* 서브 컬러 (확정 후 추가) */
  /* --color-secondary-500: TBD; */
}
```

### 12.2 스페이싱 변수 / Spacing Variables

```css
:root {
  --space-0: 0px;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
}
```

### 12.3 기타 변수 / Other Variables

```css
:root {
  /* Border Radius */
  --radius-none: 0px;
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  
  /* 그림자 (최소한만 사용) */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  
  /* 폰트 */
  --font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  
  /* 타이포그래피 */
  --text-4xl: 2.25rem;   /* 36px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-xl: 1.25rem;    /* 20px */
  --text-lg: 1.125rem;   /* 18px */
  --text-base: 1rem;     /* 16px */
  --text-sm: 0.875rem;   /* 14px */
  --text-xs: 0.75rem;    /* 12px */
}
```

---

## 13. 참고 자료 / References

- **PRD**: `docs/PRD.md` - 프로젝트 요구사항
- **Component Plan**: `docs/component-plan.md` - 컴포넌트 계획
- **@hua-labs/ui 패키지**: `D:/HUA/hua-platform/packages/hua-ui` - UI 컴포넌트 라이브러리
- **@hua-labs/ui README**: `D:/HUA/hua-platform/packages/hua-ui/README.md` - 컴포넌트 사용 가이드
- **Lucide Icons**: https://lucide.dev/ - 아이콘 라이브러리
- **Pretendard**: https://github.com/orioncactus/pretendard - 폰트
- **WCAG Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/ - 접근성 가이드라인

---

## 14. 업데이트 이력 / Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.1 | 2025-11-26 | @hua-labs/ui 패키지 사용 가이드 추가, Pretendard 폰트 규칙 강화, CSS 변수 시스템 추가 |
| 1.0 | 2025-11-26 | 초기 버전 작성 - UI 디자인 가이드라인 확정 |

---

**End of Document**

