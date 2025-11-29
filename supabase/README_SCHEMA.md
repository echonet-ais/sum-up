# SumUp 데이터베이스 스키마

## 개요

이 디렉토리에는 SumUp 프로젝트의 데이터베이스 스키마가 포함되어 있습니다.

## 파일 구조

- `schema.sql` - **통합 스키마 파일** (모든 마이그레이션 통합)
- `migrations/` - 개별 마이그레이션 파일들 (참고용)

## 사용 방법

### 1. Supabase 대시보드에서 실행

1. Supabase 대시보드 접속
2. SQL Editor로 이동
3. `schema.sql` 파일의 내용을 복사하여 실행

### 2. Supabase CLI 사용 (로컬 개발)

```bash
# 데이터베이스 리셋 및 마이그레이션 실행
supabase db reset

# 또는 특정 마이그레이션만 실행
supabase migration up
```

### 3. 프로덕션 배포

프로덕션 환경에서는 `schema.sql`을 Supabase 대시보드의 SQL Editor에서 실행하거나, 
Supabase CLI를 사용하여 배포할 수 있습니다.

## 주요 테이블

- `users` - 사용자 프로필
- `teams` - 팀
- `team_members` - 팀 멤버십
- `projects` - 프로젝트
- `issues` - 이슈
- `custom_statuses` - 커스텀 상태 (FR-053)
- `project_wip_limits` - WIP Limit (FR-054)
- `issue_history` - 이슈 변경 히스토리 (FR-039)
- `activities` - 팀 활동 로그 (FR-019)
- `comments` - 댓글
- `subtasks` - 서브태스크
- `issue_attachments` - 이슈 첨부파일
- `user_preferences` - 사용자 환경설정
- `notifications` - 알림

## 주의사항

1. **데이터 백업**: 프로덕션 환경에서 스키마를 변경하기 전에 반드시 데이터를 백업하세요.
2. **마이그레이션 순서**: `schema.sql`은 모든 마이그레이션을 통합한 파일이므로, 개별 마이그레이션 파일과 함께 사용하지 마세요.
3. **RLS 정책**: 모든 테이블에 Row Level Security (RLS)가 활성화되어 있습니다.

## 마이그레이션 히스토리

- **2025-01-30**: email_confirmed_at 필드 추가
- **2025-11-29**: 커스텀 상태 및 WIP Limit 테이블 추가
- **2025-11-29**: 이슈 변경 히스토리 및 팀 활동 로그 테이블 추가
- **2025-11-29**: 이슈 첨부파일 및 사용자 환경설정 테이블 추가
- **2025-11-29**: users RLS INSERT 정책 수정

