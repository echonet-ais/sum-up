-- ============================================
-- 테스트 계정 생성 SQL
-- Supabase Dashboard > SQL Editor에서 실행
-- ============================================
-- 
-- 주의: auth.users 테이블은 Supabase가 관리하는 테이블입니다.
-- 직접 삽입 시 많은 필수 컬럼이 필요할 수 있습니다.
-- 
-- 권장 방법: Supabase Dashboard > Authentication > Users에서
-- "Add user" 버튼을 사용하여 수동으로 생성하는 것이 가장 안전합니다.
-- 
-- 또는 아래의 간단한 방법(방법 4)을 먼저 시도해보세요.
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
-- 주의: confirmed_at은 생성된 열이므로 직접 삽입할 수 없습니다.
-- email_confirmed_at을 설정하면 confirmed_at이 자동으로 설정됩니다.
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
  NOW(), -- email_confirmed_at (이미 인증된 상태로 설정, confirmed_at이 자동으로 설정됨)
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
-- 방법 2: 간단한 방법 (함수 사용) - 권장
-- ============================================

-- 더 간단한 방법: DO 블록을 사용하여 변수로 id 저장
DO $$
DECLARE
  user_id UUID;
BEGIN
  -- auth.users에 사용자 생성
  -- 주의: confirmed_at은 생성된 열이므로 제외합니다.
  -- email_confirmed_at을 설정하면 confirmed_at이 자동으로 설정됩니다.
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
    NOW(), -- email_confirmed_at 설정 시 confirmed_at이 자동으로 설정됨
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

-- ============================================
-- 방법 4: 최소 필수 컬럼만 사용 (가장 간단) - 먼저 시도
-- ============================================
-- 
-- 이 방법은 최소한의 필수 컬럼만 사용합니다.
-- Supabase 버전에 따라 필요한 컬럼이 다를 수 있으므로,
-- 오류가 발생하면 방법 2를 사용하세요.

DO $$
DECLARE
  user_id UUID;
BEGIN
  -- 최소 필수 컬럼만 사용하여 auth.users에 사용자 생성
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
    NOW(), -- 이메일 인증 우회
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

  RAISE NOTICE '테스트 계정이 생성되었습니다. ID: %, 이메일: test@example.com, 비밀번호: Test1234!', user_id;
END $$;

-- ============================================
-- 방법 5: 여러 테스트 계정 생성 (간단 버전)
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
    phone_change_sent_at, email_change_token_current,
    email_change_confirm_status, banned_until, reauthentication_token,
    reauthentication_sent_at, is_sso_user, deleted_at
  ) VALUES (
    '00000000-0000-0000-0000-000000000000', gen_random_uuid(), 'authenticated',
    'authenticated', 'admin@example.com', crypt('Admin1234!', gen_salt('bf')),
    NOW(), NOW(), '', NULL, '', NULL, '', '', NULL,
    '{"provider":"email","providers":["email"]}', '{"name":"관리자"}',
    false, NOW(), NOW(), NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL
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
    phone_change_sent_at, email_change_token_current,
    email_change_confirm_status, banned_until, reauthentication_token,
    reauthentication_sent_at, is_sso_user, deleted_at
  ) VALUES (
    '00000000-0000-0000-0000-000000000000', gen_random_uuid(), 'authenticated',
    'authenticated', 'user@example.com', crypt('User1234!', gen_salt('bf')),
    NOW(), NOW(), '', NULL, '', NULL, '', '', NULL,
    '{"provider":"email","providers":["email"]}', '{"name":"일반 사용자"}',
    false, NOW(), NOW(), NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL
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
-- 3. email_confirmed_at을 NOW()로 설정하여 이메일 인증을 우회합니다.
--    (confirmed_at은 생성된 열이므로 email_confirmed_at에 따라 자동으로 설정됩니다)
-- 4. 생성된 계정으로 바로 로그인할 수 있습니다.
-- 5. 필요에 따라 이메일, 비밀번호, 이름, 역할을 수정하여 사용하세요.
-- 6. confirmed_at은 생성된 열(generated column)이므로 직접 삽입할 수 없습니다.

