-- ============================================
-- SumUp 통합 시드 데이터 (완전 버전)
-- ============================================
-- Supabase 대시보드 SQL Editor에서 실행하세요
-- 스키마(schema.sql) 적용 후에 실행해야 합니다.
-- 
-- 주의사항:
-- 1. auth.users / public.users는 Supabase Auth를 통해 실제 사용자를 생성한 후
--    해당 사용자의 UUID를 아래의 사용자 ID로 사용하세요.
-- 2. 또는 시드 데이터 실행 전에 테스트 사용자를 먼저 생성하세요.
-- ============================================

-- 기존 데이터 삭제 (데모용, 필요 시 주석 처리)
TRUNCATE TABLE
  public.issue_history,
  public.issue_attachments,
  public.user_preferences,
  public.project_wip_limits,
  public.custom_statuses,
  public.activities,
  public.notifications,
  public.comments,
  public.subtasks,
  public.issue_label_mappings,
  public.issue_labels,
  public.issues,
  public.project_favorites,
  public.projects,
  public.team_members,
  public.teams
RESTART IDENTITY CASCADE;

-- ============================================
-- 사용자 ID 정의 (실제 auth.users에서 생성된 UUID로 교체 필요)
-- ============================================
-- 아래 UUID들은 예시입니다. 실제 사용자를 생성한 후 해당 UUID로 교체하세요.
-- 예: 'a1b2c3d4-e5f6-4789-0123-456789abcdef' → 실제 사용자 UUID

-- 개발팀 사용자들
DO $$
DECLARE
  user_dev_lead UUID := '550e8400-e29b-41d4-a716-446655440001';
  user_dev_1 UUID := '550e8400-e29b-41d4-a716-446655440002';
  user_dev_2 UUID := '550e8400-e29b-41d4-a716-446655440003';
  user_dev_3 UUID := '550e8400-e29b-41d4-a716-446655440004';
  
  -- 디자인팀 사용자들
  user_design_lead UUID := '550e8400-e29b-41d4-a716-446655440010';
  user_design_1 UUID := '550e8400-e29b-41d4-a716-446655440011';
  user_design_2 UUID := '550e8400-e29b-41d4-a716-446655440012';
  
  -- QA팀 사용자들
  user_qa_lead UUID := '550e8400-e29b-41d4-a716-446655440020';
  user_qa_1 UUID := '550e8400-e29b-41d4-a716-446655440021';
BEGIN
  -- ============================================
  -- 1. 팀 (teams)
  -- ============================================
  
  INSERT INTO public.teams (id, name, description, owner_id, created_at, updated_at)
  VALUES
    ('3f3a2b0e-6a2d-4c1a-9b11-1a2b3c4d5e6f', '개발팀', 'SumUp 웹앱 및 백엔드 개발을 담당하는 팀입니다. React, Next.js, TypeScript를 주로 사용합니다.', user_dev_lead, '2025-01-01T09:00:00Z', '2025-01-25T14:30:00Z'),
    ('8b9c7d1e-2f3a-4b5c-8d9e-0f1a2b3c4d5e', '디자인팀', 'UI/UX 디자인과 컴포넌트 디자인 시스템을 담당하는 팀입니다. Figma를 주로 사용합니다.', user_design_lead, '2025-01-05T10:00:00Z', '2025-01-20T16:00:00Z'),
    ('9c0d1e2f-3a4b-4c5d-9e0f-1a2b3c4d5e6f', 'QA팀', '품질 보증 및 테스트를 담당하는 팀입니다. 자동화 테스트와 수동 테스트를 병행합니다.', user_qa_lead, '2025-01-08T11:00:00Z', '2025-01-22T15:00:00Z');
  
  -- ============================================
  -- 2. 팀 멤버 (team_members)
  -- ============================================
  
  -- 개발팀 멤버
  INSERT INTO public.team_members (id, team_id, user_id, role, joined_at)
  VALUES
    ('a1b2c3d4-e5f6-4789-0123-456789000001', '3f3a2b0e-6a2d-4c1a-9b11-1a2b3c4d5e6f', user_dev_lead, 'OWNER', '2025-01-01T09:00:00Z'),
    ('a1b2c3d4-e5f6-4789-0123-456789000002', '3f3a2b0e-6a2d-4c1a-9b11-1a2b3c4d5e6f', user_dev_1, 'ADMIN', '2025-01-02T10:00:00Z'),
    ('a1b2c3d4-e5f6-4789-0123-456789000003', '3f3a2b0e-6a2d-4c1a-9b11-1a2b3c4d5e6f', user_dev_2, 'MEMBER', '2025-01-03T11:00:00Z'),
    ('a1b2c3d4-e5f6-4789-0123-456789000004', '3f3a2b0e-6a2d-4c1a-9b11-1a2b3c4d5e6f', user_dev_3, 'MEMBER', '2025-01-04T12:00:00Z');
  
  -- 디자인팀 멤버
  INSERT INTO public.team_members (id, team_id, user_id, role, joined_at)
  VALUES
    ('b2c3d4e5-f607-4890-1234-567890000001', '8b9c7d1e-2f3a-4b5c-8d9e-0f1a2b3c4d5e', user_design_lead, 'OWNER', '2025-01-05T10:00:00Z'),
    ('b2c3d4e5-f607-4890-1234-567890000002', '8b9c7d1e-2f3a-4b5c-8d9e-0f1a2b3c4d5e', user_design_1, 'ADMIN', '2025-01-06T11:00:00Z'),
    ('b2c3d4e5-f607-4890-1234-567890000003', '8b9c7d1e-2f3a-4b5c-8d9e-0f1a2b3c4d5e', user_design_2, 'MEMBER', '2025-01-07T12:00:00Z');
  
  -- QA팀 멤버
  INSERT INTO public.team_members (id, team_id, user_id, role, joined_at)
  VALUES
    ('c3d4e5f6-0718-4901-2345-678901000001', '9c0d1e2f-3a4b-4c5d-9e0f-1a2b3c4d5e6f', user_qa_lead, 'OWNER', '2025-01-08T11:00:00Z'),
    ('c3d4e5f6-0718-4901-2345-678901000002', '9c0d1e2f-3a4b-4c5d-9e0f-1a2b3c4d5e6f', user_qa_1, 'MEMBER', '2025-01-09T12:00:00Z');
  
  -- ============================================
  -- 3. 프로젝트 (projects)
  -- ============================================
  
  INSERT INTO public.projects (id, name, description, team_id, is_archived, created_at, updated_at)
  VALUES
    -- 개발팀 프로젝트
    ('a1f5c3e2-9b8d-4a6f-91c2-3d4e5f6a7b8c', 'SumUp 웹앱', 'AI 기반 이슈 트래킹 시스템 SumUp의 웹 애플리케이션입니다. Next.js 16, React 19, TypeScript로 개발됩니다.', '3f3a2b0e-6a2d-4c1a-9b11-1a2b3c4d5e6f', FALSE, '2025-01-10T09:00:00Z', '2025-01-25T14:30:00Z'),
    ('b2e6d4f3-8c7b-49a5-82d3-4e5f6a7b8c9d', '모바일 앱', 'SumUp 모바일 클라이언트(향후 확장)를 위한 기획 프로젝트입니다. React Native를 고려 중입니다.', '3f3a2b0e-6a2d-4c1a-9b11-1a2b3c4d5e6f', FALSE, '2025-01-12T10:00:00Z', '2025-01-20T11:00:00Z'),
    ('c3d7e5f4-7d6c-48b4-73e4-5f6a7b8c9d0e', 'API 서버', 'SumUp 서비스를 위한 백엔드 API 서버 설계/구현 프로젝트입니다. RESTful API와 GraphQL을 고려 중입니다.', '3f3a2b0e-6a2d-4c1a-9b11-1a2b3c4d5e6f', TRUE, '2025-01-08T14:00:00Z', '2025-01-22T16:00:00Z'),
    ('d4c8f6a5-6e5d-47c3-64f5-6a7b8c9d0e1f', '인프라 관리', 'AWS 기반 클라우드 인프라 관리 및 CI/CD 파이프라인 구축 프로젝트입니다.', '3f3a2b0e-6a2d-4c1a-9b11-1a2b3c4d5e6f', FALSE, '2025-01-15T13:00:00Z', '2025-01-23T17:00:00Z'),
    
    -- 디자인팀 프로젝트
    ('e5d9a7b6-5f4e-46d2-55f6-7a8b9c0d1e2f', '디자인 시스템', '컴포넌트 라이브러리 및 디자인 시스템 구축 프로젝트입니다. Storybook을 사용합니다.', '8b9c7d1e-2f3a-4b5c-8d9e-0f1a2b3c4d5e', FALSE, '2025-01-11T13:00:00Z', '2025-01-18T15:00:00Z'),
    ('f6e0b8c7-4g3f-45e1-46g7-8b9c0d1e2f3a', '브랜드 가이드', 'SumUp 브랜드 아이덴티티 및 마케팅 자료 디자인 가이드라인 프로젝트입니다.', '8b9c7d1e-2f3a-4b5c-8d9e-0f1a2b3c4d5e', FALSE, '2025-01-14T14:00:00Z', '2025-01-21T16:00:00Z'),
    
    -- QA팀 프로젝트
    ('g7f1c9d8-3h2e-44f0-37h8-9c0d1e2f3a4b', '테스트 자동화', 'E2E 테스트 및 통합 테스트 자동화 프로젝트입니다. Playwright를 사용합니다.', '9c0d1e2f-3a4b-4c5d-9e0f-1a2b3c4d5e6f', FALSE, '2025-01-13T15:00:00Z', '2025-01-19T17:00:00Z');
  
  -- ============================================
  -- 4. 프로젝트 즐겨찾기 (project_favorites)
  -- ============================================
  
  INSERT INTO public.project_favorites (id, project_id, user_id, created_at)
  VALUES
    ('f1a2b3c4-d5e6-4789-9101-1a2b3c4d5e6f', 'a1f5c3e2-9b8d-4a6f-91c2-3d4e5f6a7b8c', user_dev_lead, '2025-01-10T09:30:00Z'),
    ('f2b3c4d5-e6f7-4890-8210-2b3c4d5e6f70', 'a1f5c3e2-9b8d-4a6f-91c2-3d4e5f6a7b8c', user_dev_1, '2025-01-10T10:00:00Z'),
    ('f3c4d5e6-f708-4901-7321-3c4d5e6f7081', 'e5d9a7b6-5f4e-46d2-55f6-7a8b9c0d1e2f', user_design_lead, '2025-01-11T13:30:00Z');
  
  -- ============================================
  -- 5. 커스텀 상태 (custom_statuses) - FR-053
  -- ============================================
  
  INSERT INTO public.custom_statuses (id, project_id, name, color, position, created_at, updated_at)
  VALUES
    -- SumUp 웹앱 프로젝트의 커스텀 상태
    ('c1a2b3c4-d5e6-4789-9101-1a2b3c4d5e6f', 'a1f5c3e2-9b8d-4a6f-91c2-3d4e5f6a7b8c', '검토 대기', '#F59E0B', 2, '2025-01-10T09:15:00Z', '2025-01-10T09:15:00Z'),
    ('c2b3c4d5-e6f7-4890-8210-2b3c4d5e6f70', 'a1f5c3e2-9b8d-4a6f-91c2-3d4e5f6a7b8c', '블로커', '#EF4444', 0, '2025-01-10T09:20:00Z', '2025-01-10T09:20:00Z');
  
  -- ============================================
  -- 6. WIP Limit (project_wip_limits) - FR-054
  -- ============================================
  
  INSERT INTO public.project_wip_limits (id, project_id, status, wip_limit, created_at, updated_at)
  VALUES
    -- SumUp 웹앱 프로젝트의 WIP Limit
    ('w1a2b3c4-d5e6-4789-9101-1a2b3c4d5e6f', 'a1f5c3e2-9b8d-4a6f-91c2-3d4e5f6a7b8c', 'TODO', 10, '2025-01-10T09:25:00Z', '2025-01-10T09:25:00Z'),
    ('w2b3c4d5-e6f7-4890-8210-2b3c4d5e6f70', 'a1f5c3e2-9b8d-4a6f-91c2-3d4e5f6a7b8c', 'IN_PROGRESS', 5, '2025-01-10T09:25:00Z', '2025-01-10T09:25:00Z'),
    ('w3c4d5e6-f708-4901-7321-3c4d5e6f7081', 'a1f5c3e2-9b8d-4a6f-91c2-3d4e5f6a7b8c', 'IN_REVIEW', 3, '2025-01-10T09:25:00Z', '2025-01-10T09:25:00Z');
  
  -- ============================================
  -- 7. 이슈 (issues)
  -- ============================================
  
  INSERT INTO public.issues (id, title, description, status, priority, project_id, assignee_id, due_date, order_position, created_at, updated_at)
  VALUES
    -- SumUp 웹앱 프로젝트 이슈
    ('f1a2b3c4-d5e6-47f8-9101-1a2b3c4d5e6f', 'WEB-101 로그인 기능 개선', '사용자 인증 로직을 개선하여 보안을 강화하고 사용자 경험을 향상시켜야 합니다. 현재 세션 관리 방식에 문제가 있어 개선이 필요합니다. Supabase Auth와의 통합도 고려해야 합니다.', 'IN_PROGRESS', 'HIGH', 'a1f5c3e2-9b8d-4a6f-91c2-3d4e5f6a7b8c', user_dev_1, '2025-02-01T00:00:00Z', 1, '2025-01-15T09:10:00Z', '2025-01-20T18:45:00Z'),
    ('f2b3c4d5-e6f7-4809-8210-2b3c4d5e6f70', 'WEB-102 API 응답 시간 최적화', '데이터베이스 쿼리 최적화가 필요합니다. 현재 주요 대시보드 API의 응답 시간이 느립니다. 인덱스 추가 및 쿼리 최적화를 진행해야 합니다.', 'TODO', 'MEDIUM', 'a1f5c3e2-9b8d-4a6f-91c2-3d4e5f6a7b8c', user_dev_2, '2025-02-05T00:00:00Z', 2, '2025-01-16T11:20:00Z', '2025-01-16T11:20:00Z'),
    ('f3c4d5e6-f708-4910-7321-3c4d5e6f7081', 'WEB-103 테스트 코드 작성', '핵심 훅(useIssues, useProjects 등)에 대한 단위 테스트 및 통합 테스트 작성이 필요합니다. Vitest를 사용하여 테스트를 작성합니다.', 'IN_REVIEW', 'MEDIUM', 'a1f5c3e2-9b8d-4a6f-91c2-3d4e5f6a7b8c', user_dev_3, NULL, 3, '2025-01-17T13:15:00Z', '2025-01-19T09:10:00Z'),
    ('f4d5e6f7-0819-4a21-6432-4d5e6f708192', 'WEB-104 전역 검색 초기 버전', '헤더의 GlobalSearch를 통한 통합 검색(이슈/프로젝트/팀) 1차 구현. 검색 결과 하이라이팅 및 키보드 단축키 지원도 포함합니다.', 'TODO', 'HIGH', 'a1f5c3e2-9b8d-4a6f-91c2-3d4e5f6a7b8c', NULL, '2025-02-10T00:00:00Z', 4, '2025-01-21T10:00:00Z', '2025-01-21T10:00:00Z'),
    ('f5e6f708-192a-4b32-5543-5e6f708192a3', 'WEB-105 프로필 페이지 생성', '사용자 프로필 보기/수정(이름/아바타) 및 비밀번호 변경 폼. 아바타 업로드는 Supabase Storage를 사용합니다.', 'TODO', 'LOW', 'a1f5c3e2-9b8d-4a6f-91c2-3d4e5f6a7b8c', user_dev_1, '2025-02-15T00:00:00Z', 5, '2025-01-22T09:30:00Z', '2025-01-22T09:30:00Z'),
    ('f6f70819-2a3b-4c43-6654-6f708192a3b4', 'WEB-106 칸반 보드 성능 개선', '대량의 이슈가 있을 때 칸반 보드 렌더링 성능 개선. 가상 스크롤링 및 lazy loading을 적용합니다.', 'IN_PROGRESS', 'MEDIUM', 'a1f5c3e2-9b8d-4a6f-91c2-3d4e5f6a7b8c', user_dev_2, NULL, 6, '2025-01-23T14:00:00Z', '2025-01-24T16:30:00Z'),
    ('f708192a-3b4c-4d55-7765-708192a3b4c5', 'WEB-107 알림 시스템 개선', '실시간 알림 업데이트를 위한 WebSocket 또는 Server-Sent Events 구현. 알림 그룹핑 및 필터링 기능도 추가합니다.', 'TODO', 'MEDIUM', 'a1f5c3e2-9b8d-4a6f-91c2-3d4e5f6a7b8c', NULL, NULL, 7, '2025-01-24T11:00:00Z', '2025-01-24T11:00:00Z'),
    
    -- 모바일 앱 프로젝트 이슈
    ('m1a2b3c4-d5e6-4789-9101-1a2b3c4d5e6f', 'MOB-201 UI 디자인 개선', '프로젝트/이슈 상세 페이지의 레이아웃과 시각적 계층 구조를 개선해야 합니다. 모바일 퍼스트 디자인을 적용합니다.', 'DONE', 'LOW', 'b2e6d4f3-8c7b-49a5-82d3-4e5f6a7b8c9d', user_dev_3, NULL, 1, '2025-01-10T08:00:00Z', '2025-01-18T14:30:00Z'),
    ('m2b3c4d5-e6f7-4890-8210-2b3c4d5e6f70', 'MOB-202 네비게이션 구조 설계', '모바일 앱의 네비게이션 구조 및 정보 아키텍처 설계. Bottom Tab Navigation과 Drawer를 고려합니다.', 'IN_PROGRESS', 'HIGH', 'b2e6d4f3-8c7b-49a5-82d3-4e5f6a7b8c9d', user_dev_1, '2025-02-20T00:00:00Z', 2, '2025-01-19T10:00:00Z', '2025-01-25T15:00:00Z'),
    
    -- 디자인 시스템 프로젝트 이슈
    ('d1a2b3c4-d5e6-4789-9101-1a2b3c4d5e6f', 'DS-301 컴포넌트 문서화', '재사용 가능한 컴포넌트(StatCard, FilterBar, FormDrawer 등)에 대한 문서를 보완해야 합니다. Storybook을 사용합니다.', 'TODO', 'LOW', 'e5d9a7b6-5f4e-46d2-55f6-7a8b9c0d1e2f', user_design_1, NULL, 1, '2025-01-18T10:40:00Z', '2025-01-18T10:40:00Z'),
    ('d2b3c4d5-e6f7-4890-8210-2b3c4d5e6f70', 'DS-302 색상 시스템 정리', '디자인 시스템의 색상 팔레트 및 사용 가이드라인 정리. 다크 모드 지원을 위한 색상 매핑도 포함합니다.', 'IN_PROGRESS', 'MEDIUM', 'e5d9a7b6-5f4e-46d2-55f6-7a8b9c0d1e2f', user_design_2, '2025-02-12T00:00:00Z', 2, '2025-01-20T13:00:00Z', '2025-01-23T11:00:00Z');
  
  -- ============================================
  -- 8. 이슈 라벨 (issue_labels)
  -- ============================================
  
  INSERT INTO public.issue_labels (id, project_id, name, color, created_at)
  VALUES
    -- SumUp 웹앱 라벨
    ('0f1a2b3c-4d5e-4789-8abc-def012340001', 'a1f5c3e2-9b8d-4a6f-91c2-3d4e5f6a7b8c', '버그', '#EF4444', '2025-01-10T09:05:00Z'),
    ('0f1a2b3c-4d5e-4789-8abc-def012340002', 'a1f5c3e2-9b8d-4a6f-91c2-3d4e5f6a7b8c', '프론트엔드', '#3B82F6', '2025-01-10T09:05:00Z'),
    ('0f1a2b3c-4d5e-4789-8abc-def012340003', 'a1f5c3e2-9b8d-4a6f-91c2-3d4e5f6a7b8c', '백엔드', '#A855F7', '2025-01-10T09:05:00Z'),
    ('0f1a2b3c-4d5e-4789-8abc-def012340004', 'a1f5c3e2-9b8d-4a6f-91c2-3d4e5f6a7b8c', '문서', '#10B981', '2025-01-10T09:05:00Z'),
    ('0f1a2b3c-4d5e-4789-8abc-def012340005', 'a1f5c3e2-9b8d-4a6f-91c2-3d4e5f6a7b8c', '성능', '#F59E0B', '2025-01-10T09:05:00Z'),
    
    -- 모바일 앱 라벨
    ('1a2b3c4d-5e6f-4789-9abc-ef0123400001', 'b2e6d4f3-8c7b-49a5-82d3-4e5f6a7b8c9d', '프론트엔드', '#3B82F6', '2025-01-12T10:05:00Z'),
    ('1a2b3c4d-5e6f-4789-9abc-ef0123400002', 'b2e6d4f3-8c7b-49a5-82d3-4e5f6a7b8c9d', '디자인', '#F59E0B', '2025-01-12T10:05:00Z'),
    
    -- 디자인 시스템 라벨
    ('2b3c4d5e-6f70-4789-aabc-f01234000001', 'e5d9a7b6-5f4e-46d2-55f6-7a8b9c0d1e2f', '디자인', '#F59E0B', '2025-01-11T13:05:00Z'),
    ('2b3c4d5e-6f70-4789-aabc-f01234000002', 'e5d9a7b6-5f4e-46d2-55f6-7a8b9c0d1e2f', '문서화', '#10B981', '2025-01-11T13:05:00Z');
  
  -- ============================================
  -- 9. 이슈 라벨 매핑 (issue_label_mappings)
  -- ============================================
  
  INSERT INTO public.issue_label_mappings (id, issue_id, label_id)
  VALUES
    -- 웹앱 이슈 라벨
    ('3c4d5e6f-7081-4789-bbcd-012340000001', 'f1a2b3c4-d5e6-47f8-9101-1a2b3c4d5e6f', '0f1a2b3c-4d5e-4789-8abc-def012340001'),
    ('3c4d5e6f-7081-4789-bbcd-012340000002', 'f1a2b3c4-d5e6-47f8-9101-1a2b3c4d5e6f', '0f1a2b3c-4d5e-4789-8abc-def012340002'),
    ('4d5e6f70-8192-4789-ccde-123400000001', 'f2b3c4d5-e6f7-4809-8210-2b3c4d5e6f70', '0f1a2b3c-4d5e-4789-8abc-def012340003'),
    ('4d5e6f70-8192-4789-ccde-123400000002', 'f2b3c4d5-e6f7-4809-8210-2b3c4d5e6f70', '0f1a2b3c-4d5e-4789-8abc-def012340005'),
    ('5e6f7081-92a3-4789-ddef-234000000001', 'f3c4d5e6-f708-4910-7321-3c4d5e6f7081', '0f1a2b3c-4d5e-4789-8abc-def012340004'),
    ('6f708192-a3b4-4789-ee01-340000000001', 'f4d5e6f7-0819-4a21-6432-4d5e6f708192', '0f1a2b3c-4d5e-4789-8abc-def012340002'),
    ('7g8192a3-b4c5-4789-ff12-450000000001', 'f6f70819-2a3b-4c43-6654-6f708192a3b4', '0f1a2b3c-4d5e-4789-8abc-def012340005'),
    
    -- 모바일 앱 이슈 라벨
    ('8h92a3b4-c5d6-4789-0123-560000000001', 'm1a2b3c4-d5e6-4789-9101-1a2b3c4d5e6f', '1a2b3c4d-5e6f-4789-9abc-ef0123400001'),
    ('9i03b4c5-d6e7-4789-1234-670000000001', 'm2b3c4d5-e6f7-4890-8210-2b3c4d5e6f70', '1a2b3c4d-5e6f-4789-9abc-ef0123400002'),
    
    -- 디자인 시스템 이슈 라벨
    ('0j14c5d6-e7f8-4789-2345-780000000001', 'd1a2b3c4-d5e6-4789-9101-1a2b3c4d5e6f', '2b3c4d5e-6f70-4789-aabc-f01234000002'),
    ('1k25d6e7-f809-4789-3456-890000000001', 'd2b3c4d5-e6f7-4890-8210-2b3c4d5e6f70', '2b3c4d5e-6f70-4789-aabc-f01234000001');
  
  -- ============================================
  -- 10. 서브태스크 (subtasks)
  -- ============================================
  
  INSERT INTO public.subtasks (id, issue_id, title, completed, order_position, created_at, updated_at)
  VALUES
    -- WEB-101 서브태스크
    ('s1a2b3c4-d5e6-4789-9101-1a2b3c4d5e6f', 'f1a2b3c4-d5e6-47f8-9101-1a2b3c4d5e6f', '세션 관리 로직 수정', TRUE, 1, '2025-01-15T09:30:00Z', '2025-01-18T11:00:00Z'),
    ('s2b3c4d5-e6f7-4890-8210-2b3c4d5e6f70', 'f1a2b3c4-d5e6-47f8-9101-1a2b3c4d5e6f', '토큰 갱신 기능 추가', FALSE, 2, '2025-01-18T12:00:00Z', '2025-01-18T12:00:00Z'),
    ('s3c4d5e6-f708-4901-7321-3c4d5e6f7081', 'f1a2b3c4-d5e6-47f8-9101-1a2b3c4d5e6f', '보안 테스트', FALSE, 3, '2025-01-19T10:00:00Z', '2025-01-19T10:00:00Z'),
    ('s4d5e6f7-0819-4a21-6432-4d5e6f708192', 'f1a2b3c4-d5e6-47f8-9101-1a2b3c4d5e6f', '문서화 업데이트', FALSE, 4, '2025-01-20T14:00:00Z', '2025-01-20T14:00:00Z'),
    
    -- WEB-102 서브태스크
    ('s5e6f708-192a-4b32-5543-5e6f708192a3', 'f2b3c4d5-e6f7-4809-8210-2b3c4d5e6f70', '데이터베이스 인덱스 추가', TRUE, 1, '2025-01-16T11:30:00Z', '2025-01-17T14:00:00Z'),
    ('s6f70819-2a3b-4c43-6654-6f708192a3b4', 'f2b3c4d5-e6f7-4809-8210-2b3c4d5e6f70', '슬로우 쿼리 분석', FALSE, 2, '2025-01-17T15:00:00Z', '2025-01-17T15:00:00Z'),
    ('s7g8192a-3b4c-4d55-7765-708192a3b4c5', 'f2b3c4d5-e6f7-4809-8210-2b3c4d5e6f70', '쿼리 최적화 실행', FALSE, 3, '2025-01-18T09:00:00Z', '2025-01-18T09:00:00Z'),
    
    -- WEB-103 서브태스크
    ('s8h92a3b-4c5d-4e66-8876-8192a3b4c5d6', 'f3c4d5e6-f708-4910-7321-3c4d5e6f7081', 'useIssues 훅 테스트 작성', TRUE, 1, '2025-01-17T13:30:00Z', '2025-01-18T10:00:00Z'),
    ('s9i03b4c-5d6e-4f77-9987-92a3b4c5d6e7', 'f3c4d5e6-f708-4910-7321-3c4d5e6f7081', 'useProjects 훅 테스트 작성', TRUE, 2, '2025-01-18T11:00:00Z', '2025-01-19T09:00:00Z'),
    ('s0j14c5d-6e7f-4088-0098-03b4c5d6e7f8', 'f3c4d5e6-f708-4910-7321-3c4d5e6f7081', '통합 테스트 작성', FALSE, 3, '2025-01-19T10:00:00Z', '2025-01-19T10:00:00Z');
  
  -- ============================================
  -- 11. 댓글 (comments)
  -- ============================================
  
  INSERT INTO public.comments (id, issue_id, author_id, content, created_at, updated_at)
  VALUES
    -- WEB-101 댓글
    ('c1a2b3c4-d5e6-4789-9101-1a2b3c4d5e6f', 'f1a2b3c4-d5e6-47f8-9101-1a2b3c4d5e6f', user_dev_lead, 'Supabase Auth의 세션 관리 기능을 활용하면 더 안전하게 구현할 수 있을 것 같습니다.', '2025-01-15T10:00:00Z', '2025-01-15T10:00:00Z'),
    ('c2b3c4d5-e6f7-4890-8210-2b3c4d5e6f70', 'f1a2b3c4-d5e6-47f8-9101-1a2b3c4d5e6f', user_dev_1, '토큰 갱신 로직은 클라이언트 사이드에서 자동으로 처리되도록 구현하겠습니다.', '2025-01-16T14:00:00Z', '2025-01-16T14:00:00Z'),
    ('c3c4d5e6-f708-4901-7321-3c4d5e6f7081', 'f1a2b3c4-d5e6-47f8-9101-1a2b3c4d5e6f', user_dev_2, '보안 테스트는 OWASP Top 10을 기준으로 진행하면 좋을 것 같습니다.', '2025-01-17T11:00:00Z', '2025-01-17T11:00:00Z'),
    
    -- WEB-102 댓글
    ('c4d5e6f7-0819-4a21-6432-4d5e6f708192', 'f2b3c4d5-e6f7-4809-8210-2b3c4d5e6f70', user_dev_lead, '인덱스 추가 전에 EXPLAIN ANALYZE로 쿼리 실행 계획을 확인하는 것이 좋겠습니다.', '2025-01-16T12:00:00Z', '2025-01-16T12:00:00Z'),
    ('c5e6f708-192a-4b32-5543-5e6f708192a3', 'f2b3c4d5-e6f7-4809-8210-2b3c4d5e6f70', user_dev_2, '슬로우 쿼리 로그를 분석해서 가장 자주 실행되는 쿼리부터 최적화하겠습니다.', '2025-01-17T09:00:00Z', '2025-01-17T09:00:00Z'),
    
    -- WEB-103 댓글
    ('c6f70819-2a3b-4c43-6654-6f708192a3b4', 'f3c4d5e6-f708-4910-7321-3c4d5e6f7081', user_dev_3, '테스트 커버리지 목표는 80% 이상으로 설정하겠습니다.', '2025-01-17T14:00:00Z', '2025-01-17T14:00:00Z'),
    
    -- MOB-202 댓글
    ('c7g8192a-3b4c-4d55-7765-708192a3b4c5', 'm2b3c4d5-e6f7-4890-8210-2b3c4d5e6f70', user_design_lead, '모바일 네비게이션은 사용자 플로우를 고려해서 설계해야 합니다. 사용자 테스트도 진행하면 좋겠습니다.', '2025-01-19T11:00:00Z', '2025-01-19T11:00:00Z');
  
  -- ============================================
  -- 12. 알림 (notifications)
  -- ============================================
  
  INSERT INTO public.notifications (id, user_id, type, target_id, description, read_at, created_at)
  VALUES
    -- user_dev_1 알림
    ('n1a2b3c4-d5e6-4789-9101-1a2b3c4d5e6f', user_dev_1, 'ISSUE_ASSIGNED', 'f1a2b3c4-d5e6-47f8-9101-1a2b3c4d5e6f', 'WEB-101 로그인 기능 개선 이슈에 담당자로 지정되었습니다.', NULL, '2025-01-15T09:15:00Z'),
    ('n2b3c4d5-e6f7-4890-8210-2b3c4d5e6f70', user_dev_1, 'COMMENT_MENTIONED', 'c1a2b3c4-d5e6-4789-9101-1a2b3c4d5e6f', 'WEB-101 이슈에서 댓글이 작성되었습니다.', '2025-01-15T10:30:00Z', '2025-01-15T10:00:00Z'),
    ('n3c4d5e6-f708-4901-7321-3c4d5e6f7081', user_dev_1, 'ISSUE_ASSIGNED', 'f5e6f708-192a-4b32-5543-5e6f708192a3', 'WEB-105 프로필 페이지 생성 이슈에 담당자로 지정되었습니다.', NULL, '2025-01-22T09:35:00Z'),
    
    -- user_dev_2 알림
    ('n4d5e6f7-0819-4a21-6432-4d5e6f708192', user_dev_2, 'ISSUE_ASSIGNED', 'f2b3c4d5-e6f7-4809-8210-2b3c4d5e6f70', 'WEB-102 API 응답 시간 최적화 이슈에 담당자로 지정되었습니다.', '2025-01-16T11:25:00Z', '2025-01-16T11:20:00Z'),
    ('n5e6f708-192a-4b32-5543-5e6f708192a3', user_dev_2, 'ISSUE_ASSIGNED', 'f6f70819-2a3b-4c43-6654-6f708192a3b4', 'WEB-106 칸반 보드 성능 개선 이슈에 담당자로 지정되었습니다.', NULL, '2025-01-23T14:05:00Z'),
    
    -- user_dev_3 알림
    ('n6f70819-2a3b-4c43-6654-6f708192a3b4', user_dev_3, 'ISSUE_ASSIGNED', 'f3c4d5e6-f708-4910-7321-3c4d5e6f7081', 'WEB-103 테스트 코드 작성 이슈에 담당자로 지정되었습니다.', '2025-01-17T13:20:00Z', '2025-01-17T13:15:00Z'),
    ('n7g8192a-3b4c-4d55-7765-708192a3b4c5', user_dev_3, 'ISSUE_ASSIGNED', 'm1a2b3c4-d5e6-4789-9101-1a2b3c4d5e6f', 'MOB-201 UI 디자인 개선 이슈에 담당자로 지정되었습니다.', '2025-01-10T08:05:00Z', '2025-01-10T08:00:00Z'),
    
    -- user_design_1 알림
    ('n8h92a3b-4c5d-4e66-8876-8192a3b4c5d6', user_design_1, 'ISSUE_ASSIGNED', 'd1a2b3c4-d5e6-4789-9101-1a2b3c4d5e6f', 'DS-301 컴포넌트 문서화 이슈에 담당자로 지정되었습니다.', NULL, '2025-01-18T10:45:00Z'),
    
    -- user_design_2 알림
    ('n9i03b4c-5d6e-4f77-9987-92a3b4c5d6e7', user_design_2, 'ISSUE_ASSIGNED', 'd2b3c4d5-e6f7-4890-8210-2b3c4d5e6f70', 'DS-302 색상 시스템 정리 이슈에 담당자로 지정되었습니다.', '2025-01-20T13:05:00Z', '2025-01-20T13:00:00Z');
  
  -- ============================================
  -- 13. 활동 로그 (activities)
  -- ============================================
  
  INSERT INTO public.activities (id, team_id, user_id, type, target_id, description, created_at)
  VALUES
    -- 개발팀 활동
    ('a1a2b3c4-d5e6-4789-9101-1a2b3c4d5e6f', '3f3a2b0e-6a2d-4c1a-9b11-1a2b3c4d5e6f', user_dev_lead, 'TEAM_CREATED', '3f3a2b0e-6a2d-4c1a-9b11-1a2b3c4d5e6f', '개발팀이 생성되었습니다.', '2025-01-01T09:00:00Z'),
    ('a2b3c4d5-e6f7-4890-8210-2b3c4d5e6f70', '3f3a2b0e-6a2d-4c1a-9b11-1a2b3c4d5e6f', user_dev_lead, 'PROJECT_CREATED', 'a1f5c3e2-9b8d-4a6f-91c2-3d4e5f6a7b8c', 'SumUp 웹앱 프로젝트가 생성되었습니다.', '2025-01-10T09:00:00Z'),
    ('a3c4d5e6-f708-4901-7321-3c4d5e6f7081', '3f3a2b0e-6a2d-4c1a-9b11-1a2b3c4d5e6f', user_dev_1, 'MEMBER_ADDED', user_dev_1::text, 'user_dev_1이 팀에 추가되었습니다.', '2025-01-02T10:00:00Z'),
    ('a4d5e6f7-0819-4a21-6432-4d5e6f708192', '3f3a2b0e-6a2d-4c1a-9b11-1a2b3c4d5e6f', user_dev_lead, 'PROJECT_ARCHIVED', 'c3d7e5f4-7d6c-48b4-73e4-5f6a7b8c9d0e', 'API 서버 프로젝트가 아카이브되었습니다.', '2025-01-22T16:00:00Z'),
    
    -- 디자인팀 활동
    ('a5e6f708-192a-4b32-5543-5e6f708192a3', '8b9c7d1e-2f3a-4b5c-8d9e-0f1a2b3c4d5e', user_design_lead, 'TEAM_CREATED', '8b9c7d1e-2f3a-4b5c-8d9e-0f1a2b3c4d5e', '디자인팀이 생성되었습니다.', '2025-01-05T10:00:00Z'),
    ('a6f70819-2a3b-4c43-6654-6f708192a3b4', '8b9c7d1e-2f3a-4b5c-8d9e-0f1a2b3c4d5e', user_design_lead, 'PROJECT_CREATED', 'e5d9a7b6-5f4e-46d2-55f6-7a8b9c0d1e2f', '디자인 시스템 프로젝트가 생성되었습니다.', '2025-01-11T13:00:00Z'),
    
    -- QA팀 활동
    ('a7g8192a-3b4c-4d55-7765-708192a3b4c5', '9c0d1e2f-3a4b-4c5d-9e0f-1a2b3c4d5e6f', user_qa_lead, 'TEAM_CREATED', '9c0d1e2f-3a4b-4c5d-9e0f-1a2b3c4d5e6f', 'QA팀이 생성되었습니다.', '2025-01-08T11:00:00Z');
  
  -- ============================================
  -- 14. 이슈 히스토리 (issue_history)
  -- ============================================
  
  INSERT INTO public.issue_history (id, issue_id, field, old_value, new_value, user_id, created_at)
  VALUES
    -- WEB-101 히스토리
    ('h1a2b3c4-d5e6-4789-9101-1a2b3c4d5e6f', 'f1a2b3c4-d5e6-47f8-9101-1a2b3c4d5e6f', 'status', 'TODO', 'IN_PROGRESS', user_dev_1, '2025-01-16T09:00:00Z'),
    ('h2b3c4d5-e6f7-4890-8210-2b3c4d5e6f70', 'f1a2b3c4-d5e6-47f8-9101-1a2b3c4d5e6f', 'assignee', NULL, user_dev_1::text, user_dev_lead, '2025-01-15T09:15:00Z'),
    ('h3c4d5e6-f708-4901-7321-3c4d5e6f7081', 'f1a2b3c4-d5e6-47f8-9101-1a2b3c4d5e6f', 'priority', 'MEDIUM', 'HIGH', user_dev_lead, '2025-01-15T09:12:00Z'),
    
    -- WEB-102 히스토리
    ('h4d5e6f7-0819-4a21-6432-4d5e6f708192', 'f2b3c4d5-e6f7-4809-8210-2b3c4d5e6f70', 'assignee', NULL, user_dev_2::text, user_dev_lead, '2025-01-16T11:20:00Z'),
    
    -- WEB-103 히스토리
    ('h5e6f708-192a-4b32-5543-5e6f708192a3', 'f3c4d5e6-f708-4910-7321-3c4d5e6f7081', 'status', 'IN_PROGRESS', 'IN_REVIEW', user_dev_3, '2025-01-19T09:00:00Z'),
    ('h6f70819-2a3b-4c43-6654-6f708192a3b4', 'f3c4d5e6-f708-4910-7321-3c4d5e6f7081', 'assignee', NULL, user_dev_3::text, user_dev_lead, '2025-01-17T13:15:00Z'),
    
    -- MOB-201 히스토리
    ('h7g8192a-3b4c-4d55-7765-708192a3b4c5', 'm1a2b3c4-d5e6-4789-9101-1a2b3c4d5e6f', 'status', 'IN_PROGRESS', 'DONE', user_dev_3, '2025-01-18T14:30:00Z'),
    
    -- MOB-202 히스토리
    ('h8h92a3b-4c5d-4e66-8876-8192a3b4c5d6', 'm2b3c4d5-e6f7-4890-8210-2b3c4d5e6f70', 'status', 'TODO', 'IN_PROGRESS', user_dev_1, '2025-01-20T10:00:00Z'),
    ('h9i03b4c-5d6e-4f77-9987-92a3b4c5d6e7', 'm2b3c4d5-e6f7-4890-8210-2b3c4d5e6f70', 'assignee', NULL, user_dev_1::text, user_dev_lead, '2025-01-19T10:05:00Z');
  
  -- ============================================
  -- 15. 사용자 환경설정 (user_preferences)
  -- ============================================
  
  INSERT INTO public.user_preferences (id, user_id, theme, language, time_zone, notification_settings, created_at, updated_at)
  VALUES
    ('p1a2b3c4-d5e6-4789-9101-1a2b3c4d5e6f', user_dev_lead, 'dark', 'ko', 'Asia/Seoul', '{"email": true, "push": true, "mention": true}'::jsonb, '2025-01-01T09:00:00Z', '2025-01-01T09:00:00Z'),
    ('p2b3c4d5-e6f7-4890-8210-2b3c4d5e6f70', user_dev_1, 'light', 'ko', 'Asia/Seoul', '{"email": true, "push": false, "mention": true}'::jsonb, '2025-01-02T10:00:00Z', '2025-01-02T10:00:00Z'),
    ('p3c4d5e6-f708-4901-7321-3c4d5e6f7081', user_dev_2, 'system', 'ko', 'Asia/Seoul', '{"email": false, "push": true, "mention": true}'::jsonb, '2025-01-03T11:00:00Z', '2025-01-03T11:00:00Z'),
    ('p4d5e6f7-0819-4a21-6432-4d5e6f708192', user_design_lead, 'dark', 'ko', 'Asia/Seoul', '{"email": true, "push": true, "mention": true}'::jsonb, '2025-01-05T10:00:00Z', '2025-01-05T10:00:00Z');
  
END $$;

-- ============================================
-- 완료!
-- ============================================
-- 이제 Table Editor에서 모든 테이블의 데이터를 확인할 수 있습니다.
-- 
-- 주의: 사용자 ID는 실제 auth.users에서 생성된 UUID로 교체해야 합니다.
-- 시드 데이터 실행 전에 다음 단계를 수행하세요:
-- 1. Supabase Auth에서 테스트 사용자 생성
-- 2. 생성된 사용자 UUID를 위의 사용자 ID 변수에 대입
-- 3. 시드 데이터 실행

