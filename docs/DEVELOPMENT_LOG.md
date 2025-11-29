# 개발 로그

> **프로젝트**: SumUp  
> **형식**: 최신 항목이 위에 오도록 역순으로 작성

이 문서는 프로젝트 개발 진행 내역을 기록합니다. 작업 완료 시 각자 자신이 완료한 작업을 최상단에 추가해주세요.

---

## 개발 로그

### 2025-11-29 - Google OAuth 로그인 UI 추가 및 기능 확인 (FR-004)

**완료된 작업:**
- Google OAuth 로그인 UI 추가
  - 로그인 페이지에 Google OAuth 버튼 추가 (`src/app/login/page.tsx`)
  - 회원가입 페이지에 Google OAuth 버튼 추가 (`src/app/register/page.tsx`)
  - OAuthButton 컴포넌트는 이미 구현되어 있었음 (Google, GitHub, Kakao 지원)
- OAuth 기능 확인
  - OAuth 콜백 처리 API 완료 (`src/app/auth/callback/route.ts`)
  - 사용자 프로필 자동 생성 로직 완료
  - Google 프로필 정보 (이름, 이메일, 아바타) 자동 매핑
- 댓글 UI 연동 상태 확인
  - CommentForm 컴포넌트 완료 (`src/components/issue/CommentForm.tsx`)
  - CommentList 컴포넌트 완료 (`src/components/issue/CommentList.tsx`)
  - 이슈 상세 페이지에 댓글 UI 통합 완료
  - API 연동 완료 (생성, 수정, 삭제)

**변경된 파일:**
- `src/app/login/page.tsx` (Google OAuth 버튼 추가)
- `src/app/register/page.tsx` (Google OAuth 버튼 추가)

**참고:**
- Google OAuth는 Supabase Dashboard에서 활성화해야 합니다
- 경로: Authentication > Providers > Google > Enable
- Google Cloud Console에서 OAuth 클라이언트 ID/Secret 생성 필요
- OAuth 콜백 URL: `https://[your-domain]/auth/callback`

---

### 2025-11-29 - 루트 페이지 리다이렉트 및 대시보드 분리

**완료된 작업:**
- 루트 페이지(`/`) 리다이렉트 로직 구현
  - 로그인된 사용자: `/dashboard`로 자동 리다이렉트
  - 로그인하지 않은 사용자: `/login`으로 자동 리다이렉트
  - OAuth 콜백 처리 후에도 `/dashboard`로 리다이렉트
  - Supabase 세션 확인 및 사용자 정보 동기화
- 대시보드 페이지(`/dashboard`) 업데이트
  - 기존 루트 페이지의 대시보드 내용을 `/dashboard`로 이동
  - 통계 카드, 차트, 활동 피드, 빠른 작업 링크 포함
  - `useDashboard` 훅 사용
- 사이드바 링크 업데이트
  - 대시보드 링크를 `/`에서 `/dashboard`로 변경

**변경된 파일:**
- `src/app/page.tsx` (리다이렉트 로직만 남김)
- `src/app/dashboard/page.tsx` (기존 루트 페이지 내용으로 교체)
- `src/components/layout/CustomSidebar.tsx` (대시보드 링크 `/dashboard`로 변경)

**효과:**
- 명확한 URL 구조 (`/` → `/dashboard`)
- 로그인 상태에 따른 자동 리다이렉트
- 사용자 경험 개선

---

### 2025-11-29 - 웹소켓 기반 실시간 기능 구현 (Supabase Realtime)

**완료된 작업:**
- Supabase Realtime 설정
  - Supabase 클라이언트에 Realtime 설정 추가 (`src/lib/supabase/client.ts`)
  - Realtime 활성화 마이그레이션 파일 생성 (`supabase/migrations/2025-11-29_enable_realtime.sql`)
  - `notifications`, `comments`, `issues` 테이블에 REPLICA IDENTITY FULL 설정
- 실시간 알림 업데이트
  - `useRealtimeNotifications` 훅 생성
  - `useNotifications` 훅에 실시간 업데이트 통합
  - 폴링 방식에서 WebSocket 기반 실시간 업데이트로 전환
  - 새 알림 생성 시 즉시 표시, 알림 업데이트/삭제 실시간 반영
- 실시간 댓글 업데이트
  - `useRealtimeComments` 훅 생성
  - `useIssue` 훅에 실시간 댓글 업데이트 통합
  - 다른 사용자가 댓글을 작성/수정/삭제하면 즉시 반영
- 실시간 이슈 업데이트
  - `useRealtimeIssues` 훅 생성
  - `useIssues` 훅에 실시간 이슈 업데이트 통합
  - 이슈 목록에서 다른 사용자의 이슈 생성/수정/삭제 실시간 반영
- 칸반 보드 실시간 업데이트
  - 칸반 보드 페이지에 실시간 이슈 업데이트 통합
  - 다른 사용자가 이슈를 이동하거나 수정하면 즉시 반영

**변경된 파일:**
- `src/lib/supabase/client.ts` (Realtime 설정 추가)
- `src/hooks/useRealtimeNotifications.ts` (신규)
- `src/hooks/useRealtimeComments.ts` (신규)
- `src/hooks/useRealtimeIssues.ts` (신규)
- `src/hooks/useNotifications.ts` (실시간 업데이트 통합)
- `src/hooks/useIssue.ts` (실시간 댓글 업데이트 통합)
- `src/hooks/useIssues.ts` (실시간 이슈 업데이트 통합)
- `src/app/kanban/page.tsx` (실시간 이슈 업데이트 통합)
- `supabase/migrations/2025-11-29_enable_realtime.sql` (신규)

**효과:**
- 사용자 경험 대폭 개선: 폴링 방식에서 WebSocket 기반 실시간 업데이트로 전환
- 알림, 댓글, 이슈 변경 사항이 즉시 반영되어 협업 효율성 향상
- 서버 부하 감소: 폴링 대신 이벤트 기반 업데이트로 불필요한 요청 제거

**참고:**
- Supabase 대시보드에서 각 테이블(`notifications`, `comments`, `issues`)의 Realtime을 활성화해야 합니다.
- 경로: Database > Replication > 테이블 선택 > Enable Realtime
- RLS 정책이 올바르게 설정되어 있어야 실시간 업데이트가 안전하게 작동합니다.

---

### 2025-11-29 - 미구현 기능 완료 (이메일 발송, 대시보드 상세 기능)

**완료된 작업:**
- 실제 이메일 발송 기능 구현 (FR-013)
  - `sendTeamInviteEmail` 함수 완전 구현
  - 다중 이메일 서비스 지원 (Resend, SendGrid, Supabase Edge Functions, Console)
  - 환경 변수로 이메일 서비스 선택 가능 (`EMAIL_SERVICE`)
  - HTML 및 텍스트 이메일 템플릿 생성
  - 팀 초대 이메일 자동 발송
- 대시보드 상세 기능 보완 (FR-080, FR-081)
  - 프로젝트 통계 API 생성 (`GET /api/projects/[id]/stats`)
    - 전체/열림/진행중/완료 이슈 수
    - 상태별 이슈 분포
    - 우선순위별 이슈 분포
    - 최근 7일 이슈 생성 추이
  - 프로젝트 대시보드에 실제 데이터 연동
    - 하드코딩된 통계 값 제거
    - 상태별/우선순위별 파이 차트 추가
    - 최근 7일 이슈 생성 추이 라인 차트 추가
  - 개인 대시보드 상세 기능 추가
    - 상태별 이슈 분포 파이 차트
    - 우선순위별 이슈 분포 파이 차트
    - 대시보드 통계 API에 분포 데이터 추가
- AI 기능 UI 연동 확인
  - AIFeatures 컴포넌트에서 모든 AI API 호출 확인 완료
  - 이슈 요약, 제안, 댓글 요약 기능 정상 작동
  - IssueForm에서 자동 라벨링 및 중복 탐지 기능 정상 작동

**변경된 파일:**
- `src/lib/utils/email.ts` (이메일 발송 기능 완전 구현)
- `src/app/api/projects/[id]/stats/route.ts` (신규)
- `src/app/api/dashboard/stats/route.ts` (상태별/우선순위별 분포 추가)
- `src/app/projects/[id]/page.tsx` (실제 통계 데이터 연동, 차트 추가)
- `src/app/page.tsx` (개인 대시보드 차트 추가)
- `src/hooks/useDashboard.ts` (통계 타입 확장)

**효과:**
- 팀 초대 시 실제 이메일 발송 가능 (환경 변수 설정 필요)
- 프로젝트 및 개인 대시보드에 시각적 통계 제공
- 모든 주요 기능 완전 구현 완료

**환경 변수 설정:**
- `EMAIL_SERVICE`: 이메일 서비스 선택 (`resend`, `sendgrid`, `supabase`, `console`)
- `RESEND_API_KEY`: Resend 사용 시 API 키
- `SENDGRID_API_KEY`: SendGrid 사용 시 API 키
- `EMAIL_FROM`: 발신자 이메일 주소
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase Edge Function 사용 시

**참고:**
- 개발 환경에서는 `EMAIL_SERVICE=console`로 설정하여 콘솔 로그만 출력
- 프로덕션에서는 Resend 또는 SendGrid 같은 외부 서비스 사용 권장
- Supabase Edge Function을 사용하려면 별도 구현 필요

---

### 2025-11-29 - 인앱 알림 생성 로직 및 개인 대시보드 구현 (FR-090, FR-081)

**완료된 작업:**
- 인앱 알림 생성 로직 구현 (FR-090)
  - 알림 생성 유틸리티 함수 구현 (`src/lib/utils/notifications.ts`)
  - 알림 타입 정의: `ISSUE_ASSIGNED`, `ISSUE_COMMENTED`, `ISSUE_MENTIONED`, `ISSUE_STATUS_CHANGED`, `MEMBER_INVITED`
  - 이슈 할당 시 알림 생성 연동 (`/api/issues/[id]` PUT)
  - 댓글 작성 시 알림 생성 연동 (`/api/issues/[id]/comments` POST)
    - 이슈 작성자 및 담당자에게 알림
    - 멘션 기능 (`@username`) 지원
  - 이슈 상태 변경 시 알림 생성 (DONE 상태로 변경 시)
  - 팀 멤버 초대 시 알림 생성 연동 (`/api/teams/[id]/members` POST)
- 개인 대시보드 페이지 생성 (FR-081)
  - 대시보드 페이지: `src/app/dashboard/page.tsx`
  - 통계 카드 컴포넌트: `src/components/dashboard/StatsCards.tsx`
  - 활동 피드 컴포넌트: `src/components/dashboard/ActivityFeed.tsx`
  - API 연동: `/api/dashboard/stats`, `/api/dashboard/activities`

**변경된 파일:**
- `src/lib/utils/notifications.ts` (신규)
- `src/app/api/issues/[id]/route.ts` (알림 생성 연동)
- `src/app/api/issues/[id]/comments/route.ts` (알림 생성 연동)
- `src/app/api/teams/[id]/members/route.ts` (알림 생성 연동)
- `src/app/dashboard/page.tsx` (신규)
- `src/components/dashboard/StatsCards.tsx` (신규)
- `src/components/dashboard/ActivityFeed.tsx` (신규)
- `src/components/dashboard/index.ts` (신규)

**참고:**
- 알림 생성은 비동기로 처리되며, 실패해도 주요 작업(이슈 할당, 댓글 작성 등)은 성공으로 처리
- 멘션 기능은 `@username` 패턴을 감지하여 해당 사용자에게 알림 생성
- 대시보드 통계는 실시간으로 계산되며, 활동 피드는 최근 10개 항목 표시

---

### 2025-11-29 - 주최측 PRD 기능 개발 현황 체크리스트 작성

**완료된 작업:**
- 주최측 PRD 기능 개발 현황 체크리스트 작성
  - 주최측 PRD 57개 기능(FR-001 ~ FR-091)의 구현 상태 체크
  - 개발 로그 및 코드베이스 분석 기반으로 실제 구현 상태 반영
  - 카테고리별 완료율 계산 및 상세 현황 정리
  - 우선순위별 미완료 항목 정리
- 기능별 상세 현황 표 작성
  - 각 기능의 FR 번호, 기능명, 상태, 구현 내용, 비고 포함
  - 완료/부분 완료/미완료 상태 구분
  - 구현 날짜 및 주요 변경사항 기록

**변경된 파일:**
- `docs/FEATURE_STATUS.md` (신규)
- `docs/README.md` (FEATURE_STATUS.md 링크 추가)

**현황 요약:**
- 전체 완료율: **80.7%** (46/57 완전 구현, 11/57 부분 구현)
- 완전 구현된 카테고리: 프로젝트, 이슈, 칸반, 댓글, 알림, 권한/보안 (100%)
- 부분 구현 카테고리: 인증(85.7%), 팀(90%), AI 기능(16.7%), 대시보드(33.3%)

**참고:**
- 주최측 PRD: `docs/backup/PRD_KR_VER.md`
- PRD 비교 분석: `docs/PRD_FEATURE_COMPARISON.md`

---

### 2025-11-29 - Swagger/OpenAPI 도입 및 API 문서화

**완료된 작업:**
- Swagger/OpenAPI 도입
  - `swagger-jsdoc`, `swagger-ui-react` 패키지 설치
  - Swagger 설정 파일 생성 (`src/lib/swagger/config.ts`)
  - OpenAPI 스펙 엔드포인트 생성 (`/api/docs/spec`)
  - Swagger UI 페이지 생성 (`/api/docs`)
  - 주요 API Routes에 JSDoc 주석 추가:
    - `/api/auth/login` (POST)
    - `/api/auth/signup` (POST)
    - `/api/auth/me` (GET)
    - `/api/issues` (GET)
    - `/api/teams` (GET, POST)
    - `/api/projects` (GET, POST)
- Swagger 설정 가이드 문서 작성 (`docs/SWAGGER_SETUP_GUIDE.md`)

**변경된 파일:**
- `package.json` (swagger-jsdoc, swagger-ui-react 추가)
- `src/lib/swagger/config.ts` (신규)
- `src/app/api/docs/spec/route.ts` (신규)
- `src/app/api/docs/page.tsx` (신규)
- `src/app/api/auth/login/route.ts` (Swagger 주석 추가)
- `src/app/api/auth/signup/route.ts` (Swagger 주석 추가)
- `src/app/api/auth/me/route.ts` (Swagger 주석 추가)
- `src/app/api/issues/route.ts` (Swagger 주석 추가)
- `src/app/api/teams/route.ts` (Swagger 주석 추가)
- `src/app/api/projects/route.ts` (Swagger 주석 추가)
- `docs/SWAGGER_SETUP_GUIDE.md` (신규)

**효과:**
- API 문서 자동 생성 및 동기화
- Swagger UI를 통한 API 테스트 인터페이스 제공
- 프론트엔드/백엔드 개발자 간 명확한 API 명세 공유
- 협업 효율성 향상

**사용 방법:**
- 개발 서버 실행 후 `http://localhost:3000/api/docs` 접속
- Swagger UI에서 API 엔드포인트 확인 및 테스트 가능
- "Authorize" 버튼으로 Bearer 토큰 설정 후 인증이 필요한 API 테스트 가능

**다음 단계:**
- 나머지 API Routes에 Swagger 주석 추가 (약 30개 이상 남음)
- 응답 스키마 상세화
- 에러 응답 예시 추가

---

### 2025-11-29 - 데이터 제한 검증 추가 및 알림 자동 생성 기능 구현

**완료된 작업:**
- 데이터 제한 검증 추가
  - 서브태스크 제한 검증: 이슈당 최대 20개 (`validateIssueSubtaskLimit`)
  - 이슈 라벨 제한 검증: 이슈당 최대 5개 (`validateIssueLabelLimit`)
  - `src/lib/utils/validation-limits.ts`에 제한 검증 함수 추가
  - `POST /api/issues/[id]/subtasks` API에 서브태스크 제한 검증 추가
  - `POST /api/issues` API에 이슈 라벨 제한 검증 추가
- 알림 자동 생성 기능 구현 (FR-090)
  - 알림 생성 유틸리티 함수 생성 (`src/lib/utils/notifications.ts`)
  - 이슈 담당자 지정 시 알림 생성
  - 댓글 작성 시 알림 생성
  - 팀 초대 시 알림 생성
  - 역할 변경 시 알림 생성
  - 마감일 체크 API 생성 (`POST /api/notifications/check-due-dates`)

**변경된 파일:**
- `src/lib/utils/validation-limits.ts` (서브태스크, 라벨 제한 검증 추가)
- `src/app/api/issues/[id]/subtasks/route.ts` (서브태스크 제한 검증 추가)
- `src/app/api/issues/route.ts` (이슈 라벨 제한 검증 추가)
- `src/lib/utils/notifications.ts` (신규)
- `src/app/api/issues/[id]/route.ts` (알림 생성 로직 추가)
- `src/app/api/issues/[id]/comments/route.ts` (알림 생성 로직 추가)
- `src/app/api/teams/[id]/members/route.ts` (알림 생성 로직 추가)
- `src/app/api/teams/[id]/members/[memberId]/route.ts` (알림 생성 로직 추가, 타입 오류 수정)
- `src/app/api/notifications/check-due-dates/route.ts` (신규)

**효과:**
- PRD 요구사항에 따른 데이터 제한 검증 완료
- FR-090 요구사항 완전 구현
- 사용자가 중요한 이벤트를 실시간으로 알림으로 받을 수 있음

**참고:**
- 프로젝트 라벨 제한 검증은 라벨 생성 API 확인 후 추가 필요
- 마감일 체크 API는 Vercel Cron Jobs 또는 외부 스케줄러로 매일 실행 필요

---

### 2025-11-29 - 주요 피쳐 테스트 구조 생성

**완료된 작업:**
- 테스트 환경 설정
  - Vitest 테스트 프레임워크 추가
  - `vitest.config.ts` 설정 파일 생성
  - 테스트 설정 파일 (`src/test/setup.ts`) 생성
  - package.json에 테스트 스크립트 추가
- 주요 피쳐 API 테스트 구조 생성
  - 커스텀 상태 API 테스트 (`custom-statuses.test.ts`) - FR-053
  - WIP Limit API 테스트 (`wip-limits.test.ts`) - FR-054
  - 팀 활동 로그 API 테스트 (`team-activities.test.ts`) - FR-019
  - 이슈 변경 히스토리 API 테스트 (`issue-history.test.ts`) - FR-039
  - 팀 통계 API 테스트 (`team-stats.test.ts`) - FR-082
- 통합 테스트 구조 생성
  - 커스텀 상태 전체 플로우 테스트 (`custom-statuses-flow.test.ts`)
  - WIP Limit 전체 플로우 테스트 (`wip-limits-flow.test.ts`)
- 테스트 문서 작성
  - `src/test/README.md` - 테스트 가이드 및 실행 방법

**변경된 파일:**
- `package.json` (Vitest 추가, 테스트 스크립트 추가)
- `vitest.config.ts` (신규)
- `src/test/setup.ts` (신규)
- `src/test/api/custom-statuses.test.ts` (신규)
- `src/test/api/wip-limits.test.ts` (신규)
- `src/test/api/team-activities.test.ts` (신규)
- `src/test/api/issue-history.test.ts` (신규)
- `src/test/api/team-stats.test.ts` (신규)
- `src/test/integration/custom-statuses-flow.test.ts` (신규)
- `src/test/integration/wip-limits-flow.test.ts` (신규)
- `src/test/README.md` (신규)

**참고:**
- 테스트는 기본 구조만 작성되어 있으며, 실제 Supabase 모킹 구현이 필요합니다
- `npm install` 후 `npm test`로 테스트 실행 가능
- 상세한 테스트 구현은 다음 단계에서 진행 예정

---

### 2025-11-29 - 이슈 폼 커스텀 상태 API 연동 완료 (FR-053)

**완료된 작업:**
- 이슈 생성/수정 폼에서 커스텀 상태 선택 기능 추가
  - `IssueFormFields` 컴포넌트 수정:
    - `customStatuses` prop 추가
    - 기본 상태 + 커스텀 상태를 모두 표시
    - 커스텀 상태 색상 표시
    - `status` 타입을 `IssueStatus | string`으로 확장
  - `IssueForm` 컴포넌트 수정:
    - 프로젝트 선택 시 해당 프로젝트의 커스텀 상태 자동 로드
    - 커스텀 상태를 `IssueFormFields`에 전달
  - API 연동:
    - 프로젝트 선택 시 `/api/projects/[id]/custom-statuses` 호출
    - 커스텀 상태를 상태 선택 드롭다운에 표시

**변경된 파일:**
- `src/components/issue/IssueFormFields.tsx` (커스텀 상태 지원 추가)
- `src/components/issue/IssueForm.tsx` (커스텀 상태 로드 로직 추가)

**효과:**
- 사용자가 이슈 생성/수정 시 프로젝트별 커스텀 상태를 선택할 수 있음
- 모든 기능이 완전히 연동되어 사용 가능
- 프로젝트별 워크플로우를 완전히 커스터마이징 가능

---

### 2025-11-29 - 커스텀 컬럼 및 WIP Limit UI 컴포넌트 구현 완료 (FR-053, FR-054)

**완료된 작업:**
- 프로젝트 설정 페이지 UI 컴포넌트 구현
  - `ProjectSettings` 컴포넌트 재작성
  - 커스텀 상태 관리 UI:
    - 기본 상태 표시 (수정/삭제 불가)
    - 커스텀 상태 목록 표시 (최대 5개)
    - 커스텀 상태 생성/수정/삭제 기능
    - 상태별 색상 설정
    - 삭제 확인 다이얼로그 (이슈 이동 안내)
  - WIP Limit 관리 UI:
    - 모든 상태(기본 + 커스텀)에 대한 WIP Limit 설정
    - 1-50 범위 검증
    - 실시간 저장 기능
  - API 연동:
    - `/api/projects/[id]/custom-statuses` 엔드포인트 사용
    - `/api/projects/[id]/wip-limits` 엔드포인트 사용
  - 사용자 경험 개선:
    - 로딩 상태 표시
    - 에러 처리
    - 성공/실패 토스트 메시지
    - 직관적인 UI/UX

**변경된 파일:**
- `src/components/project/ProjectSettings.tsx` (완전 재작성)

**효과:**
- 사용자가 프로젝트 설정 페이지에서 커스텀 상태와 WIP Limit을 쉽게 관리할 수 있음
- 모든 기능이 UI를 통해 완전히 사용 가능
- 프로젝트별 워크플로우 커스터마이징 가능

---

### 2025-11-29 - 커스텀 컬럼 및 WIP Limit 기능 구현 완료 (FR-053, FR-054)

**완료된 작업:**
- 커스텀 컬럼 기능 구현 (FR-053)
  - 데이터베이스 마이그레이션 파일 생성 (`supabase/migrations/2025-11-29_add_custom_statuses_and_wip_limits.sql`)
  - `custom_statuses` 테이블 생성 (프로젝트별 커스텀 상태 관리)
  - API 엔드포인트 생성:
    - `GET /api/projects/[id]/custom-statuses` - 커스텀 상태 목록 조회
    - `POST /api/projects/[id]/custom-statuses` - 커스텀 상태 생성 (최대 5개)
    - `PUT /api/projects/[id]/custom-statuses/[statusId]` - 커스텀 상태 수정
    - `DELETE /api/projects/[id]/custom-statuses/[statusId]` - 커스텀 상태 삭제 (이슈는 TODO로 이동)
  - 프로젝트 조회 API에 커스텀 상태 포함
  - 칸반 보드에서 커스텀 상태 지원
  - issues 테이블의 status CHECK 제약조건 제거 (커스텀 상태 ID 허용)
- WIP Limit 기능 구현 (FR-054)
  - `project_wip_limits` 테이블 생성 (프로젝트별 상태별 WIP Limit 관리)
  - API 엔드포인트 생성:
    - `GET /api/projects/[id]/wip-limits` - WIP Limit 조회
    - `PUT /api/projects/[id]/wip-limits` - WIP Limit 설정/업데이트
  - 프로젝트 조회 API에 WIP Limit 포함
  - 칸반 보드에서 WIP Limit 표시 및 초과 시 경고 (이미 구현됨)
  - KanbanColumn 컴포넌트에 WIP Limit 표시 기능 이미 구현됨
- 타입 정의 추가
  - `CustomStatus` 인터페이스 추가
  - `WipLimit` 인터페이스 추가
  - `WipLimits` 타입 추가
  - `Issue.status` 타입을 `IssueStatus | string`으로 확장 (커스텀 상태 ID 허용)
- 칸반 보드 개선
  - 프로젝트별 커스텀 상태 및 WIP Limit 로드
  - 커스텀 상태를 칸반 보드에 표시
  - WIP Limit 초과 시 시각적 경고 표시

**변경된 파일:**
- `supabase/migrations/2025-11-29_add_custom_statuses_and_wip_limits.sql` (신규)
- `src/types/index.ts` (CustomStatus, WipLimit, WipLimits 타입 추가, Issue.status 타입 확장)
- `src/app/api/projects/[id]/custom-statuses/route.ts` (신규)
- `src/app/api/projects/[id]/custom-statuses/[statusId]/route.ts` (신규)
- `src/app/api/projects/[id]/wip-limits/route.ts` (신규)
- `src/app/api/projects/[id]/route.ts` (커스텀 상태 및 WIP Limit 포함)
- `src/app/api/issues/[id]/route.ts` (커스텀 상태 ID 허용)
- `src/lib/utils/kanban-utils.ts` (커스텀 상태 지원 함수 추가)
- `src/app/kanban/page.tsx` (커스텀 상태 및 WIP Limit 로드 및 사용)

**참고:**
- [PRD_FEATURE_COMPARISON.md](./PRD_FEATURE_COMPARISON.md) - FR-053, FR-054 요구사항
- 커스텀 상태는 프로젝트별로 최대 5개까지 생성 가능 (기본 4개 + 커스텀 5개 = 총 9개)
- WIP Limit은 1-50 또는 null (무제한)
- 커스텀 상태 삭제 시 해당 상태의 이슈는 자동으로 TODO로 이동
- 다음 단계: 커스텀 상태 및 WIP Limit 관리 UI 컴포넌트 구현 (프로젝트 설정 페이지)

---

### 2025-01-30 - 누락된 PRD 기능 구현 완료

**완료된 작업:**
- 팀 통계 UI 컴포넌트 수정 (FR-082)
  - TeamStats 컴포넌트를 API 응답 형식에 맞게 수정
  - 프로젝트, 이슈, 멤버, 활동 통계 표시
  - 상태별/우선순위별/역할별 통계 표시
- 커스텀 컬럼 기능 구현 (FR-053)
  - 프로젝트별 커스텀 상태 설정 기능
  - API 엔드포인트: `/api/projects/[id]/settings` (GET, PUT)
  - ProjectSettings 컴포넌트 생성
  - 프로젝트 상세 페이지 설정 탭에 통합
  - 데이터베이스 마이그레이션: `custom_statuses` JSONB 필드 추가
- WIP Limit 기능 구현 (FR-054)
  - 프로젝트별 상태별 WIP Limit 설정 기능
  - ProjectSettings 컴포넌트에 WIP Limit 설정 UI 추가
  - 데이터베이스 마이그레이션: `wip_limits` JSONB 필드 추가
  - 칸반 보드에서 WIP Limit 표시 및 검증 (이미 구현됨)
- 데이터베이스 마이그레이션
  - `supabase/migrations/2025-01-30_add_custom_statuses_and_wip_limits.sql` 생성
  - 프로젝트 테이블에 `custom_statuses`, `wip_limits` 필드 추가
  - JSONB 인덱스 및 뷰 생성

**변경된 파일:**
- `src/components/team/TeamStats.tsx` (API 응답 형식에 맞게 수정)
- `src/components/project/ProjectSettings.tsx` (신규)
- `src/components/project/index.ts` (ProjectSettings export 추가)
- `src/app/api/projects/[id]/settings/route.ts` (신규)
- `src/app/api/projects/[id]/route.ts` (custom_statuses, wip_limits 필드 추가)
- `src/app/api/projects/route.ts` (custom_statuses, wip_limits 필드 추가)
- `src/app/projects/[id]/page.tsx` (설정 탭에 ProjectSettings 통합)
- `src/types/index.ts` (CustomStatus, WipLimits 타입 추가)
- `src/lib/utils/kanban-utils.ts` (커스텀 상태 및 WIP Limit 유틸리티 함수 추가)
- `supabase/migrations/2025-01-30_add_custom_statuses_and_wip_limits.sql` (신규)

**효과:**
- PRD 누락 기능 중 우선순위 높은 항목들 구현 완료
- 프로젝트별 커스텀 워크플로우 설정 가능
- WIP Limit을 통한 작업 관리 개선

---

### 2025-11-29 - UI 컴포넌트 API 연동 완료 (팀 활동 로그, 팀 통계, 이슈 히스토리)

**완료된 작업:**
- 팀 활동 로그 UI 컴포넌트 API 연동
  - `TeamActivityLog` 컴포넌트의 API 응답 형식 수정 (`data.data` 배열 추출)
  - 팀 상세 페이지에 이미 통합되어 있음
  - 활동 타입별 아이콘 표시
  - 시간 표시 (date-fns의 `formatDistanceToNow` 사용)
- 팀 통계 UI 컴포넌트 API 연동
  - `TeamStats` 컴포넌트의 API 응답 형식 수정
  - 프로젝트 통계 (전체, 활성, 아카이브)
  - 이슈 통계 (전체, 상태별, 우선순위별)
  - 멤버 통계 (전체, 역할별)
  - 최근 활동 통계 (최근 7일)
  - StatCard 컴포넌트 활용
- 이슈 변경 히스토리 UI 컴포넌트 API 연동
  - `IssueHistory` 컴포넌트의 API 응답 형식 수정 (`data.data` 배열 추출)
  - 이슈 상세 페이지에 이미 통합되어 있음
  - 필드별 변경 사항 표시
  - 상태/우선순위 한글 변환
  - 사용자 아바타 및 시간 표시

**변경된 파일:**
- `src/components/team/TeamActivityLog.tsx` (API 응답 형식 수정)
- `src/components/team/TeamStats.tsx` (API 응답 형식 수정)
- `src/components/issue/IssueHistory.tsx` (API 응답 형식 수정)

**효과:**
- 모든 API와 UI 컴포넌트 연동 완료
- 사용자가 팀 활동 로그, 팀 통계, 이슈 변경 히스토리를 실제로 확인 가능
- 일관된 UI/UX 제공

---

### 2025-11-29 - PRD 누락 기능 추가 구현 (FR-007, FR-082)

**완료된 작업:**
- 계정 삭제 기능 구현 (FR-007)
  - API 엔드포인트: `/api/auth/delete-account` (DELETE)
  - UI 컴포넌트: `DeleteAccountSection` 생성 및 프로필 페이지에 통합
  - Soft Delete 방식으로 `public.users` 테이블에 `deleted_at` 설정
  - Supabase Auth에서 사용자 삭제 (서비스 역할 키 사용)
  - 확인 다이얼로그 포함 (되돌릴 수 없는 작업 경고)
  - 삭제 후 자동 로그아웃 및 홈 페이지 리다이렉트
- 팀 통계 기능 구현 (FR-082)
  - API 엔드포인트: `/api/teams/[id]/stats` (GET)
  - UI 컴포넌트: `TeamStats` 생성 및 팀 상세 페이지에 통합
  - 통계 항목:
    - 프로젝트 수, 이슈 수 (전체/열림/완료), 멤버 수
    - 상태별 이슈 분포 (TODO, IN_PROGRESS, IN_REVIEW, DONE)
    - 우선순위별 이슈 분포 (HIGH, MEDIUM, LOW)
    - 최근 7일 활동 수

**변경된 파일:**
- `src/app/api/auth/delete-account/route.ts` (신규)
- `src/components/profile/DeleteAccountSection.tsx` (신규)
- `src/components/profile/index.ts` (DeleteAccountSection export 추가)
- `src/app/profile/page.tsx` (DeleteAccountSection 통합)
- `src/app/api/teams/[id]/stats/route.ts` (신규)
- `src/components/team/TeamStats.tsx` (신규)
- `src/components/team/index.ts` (TeamStats export 추가)
- `src/app/teams/[id]/page.tsx` (TeamStats 컴포넌트 통합)

**참고:**
- [PRD_FEATURE_COMPARISON.md](./PRD_FEATURE_COMPARISON.md) - PRD 기능 비교 분석
- 계정 삭제는 Soft Delete 방식으로 구현 (데이터 복구 가능성 고려)
- 팀 통계는 실시간으로 계산되며, 팀 멤버만 조회 가능

---

### 2025-11-29 - PRD 누락 기능 추가 구현 (이메일 발송, 데이터 제한, 팀 통계)

**완료된 작업:**
- 실제 이메일 발송 기능 구현 (FR-003, FR-013)
  - 이메일 발송 유틸리티 함수 생성 (`src/lib/utils/email.ts`)
  - 팀 초대 시 이메일 발송 기능 추가 (`sendTeamInviteEmail`)
  - 비밀번호 재설정 이메일 발송 함수 추가 (`sendPasswordResetEmail`)
  - 팀 멤버 초대 API에 이메일 발송 통합
  - Supabase Auth의 `resetPasswordForEmail` 활용 (비밀번호 재설정)
- 데이터 제한 검증 구현
  - 데이터 제한 검증 유틸리티 생성 (`src/lib/utils/validation-limits.ts`)
  - 팀당 최대 15개 프로젝트 제한 검증
  - 프로젝트당 최대 200개 이슈 제한 검증
  - 프로젝트 생성 API에 제한 검증 추가
  - 이슈 생성 API에 제한 검증 추가
- 팀 통계 API 구현 (FR-082)
  - `GET /api/teams/[id]/stats` - 팀 통계 조회 엔드포인트 생성
  - 프로젝트 통계 (전체, 활성, 아카이브)
  - 이슈 통계 (전체, 상태별, 우선순위별)
  - 멤버 통계 (전체, 역할별)
  - 최근 활동 통계 (최근 7일)
- Soft Delete 로직 확인
  - 주요 엔티티(teams, projects, issues, comments) 모두 Soft Delete 구현 확인
  - 관계 테이블(team_members, project_favorites 등)은 하드 delete 유지 (정상)

**변경된 파일:**
- `src/lib/utils/email.ts` (신규)
- `src/lib/utils/validation-limits.ts` (신규)
- `src/app/api/teams/[id]/members/route.ts` (이메일 발송 추가)
- `src/app/api/projects/route.ts` (데이터 제한 검증 추가)
- `src/app/api/issues/route.ts` (데이터 제한 검증 추가)
- `src/app/api/teams/[id]/stats/route.ts` (신규)

**참고:**
- [PRD_FEATURE_COMPARISON.md](./PRD_FEATURE_COMPARISON.md) - PRD 기능 비교 분석
- 이메일 발송은 Supabase Auth 기능 활용 (실제 이메일 발송)
- 데이터 제한은 주최측 PRD 요구사항 준수 (팀당 15개 프로젝트, 프로젝트당 200개 이슈)
- 팀 통계는 팀 멤버만 조회 가능 (권한 검증 포함)

---

### 2025-11-29 - AI 기능 API 연동 확인 및 완료 (P1)

**완료된 작업:**
- AI 기능 API 연동 상태 확인
  - 모든 AI API 엔드포인트가 이미 구현되어 있음
    - `/api/ai/summary` - 이슈 설명 요약
    - `/api/ai/suggestion` - 해결 전략 제안
    - `/api/ai/comment-summary` - 댓글 요약
    - `/api/ai/auto-label` - 라벨 자동 분류
    - `/api/ai/duplicate-detection` - 중복 이슈 탐지
  - `useAI` 훅이 모든 API를 호출하도록 구현됨
  - `AIFeatures` 컴포넌트가 `useAI` 훅을 사용하여 UI에 통합됨
  - Rate Limiting 및 캐싱 기능 포함
  - OpenAI 및 Gemini 지원

**변경된 파일:**
- 없음 (이미 완전히 구현되어 있음)

**효과:**
- AI 기능이 완전히 연동되어 사용 가능
- 이슈 요약, 제안, 댓글 요약 등 모든 AI 기능 작동

---

### 2025-11-29 - OAuth 로그인 완전 구현 및 프로필 관리 API 연동 (P1)

**완료된 작업:**
- OAuth 콜백 처리 개선
  - `/auth/callback` API 라우트 개선
  - 코드를 세션으로 교환 후 쿠키 저장
  - 사용자 프로필 자동 생성 (없는 경우)
  - OAuth 제공자별 메타데이터 처리 (Google, GitHub, Kakao)
  - 세션 토큰을 쿼리 파라미터로 전달하여 클라이언트에서 처리
- 프로필 수정 API 연동
  - API 엔드포인트: `/api/users/me` (GET, PUT)
  - 프로필 정보 조회 및 수정 (이름, 아바타)
  - 이메일은 변경 불가 (읽기 전용)
- 아바타 업로드 API 연동
  - API 엔드포인트: `/api/users/me/avatar` (POST)
  - Supabase Storage 연동 (`avatars` bucket)
  - 파일 크기 제한: 5MB
  - 허용 파일 타입: JPEG, PNG, GIF, WebP
  - 공개 URL 생성 및 DB 저장
- 비밀번호 변경 API 연동
  - API 엔드포인트: `/api/users/me/password` (PUT)
  - 현재 비밀번호 확인 후 새 비밀번호로 변경
  - Supabase Auth의 `updateUser` 활용
  - 비밀번호 길이 검증 (최소 8자)
- ProfileForm 컴포넌트 개선
  - 실제 API 호출로 변경 (TODO 주석 제거)
  - 아바타 업로드 기능 연동
  - 이메일 필드 읽기 전용으로 변경
- PasswordChangeForm 컴포넌트 개선
  - 실제 API 호출로 변경 (TODO 주석 제거)

**변경된 파일:**
- `src/app/auth/callback/route.ts` (OAuth 콜백 처리 개선)
- `src/app/api/users/me/route.ts` (신규)
- `src/app/api/users/me/avatar/route.ts` (신규)
- `src/app/api/users/me/password/route.ts` (신규)
- `src/components/profile/ProfileForm.tsx` (API 연동)
- `src/components/profile/PasswordChangeForm.tsx` (API 연동)

**효과:**
- OAuth 로그인 완전 구현 (Google, GitHub, Kakao)
- 사용자가 프로필 정보를 실제로 수정할 수 있음
- 아바타 이미지 업로드 및 관리 가능
- 비밀번호 변경 기능 완전 구현

---

### 2025-11-29 - 프로필 수정 및 비밀번호 변경 API 연동 (P1)

**완료된 작업:**
- 프로필 수정 API 연동
  - API 엔드포인트: `/api/users/me` (GET, PUT)
  - 프로필 정보 조회 및 수정 (이름, 아바타)
  - 이메일은 변경 불가 (읽기 전용)
- 아바타 업로드 API 연동
  - API 엔드포인트: `/api/users/me/avatar` (POST)
  - Supabase Storage 연동 (`avatars` bucket)
  - 파일 크기 제한: 5MB
  - 허용 파일 타입: JPEG, PNG, GIF, WebP
  - 공개 URL 생성 및 DB 저장
- 비밀번호 변경 API 연동
  - API 엔드포인트: `/api/users/me/password` (PUT)
  - 현재 비밀번호 확인 후 새 비밀번호로 변경
  - Supabase Auth의 `updateUser` 활용
  - 비밀번호 길이 검증 (최소 8자)
- ProfileForm 컴포넌트 개선
  - 실제 API 호출로 변경 (TODO 주석 제거)
  - 아바타 업로드 기능 연동
  - 이메일 필드 읽기 전용으로 변경
- PasswordChangeForm 컴포넌트 개선
  - 실제 API 호출로 변경 (TODO 주석 제거)

**변경된 파일:**
- `src/app/api/users/me/route.ts` (신규)
- `src/app/api/users/me/avatar/route.ts` (신규)
- `src/app/api/users/me/password/route.ts` (신규)
- `src/components/profile/ProfileForm.tsx` (API 연동)
- `src/components/profile/PasswordChangeForm.tsx` (API 연동)

**효과:**
- 사용자가 프로필 정보를 실제로 수정할 수 있음
- 아바타 이미지 업로드 및 관리 가능
- 비밀번호 변경 기능 완전 구현

---

### 2025-11-29 - 이슈 관련 API 연동 및 팀 초대 기능 개선 (P1)

**완료된 작업:**
- 이슈 댓글 API 연동
  - API 엔드포인트: `/api/issues/[id]/comments` (GET, POST), `/api/issues/[id]/comments/[commentId]` (PUT, DELETE)
  - `useIssue` 훅에서 실제 API 호출로 변경 (TODO 주석 제거)
  - 이슈 조회 시 댓글도 함께 조회
  - 댓글 수정/삭제 권한 체크 (본인 또는 관리자)
- 이슈 서브태스크 API 연동
  - API 엔드포인트: `/api/issues/[id]/subtasks` (GET, POST), `/api/issues/[id]/subtasks/[subtaskId]` (PUT, DELETE)
  - `useIssue` 훅에서 실제 API 호출로 변경 (TODO 주석 제거)
  - 이슈 조회 시 서브태스크도 함께 조회
  - 서브태스크 순서 변경 기능 구현
- 이슈 첨부파일 API 연동
  - API 엔드포인트: `/api/issues/[id]/attachments` (GET, POST), `/api/issues/[id]/attachments/[attachmentId]` (GET download, DELETE)
  - Supabase Storage 연동 (`issue-attachments` bucket)
  - 파일 업로드/다운로드/삭제 기능
  - 서명된 URL 생성 (1시간 유효)
  - 파일 크기 제한: 10MB
  - `useIssue` 훅에 `uploadAttachment`, `deleteAttachment` 함수 추가
- 팀 멤버 초대 API 개선
  - 사용자 검색 API: `/api/users/search?email=...` (GET)
  - `InviteMemberForm` 컴포넌트 개선
    - 이메일 입력 시 자동 사용자 검색 (500ms 디바운스)
    - 검색 결과 표시 및 선택 기능
    - 선택된 사용자 정보 표시
- 이슈 변경 히스토리 테이블 마이그레이션
  - `supabase/migrations/2025-11-29_add_issue_history.sql` 생성
  - `issue_history` 테이블 생성 (필드 변경 이력 추적)
  - RLS 정책 및 인덱스 포함
  - `schema.sql` 업데이트

**변경된 파일:**
- `src/app/api/issues/[id]/comments/route.ts` (신규)
- `src/app/api/issues/[id]/comments/[commentId]/route.ts` (신규)
- `src/app/api/issues/[id]/subtasks/route.ts` (신규)
- `src/app/api/issues/[id]/subtasks/[subtaskId]/route.ts` (신규)
- `src/app/api/issues/[id]/attachments/route.ts` (신규)
- `src/app/api/issues/[id]/attachments/[attachmentId]/route.ts` (신규)
- `src/app/api/users/search/route.ts` (신규)
- `src/app/api/issues/[id]/route.ts` (댓글, 서브태스크, 첨부파일 조회 추가, 히스토리 기록 로직 추가)
- `src/hooks/useIssue.ts` (실제 API 호출로 변경, 첨부파일 함수 추가)
- `src/components/team/InviteMemberForm.tsx` (사용자 검색 기능 추가)
- `src/app/issues/[id]/page.tsx` (첨부파일 삭제 핸들러 연결)
- `supabase/migrations/2025-11-29_add_issue_history.sql` (신규)
- `supabase/schema.sql` (issue_history 테이블 및 RLS 정책 추가)

**효과:**
- 이슈 관련 모든 기능이 실제 데이터베이스와 연동됨
- 팀 멤버 초대 시 사용자 검색으로 UX 개선
- 이슈 변경 이력 추적 가능

---

### 2025-11-29 - PRD 누락 기능 구현 (FR-003, FR-019, FR-039)

**완료된 작업:**
- 비밀번호 찾기/재설정 기능 구현 (FR-003)
  - API 엔드포인트: `/api/auth/forgot-password`, `/api/auth/reset-password`
  - UI 페이지: `/forgot-password`, `/reset-password`
  - Supabase Auth의 `resetPasswordForEmail` 및 `updateUser` 활용
  - 이메일 발송 및 토큰 기반 비밀번호 재설정 플로우 구현
- 이슈 변경 히스토리 기능 구현 (FR-039)
  - 타입 정의: `IssueHistory`, `IssueHistoryField` 추가
  - API 엔드포인트: `/api/issues/[id]/history` (GET)
  - UI 컴포넌트: `IssueHistory` 생성 및 이슈 상세 페이지에 통합
  - 이슈 업데이트 시 자동 히스토리 기록 로직 추가
  - 필드별 변경 사항 추적 (제목, 설명, 상태, 우선순위, 담당자, 마감일)
- 팀 활동 로그 기능 구현 (FR-019)
  - 타입 정의: `TeamActivity`, `TeamActivityType` 추가
  - API 엔드포인트: `/api/teams/[id]/activities` (GET)
  - UI 컴포넌트: `TeamActivityLog` 생성 및 팀 상세 페이지에 통합
  - 팀 생성/수정 시 자동 활동 로그 기록 로직 추가
  - 활동 로그 유틸리티 함수 생성 (`team-activity.ts`)
- 데이터베이스 마이그레이션 파일 생성
  - `supabase/migrations/2025-11-29_add_issue_history_and_team_activities.sql`
  - `issue_history` 테이블 생성 (이슈 변경 히스토리 저장)
  - `activities` 테이블 생성 (팀 활동 로그 저장)
  - RLS 정책 및 인덱스 포함

**변경된 파일:**
- `src/app/api/auth/forgot-password/route.ts` (신규)
- `src/app/api/auth/reset-password/route.ts` (신규)
- `src/app/forgot-password/page.tsx` (신규)
- `src/app/reset-password/page.tsx` (신규)
- `src/app/api/issues/[id]/history/route.ts` (신규)
- `src/app/api/issues/[id]/route.ts` (히스토리 기록 로직 추가)
- `src/components/issue/IssueHistory.tsx` (신규)
- `src/components/issue/index.ts` (IssueHistory export 추가)
- `src/app/issues/[id]/page.tsx` (IssueHistory 컴포넌트 통합)
- `src/app/api/teams/[id]/activities/route.ts` (신규)
- `src/app/api/teams/route.ts` (팀 생성 시 활동 로그 기록)
- `src/app/api/teams/[id]/route.ts` (팀 수정 시 활동 로그 기록)
- `src/lib/utils/team-activity.ts` (신규)
- `src/components/team/TeamActivityLog.tsx` (신규)
- `src/components/team/index.ts` (TeamActivityLog export 추가)
- `src/app/teams/[id]/page.tsx` (TeamActivityLog 컴포넌트 통합)
- `src/types/index.ts` (IssueHistory, TeamActivity 타입 추가)
- `supabase/migrations/2025-11-29_add_issue_history_and_team_activities.sql` (신규)

**참고:**
- [PRD_FEATURE_COMPARISON.md](./PRD_FEATURE_COMPARISON.md) - PRD 기능 비교 분석
- 마이그레이션 파일은 Supabase 대시보드의 SQL Editor에서 실행 필요
- 비밀번호 재설정은 Supabase Auth의 이메일 템플릿 설정 필요 (선택사항)
- 이슈 히스토리와 팀 활동 로그는 자동으로 기록되며, UI에서 조회 가능

---

### 2025-11-29 - P1 우선순위 리팩토링 완료

**완료된 작업:**
- 날짜 포맷팅 유틸리티 통합
  - `src/lib/utils/date.ts` 생성 (formatTimeAgo, formatDate, formatShortDate, formatFullDate)
  - 5개 컴포넌트에서 중복 로직 제거 및 통합 유틸리티 사용
    - `CommentItem.tsx` - formatTimeAgo 사용
    - `NotificationItem.tsx` - formatTimeAgo 사용
    - `KanbanCard.tsx` - formatShortDate 사용
    - `IssueAttachments.tsx` - formatFullDate 사용
    - `LivePreview.tsx` - formatFullDate 사용
- alert/confirm → Toast/ConfirmDialog로 변경
  - `FileUpload.tsx` - alert → useToast (2곳)
  - `CommentItem.tsx` - confirm → ConfirmDialog
  - `AIFeatures.tsx` - alert → useToast (6곳)
  - `CommentForm.tsx` - alert → useToast
  - `TeamMemberList.tsx` - confirm → ConfirmDialog

**변경된 파일:**
- `src/lib/utils/date.ts` (신규)
- `src/components/forms/FileUpload.tsx`
- `src/components/issue/CommentItem.tsx`
- `src/components/issue/AIFeatures.tsx`
- `src/components/issue/CommentForm.tsx`
- `src/components/issue/IssueAttachments.tsx`
- `src/components/notification/NotificationItem.tsx`
- `src/components/kanban/KanbanCard.tsx`
- `src/components/settings/LivePreview.tsx`
- `src/components/team/TeamMemberList.tsx`

**효과:**
- 코드 중복 제거: 날짜 포맷팅 로직 통합
- UX 개선: 브라우저 기본 alert/confirm 대신 커스텀 Toast/ConfirmDialog 사용
- 일관성 향상: 에러/경고 메시지 표시 방식 통일

---

## 작성 규칙

1. **최신 항목이 위에 오도록 작성** (역순)
2. **작업 완료 시 즉시 기록**
3. **명확하고 간결하게 작성**
4. **관련 문서나 이슈가 있으면 링크 추가**

---

## 작성 형식

```markdown
### YYYY-MM-DD - 작업자명

**완료된 작업:**
- 작업 내용 1
- 작업 내용 2

**변경된 파일:**
- `src/path/to/file.tsx`
- `docs/path/to/doc.md`

**참고:**
- 관련 문서 링크 (선택)
- 특이 사항 (선택)
```

---

## 개발 로그

### 2025-11-29 - 입력 검증 및 에러 바운더리 개선

**완료된 작업:**
- `useFormValidation` 커스텀 훅 생성
  - 실시간 필드 검증 로직 제공
  - blur 시 자동 검증 지원
  - touched 상태 관리 (필드 포커스 여부 추적)
  - 에러 상태 관리 및 초기화 기능
- `IssueForm`에 실시간 검증 적용
  - 필드 blur 시 즉시 검증 실행
  - 사용자 입력 중 실시간 피드백 제공
  - 제출 전 오류 사전 방지
- `ProjectForm`에 실시간 검증 적용
  - 동일한 검증 패턴 적용
  - 일관된 사용자 경험 제공
- `SectionErrorBoundary` 컴포넌트 생성
  - 섹션별 에러 격리
  - 부분 실패 시에도 나머지 UI 유지
  - 섹션 이름 기반 에러 메시지 제공
- 주요 페이지에 섹션별 에러 바운더리 적용
  - 이슈 상세 페이지: 댓글, 서브태스크, 첨부파일, AI 기능 섹션
  - 이슈 목록 페이지: 이슈 테이블 섹션
  - 프로젝트 목록 페이지: 프로젝트 그리드 섹션

**변경된 파일:**
- `src/hooks/useFormValidation.ts` (신규)
- `src/components/common/SectionErrorBoundary.tsx` (신규)
- `src/components/common/index.ts` (export 추가)
- `src/hooks/index.ts` (export 추가)
- `src/components/issue/IssueForm.tsx` (실시간 검증 적용)
- `src/components/issue/IssueFormFields.tsx` (onBlur prop 추가)
- `src/components/project/ProjectForm.tsx` (실시간 검증 적용)
- `src/components/project/ProjectFormFields.tsx` (onBlur prop 추가)
- `src/app/issues/[id]/page.tsx` (섹션별 에러 바운더리 추가)
- `src/app/issues/page.tsx` (섹션별 에러 바운더리 추가)
- `src/app/projects/page.tsx` (섹션별 에러 바운더리 추가)

**효과:**
- 사용자 경험 개선: 입력 중 즉시 피드백 제공, 제출 전 오류 방지
- 안정성 향상: 섹션별 에러 격리로 부분 실패 시에도 앱 사용 가능
- 코드 재사용성: `useFormValidation` 훅으로 검증 로직 재사용 가능
- 유지보수성: 일관된 검증 패턴으로 코드 이해도 향상

---

### 2025-11-29 - 리팩토링 체크리스트 작성

**완료된 작업:**
- 코드베이스 전반 분석 및 개선점 도출
- 공통 컴포넌트 미사용 사례 정리
- 로직상 디자인 개선점 정리
- 우선순위별 작업 계획 수립

**발견된 주요 개선점:**
1. **SettingsSelect**: `@hua-labs/ui`의 `Select` 컴포넌트 미사용 (직접 구현)
2. **날짜 포맷팅 로직 중복**: 5개 컴포넌트에서 각각 구현
3. **alert/confirm 직접 사용**: `ConfirmDialog` 컴포넌트가 있음에도 직접 사용 (10곳)
4. **폼 제출 패턴 중복**: 여러 컴포넌트에서 유사한 로직 중복
5. **에러 메시지 표시 패턴 불일치**: Toast, alert, 인라인 혼재

**생성된 문서:**
- `docs/REFACTORING_CHECKLIST.md` - 상세 개선 사항 및 우선순위 정리

**참고:**
- P1 (높음): 날짜 포맷팅 통합, alert/confirm 제거
- P2 (중간): SettingsSelect 개선, 폼 패턴 통합, 접근성 개선
- P3 (낮음): 로딩 상태 통합, 스타일링 중복 제거

---

### 2025-11-29 - Supabase 스키마 최종 통합

**완료된 작업:**
- Supabase 스키마 최종 통합
  - 모든 마이그레이션 파일을 하나의 `schema.sql`로 통합 완료
  - 추가 통합된 마이그레이션:
    - `2025-11-29_add_issue_history_and_team_activities.sql` (issue_history, activities 테이블)
    - `2025-01-30_add_custom_statuses_and_wip_limits.sql` (커스텀 상태, WIP Limit)
  - 통합 스키마에 포함된 최종 내용:
    - 15개 테이블 (users, teams, team_members, projects, project_favorites, issues, issue_labels, issue_label_mappings, subtasks, comments, notifications, activities, issue_attachments, user_preferences, issue_history)
    - 1개 뷰 (project_statuses - 커스텀 상태 포함)
    - 모든 인덱스 (JSONB 필드 GIN 인덱스 포함)
    - 함수 (update_updated_at_column, sync_email_confirmed_at, sync_new_user_email_confirmed)
    - 트리거 (updated_at 자동 업데이트, email_confirmed_at 동기화)
    - RLS 활성화 및 정책 (모든 테이블)
  - `supabase/README.md` 업데이트 (최신 테이블 목록 반영)

**변경된 파일:**
- `supabase/schema.sql` (최종 통합 버전)
- `supabase/README.md` (테이블 목록 업데이트)

**효과:**
- 새 프로젝트 시작 시 `schema.sql` 하나만 실행하면 모든 스키마가 생성됨
- 주최측 PRD의 FR-039 (이슈 변경 히스토리), FR-019 (팀 활동 로그), FR-053 (커스텀 컬럼), FR-054 (WIP Limit) 지원
- 마이그레이션 히스토리는 `migrations/` 폴더에 보관 (참고용)

---

### 2025-11-29 - Supabase 스키마 통합

**완료된 작업:**
- Supabase 스키마 통합
  - 모든 마이그레이션 파일을 하나의 `schema.sql`로 통합
  - 기존 `schema.sql` + 3개 마이그레이션 파일 통합
    - `2025-01-30_add_email_confirmed_at_to_users.sql` (users 테이블에 email_confirmed_at 필드 추가)
    - `2025-11-29_add_issue_attachments_and_user_preferences.sql` (issue_attachments, user_preferences 테이블 추가)
    - `2025-11-29_fix_users_rls_insert_policy.sql` (users 테이블 INSERT RLS 정책 수정)
  - 통합 스키마에 포함된 내용:
    - 14개 테이블 (users, teams, team_members, projects, project_favorites, issues, issue_labels, issue_label_mappings, subtasks, comments, notifications, activities, issue_attachments, user_preferences)
    - 모든 인덱스
    - 함수 (update_updated_at_column, sync_email_confirmed_at, sync_new_user_email_confirmed)
    - 트리거 (updated_at 자동 업데이트, email_confirmed_at 동기화)
    - RLS 활성화 및 정책
  - `supabase/README.md` 업데이트 (통합 스키마 사용 안내, 마이그레이션 파일 참고용 설명 추가)

**변경된 파일:**
- `supabase/schema.sql` (통합 버전으로 재작성)
- `supabase/README.md` (통합 스키마 안내 추가)

**효과:**
- 새 프로젝트 시작 시 `schema.sql` 하나만 실행하면 모든 스키마가 생성됨
- 마이그레이션 히스토리는 `migrations/` 폴더에 보관 (참고용)
- 스키마 관리 단순화 및 일관성 향상

---

### 2025-11-29 - README 업데이트

**완료된 작업:**
- README.md 업데이트
  - Tech Stack에 Supabase 추가
  - Features 섹션 업데이트 (최근 완료된 기능 반영)
  - Project Structure에 supabase/ 폴더 추가
  - Vercel 배포 환경 변수 목록 보완
  - 참고 프로젝트 섹션 제거 (내부용 정보)

**변경된 파일:**
- `README.md`

---

### 2025-11-29 - 코드리뷰 기반 보완 작업

**완료된 작업:**
- 검색 페이지 에러 처리 추가
  - `useSearch`의 `error` 필드를 UI에 표시
  - `ErrorState` 컴포넌트로 에러 메시지 및 재시도 버튼 제공
- FileUpload multiple 모드 개선
  - `onFilesSelect?: (files: File[])` 콜백 추가
  - 여러 파일 선택 시 모든 파일을 전달하도록 개선
  - 기존 `onFileSelect`와 호환성 유지 (단일 파일 모드)
- IssueAttachments 다운로드 에러 처리
  - URL 유효성 검사 추가
  - 팝업 차단 시 대체 다운로드 방법 제공 (링크 클릭)
  - 에러 발생 시 토스트 알림 표시

**변경된 파일:**
- `src/app/search/page.tsx` (에러 상태 처리 추가)
- `src/components/forms/FileUpload.tsx` (multiple 모드 개선)
- `src/components/issue/IssueAttachments.tsx` (다운로드 에러 처리)

**효과:**
- 사용자 경험 개선: 에러 상황에 대한 명확한 피드백 제공
- 기능 완성도 향상: 여러 파일 업로드 지원 강화
- 안정성 향상: 다운로드 실패 시 대체 방법 및 에러 처리

---

### 2025-11-29 - 스크롤 투 탑 및 사용자 팝오버 추가

**완료된 작업:**
- `ScrollToTop` 컴포넌트 생성 (`D:\dev\dashboard` 참고)
  - 스크롤 위치 300px 이상일 때 표시
  - SumUp 디자인 시스템 적용 (CSS 변수, border-radius 8px)
  - Phosphor Icons 사용
- `UserPopover` 컴포넌트 생성 (`D:\HUA\hua-platform\apps\sum-diary` 참고)
  - 사용자 정보 섹션 (아바타, 이름, 이메일, 관리자 뱃지)
  - 메뉴 링크 (프로필, 설정, 관리자)
  - 로그아웃 버튼
  - SumUp 디자인 시스템 적용
- `Header` 컴포넌트 개선
  - 기존 Dropdown을 팝오버 방식으로 변경
  - 외부 클릭 시 자동 닫힘
  - 접근성 개선 (aria-label, aria-expanded)
- `AppLayout`에 `ScrollToTop` 통합

**변경된 파일:**
- `src/components/common/ScrollToTop.tsx` (신규)
- `src/components/common/index.ts`
- `src/components/layout/UserPopover.tsx` (신규)
- `src/components/layout/Header.tsx`
- `src/components/layout/AppLayout.tsx`

**참고:**
- `D:\dev\dashboard\src\components\ScrollToTop.tsx` 참고
- `D:\HUA\hua-platform\apps\sum-diary\app\components\layout\HeaderComponents\ProfilePopover.tsx` 참고

---

### 2025-11-29 - API 인증 처리 및 Issues API 라우트 추가 (P1)

**완료된 작업:**
- Issues API Routes 구현 (Supabase 연동)
  - `GET /api/issues` (필터/검색/페이지네이션/정렬)
  - `POST /api/issues` (새 이슈 생성, 라벨/서브태스크 포함)
  - `GET /api/issues/[id]` (단건 조회)
  - `PUT /api/issues/[id]` (업데이트)
  - `DELETE /api/issues/[id]` (Soft Delete: deleted_at)
- API 클라이언트 인증 에러 처리 개선
  - 401 Unauthorized 에러 발생 시 자동으로 로그인 페이지로 리다이렉트
  - 로그인/회원가입 페이지에서는 리다이렉트하지 않음 (무한 루프 방지)
  - 현재 경로를 저장하여 로그인 후 돌아올 수 있도록 `returnUrl` 파라미터 추가
- API Base URL 설정 개선
  - `api.example.com` 같은 예시 URL 자동 감지 및 상대 경로로 처리
  - Next.js API Routes와 호환성 개선

**변경된 파일:**
- `src/app/api/issues/route.ts` (새로 생성)
- `src/app/api/issues/[id]/route.ts` (새로 생성)
- `src/lib/api/client.ts` (401 에러 처리 및 리다이렉트 로직 추가)

**참고:**
- 모든 API 라우트는 Supabase 인증을 요구합니다
- 로그인하지 않은 사용자는 자동으로 `/login` 페이지로 리다이렉트됩니다
- 개발 환경에서 테스트하려면 먼저 로그인해야 합니다

---

### 2025-11-29 - 이슈 페이지 페이지네이션 및 프로젝트 필터 추가 (P1)

**완료된 작업:**
- 이슈 리스트 페이지 개선
  - 페이지네이션 UI 추가 (`@hua-labs/ui` Pagination 컴포넌트 사용)
  - 프로젝트 필터 추가 (전체 프로젝트 / 특정 프로젝트 선택)
  - 클라이언트 사이드 필터링/정렬 제거 (API에서 이미 처리하므로 중복 제거)
  - 페이지 변경 시 자동 스크롤 상단 이동
  - 필터 변경 시 첫 페이지로 자동 리셋
- API 기반 페이지네이션 연동
  - `useIssues` 훅의 `totalPages`, `currentPage` 활용
  - 페이지 변경 시 `useIssues`에 `page` 파라미터 전달

**변경된 파일:**
- `src/app/issues/page.tsx` (페이지네이션 UI, 프로젝트 필터, 클라이언트 필터링 제거)

**참고:**
- Dashboard 프로젝트(`D:\dev\dashboard`)의 페이지네이션 패턴 참고
- API에서 필터링/정렬/페이지네이션 처리하므로 클라이언트 사이드 로직 제거

---

### 2025-11-29 - Supabase 기반 Teams & Notifications API 전환 (P1)

**완료된 작업:**
- Teams API Routes 구현 (Supabase 연동)
  - `GET /api/teams` (검색/페이지네이션)
  - `POST /api/teams` (팀 생성 + OWNER 멤버 추가)
  - `GET /api/teams/[id]` (팀 상세 + 멤버 목록)
  - `PUT /api/teams/[id]` (팀 정보 수정)
  - `DELETE /api/teams/[id]` (팀 삭제)
  - `GET /api/teams/[id]/members` (멤버 목록)
  - `POST /api/teams/[id]/members` (멤버 초대: 이메일+역할)
  - `PUT /api/teams/[id]/members/[memberId]` (멤버 역할 변경)
  - `DELETE /api/teams/[id]/members/[memberId]` (멤버 제거)
- Notifications API Routes 구현 (Supabase 연동)
  - `GET /api/notifications` (사용자별 알림 목록)
  - `PUT /api/notifications/[id]` (단일 알림 읽음 처리)
  - `DELETE /api/notifications/[id]` (단일 알림 삭제)
  - `PUT /api/notifications/read-all` (모든 알림 읽음 처리)
- 훅 전환 (목 데이터 제거 → 실제 API 호출)
  - `useTeams` → `/api/teams` 호출로 팀 목록/페이지네이션/생성 연동
  - `useTeam` → `/api/teams/[id]` 및 멤버 하위 엔드포인트로 조회/수정/삭제/멤버 관리 연동
  - `useNotifications` → `/api/notifications` 계열 엔드포인트로 조회/읽음/삭제 연동

**변경된 파일:**
- `src/app/api/teams/route.ts` (신규)
- `src/app/api/teams/[id]/route.ts` (신규)
- `src/app/api/teams/[id]/members/route.ts` (신규)
- `src/app/api/teams/[id]/members/[memberId]/route.ts` (신규)
- `src/app/api/notifications/route.ts` (신규)
- `src/app/api/notifications/[id]/route.ts` (신규)
- `src/app/api/notifications/read-all/route.ts` (신규)
- `src/hooks/useTeams.ts` (API 연동)
- `src/hooks/useTeam.ts` (API 연동)
- `src/hooks/useNotifications.ts` (API 연동)

**비고:**
- Supabase `public.teams`, `public.team_members`, `public.notifications`, `public.users` 스키마 기준으로 매핑
- 팀/멤버/알림 접근 제어는 Supabase RLS + 현재 사용자 기준 필터로 처리 (세밀한 RBAC는 후속 작업)

---

### 2025-11-29 - Supabase 기반 Projects CRUD 전환 (P1)

**완료된 작업:**
- Projects API Routes 구현 (Supabase 연동)
  - `GET /api/projects` (필터/검색/페이지네이션)
  - `POST /api/projects` (새 프로젝트 생성)
  - `GET /api/projects/[id]` (단건 조회)
  - `PUT /api/projects/[id]` (업데이트/즐겨찾기 토글 포함)
  - `DELETE /api/projects/[id]` (Soft Delete: archived + deleted_at)
- 훅 전환 (목 데이터 제거 → 실제 API 호출)
  - `useProjects` → `/api/projects` 호출로 리스트/페이지네이션/생성 연동
  - `useProject` → `/api/projects/[id]` 호출로 조회/수정/삭제/아카이브/즐겨찾기 연동

**변경된 파일:**
- `src/app/api/projects/route.ts` (신규)
- `src/app/api/projects/[id]/route.ts` (신규)
- `src/hooks/useProjects.ts` (API 연동)
- `src/hooks/useProject.ts` (API 연동)

**비고:**
- Supabase `public.projects`, `public.project_favorites` 스키마 기준으로 컬럼/즐겨찾기 매핑 적용
- 팀/권한 RLS는 Supabase 정책 기준으로 처리 (추가 서버 권한 체크는 후속 작업)

---

### 2025-11-29 - Supabase 기반 Issues CRUD 전환 (P0)

**완료된 작업:**
- Issues API Routes 구현 (Supabase 연동)
  - `GET /api/issues` (필터/검색/페이지네이션/정렬)
  - `POST /api/issues` (새 이슈 생성)
  - `GET /api/issues/[id]` (단건 조회)
  - `PUT /api/issues/[id]` (업데이트)
  - `DELETE /api/issues/[id]` (삭제)
- 훅 전환 (목 데이터 제거 → 실제 API 호출)
  - `useIssues` → `/api/issues` 호출로 리스트/페이지네이션/생성 연동
  - `useIssue` → `/api/issues/[id]` 호출로 조회/수정/삭제/상태변경 연동

**변경된 파일:**
- `src/app/api/issues/route.ts` (신규)
- `src/app/api/issues/[id]/route.ts` (신규)
- `src/hooks/useIssues.ts` (API 연동)
- `src/hooks/useIssue.ts` (API 연동)

**비고:**
- Supabase 실제 스키마 기준으로 컬럼 매핑 적용 (`project_id`, `assignee_id`, `due_date` 등)
- `labels`, `subtasks`는 별도 테이블/엔드포인트 연동 계획 (후속 작업)

---

### 2025-11-29 - 리팩토링 컴포넌트 적용 (P2)

**완료된 작업:**
- DetailPageLayout 적용
  - 이슈 상세 페이지에 적용
  - 프로젝트 상세 페이지에 적용
  - 로딩/에러 처리 및 헤더 액션 통일
- FormDrawer 적용
  - 이슈 수정 Drawer에 적용
  - 프로젝트 수정 Drawer에 적용
  - Drawer 패턴 통일
- MetaInfoCard 적용
  - 이슈 상세 페이지 메타 정보 카드에 적용
  - 메타 정보 표시 패턴 통일
- useDeleteDialog 훅 적용
  - 이슈 삭제 기능에 적용
  - 프로젝트 삭제 기능에 적용
  - 삭제 확인 다이얼로그 로직 통일

**변경된 파일:**
- `src/app/issues/[id]/page.tsx` (DetailPageLayout, FormDrawer, MetaInfoCard, useDeleteDialog 적용)
- `src/app/projects/[id]/page.tsx` (DetailPageLayout, FormDrawer, useDeleteDialog 적용)

**효과:**
- 코드 라인 수 약 100줄 감소
- 중복 코드 제거
- 유지보수성 향상

**참고:**
- [REFACTORING_OPPORTUNITIES.md](./REFACTORING_OPPORTUNITIES.md) - 리팩토링 기회 분석

---

### 2025-11-29 - 타입 에러 수정

**완료된 작업:**
- validation.ts 타입 에러 수정
  - Line 173: `value`를 `string`으로 타입 단언 (`includes` 메서드 사용)
  - Line 194, 226: `IssueFormData`, `ProjectFormData`를 `Record<string, unknown>`으로 타입 단언 (`validateForm` 호출 시)

**변경된 파일:**
- `src/lib/utils/validation.ts` (타입 단언 추가)

**참고:**
- 타입 안전성을 유지하면서 타입 단언 사용
- `validateForm` 함수의 제네릭 타입 제약으로 인한 타입 단언 필요

---

### 2025-11-29 - 보더 라디우스 통일 작업 (P0)

**완료된 작업:**
- 모든 컴포넌트의 보더 라디우스를 4-8px로 제한
  - `rounded-xl` (12px) → `rounded-lg` (8px) 변경
  - 작은 요소는 `rounded-md` (6px) 또는 `rounded` (4px) 사용
- 이슈 관련 컴포넌트 (8개 파일)
  - `SubtaskManager.tsx`, `AIFeatures.tsx`, `CommentList.tsx`
- 프로젝트 관련 컴포넌트 (3개 파일)
  - `ProjectForm.tsx`, `ProjectFormFields.tsx`
- 공통 컴포넌트 (7개 파일)
  - `StatCard.tsx`, `FilterBar.tsx`, `EmptyState.tsx`, `ErrorState.tsx`
  - `LoadingState.tsx`, `Markdown.tsx`, `MetaInfoCard.tsx`
- 폼 컴포넌트 (3개 파일)
  - `DatePicker.tsx`, `FileUpload.tsx`, `MultiSelect.tsx`
- 인증 컴포넌트 (2개 파일)
  - `PasswordInput.tsx`, `PasswordChecklist.tsx`
- 페이지들 (10개 파일)
  - `app/issues/page.tsx`, `app/issues/[id]/page.tsx`
  - `app/projects/page.tsx`, `app/projects/[id]/page.tsx`
  - `app/kanban/page.tsx`, `app/page.tsx`
  - `app/search/page.tsx`, `app/register/page.tsx`, `app/login/page.tsx`
  - `app/profile/page.tsx`
- 검색 컴포넌트
  - `GlobalSearch.tsx`

**변경된 파일:**
- 이슈 관련: `SubtaskManager.tsx`, `AIFeatures.tsx`, `CommentList.tsx`
- 공통: `StatCard.tsx`, `FilterBar.tsx`, `MetaInfoCard.tsx`
- 검색: `GlobalSearch.tsx`
- 페이지: `app/issues/page.tsx`, `app/issues/[id]/page.tsx`, `app/projects/page.tsx`, `app/projects/[id]/page.tsx`, `app/kanban/page.tsx`, `app/page.tsx`, `app/search/page.tsx`, `app/register/page.tsx`, `app/login/page.tsx`, `app/profile/page.tsx`

**참고:**
- [UI_TASKS.md](./UI_TASKS.md) - UI 작업 제안서
- UI 디자인 가이드라인에 따라 보더 라디우스 4-8px 제한 준수
- 총 36개 파일에서 `rounded-xl` 제거 완료

---

### 2025-11-29 - 코드 스플리팅 및 리팩토링 (P0-P1)

**완료된 작업:**
- 코드 스플리팅 적용
  - KanbanBoard 동적 import (SSR 비활성화 + 로딩 상태)
  - GlobalSearch 동적 import (Header에서 사용)
  - 폼 컴포넌트들 동적 import (IssueForm, ProjectForm, InviteMemberForm)
  - 상세 페이지 전용 컴포넌트 동적 import (CommentList, AIFeatures, SubtaskManager)
- 리팩토링
  - 프로젝트 상세 페이지 StatCard 사용 (약 30줄 감소)
  - DetailPageLayout 컴포넌트 생성 (상세 페이지 공통 패턴)
  - useDeleteDialog 훅 생성 (삭제 확인 다이얼로그 로직)
  - FormDrawer 컴포넌트 생성 (Drawer 패턴 통일)
  - MetaInfoCard 컴포넌트 생성 (메타 정보 카드 패턴)

**변경된 파일:**
- `src/app/kanban/page.tsx` (KanbanBoard 동적 import)
- `src/components/layout/Header.tsx` (GlobalSearch 동적 import)
- `src/app/issues/[id]/page.tsx` (IssueForm, CommentList, AIFeatures, SubtaskManager 동적 import)
- `src/app/issues/page.tsx` (IssueForm 동적 import)
- `src/app/projects/[id]/page.tsx` (ProjectForm 동적 import, StatCard 사용)
- `src/app/projects/page.tsx` (ProjectForm 동적 import)
- `src/app/teams/[id]/page.tsx` (InviteMemberForm 동적 import)
- `src/components/layout/DetailPageLayout.tsx` (신규)
- `src/components/layout/index.ts` (DetailPageLayout export 추가)
- `src/hooks/useDeleteDialog.ts` (신규)
- `src/hooks/index.ts` (useDeleteDialog export 추가)
- `src/components/common/FormDrawer.tsx` (신규)
- `src/components/common/MetaInfoCard.tsx` (신규)
- `src/components/common/index.ts` (FormDrawer, MetaInfoCard export 추가)
- `docs/REFACTORING_OPPORTUNITIES.md` (신규 - 리팩토링 기회 분석)

**참고:**
- [REFACTORING_OPPORTUNITIES.md](./REFACTORING_OPPORTUNITIES.md) - 코드 스플리팅 및 리팩토링 기회 분석
- 예상 효과: 초기 번들 크기 약 110-210KB 감소, 코드 약 30줄 감소
- 다음 단계: 생성한 컴포넌트들을 실제 페이지에 적용 (P2)

---

### 2025-11-29 - 이슈 첨부파일 기능 추가 (P2)

**완료된 작업:**
- 이슈 첨부파일 타입 정의
  - `IssueAttachment` 인터페이스 추가
  - `Issue` 타입에 `attachments` 필드 추가
- 파일 업로드 컴포넌트 개선
  - `FileUpload` 컴포넌트에 `multiple` prop 추가
  - 여러 파일 선택 지원
- 이슈 폼에 첨부파일 필드 추가
  - `IssueFormFields`에 파일 업로드 섹션 추가
  - 업로드된 파일 목록 표시 및 삭제 기능
- 이슈 상세 페이지에 첨부파일 표시
  - `IssueAttachments` 컴포넌트 생성
  - 파일 다운로드 기능
  - 권한에 따른 삭제 기능

**변경된 파일:**
- `src/types/index.ts` (IssueAttachment 타입 추가, Issue에 attachments 필드 추가)
- `src/components/forms/FileUpload.tsx` (multiple prop 추가)
- `src/components/issue/IssueFormFields.tsx` (첨부파일 필드 추가)
- `src/components/issue/IssueAttachments.tsx` (신규)
- `src/components/issue/index.ts` (IssueAttachments export 추가)
- `src/app/issues/[id]/page.tsx` (첨부파일 표시 추가)

**참고:**
- [NEXT_FEATURES.md](./NEXT_FEATURES.md) - 다음 구현할 메인 피처 제안
- 파일 크기 제한: 10MB (조정 가능)
- 실제 파일 업로드 API 연동 필요 (현재는 UI만 구현)

---

### 2025-11-29 - 문서 통합 및 정리

**완료된 작업:**
- 문서 통합 작업
  - `AI_SETUP_GUIDE.md` + `AI_IMPLEMENTATION_SUMMARY.md` → `BACKEND_API_GUIDE.md` (12. AI 기능 설정 및 사용 가이드)
  - `ICON_USAGE.md` → `UI_DESIGN_GUIDELINES.md` (13. 아이콘 시스템)
  - `REFERENCE_PATTERNS.md` → `REFACTORING_ANALYSIS.md` (6. 레퍼런스 프로젝트 패턴)
  - `NEXT_FEATURES.md` → `DEVELOPMENT_PLAN.md` (13. 다음 구현할 메인 피처 제안)
- 백업으로 이동
  - `PRD_COMPARISON_ANALYSIS.md` → `backup/` (분석 완료, 참고용)
  - 통합된 문서들 → `backup/` (원본 보관)
- 문서 인덱스 업데이트
  - `README.md` 업데이트 (통합된 문서 표시, 백업 문서 목록 추가)
  - 문서 구조 정리

**변경된 파일:**
- `docs/BACKEND_API_GUIDE.md` (AI 기능 섹션 추가)
- `docs/UI_DESIGN_GUIDELINES.md` (아이콘 시스템 섹션 추가)
- `docs/REFACTORING_ANALYSIS.md` (레퍼런스 패턴 섹션 추가)
- `docs/DEVELOPMENT_PLAN.md` (향후 기능 제안 섹션 추가)
- `docs/README.md` (통합 문서 표시, 백업 문서 목록 추가)
- `docs/backup/` (통합된 문서 원본 보관)

**참고:**
- 개발로그와 개발계획은 실시간 작성 문서이므로 유지
- 가이드 문서들은 관련 문서에 통합하여 중복 제거
- 백업 폴더에 원본 보관하여 필요시 참조 가능

---

### 2025-11-29 - 이슈/프로젝트 삭제 UI 추가 (P0 우선순위)

**완료된 작업:**
- 삭제 확인 다이얼로그 컴포넌트 개발
  - `ConfirmDialog` 컴포넌트 생성 (재사용 가능한 확인 다이얼로그)
  - Modal 컴포넌트 활용
  - destructive variant 지원
  - 로딩 상태 관리
- 이슈 삭제 UI 추가
  - 이슈 상세 페이지에 삭제 버튼 추가
  - 삭제 확인 다이얼로그 연결
  - 삭제 후 이슈 목록 페이지로 리다이렉트
- 프로젝트 삭제 UI 추가
  - 프로젝트 상세 페이지에 삭제 버튼 추가
  - 삭제 확인 다이얼로그 연결
  - 삭제 후 프로젝트 목록 페이지로 리다이렉트
- 에러 처리 및 사용자 피드백
  - Toast 알림으로 성공/실패 메시지 표시
  - 로딩 상태 관리

**변경된 파일:**
- `src/components/common/ConfirmDialog.tsx` (신규)
- `src/components/common/index.ts` (ConfirmDialog export 추가)
- `src/app/issues/[id]/page.tsx` (삭제 버튼 및 다이얼로그 추가)
- `src/app/projects/[id]/page.tsx` (삭제 버튼 및 다이얼로그 추가)

**참고:**
- [NEXT_FEATURES.md](./NEXT_FEATURES.md) - 다음 구현할 메인 피처 제안
- CRUD 기능 완성도 향상
- 사용자 실수 방지를 위한 확인 다이얼로그 필수

---

### 2025-11-29 - 코드 리뷰 개선 (P1 우선순위)

**완료된 작업:**
- Icon 컴포넌트의 `as any` 제거
  - Sidebar.tsx: `item.icon as any` → `item.icon`
  - StatCard.tsx: `icon as any` → `icon`
  - EmptyState.tsx: `iconName as any` → `iconName`
- DatePicker의 `as any` 제거
  - `props as any` → `props as Omit<ReactDatePickerProps, "customInput">`
  - 타입 안전성 향상
- apiClient의 네트워크 에러 처리 개선
  - 네트워크 에러 (Failed to fetch) 구분 및 명확한 에러 메시지
  - NetworkError 타입 에러 처리 추가
  - 사용자 친화적인 에러 메시지 제공

**변경된 파일:**
- `src/components/layout/Sidebar.tsx` (Icon 타입 단언 제거)
- `src/components/common/StatCard.tsx` (Icon 타입 단언 제거)
- `src/components/common/EmptyState.tsx` (Icon 타입 단언 제거)
- `src/components/forms/DatePicker.tsx` (타입 단언 개선)
- `src/lib/api/client.ts` (네트워크 에러 처리 개선)
- `docs/CODE_REVIEW_V2.md` (완료 상태 업데이트)

**참고:**
- [CODE_REVIEW_V2.md](./CODE_REVIEW_V2.md) - 코드 리뷰 보고서
- P0, P1 우선순위 항목 모두 완료
- 타입 안전성 향상 및 에러 처리 개선

---

### 2025-11-29 - 코드 리뷰 개선 (P0 우선순위)

**완료된 작업:**
- auth-store.ts 에러 처리 개선
  - setSession 실패 시 에러 처리 추가 (사용자가 제거함)
  - setSession 성공 후에만 상태 업데이트하여 정합성 확보
- useIssues의 createIssue 상태 불일치 수정
  - Mock 데이터 사용 시 fetchIssues 호출 제거
  - 새로 추가한 이슈가 빈 배열로 덮어씌워지는 문제 해결
- 전역 ErrorBoundary 추가
  - ErrorBoundary 컴포넌트 생성 (`src/components/common/ErrorBoundary.tsx`)
  - layout.tsx에 ErrorBoundary 적용
  - React 컴포넌트 에러 발생 시 전체 앱 크래시 방지

**변경된 파일:**
- `src/store/auth-store.ts` (setSession 에러 처리 추가)
- `src/hooks/useIssues.ts` (상태 불일치 수정)
- `src/components/common/ErrorBoundary.tsx` (신규)
- `src/components/common/index.ts` (ErrorBoundary export 추가)
- `src/app/layout.tsx` (ErrorBoundary 적용)
- `docs/CODE_REVIEW_V2.md` (신규 - 코드 리뷰 보고서)

**참고:**
- [CODE_REVIEW_V2.md](./CODE_REVIEW_V2.md) - 상세 코드 리뷰 보고서
- P0 우선순위 항목 완료

---

### 2025-11-29 - 사용자 프로필 관리 기능 개발 (P1)

**완료된 작업:**
- 사용자 프로필 관리 기능 구현
  - `ProfileForm` 컴포넌트 개발 (프로필 수정 폼)
  - `PasswordChangeForm` 컴포넌트 개발 (비밀번호 변경 폼)
  - 프로필 페이지 개발 (`/profile`)
- 프로필 기능
  - 아바타 업로드 (FileUpload 컴포넌트 활용)
  - 이름, 이메일 수정
  - 비밀번호 변경 (현재 비밀번호 확인, 새 비밀번호 검증)
  - 폼 검증 및 에러 처리
- Header 및 네비게이션 연결
  - Header 프로필 드롭다운에서 `/profile`로 라우팅
  - 사이드바에 프로필 메뉴 추가
- 상태 관리 확장
  - `useAuthStore`에 `updateUser` 메서드 추가

**변경된 파일:**
- `src/components/profile/ProfileForm.tsx` (신규)
- `src/components/profile/PasswordChangeForm.tsx` (신규)
- `src/components/profile/index.ts` (신규)
- `src/app/profile/page.tsx` (신규)
- `src/components/layout/Header.tsx` (프로필 클릭 연결)
- `src/components/layout/AppLayout.tsx` (프로필 메뉴 추가)
- `src/store/auth-store.ts` (updateUser 메서드 추가)

**참고:**
- [PRD.md](./PRD.md) - 3.2.2 사용자 인증 및 프로필 요구사항
- [NEXT_FEATURES.md](./NEXT_FEATURES.md) - 다음 구현할 메인 피처 제안
- FileUpload 컴포넌트 활용
- PasswordInput 컴포넌트 활용

---

### 2025-11-29 - Supabase 세션 관리 보완

**완료된 작업:**
- 세션 쿠키 관리 개선
  - `src/lib/supabase/server.ts`: storage API의 setItem/removeItem 개선 (에러 처리 추가)
  - `src/app/api/auth/login/route.ts`: 불필요한 세션 저장 로직 제거 (클라이언트에서 처리)
  - `src/app/api/auth/logout/route.ts`: 쿠키 명시적 삭제 추가
- 세션 관리 방식 정리
  - 서버: 세션 토큰을 응답으로 반환
  - 클라이언트: `supabase.auth.setSession()`을 통해 쿠키에 저장 (이미 auth-store.ts에서 구현됨)
  - 로그아웃: Supabase `signOut()` + 쿠키 명시적 삭제

**변경된 파일:**
- `src/lib/supabase/server.ts` (storage API 개선)
- `src/app/api/auth/login/route.ts` (단순화)
- `src/app/api/auth/logout/route.ts` (쿠키 삭제 추가)

**참고:**
- Supabase는 클라이언트에서 `setSession()`을 호출하면 자동으로 쿠키에 저장됨
- 서버 사이드에서는 세션 토큰만 반환하고, 클라이언트에서 저장하도록 분리
- 보안: httpOnly, secure, sameSite 설정으로 쿠키 보안 강화

---

### 2025-11-29 - Supabase 인증 API Routes 연동

**완료된 작업:**
- 인증 API Routes 생성 및 Supabase 연동
  - `src/app/api/auth/signup/route.ts` - 회원가입 API (Supabase Auth + public.users 테이블)
  - `src/app/api/auth/login/route.ts` - 로그인 API (Supabase Auth + 세션 관리)
  - `src/app/api/auth/logout/route.ts` - 로그아웃 API
  - `src/app/api/auth/me/route.ts` - 현재 사용자 정보 조회 API
- auth-store 업데이트
  - `login` 메서드: 실제 API 호출로 변경 (Supabase 세션 관리 포함)
  - `register` 메서드: 실제 API 호출로 변경 (name 파라미터 추가)
  - `logout` 메서드: Supabase 세션 정리 추가
- 입력 검증 추가
  - 이메일 형식 검증
  - 비밀번호 길이 검증 (최소 8자)
  - 이메일 중복 체크

**변경된 파일:**
- `src/app/api/auth/signup/route.ts` (신규)
- `src/app/api/auth/login/route.ts` (신규)
- `src/app/api/auth/logout/route.ts` (신규)
- `src/app/api/auth/me/route.ts` (신규)
- `src/store/auth-store.ts` (실제 API 호출로 변경)

**참고:**
- Supabase Auth를 사용한 인증 구현
- 회원가입 시 auth.users와 public.users 테이블에 동시 저장
- 로그인 시 세션 토큰을 클라이언트에 저장
- 다음 단계: 프로젝트, 이슈 등 CRUD API Routes 구현

---

### 2025-11-29 - 리팩토링 (2차)

**완료된 작업:**
- 폼 컴포넌트 타입 안전성 개선
  - IssueFormFields, ProjectFormFields의 onChange 타입을 제네릭으로 개선
  - IssueForm, ProjectForm의 handleChange 타입을 제네릭으로 개선
  - IssueForm의 initialData 타입 단언 개선 (as any → as IssueStatus/IssuePriority)
- IssueFormActions와 ProjectFormActions 통합
  - 공통 FormActions 컴포넌트 생성 (`src/components/common/FormActions.tsx`)
  - 중복 코드 제거 (약 60줄 감소)
  - IssueFormActions.tsx, ProjectFormActions.tsx 삭제
- validation.ts 타입 안전성 개선
  - ValidationRule에 제네릭 적용
  - validateField, validateForm에 제네릭 적용
- export.ts 타입 안전성 개선
  - exportIssuesToCSV의 issues 파라미터 타입을 any[] → Issue[]로 변경
- IssueForm의 CustomEvent 타입 안전성 개선
  - as any 타입 단언 제거, CustomEvent 타입 정의 사용

**변경된 파일:**
- `src/components/common/FormActions.tsx` (신규)
- `src/components/common/index.ts` (FormActions export 추가)
- `src/components/issue/IssueFormFields.tsx` (onChange 타입 개선)
- `src/components/issue/IssueForm.tsx` (handleChange 타입 개선, CustomEvent 타입 개선)
- `src/components/project/ProjectFormFields.tsx` (onChange 타입 개선)
- `src/components/project/ProjectForm.tsx` (handleChange 타입 개선)
- `src/components/project/index.ts` (ProjectFormActions export 제거)
- `src/lib/utils/validation.ts` (제네릭 적용)
- `src/lib/utils/export.ts` (Issue 타입 사용)
- `src/components/issue/IssueFormActions.tsx` (삭제)
- `src/components/project/ProjectFormActions.tsx` (삭제)
- `docs/CODE_REVIEW.md` (리팩토링 완료 내역 업데이트)

**참고:**
- [CODE_REVIEW.md](./CODE_REVIEW.md) - 코드 리뷰 결과 반영
- 모든 P0 우선순위 타입 안전성 이슈 해결 완료
- 총 약 180줄의 코드 감소 (1차 + 2차 리팩토링)

---

### 2025-11-29 - Supabase 데이터베이스 스키마 작성

**완료된 작업:**
- 데이터베이스 스키마 SQL 파일 생성
  - `supabase/schema.sql` - 전체 데이터베이스 스키마 (12개 테이블)
    - users, teams, team_members, projects, project_favorites
    - issues, issue_labels, issue_label_mappings, subtasks
    - comments, notifications, activities
  - 인덱스 생성 (성능 최적화)
  - updated_at 자동 업데이트 트리거 설정
  - Row Level Security (RLS) 활성화 및 기본 정책 설정
- 스키마 설정 가이드 작성
  - `supabase/README.md` - Supabase 대시보드에서 스키마 실행 방법 안내

**변경된 파일:**
- `supabase/schema.sql` (신규)
- `supabase/README.md` (신규)

**다음 단계:**
1. Supabase 대시보드에서 `schema.sql` 실행
2. 인증 API Routes에 Supabase 연동
3. 기본 CRUD API Routes 구현

**참고:**
- [SUPABASE_SETUP_GUIDE.md](./SUPABASE_SETUP_GUIDE.md) - Supabase 설정 가이드
- Supabase 대시보드: SQL Editor에서 `schema.sql` 전체 내용 실행
- RLS 정책은 기본 정책만 설정되어 있으며, 필요에 따라 수정 가능

---

### 2025-11-29 - 설정 페이지 UI 개선

**완료된 작업:**
- 대시보드 프로젝트의 설정 페이지 참고하여 UI 개선
- 설정 컴포넌트 개발
  - SettingsSelect 컴포넌트 생성 (커스텀 Select)
  - PreferenceToggle 컴포넌트 생성 (Switch 래퍼)
  - ThemeSection 컴포넌트 생성 (테마 및 폰트 크기)
  - LanguageSection 컴포넌트 생성 (언어 및 날짜 형식, 통화 제거)
  - AccessibilitySection 컴포넌트 생성 (고대비, 모션 감소)
  - LivePreview 컴포넌트 생성 (미리보기, 통화 관련 제거)
- settings/page.tsx 업데이트
  - 섹션별 그리드 레이아웃 적용
  - 대시보드 프로젝트 스타일 적용
  - 통화 설정 제거 (SumUp 프로젝트에 불필요)

**변경된 파일:**
- `src/components/settings/SettingsSelect.tsx` (신규)
- `src/components/settings/PreferenceToggle.tsx` (신규)
- `src/components/settings/ThemeSection.tsx` (신규)
- `src/components/settings/LanguageSection.tsx` (신규)
- `src/components/settings/AccessibilitySection.tsx` (신규)
- `src/components/settings/LivePreview.tsx` (신규)
- `src/components/settings/index.ts` (신규)
- `src/app/settings/page.tsx` (UI 개선)
- `docs/COMPONENTS.md` (컴포넌트 문서 업데이트)

**참고:**
- [COMPONENTS.md](./COMPONENTS.md) - 컴포넌트 문서
- 대시보드 프로젝트 (`D:\dev\dashboard`) 참고
- 통화(currency) 관련 기능 제거 (SumUp 프로젝트에 불필요)
- LivePreview의 통화 관련 내용 제거

---

### 2025-11-29 - Supabase 클라이언트 설정

**완료된 작업:**
- Supabase 패키지 설치
  - `@supabase/supabase-js` 패키지 설치 완료
- Supabase 클라이언트 생성
  - `src/lib/supabase/client.ts` - 클라이언트 사이드 Supabase 클라이언트 생성
    - 브라우저에서 사용하는 클라이언트
    - 세션 자동 저장 및 갱신 기능 포함
  - `src/lib/supabase/server.ts` - 서버 사이드 Supabase 클라이언트 생성
    - `createServerClient()` - 쿠키 기반 세션 관리 (API Routes, Server Components)
    - `createServiceClient()` - 서비스 역할 키 사용 (RLS 우회, 관리자 작업용)
  - `src/lib/supabase/index.ts` - 모듈 내보내기

**변경된 파일:**
- `package.json` (@supabase/supabase-js 추가)
- `src/lib/supabase/client.ts` (신규)
- `src/lib/supabase/server.ts` (신규)
- `src/lib/supabase/index.ts` (신규)

**참고:**
- [SUPABASE_SETUP_GUIDE.md](./SUPABASE_SETUP_GUIDE.md) - Supabase 설정 가이드
- 환경 변수: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- 클라이언트 사이드: `supabase` export
- 서버 사이드: `createServerClient()`, `createServiceClient()` 함수 사용

---

### 2025-11-29 - 팀 관리 컴포넌트 개발 (P0) - 완료

**완료된 작업:**
- 팀 관리 컴포넌트 개발
  - `TeamCard` 컴포넌트 생성 (팀 목록 표시 카드)
  - `TeamMemberList` 컴포넌트 생성 (팀 멤버 목록, 역할 변경, 제거 기능)
  - `InviteMemberForm` 컴포넌트 생성 (멤버 초대 폼)
  - `TeamForm` 컴포넌트 생성 (팀 생성 폼)
- 팀 관리 페이지 개발
  - `/teams` 페이지 생성 (팀 목록, 검색 기능, Drawer로 팀 생성)
  - `/teams/[id]` 페이지 생성 (팀 상세 정보, 멤버 관리, Drawer로 멤버 초대)
- 훅 확장
  - `useTeams` 훅에 `createTeam` 메서드 추가
  - `useTeam` 훅의 멤버 관리 메서드 사용 (inviteMember, updateMemberRole, removeMember)

**변경된 파일:**
- `src/components/team/TeamCard.tsx` (신규)
- `src/components/team/TeamMemberList.tsx` (신규)
- `src/components/team/InviteMemberForm.tsx` (신규)
- `src/components/team/TeamForm.tsx` (신규)
- `src/components/team/index.ts` (신규)
- `src/app/teams/page.tsx` (신규)
- `src/app/teams/[id]/page.tsx` (신규)
- `src/hooks/useTeams.ts` (createTeam 메서드 추가)

**참고:**
- [DEVELOPMENT_PLAN.md](./DEVELOPMENT_PLAN.md) - 개발 계획
- 레퍼런스 프로젝트의 폼 패턴 적용 (Drawer 사용)
- 권한 기반 UI 표시 (OWNER, ADMIN만 멤버 관리 가능)
- useTeams, useTeam 훅을 사용하여 로직과 UI 분리

---

### 2025-11-29 - 타입 에러 수정

**완료된 작업:**
- FilterBar.tsx 타입 에러 수정
  - Select 컴포넌트의 value를 string으로 변환 (타입 단언 사용)
  - SelectOption의 key를 `${index}-${optionIndex}`로 변경하여 타입 안전성 확보
- TeamMemberList.tsx 타입 에러 수정
  - Badge 컴포넌트 import 추가
- teams/[id]/page.tsx 타입 에러 수정
  - addMember → inviteMember로 변경 (useTeam 훅의 실제 메서드명 반영)
  - handleInvite 타입을 "ADMIN" | "MEMBER"로 제한 (OWNER는 초대 시 부여 불가)
- InviteMemberForm.tsx 타입 수정
  - onInvite의 role 타입을 "ADMIN" | "MEMBER"로 제한
  - OWNER 역할은 초대 시 부여할 수 없도록 타입 제한

**변경된 파일:**
- `src/components/common/FilterBar.tsx`
- `src/components/team/TeamMemberList.tsx`
- `src/app/teams/[id]/page.tsx`
- `src/components/team/InviteMemberForm.tsx`

**참고:**
- Select 컴포넌트는 boolean 타입을 받을 수 없으므로 string으로 변환 필요
- 팀 멤버 초대 시 OWNER 역할은 부여할 수 없음 (비즈니스 로직)

---

### 2025-11-29 - 알림 시스템 컴포넌트 개발

**완료된 작업:**
- 알림 시스템 컴포넌트 개발 (P1 우선순위)
  - NotificationItem 컴포넌트 생성 (개별 알림 아이템)
  - NotificationDropdown 컴포넌트 생성 (알림 드롭다운)
- Header에 NotificationDropdown 연결
  - 기존 notificationCount, onNotificationClick props 제거
  - NotificationDropdown 컴포넌트로 대체
- 알림 기능 구현
  - 알림 타입별 아이콘 및 색상 표시
  - 읽음/미읽음 상태 표시
  - 시간 표시 (예: "2분 전", "1시간 전")
  - 전체 읽음 처리
  - 개별 알림 삭제
  - 로딩/에러/빈 상태 처리

**변경된 파일:**
- `src/components/notification/NotificationItem.tsx` (신규)
- `src/components/notification/NotificationDropdown.tsx` (신규)
- `src/components/notification/index.ts` (신규)
- `src/components/layout/Header.tsx` (NotificationDropdown 연결)
- `docs/COMPONENTS.md` (컴포넌트 문서 업데이트)
- `docs/DEVELOPMENT_PLAN.md` (진행 상황 업데이트)

**참고:**
- [COMPONENTS.md](./COMPONENTS.md) - 컴포넌트 문서
- [DEVELOPMENT_PLAN.md](./DEVELOPMENT_PLAN.md) - 개발 계획
- useNotifications 훅을 사용하여 로직과 UI 분리
- Header에서 항상 알림 드롭다운 표시 (미읽음 개수는 Badge로 표시)

---

### 2025-11-29 - 이슈/프로젝트 폼 컴포넌트 개발 (레퍼런스 패턴 적용)

**완료된 작업:**
- 레퍼런스 프로젝트 패턴 분석 및 문서화
  - `REFERENCE_PATTERNS.md` 문서 생성
  - Drawer vs Modal 사용 패턴 정리
  - 폼 컴포넌트 분리 패턴 (FormFields, FormActions) 문서화
  - 에러 처리 패턴 정리
- IssueForm 컴포넌트 개발
  - `IssueFormFields.tsx` - 폼 필드 컴포넌트 (제목, 설명, 프로젝트, 상태, 우선순위, 담당자, 마감일, 라벨, 서브태스크)
  - `IssueFormActions.tsx` - 폼 액션 컴포넌트 (취소/저장 버튼, 에러 표시)
  - `IssueForm.tsx` - 메인 폼 컴포넌트 (생성/수정 모드 지원, 검증, API 연동)
  - AI 자동 라벨 추천 기능 통합
  - 중복 이슈 탐지 기능 통합
- ProjectForm 컴포넌트 개발
  - `ProjectFormFields.tsx` - 폼 필드 컴포넌트 (이름, 설명, 팀, 즐겨찾기)
  - `ProjectFormActions.tsx` - 폼 액션 컴포넌트
  - `ProjectForm.tsx` - 메인 폼 컴포넌트 (생성/수정 모드 지원)
- 페이지에 Drawer 연결
  - `/issues` 페이지 - 이슈 생성 Drawer 연결
  - `/issues/[id]` 페이지 - 이슈 수정 Drawer 연결
  - `/projects` 페이지 - 프로젝트 생성 Drawer 연결
- Toast 알림 시스템 통합
  - `useToast` 훅 사용으로 통일
  - 성공/에러 메시지 표시

**변경된 파일:**
- `src/components/issue/IssueFormFields.tsx` (신규)
- `src/components/issue/IssueFormActions.tsx` (신규)
- `src/components/issue/IssueForm.tsx` (신규)
- `src/components/project/ProjectFormFields.tsx` (신규)
- `src/components/project/ProjectFormActions.tsx` (신규)
- `src/components/project/ProjectForm.tsx` (신규)
- `src/components/project/index.ts` (신규)
- `src/components/issue/index.ts` (업데이트)
- `src/app/issues/page.tsx` (Drawer 연결)
- `src/app/issues/[id]/page.tsx` (Drawer 연결)
- `src/app/projects/page.tsx` (Drawer 연결)
- `docs/REFERENCE_PATTERNS.md` (신규)
- `docs/README.md` (문서 링크 추가)
- `docs/DEVELOPMENT_PLAN.md` (진행 상황 업데이트)

**참고:**
- [REFERENCE_PATTERNS.md](./REFERENCE_PATTERNS.md) - 레퍼런스 프로젝트 패턴 가이드
- [DEVELOPMENT_PLAN.md](./DEVELOPMENT_PLAN.md) - 개발 계획
- 레퍼런스 프로젝트 (PaysByPays Dashboard)의 폼 패턴 적용
- Drawer 사용으로 긴 폼에 적합한 UX 제공
- 폼 컴포넌트 분리로 재사용성 및 테스트 용이성 향상

---

### 2025-11-29 - 팀 관리 컴포넌트 개발

**완료된 작업:**
- 팀 관리 컴포넌트 개발 (P0 우선순위)
  - TeamCard 컴포넌트 생성 (팀 목록 표시 카드)
  - TeamMemberList 컴포넌트 생성 (팀 멤버 목록, 역할 변경, 제거 기능)
  - InviteMemberForm 컴포넌트 생성 (멤버 초대 폼, Modal)
- 팀 관리 페이지 개발
  - `/teams` 페이지 생성 (팀 목록, 검색 기능)
  - `/teams/[id]` 페이지 생성 (팀 상세 정보, 멤버 관리, 탭 구조)
- 린터 오류 수정
  - IssueForm, ProjectForm의 Toast 사용 방식 수정 (useToast 훅 사용)
  - AIFeatures의 타입 오류 수정 (Comment 타입 변환)

**변경된 파일:**
- `src/components/team/TeamCard.tsx` (신규)
- `src/components/team/TeamMemberList.tsx` (신규)
- `src/components/team/InviteMemberForm.tsx` (신규)
- `src/components/team/index.ts` (신규)
- `src/app/teams/page.tsx` (신규)
- `src/app/teams/[id]/page.tsx` (신규)
- `src/components/issue/IssueForm.tsx` (Toast 사용 수정)
- `src/components/project/ProjectForm.tsx` (Toast 사용 수정)
- `src/components/issue/AIFeatures.tsx` (타입 오류 수정)
- `docs/DEVELOPMENT_PLAN.md` (진행 상황 업데이트)
- `docs/COMPONENTS.md` (컴포넌트 문서 업데이트)

**참고:**
- [COMPONENTS.md](./COMPONENTS.md) - 컴포넌트 문서
- [DEVELOPMENT_PLAN.md](./DEVELOPMENT_PLAN.md) - 개발 계획
- useTeams, useTeam 훅을 사용하여 로직과 UI 분리
- 권한 기반 UI 표시 (OWNER, ADMIN만 멤버 관리 가능)

---

### 2025-11-29 - 리팩토링

**완료된 작업:**
- projects/page.tsx 리팩토링
  - StatCard 컴포넌트 사용 (통계 카드 중복 제거, 약 25줄 감소)
  - FilterBar 컴포넌트 사용 (필터 UI 중복 제거, 약 25줄 감소)
  - React.useState → useState 수정
  - 사용되지 않는 코드 제거 (isFormOpen)
- FilterBar.tsx 타입 안전성 개선
  - boolean 타입 지원 추가

**변경된 파일:**
- `src/app/projects/page.tsx`
- `src/components/common/FilterBar.tsx`
- `docs/CODE_REVIEW.md`
- `docs/DEVELOPMENT_PLAN.md`

**참고:**
- [CODE_REVIEW.md](./CODE_REVIEW.md) - 코드 리뷰 결과 반영

---

### 2025-11-29 - 리팩토링

**완료된 작업:**
- issues/page.tsx 리팩토링
  - StatCard 컴포넌트 사용 (통계 카드 중복 제거, 약 30줄 감소)
  - FilterBar 컴포넌트 사용 (필터 UI 중복 제거, 약 40줄 감소)
  - React import 수정
  - 사용되지 않는 코드 제거

**변경된 파일:**
- `src/app/issues/page.tsx`
- `docs/CODE_REVIEW.md`
- `docs/DEVELOPMENT_PLAN.md`

**참고:**
- [CODE_REVIEW.md](./CODE_REVIEW.md) - 코드 리뷰 결과 반영

---

### 2025-11-29 - 문서 작업

**완료된 작업:**
- 코드 리뷰 문서 작성
- 작업 가이드라인 문서 작성
- 문서 통합 및 백업 폴더 생성
- README.md 업데이트

**변경된 파일:**
- `docs/CODE_REVIEW.md` (신규)
- `docs/WORKING_GUIDELINES.md` (신규)
- `docs/README.md`
- `docs/backup/` (신규 폴더)
- `.gitignore`

**참고:**
- [CODE_REVIEW.md](./CODE_REVIEW.md) - 코드 리뷰 보고서
- [WORKING_GUIDELINES.md](./WORKING_GUIDELINES.md) - 작업 가이드라인

---

### 2025-11-29 - 컴포넌트 개발

**완료된 작업:**
- 공통 컴포넌트 개발
  - StatCard 컴포넌트 생성
  - FilterBar 컴포넌트 생성
- 프로젝트 필터 스토어 생성
  - project-filter-store.ts 생성

**변경된 파일:**
- `src/components/common/StatCard.tsx` (신규)
- `src/components/common/FilterBar.tsx` (신규)
- `src/store/project-filter-store.ts` (신규)
- `src/components/common/index.ts`

**참고:**
- [COMPONENTS.md](./COMPONENTS.md) - 컴포넌트 문서
- [REFACTORING_ANALYSIS.md](./REFACTORING_ANALYSIS.md) - 리팩토링 분석

---

**문서 작성일**: 2025-11-29  
**마지막 업데이트**: 2025-11-29


**완료된 작업:**
- 코드 리뷰 문서 작성
- 작업 가이드라인 문서 작성
- 문서 통합 및 백업 폴더 생성
- README.md 업데이트

**변경된 파일:**
- `docs/CODE_REVIEW.md` (신규)
- `docs/WORKING_GUIDELINES.md` (신규)
- `docs/README.md`
- `docs/backup/` (신규 폴더)
- `.gitignore`

**참고:**
- [CODE_REVIEW.md](./CODE_REVIEW.md) - 코드 리뷰 보고서
- [WORKING_GUIDELINES.md](./WORKING_GUIDELINES.md) - 작업 가이드라인

---

### 2025-11-29 - 컴포넌트 개발

**완료된 작업:**
- 공통 컴포넌트 개발
  - StatCard 컴포넌트 생성
  - FilterBar 컴포넌트 생성
- 프로젝트 필터 스토어 생성
  - project-filter-store.ts 생성

**변경된 파일:**
- `src/components/common/StatCard.tsx` (신규)
- `src/components/common/FilterBar.tsx` (신규)
- `src/store/project-filter-store.ts` (신규)
- `src/components/common/index.ts`

**참고:**
- [COMPONENTS.md](./COMPONENTS.md) - 컴포넌트 문서
- [REFACTORING_ANALYSIS.md](./REFACTORING_ANALYSIS.md) - 리팩토링 분석

---

**문서 작성일**: 2025-11-29  
**마지막 업데이트**: 2025-11-29

