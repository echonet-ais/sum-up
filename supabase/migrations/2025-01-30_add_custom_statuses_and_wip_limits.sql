-- ============================================
-- 커스텀 컬럼(커스텀 상태) 및 WIP Limit 기능 추가
-- ============================================
-- FR-053: 커스텀 컬럼 (Custom Status)
-- FR-054: WIP Limit (Work In Progress Limit)

-- 1. projects 테이블에 커스텀 상태 및 WIP Limit 필드 추가
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS custom_statuses JSONB DEFAULT NULL,
ADD COLUMN IF NOT EXISTS wip_limits JSONB DEFAULT NULL;

-- custom_statuses 형식:
-- [
--   { "id": "custom-1", "name": "커스텀 상태 1", "position": 0, "color": "#FF0000" },
--   { "id": "custom-2", "name": "커스텀 상태 2", "position": 1, "color": "#00FF00" }
-- ]

-- wip_limits 형식:
-- {
--   "TODO": 10,
--   "IN_PROGRESS": 5,
--   "IN_REVIEW": 3,
--   "DONE": null  // null이면 제한 없음
-- }

-- 2. 인덱스 추가 (JSONB 필드 검색 최적화)
CREATE INDEX IF NOT EXISTS idx_projects_custom_statuses ON public.projects USING GIN (custom_statuses);
CREATE INDEX IF NOT EXISTS idx_projects_wip_limits ON public.projects USING GIN (wip_limits);

-- 3. 커스텀 상태를 위한 뷰 생성 (선택 사항)
-- 이 뷰는 프로젝트의 기본 상태와 커스텀 상태를 통합하여 보여줍니다
CREATE OR REPLACE VIEW public.project_statuses AS
SELECT 
  p.id as project_id,
  p.name as project_name,
  CASE 
    WHEN p.custom_statuses IS NOT NULL AND jsonb_array_length(p.custom_statuses) > 0 
    THEN p.custom_statuses
    ELSE jsonb_build_array(
      jsonb_build_object('id', 'todo', 'name', '할 일', 'position', 0, 'color', '#94a3b8'),
      jsonb_build_object('id', 'in_progress', 'name', '진행 중', 'position', 1, 'color', '#3b82f6'),
      jsonb_build_object('id', 'in_review', 'name', '검토 중', 'position', 2, 'color', '#f59e0b'),
      jsonb_build_object('id', 'done', 'name', '완료', 'position', 3, 'color', '#10b981')
    )
  END as statuses
FROM public.projects p
WHERE p.deleted_at IS NULL;

-- ============================================
-- 완료
-- ============================================
-- 이제 프로젝트별로 커스텀 상태와 WIP Limit을 설정할 수 있습니다.

