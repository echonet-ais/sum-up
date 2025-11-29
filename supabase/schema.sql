-- ============================================
-- SumUp 데이터베이스 스키마 (통합 버전)
-- ============================================
-- Supabase 대시보드의 SQL Editor에서 실행하세요
-- 모든 마이그레이션을 통합한 최신 스키마입니다.
-- ============================================

-- ============================================
-- 1. users 테이블
-- ============================================
-- Supabase Auth의 auth.users와 별도로 프로필 정보를 저장
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar TEXT,
  role TEXT DEFAULT 'MEMBER' CHECK (role IN ('OWNER', 'ADMIN', 'MEMBER')),
  email_confirmed_at TIMESTAMPTZ, -- 마이그레이션: 2025-01-30 추가
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);
CREATE INDEX IF NOT EXISTS idx_users_email_confirmed ON public.users(email_confirmed_at);

-- ============================================
-- 2. teams 테이블
-- ============================================
CREATE TABLE IF NOT EXISTS public.teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  avatar TEXT,
  owner_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_teams_owner ON public.teams(owner_id);

-- ============================================
-- 3. team_members 테이블
-- ============================================
CREATE TABLE IF NOT EXISTS public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL DEFAULT 'MEMBER' CHECK (role IN ('OWNER', 'ADMIN', 'MEMBER')),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(team_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_team_members_team ON public.team_members(team_id);
CREATE INDEX IF NOT EXISTS idx_team_members_user ON public.team_members(user_id);

-- ============================================
-- 4. projects 테이블
-- ============================================
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE NOT NULL,
  is_archived BOOLEAN DEFAULT FALSE,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_team ON public.projects(team_id);
CREATE INDEX IF NOT EXISTS idx_projects_archived ON public.projects(is_archived);

-- ============================================
-- 5. project_favorites 테이블
-- ============================================
CREATE TABLE IF NOT EXISTS public.project_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_project_favorites_user ON public.project_favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_project_favorites_project ON public.project_favorites(project_id);

-- ============================================
-- 6. issues 테이블
-- ============================================
CREATE TABLE IF NOT EXISTS public.issues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'TODO' CHECK (status IN ('TODO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE')),
  priority TEXT NOT NULL DEFAULT 'MEDIUM' CHECK (priority IN ('HIGH', 'MEDIUM', 'LOW')),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  assignee_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  due_date TIMESTAMPTZ,
  order_position INTEGER DEFAULT 0,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_issues_project ON public.issues(project_id);
CREATE INDEX IF NOT EXISTS idx_issues_assignee ON public.issues(assignee_id);
CREATE INDEX IF NOT EXISTS idx_issues_status ON public.issues(status);

-- ============================================
-- 7. issue_labels 테이블
-- ============================================
CREATE TABLE IF NOT EXISTS public.issue_labels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  color TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, name)
);

CREATE INDEX IF NOT EXISTS idx_issue_labels_project ON public.issue_labels(project_id);

-- ============================================
-- 8. issue_label_mappings 테이블
-- ============================================
CREATE TABLE IF NOT EXISTS public.issue_label_mappings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_id UUID REFERENCES public.issues(id) ON DELETE CASCADE NOT NULL,
  label_id UUID REFERENCES public.issue_labels(id) ON DELETE CASCADE NOT NULL,
  UNIQUE(issue_id, label_id)
);

CREATE INDEX IF NOT EXISTS idx_issue_label_mappings_issue ON public.issue_label_mappings(issue_id);
CREATE INDEX IF NOT EXISTS idx_issue_label_mappings_label ON public.issue_label_mappings(label_id);

-- ============================================
-- 9. subtasks 테이블
-- ============================================
CREATE TABLE IF NOT EXISTS public.subtasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_id UUID REFERENCES public.issues(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  order_position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_subtasks_issue ON public.subtasks(issue_id);

-- ============================================
-- 10. comments 테이블
-- ============================================
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_id UUID REFERENCES public.issues(id) ON DELETE CASCADE NOT NULL,
  author_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_comments_issue ON public.comments(issue_id);
CREATE INDEX IF NOT EXISTS idx_comments_author ON public.comments(author_id);

-- ============================================
-- 11. notifications 테이블
-- ============================================
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL,
  target_id TEXT NOT NULL,
  description TEXT NOT NULL,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON public.notifications(user_id, read_at);

-- ============================================
-- 12. activities 테이블
-- ============================================
CREATE TABLE IF NOT EXISTS public.activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  type TEXT NOT NULL,
  target_id TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_activities_team ON public.activities(team_id);
CREATE INDEX IF NOT EXISTS idx_activities_user ON public.activities(user_id);

-- ============================================
-- 13. issue_attachments 테이블
-- ============================================
-- 마이그레이션: 2025-11-29 추가
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

-- ============================================
-- 14. user_preferences 테이블
-- ============================================
-- 마이그레이션: 2025-11-29 추가
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

-- ============================================
-- 15. 함수 정의
-- ============================================

-- updated_at 자동 업데이트 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- email_confirmed_at 동기화 함수 (auth.users -> public.users)
CREATE OR REPLACE FUNCTION sync_email_confirmed_at()
RETURNS TRIGGER AS $$
BEGIN
  -- auth.users의 email_confirmed_at이 변경되면 public.users도 업데이트
  IF NEW.email_confirmed_at IS DISTINCT FROM OLD.email_confirmed_at THEN
    UPDATE public.users
    SET email_confirmed_at = NEW.email_confirmed_at
    WHERE id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 새 사용자 생성 시 email_confirmed_at 동기화 함수
CREATE OR REPLACE FUNCTION sync_new_user_email_confirmed()
RETURNS TRIGGER AS $$
BEGIN
  -- auth.users에 새 사용자가 생성되면 public.users에도 email_confirmed_at 복사
  INSERT INTO public.users (id, email, name, email_confirmed_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    NEW.email_confirmed_at
  )
  ON CONFLICT (id) DO UPDATE
  SET email_confirmed_at = NEW.email_confirmed_at;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 16. 트리거 생성
-- ============================================

-- updated_at 트리거
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teams_updated_at BEFORE UPDATE ON public.teams
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_issues_updated_at BEFORE UPDATE ON public.issues
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subtasks_updated_at BEFORE UPDATE ON public.subtasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON public.comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON public.user_preferences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- email_confirmed_at 동기화 트리거 (auth.users 테이블에)
DROP TRIGGER IF EXISTS sync_email_confirmed_at_trigger ON auth.users;
CREATE TRIGGER sync_email_confirmed_at_trigger
  AFTER UPDATE OF email_confirmed_at ON auth.users
  FOR EACH ROW
  WHEN (NEW.email_confirmed_at IS DISTINCT FROM OLD.email_confirmed_at)
  EXECUTE FUNCTION sync_email_confirmed_at();

DROP TRIGGER IF EXISTS sync_new_user_email_confirmed_trigger ON auth.users;
CREATE TRIGGER sync_new_user_email_confirmed_trigger
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION sync_new_user_email_confirmed();

-- ============================================
-- 17. Row Level Security (RLS) 활성화
-- ============================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.issue_labels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.issue_label_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subtasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.issue_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 18. RLS 정책
-- ============================================

-- users: 본인만 조회/수정 가능, 본인 프로필 생성 가능
-- 마이그레이션: 2025-11-29_fix_users_rls_insert_policy.sql 반영
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.users;
CREATE POLICY "Users can insert their own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- teams: 팀 멤버만 조회 가능, OWNER/ADMIN만 수정 가능
DROP POLICY IF EXISTS "Team members can view their teams" ON public.teams;
CREATE POLICY "Team members can view their teams" ON public.teams
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.team_members
      WHERE team_members.team_id = teams.id
      AND team_members.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Team owners can manage teams" ON public.teams;
CREATE POLICY "Team owners can manage teams" ON public.teams
  FOR ALL USING (
    owner_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.team_members
      WHERE team_members.team_id = teams.id
      AND team_members.user_id = auth.uid()
      AND team_members.role IN ('OWNER', 'ADMIN')
    )
  );

-- team_members: 팀 멤버만 조회 가능
DROP POLICY IF EXISTS "Team members can view members" ON public.team_members;
CREATE POLICY "Team members can view members" ON public.team_members
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.team_members tm
      WHERE tm.team_id = team_members.team_id
      AND tm.user_id = auth.uid()
    )
  );

-- projects: 팀 멤버만 조회 가능
DROP POLICY IF EXISTS "Team members can view projects" ON public.projects;
CREATE POLICY "Team members can view projects" ON public.projects
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.team_members
      WHERE team_members.team_id = projects.team_id
      AND team_members.user_id = auth.uid()
    )
  );

-- issues: 프로젝트 팀 멤버만 조회 가능
DROP POLICY IF EXISTS "Team members can view issues" ON public.issues;
CREATE POLICY "Team members can view issues" ON public.issues
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.projects p
      JOIN public.team_members tm ON tm.team_id = p.team_id
      WHERE p.id = issues.project_id
      AND tm.user_id = auth.uid()
    )
  );

-- comments: 이슈를 볼 수 있는 사용자만 조회 가능
DROP POLICY IF EXISTS "Users can view comments" ON public.comments;
CREATE POLICY "Users can view comments" ON public.comments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.issues i
      JOIN public.projects p ON p.id = i.project_id
      JOIN public.team_members tm ON tm.team_id = p.team_id
      WHERE i.id = comments.issue_id
      AND tm.user_id = auth.uid()
    )
  );

-- notifications: 본인 알림만 조회 가능
DROP POLICY IF EXISTS "Users can view their notifications" ON public.notifications;
CREATE POLICY "Users can view their notifications" ON public.notifications
  FOR SELECT USING (user_id = auth.uid());

-- issue_attachments: 이슈를 볼 수 있는 사용자만 조회 가능
DROP POLICY IF EXISTS "Users can view issue attachments" ON public.issue_attachments;
CREATE POLICY "Users can view issue attachments" ON public.issue_attachments
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

-- user_preferences: 본인 환경설정만 조회/수정 가능
DROP POLICY IF EXISTS "Users can manage their own preferences" ON public.user_preferences;
CREATE POLICY "Users can manage their own preferences" ON public.user_preferences
  FOR ALL USING (auth.uid() = user_id);

-- ============================================
-- 19. 기존 데이터 동기화 (선택 사항)
-- ============================================
-- 이미 배포된 인스턴스에서 실행 시, 기존 auth.users의 email_confirmed_at을
-- public.users로 동기화합니다.
UPDATE public.users u
SET email_confirmed_at = au.email_confirmed_at
FROM auth.users au
WHERE u.id = au.id
AND u.email_confirmed_at IS NULL;

-- ============================================
-- 완료!
-- ============================================
-- 이제 Supabase 대시보드에서 테이블이 생성되었는지 확인하세요.
-- 다음 단계: seed.sql 및 seed_v2.sql 실행
