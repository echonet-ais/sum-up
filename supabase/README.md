# Supabase 스키마 및 시드 데이터 가이드

## ✅ 스키마 통합 완료

**중요:** `schema.sql`은 모든 마이그레이션을 통합한 최신 버전입니다.  
새로운 Supabase 프로젝트를 시작할 때는 이 파일 하나만 실행하면 됩니다.

**통합된 마이그레이션:**
- ✅ `2025-01-30_add_email_confirmed_at_to_users.sql`
- ✅ `2025-11-29_add_custom_statuses_and_wip_limits.sql` (custom_statuses, project_wip_limits 테이블)
- ✅ `2025-11-29_add_issue_history_and_team_activities.sql` (issue_history, activities 테이블)
- ✅ `2025-11-29_add_issue_attachments_and_user_preferences.sql`
- ✅ `2025-11-29_fix_users_rls_insert_policy.sql`

## 1. 스키마(schema.sql) 실행

1. **Supabase 대시보드 접속**
   - [Supabase Dashboard](https://supabase.com/dashboard)에 로그인
   - 프로젝트 선택

2. **SQL Editor 열기**
   - 좌측 메뉴에서 "SQL Editor" 클릭
   - "New query" 클릭

3. **스키마 실행**
   - `schema.sql` 파일의 전체 내용을 복사
   - SQL Editor에 붙여넣기
   - "Run" 버튼 클릭 (또는 `Ctrl+Enter`)

4. **확인**
   - 좌측 메뉴의 "Table Editor"에서 테이블이 생성되었는지 확인
   - 다음 테이블들이 생성되어야 합니다:
     - users (email_confirmed_at 포함)
     - teams
     - team_members
     - projects (custom_statuses, wip_limits 포함)
     - project_favorites
     - issues
     - issue_labels
     - issue_label_mappings
     - subtasks
     - comments
     - notifications
     - activities (팀 활동 로그)
     - issue_attachments (마이그레이션: 2025-11-29)
     - user_preferences (마이그레이션: 2025-11-29)
     - issue_history (마이그레이션: 2025-11-29, FR-039)
     - custom_statuses (마이그레이션: 2025-11-29, FR-053)
     - project_wip_limits (마이그레이션: 2025-11-29, FR-054)

## Supabase CLI 사용 (로컬 개발)

### 데이터베이스 리셋 및 재설정

```bash
# Supabase CLI 설치 (아직 설치하지 않은 경우)
npm install -g supabase

# 또는 npx 사용
npx supabase db reset
```

### 로컬 Supabase 시작

```bash
# Supabase 로컬 환경 시작
supabase start

# 상태 확인
supabase status
```

## 마이그레이션 파일 (참고용)

`migrations/` 폴더에는 이전에 실행했던 개별 마이그레이션 파일들이 있습니다:
- `2025-01-30_add_email_confirmed_at_to_users.sql` - users 테이블에 email_confirmed_at 필드 추가
- `2025-11-29_add_custom_statuses_and_wip_limits.sql` - custom_statuses, project_wip_limits 테이블 추가 (FR-053, FR-054)
- `2025-11-29_add_issue_attachments_and_user_preferences.sql` - issue_attachments, user_preferences 테이블 추가
- `2025-11-29_add_issue_history_and_team_activities.sql` - issue_history, activities 테이블 추가 (FR-039, FR-019)
- `2025-11-29_fix_users_rls_insert_policy.sql` - users 테이블 INSERT RLS 정책 수정

**⚠️ 주의:** 모든 마이그레이션이 `schema.sql`에 통합되어 있습니다.  
새 프로젝트를 시작할 때는 `schema.sql`만 실행하면 됩니다.  
개별 마이그레이션 파일은 참고용입니다.

## 2. 시드 데이터 실행 (데모용)

**주의:** 시드 데이터는 데모용입니다. 기존 데이터를 모두 지우고 새로 삽입합니다.

### 2-1. 통합 시드 데이터 (seed_complete.sql) - 권장 ⭐

**가장 완전한 시드 데이터입니다. 모든 테이블에 실감나는 데이터를 포함합니다.**

**포함된 데이터:**
- 팀 3개 (개발팀, 디자인팀, QA팀)
- 팀 멤버 9명
- 프로젝트 7개
- 이슈 12개
- 라벨, 댓글, 알림, 활동 로그, 이슈 히스토리 등 모든 테이블

**사용 방법:**

1. **사용자 생성 (필수)**
   - Supabase Auth에서 테스트 사용자들을 먼저 생성하세요
   - 최소 7명의 사용자가 필요합니다:
     - 개발팀: 4명 (팀장 1명, 개발자 3명)
     - 디자인팀: 3명 (팀장 1명, 디자이너 2명)
     - QA팀: 2명 (팀장 1명, QA 1명)
   - 또는 기존 사용자 UUID를 확인하세요

2. **사용자 UUID 교체**
   - `seed_complete.sql` 파일을 열어서 사용자 ID 변수 부분을 찾으세요 (약 40-50줄)
   - 실제 생성된 사용자 UUID로 교체하세요
   - 예: `user_dev_lead UUID := '550e8400-e29b-41d4-a716-446655440001';` → 실제 UUID로 변경

3. **SQL Editor에서 실행**
   - SQL Editor에서 "New query" 클릭
   - `seed_complete.sql` 파일의 전체 내용을 복사
   - SQL Editor에 붙여넣기
   - "Run" 버튼 클릭

4. **확인**
   - Table Editor에서 모든 테이블에 데이터가 들어간 것을 확인

**실행 순서:** `schema.sql` → `seed_complete.sql`

### 2-2. 기본 시드 데이터 (seed.sql) - 간단 버전

**간단한 시드 데이터가 필요한 경우 사용하세요. 사용자 ID가 필요 없습니다.**

1. **SQL Editor에서 새 쿼리 열기**
   - "New query" 클릭

2. **시드 실행**
   - `seed.sql` 파일의 전체 내용을 복사
   - SQL Editor에 붙여넣기
   - "Run" 버튼 클릭

3. **확인**
   - `teams`, `projects`, `issues`, `subtasks` 테이블에 예제 데이터가 들어간 것을 확인

### 2-3. 추가 시드 데이터 (seed_v2.sql) - 보강 버전

**seed.sql 실행 후 추가 데이터가 필요한 경우 사용하세요.**

1. **SQL Editor에서 새 쿼리 열기**
   - "New query" 클릭

2. **시드 실행**
   - `seed_v2.sql` 파일의 전체 내용을 복사
   - SQL Editor에 붙여넣기
   - "Run" 버튼 클릭

3. **확인**
   - `issue_labels`, `issue_label_mappings` 테이블에 예제 데이터가 들어간 것을 확인
   - 추가 이슈 데이터도 확인

**실행 순서 (간단 버전):** `schema.sql` → `seed.sql` → `seed_v2.sql` (순서대로 실행)

## 주의사항

- **한 번에 전체 실행**: `schema.sql`, `seed.sql` 파일은 각각 전체를 한 번에 실행해야 합니다.
- **RLS 정책**: Row Level Security가 활성화되어 있습니다. 필요에 따라 정책을 수정하세요.
- **인덱스**: 성능을 위해 주요 컬럼에 인덱스가 생성되어 있습니다.

## 다음 단계

스키마 및 시드 데이터 생성 후:
1. 인증 API Routes에 Supabase 연동 (`src/app/api/auth/`)
2. 기본 CRUD API Routes 구현 (`src/app/api/`)
3. 프론트엔드에서 Supabase 클라이언트 사용

자세한 내용은 `docs/SUPABASE_SETUP_GUIDE.md`를 참조하세요.


