# Supabase 스키마 및 시드 데이터 가이드

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
     - users
     - teams
     - team_members
     - projects
     - project_favorites
     - issues
     - issue_labels
     - issue_label_mappings
     - subtasks
     - comments
     - notifications
     - activities

## 2. 시드 데이터(seed.sql) 실행 (데모용)

**주의:** `seed.sql`은 데모용 데이터입니다. 기존 데이터를 모두 지우고 새로 삽입합니다.

1. **SQL Editor에서 새 쿼리 열기**
   - 다시 "New query" 클릭

2. **시드 실행**
   - `seed.sql` 파일의 전체 내용을 복사
   - SQL Editor에 붙여넣기
   - "Run" 버튼 클릭

3. **확인**
   - `teams`, `projects`, `issues`, `subtasks` 테이블에 예제 데이터가 들어간 것을 확인
   - 이 데이터는 프론트엔드 데모(프로젝트/이슈/칸반 화면)에 사용하면 됩니다.

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


