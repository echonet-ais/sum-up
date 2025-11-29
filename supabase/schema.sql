-- ============================================
-- SumUp 데이터베이스 스키마 (통합 버전)
-- ============================================
-- 작성일: 2025-01-30
-- 목적: 모든 마이그레이션을 통합한 최신 스키마
-- 
-- 사용 방법:
-- 1. Supabase 대시보드의 SQL Editor에서 실행
-- 2. 또는 Supabase CLI: `supabase db reset` (로컬 개발)
-- 
-- 통합된 마이그레이션:
-- - 2025-01-30_add_email_confirmed_at_to_users.sql
-- - 2025-11-29_add_custom_statuses_and_wip_limits.sql
-- - 2025-11-29_add_issue_history_and_team_activities.sql
-- - 2025-11-29_add_issue_attachments_and_user_preferences.sql
-- - 2025-11-29_fix_users_rls_insert_policy.sql
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
-- 커스텀 상태를 지원하기 위해 status CHECK 제약조건 제거 (FR-053)
CREATE TABLE IF NOT EXISTS public.issues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'TODO', -- CHECK 제약조건 제거 (커스텀 상태 지원)
  priority TEXT NOT NULL DEFAULT 'MEDIUM' CHECK (priority IN ('HIGH', 'MEDIUM', 'LOW')),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  assignee_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  due_date TIMESTAMPTZ,
  order_position INTEGER DEFAULT 0,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 기존 CHECK 제약조건 제거 (커스텀 상태 지원)
ALTER TABLE public.issues DROP CONSTRAINT IF EXISTS issues_status_check;

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
CREATE INDEX IF NOT EXISTS idx_subtasks_order ON public.subtasks(issue_id, order_position);

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
-- 마이그레이션: 2025-11-29_add_issue_history_and_team_activities.sql 반영
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
    'PROJECT_DELETED',
    'PROJECT_ARCHIVED',
    'PROJECT_UNARCHIVED'
  )),
  target_id TEXT NOT NULL, -- 관련 엔티티 ID (팀 ID, 프로젝트 ID, 사용자 ID 등)
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_activities_team ON public.activities(team_id);
CREATE INDEX IF NOT EXISTS idx_activities_user ON public.activities(user_id);
CREATE INDEX IF NOT EXISTS idx_activities_type ON public.activities(type);
CREATE INDEX IF NOT EXISTS idx_activities_created ON public.activities(created_at DESC);

-- ============================================
-- 13. custom_statuses 테이블 (FR-053)
-- ============================================
-- 마이그레이션: 2025-11-29_add_custom_statuses_and_wip_limits.sql 반영
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

CREATE INDEX IF NOT EXISTS idx_custom_statuses_project ON public.custom_statuses(project_id);
CREATE INDEX IF NOT EXISTS idx_custom_statuses_position ON public.custom_statuses(project_id, position);

-- ============================================
-- 14. project_wip_limits 테이블 (FR-054)
-- ============================================
-- 마이그레이션: 2025-11-29_add_custom_statuses_and_wip_limits.sql 반영
CREATE TABLE IF NOT EXISTS public.project_wip_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL, -- 기본 상태 (TODO, IN_PROGRESS, IN_REVIEW, DONE) 또는 custom_statuses.id
  wip_limit INTEGER CHECK (wip_limit >= 1 AND wip_limit <= 50),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, status)
);

CREATE INDEX IF NOT EXISTS idx_project_wip_limits_project ON public.project_wip_limits(project_id);
CREATE INDEX IF NOT EXISTS idx_project_wip_limits_status ON public.project_wip_limits(project_id, status);

-- ============================================
-- 15. issue_attachments 테이블
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
-- 16. user_preferences 테이블
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
-- 17. issue_history 테이블
-- ============================================
-- 마이그레이션: 2025-11-29_add_issue_history_and_team_activities.sql 반영
-- 기능: FR-039 - 이슈 변경 히스토리
CREATE TABLE IF NOT EXISTS public.issue_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_id UUID REFERENCES public.issues(id) ON DELETE CASCADE NOT NULL,
  field TEXT NOT NULL CHECK (field IN ('title', 'description', 'status', 'priority', 'assignee', 'dueDate', 'labels', 'created', 'deleted')),
  old_value TEXT,                         -- 변경 전 값
  new_value TEXT,                         -- 변경 후 값
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,  -- 변경한 사용자
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_issue_history_issue ON public.issue_history(issue_id);
CREATE INDEX IF NOT EXISTS idx_issue_history_user ON public.issue_history(user_id);
CREATE INDEX IF NOT EXISTS idx_issue_history_created ON public.issue_history(created_at DESC);

-- ============================================
-- 18. 뷰 생성
-- ============================================
-- (프로젝트 상태 뷰는 별도 테이블 구조로 변경되어 제거됨)

-- ============================================
-- 19. 함수 정의
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
-- 20. 트리거 생성
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

CREATE TRIGGER update_custom_statuses_updated_at BEFORE UPDATE ON public.custom_statuses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_wip_limits_updated_at BEFORE UPDATE ON public.project_wip_limits
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
-- 21. Row Level Security (RLS) 활성화
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
ALTER TABLE public.issue_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.issue_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_statuses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_wip_limits ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 22. RLS 정책
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

-- issue_history: 이슈를 볼 수 있는 사용자만 히스토리 조회 가능
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
      AND i.deleted_at IS NULL
    )
  );

-- issue_history: 이슈를 수정할 수 있는 사용자는 히스토리도 생성 가능
DROP POLICY IF EXISTS "Users can create issue history" ON public.issue_history;
CREATE POLICY "Users can create issue history" ON public.issue_history
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

-- activities: 팀 멤버는 활동 로그 조회 가능
-- 마이그레이션: 2025-11-29_add_issue_history_and_team_activities.sql 반영
DROP POLICY IF EXISTS "Team members can view activities" ON public.activities;
CREATE POLICY "Team members can view activities" ON public.activities
  FOR SELECT USING (
    EXISTS (
      SELECT 1
      FROM public.team_members tm
      WHERE tm.team_id = activities.team_id
      AND tm.user_id = auth.uid()
    )
  );

-- activities: 팀 멤버는 활동 로그 생성 가능
DROP POLICY IF EXISTS "Team members can create activities" ON public.activities;
CREATE POLICY "Team members can create activities" ON public.activities
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1
      FROM public.team_members tm
      WHERE tm.team_id = activities.team_id
      AND tm.user_id = auth.uid()
    )
  );

-- custom_statuses: 프로젝트 팀 멤버만 조회/수정 가능
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

-- project_wip_limits: 프로젝트 팀 멤버만 조회/수정 가능
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

-- ============================================
-- 23. 기존 데이터 동기화 (선택 사항)
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
