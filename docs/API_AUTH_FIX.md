# API Routes 인증 수정 가이드

## 문제
모든 API Routes에서 401 Unauthorized 에러 발생
- "Auth session missing!" 에러
- 서버 사이드에서 Supabase 세션 쿠키를 읽지 못함

## 해결 방법

모든 API Routes에서 `createServerClient(request, response)`를 사용하도록 수정해야 합니다.

### 수정 전
```typescript
export async function GET(request: NextRequest) {
  const supabase = await createServerClient();
  // ...
}
```

### 수정 후
```typescript
export async function GET(request: NextRequest) {
  const response = new NextResponse();
  const supabase = await createServerClient(request, response);
  // ...
}
```

## 수정된 API Routes

- ✅ `/api/auth/login` - 로그인 API
- ✅ `/api/projects` - 프로젝트 API (GET, POST)
- ✅ `/api/teams` - 팀 API (GET, POST)
- ✅ `/api/issues` - 이슈 API (GET, POST)
- ✅ `/api/dashboard/stats` - 대시보드 통계 API
- ✅ `/api/dashboard/activities` - 대시보드 활동 API
- ✅ `/api/notifications` - 알림 API

## 남은 작업

다른 모든 API Routes도 동일하게 수정해야 합니다:
- `/api/projects/[id]` (GET, PUT, DELETE)
- `/api/teams/[id]` (GET, PUT, DELETE)
- `/api/issues/[id]` (GET, PUT, DELETE)
- `/api/issues/[id]/comments` (GET, POST)
- `/api/issues/[id]/subtasks` (GET, POST)
- 기타 모든 API Routes

## 빠른 수정 방법

모든 API Routes 파일에서 다음 패턴을 찾아서 수정:

```bash
# 찾기
const supabase = await createServerClient();

# 교체
const response = new NextResponse();
const supabase = await createServerClient(request, response);
```

