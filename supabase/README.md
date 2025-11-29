# Supabase 스키마 설정 가이드

## 실행 방법

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

## 주의사항

- **한 번에 전체 실행**: `schema.sql` 파일은 전체를 한 번에 실행해야 합니다.
- **RLS 정책**: Row Level Security가 활성화되어 있습니다. 필요에 따라 정책을 수정하세요.
- **인덱스**: 성능을 위해 주요 컬럼에 인덱스가 생성되어 있습니다.

## 다음 단계

스키마 생성 후:
1. 인증 API Routes에 Supabase 연동 (`src/app/api/auth/`)
2. 기본 CRUD API Routes 구현 (`src/app/api/`)
3. 프론트엔드에서 Supabase 클라이언트 사용

자세한 내용은 `docs/SUPABASE_SETUP_GUIDE.md`를 참조하세요.

