-- ============================================
-- 이슈 변경 히스토리 테이블 추가
-- 마이그레이션: 2025-11-29
-- ============================================
-- 이슈의 필드 변경 이력을 기록하는 테이블
-- 이슈 제목, 설명, 상태, 우선순위, 담당자, 마감일 등의 변경을 추적

-- issue_history 테이블 생성
CREATE TABLE IF NOT EXISTS public.issue_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_id UUID REFERENCES public.issues(id) ON DELETE CASCADE NOT NULL,
  field TEXT NOT NULL,                    -- 변경된 필드명 (title, status, priority, assignee, dueDate 등)
  old_value TEXT,                         -- 변경 전 값
  new_value TEXT,                         -- 변경 후 값
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,  -- 변경한 사용자
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_issue_history_issue ON public.issue_history(issue_id);
CREATE INDEX IF NOT EXISTS idx_issue_history_user ON public.issue_history(user_id);
CREATE INDEX IF NOT EXISTS idx_issue_history_created ON public.issue_history(created_at DESC);

-- RLS 활성화
ALTER TABLE public.issue_history ENABLE ROW LEVEL SECURITY;

-- RLS 정책: 이슈를 볼 수 있는 사용자만 히스토리 조회 가능
DROP POLICY IF EXISTS "Users can view issue history" ON public.issue_history;
CREATE POLICY "Users can view issue history" ON public.issue_history
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.issues i
      WHERE i.id = issue_history.issue_id
      AND (
        -- 이슈가 속한 프로젝트의 팀 멤버인 경우
        EXISTS (
          SELECT 1 FROM public.projects p
          JOIN public.team_members tm ON tm.team_id = p.team_id
          WHERE p.id = i.project_id
          AND tm.user_id = auth.uid()
        )
        OR
        -- 이슈 담당자인 경우
        i.assignee_id = auth.uid()
      )
    )
  );

-- RLS 정책: 시스템만 히스토리 생성 가능 (API를 통해서만)
DROP POLICY IF EXISTS "System can create issue history" ON public.issue_history;
CREATE POLICY "System can create issue history" ON public.issue_history
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);  -- 인증된 사용자만 (API에서 자동 생성)

-- 코멘트
COMMENT ON TABLE public.issue_history IS '이슈 변경 히스토리 테이블 - 이슈의 필드 변경 이력을 기록';
COMMENT ON COLUMN public.issue_history.field IS '변경된 필드명 (title, description, status, priority, assignee, dueDate 등)';
COMMENT ON COLUMN public.issue_history.old_value IS '변경 전 값 (NULL 가능)';
COMMENT ON COLUMN public.issue_history.new_value IS '변경 후 값 (NULL 가능)';

