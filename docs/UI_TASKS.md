# UI 작업 제안서

> **프로젝트**: SumUp  
> **작성일**: 2025-11-29  
> **상태**: 제안 단계

---

## 1. 작업 현황 요약

### 1.1 완료된 작업 (약 30%)

#### ✅ 완료된 컴포넌트
- **설정 컴포넌트** (100%)
  - ThemeSection, LanguageSection, AccessibilitySection
  - SettingsSelect, PreferenceToggle, LivePreview
  - 다크모드, 반응형, 보더 라디우스 완료

- **팀 관리 컴포넌트** (100%)
  - TeamCard, TeamMemberList, InviteMemberForm
  - 다크모드, 반응형, 보더 라디우스 완료

- **알림 컴포넌트** (100%)
  - NotificationItem, NotificationDropdown
  - 다크모드, 반응형, 보더 라디우스 완료

### 1.2 미완료 작업 (약 70%)

#### ❌ 보더 라디우스 미적용 (36개 파일)
- `rounded-xl` (12px) → `rounded-lg` (8px) 변경 필요
- 주요 파일:
  - 이슈 관련: `IssueForm`, `SubtaskManager`, `CommentList`, `AIFeatures`
  - 프로젝트 관련: `ProjectForm`, 프로젝트 페이지들
  - 공통: `StatCard`, `FilterBar`, `EmptyState`, `ErrorState`
  - 페이지: `issues/page.tsx`, `projects/page.tsx`, `kanban/page.tsx`, `page.tsx` 등

#### ❌ 다크모드 일관성 부족 (94개 매치, 일부만 적용)
- CSS 변수 사용 권장 (`var(--text-strong)`, `var(--surface)` 등)
- 하드코딩된 색상 값 제거 필요
- 주요 미적용 컴포넌트:
  - 이슈 관련 컴포넌트들
  - 프로젝트 관련 컴포넌트들
  - 폼 컴포넌트들
  - 공통 컴포넌트들

#### ❌ 반응형 미적용 (35개 매치, 일부만 적용)
- 모바일/태블릿/데스크톱 브레이크포인트 적용 필요
- 주요 미적용:
  - 페이지 레이아웃들
  - 테이블/리스트 뷰
  - 폼 레이아웃
  - 모달/드로어 크기

---

## 2. 우선순위별 작업 제안

### 2.1 P0 (필수) - 즉시 진행

#### 2.1.1 보더 라디우스 통일 (4-8px 제한) ✅
**목표**: 모든 컴포넌트의 보더 라디우스를 4-8px로 제한

**작업 범위**:
- [x] 이슈 관련 컴포넌트 (8개 파일)
  - `IssueForm.tsx`, `SubtaskManager.tsx`, `CommentList.tsx`, `AIFeatures.tsx`
  - `IssueFormFields.tsx`, `CommentForm.tsx`, `CommentItem.tsx`
  - `PriorityBadge.tsx`, `StatusBadge.tsx`
- [x] 프로젝트 관련 컴포넌트 (3개 파일)
  - `ProjectForm.tsx`, `ProjectFormFields.tsx`
- [x] 공통 컴포넌트 (7개 파일)
  - `StatCard.tsx`, `FilterBar.tsx`, `EmptyState.tsx`, `ErrorState.tsx`
  - `LoadingState.tsx`, `Markdown.tsx`, `MetaInfoCard.tsx`
- [x] 폼 컴포넌트 (3개 파일)
  - `DatePicker.tsx`, `FileUpload.tsx`, `MultiSelect.tsx`
- [x] 인증 컴포넌트 (2개 파일)
  - `PasswordInput.tsx`, `PasswordChecklist.tsx`
- [x] 페이지들 (10개 파일)
  - `app/issues/page.tsx`, `app/issues/[id]/page.tsx`
  - `app/projects/page.tsx`, `app/projects/[id]/page.tsx`
  - `app/kanban/page.tsx`, `app/page.tsx`
  - `app/search/page.tsx`, `app/register/page.tsx`, `app/login/page.tsx`
  - `app/profile/page.tsx`

**변경 규칙**:
- `rounded-xl` (12px) → `rounded-lg` (8px) ✅
- 작은 요소: `rounded-md` (6px) 또는 `rounded` (4px) ✅
- 버튼 내부 아이콘: `rounded-md` (6px) ✅

**완료 날짜**: 2025-11-29

#### 2.1.2 다크모드 가독성 개선
**목표**: 모든 컴포넌트에서 다크모드 가독성 확보

**작업 범위**:
- [ ] CSS 변수로 색상 통일
  - 하드코딩된 색상 값 제거 (`text-gray-900`, `bg-white` 등)
  - CSS 변수 사용 (`var(--text-strong)`, `var(--surface)` 등)
- [ ] 다크모드 색상 대비 개선
  - 텍스트: `text-[var(--text-strong)]`, `text-[var(--text-muted)]`
  - 배경: `bg-[var(--surface)]`, `bg-[var(--surface-muted)]`
  - 테두리: `border-[var(--border-subtle)]`
- [ ] Badge, Button 색상 다크모드 지원
  - `dark:bg-*`, `dark:text-*` 클래스 추가
  - 또는 CSS 변수 사용

**주요 컴포넌트**:
- 이슈 관련: `IssueForm`, `SubtaskManager`, `CommentList`, `AIFeatures`
- 프로젝트 관련: `ProjectForm`
- 공통: `StatCard`, `FilterBar`, `EmptyState`, `ErrorState`
- 폼: `DatePicker`, `FileUpload`, `MultiSelect`
- 인증: `PasswordInput`, `PasswordChecklist`

#### 2.1.3 반응형 레이아웃 적용
**목표**: 모든 페이지와 컴포넌트가 모바일/태블릿/데스크톱에서 정상 작동

**작업 범위**:
- [ ] 페이지 레이아웃 반응형
  - 그리드: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
  - 플렉스: `flex-col sm:flex-row`
  - 패딩/간격: `p-2 sm:p-3 lg:p-4`, `gap-2 sm:gap-3 lg:gap-4`
- [ ] 테이블/리스트 반응형
  - 모바일: 카드 뷰로 전환
  - 태블릿: 간소화된 테이블
  - 데스크톱: 전체 테이블
- [ ] 폼 레이아웃 반응형
  - 입력 필드: `w-full sm:w-auto`
  - 버튼: `w-full sm:w-auto`
  - 레이블/입력: `flex-col sm:flex-row`
- [ ] 모달/드로어 반응형
  - 모바일: 전체 화면 또는 하단 시트
  - 데스크톱: 중앙 모달 또는 사이드 드로어

**주요 페이지**:
- `app/issues/page.tsx` - 이슈 목록 (테이블 → 카드)
- `app/projects/page.tsx` - 프로젝트 목록 (그리드 반응형)
- `app/issues/[id]/page.tsx` - 이슈 상세 (레이아웃 반응형)
- `app/projects/[id]/page.tsx` - 프로젝트 상세 (레이아웃 반응형)
- `app/kanban/page.tsx` - 칸반 보드 (가로 스크롤 처리)

### 2.2 P1 (권장) - 단기 목표

#### 2.2.1 접근성 개선
**목표**: WCAG 2.1 AA 수준 접근성 확보

**작업 범위**:
- [ ] ARIA 레이블 추가
  - 버튼, 링크, 입력 필드에 `aria-label` 추가
  - 폼 필드에 `aria-describedby` 추가
- [ ] 키보드 네비게이션 개선
  - 포커스 순서 최적화
  - 포커스 스타일 개선 (`focus:ring-2 focus:ring-[var(--brand-primary)]`)
- [ ] 색상 대비 개선
  - 텍스트/배경 대비 비율 4.5:1 이상 확보
  - 색상만으로 정보 전달하지 않기

#### 2.2.2 UI 일관성 개선
**목표**: 모든 컴포넌트의 디자인 일관성 확보

**작업 범위**:
- [ ] 간격 통일
  - 모든 컴포넌트에서 동일한 간격 사용
  - `gap-2`, `gap-3`, `gap-4` 등 일관성 유지
- [ ] 타이포그래피 통일
  - 제목, 본문, 설명 텍스트 크기 통일
  - 폰트 웨이트 통일
- [ ] 그림자 통일
  - `shadow-sm`, `shadow-md`, `shadow-lg` 사용 규칙 통일
- [ ] 호버 효과 통일
  - 버튼, 카드, 링크 호버 효과 통일

#### 2.2.3 로딩/에러 상태 UI 개선
**목표**: 사용자 경험 개선을 위한 로딩/에러 상태 UI 개선

**작업 범위**:
- [ ] 스켈레톤 로딩 추가
  - 테이블, 카드 리스트에 스켈레톤 UI 추가
- [ ] 에러 상태 개선
  - 명확한 에러 메시지
  - 재시도 버튼 추가
  - 에러 아이콘 및 색상 통일
- [ ] 빈 상태 개선
  - 명확한 안내 메시지
  - 액션 버튼 추가

### 2.3 P2 (선택) - 중기 목표

#### 2.3.1 애니메이션 및 전환 효과
**목표**: 부드러운 사용자 경험을 위한 애니메이션 추가

**작업 범위**:
- [ ] 페이지 전환 애니메이션
- [ ] 모달/드로어 애니메이션
- [ ] 리스트 아이템 추가/제거 애니메이션
- [ ] 로딩 스피너 애니메이션

#### 2.3.2 고급 UI 기능
**목표**: 사용자 편의성 향상을 위한 고급 기능 추가

**작업 범위**:
- [ ] 드래그 앤 드롭 시각적 피드백 개선
- [ ] 키보드 단축키 안내
- [ ] 툴팁 추가
- [ ] 컨텍스트 메뉴 개선

---

## 3. 작업 우선순위 매트릭스

| 작업 | 우선순위 | 예상 시간 | 영향도 | 난이도 |
|------|---------|----------|--------|--------|
| 보더 라디우스 통일 | P0 | 2-3시간 | 높음 | 낮음 |
| 다크모드 가독성 개선 | P0 | 4-5시간 | 높음 | 중간 |
| 반응형 레이아웃 적용 | P0 | 6-8시간 | 높음 | 중간 |
| 접근성 개선 | P1 | 3-4시간 | 중간 | 중간 |
| UI 일관성 개선 | P1 | 2-3시간 | 중간 | 낮음 |
| 로딩/에러 상태 UI 개선 | P1 | 2-3시간 | 중간 | 낮음 |
| 애니메이션 및 전환 효과 | P2 | 4-5시간 | 낮음 | 높음 |
| 고급 UI 기능 | P2 | 6-8시간 | 낮음 | 높음 |

---

## 4. 작업 진행 방법

### 4.1 단계별 진행
1. **1단계**: 보더 라디우스 통일 (가장 빠르고 영향도 높음)
2. **2단계**: 다크모드 가독성 개선
3. **3단계**: 반응형 레이아웃 적용
4. **4단계**: 접근성 및 일관성 개선

### 4.2 컴포넌트별 진행
- 이슈 관련 컴포넌트 → 프로젝트 관련 컴포넌트 → 공통 컴포넌트 → 페이지 순서

### 4.3 검증 방법
- 각 작업 완료 후 브라우저에서 다크모드/라이트모드 전환 테스트
- 모바일/태블릿/데스크톱 화면 크기별 테스트
- 보더 라디우스 시각적 확인

---

## 5. 참고 자료

- [UI_DESIGN_GUIDELINES.md](./UI_DESIGN_GUIDELINES.md) - UI 디자인 가이드라인
- [DEVELOPMENT_PLAN.md](./DEVELOPMENT_PLAN.md) - 개발 계획
- [COMPONENTS.md](./COMPONENTS.md) - 컴포넌트 문서

---

**작성일**: 2025-11-29  
**마지막 업데이트**: 2025-11-29

