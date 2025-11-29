-- ============================================
-- 커스텀 컬럼 및 WIP Limit 테이블 생성 (FR-053, FR-054)
-- ============================================
-- 작성일: 2025-11-29
-- 목적: 프로젝트별 커스텀 상태 및 WIP Limit 관리

-- ============================================
-- 0. issues 테이블의 status CHECK 제약조건 제거
-- ============================================
-- 커스텀 상태를 사용하기 위해 기본 상태만 허용하는 제약조건 제거
ALTER TABLE public.issues DROP CONSTRAINT IF EXISTS issues_status_check;

-- ============================================
-- 1. custom_statuses 테이블 (FR-053)
-- ============================================
CREATE TABLE IF NOT EXISTS public.custom_statuses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL CHECK (char_length(name) >= 1 AND char_length(name) <= 30),
  color TEXT, -- HEX 색상 코드 (선택)
  position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, name)
);

-- 인덱스
CREATE INDEX IF NOT EXISTS idx_custom_statuses_project ON public.custom_statuses(project_id);
CREATE INDEX IF NOT EXISTS idx_custom_statuses_position ON public.custom_statuses(project_id, position);

-- updated_at 자동 업데이트 트리거
CREATE TRIGGER update_custom_statuses_updated_at BEFORE UPDATE ON public.custom_statuses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS 활성화
ALTER TABLE public.custom_statuses ENABLE ROW LEVEL SECURITY;

-- RLS 정책: 프로젝트 팀 멤버만 조회/수정 가능
DROP POLICY IF EXISTS "Team members can view custom statuses" ON public.custom_statuses;
CREATE POLICY "Team members can view custom statuses" ON public.custom_statuses
  FOR SELECT USING (
    EXISTS (
      SELECT 1
      FROM public.projects p
      JOIN public.team_members tm ON tm.team_id = p.team_id
      WHERE p.id = custom_statuses.project_id
      AND tm.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Team admins can manage custom statuses" ON public.custom_statuses;
CREATE POLICY "Team admins can manage custom statuses" ON public.custom_statuses
  FOR ALL USING (
    EXISTS (
      SELECT 1
      FROM public.projects p
      JOIN public.team_members tm ON tm.team_id = p.team_id
      WHERE p.id = custom_statuses.project_id
      AND tm.user_id = auth.uid()
      AND tm.role IN ('OWNER', 'ADMIN')
    )
  );

-- ============================================
-- 2. project_wip_limits 테이블 (FR-054)
-- ============================================
CREATE TABLE IF NOT EXISTS public.project_wip_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL, -- 기본 상태 (TODO, IN_PROGRESS, IN_REVIEW, DONE) 또는 custom_statuses.id
  wip_limit INTEGER CHECK (wip_limit >= 1 AND wip_limit <= 50),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, status)
);

-- 인덱스
CREATE INDEX IF NOT EXISTS idx_project_wip_limits_project ON public.project_wip_limits(project_id);
CREATE INDEX IF NOT EXISTS idx_project_wip_limits_status ON public.project_wip_limits(project_id, status);

-- updated_at 자동 업데이트 트리거
CREATE TRIGGER update_project_wip_limits_updated_at BEFORE UPDATE ON public.project_wip_limits
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS 활성화
ALTER TABLE public.project_wip_limits ENABLE ROW LEVEL SECURITY;

-- RLS 정책: 프로젝트 팀 멤버만 조회/수정 가능
DROP POLICY IF EXISTS "Team members can view wip limits" ON public.project_wip_limits;
CREATE POLICY "Team members can view wip limits" ON public.project_wip_limits
  FOR SELECT USING (
    EXISTS (
      SELECT 1
      FROM public.projects p
      JOIN public.team_members tm ON tm.team_id = p.team_id
      WHERE p.id = project_wip_limits.project_id
      AND tm.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Team admins can manage wip limits" ON public.project_wip_limits;
CREATE POLICY "Team admins can manage wip limits" ON public.project_wip_limits
  FOR ALL USING (
    EXISTS (
      SELECT 1
      FROM public.projects p
      JOIN public.team_members tm ON tm.team_id = p.team_id
      WHERE p.id = project_wip_limits.project_id
      AND tm.user_id = auth.uid()
      AND tm.role IN ('OWNER', 'ADMIN')
    )
  );

