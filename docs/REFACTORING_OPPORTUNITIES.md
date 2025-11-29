# 코드 스플리팅 및 리팩토링 기회 분석

> **작성일**: 2025-11-29  
> **분석 범위**: 메인 피처 및 페이지 구조

---

## 1. 코드 스플리팅 기회

### 1.1 현재 상태

#### ✅ 이미 적용됨
- 없음 (KanbanBoard는 가이드에만 있고 실제로는 일반 import)

#### ⏳ 적용 필요

### 1.2 우선순위 높음 (P0)

#### 1.2.1 KanbanBoard 컴포넌트
**위치**: `app/kanban/page.tsx`  
**현재**: 일반 import  
**이유**: `@dnd-kit` 라이브러리 포함 (용량 큼)  
**방법**: SSR 비활성화 + 로딩 상태

```tsx
// 현재
import { KanbanBoard } from "@/components/kanban";

// 개선
import dynamic from "next/dynamic";
import { LoadingState } from "@/components/common";

const KanbanBoard = dynamic(
  () => import("@/components/kanban").then((mod) => ({ default: mod.KanbanBoard })),
  {
    ssr: false,
    loading: () => <LoadingState message="칸반 보드를 불러오는 중..." />
  }
);
```

**예상 효과**: 초기 번들 크기 약 50-100KB 감소

#### 1.2.2 GlobalSearch 컴포넌트
**위치**: `components/layout/Header.tsx` (추정)  
**현재**: 일반 import  
**이유**: 키보드 단축키로만 열리는 모달, 모든 페이지에서 필요 없음  
**방법**: 기본 동적 import

```tsx
// 개선
import dynamic from "next/dynamic";

const GlobalSearch = dynamic(() => import("@/components/search/GlobalSearch"));
```

**예상 효과**: 초기 번들 크기 약 10-20KB 감소

### 1.3 우선순위 중간 (P1)

#### 1.3.1 폼 컴포넌트들 (Drawer에서만 사용)
**위치**: 
- `app/issues/[id]/page.tsx` - IssueForm
- `app/projects/[id]/page.tsx` - ProjectForm
- `app/issues/page.tsx` - IssueForm
- `app/projects/page.tsx` - ProjectForm
- `app/teams/[id]/page.tsx` - InviteMemberForm

**이유**: Drawer에서만 사용되므로 필요할 때만 로드  
**방법**: 기본 동적 import

```tsx
// 개선
import dynamic from "next/dynamic";

const IssueForm = dynamic(() => import("@/components/issue/IssueForm"));
const ProjectForm = dynamic(() => import("@/components/project/ProjectForm"));
const InviteMemberForm = dynamic(() => import("@/components/team/InviteMemberForm"));
```

**예상 효과**: 초기 번들 크기 약 30-50KB 감소

#### 1.3.2 상세 페이지 전용 컴포넌트
**위치**: `app/issues/[id]/page.tsx`  
**컴포넌트**: CommentList, AIFeatures, SubtaskManager  
**이유**: 상세 페이지에서만 사용  
**방법**: 기본 동적 import

```tsx
// 개선
import dynamic from "next/dynamic";

const CommentList = dynamic(() => import("@/components/issue/CommentList"));
const AIFeatures = dynamic(() => import("@/components/issue/AIFeatures"));
const SubtaskManager = dynamic(() => import("@/components/issue/SubtaskManager"));
```

**예상 효과**: 초기 번들 크기 약 20-40KB 감소

---

## 2. 리팩토링 기회

### 2.1 상세 페이지 공통 패턴 추출

#### 2.1.1 문제점
다음 페이지들이 유사한 패턴을 반복:
- `app/issues/[id]/page.tsx`
- `app/projects/[id]/page.tsx`
- `app/teams/[id]/page.tsx`

**공통 패턴:**
1. 로딩/에러 처리
2. 헤더 액션 (뒤로가기 링크, 액션 버튼)
3. Drawer 사용 (폼 표시)
4. 삭제 확인 다이얼로그

#### 2.1.2 개선 방안

**1. DetailPageLayout 컴포넌트 생성**

```tsx
// src/components/layout/DetailPageLayout.tsx
export interface DetailPageLayoutProps {
  title: string;
  description?: string;
  activeItem: string;
  isLoading: boolean;
  error: Error | null;
  backHref: string;
  backLabel: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export function DetailPageLayout({
  title,
  description,
  activeItem,
  isLoading,
  error,
  backHref,
  backLabel,
  actions,
  children,
}: DetailPageLayoutProps) {
  if (isLoading) {
    return (
      <AppLayout title={title} activeItem={activeItem}>
        <LoadingState message={`${title}를 불러오는 중...`} />
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout title={`${title}를 찾을 수 없습니다`} activeItem={activeItem}>
        <ErrorState
          title={`${title}를 찾을 수 없습니다`}
          message={error.message || "요청하신 항목이 존재하지 않거나 삭제되었습니다."}
          onRetry={() => window.location.reload()}
          retryLabel="다시 시도"
        />
      </AppLayout>
    );
  }

  return (
    <AppLayout title={title} description={description} activeItem={activeItem}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <Link
            href={backHref}
            className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-strong)]"
          >
            <Icon name="chevronLeft" size={16} />
            {backLabel}
          </Link>
          {actions && <div className="flex gap-2">{actions}</div>}
        </div>
        {children}
      </div>
    </AppLayout>
  );
}
```

**2. useDeleteDialog 훅 생성**

```tsx
// src/hooks/useDeleteDialog.ts
export function useDeleteDialog(
  onDelete: () => Promise<void>,
  options: {
    title: string;
    description: string;
    onSuccess?: () => void;
  }
) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { addToast } = useToast();
  const router = useRouter();

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onDelete();
      addToast({
        title: "성공",
        message: "삭제되었습니다",
        type: "success",
      });
      options.onSuccess?.();
    } catch (err) {
      addToast({
        title: "오류",
        message: err instanceof Error ? err.message : "삭제에 실패했습니다",
        type: "error",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    isOpen,
    setIsOpen,
    isDeleting,
    handleConfirm,
  };
}
```

**사용 예시:**
```tsx
const { isOpen, setIsOpen, isDeleting, handleConfirm } = useDeleteDialog(
  () => deleteIssue(),
  {
    title: "이슈 삭제",
    description: `"${issue.title}" 이슈를 정말 삭제하시겠습니까?`,
    onSuccess: () => router.push("/issues"),
  }
);
```

### 2.2 프로젝트 상세 페이지 통계 카드 리팩토링

#### 2.2.1 문제점
**위치**: `app/projects/[id]/page.tsx` (88-121줄)

```tsx
// 현재: Card를 직접 사용
<Card className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
  <CardContent className="p-4">
    <div className="text-sm text-[var(--text-muted)]">전체 이슈</div>
    <div className="text-2xl font-semibold text-[var(--text-strong)]">
      {stats.totalIssues}
    </div>
  </CardContent>
</Card>
```

#### 2.2.2 개선 방안
StatCard 컴포넌트 사용 (이미 존재)

```tsx
// 개선
import { StatCard } from "@/components/common";

<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
  <StatCard title="전체 이슈" value={stats.totalIssues} />
  <StatCard title="열린 이슈" value={stats.openIssues} />
  <StatCard title="진행 중" value={stats.inProgressIssues} />
  <StatCard title="완료" value={stats.completedIssues} />
</div>
```

**효과**: 약 30줄 감소, 일관성 향상

### 2.3 Drawer 사용 패턴 통일

#### 2.3.1 문제점
다음 페이지들이 유사한 Drawer 패턴 반복:
- `app/issues/[id]/page.tsx` - IssueForm Drawer
- `app/projects/[id]/page.tsx` - ProjectForm Drawer
- `app/teams/[id]/page.tsx` - InviteMemberForm Drawer

#### 2.3.2 개선 방안

**FormDrawer 컴포넌트 생성**

```tsx
// src/components/common/FormDrawer.tsx
export interface FormDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  side?: "left" | "right";
  size?: "sm" | "md" | "lg";
}

export function FormDrawer({
  open,
  onOpenChange,
  title,
  children,
  side = "right",
  size = "lg",
}: FormDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange} side={side} size={size}>
      <DrawerHeader showCloseButton onClose={() => onOpenChange(false)}>
        <h2 className="text-lg font-semibold text-[var(--text-strong)]">{title}</h2>
      </DrawerHeader>
      <DrawerContent>{children}</DrawerContent>
    </Drawer>
  );
}
```

**사용 예시:**
```tsx
<FormDrawer
  open={isEditFormOpen}
  onOpenChange={setIsEditFormOpen}
  title="이슈 수정"
>
  <IssueForm
    issueId={id}
    onSuccess={() => {
      setIsEditFormOpen(false);
      refetch();
    }}
    onCancel={() => setIsEditFormOpen(false)}
  />
</FormDrawer>
```

**효과**: 약 10줄 감소 × 3곳 = 30줄 감소

### 2.4 메타 정보 카드 패턴 추출

#### 2.4.1 문제점
다음 페이지들이 유사한 메타 정보 카드 패턴 반복:
- `app/issues/[id]/page.tsx` - 정보 카드
- `app/projects/[id]/page.tsx` - 정보 카드
- `app/teams/[id]/page.tsx` - 정보 카드

#### 2.4.2 개선 방안

**MetaInfoCard 컴포넌트 생성**

```tsx
// src/components/common/MetaInfoCard.tsx
export interface MetaInfoItem {
  label: string;
  value: React.ReactNode;
}

export interface MetaInfoCardProps {
  title?: string;
  items: MetaInfoItem[];
}

export function MetaInfoCard({ title = "정보", items }: MetaInfoCardProps) {
  return (
    <Card className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        {items.map((item, index) => (
          <div key={index}>
            <div className="text-[var(--text-muted)]">{item.label}</div>
            <div className="text-[var(--text-strong)]">{item.value}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
```

**사용 예시:**
```tsx
<MetaInfoCard
  items={[
    {
      label: "생성일",
      value: new Date(issue.createdAt).toLocaleString("ko-KR"),
    },
    {
      label: "수정일",
      value: new Date(issue.updatedAt).toLocaleString("ko-KR"),
    },
    {
      label: "프로젝트",
      value: (
        <Link href={`/projects/${issue.projectId}`} className="text-[var(--brand-primary)] hover:underline">
          {issue.project?.name}
        </Link>
      ),
    },
  ]}
/>
```

**효과**: 약 15줄 감소 × 3곳 = 45줄 감소

---

## 3. 우선순위 정리

### P0 (즉시 적용)
1. ✅ KanbanBoard 동적 import (완료)
2. ✅ GlobalSearch 동적 import (완료)

### P1 (단기 개선)
3. ✅ 폼 컴포넌트들 동적 import (완료)
4. ✅ 상세 페이지 전용 컴포넌트 동적 import (완료)
5. ✅ 프로젝트 상세 페이지 StatCard 사용 (완료)
6. ✅ DetailPageLayout 컴포넌트 생성 (완료)
7. ✅ useDeleteDialog 훅 생성 (완료)
8. ✅ FormDrawer 컴포넌트 생성 (완료)
9. ✅ MetaInfoCard 컴포넌트 생성 (완료)

### P2 (적용 완료)
10. ✅ DetailPageLayout을 상세 페이지에 적용 (완료)
11. ✅ FormDrawer를 Drawer 사용 부분에 적용 (완료)
12. ✅ MetaInfoCard를 메타 정보 카드에 적용 (완료)
13. ✅ useDeleteDialog를 삭제 다이얼로그에 적용 (완료)

### P2 (중기 개선)
10. 상세 페이지 리팩토링 (DetailPageLayout 적용)
11. Drawer 사용 리팩토링 (FormDrawer 적용)
12. 메타 정보 카드 리팩토링 (MetaInfoCard 적용)

---

## 4. 예상 효과

### 코드 스플리팅
- **초기 번들 크기 감소**: 약 110-210KB
- **초기 로딩 시간 단축**: 약 200-400ms (3G 기준)
- **First Contentful Paint 개선**: 약 10-20%

### 리팩토링
- **코드 라인 수 감소**: 약 105줄
- **중복 코드 제거**: 상세 페이지 패턴 3곳
- **유지보수성 향상**: 공통 컴포넌트로 통일

---

## 5. 참고

- [CODE_SPLITTING_GUIDE.md](./CODE_SPLITTING_GUIDE.md) - 코드 스플리팅 가이드
- [REFACTORING_ANALYSIS.md](./REFACTORING_ANALYSIS.md) - 리팩토링 분석
- [CODE_REVIEW_V2.md](./CODE_REVIEW_V2.md) - 코드 리뷰 보고서

---

**작성일**: 2025-11-29  
**마지막 업데이트**: 2025-11-29

