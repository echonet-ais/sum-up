-- ============================================
-- SumUp 데모용 시드 데이터
-- ============================================
-- Supabase 대시보드 SQL Editor에서 실행하세요
-- 스키마(schema.sql) 적용 후에 실행해야 합니다.
-- auth.users / public.users는 Supabase Auth를 통해 생성된
-- 실제 사용자 계정을 사용한다고 가정하고, 여기서는
-- teams / projects / issues / subtasks 정도만 시드합니다.
-- ============================================

-- 기존 데이터 삭제 (데모용, 필요 시 주석 처리)
TRUNCATE TABLE
  public.subtasks,
  public.issues,
  public.projects,
  public.teams
RESTART IDENTITY CASCADE;

-- ============================================
-- 1. 팀 (teams)
-- ============================================

INSERT INTO public.teams (id, name, description)
VALUES
  -- 팀 ID: 실제 운영 환경을 가정한 UUID
  ('3f3a2b0e-6a2d-4c1a-9b11-1a2b3c4d5e6f', '개발팀', 'SumUp 웹앱 및 백엔드 개발을 담당하는 팀입니다.'),
  ('8b9c7d1e-2f3a-4b5c-8d9e-0f1a2b3c4d5e', '디자인팀', 'UI/UX 디자인과 컴포넌트 디자인 시스템을 담당하는 팀입니다.');

-- ============================================
-- 2. 프로젝트 (projects)
-- ============================================

INSERT INTO public.projects (id, name, description, team_id, is_archived)
VALUES
  -- 프로젝트 ID: 각 팀에 매핑된 UUID
  ('a1f5c3e2-9b8d-4a6f-91c2-3d4e5f6a7b8c', 'SumUp 웹앱', 'AI 기반 이슈 트래킹 시스템 SumUp의 웹 애플리케이션입니다.', '3f3a2b0e-6a2d-4c1a-9b11-1a2b3c4d5e6f', FALSE),
  ('b2e6d4f3-8c7b-49a5-82d3-4e5f6a7b8c9d', '모바일 앱', 'SumUp 모바일 클라이언트(향후 확장)를 위한 기획 프로젝트입니다.', '3f3a2b0e-6a2d-4c1a-9b11-1a2b3c4d5e6f', FALSE),
  ('c3d7e5f4-7d6c-48b4-73e4-5f6a7b8c9d0e', 'API 서버', 'SumUp 서비스를 위한 백엔드 API 서버 설계/구현 프로젝트입니다.', '3f3a2b0e-6a2d-4c1a-9b11-1a2b3c4d5e6f', TRUE),
  ('d4c8f6a5-6e5d-47c3-64f5-6a7b8c9d0e1f', '디자인 시스템', '컴포넌트 라이브러리 및 디자인 시스템 구축 프로젝트입니다.', '8b9c7d1e-2f3a-4b5c-8d9e-0f1a2b3c4d5e', FALSE);

-- ============================================
-- 3. 이슈 (issues)
-- ============================================

INSERT INTO public.issues (id, title, description, status, priority, project_id, assignee_id, due_date, order_position, created_at, updated_at)
VALUES
  (
    'f1a2b3c4-d5e6-47f8-9101-1a2b3c4d5e6f',
    'WEB-101 로그인 기능 개선',
    '사용자 인증 로직을 개선하여 보안을 강화하고 사용자 경험을 향상시켜야 합니다. 현재 세션 관리 방식에 문제가 있어 개선이 필요합니다.',
    'IN_PROGRESS',
    'HIGH',
    'a1f5c3e2-9b8d-4a6f-91c2-3d4e5f6a7b8c',
    NULL,
    '2025-02-01T00:00:00Z',
    1,
    '2025-01-15T09:10:00Z',
    '2025-01-20T18:45:00Z'
  ),
  (
    'f2b3c4d5-e6f7-4809-8210-2b3c4d5e6f70',
    'WEB-102 API 응답 시간 최적화',
    '데이터베이스 쿼리 최적화가 필요합니다. 현재 주요 대시보드 API의 응답 시간이 느립니다.',
    'TODO',
    'MEDIUM',
    'a1f5c3e2-9b8d-4a6f-91c2-3d4e5f6a7b8c',
    NULL,
    '2025-02-05T00:00:00Z',
    2,
    '2025-01-16T11:20:00Z',
    '2025-01-16T11:20:00Z'
  ),
  (
    'f3c4d5e6-f708-4910-7321-3c4d5e6f7081',
    'MOB-201 UI 디자인 개선',
    '프로젝트/이슈 상세 페이지의 레이아웃과 시각적 계층 구조를 개선해야 합니다.',
    'DONE',
    'LOW',
    'b2e6d4f3-8c7b-49a5-82d3-4e5f6a7b8c9d',
    NULL,
    NULL,
    3,
    '2025-01-10T08:00:00Z',
    '2025-01-18T14:30:00Z'
  ),
  (
    'f4d5e6f7-0819-4a21-6432-4d5e6f708192',
    'WEB-103 테스트 코드 작성',
    '핵심 훅(useIssues, useProjects 등)에 대한 단위 테스트 및 통합 테스트 작성이 필요합니다.',
    'IN_REVIEW',
    'MEDIUM',
    'a1f5c3e2-9b8d-4a6f-91c2-3d4e5f6a7b8c',
    NULL,
    NULL,
    4,
    '2025-01-17T13:15:00Z',
    '2025-01-19T09:10:00Z'
  ),
  (
    'f5e6f708-192a-4b32-5543-5e6f708192a3',
    'DS-301 컴포넌트 문서화',
    '재사용 가능한 컴포넌트(StatCard, FilterBar, FormDrawer 등)에 대한 문서를 보완해야 합니다.',
    'TODO',
    'LOW',
    'd4c8f6a5-6e5d-47c3-64f5-6a7b8c9d0e1f',
    NULL,
    NULL,
    5,
    '2025-01-18T10:40:00Z',
    '2025-01-18T10:40:00Z'
  );

-- ============================================
-- 4. 서브태스크 (subtasks)
-- ============================================

INSERT INTO public.subtasks (id, issue_id, title, completed, order_position)
VALUES
  ('0a1b2c3d-4e5f-4678-9101-abcdefabcdef', 'f1a2b3c4-d5e6-47f8-9101-1a2b3c4d5e6f', '세션 관리 로직 수정', TRUE, 1),
  ('1b2c3d4e-5f60-4789-8210-bcdefabcdef0', 'f1a2b3c4-d5e6-47f8-9101-1a2b3c4d5e6f', '토큰 갱신 기능 추가', FALSE, 2),
  ('2c3d4e5f-6071-489a-7321-cdefabcdef01', 'f1a2b3c4-d5e6-47f8-9101-1a2b3c4d5e6f', '보안 테스트', FALSE, 3),
  ('3d4e5f60-7182-49ab-6432-defabcdef012', 'f2b3c4d5-e6f7-4809-8210-2b3c4d5e6f70', '데이터베이스 인덱스 추가', TRUE, 1),
  ('4e5f6071-8293-4abc-5543-efabcdef0123', 'f2b3c4d5-e6f7-4809-8210-2b3c4d5e6f70', '슬로우 쿼리 분석', FALSE, 2);

-- ============================================
-- 완료
-- ============================================
-- 이제 Table Editor에서 teams / projects / issues / subtasks 데이터를
-- 확인할 수 있습니다.


