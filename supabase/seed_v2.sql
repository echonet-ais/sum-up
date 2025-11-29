-- ============================================
-- SumUp 데모용 시드 데이터 (v2: 라벨/매핑/추가 이슈)
-- ============================================
-- Supabase 대시보드 SQL Editor에서 실행하세요
-- schema.sql, seed.sql 실행 이후 추가로 실행하는 보강 시드입니다.
-- 주의: auth.users / public.users 를 사용하므로 사용자 관련 FK는 사용하지 않습니다.
-- ============================================

-- 프로젝트/이슈 ID는 seed.sql에서 생성한 값을 그대로 사용합니다.
-- projects
--  a1f5c3e2-9b8d-4a6f-91c2-3d4e5f6a7b8c  (SumUp 웹앱)
--  b2e6d4f3-8c7b-49a5-82d3-4e5f6a7b8c9d  (모바일 앱)
--  d4c8f6a5-6e5d-47c3-64f5-6a7b8c9d0e1f  (디자인 시스템)
--
-- issues (일부 예시)
--  f1a2b3c4-d5e6-47f8-9101-1a2b3c4d5e6f  (웹앱: 로그인 개선)
--  f2b3c4d5-e6f7-4809-8210-2b3c4d5e6f70  (웹앱: API 최적화)
--  f3c4d5e6-f708-4910-7321-3c4d5e6f7081  (모바일: UI 개선)
--  f5e6f708-192a-4b32-5543-5e6f708192a3  (디자인 시스템: 컴포넌트 문서화)

-- ============================================
-- 1) 프로젝트 라벨 (issue_labels)
-- ============================================

-- SumUp 웹앱 라벨 (버그/프론트엔드/백엔드/문서)
INSERT INTO public.issue_labels (id, project_id, name, color)
VALUES
  ('0f1a2b3c-4d5e-4789-8abc-def012340001', 'a1f5c3e2-9b8d-4a6f-91c2-3d4e5f6a7b8c', '버그', '#EF4444'),
  ('0f1a2b3c-4d5e-4789-8abc-def012340002', 'a1f5c3e2-9b8d-4a6f-91c2-3d4e5f6a7b8c', '프론트엔드', '#3B82F6'),
  ('0f1a2b3c-4d5e-4789-8abc-def012340003', 'a1f5c3e2-9b8d-4a6f-91c2-3d4e5f6a7b8c', '백엔드', '#A855F7'),
  ('0f1a2b3c-4d5e-4789-8abc-def012340004', 'a1f5c3e2-9b8d-4a6f-91c2-3d4e5f6a7b8c', '문서', '#10B981')
ON CONFLICT (id) DO NOTHING;

-- 모바일 앱 라벨 (프론트엔드/디자인)
INSERT INTO public.issue_labels (id, project_id, name, color)
VALUES
  ('1a2b3c4d-5e6f-4789-9abc-ef0123400001', 'b2e6d4f3-8c7b-49a5-82d3-4e5f6a7b8c9d', '프론트엔드', '#3B82F6'),
  ('1a2b3c4d-5e6f-4789-9abc-ef0123400002', 'b2e6d4f3-8c7b-49a5-82d3-4e5f6a7b8c9d', '디자인', '#F59E0B')
ON CONFLICT (id) DO NOTHING;

-- 디자인 시스템 라벨 (디자인/문서화)
INSERT INTO public.issue_labels (id, project_id, name, color)
VALUES
  ('2b3c4d5e-6f70-4789-aabc-f01234000001', 'd4c8f6a5-6e5d-47c3-64f5-6a7b8c9d0e1f', '디자인', '#F59E0B'),
  ('2b3c4d5e-6f70-4789-aabc-f01234000002', 'd4c8f6a5-6e5d-47c3-64f5-6a7b8c9d0e1f', '문서화', '#10B981')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 2) 라벨 매핑 (issue_label_mappings)
-- ============================================

-- 웹앱: 로그인 개선 → 버그/프론트엔드
INSERT INTO public.issue_label_mappings (id, issue_id, label_id)
VALUES
  ('3c4d5e6f-7081-4789-bbcd-012340000001', 'f1a2b3c4-d5e6-47f8-9101-1a2b3c4d5e6f', '0f1a2b3c-4d5e-4789-8abc-def012340001'),
  ('3c4d5e6f-7081-4789-bbcd-012340000002', 'f1a2b3c4-d5e6-47f8-9101-1a2b3c4d5e6f', '0f1a2b3c-4d5e-4789-8abc-def012340002')
ON CONFLICT (id) DO NOTHING;

-- 웹앱: API 최적화 → 백엔드
INSERT INTO public.issue_label_mappings (id, issue_id, label_id)
VALUES
  ('4d5e6f70-8192-4789-ccde-123400000001', 'f2b3c4d5-e6f7-4809-8210-2b3c4d5e6f70', '0f1a2b3c-4d5e-4789-8abc-def012340003')
ON CONFLICT (id) DO NOTHING;

-- 모바일: UI 개선 → 프론트엔드/디자인
INSERT INTO public.issue_label_mappings (id, issue_id, label_id)
VALUES
  ('5e6f7081-92a3-4789-ddef-234000000001', 'f3c4d5e6-f708-4910-7321-3c4d5e6f7081', '1a2b3c4d-5e6f-4789-9abc-ef0123400001'),
  ('5e6f7081-92a3-4789-ddef-234000000002', 'f3c4d5e6-f708-4910-7321-3c4d5e6f7081', '1a2b3c4d-5e6f-4789-9abc-ef0123400002')
ON CONFLICT (id) DO NOTHING;

-- 디자인 시스템: 컴포넌트 문서화 → 문서화
INSERT INTO public.issue_label_mappings (id, issue_id, label_id)
VALUES
  ('6f708192-a3b4-4789-ee01-340000000001', 'f5e6f708-192a-4b32-5543-5e6f708192a3', '2b3c4d5e-6f70-4789-aabc-f01234000002')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 3) 추가 이슈 (샘플)
-- ============================================

INSERT INTO public.issues (id, title, description, status, priority, project_id, assignee_id, due_date, order_position, created_at, updated_at)
VALUES
  (
    'f6f70819-2a3b-4c43-6654-6f708192a3b4',
    'WEB-104 전역 검색 초기 버전',
    '헤더의 GlobalSearch를 통한 통합 검색(이슈/프로젝트/팀) 1차 구현',
    'TODO',
    'MEDIUM',
    'a1f5c3e2-9b8d-4a6f-91c2-3d4e5f6a7b8c',
    NULL,
    NULL,
    6,
    '2025-01-21T10:00:00Z',
    '2025-01-21T10:00:00Z'
  ),
  (
    'f708192a-3b4c-4d55-7765-708192a3b4c5',
    'WEB-105 프로필 페이지 생성',
    '사용자 프로필 보기/수정(이름/아바타) 및 비밀번호 변경 폼',
    'TODO',
    'LOW',
    'a1f5c3e2-9b8d-4a6f-91c2-3d4e5f6a7b8c',
    NULL,
    NULL,
    7,
    '2025-01-22T09:30:00Z',
    '2025-01-22T09:30:00Z'
  )
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 완료 (v2)
-- ============================================

