-- ============================================
-- SumUp 기능 추가 마이그레이션
-- - 이슈 변경 히스토리(issue_history) - FR-039
-- - 팀 활동 로그(activities) - FR-019
--
-- 작성일: 2025-11-29
-- ============================================

-- ============================================
-- 1. 이슈 변경 히스토리 테이블 (issue_history)
-- --------------------------------------------
-- 기능: FR-039 - 이슈 변경 히스토리
-- 코드 기준:
-- - src/types/index.ts 의 IssueHistory 타입
-- - src/app/api/issues/[id]/history/route.ts
-- - src/components/issue/IssueHistory.tsx
-- ============================================

CREATE TABLE IF NOT EXISTS public.issue_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_id UUID REFERENCES public.issues(id) ON DELETE CASCADE NOT NULL,
  field TEXT NOT NULL CHECK (field IN ('title', 'description', 'status', 'priority', 'assignee', 'dueDate', 'labels', 'created', 'deleted')),
  old_value TEXT,
  new_value TEXT,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_issue_history_issue ON public.issue_history(issue_id);
CREATE INDEX IF NOT EXISTS idx_issue_history_user ON public.issue_history(user_id);
CREATE INDEX IF NOT EXISTS idx_issue_history_created ON public.issue_history(created_at DESC);

-- RLS 활성화
ALTER TABLE public.issue_history ENABLE ROW LEVEL SECURITY;

-- 이슈를 볼 수 있는 사용자는 히스토리도 조회 가능
CREATE POLICY IF NOT EXISTS "Users can view issue history" ON public.issue_history
  FOR SELECT USING (
    EXISTS (
      SELECT 1
      FROM public.issues i
      JOIN public.projects p ON p.id = i.project_id
      JOIN public.team_members tm ON tm.team_id = p.team_id
      WHERE i.id = issue_history.issue_id
      AND tm.user_id = auth.uid()
      AND i.deleted_at IS NULL
    )
  );

-- 이슈를 수정할 수 있는 사용자는 히스토리도 생성 가능
CREATE POLICY IF NOT EXISTS "Users can create issue history" ON public.issue_history
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.issues i
      JOIN public.projects p ON p.id = i.project_id
      JOIN public.team_members tm ON tm.team_id = p.team_id
      WHERE i.id = issue_history.issue_id
      AND tm.user_id = auth.uid()
      AND i.deleted_at IS NULL
    )
  );


-- ============================================
-- 2. 팀 활동 로그 테이블 (activities)
-- --------------------------------------------
-- 기능: FR-019 - 팀 활동 로그
-- 코드 기준:
-- - src/types/index.ts 의 TeamActivity 타입
-- - src/app/api/teams/[id]/activities/route.ts
-- - src/components/team/TeamActivityLog.tsx
-- - src/lib/utils/team-activity.ts
-- ============================================

CREATE TABLE IF NOT EXISTS public.activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  type TEXT NOT NULL CHECK (type IN (
    'TEAM_CREATED',
    'TEAM_UPDATED',
    'TEAM_DELETED',
    'MEMBER_ADDED',
    'MEMBER_REMOVED',
    'MEMBER_ROLE_CHANGED',
    'PROJECT_CREATED',
    'PROJECT_DELETED'
  )),
  target_id TEXT NOT NULL, -- 관련 엔티티 ID (팀 ID, 프로젝트 ID, 사용자 ID 등)
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_activities_team ON public.activities(team_id);
CREATE INDEX IF NOT EXISTS idx_activities_user ON public.activities(user_id);
CREATE INDEX IF NOT EXISTS idx_activities_type ON public.activities(type);
CREATE INDEX IF NOT EXISTS idx_activities_created ON public.activities(created_at DESC);

-- RLS 활성화
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

-- 팀 멤버는 활동 로그 조회 가능
CREATE POLICY IF NOT EXISTS "Team members can view activities" ON public.activities
  FOR SELECT USING (
    EXISTS (
      SELECT 1
      FROM public.team_members tm
      WHERE tm.team_id = activities.team_id
      AND tm.user_id = auth.uid()
    )
  );

-- 팀 멤버는 활동 로그 생성 가능
CREATE POLICY IF NOT EXISTS "Team members can create activities" ON public.activities
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.team_members tm
      WHERE tm.team_id = activities.team_id
      AND tm.user_id = auth.uid()
    )
  );


-- ============================================
-- 완료
-- ============================================

