# 데이터베이스 설정 가이드

## 스키마 통합 완료

모든 마이그레이션 파일이 `schema.sql`에 통합되었습니다.

## 데이터베이스 리셋 및 설정 방법

### 방법 1: Supabase CLI 사용 (권장)

```bash
# Supabase CLI 설치 (아직 설치하지 않은 경우)
npm install -g supabase

# Supabase 프로젝트 초기화 (처음 한 번만)
supabase init

# Supabase 로컬 환경 시작
supabase start

# 데이터베이스 리셋 및 스키마 적용
supabase db reset
```

### 방법 2: Supabase 대시보드 사용

1. Supabase 대시보드 접속: https://supabase.com/dashboard
2. 프로젝트 선택
3. SQL Editor로 이동
4. `schema.sql` 파일의 전체 내용을 복사하여 실행

### 방법 3: 마이그레이션 파일 개별 실행 (비권장)

개별 마이그레이션 파일을 순서대로 실행할 수도 있지만, `schema.sql`을 사용하는 것이 더 간단합니다.

## 통합된 마이그레이션 목록

다음 마이그레이션들이 `schema.sql`에 통합되었습니다:

1. ✅ `2025-01-30_add_email_confirmed_at_to_users.sql`
   - `users` 테이블에 `email_confirmed_at` 필드 추가
   - auth.users와 동기화 트리거

2. ✅ `2025-11-29_add_custom_statuses_and_wip_limits.sql`
   - `custom_statuses` 테이블 생성 (FR-053)
   - `project_wip_limits` 테이블 생성 (FR-054)
   - `issues` 테이블의 status CHECK 제약조건 제거

3. ✅ `2025-11-29_add_issue_history_and_team_activities.sql`
   - `issue_history` 테이블 생성 (FR-039)
   - `activities` 테이블 생성 (FR-019)

4. ✅ `2025-11-29_add_issue_attachments_and_user_preferences.sql`
   - `issue_attachments` 테이블 생성
   - `user_preferences` 테이블 생성

5. ✅ `2025-11-29_fix_users_rls_insert_policy.sql`
   - users 테이블 INSERT RLS 정책 추가

## 주의사항

⚠️ **데이터 백업**: 프로덕션 환경에서 스키마를 변경하기 전에 반드시 데이터를 백업하세요.

⚠️ **기존 데이터**: `schema.sql`을 실행하면 기존 데이터가 삭제될 수 있습니다. 프로덕션 환경에서는 마이그레이션 파일을 개별적으로 실행하는 것을 권장합니다.

## 다음 단계

스키마 설정 후:

1. 시드 데이터 실행 (선택 사항):
   ```sql
   -- seed.sql 또는 seed_v2.sql 실행
   ```

2. Storage 버킷 설정:
   - `issue-attachments` 버킷 생성
   - 공개 읽기 권한 설정

3. 환경 변수 확인:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 문제 해결

### Supabase CLI가 설치되지 않은 경우

```bash
# npm으로 설치
npm install -g supabase

# 또는 npx 사용
npx supabase db reset
```

### 로컬 Supabase가 실행되지 않는 경우

```bash
# Supabase 로컬 환경 시작
supabase start

# 상태 확인
supabase status
```

