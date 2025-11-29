-- ============================================
-- SumUp 추가 스키마 마이그레이션
-- - 이슈 첨부파일(issue_attachments)
-- - 사용자 환경설정(user_preferences)
--
-- 이미 배포된 Supabase 인스턴스를 위해 schema.sql 전체를
-- 다시 실행하는 대신, 이 파일을 별도 마이그레이션으로 실행하세요.
-- ============================================

-- ============================================
-- 1. 이슈 첨부파일 테이블 (issue_attachments)
-- --------------------------------------------
-- 코드 기준:
-- - src/types/index.ts 의 IssueAttachment 타입
-- - Issue.attachments?: IssueAttachment[]
-- - IssueAttachments 컴포넌트, FileUpload 컴포넌트
-- ============================================

CREATE TABLE IF NOT EXISTS public.issue_attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_id UUID REFERENCES public.issues(id) ON DELETE CASCADE NOT NULL,
  file_name TEXT NOT NULL,
  file_size BIGINT NOT NULL,         -- bytes
  file_type TEXT NOT NULL,           -- MIME type
  file_url TEXT NOT NULL,            -- Supabase Storage 경로 또는 공개 URL
  uploaded_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_issue_attachments_issue ON public.issue_attachments(issue_id);
CREATE INDEX IF NOT EXISTS idx_issue_attachments_uploader ON public.issue_attachments(uploaded_by);

-- RLS 활성화
ALTER TABLE public.issue_attachments ENABLE ROW LEVEL SECURITY;

-- 댓글(comments) 정책을 참고하여, 이슈를 볼 수 있는 사용자는 첨부파일도 조회 가능하도록 정책 추가
CREATE POLICY IF NOT EXISTS "Users can view issue attachments" ON public.issue_attachments
  FOR SELECT USING (
    EXISTS (
      SELECT 1
      FROM public.issues i
      JOIN public.projects p ON p.id = i.project_id
      JOIN public.team_members tm ON tm.team_id = p.team_id
      WHERE i.id = issue_attachments.issue_id
      AND tm.user_id = auth.uid()
    )
  );

-- (필요 시) 업로더 본인 또는 프로젝트 관리자만 삭제/수정 가능 등의 추가 정책은
-- 실제 권한 설계가 정해진 뒤 추가할 수 있습니다.


-- ============================================
-- 2. 사용자 환경설정 테이블 (user_preferences)
-- --------------------------------------------
-- PRD 기준:
-- - 설정 페이지: 테마, 언어, 사용자 환경 설정
-- 코드 기준:
-- - preferences-store (클라이언트 상태)를 서버에 영속화하기 위한 기반 테이블
-- ============================================

CREATE TABLE IF NOT EXISTS public.user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  theme TEXT DEFAULT 'system' CHECK (theme IN ('light', 'dark', 'system')),
  language TEXT DEFAULT 'ko',
  time_zone TEXT,
  notification_settings JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

CREATE INDEX IF NOT EXISTS idx_user_preferences_user ON public.user_preferences(user_id);

-- RLS 활성화
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- 본인 환경설정만 조회/수정 가능
CREATE POLICY IF NOT EXISTS "Users can manage their own preferences" ON public.user_preferences
  FOR ALL USING (auth.uid() = user_id);

-- update_updated_at_column() 함수는 schema.sql 에서 이미 정의되어 있다고 가정
-- updated_at 자동 업데이트 트리거 추가
CREATE TRIGGER update_user_preferences_updated_at
  BEFORE UPDATE ON public.user_preferences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- ============================================
-- 완료
-- ============================================


