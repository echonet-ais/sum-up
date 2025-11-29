-- ============================================
-- 테스트 계정 생성 SQL
-- Supabase Dashboard > SQL Editor에서 실행
-- ============================================

-- 테스트 계정 정보
-- 이메일: test@example.com
-- 비밀번호: Test1234!
-- 이름: 테스트 사용자
-- 역할: MEMBER

-- 방법 1: Supabase Auth를 통한 사용자 생성 (권장)
-- 이 방법은 비밀번호를 자동으로 해시 처리합니다.
-- 주의: 이메일 인증이 활성화되어 있으면 이메일 인증이 필요합니다.

-- 1. auth.users에 사용자 생성 (비밀번호는 bcrypt로 해시됨)
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  confirmation_sent_at,
  confirmation_token,
  recovery_sent_at,
  recovery_token,
  email_change_sent_at,
  email_change,
  email_change_token_new,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  created_at,
  updated_at,
  phone,
  phone_confirmed_at,
  phone_change,
  phone_change_token,
  phone_change_sent_at,
  confirmed_at,
  email_change_token_current,
  email_change_confirm_status,
  banned_until,
  reauthentication_token,
  reauthentication_sent_at,
  is_sso_user,
  deleted_at
) VALUES (
  '00000000-0000-0000-0000-000000000000', -- instance_id
  gen_random_uuid(), -- id (UUID 생성)
  'authenticated', -- aud
  'authenticated', -- role
  'test@example.com', -- email
  crypt('Test1234!', gen_salt('bf')), -- encrypted_password (bcrypt 해시)
  NOW(), -- email_confirmed_at (이미 인증된 상태로 설정)
  NOW(), -- confirmation_sent_at
  '', -- confirmation_token
  NULL, -- recovery_sent_at
  '', -- recovery_token
  NULL, -- email_change_sent_at
  '', -- email_change
  '', -- email_change_token_new
  NULL, -- last_sign_in_at
  '{"provider":"email","providers":["email"]}', -- raw_app_meta_data
  '{"name":"테스트 사용자"}', -- raw_user_meta_data
  false, -- is_super_admin
  NOW(), -- created_at
  NOW(), -- updated_at
  NULL, -- phone
  NULL, -- phone_confirmed_at
  '', -- phone_change
  '', -- phone_change_token
  NULL, -- phone_change_sent_at
  NOW(), -- confirmed_at (이미 인증된 상태)
  '', -- email_change_token_current
  0, -- email_change_confirm_status
  NULL, -- banned_until
  '', -- reauthentication_token
  NULL, -- reauthentication_sent_at
  false, -- is_sso_user
  NULL -- deleted_at
) RETURNING id;

-- 2. public.users에 프로필 정보 추가
-- 위 쿼리에서 반환된 id를 사용하여 실행
-- (실제로는 변수를 사용하거나, 반환된 id를 복사해서 사용)

-- 예시: id가 '12345678-1234-1234-1234-123456789abc'인 경우
-- INSERT INTO public.users (
--   id,
--   email,
--   name,
--   role,
--   email_confirmed_at,
--   created_at,
--   updated_at
-- ) VALUES (
--   '12345678-1234-1234-1234-123456789abc', -- 위에서 생성한 auth.users의 id
--   'test@example.com',
--   '테스트 사용자',
--   'MEMBER',
--   NOW(),
--   NOW(),
--   NOW()
-- );

-- ============================================
-- 방법 2: 간단한 방법 (함수 사용)
-- ============================================

-- 더 간단한 방법: DO 블록을 사용하여 변수로 id 저장
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
    confirmation_sent_at,
    confirmation_token,
    recovery_sent_at,
    recovery_token,
    email_change_sent_at,
    email_change,
    email_change_token_new,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    created_at,
    updated_at,
    phone,
    phone_confirmed_at,
    phone_change,
    phone_change_token,
    phone_change_sent_at,
    confirmed_at,
    email_change_token_current,
    email_change_confirm_status,
    banned_until,
    reauthentication_token,
    reauthentication_sent_at,
    is_sso_user,
    deleted_at
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'test@example.com',
    crypt('Test1234!', gen_salt('bf')),
    NOW(),
    NOW(),
    '',
    NULL,
    '',
    NULL,
    '',
    '',
    NULL,
    '{"provider":"email","providers":["email"]}',
    '{"name":"테스트 사용자"}',
    false,
    NOW(),
    NOW(),
    NULL,
    NULL,
    '',
    '',
    NULL,
    NOW(),
    '',
    0,
    NULL,
    '',
    NULL,
    false,
    NULL
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
  );

  RAISE NOTICE '테스트 계정이 생성되었습니다. ID: %, 이메일: test@example.com, 비밀번호: Test1234!', user_id;
END $$;

-- ============================================
-- 방법 3: 여러 테스트 계정 생성
-- ============================================

-- 관리자 계정
DO $$
DECLARE
  admin_id UUID;
BEGIN
  INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password,
    email_confirmed_at, confirmation_sent_at, confirmation_token,
    recovery_sent_at, recovery_token, email_change_sent_at, email_change,
    email_change_token_new, last_sign_in_at, raw_app_meta_data,
    raw_user_meta_data, is_super_admin, created_at, updated_at,
    phone, phone_confirmed_at, phone_change, phone_change_token,
    phone_change_sent_at, confirmed_at, email_change_token_current,
    email_change_confirm_status, banned_until, reauthentication_token,
    reauthentication_sent_at, is_sso_user, deleted_at
  ) VALUES (
    '00000000-0000-0000-0000-000000000000', gen_random_uuid(), 'authenticated',
    'authenticated', 'admin@example.com', crypt('Admin1234!', gen_salt('bf')),
    NOW(), NOW(), '', NULL, '', NULL, '', '', NULL,
    '{"provider":"email","providers":["email"]}', '{"name":"관리자"}',
    false, NOW(), NOW(), NULL, NULL, '', '', NULL, NOW(), '', 0, NULL, '', NULL, false, NULL
  ) RETURNING id INTO admin_id;

  INSERT INTO public.users (id, email, name, role, email_confirmed_at, created_at, updated_at)
  VALUES (admin_id, 'admin@example.com', '관리자', 'ADMIN', NOW(), NOW(), NOW());

  RAISE NOTICE '관리자 계정 생성 완료: admin@example.com / Admin1234!';
END $$;

-- 일반 사용자 계정
DO $$
DECLARE
  user_id UUID;
BEGIN
  INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password,
    email_confirmed_at, confirmation_sent_at, confirmation_token,
    recovery_sent_at, recovery_token, email_change_sent_at, email_change,
    email_change_token_new, last_sign_in_at, raw_app_meta_data,
    raw_user_meta_data, is_super_admin, created_at, updated_at,
    phone, phone_confirmed_at, phone_change, phone_change_token,
    phone_change_sent_at, confirmed_at, email_change_token_current,
    email_change_confirm_status, banned_until, reauthentication_token,
    reauthentication_sent_at, is_sso_user, deleted_at
  ) VALUES (
    '00000000-0000-0000-0000-000000000000', gen_random_uuid(), 'authenticated',
    'authenticated', 'user@example.com', crypt('User1234!', gen_salt('bf')),
    NOW(), NOW(), '', NULL, '', NULL, '', '', NULL,
    '{"provider":"email","providers":["email"]}', '{"name":"일반 사용자"}',
    false, NOW(), NOW(), NULL, NULL, '', '', NULL, NOW(), '', 0, NULL, '', NULL, false, NULL
  ) RETURNING id INTO user_id;

  INSERT INTO public.users (id, email, name, role, email_confirmed_at, created_at, updated_at)
  VALUES (user_id, 'user@example.com', '일반 사용자', 'MEMBER', NOW(), NOW(), NOW());

  RAISE NOTICE '일반 사용자 계정 생성 완료: user@example.com / User1234!';
END $$;

-- ============================================
-- 테스트 계정 삭제 (필요시)
-- ============================================

-- DELETE FROM public.users WHERE email = 'test@example.com';
-- DELETE FROM auth.users WHERE email = 'test@example.com';

-- ============================================
-- 참고사항
-- ============================================
-- 1. 이 SQL은 Supabase Dashboard > SQL Editor에서 실행하세요.
-- 2. 비밀번호는 bcrypt로 해시되어 저장됩니다.
-- 3. email_confirmed_at과 confirmed_at을 NOW()로 설정하여 이메일 인증을 우회합니다.
-- 4. 생성된 계정으로 바로 로그인할 수 있습니다.
-- 5. 필요에 따라 이메일, 비밀번호, 이름, 역할을 수정하여 사용하세요.

