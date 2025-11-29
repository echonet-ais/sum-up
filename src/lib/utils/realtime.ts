/**
 * Realtime 기능 활성화 여부 확인
 * 환경 변수 NEXT_PUBLIC_ENABLE_REALTIME으로 제어
 * 기본값: true (활성화)
 */
export function isRealtimeEnabled(): boolean {
  // 환경 변수가 명시적으로 'false'로 설정된 경우에만 비활성화
  return process.env.NEXT_PUBLIC_ENABLE_REALTIME !== 'false';
}

