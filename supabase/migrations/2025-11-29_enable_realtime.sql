-- ============================================
-- Supabase Realtime 활성화
-- ============================================
-- 작성일: 2025-11-29
-- 목적: 실시간 기능을 위한 Realtime 활성화 및 REPLICA IDENTITY 설정

-- Realtime을 활성화할 테이블들
-- 1. notifications - 실시간 알림 업데이트
-- 2. comments - 실시간 댓글 업데이트
-- 3. issues - 실시간 이슈 업데이트 (칸반 보드, 이슈 목록)

-- REPLICA IDENTITY 설정 (Realtime이 변경 사항을 추적하기 위해 필요)
-- FULL: 모든 변경 사항을 추적 (UPDATE, DELETE 시 이전 값도 포함)
ALTER TABLE public.notifications REPLICA IDENTITY FULL;
ALTER TABLE public.comments REPLICA IDENTITY FULL;
ALTER TABLE public.issues REPLICA IDENTITY FULL;

-- Supabase Realtime 활성화
-- 주의: Supabase 대시보드에서도 Realtime을 활성화해야 합니다.
-- 대시보드 경로: Database > Replication > 테이블 선택 > Enable Realtime

-- 참고:
-- 1. Supabase 대시보드에서 각 테이블의 Realtime을 활성화해야 합니다.
-- 2. RLS 정책이 올바르게 설정되어 있어야 합니다.
-- 3. 클라이언트에서 구독할 때 필터를 사용하여 권한이 있는 데이터만 받을 수 있습니다.

