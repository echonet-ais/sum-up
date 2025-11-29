-- ============================================
-- users 테이블에 이메일 인증 필드 추가
-- ============================================
-- 이 마이그레이션은 public.users 테이블에 email_confirmed_at 필드를 추가하고
-- auth.users의 email_confirmed_at과 동기화합니다.

-- 1. email_confirmed_at 필드 추가
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS email_confirmed_at TIMESTAMPTZ;

-- 2. 인덱스 추가
CREATE INDEX IF NOT EXISTS idx_users_email_confirmed ON public.users(email_confirmed_at);

-- 3. 기존 데이터 동기화 (auth.users의 email_confirmed_at을 public.users로 복사)
UPDATE public.users u
SET email_confirmed_at = au.email_confirmed_at
FROM auth.users au
WHERE u.id = au.id
AND u.email_confirmed_at IS NULL;

-- 4. auth.users의 email_confirmed_at 변경 시 public.users도 자동 업데이트하는 트리거 함수
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

-- 5. 트리거 생성 (auth.users 테이블에)
DROP TRIGGER IF EXISTS sync_email_confirmed_at_trigger ON auth.users;
CREATE TRIGGER sync_email_confirmed_at_trigger
  AFTER UPDATE OF email_confirmed_at ON auth.users
  FOR EACH ROW
  WHEN (NEW.email_confirmed_at IS DISTINCT FROM OLD.email_confirmed_at)
  EXECUTE FUNCTION sync_email_confirmed_at();

-- 6. 새 사용자 생성 시 email_confirmed_at 동기화하는 트리거
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

-- 7. 새 사용자 생성 트리거
DROP TRIGGER IF EXISTS sync_new_user_email_confirmed_trigger ON auth.users;
CREATE TRIGGER sync_new_user_email_confirmed_trigger
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION sync_new_user_email_confirmed();

-- ============================================
-- 완료
-- ============================================
-- 이제 public.users 테이블에서 email_confirmed_at 필드를 확인할 수 있습니다.
-- auth.users의 email_confirmed_at이 변경되면 자동으로 동기화됩니다.

