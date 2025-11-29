# Components Documentation

> **Date**: 2025-11-29  
> **Project**: SumUp  
> **Last Updated**: 2025-11-29

프로젝트에서 사용하는 모든 컴포넌트에 대한 문서입니다.

---

## 1. 컴포넌트 개요

### 1.1 컴포넌트 소스

**외부 패키지:**
- `@hua-labs/ui` - 자체 UI 컴포넌트 라이브러리 (로컬 tarball)

**프로젝트 내 커스텀 컴포넌트:**
- 인증, 폼, 공통, 이슈, 칸반, 차트, 레이아웃 컴포넌트

---

## 2. 컴포넌트 목록

### 2.1 인증 컴포넌트 (`src/components/auth/`)

#### OAuthButton
Google, GitHub, 카카오 OAuth 로그인 버튼

**Props:**
- `provider`: "google" | "github" | "kakao"
- `onSuccess?: (token: string) => void`
- `onError?: (error: Error) => void`

**사용 예시:**
```tsx
import { OAuthButton } from '@/components/auth';

<OAuthButton provider="google" onSuccess={handleSuccess} />
```

#### PasswordInput
비밀번호 입력 필드 (표시/숨김 토글, 강도 표시)

**Props:**
- `showStrength?: boolean` - 비밀번호 강도 표시 여부
- `label?: string` - 라벨
- `error?: boolean` - 에러 상태

**사용 예시:**
```tsx
import { PasswordInput } from '@/components/auth';

<PasswordInput 
  label="비밀번호" 
  showStrength 
  onChange={handleChange} 
/>
```

#### PasswordChecklist
비밀번호 요구사항 체크리스트 컴포넌트

**Props:**
- `password: string` - 검증할 비밀번호
- `confirm?: string` - 확인 비밀번호 (선택)
- `lang?: "ko" | "en"` - 언어 설정 (기본: "ko")
- `className?: string` - 추가 클래스명

**기능:**
- 8자 이상, 대문자, 소문자, 숫자, 특수문자 포함 여부 체크
- 비밀번호 일치 여부 확인
- 실시간 검증 상태 표시

**사용 예시:**
```tsx
import { PasswordChecklist } from '@/components/auth';

<PasswordChecklist 
  password={password} 
  confirm={confirmPassword} 
/>
```

---

### 2.2 폼 컴포넌트 (`src/components/forms/`)

#### DatePicker
날짜 선택 컴포넌트 (react-datepicker 래핑)

**Props:**
- `error?: boolean` - 에러 상태
- `label?: string` - 라벨
- 기타 react-datepicker props

**사용 예시:**
```tsx
import { DatePicker } from '@/components/forms';

<DatePicker 
  label="마감일" 
  selected={date} 
  onChange={setDate} 
/>
```

#### FileUpload
파일 업로드 컴포넌트 (프로필 이미지용)

**Props:**
- `onFileSelect?: (file: File | null) => void`
- `accept?: string` - 허용 파일 타입
- `maxSize?: number` - 최대 파일 크기 (MB)
- `preview?: boolean` - 이미지 미리보기
- `label?: string` - 라벨

**사용 예시:**
```tsx
import { FileUpload } from '@/components/forms';

<FileUpload 
  label="프로필 이미지" 
  accept="image/*" 
  maxSize={5} 
  preview 
  onFileSelect={handleFileSelect} 
/>
```

#### MultiSelect
다중 선택 컴포넌트 (라벨 선택용)

**Props:**
- `options: MultiSelectOption[]` - 선택 옵션
- `value?: string[]` - 선택된 값
- `onChange?: (values: string[]) => void`
- `maxSelections?: number` - 최대 선택 개수
- `label?: string` - 라벨

**사용 예시:**
```tsx
import { MultiSelect } from '@/components/forms';

<MultiSelect 
  label="라벨 선택" 
  options={labelOptions} 
  value={selectedLabels} 
  onChange={setSelectedLabels} 
  maxSelections={5} 
/>
```

---

### 2.3 공통 컴포넌트 (`src/components/common/`)

#### EmptyState
빈 상태 표시 컴포넌트

**Props:**
- `title: string` - 제목
- `description?: string` - 설명
- `icon?: React.ReactNode` - 커스텀 아이콘
- `iconName?: string` - 아이콘 이름
- `action?: { label: string; onClick: () => void; variant?: "primary" | "outline" | "ghost" }`

**사용 예시:**
```tsx
import { EmptyState } from '@/components/common';

<EmptyState 
  title="이슈가 없습니다" 
  description="새로운 이슈를 생성해보세요" 
  action={{ label: "이슈 생성", onClick: handleCreate }} 
/>
```

#### LoadingState
로딩 상태 표시 컴포넌트

**Props:**
- `message?: string` - 로딩 메시지
- `fullScreen?: boolean` - 전체 화면 로딩
- `size?: "sm" | "md" | "lg"` - 스피너 크기

**사용 예시:**
```tsx
import { LoadingState } from '@/components/common';

<LoadingState message="데이터를 불러오는 중..." />
```

#### ErrorState
에러 상태 표시 컴포넌트

**Props:**
- `title?: string` - 에러 제목
- `message: string` - 에러 메시지
- `onRetry?: () => void` - 재시도 핸들러
- `retryLabel?: string` - 재시도 버튼 라벨

**사용 예시:**
```tsx
import { ErrorState } from '@/components/common';

<ErrorState 
  message="데이터를 불러오는데 실패했습니다" 
  onRetry={handleRetry} 
/>
```

#### Markdown
마크다운 렌더링 컴포넌트 (이슈 설명용)

**Props:**
- `content: string` - 마크다운 콘텐츠

**사용 예시:**
```tsx
import { Markdown } from '@/components/common';

<Markdown content={issueDescription} />
```

#### ScrollToTop
스크롤 투 탑 버튼 컴포넌트

**기능:**
- 스크롤 위치가 300px 이상일 때 표시
- 클릭 시 부드럽게 페이지 상단으로 스크롤
- SumUp 디자인 시스템 적용 (CSS 변수, border-radius 8px)

**사용 예시:**
```tsx
import { ScrollToTop } from '@/components/common';

// AppLayout에 통합되어 자동으로 표시됨
<ScrollToTop />
```

**참고:**
- `D:\dev\dashboard\src\components\ScrollToTop.tsx` 참고

---

### 2.4 이슈 컴포넌트 (`src/components/issue/`)

#### PriorityBadge
우선순위 배지 컴포넌트

**Props:**
- `priority: "HIGH" | "MEDIUM" | "LOW"`
- `showIcon?: boolean` - 아이콘 표시 여부
- `size?: "sm" | "md" | "lg"` - 크기

**사용 예시:**
```tsx
import { PriorityBadge } from '@/components/issue';

<PriorityBadge priority="HIGH" />
```

#### StatusBadge
상태 배지 컴포넌트

**Props:**
- `status: string` - 상태 이름
- `color?: string` - 커스텀 색상 (HEX)
- `size?: "sm" | "md" | "lg"` - 크기

**사용 예시:**
```tsx
import { StatusBadge } from '@/components/issue';

<StatusBadge status="In Progress" />
<StatusBadge status="Custom Status" color="#FF6B35" />
```

#### IssueForm
이슈 생성/수정 폼 컴포넌트 (Modal)

**Props:**
- `isOpen: boolean` - 모달 열림 상태
- `onClose: () => void` - 닫기 핸들러
- `issueId?: string` - 수정 모드일 때 이슈 ID
- `projectId?: string` - 생성 모드일 때 기본 프로젝트 ID
- `onSuccess?: () => void` - 성공 시 콜백

**기능:**
- 이슈 생성 및 수정
- 제목, 설명, 프로젝트, 상태, 우선순위, 마감일, 담당자, 라벨 설정
- 폼 유효성 검증
- Toast 알림 표시

**사용 예시:**
```tsx
import { IssueForm } from '@/components/issue';

<IssueForm
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  issueId={issueId} // 수정 모드
  onSuccess={() => {
    // 성공 후 처리
  }}
/>
```

#### SubtaskManager
서브태스크 관리 컴포넌트

**Props:**
- `issueId: string` - 이슈 ID
- `subtasks: Subtask[]` - 서브태스크 목록

**기능:**
- 서브태스크 추가/수정/삭제
- 완료 상태 토글
- 진행률 표시
- 실시간 업데이트

**사용 예시:**
```tsx
import { SubtaskManager } from '@/components/issue';

<SubtaskManager
  issueId={issue.id}
  subtasks={issue.subtasks || []}
/>
```

---

## 3. 커스텀 훅 (Hooks)

### 3.1 인증 관련 훅

#### useRegisterForm
회원가입 폼 관리 훅 (단계별 프로세스)

**위치:** `src/hooks/useRegisterForm.ts`

**기능:**
- 3단계 회원가입 프로세스 관리 (이메일 → 비밀번호 → 약관)
- 이메일/비밀번호 검증
- 회원가입 API 호출
- 단계별 네비게이션

**반환값:**
- `currentStep`: 현재 단계 ('email' | 'password' | 'terms' | 'complete')
- `formData`: 폼 데이터 (email, password, confirmPassword, agreeToTerms)
- `isLoading`: 로딩 상태
- `error`: 에러 메시지
- `updateFormData`: 폼 데이터 업데이트
- `validateEmailAndNext`: 이메일 검증 후 다음 단계
- `validatePasswordAndNext`: 비밀번호 검증 후 다음 단계
- `prevStep`: 이전 단계로 이동
- `register`: 회원가입 실행

**사용 예시:**
```tsx
import { useRegisterForm } from '@/hooks/useRegisterForm';

const { currentStep, formData, updateFormData, register } = useRegisterForm();
```

#### usePasswordValidation
비밀번호 검증 훅 (실시간 검증)

**위치:** `src/hooks/usePasswordValidation.ts`

**기능:**
- 비밀번호 규칙 검증 (8자 이상, 대소문자, 숫자, 특수문자)
- 비밀번호 일치 확인
- 실시간 검증 결과 반환
- 비밀번호 강도 계산

**파라미터:**
- `password`: 검증할 비밀번호
- `confirmPassword`: 확인 비밀번호 (선택)
- `checkMatch`: 일치 확인 여부 (기본: true)

**반환값:**
- `isValid`: 전체 유효성 (규칙 + 일치)
- `isPasswordValid`: 비밀번호 규칙 유효성
- `isMatch`: 비밀번호 일치 여부
- `errors`: 에러 메시지 배열
- `strength`: 비밀번호 강도 ('weak' | 'medium' | 'strong')

**사용 예시:**
```tsx
import { usePasswordValidation } from '@/hooks/usePasswordValidation';

const validation = usePasswordValidation({
  password,
  confirmPassword,
});
```

---

### 2.5 칸반 컴포넌트 (`src/components/kanban/`)

#### KanbanBoard
칸반 보드 메인 컴포넌트

**Props:**
- `statuses: KanbanStatus[]` - 상태 목록
- `cards: KanbanCard[]` - 카드 목록
- `onCardMove?: (cardId: string, newStatusId: string, newOrder: number) => void`
- `onCardReorder?: (cardId: string, statusId: string, newOrder: number) => void`
- `onCardClick?: (cardId: string) => void`
- `wipLimits?: Record<string, number>` - WIP 제한

**사용 예시:**
```tsx
import { KanbanBoard } from '@/components/kanban';

<KanbanBoard 
  statuses={statuses} 
  cards={cards} 
  onCardMove={handleCardMove} 
  wipLimits={{ "In Progress": 10 }} 
/>
```

#### KanbanCard
칸반 카드 컴포넌트 (이슈 카드)

**Props:**
- `id: string`
- `title: string`
- `description?: string`
- `assignee?: { id: string; name: string; avatar?: string }`
- `priority?: "HIGH" | "MEDIUM" | "LOW"`
- `labels?: Array<{ id: string; name: string; color: string }>`
- `dueDate?: Date | string`
- `subtaskProgress?: { completed: number; total: number }`
- `onClick?: () => void`

---

### 2.6 차트 컴포넌트 (`src/components/charts/`)

#### PieChart
파이 차트 컴포넌트 (recharts 래핑)

**Props:**
- `data: PieChartData[]` - 차트 데이터
- `height?: number` - 차트 높이
- `showLegend?: boolean` - 범례 표시
- `showTooltip?: boolean` - 툴팁 표시

**사용 예시:**
```tsx
import { PieChart } from '@/components/charts';

<PieChart 
  data={[
    { name: "Backlog", value: 10 },
    { name: "In Progress", value: 5 },
    { name: "Done", value: 20 }
  ]} 
/>
```

#### LineChart
라인 차트 컴포넌트 (recharts 래핑)

**Props:**
- `data: LineChartData[]` - 차트 데이터
- `dataKeys: string[]` - 데이터 키 목록
- `height?: number` - 차트 높이
- `showGrid?: boolean` - 그리드 표시
- `showLegend?: boolean` - 범례 표시

**사용 예시:**
```tsx
import { LineChart } from '@/components/charts';

<LineChart 
  data={chartData} 
  dataKeys={["created", "completed"]} 
/>
```

---

### 2.7 알림 컴포넌트 (`src/components/notification/`)

#### NotificationItem
개별 알림 아이템 컴포넌트

**Props:**
- `notification: Notification` - 알림 정보
- `onRead?: (id: string) => void` - 읽음 처리 핸들러
- `onDelete?: (id: string) => void` - 삭제 핸들러
- `onClick?: () => void` - 클릭 핸들러

**기능:**
- 알림 타입별 아이콘 및 색상 표시
- 읽음/미읽음 상태 표시
- 시간 표시 (예: "2분 전", "1시간 전")
- 알림 삭제 버튼
- 알림 클릭 시 해당 페이지로 이동 (link가 있는 경우)

**사용 예시:**
```tsx
import { NotificationItem } from '@/components/notification';

<NotificationItem
  notification={notification}
  onRead={handleRead}
  onDelete={handleDelete}
/>
```

#### NotificationDropdown
알림 드롭다운 컴포넌트

**Props:**
- `trigger?: React.ReactNode` - 커스텀 트리거 (선택사항)
- `align?: "start" | "end"` - 드롭다운 정렬 (기본값: "end")

**기능:**
- 알림 목록 표시
- 미읽음 알림 개수 표시 (Badge)
- 전체 읽음 처리
- 개별 알림 삭제
- 로딩 상태 표시
- 에러 상태 표시
- 빈 상태 표시

**사용 예시:**
```tsx
import { NotificationDropdown } from '@/components/notification';

<NotificationDropdown />
```

---

### 2.8 레이아웃 컴포넌트 (`src/components/layout/`)

#### Header
헤더 컴포넌트 (알림, 프로필)

**Props:**
- `user?: { name: string; email: string; avatar?: string; role?: "ADMIN" | "MEMBER" | "VIEWER" }`
- `onProfileClick?: () => void`
- `onLogout?: () => void`

**기능:**
- 전역 검색 (`GlobalSearch`)
- 알림 드롭다운 (`NotificationDropdown`)
- 사용자 팝오버 (`UserPopover`) - 클릭 시 사용자 메뉴 표시

**참고:**
- 알림 기능은 내부적으로 `NotificationDropdown` 컴포넌트를 사용합니다.
- 사용자 메뉴는 `UserPopover` 컴포넌트로 구현되어 있습니다.
- `notificationCount`와 `onNotificationClick` props는 제거되었습니다.

**사용 예시:**
```tsx
import { Header } from '@/components/layout';

<Header 
  user={currentUser} 
  onLogout={handleLogout} 
/>
```

#### UserPopover
사용자 팝오버 컴포넌트 (Header 내부 사용)

**Props:**
- `user: { name: string; email: string; avatar?: string; role?: "ADMIN" | "MEMBER" | "VIEWER" }`
- `onClose: () => void` - 팝오버 닫기 핸들러
- `onLogout: () => void` - 로그아웃 핸들러

**기능:**
- 사용자 정보 표시 (아바타, 이름, 이메일, 관리자 뱃지)
- 메뉴 링크 (프로필, 설정, 관리자)
- 로그아웃 버튼
- 외부 클릭 시 자동 닫힘

**참고:**
- `D:\HUA\hua-platform\apps\sum-diary\app\components\layout\HeaderComponents\ProfilePopover.tsx` 참고
- SumUp 디자인 시스템 적용 (CSS 변수, border-radius 8px)

**사용 예시:**
```tsx
import { UserPopover } from '@/components/layout';

<UserPopover
  user={currentUser}
  onClose={() => setIsOpen(false)}
  onLogout={handleLogout}
/>
```

#### Sidebar
사이드바 네비게이션 컴포넌트

**Props:**
- `items: SidebarItem[]` - 메뉴 항목
- `isOpen?: boolean` - 열림 상태
- `onClose?: () => void` - 닫기 핸들러

**사용 예시:**
```tsx
import { Sidebar } from '@/components/layout';

<Sidebar 
  items={menuItems} 
  isOpen={sidebarOpen} 
  onClose={() => setSidebarOpen(false)} 
/>
```

---

## 3. 외부 라이브러리

### 3.1 설치된 라이브러리

| 라이브러리 | 버전 | 용도 |
|----------|------|------|
| @dnd-kit/core | ^6.3.1 | Drag & Drop 기능 |
| @dnd-kit/sortable | ^10.0.0 | 정렬 가능한 드래그 앤 드롭 |
| @dnd-kit/utilities | 최신 | DnD 유틸리티 |
| react-datepicker | ^8.10.0 | 날짜 선택 |
| recharts | ^3.5.1 | 차트 (Pie, Line) |
| react-markdown | 최신 | 마크다운 렌더링 |
| remark-gfm | 최신 | GitHub Flavored Markdown |
| zustand | ^5.0.8 | 상태 관리 |
| clsx | ^2.1.1 | 클래스명 유틸리티 |
| tailwind-merge | ^3.4.0 | Tailwind 클래스 병합 |

### 3.2 UI 패키지

**@hua-labs/ui** (1.0.0)
- 로컬 tarball 파일: `hua-labs-ui-1.0.0.tgz`
- 설치 경로: `file:hua-labs-ui-1.0.0.tgz`
- 업데이트 방법: hua-ui에서 재빌드 후 tarball 교체

---

## 4. 컴포넌트 사용 가이드

### 4.1 import 패턴

**@hua-labs/ui 패키지:**
```tsx
import { Button, Card, Input, Action } from '@hua-labs/ui';
```

**프로젝트 커스텀 컴포넌트:**
```tsx
// 개별 import
import { DatePicker } from '@/components/forms';
import { EmptyState } from '@/components/common';

// 또는 index를 통한 import
import { DatePicker, FileUpload, MultiSelect } from '@/components/forms';
import { EmptyState, LoadingState, ErrorState } from '@/components/common';
```

### 4.2 스타일링 가이드

모든 컴포넌트는 다음 원칙을 따릅니다:
- CSS 변수 사용 (`var(--color-*)`, `var(--space-*)`)
- Pretendard 폰트 사용
- Tailwind CSS 클래스 사용
- hua-ui 디자인 시스템 준수

---

## 5. hua-ui 패키지 컴포넌트 사용 가이드

### 5.1 Modal 컴포넌트

**기본 사용법:**
```tsx
import { Modal } from "@hua-labs/ui";

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>모달 열기</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="모달 제목"
      >
        <p>모달 내용</p>
      </Modal>
    </>
  );
}
```

**ConfirmModal 사용법:**
```tsx
import { ConfirmModal } from "@hua-labs/ui";

<ConfirmModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onConfirm={handleDelete}
  title="삭제 확인"
  message="정말 삭제하시겠습니까?"
  confirmLabel="삭제"
  cancelLabel="취소"
  variant="danger"
/>
```

### 5.2 Toast 컴포넌트

**ToastProvider 설정:**
```tsx
// app/layout.tsx 또는 AppProviders.tsx
import { ToastProvider } from "@hua-labs/ui";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
```

**useToast 훅 사용:**
```tsx
import { useToast } from "@hua-labs/ui";

function MyComponent() {
  const { toast } = useToast();

  const handleSuccess = () => {
    toast({
      title: "성공",
      description: "작업이 완료되었습니다",
      variant: "success",
    });
  };
}
```

### 5.3 Pagination 컴포넌트

**기본 Pagination:**
```tsx
import { Pagination } from "@hua-labs/ui";

<Pagination
  currentPage={page}
  totalPages={totalPages}
  onPageChange={setPage}
/>
```

**Pagination 변형:**
```tsx
import { 
  Pagination, 
  PaginationOutlined, 
  PaginationMinimal, 
  PaginationWithInfo 
} from "@hua-labs/ui";

// 기본 스타일
<Pagination currentPage={1} totalPages={10} onPageChange={setPage} />

// Outlined 스타일
<PaginationOutlined currentPage={1} totalPages={10} onPageChange={setPage} />

// Minimal 스타일
<PaginationMinimal currentPage={1} totalPages={10} onPageChange={setPage} />

// 정보 포함 스타일
<PaginationWithInfo 
  currentPage={1} 
  totalPages={10} 
  totalItems={100}
  itemsPerPage={10}
  onPageChange={setPage}
/>
```

### 5.4 hua-ui 패키지 활용 가능 컴포넌트

다음 컴포넌트들은 hua-ui에서 직접 사용 가능:
- `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableCell` - 목록 표시
- `Card`, `CardHeader`, `CardTitle`, `CardContent` - 카드 레이아웃
- `Form`, `FormField`, `FormGroup` - 폼 구성
- `Input`, `Textarea`, `Select` - 입력 필드
- `Button`, `Action` - 버튼
- `Badge` - 배지
- `Avatar`, `AvatarImage`, `AvatarFallback` - 아바타
- `Dropdown`, `DropdownMenu`, `DropdownItem` - 드롭다운
- `Modal`, `ConfirmModal` - 모달
- `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` - 탭
- `Pagination` - 페이지네이션
- `ActivityFeed` - 활동 피드
- `Toast`, `ToastProvider` - 토스트 알림

---

## 6. 컴포넌트 개발 현황

### 6.1 완료된 컴포넌트

#### 인증 컴포넌트 ✅
- [x] `OAuthButton` - Google/GitHub/카카오 OAuth 로그인 버튼
- [x] `PasswordInput` - 비밀번호 입력 (표시/숨김, 강도 표시)
- [x] `PasswordChecklist` - 비밀번호 요구사항 체크리스트

#### 폼 컴포넌트 ✅
- [x] `DatePicker` - 날짜 선택 (react-datepicker 래핑)
- [x] `FileUpload` - 파일 업로드 (프로필 이미지용)
- [x] `MultiSelect` - 다중 선택 (라벨 선택용)

#### 공통 컴포넌트 ✅
- [x] `EmptyState` - 빈 상태 표시
- [x] `LoadingState` - 로딩 상태 표시
- [x] `ErrorState` - 에러 상태 표시
- [x] `Markdown` - 마크다운 렌더링 (이슈 설명용)
- [x] `StatCard` - 통계 카드 (새로 추가)
- [x] `FilterBar` - 필터/검색 바 (새로 추가)

#### 이슈 컴포넌트 ✅
- [x] `PriorityBadge` - 우선순위 배지 (HIGH/MEDIUM/LOW)
- [x] `StatusBadge` - 상태 배지 (Backlog/In Progress/Done 등)
- [x] `CommentList` - 댓글 목록
- [x] `CommentItem` - 댓글 아이템
- [x] `CommentForm` - 댓글 작성 폼
- [x] `IssueForm` - 이슈 생성/수정 폼 (Modal)
- [x] `SubtaskManager` - 서브태스크 관리 (추가/수정/삭제/완료 토글)

#### 프로젝트 컴포넌트 ✅
- [x] `ProjectForm` - 프로젝트 생성/수정 폼 (Modal)

#### 팀 관리 컴포넌트 ✅
- [x] `TeamCard` - 팀 목록 표시 카드
- [x] `TeamMemberList` - 팀 멤버 목록 (역할 변경, 제거)
- [x] `InviteMemberForm` - 멤버 초대 폼 (Modal)

#### 칸반 컴포넌트 ✅
- [x] `KanbanBoard` - 칸반 보드 메인 컴포넌트
- [x] `KanbanColumn` - 칸반 컬럼
- [x] `KanbanCard` - 칸반 카드 (이슈 카드)

#### 차트 컴포넌트 ✅
- [x] `PieChart` - 파이 차트 (recharts 래핑)
- [x] `LineChart` - 라인 차트 (recharts 래핑)

#### 레이아웃 컴포넌트 ✅
- [x] `AppLayout` - 메인 레이아웃 (사이드바 포함)
- [x] `Header` - 헤더 컴포넌트 (알림, 프로필)
- [x] `Sidebar` - 사이드바 네비게이션

**총 완료**: 34개 컴포넌트

---

### 6.2 추가로 필요한 컴포넌트

#### 공통 UI 컴포넌트 ✅ (hua-ui에서 사용 가능)
- [x] `Modal` - 모달 다이얼로그 (hua-ui에 존재)
- [x] `ConfirmModal` - 확인 다이얼로그 (hua-ui에 존재)
- [x] `Toast` - 토스트 알림 (hua-ui에 존재)
- [x] `ToastProvider` - 토스트 프로바이더 (hua-ui에 존재)
- [x] `Pagination` - 페이지네이션 (hua-ui에 존재)

#### 검색 컴포넌트 ⚠️
- [x] 검색 로직 구현 (`useIssueFilterStore`, `filterIssues` 유틸리티)
- [x] 기본 Input으로 검색 기능 구현됨 (이슈/프로젝트 목록 페이지)
- [ ] `SearchInput` - 고급 검색 입력 필드 (UI 컴포넌트, 선택사항)
- [ ] `FilterPanel` - 필터 패널 (선택사항, 현재 FilterBar로 대체 가능)

**우선순위**: P1 (권장) - 기본 기능은 완료

#### 폼 컴포넌트 ✅
- [x] `IssueForm` - 이슈 생성/수정 폼 (Modal)
- [x] `ProjectForm` - 프로젝트 생성/수정 폼 (Modal)
- [x] `SubtaskManager` - 서브태스크 관리 (추가/수정/삭제/완료 토글)

**우선순위**: P0 (필수) - 완료

#### 팀 관리 컴포넌트 ✅
- [x] `TeamCard` - 팀 목록 표시 카드
- [x] `TeamMemberList` - 팀 멤버 목록 (역할 변경, 제거)
- [x] `InviteMemberForm` - 멤버 초대 폼 (Modal)

**우선순위**: P0 (필수) - 완료

#### 알림 컴포넌트 ✅
- [x] `NotificationItem` - 개별 알림 아이템
- [x] `NotificationDropdown` - 알림 드롭다운 (Header에 연결)

**우선순위**: P1 (권장) - 완료

#### 설정 컴포넌트 ✅
- [x] `SettingsSelect` - 설정용 커스텀 Select
- [x] `PreferenceToggle` - 설정용 Toggle
- [x] `ThemeSection` - 테마 및 타이포그래피 설정
- [x] `LanguageSection` - 언어 및 지역 설정 (통화 제거)
- [x] `AccessibilitySection` - 접근성 설정
- [x] `LivePreview` - 설정 미리보기 (통화 제거)

**우선순위**: P1 (권장) - 완료

#### 알림 컴포넌트 ⚠️
- [x] `Header`에 알림 아이콘 포함됨
- [ ] `NotificationList` - 알림 목록
- [ ] `NotificationItem` - 알림 아이템
- [ ] `NotificationBadge` - 알림 배지 (읽지 않은 알림 수)

**우선순위**: P1 (권장)

#### 팀 관리 컴포넌트 ✅
- [x] `TeamCard` - 팀 카드
- [x] `TeamMemberList` - 팀 멤버 목록 (TeamMemberItem 포함)
- [x] `InviteMemberForm` - 멤버 초대 폼
- [ ] `TeamActivityLog` - 팀 활동 로그 (P1)

**우선순위**: P0 (필수) - 핵심 기능 완료

#### 기타 컴포넌트 ❌
- [ ] `ChangeHistory` - 변경 이력 컴포넌트
- [ ] `LabelColorPicker` - 라벨 색상 선택기
- [ ] `ProfileForm` - 프로필 수정 폼
- [ ] `PasswordChangeForm` - 비밀번호 변경 폼
- [ ] `AccountDeleteForm` - 계정 삭제 폼

**우선순위**: P1 (권장)

---

### 6.3 컴포넌트 개발 우선순위

#### P0 (필수) - 즉시 개발 필요
1. **IssueForm** - 이슈 생성/수정 기능 (완료)
2. **ProjectForm** - 프로젝트 생성/수정 기능 (완료)
3. **SubtaskManager** - 서브태스크 관리 기능 (완료)
4. **팀 관리 컴포넌트** - 팀 목록/멤버 관리 (완료)

#### P1 (권장) - 단기 개선
4. **NotificationDropdown** - 알림 시스템 완성 (완료)
5. **NotificationItem** - 알림 시스템 완성 (완료)
6. **SearchInput** - 검색 UX 개선 (선택사항)
7. **FilterPanel** - 필터링 UX 개선 (선택사항)
8. **ChangeHistory** - 변경 이력 표시
9. **LabelColorPicker** - 라벨 관리 개선
10. **프로필 컴포넌트** - 프로필 수정/비밀번호 변경

---

### 6.4 개발 진행 상황

**완료율:**
- **기본 컴포넌트**: 100% (20개)
- **댓글 컴포넌트**: 100% (3개)
- **필수 추가 컴포넌트**: 약 30% (3/10개)
- **권장 추가 컴포넌트**: 0% (0/10개)

**전체 진행률:**
- **약 58% 완료** (23/40개 컴포넌트)

---

## 7. 컴포넌트 개발 체크리스트

새 컴포넌트 개발 시:
- [ ] TypeScript 타입 정의 완료
- [ ] CSS 변수 사용 (하드코딩 금지)
- [ ] Pretendard 폰트 사용
- [ ] 반응형 디자인 적용
- [ ] 접근성 고려 (ARIA, 키보드 네비게이션)
- [ ] 다크 모드 지원
- [ ] index.ts에 export 추가

---

## 8. 다음 단계

1. **IssueForm 컴포넌트 개발** (P0) - 이슈 생성/수정 기능 (완료)
2. **ProjectForm 컴포넌트 개발** (P0) - 프로젝트 생성/수정 기능 (완료)
3. **SubtaskManager 컴포넌트 개발** (P0) - 서브태스크 관리 기능 (완료)
3. **팀 관리 컴포넌트 개발** (P0) - 팀 목록/멤버 관리
4. **알림 컴포넌트 개발** (P1) - 알림 시스템 완성
5. **프로필 컴포넌트 개발** (P1) - 프로필 수정/비밀번호 변경

---

**문서 작성일**: 2025-11-29  
**마지막 업데이트**: 2025-11-29

