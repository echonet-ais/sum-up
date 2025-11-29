# 테스트 가이드

이 디렉토리에는 주요 피쳐들에 대한 테스트가 포함되어 있습니다.

## 테스트 실행

```bash
# 모든 테스트 실행
npm test

# UI 모드로 실행
npm run test:ui

# 커버리지 포함 실행
npm run test:coverage
```

## 테스트 구조

### API 테스트 (`src/test/api/`)
- `custom-statuses.test.ts` - 커스텀 상태 API 테스트 (FR-053)
- `wip-limits.test.ts` - WIP Limit API 테스트 (FR-054)
- `team-activities.test.ts` - 팀 활동 로그 API 테스트 (FR-019)
- `issue-history.test.ts` - 이슈 변경 히스토리 API 테스트 (FR-039)
- `team-stats.test.ts` - 팀 통계 API 테스트 (FR-082)

### 통합 테스트 (`src/test/integration/`)
- `custom-statuses-flow.test.ts` - 커스텀 상태 전체 플로우 테스트
- `wip-limits-flow.test.ts` - WIP Limit 전체 플로우 테스트

## 주요 테스트 시나리오

### 커스텀 상태 (FR-053)
1. ✅ 커스텀 상태 생성 (최대 5개)
2. ✅ 커스텀 상태 수정
3. ✅ 커스텀 상태 삭제 (이슈는 TODO로 이동)
4. ✅ 이슈 생성 시 커스텀 상태 선택
5. ✅ 칸반 보드에서 커스텀 상태 표시

### WIP Limit (FR-054)
1. ✅ WIP Limit 설정 (1-50 또는 null)
2. ✅ 칸반 보드에서 WIP Limit 표시
3. ✅ WIP Limit 초과 시 경고 표시

### 팀 활동 로그 (FR-019)
1. ✅ 팀 활동 로그 조회
2. ✅ 페이지네이션 작동
3. ✅ 권한 검증

### 이슈 변경 히스토리 (FR-039)
1. ✅ 이슈 변경 히스토리 조회
2. ✅ 페이지네이션 작동
3. ✅ 권한 검증

### 팀 통계 (FR-082)
1. ✅ 팀 통계 조회
2. ✅ 프로젝트/이슈/멤버/활동 통계 포함

## TODO

현재 테스트는 기본 구조만 작성되어 있습니다. 실제 Supabase 모킹이나 통합 테스트 환경 설정이 필요합니다.

### 필요한 작업:
1. Supabase 클라이언트 모킹 구현
2. 인증 모킹 구현
3. 실제 데이터베이스 연결 테스트 환경 설정
4. E2E 테스트 추가

