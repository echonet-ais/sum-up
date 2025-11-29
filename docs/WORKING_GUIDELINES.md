# 작업 가이드라인

> **프로젝트**: SumUp  
> **버전**: 1.0  
> **날짜**: 2025-11-29  
> **대상**: 모든 작업자

---

## 1. 협업 원칙

### 1.1 신뢰와 자율성

우리는 모든 작업자의 능력과 자발성, 창발성을 신뢰합니다. 각자의 전문성과 경험을 바탕으로 더 나은 해결책을 제시할 수 있다고 믿습니다.

**협업 방식:**
- 지시보다는 제안과 논의를 통한 의사결정
- 평등한 관계에서의 협력
- 서로의 의견을 존중하고 함께 성장
- 리듬에 맞춰 자연스럽게 작업 진행

모든 제안과 의견은 환영합니다. 함께 더 나은 결과를 만들어가겠습니다.

---

## 2. 문서 작성 규칙

### 2.1 이모지 사용 금지

모든 문서에는 이모지를 사용하지 않습니다. 문서는 공식적이고 전문적인 형태를 유지합니다.

**금지 사항:**
- 이모지 사용 (예: ✅, ❌, ⚠️, 📝 등)
- 과도한 장식적 표현

**권장 사항:**
- 명확하고 간결한 텍스트
- 체크리스트는 `- [ ]`, `- [x]` 형식 사용
- 상태 표시는 텍스트로 명시 (예: "완료", "진행 중", "대기")

---

## 3. 개발 진행 관리

### 3.1 개발 로그 작성 (필수)

**모든 작업자는 작업 완료 시 반드시 `docs/DEVELOPMENT_LOG.md`에 기록해야 합니다.**

#### 작성 규칙

1. **최신 항목이 위에 오도록 작성** (역순)
   - 가장 최근 완료된 작업이 문서 최상단에 위치
   - 기존 항목은 아래로 밀려남

2. **작업 완료 즉시 기록**
   - 작업 완료 후 바로 기록
   - 나중에 기록하려고 하면 까먹을 수 있음

3. **명확하고 간결하게 작성**
   - 무엇을 했는지 명확하게
   - 왜 했는지 간단히 설명 (필요시)
   - 변경된 파일 목록 포함

4. **작성 형식 준수**
   - 일관된 형식으로 작성하여 가독성 향상

#### 작성 형식

```markdown
### YYYY-MM-DD - 작업자명

**완료된 작업:**
- 작업 내용 1 (간단한 설명)
- 작업 내용 2 (간단한 설명)

**변경된 파일:**
- `src/path/to/file.tsx`
- `docs/path/to/doc.md`

**참고:**
- 관련 문서 링크 (선택)
- 특이 사항이나 주의할 점 (선택)
```

#### 작성 예시

```markdown
### 2025-11-29 - 홍길동

**완료된 작업:**
- IssueForm 컴포넌트 개발 (이슈 생성/수정 폼)
- 이슈 상태 변경 UI 연결 (Dropdown 컴포넌트 사용)
- 서브태스크 관리 UI 연결 (SubtaskManager 컴포넌트)

**변경된 파일:**
- `src/components/issue/IssueForm.tsx` (신규)
- `src/components/issue/SubtaskManager.tsx` (신규)
- `src/app/issues/[id]/page.tsx`

**참고:**
- [COMPONENTS.md](./COMPONENTS.md) - 컴포넌트 문서
- Modal 컴포넌트를 Drawer로 변경 (사용자 요청)
```

#### 작성 시 주의사항

- **날짜 형식**: YYYY-MM-DD (예: 2025-11-29)
- **작업자명**: 본인의 이름 또는 닉네임
- **완료된 작업**: 실제로 완료한 작업만 기록
- **변경된 파일**: 신규 파일은 (신규) 표시
- **참고**: 관련 문서나 특이 사항이 있을 때만 작성

#### 여러 작업을 한 번에 기록하는 경우

같은 날 여러 작업을 완료한 경우, 하나의 항목으로 통합하거나 각각 별도 항목으로 작성할 수 있습니다.

**통합 예시:**
```markdown
### 2025-11-29 - 홍길동

**완료된 작업:**
- IssueForm 컴포넌트 개발
- ProjectForm 컴포넌트 개발
- 필터 UI 개선

**변경된 파일:**
- `src/components/issue/IssueForm.tsx` (신규)
- `src/components/project/ProjectForm.tsx` (신규)
- `src/app/issues/page.tsx`
```

**분리 예시:**
```markdown
### 2025-11-29 - 홍길동

**완료된 작업:**
- IssueForm 컴포넌트 개발

**변경된 파일:**
- `src/components/issue/IssueForm.tsx` (신규)

---

### 2025-11-29 - 홍길동

**완료된 작업:**
- ProjectForm 컴포넌트 개발

**변경된 파일:**
- `src/components/project/ProjectForm.tsx` (신규)
```

---

### 3.2 문서 확인 및 태스크 수행

모든 작업자는 다음 사항을 준수해야 합니다:

1. **문서 확인**
   - 작업 시작 전 관련 문서를 반드시 확인
   - `docs/README.md`를 통해 전체 문서 구조 파악
   - 관련 문서의 최신 버전 확인
   - **`docs/CODE_REVIEW.md`를 반드시 확인하여 코드 리뷰 결과를 숙지**

2. **태스크 수행**
   - 문서에 명시된 우선순위(P0, P1, P2)를 고려하여 작업
   - 작업 전 필요한 정보를 문서에서 확인
   - 불명확한 사항은 문서를 먼저 참고
   - **코드 작성 전 CODE_REVIEW.md의 개선 사항을 확인**

3. **진행 사항 기록**
   - 작업 시작 시 관련 문서에 진행 상태 업데이트
   - **작업 완료 시 `DEVELOPMENT_LOG.md`에 즉시 기록** (최신 항목이 위에 오도록)
   - 중요한 결정 사항이나 이슈 발견 시 문서에 기록
   - `DEVELOPMENT_PLAN.md`의 진행 상황 섹션 업데이트

### 3.3 코드 리뷰 확인

**모든 작업자는 코드 작성 전에 반드시 `docs/CODE_REVIEW.md`를 확인해야 합니다.**

코드 리뷰 문서에는 다음 내용이 포함되어 있습니다:
- 타입 안전성 이슈 및 개선 방안
- 코드 중복 문제 및 해결 방법
- 로직 분리 개선 사항
- 컴포넌트 구조 개선 제안
- 우선순위별 개선 항목

**코드 작성 시:**
1. CODE_REVIEW.md의 P0 우선순위 항목을 먼저 확인
2. 기존 코드의 문제점을 반복하지 않도록 주의
3. 개선 방안을 참고하여 코드 작성
4. 새로운 이슈 발견 시 CODE_REVIEW.md에 기록

### 3.2 진행 사항 작성 예시

```markdown
## 진행 중 작업

**UI 컴포넌트 연결 (P0)**
- [x] Modal, Form 컴포넌트 확인 및 사용 예시 작성
- [ ] IssueForm 컴포넌트 개발 (이슈 생성/수정)
- [ ] ProjectForm 컴포넌트 개발 (프로젝트 생성/수정)

**완료된 작업 (2025-11-29)**
- [x] 공통 컴포넌트 추출 (StatCard, FilterBar)
- [x] 프로젝트 필터 스토어 생성
```

---

## 4. 코드 품질 기준

### 4.1 타입 안전성

TypeScript를 사용하는 프로젝트의 특성상 타입 안전성을 최우선으로 고려합니다.

**금지 사항:**
- `any` 타입 사용 금지
- `@ts-ignore`, `@ts-expect-error` 남용 금지
- 타입 단언(`as`) 남용 금지

**권장 사항:**
- 모든 함수, 변수에 명확한 타입 정의
- 제네릭을 활용한 재사용 가능한 타입 정의
- 유니온 타입, 인터섹션 타입 적절히 활용
- 타입 가드 함수를 통한 타입 좁히기

**예시:**
```typescript
// 나쁜 예
function processData(data: any) {
  return data.value;
}

// 좋은 예
interface Data {
  value: string;
  id: number;
}

function processData(data: Data): string {
  return data.value;
}
```

---

## 5. 코드 구조 및 리팩토링

### 5.1 리팩토링 최소화 원칙

리팩토링은 필수적이지만, 불필요한 리팩토링은 시간 낭비입니다. 처음부터 잘 설계하여 리팩토링을 최소화합니다.

**핵심 원칙:**
1. **로직 분리**: 기능별로 명확하게 로직을 분리
2. **중복 코드 지양**: 공통 로직은 컴포넌트, 훅, 유틸리티로 추출
3. **재사용성 고려**: 처음부터 재사용 가능한 구조로 설계
4. **단일 책임 원칙**: 각 모듈은 하나의 명확한 책임만 가짐

### 5.2 로직 분리 가이드

**컴포넌트:**
- UI 렌더링에만 집중
- 비즈니스 로직은 커스텀 훅으로 분리
- 공통 UI 패턴은 재사용 가능한 컴포넌트로 추출

**커스텀 훅:**
- 데이터 fetching 로직
- 상태 관리 로직
- 복잡한 계산 로직
- 이벤트 핸들러 로직

**유틸리티 함수:**
- 순수 함수 (부작용 없음)
- 데이터 변환 로직
- 검증 로직
- 포맷팅 로직

### 5.3 중복 코드 제거 전략

**공통 패턴 발견 시:**
1. 공통 로직을 컴포넌트/훅/유틸리티로 추출
2. 기존 코드를 새로 추출한 모듈로 교체
3. 문서에 사용 예시 추가

**예시:**
```typescript
// 중복 코드 발견
// pages/issues/page.tsx
const filteredIssues = issues.filter(issue => {
  if (searchQuery && !issue.title.includes(searchQuery)) return false;
  if (statusFilter && issue.status !== statusFilter) return false;
  return true;
});

// pages/projects/page.tsx
const filteredProjects = projects.filter(project => {
  if (searchQuery && !project.name.includes(searchQuery)) return false;
  if (statusFilter && project.status !== statusFilter) return false;
  return true;
});

// 공통 유틸리티로 추출
// lib/utils/filter.ts
export function filterItems<T extends { title?: string; name?: string; status?: string }>(
  items: T[],
  searchQuery: string,
  statusFilter?: string
): T[] {
  return items.filter(item => {
    const searchableText = item.title || item.name || '';
    if (searchQuery && !searchableText.includes(searchQuery)) return false;
    if (statusFilter && item.status !== statusFilter) return false;
    return true;
  });
}
```

---

## 6. 작업 프로세스

### 6.1 작업 시작 전

1. 관련 문서 확인 (`docs/README.md` 참고)
2. 작업 범위 및 우선순위 확인
3. 필요한 정보 수집
4. 작업 계획 수립

### 6.2 작업 중

1. 타입 안전성 유지
2. 중복 코드 최소화
3. 명확한 변수명 및 함수명 사용
4. 주석은 "왜"를 설명 (코드 자체는 "무엇"을 설명)

### 6.3 작업 완료 후

1. 코드 리뷰 (자체 검토)
2. 타입 에러 확인
3. **DEVELOPMENT_LOG.md에 작업 완료 기록** (필수)
   - 최신 항목이 위에 오도록 작성 (역순)
   - 작업 완료 즉시 기록
   - 작성 형식은 3.1 개발 로그 작성 섹션 참고
4. 관련 문서에 변경 사항 반영 (DEVELOPMENT_PLAN.md 등)

---

## 7. 문서 업데이트 가이드

### 7.1 업데이트가 필요한 경우

- 새로운 기능 추가 시
- 컴포넌트 개발 완료 시
- 로직 구현 완료 시
- 중요한 결정 사항 변경 시
- 이슈 발견 및 해결 시

### 7.2 업데이트할 문서

- `DEVELOPMENT_PLAN.md`: 진행 상황 업데이트
- `COMPONENTS.md`: 새 컴포넌트 추가 시
- `REFACTORING_ANALYSIS.md`: 리팩토링 수행 시
- 관련 섹션 문서: 해당 기능 문서 업데이트

---

## 8. 의사소통 원칙

### 8.1 제안과 논의

- 더 나은 방법이 있다고 생각되면 제안
- 의견이 다를 수 있으니 함께 논의
- 최종 결정은 합의를 통해 이루어짐

### 8.2 피드백

- 건설적인 피드백 환영
- 비판보다는 개선 방안 제시
- 서로 배우고 성장하는 문화

---

## 9. 참고 문서

작업 시 참고할 주요 문서:

**필수 문서:**
- `docs/README.md`: 문서 인덱스
- `docs/WORKING_GUIDELINES.md`: 작업 가이드라인 (현재 문서)
- `docs/DEVELOPMENT_LOG.md`: 개발 로그 (작업 완료 시 기록)

**개발 문서:**
- `docs/DEVELOPMENT_PLAN.md`: 개발 계획 및 진행 상황
- `docs/COMPONENTS.md`: 컴포넌트 문서
- `docs/CODE_REVIEW.md`: 코드 리뷰 보고서 (필수 확인)
- `docs/REFACTORING_ANALYSIS.md`: 리팩토링 가이드
- `docs/BACKEND_API_GUIDE.md`: API 개발 가이드
- `docs/CODE_SPLITTING_GUIDE.md`: 코드 스플리팅 가이드

**협업 문서:**
- `docs/COLLABORATION_GUIDELINES.md`: 협업 가이드라인
- `docs/GITFLOW.md`: Git 워크플로우
- `docs/UI_DESIGN_GUIDELINES.md`: UI 디자인 가이드라인

---

## 10. 마무리

우리는 함께 더 나은 결과를 만들어갑니다. 각자의 전문성과 경험을 존중하며, 서로 배우고 성장하는 팀이 되겠습니다.

모든 제안과 의견은 환영합니다. 함께 논의하고 결정하며, 자연스러운 리듬으로 작업을 진행하겠습니다.

감사합니다.

---

**문서 작성일**: 2025-11-29  
**마지막 업데이트**: 2025-11-29

