-- ============================================
-- users 테이블 INSERT RLS 정책 추가
-- ============================================
-- 회원가입 시 사용자가 자신의 프로필을 생성할 수 있도록 허용

-- 기존 정책이 있으면 삭제 (중복 방지)
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.users;

-- INSERT 정책 생성: 사용자가 자신의 프로필을 생성할 수 있도록 허용
CREATE POLICY "Users can insert their own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

