# 원격 Supabase 데이터베이스 리셋 가이드

## 방법 1: Supabase 대시보드에서 직접 실행 (권장)

### 1단계: Supabase 대시보드 접속
1. https://supabase.com/dashboard 접속
2. 프로젝트 선택

### 2단계: 기존 데이터베이스 초기화
1. 좌측 메뉴에서 **"SQL Editor"** 클릭
2. 새 쿼리 생성
3. 다음 SQL 실행하여 모든 테이블 삭제:

```sql
-- ⚠️ 주의: 이 명령은 모든 데이터를 삭제합니다!
-- 모든 테이블과 관련 객체 삭제
DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;
```

### 3단계: 통합 스키마 실행
1. **"SQL Editor"**에서 새 쿼리 생성
2. `supabase/schema.sql` 파일의 **전체 내용**을 복사
3. SQL Editor에 붙여넣기
4. **"Run"** 버튼 클릭 (또는 `Ctrl+Enter`)

### 4단계: 확인
1. 좌측 메뉴의 **"Table Editor"**에서 테이블 목록 확인
2. 다음 테이블들이 생성되었는지 확인:
   - users
   - teams
   - team_members
   - projects
   - custom_statuses
   - project_wip_limits
   - issues
   - issue_history
   - activities
   - comments
   - subtasks
   - issue_attachments
   - user_preferences
   - notifications
   - issue_labels
   - issue_label_mappings

## 방법 2: Supabase CLI로 원격 프로젝트에 연결

### 1단계: Supabase CLI로 로그인
```bash
npx supabase login
```

### 2단계: 원격 프로젝트에 연결
```bash
# 프로젝트 ID 확인 (Supabase 대시보드의 Settings > General에서 확인)
npx supabase link --project-ref YOUR_PROJECT_REF
```

### 3단계: 원격 데이터베이스 리셋
```bash
# ⚠️ 주의: 이 명령은 원격 데이터베이스의 모든 데이터를 삭제합니다!
npx supabase db reset --linked
```

또는 마이그레이션만 실행:
```bash
# 마이그레이션 파일들을 순서대로 실행
npx supabase migration up --linked
```

## 방법 3: SQL Editor에서 단계별 실행

### Step 1: 기존 스키마 삭제
```sql
-- 모든 테이블 삭제
DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;
```

### Step 2: 통합 스키마 실행
`supabase/schema.sql` 파일의 전체 내용을 복사하여 실행

### Step 3: (선택) 시드 데이터 실행
```sql
-- seed.sql 실행 (데모 데이터)
-- seed_v2.sql 실행 (추가 데모 데이터)
```

## ⚠️ 주의사항

1. **데이터 백업**: 프로덕션 환경에서는 반드시 데이터를 백업하세요
2. **RLS 정책**: 모든 테이블에 Row Level Security가 활성화되어 있습니다
3. **인덱스**: 성능을 위해 주요 컬럼에 인덱스가 생성됩니다
4. **트리거**: updated_at 자동 업데이트 트리거가 설정됩니다

## 문제 해결

### 에러: "relation already exists"
- 기존 테이블이 있는 경우 Step 1의 DROP SCHEMA 명령을 먼저 실행하세요

### 에러: "permission denied"
- Supabase 대시보드에서 프로젝트 소유자 권한이 있는지 확인하세요

### 에러: "function does not exist"
- `schema.sql`의 함수 정의 부분이 실행되었는지 확인하세요

## 다음 단계

스키마 설정 후:
1. Storage 버킷 설정 (issue-attachments)
2. 환경 변수 확인
3. 애플리케이션 테스트

