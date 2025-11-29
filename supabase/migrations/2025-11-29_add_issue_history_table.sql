-- ============================================
-- 이슈 변경 히스토리 테이블 생성 (FR-039)
-- ============================================
-- 작성일: 2025-11-29
-- 목적: 이슈의 변경 이력을 추적하기 위한 테이블

CREATE TABLE IF NOT EXISTS public.issue_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_id UUID REFERENCES public.issues(id) ON DELETE CASCADE NOT NULL,
  field TEXT NOT NULL CHECK (field IN (
    'title',
    'description',
    'status',
    'priority',
    'assignee',
    'dueDate',
    'labels',
    'created',
    'deleted'
  )),
  old_value TEXT,
  new_value TEXT,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스
CREATE INDEX IF NOT EXISTS idx_issue_history_issue ON public.issue_history(issue_id);
CREATE INDEX IF NOT EXISTS idx_issue_history_user ON public.issue_history(user_id);
CREATE INDEX IF NOT EXISTS idx_issue_history_created ON public.issue_history(created_at DESC);

-- RLS 활성화
ALTER TABLE public.issue_history ENABLE ROW LEVEL SECURITY;

-- RLS 정책: 이슈를 볼 수 있는 사용자만 조회 가능
DROP POLICY IF EXISTS "Users can view issue history" ON public.issue_history;
CREATE POLICY "Users can view issue history" ON public.issue_history
  FOR SELECT USING (
    EXISTS (
      SELECT 1
      FROM public.issues i
      JOIN public.projects p ON p.id = i.project_id
      JOIN public.team_members tm ON tm.team_id = p.team_id
      WHERE i.id = issue_history.issue_id
      AND tm.user_id = auth.uid()
    )
  );

-- RLS 정책: 시스템에서만 삽입 가능 (API Routes에서만 사용)
-- INSERT는 서버 사이드에서만 수행되므로 별도 정책 불필요
-- 필요시 서비스 역할 키를 사용하여 삽입

