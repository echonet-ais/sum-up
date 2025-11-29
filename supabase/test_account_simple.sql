-- ============================================
-- 테스트 계정 생성 SQL (간단 버전)
-- Supabase Dashboard > SQL Editor에서 실행
-- ============================================

DO $$
DECLARE
  user_id UUID;
BEGIN
  -- auth.users에 사용자 생성
  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'test@example.com',
    crypt('Test1234!', gen_salt('bf')),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{"name":"테스트 사용자"}',
    NOW(),
    NOW()
  ) RETURNING id INTO user_id;

  -- public.users에 프로필 정보 추가
  INSERT INTO public.users (
    id,
    email,
    name,
    role,
    email_confirmed_at,
    created_at,
    updated_at
  ) VALUES (
    user_id,
    'test@example.com',
    '테스트 사용자',
    'MEMBER',
    NOW(),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    name = EXCLUDED.name,
    role = EXCLUDED.role,
    email_confirmed_at = EXCLUDED.email_confirmed_at,
    updated_at = NOW();

  RAISE NOTICE '테스트 계정 생성 완료: test@example.com / Test1234!';
END $$;

-- ============================================
-- 계정 정보
-- ============================================
-- 이메일: test@example.com
-- 비밀번호: Test1234!
-- 이름: 테스트 사용자
-- 역할: MEMBER
-- 이메일 인증: 완료 (바로 로그인 가능)

