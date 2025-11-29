# 개발 계획

> **프로젝트**: SumUp  
> **버전**: 1.0  
> **날짜**: 2025-11-29  
> **상태**: 초안

---

## 1. 개발 개요

### 1.1 프로젝트 목표
- Vibe Coding Hackathon을 위한 현대적인 웹 애플리케이션 개발
- Next.js, React, TypeScript, Tailwind CSS 4를 활용한 풀스택 개발 경험
- 깔끔하고 직관적인 UI/UX 구현
- 확장 가능하고 유지보수하기 쉬운 코드 구조
- 체계적인 문서화 및 협업 프로세스 구축

### 1.2 개발 기간
- **시작일**: 2025-11-29
- **목표 완료일**: TBD (해커톤 일정에 따라)
- **총 기간**: 약 2-3주 (예상)

### 1.3 개발 단계
1. **Phase 1 (핵심 기능)**: 프로젝트 설정 및 기본 기능 구현
2. **Phase 2 (향상 기능)**: 주요 기능 구현 및 API 연동
3. **Phase 3 (추가 기능)**: 부가 기능 및 최적화

---

## 2. 개발 진행 내역

### 2.1 Phase 1: 핵심 기능 (P0)

#### 완료된 작업

**1. 프로젝트 초기 설정** (2025-11-29)
- [x] Next.js 프로젝트 초기화
- [x] TypeScript 설정
- [x] Tailwind CSS 4 설정
- [x] ESLint 설정
- [x] 프로젝트 기본 구조 생성
- [x] Git 저장소 초기화 및 리모트 연결
- [x] `main`, `dev` 브랜치 생성
- [x] 기본 문서 스캐폴드 생성 (PRD, 개발 계획, 협업 가이드라인, Git Flow, UI 가이드라인)

**2. 문서화** (2025-11-29)
- [x] PRD 작성
- [x] 개발 계획 작성
- [x] 협업 가이드라인 작성
- [x] Git Flow 문서 작성
- [x] UI 디자인 가이드라인 작성

#### 진행 예정 작업

**3. 기본 레이아웃 구현** (완료)
- [x] 루트 레이아웃 컴포넌트 구현 (AppLayout)
- [x] 네비게이션 컴포넌트 구현 (Sidebar)
- [x] 헤더 컴포넌트 구현 (Header)
- [x] 반응형 레이아웃 적용
- [x] AppProviders 구현 (테마, 접근성 동기화)

**4. 메인 페이지 구현** (완료)
- [x] 홈 페이지 기본 구조 (`/`)
- [x] 주요 섹션 컴포넌트 구현 (통계 카드, 활동 피드)
- [x] 카드 기반 위젯 시스템 구현

**5. API 클라이언트 설정** (완료)
- [x] API 클라이언트 유틸리티 생성 (`src/lib/api/client.ts`)
- [x] 환경 변수 설정 준비
- [x] 타입 정의 (`src/types/index.ts`)
- [x] 에러 처리 로직 (`ApiError` 클래스)

---

### 2.2 Phase 2: 향상 기능 (P1)

#### 완료된 작업

**1. 데이터 표시 기능** (완료)
- [x] 데이터 목록 컴포넌트 구현 (이슈 목록, 프로젝트 목록)
- [x] 테이블/카드 뷰 구현 (기본 구조)
- [x] 필터링 기능 구현 (로직 완료)
- [x] 정렬 기능 구현 (로직 완료)
- [x] 페이징 또는 무한 스크롤 구현 (로직 준비 완료, UI 대기)

**2. 검색 기능** (로직 완료)
- [x] 검색 로직 구현 (`filterIssues` 유틸리티)
- [x] 검색 상태 관리 (Zustand store)
- [x] 검색 컴포넌트 구현 (기본 구조 완료, UI 컴포넌트 대기)
- [x] 검색 API 연동 (API 준비 완료, 실제 엔드포인트 대기)
- [x] 검색 결과 표시 (로직 완료)

**3. 상세 보기** (완료)
- [x] 상세 페이지 구현 (이슈 상세, 프로젝트 상세)
- [x] 데이터 상세 정보 표시 (기본 구조)
- [x] 관련 데이터 링크 (프로젝트-이슈 연결)
- [x] 커스텀 훅 구현 (`useIssue`, `useProject`)
- [x] 서브태스크 표시 및 관리 (로직 완료)

**4. 사용자 인증** (완료)
- [x] 로그인/로그아웃 페이지 (`/login`)
- [x] 회원가입 페이지 (`/register`) - sum-diary에서 가져와 디자인 개선
  - [x] 3단계 회원가입 프로세스 (이메일 → 비밀번호 → 약관)
  - [x] 비밀번호 검증 로직 (8자 이상, 대소문자, 숫자, 특수문자)
  - [x] 비밀번호 확인 일치 검증
  - [x] PasswordChecklist 컴포넌트
  - [x] useRegisterForm, usePasswordValidation 훅
- [x] 인증 상태 관리 (`useAuthStore`)
- [x] 보호된 라우트 구현 (`middleware.ts`)
- [x] OAuth 연동 (Google, GitHub, 카카오)
- [x] Header 컴포넌트에 인증 연동

**5. 데이터 시각화** (완료)
- [x] 차트 라이브러리 선택 및 설정 (recharts 설치 완료)
- [x] 차트 컴포넌트 구현 (PieChart, LineChart)
- [x] 데이터 시각화 페이지 구현 (대시보드에 통계 카드로 통합)

#### 추가 완료 사항

**커스텀 훅 (Hooks)**
- [x] `useIssues` - 이슈 목록 조회 및 필터링/정렬, 이슈 생성
- [x] `useIssue` - 이슈 상세 조회 및 업데이트/삭제, 상태 변경, 서브태스크 관리, 댓글 관리
- [x] `useProjects` - 프로젝트 목록 조회 및 필터링, 프로젝트 생성
- [x] `useProject` - 프로젝트 상세 조회 및 업데이트/삭제/아카이브/즐겨찾기
- [x] `useTeams` - 팀 목록 조회 및 필터링
- [x] `useTeam` - 팀 상세 조회 및 업데이트/삭제, 멤버 관리 (초대/역할 변경/제거)
- [x] `useRegisterForm` - 회원가입 폼 관리 (단계별 프로세스)
- [x] `usePasswordValidation` - 비밀번호 검증 (실시간 검증)

**상태 관리 (Stores)**
- [x] `useIssueFilterStore` - 이슈 필터링 상태 관리 (검색, 상태, 우선순위, 정렬)

**유틸리티 함수**
- [x] `filterIssues` - 이슈 필터링 로직
- [x] `sortIssues` - 이슈 정렬 로직
- [x] `calculateIssueStats` - 이슈 통계 계산
- [x] `canChangeStatus` - 이슈 상태 변경 가능 여부 확인
- [x] `calculateSubtaskProgress` - 서브태스크 진행률 계산
- [x] `validateIssueForm` - 이슈 폼 검증
- [x] `validateProjectForm` - 프로젝트 폼 검증
- [x] `calculateProjectIssueStats` - 프로젝트별 이슈 통계 계산
- [x] `calculateProjectProgress` - 프로젝트 진행률 계산
- [x] `calculateProjectMemberActivity` - 프로젝트별 멤버 활동 통계

**페이지 구현**
- [x] `/` - 대시보드 홈 페이지 (통계 카드, 활동 피드)
- [x] `/login` - 로그인 페이지 (이메일/비밀번호, OAuth)
- [x] `/register` - 회원가입 페이지 (3단계 프로세스, 비밀번호 검증)
- [x] `/issues` - 이슈 목록 페이지 (필터링, 정렬, 검색)
- [x] `/issues/[id]` - 이슈 상세 페이지 (상세 정보, 서브태스크, 댓글 구조)
- [x] `/projects` - 프로젝트 목록 페이지 (필터링, 검색, 즐겨찾기)
- [x] `/projects/[id]` - 프로젝트 상세 페이지 (상세 정보, 관련 이슈)
- [x] `/kanban` - 칸반 보드 페이지 (드래그 앤 드롭)
- [x] `/settings` - 설정 페이지 (테마, 언어, 접근성 설정)

#### 진행 중 작업

**리팩토링 완료 (2025-11-29)**
- [x] issues/page.tsx 리팩토링
  - StatCard 컴포넌트 사용 (약 30줄 감소)
  - FilterBar 컴포넌트 사용 (약 40줄 감소)
  - React import 수정
  - 사용되지 않는 코드 제거
- [x] FilterBar.tsx 타입 안전성 개선
  - any 타입을 제네릭으로 변경

**리팩토링 진행 중 (2025-11-29)**
- [x] projects/page.tsx 리팩토링
  - StatCard 컴포넌트 사용 (통계 카드 중복 제거, 약 25줄 감소)
  - FilterBar 컴포넌트 사용 (필터 UI 중복 제거, 약 25줄 감소)
  - React.useState → useState 수정
  - 사용되지 않는 코드 제거 (isFormOpen)

**UI 컴포넌트 연결 (P0)** ✅ 완료
- [x] Modal, Form 컴포넌트 확인 및 사용 예시 작성
- [x] IssueForm 컴포넌트 개발 (이슈 생성/수정)
- [x] ProjectForm 컴포넌트 개발 (프로젝트 생성/수정)
- [x] 이슈 상태 변경 UI 연결 (Dropdown)
- [x] 서브태스크 관리 UI 연결 (추가/수정/삭제) - SubtaskManager 컴포넌트
- [ ] NotificationDropdown 컴포넌트 개발 (Header 알림) - P1로 이동

**로직 구현 완료 (2025-11-29)**
- [x] 이슈 생성/수정/삭제 로직 (`useIssues.createIssue`, `useIssue.updateIssue`)
- [x] 이슈 상태 변경 로직 (`useIssue.changeStatus`)
- [x] 서브태스크 관리 로직 (추가/수정/삭제/토글/재정렬)
- [x] 프로젝트 생성/수정 로직 (`useProjects.createProject`, `useProject.updateProject`)
- [x] 프로젝트 통계 계산 로직 (`project-utils.ts`)
- [x] 팀 목록 조회 로직 (`useTeams`)
- [x] 팀 멤버 관리 로직 (`useTeam` - 초대/역할 변경/제거)
- [x] 폼 검증 로직 (`validateIssueForm`, `validateProjectForm`)

**UI 연결 완료 (2025-11-29)**
- [x] IssueForm 컴포넌트 개발 및 페이지 연결
- [x] ProjectForm 컴포넌트 개발 및 페이지 연결
- [x] 이슈 상태 변경 UI 연결 (Dropdown)
- [x] 서브태스크 관리 UI 연결 (SubtaskManager)
- [x] 팀 관리 컴포넌트 개발 및 페이지 연결 (TeamCard, TeamMemberList, InviteMemberForm)

**참고사항**
- UI 컴포넌트는 @hua-labs/ui 패키지 사용 중
- API 연동은 준비 완료 상태 (실제 엔드포인트 연결 대기)
- Mock 데이터 구조로 테스트 가능
- 모든 페이지 기본 구조 및 로직 완료
- **로직 구현 완료**: 이슈/프로젝트/팀 관리 핵심 로직 모두 구현 완료

---

### 2.3 Phase 3: 추가 기능 및 최적화 (P2)

#### 완료된 작업 (로직 위주)

**1. 설정 페이지** (로직 완료)
- [x] 설정 페이지 레이아웃 (기본 구조)
- [x] 테마 설정 로직 (다크/라이트/시스템 모드)
- [x] 언어 설정 로직 (한국어/영어/일본어)
- [x] 사용자 환경 설정 로직 (날짜 형식, 통화, 폰트 크기, 고대비, 모션 감소)
- [x] 설정 상태 관리 (`usePreferencesStore` 활용)

**2. 알림 및 피드백** (로직 완료)
- [x] 토스트 알림 시스템 로직 (`toastManager`, `useToast`)
- [x] 알림 관리 훅 (`useNotifications`)
- [x] 에러 메시지 처리 유틸리티
- [x] 성공/에러/경고/정보 피드백 로직

**3. 성능 최적화** (로직 완료)
- [x] 이미지 지연 로딩 유틸리티 (`createImageObserver`)
- [x] 디바운스/쓰로틀 함수 (`debounce`, `throttle`)
- [x] 가상 스크롤 계산 유틸리티 (`calculateVirtualScrollRange`)
- [x] 메모이제이션 헬퍼 (`memoize`)
- [ ] 코드 스플리팅 (Next.js 동적 import 준비)
- [ ] 번들 크기 최적화 (분석 준비)

**4. 접근성 개선** (로직 완료)
- [x] 키보드 이벤트 유틸리티 (`isKey`, `isActivationKey`, `isEscapeKey`, `isArrowKey`)
- [x] 포커스 트랩 유틸리티 (`createFocusTrap`)
- [x] ARIA 라이브 영역 유틸리티 (`announceToScreenReader`)
- [x] 색상 대비 검증 유틸리티 (`getContrastRatio`, `meetsWCAGAA`)
- [ ] ARIA 레이블 추가 (컴포넌트별 적용 대기)
- [ ] 스크린 리더 테스트 (수동 테스트 필요)

**5. 유틸리티 함수** (완료)
- [x] 데이터 내보내기 (`exportToCSV`, `exportToJSON`, `exportIssuesToCSV`)
- [x] 폼 검증 (`validateField`, `validateForm`, `validatePasswordStrength`)
- [x] 이메일/URL 검증 (`isValidEmail`, `isValidURL`)

**6. 테스트 및 버그 수정** (예정)
- [ ] 주요 기능 테스트
- [ ] 크로스 브라우저 테스트
- [ ] 반응형 테스트
- [ ] 버그 수정 및 개선

#### 추가 완료 사항

**커스텀 훅 (Hooks)**
- [x] `useNotifications` - 알림 목록 조회 및 읽음 처리
- [x] `useToast` - 토스트 메시지 관리

**유틸리티 함수**
- [x] `src/lib/utils/toast.ts` - 토스트 알림 시스템
- [x] `src/lib/utils/performance.ts` - 성능 최적화 유틸리티
- [x] `src/lib/utils/accessibility.ts` - 접근성 유틸리티
- [x] `src/lib/utils/export.ts` - 데이터 내보내기
- [x] `src/lib/utils/validation.ts` - 폼 검증

**페이지 구현**
- [x] `/settings` - 설정 페이지 (로직 완료, UI 스캐폴딩 완료)

**참고사항**
- UI 컴포넌트는 @hua-labs/ui 패키지 사용 중
- 성능 최적화는 유틸리티 함수로 준비 완료 (실제 적용은 컴포넌트 레벨에서)
- 접근성 유틸리티는 준비 완료 (컴포넌트에 적용 대기)
- 설정 페이지 로직 및 상태 관리 완료

---

## 3. 컴포넌트 및 라이브러리

### 3.1 설치된 외부 라이브러리

**필수 라이브러리:**
- `@dnd-kit/core` (^6.3.1) - Drag & Drop 기능 (Kanban Board용)
- `@dnd-kit/sortable` (^10.0.0) - 정렬 가능한 드래그 앤 드롭
- `@dnd-kit/utilities` - DnD 유틸리티 함수
- `react-datepicker` (^8.10.0) - 날짜 선택 컴포넌트
- `recharts` (^3.5.1) - 차트 라이브러리 (Pie Chart, Line Chart)
- `react-markdown` - 마크다운 렌더링 (이슈 설명용)
- `remark-gfm` - GitHub Flavored Markdown 지원

**유틸리티 라이브러리:**
- `clsx` (^2.1.1) - 클래스명 유틸리티
- `tailwind-merge` (^3.4.0) - Tailwind 클래스 병합
- `zustand` (^5.0.8) - 상태 관리

**UI 컴포넌트 라이브러리:**
- `@hua-labs/ui` (1.0.0) - 자체 UI 컴포넌트 패키지 (로컬 tarball)

### 3.2 프로젝트 내 커스텀 컴포넌트

**인증 컴포넌트** (`src/components/auth/`):
- `OAuthButton` - Google/GitHub/카카오 OAuth 로그인 버튼
- `PasswordInput` - 비밀번호 입력 (표시/숨김, 강도 표시)

**폼 컴포넌트** (`src/components/forms/`):
- `DatePicker` - 날짜 선택 (react-datepicker 래핑)
- `FileUpload` - 파일 업로드 (프로필 이미지용)
- `MultiSelect` - 다중 선택 (라벨 선택용)

**공통 컴포넌트** (`src/components/common/`):
- `EmptyState` - 빈 상태 표시
- `LoadingState` - 로딩 상태 표시
- `ErrorState` - 에러 상태 표시
- `Markdown` - 마크다운 렌더링 (이슈 설명용)

**이슈 컴포넌트** (`src/components/issue/`):
- `PriorityBadge` - 우선순위 배지 (HIGH/MEDIUM/LOW)
- `StatusBadge` - 상태 배지 (Backlog/In Progress/Done 등)

**칸반 컴포넌트** (`src/components/kanban/`):
- `KanbanBoard` - 칸반 보드 메인 컴포넌트
- `KanbanColumn` - 칸반 컬럼
- `KanbanCard` - 칸반 카드 (이슈 카드)

**차트 컴포넌트** (`src/components/charts/`):
- `PieChart` - 파이 차트 (recharts 래핑)
- `LineChart` - 라인 차트 (recharts 래핑)

**레이아웃 컴포넌트** (`src/components/layout/`):
- `AppLayout` - 메인 레이아웃 (사이드바 포함)
- `Header` - 헤더 컴포넌트 (알림, 프로필)
- `Sidebar` - 사이드바 네비게이션

### 3.3 컴포넌트 사용 가이드

**@hua-labs/ui 패키지 사용:**
```tsx
import { Button, Card, Input, Action } from '@hua-labs/ui';
```

**프로젝트 커스텀 컴포넌트 사용:**
```tsx
import { DatePicker, FileUpload, MultiSelect } from '@/components/forms';
import { EmptyState, LoadingState, ErrorState } from '@/components/common';
import { PriorityBadge, StatusBadge } from '@/components/issue';
import { KanbanBoard } from '@/components/kanban';
import { PieChart, LineChart } from '@/components/charts';
import { Header, Sidebar } from '@/components/layout';
```

---

## 4. 주요 기술적 결정

### 3.1 Next.js App Router 선택
- **이유**: 최신 Next.js 기능 활용, 서버 컴포넌트로 성능 향상, 파일 기반 라우팅의 직관성
- **결과**: 빠른 페이지 로딩, SEO 최적화, 서버 사이드 렌더링 지원
- **참고**: PaysByPays Dashboard 프로젝트 (`D:\dev\dashboard`)에서 검증된 패턴 활용

### 3.2 TypeScript 선택
- **이유**: 타입 안전성, 개발 생산성 향상, 유지보수성 향상
- **결과**: 컴파일 타임 에러 방지, 자동완성 지원, 코드 가독성 향상
- **참고**: PaysByPays Dashboard 프로젝트의 타입 정의 패턴 참고

### 3.3 Tailwind CSS 4 선택
- **이유**: 유틸리티 퍼스트 접근, 빠른 개발 속도, 일관된 디자인 시스템
- **결과**: 빠른 스타일링, 작은 번들 크기, 커스터마이징 용이
- **참고**: PaysByPays Dashboard 프로젝트의 CSS 변수 시스템 및 스타일링 패턴 참고

### 3.4 Git Flow 전략
- **이유**: 체계적인 브랜치 관리, 협업 효율성, 릴리스 관리 용이
- **결과**: 명확한 개발 프로세스, 충돌 최소화, 안정적인 배포

### 3.5 참고 프로젝트
- **PaysByPays Dashboard** (`D:\dev\dashboard`)
  - **역할**: SumUp 프로젝트의 레퍼런스 프로젝트 (완성본)
  - **참고 사항**:
    - 컴포넌트 구조 및 재사용 패턴
    - 상태 관리 방식 (Zustand)
    - API 클라이언트 구조
    - UI 디자인 가이드라인
    - 개발 프로세스 및 문서화 방식
  - **주요 학습 포인트**:
    - **리팩토링 전략**: 평균 60% 코드 감소 (페이지별 리팩토링 결과)
    - **컴포넌트 분리 전략**: 페이지 → 섹션 → 원자 컴포넌트 계층 구조
    - **재사용 컴포넌트**: 45개의 재사용 가능한 컴포넌트 생성
    - **커스텀 훅 패턴**: 12개 커스텀 훅 (복잡한 로직 캡슐화)
    - **필터 스토어 통합**: 통합 필터 스토어 패턴 (`filter-store.ts`)
    - **포맷팅 통일**: `useDisplayFormat` 훅으로 모든 포맷팅 통일
    - **섹션 헤더 패턴**: `SectionHeaderBlock` 컴포넌트 활용
    - **반응형 레이아웃**: 모바일, 태블릿, 데스크톱 대응
    - **데이터 시각화**: Recharts 활용 패턴
    - **다국어 지원**: i18n 구조 및 동적 로딩
  - **구체적 참고 코드**:
    - 필터 스토어: `src/store/filter-store.ts` (통합 필터 관리)
    - 섹션 헤더: `src/components/sections/SectionHeaderBlock.tsx`
    - 커스텀 훅: `src/hooks/useTransactionTable.ts`, `useTransactionDrawer.ts`
    - 포맷팅 훅: `src/hooks/useDisplayFormat.ts`

---

## 4. 개발 중 발견된 이슈 및 해결

### 4.1 현재까지 발견된 이슈
- 없음 (프로젝트 초기 단계)

### 4.2 예상 이슈 및 대응 방안
- **API 연동 이슈**: CORS 문제 발생 시 Next.js API 라우트를 통한 프록시 구현
- **성능 이슈**: 이미지 최적화, 코드 스플리팅, 지연 로딩 적용
- **반응형 이슈**: 모바일 퍼스트 접근, Tailwind 반응형 유틸리티 활용

---

## 5. 코드 품질 지표

### 5.1 컴포넌트 재사용성
- 목표: 재사용 가능한 컴포넌트 80% 이상
- 현재: 초기 단계 (17개 컴포넌트 완료)
- **레퍼런스**: PaysByPays Dashboard는 45개의 재사용 가능한 컴포넌트 생성
- **전략**: 페이지별 섹션 컴포넌트 분리, 공통 패턴 컴포넌트화

### 5.2 코드 중복
- 목표: 코드 중복 최소화, DRY 원칙 준수
- 현재: 초기 단계
- **레퍼런스**: PaysByPays Dashboard는 리팩토링으로 평균 60% 코드 감소
- **전략**: 공통 로직을 커스텀 훅으로 추출, 유틸리티 함수 통일

### 5.3 일관성
- 목표: 모든 페이지에서 동일한 패턴 및 스타일 사용
- 현재: 초기 단계
- **레퍼런스**: PaysByPays Dashboard는 섹션 헤더, 필터 패널 등 일관된 패턴 사용
- **전략**: `SectionHeaderBlock`, `FilterBar`, `StatCard` 등 공통 컴포넌트 활용

### 5.4 유지보수성
- 목표: 파일당 평균 300줄 이하, 명확한 함수/컴포넌트 분리
- 현재: 초기 단계
- **레퍼런스**: PaysByPays Dashboard는 리팩토링 후 대부분의 페이지가 300줄 이하
- **전략**: 페이지 → 섹션 → 원자 컴포넌트 계층 구조, 복잡한 로직은 커스텀 훅으로 분리

---

## 6. 테스트 및 검증

### 6.1 기능 테스트
- [ ] 모든 페이지 정상 작동 확인
- [ ] 주요 기능 동작 검증
- [ ] 에러 처리 검증

### 6.2 성능 테스트
- [ ] 초기 로딩 시간 측정
- [ ] 페이지 전환 속도 확인
- [ ] 번들 크기 확인

### 6.3 접근성 테스트
- [ ] 키보드 네비게이션 검증
- [ ] 스크린 리더 호환성 확인
- [ ] WCAG AA 기준 준수 확인

### 6.4 반응형 테스트
- [ ] 데스크톱 (≥1280px) 테스트
- [ ] 태블릿 (1024px - 1279px) 테스트
- [ ] 모바일 (<1024px) 테스트

---

## 7. 배포 및 운영

### 7.1 빌드 설정
- **빌드 명령**: `npm run build`
- **프로덕션 서버**: `npm start`
- **환경 변수**: `.env.local` 파일 사용

### 7.2 배포 환경
- **플랫폼**: TBD (Vercel 권장)
- **Node.js 버전**: 20.x LTS
- **빌드 시간**: 목표 2-3분 이내

### 7.3 환경 변수
```env
# .env.local 예시
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
# 기타 필요한 환경 변수
```

---

## 8. 향후 개선 계획

### 8.1 즉시 구현 (P0)
- [ ] 기본 레이아웃 및 네비게이션 구현
- [ ] 메인 페이지 구현
- [ ] API 클라이언트 설정

### 8.2 단기 개선 (P1)
- [ ] 데이터 표시 기능 구현
- [ ] 검색 기능 구현
- [ ] 상세 보기 구현

### 8.3 중기 개선 (P2)
- [ ] 설정 페이지 구현
- [ ] 알림 시스템 구현
- [ ] 성능 최적화
- [ ] 접근성 개선
- [ ] **리팩토링 및 코드 품질 개선** (레퍼런스 프로젝트 패턴 적용)
  - [ ] 페이지별 섹션 컴포넌트 분리
  - [ ] 복잡한 로직을 커스텀 훅으로 추출
  - [ ] 필터 스토어 통합 (현재는 이슈/프로젝트 분리, 향후 통합 검토)
  - [ ] 포맷팅 함수 통일 (`useDisplayFormat` 훅 도입 검토)
  - [ ] 섹션 헤더 컴포넌트 패턴 적용

---

## 9. 개발 통계

### 9.1 코드 통계
- **총 파일 수**: TBD
- **총 코드 라인**: TBD
- **컴포넌트 수**: TBD
- **커스텀 훅 수**: TBD

### 9.2 페이지 통계
- **총 페이지 수**: TBD
- **동적 라우트 페이지**: TBD
- **API 라우트**: TBD

### 9.3 문서 통계
- **문서 파일 수**: 5개
- **총 문서 라인**: 약 2,000줄

---

## 10. 주요 성과

### 10.1 프로젝트 설정
- Next.js + TypeScript + Tailwind CSS 4 기본 세팅 완료
- Git 저장소 초기화 및 브랜치 구조 구성
- 문서 스캐폴드 완성

### 10.2 문서화
- PRD 작성 완료
- 개발 계획 작성 완료
- 협업 가이드라인 작성 완료
- Git Flow 문서 작성 완료
- UI 디자인 가이드라인 작성 완료

### 10.3 코드 품질
- TypeScript 설정 완료
- ESLint 설정 완료
- 프로젝트 구조 확립

### 10.4 컴포넌트 개발 (2025-11-29)
- [x] @hua-labs/ui 패키지 빌드 및 설치
- [x] 외부 라이브러리 설치 (@dnd-kit, react-datepicker, recharts, react-markdown)
- [x] 인증 컴포넌트 개발 (OAuthButton, PasswordInput) - 2개 완료
- [x] 폼 컴포넌트 개발 (DatePicker, FileUpload, MultiSelect) - 3개 완료
- [x] 공통 컴포넌트 개발 (EmptyState, LoadingState, ErrorState, Markdown) - 4개 완료
- [x] 이슈 컴포넌트 개발 (PriorityBadge, StatusBadge) - 2개 완료
- [x] 칸반 컴포넌트 개발 (KanbanBoard, KanbanColumn, KanbanCard) - 3개 완료
- [x] 차트 컴포넌트 개발 (PieChart, LineChart) - 2개 완료
- [x] 레이아웃 컴포넌트 개발 (Header, Sidebar) - 2개 완료
- [x] 컴포넌트 문서 작성 (COMPONENTS.md, COMPONENT_STATUS.md)
- **총 17개 컴포넌트 완료**

---

## 11. 다음 단계 및 우선순위

### 11.1 즉시 진행할 작업 (P0 - 필수)

#### 11.1.1 이슈/프로젝트 폼 컴포넌트
- [ ] `IssueForm` 컴포넌트 개발 (이슈 생성/수정)
  - 로직: `useIssues.createIssue()`, `useIssue.updateIssue()` 사용 가능
  - 필요한 컴포넌트: Modal, Form, Input, Select, DatePicker, MultiSelect
  - 우선순위: **P0 (필수)**

- [ ] `ProjectForm` 컴포넌트 개발 (프로젝트 생성/수정)
  - 로직: `useProjects.createProject()`, `useProject.updateProject()` 사용 가능
  - 필요한 컴포넌트: Modal, Form, Input, Textarea
  - 우선순위: **P0 (필수)**

#### 11.1.2 팀 관리 컴포넌트
- [ ] `TeamCard` - 팀 목록 표시
- [ ] `TeamMemberList` - 팀 멤버 목록
- [ ] `InviteMemberForm` - 멤버 초대 폼
- 로직: `useTeams`, `useTeam` 훅 사용 가능
- 우선순위: **P0 (필수)**

### 11.2 단기 목표 (P1 - 권장)

#### 11.2.1 UI 개선 ✅
- [x] `NotificationDropdown` - 알림 드롭다운 (Header에 연결)
- [x] `NotificationItem` - 알림 아이템
- [ ] `SearchInput` - 고급 검색 입력 필드 (선택사항, 기본 Input으로 대체 가능)
- [ ] `FilterPanel` - 필터 패널 (선택사항, 현재 FilterBar로 대체 가능)

#### 11.2.2 성능 최적화
- [ ] 코드 스플리팅 적용 (KanbanBoard, Charts)
- [ ] 번들 크기 최적화
- [ ] ARIA 레이블 추가 (컴포넌트별 적용)

### 11.3 중기 목표 (P2 - 선택)

#### 11.3.1 추가 기능
- [ ] `ChangeHistory` - 변경 이력 컴포넌트
- [ ] `LabelColorPicker` - 라벨 색상 선택기
- [ ] `ProfileForm` - 프로필 수정 폼
- [ ] `PasswordChangeForm` - 비밀번호 변경 폼

#### 11.3.2 테스트 및 검증
- [ ] 기능 테스트
- [ ] 성능 테스트
- [ ] 접근성 테스트
- [ ] 반응형 테스트

---

## 12. 로직 구현 현황

### 12.1 완료된 로직 ✅

#### 인증 및 사용자 관리
- [x] 사용자 인증 상태 관리 (`useAuthStore`)
- [x] 로그인/로그아웃 로직
- [x] OAuth 연동 준비 (Google, GitHub, 카카오)
- [x] 보호된 라우트 미들웨어
- [x] 회원가입 폼 관리 (`useRegisterForm`)
- [x] 비밀번호 검증 (`usePasswordValidation`)

#### 이슈 관리
- [x] 이슈 목록 조회 및 필터링 (`useIssues`, `useIssueFilterStore`)
- [x] 이슈 상세 조회 (`useIssue`)
- [x] 이슈 생성/수정 로직 (`useIssues.createIssue`, `useIssue.updateIssue`)
- [x] 이슈 상태 변경 로직 (`useIssue.changeStatus`)
- [x] 이슈 필터링/정렬 로직 (`filterIssues`, `sortIssues`)
- [x] 이슈 통계 계산 (`calculateIssueStats`)
- [x] 서브태스크 관리 로직 (추가/수정/삭제/토글/재정렬)
- [x] 댓글 CRUD 로직 (`useIssue`에 통합)

#### 프로젝트 관리
- [x] 프로젝트 목록 조회 및 필터링 (`useProjects`)
- [x] 프로젝트 상세 조회 (`useProject`)
- [x] 프로젝트 생성/수정 로직 (`useProjects.createProject`, `useProject.updateProject`)
- [x] 프로젝트 아카이브/즐겨찾기 로직
- [x] 프로젝트 통계 계산 (`calculateProjectIssueStats`, `calculateProjectProgress`)

#### 팀 관리
- [x] 팀 목록 조회 (`useTeams`)
- [x] 팀 상세 조회 및 멤버 관리 (`useTeam` - 초대/역할 변경/제거)

#### 칸반 보드
- [x] 칸반 보드 드래그 앤 드롭 로직
- [x] 카드 이동/재정렬 로직

#### 설정 및 환경설정
- [x] 테마 설정 로직 (`usePreferencesStore`)
- [x] 언어 설정 로직
- [x] 접근성 설정 로직 (폰트 크기, 고대비, 모션 감소)

#### 알림 및 피드백
- [x] 토스트 알림 시스템 로직 (`useToast`, `toast.ts`)
- [x] 알림 관리 훅 (`useNotifications`)

#### 유틸리티
- [x] 성능 최적화 유틸리티 (`debounce`, `throttle`, `memoize`)
- [x] 접근성 유틸리티 (키보드 이벤트, 포커스 트랩, ARIA)
- [x] 데이터 내보내기 유틸리티 (`exportToCSV`, `exportToJSON`)
- [x] 폼 검증 유틸리티 (`validateIssueForm`, `validateProjectForm`)

### 12.2 UI 연결 필요 항목

#### P0 (필수)
- [ ] `IssueForm` - 이슈 생성/수정 폼 (로직 완료, UI 필요)
- [ ] `ProjectForm` - 프로젝트 생성/수정 폼 (로직 완료, UI 필요)
- [ ] 팀 관리 컴포넌트 (로직 완료, UI 필요)

#### P1 (권장)
- [ ] `NotificationList` - 알림 목록 (로직 완료, UI 필요)
- [ ] 고급 검색/필터 UI (기본 기능은 완료, UX 개선)

---

## 13. 문서화

---

## 12. 문서화

### 12.1 생성된 문서
1. **PRD.md**: 제품 요구사항 문서
2. **DEVELOPMENT_PLAN.md**: 이 문서 (개발 계획)
3. **COLLABORATION_GUIDELINES.md**: 협업 가이드라인
4. **GITFLOW.md**: Git Flow 문서
5. **UI_DESIGN_GUIDELINES.md**: UI 디자인 가이드라인

### 12.2 문서 품질
- 실제 프로젝트 구조 기반으로 작성
- 상세한 기술 설명 포함
- 실용적인 가이드라인 제공

### 12.3 참고 프로젝트
- **PaysByPays Dashboard** (`D:\dev\dashboard`)
  - **역할**: 레퍼런스 프로젝트 (완성본)
  - **참고 문서**:
    - `docs/ARCHITECTURE.md`: 아키텍처 패턴 및 기술 스택
    - `docs/DEVELOPMENT.md`: 개발 진행 내역 및 리팩토링 결과
    - `docs/FEATURES.md`: 기능 설명 및 구현 방법
    - `docs/PACKAGES.md`: 자체 개발 패키지 사용 현황
  - **주요 참고 사항**:
    - 컴포넌트 구조, 아키텍처, 개발 프로세스
    - 리팩토링 전략 (평균 60% 코드 감소)
    - 필터 스토어 통합 패턴
    - 커스텀 훅 패턴 (복잡한 로직 캡슐화)
    - 포맷팅 통일 전략
    - 섹션 헤더 패턴
  - **자세한 내용**: PRD.md 12.1 참고 프로젝트 섹션 참조

---

**문서 작성일**: 2025-11-29  
**마지막 업데이트**: 2025-11-29
