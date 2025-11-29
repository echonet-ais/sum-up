# 리팩토링 체크리스트

> **Date**: 2025-11-29  
> **Project**: SumUp  
> **목적**: 로직상 디자인 개선점 및 공통 컴포넌트 미사용 사례 정리

---

## 1. 공통 컴포넌트 미사용 사례

### 1.1 SettingsSelect - Select 컴포넌트 미사용

**현재 상태:**
- `src/components/settings/SettingsSelect.tsx`에서 `@hua-labs/ui`의 `Select` 컴포넌트를 사용하지 않고 직접 구현
- 드롭다운, 외부 클릭 감지, 위치 계산 등 모든 로직을 직접 구현

**개선 방안:**
```tsx
// 현재: 직접 구현 (120줄)
// 개선: @hua-labs/ui의 Select 컴포넌트 사용
import { Select, SelectOption } from "@hua-labs/ui";

<Select
  value={value}
  onChange={onChange}
  label={label}
>
  {options.map(option => (
    <SelectOption key={option.value} value={option.value}>
      {option.label}
    </SelectOption>
  ))}
</Select>
```

**우선순위:** 중간 (P2)

---

### 1.2 날짜 포맷팅 유틸리티 중복

**현재 상태:**
다음 컴포넌트들에서 각각 날짜 포맷팅 로직을 중복 구현:
- `src/components/issue/CommentItem.tsx` - `formatDate` 함수
- `src/components/notification/NotificationItem.tsx` - `formatTimeAgo` 함수
- `src/components/kanban/KanbanCard.tsx` - `formatDate` 함수
- `src/components/issue/IssueAttachments.tsx` - `toLocaleDateString` 직접 사용
- `src/components/settings/LivePreview.tsx` - `toLocaleDateString` 직접 사용

**개선 방안:**
```tsx
// src/lib/utils/date.ts 생성
export function formatTimeAgo(date: Date | string): string {
  // 통합된 날짜 포맷팅 로직
}

export function formatDate(date: Date | string, format?: string): string {
  // 통합된 날짜 포맷팅 로직
}
```

**우선순위:** 높음 (P1)

---

### 1.3 alert/confirm 직접 사용

**현재 상태:**
`ConfirmDialog` 컴포넌트가 있음에도 불구하고 다음 위치에서 `alert`, `confirm` 직접 사용:
- `src/components/forms/FileUpload.tsx` - `alert` 사용 (2곳)
- `src/components/issue/CommentItem.tsx` - `confirm` 사용
- `src/components/issue/AIFeatures.tsx` - `alert` 사용 (6곳)
- `src/components/issue/CommentForm.tsx` - `alert` 사용
- `src/components/team/TeamMemberList.tsx` - `confirm` 사용

**개선 방안:**
```tsx
// 현재: alert("로그인이 필요합니다")
// 개선: ConfirmDialog 또는 useToast 사용
import { ConfirmDialog } from "@/components/common";
import { useToast } from "@hua-labs/ui";

const { addToast } = useToast();
addToast({ 
  title: "알림", 
  message: "로그인이 필요합니다", 
  type: "warning" 
});
```

**우선순위:** 높음 (P1)

---

## 2. 로직상 디자인 개선점

### 2.1 폼 제출 패턴 중복

**현재 상태:**
다음 컴포넌트들에서 유사한 폼 제출 패턴을 중복 구현:
- `src/components/issue/CommentForm.tsx` - 제출 로직 직접 구현
- `src/components/common/FormActions.tsx` - 제출 버튼만 제공
- `src/components/issue/IssueForm.tsx` - 제출 로직 직접 구현
- `src/components/project/ProjectForm.tsx` - 제출 로직 직접 구현

**개선 방안:**
```tsx
// 공통 폼 훅 생성: src/hooks/useFormSubmit.ts
export function useFormSubmit<T>({
  onSubmit,
  onSuccess,
  onError,
  validate,
}: UseFormSubmitOptions<T>) {
  // 통합된 폼 제출 로직
}
```

**우선순위:** 중간 (P2)

---

### 2.2 에러 메시지 표시 패턴 불일치

**현재 상태:**
에러 메시지 표시 방식이 일관되지 않음:
- 일부는 `useToast` 사용
- 일부는 `alert` 사용
- 일부는 인라인 에러 메시지 표시
- 일부는 `FormActions`의 `submitError` 사용

**개선 방안:**
- 모든 에러는 `useToast`로 통일
- 폼 필드 에러는 인라인 표시
- 글로벌 에러는 Toast로 표시

**우선순위:** 중간 (P2)

---

### 2.3 로딩 상태 관리 중복

**현재 상태:**
여러 컴포넌트에서 유사한 로딩 상태 관리 패턴 중복:
- `isSubmitting`, `isLoading`, `isDeleting` 등 다양한 네이밍
- 로딩 상태에 따른 UI 변경 로직 중복

**개선 방안:**
```tsx
// 공통 로딩 상태 훅: src/hooks/useAsyncAction.ts
export function useAsyncAction<T extends (...args: any[]) => Promise<any>>(
  action: T
) {
  // 통합된 로딩 상태 관리
}
```

**우선순위:** 낮음 (P3)

---

### 2.4 Card 스타일링 중복

**현재 상태:**
여러 컴포넌트에서 동일한 Card 스타일을 반복:
```tsx
className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm"
```

**개선 방안:**
```tsx
// src/components/common/Card.tsx 또는 className 유틸리티
const cardClassName = "rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm";
```

**우선순위:** 낮음 (P3)

---

## 3. 접근성 및 UX 개선점

### 3.1 키보드 네비게이션

**현재 상태:**
- `SettingsSelect`에서 키보드 네비게이션 미지원
- 일부 드롭다운에서 키보드 접근성 부족

**우선순위:** 중간 (P2)

---

### 3.2 포커스 관리

**현재 상태:**
- 모달/드로어 열릴 때 포커스 트랩 미구현
- 모달 닫힐 때 이전 포커스로 복귀 미구현

**우선순위:** 중간 (P2)

---

## 4. 성능 개선점

### 4.1 불필요한 리렌더링

**현재 상태:**
- `formatDate` 같은 함수가 컴포넌트 내부에서 매번 생성됨
- 인라인 객체/함수로 인한 리렌더링 발생 가능

**개선 방안:**
- `useMemo`, `useCallback` 적절히 사용
- 함수는 컴포넌트 외부로 이동

**우선순위:** 낮음 (P3)

---

## 5. 우선순위별 작업 계획

### P1 (높음) - 즉시 개선 권장
1. ✅ 날짜 포맷팅 유틸리티 통합
2. ✅ alert/confirm → ConfirmDialog 또는 Toast로 변경

### P2 (중간) - 단계적 개선
1. SettingsSelect → Select 컴포넌트 사용
2. 폼 제출 패턴 통합
3. 에러 메시지 표시 패턴 통일
4. 접근성 개선 (키보드 네비게이션, 포커스 관리)

### P3 (낮음) - 여유 있을 때 개선
1. 로딩 상태 관리 통합
2. Card 스타일링 중복 제거
3. 성능 최적화 (리렌더링 최소화)

---

## 6. 참고 사항

- 모든 개선 작업은 기존 기능을 유지하면서 진행
- 각 개선 사항은 별도 브랜치에서 작업 후 PR
- 테스트 코드 작성 권장 (특히 P1 항목)

