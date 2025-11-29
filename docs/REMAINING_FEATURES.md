# 남은 기능 정리

> **작성일**: 2025-11-29  
> **기준**: PRD.md 및 현재 구현 상태 비교

---

## 📋 개요

PRD 문서와 현재 구현 상태를 비교하여 남은 기능들을 정리했습니다.

---

## ✅ 완료된 기능 (PRD 기준)

### Phase 1: 핵심 기능 (P0)
- ✅ 프로젝트 설정 (Next.js/React, TypeScript, Tailwind CSS 4)
- ✅ 기본 레이아웃 및 네비게이션 구현
- ✅ 메인 대시보드/홈 화면 구현
- ✅ 기본 데이터 표시 컴포넌트 구현 (이슈, 프로젝트 목록/상세, 칸반 보드)
- ✅ API 클라이언트 설정 및 환경 구성

### Phase 2: 향상된 기능 (P1)
- ✅ 검색 기능 구현
- ✅ 데이터 필터링 및 정렬 기능
- ✅ 상세 보기 페이지/모달 구현
- ✅ 사용자 인증 구현 (로그인, 회원가입, 이메일 인증, OAuth)
- ✅ 데이터 시각화 구현 (PieChart, LineChart 컴포넌트)

### Phase 3: 추가 기능 및 마무리 (P2)
- ✅ 설정 페이지 구현 (테마, 언어, 접근성 설정)
- ✅ 알림 및 피드백 시스템 구현 (토스트 시스템, 알림 훅)
- ✅ 성능 최적화 (유틸리티 함수: debounce, throttle, 이미지 지연 로딩)
- ✅ 접근성 개선 (키보드 이벤트, 포커스 트랩, ARIA)
- ✅ 문서화 완료

---

## 🚧 남은 기능

### 1. 대시보드 실제 데이터 연동 (P1)

**현재 상태**: 목 데이터 사용 중

**위치**: `src/app/page.tsx`

**해야 할 일**:
- 통계 데이터 API 연동
  - 전체 프로젝트 수
  - 전체 이슈 수
  - 진행 중 이슈 수
  - 완료된 이슈 수
- 활동 피드 API 연동
  - 최근 활동 내역 조회
  - 활동 타입별 필터링

**API 엔드포인트 필요**:
- `GET /api/dashboard/stats` - 대시보드 통계
- `GET /api/dashboard/activities` - 최근 활동

---

### 2. 칸반 보드 API 연동 (P1)

**현재 상태**: 목 데이터 사용, 드래그 앤 드롭은 작동하지만 API 호출 없음

**위치**: `src/app/kanban/page.tsx`

**해야 할 일**:
- 칸반 보드 데이터 API 연동
  - 이슈 목록을 칸반 형식으로 조회
  - 상태별 그룹화
- 드래그 앤 드롭 시 API 호출
  - 카드 이동: `PUT /api/issues/[id]` (status 변경)
  - 카드 순서 변경: `PUT /api/issues/[id]` (order_position 변경)
- 칸반 보드 설정 기능
  - 표시할 프로젝트 선택
  - 표시할 상태 선택

**API 엔드포인트 필요**:
- `GET /api/issues?view=kanban` - 칸반 보드용 이슈 조회
- `PUT /api/issues/[id]` - 이슈 상태/순서 변경 (이미 존재)

---

### 3. 이슈 댓글 API 연동 (P1)

**현재 상태**: `useIssue` 훅에 TODO 주석 존재

**위치**: `src/hooks/useIssue.ts`

**해야 할 일**:
- 댓글 CRUD API 연동
  - 댓글 추가: `POST /api/issues/[id]/comments`
  - 댓글 수정: `PUT /api/issues/[id]/comments/[commentId]`
  - 댓글 삭제: `DELETE /api/issues/[id]/comments/[commentId]`
  - 댓글 목록 조회: `GET /api/issues/[id]/comments`

**API 엔드포인트 필요**:
- `GET /api/issues/[id]/comments` - 댓글 목록
- `POST /api/issues/[id]/comments` - 댓글 생성
- `PUT /api/issues/[id]/comments/[commentId]` - 댓글 수정
- `DELETE /api/issues/[id]/comments/[commentId]` - 댓글 삭제

---

### 4. 이슈 서브태스크 API 연동 (P1)

**현재 상태**: `useIssue` 훅에 TODO 주석 존재

**위치**: `src/hooks/useIssue.ts`

**해야 할 일**:
- 서브태스크 CRUD API 연동
  - 서브태스크 추가: `POST /api/issues/[id]/subtasks`
  - 서브태스크 수정: `PUT /api/issues/[id]/subtasks/[subtaskId]`
  - 서브태스크 삭제: `DELETE /api/issues/[id]/subtasks/[subtaskId]`
  - 서브태스크 완료 토글: `PUT /api/issues/[id]/subtasks/[subtaskId]/toggle`

**API 엔드포인트 필요**:
- `GET /api/issues/[id]/subtasks` - 서브태스크 목록 (이슈 조회 시 포함됨)
- `POST /api/issues/[id]/subtasks` - 서브태스크 생성
- `PUT /api/issues/[id]/subtasks/[subtaskId]` - 서브태스크 수정
- `DELETE /api/issues/[id]/subtasks/[subtaskId]` - 서브태스크 삭제
- `PUT /api/issues/[id]/subtasks/[subtaskId]/toggle` - 완료 토글

---

### 5. 이슈 첨부파일 API 연동 (P1)

**현재 상태**: UI는 구현되어 있으나 실제 파일 업로드 API 연동 필요

**위치**: `src/components/issue/IssueAttachments.tsx`, `src/components/forms/FileUpload.tsx`

**해야 할 일**:
- 파일 업로드 API 연동
  - 파일 업로드: `POST /api/issues/[id]/attachments`
  - 파일 다운로드: `GET /api/issues/[id]/attachments/[attachmentId]/download`
  - 파일 삭제: `DELETE /api/issues/[id]/attachments/[attachmentId]`
- 파일 업로드 진행률 표시
- 파일 크기 제한 검증 (10MB)

**API 엔드포인트 필요**:
- `POST /api/issues/[id]/attachments` - 파일 업로드
- `GET /api/issues/[id]/attachments/[attachmentId]/download` - 파일 다운로드
- `DELETE /api/issues/[id]/attachments/[attachmentId]` - 파일 삭제

---

### 6. 팀 멤버 초대 API 개선 (P1)

**현재 상태**: 이메일로 초대하지만 실제 사용자 ID 조회 로직 필요

**위치**: `src/app/teams/[id]/page.tsx`

**해야 할 일**:
- 이메일로 사용자 조회 API 연동
  - `GET /api/users/search?email=...` - 이메일로 사용자 검색
- 초대 로직 개선
  - 이메일로 사용자 검색 후 초대
  - 존재하지 않는 사용자 처리

**API 엔드포인트 필요**:
- `GET /api/users/search?email=...` - 이메일로 사용자 검색

---

### 7. AI 기능 API 연동 (P2)

**현재 상태**: API 엔드포인트는 존재하나 실제 연동 필요

**위치**: `src/app/api/ai/*/route.ts`, `src/components/issue/AIFeatures.tsx`

**AI 기능 목록**:
- ✅ `POST /api/ai/summary` - 이슈 요약
- ✅ `POST /api/ai/suggestion` - 제안 생성
- ✅ `POST /api/ai/auto-label` - 자동 라벨링
- ✅ `POST /api/ai/duplicate-detection` - 중복 이슈 감지
- ✅ `POST /api/ai/comment-summary` - 댓글 요약

**해야 할 일**:
- AI 기능 컴포넌트와 API 연동
- 에러 처리 및 로딩 상태 관리
- AI 응답 결과 표시

---

### 8. 프로필 수정 API 연동 (P1)

**현재 상태**: UI는 구현되어 있으나 API 연동 필요

**위치**: `src/components/profile/ProfileForm.tsx`

**해야 할 일**:
- 프로필 정보 수정 API 연동
  - `PUT /api/users/me` - 프로필 정보 수정
  - `PUT /api/users/me/avatar` - 아바타 업로드

**API 엔드포인트 필요**:
- `PUT /api/users/me` - 프로필 정보 수정
- `PUT /api/users/me/avatar` - 아바타 업로드

---

### 9. 비밀번호 변경 API 연동 (P1)

**현재 상태**: UI는 구현되어 있으나 API 연동 필요

**위치**: `src/components/profile/PasswordChangeForm.tsx`

**해야 할 일**:
- 비밀번호 변경 API 연동
  - `PUT /api/users/me/password` - 비밀번호 변경

**API 엔드포인트 필요**:
- `PUT /api/users/me/password` - 비밀번호 변경

---

### 10. OAuth 로그인 완전 구현 (P1)

**현재 상태**: OAuth 컴포넌트는 있으나 실제 인증 플로우 완성 필요

**위치**: `src/components/auth/OAuthButton.tsx`, `src/store/auth-store.ts`

**해야 할 일**:
- OAuth 콜백 처리
  - `GET /api/auth/callback/[provider]` - OAuth 콜백 처리
- OAuth 토큰 저장 및 세션 관리
- OAuth 에러 처리

**API 엔드포인트 필요**:
- `GET /api/auth/callback/google` - Google OAuth 콜백
- `GET /api/auth/callback/github` - GitHub OAuth 콜백
- `GET /api/auth/callback/kakao` - Kakao OAuth 콜백

---

### 11. 테스트 및 버그 수정 (P2)

**현재 상태**: 테스트 코드 없음

**해야 할 일**:
- 단위 테스트 작성
- 통합 테스트 작성
- E2E 테스트 작성 (선택)
- 버그 수정 및 안정화

---

## 📊 우선순위별 정리

### P0 (필수) - 없음
모든 필수 기능이 완료되었습니다.

### P1 (권장) - 9개 항목
1. 대시보드 실제 데이터 연동
2. 칸반 보드 API 연동
3. 이슈 댓글 API 연동
4. 이슈 서브태스크 API 연동
5. 이슈 첨부파일 API 연동
6. 팀 멤버 초대 API 개선
7. 프로필 수정 API 연동
8. 비밀번호 변경 API 연동
9. OAuth 로그인 완전 구현

### P2 (선택) - 2개 항목
1. AI 기능 API 연동
2. 테스트 및 버그 수정

---

## 🔍 추가 확인 사항

### 이미 구현되었지만 PRD에 명시되지 않은 기능
- ✅ 이슈 라벨 관리
- ✅ 이슈 우선순위 관리
- ✅ 프로젝트 즐겨찾기
- ✅ 프로젝트 아카이브
- ✅ 알림 시스템
- ✅ 이메일 인증
- ✅ 약관 동의 모달
- ✅ 에러 바운더리

### PRD에 명시되었지만 구현되지 않은 기능
- 없음 (모든 PRD 기능이 구현됨)

---

## 📝 참고

- PRD 문서: `docs/PRD.md`
- 개발 로그: `docs/DEVELOPMENT_LOG.md`
- API 가이드: `docs/BACKEND_API_GUIDE.md`

---

**마지막 업데이트**: 2025-11-29

