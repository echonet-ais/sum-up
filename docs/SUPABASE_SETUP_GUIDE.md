# Supabase 설정 가이드

> **프로젝트**: SumUp  
> **버전**: 1.0  
> **날짜**: 2025-11-29  
> **상태**: 초안

---

## 1. 개요

### 1.1 Supabase 선택 이유
- **빠른 설정**: 15-30분 내 프로젝트 생성 및 기본 설정 완료
- **인증 기능 내장**: 회원가입, 로그인, Google OAuth 빠른 구현
- **실시간 기능**: WebSocket 기반 실시간 업데이트 (가산점)
- **무료 티어**: 개발 및 소규모 프로덕션 사용 가능
- **타입 안전성**: TypeScript 지원 및 자동 타입 생성

### 1.2 시간 소요 예상
- **Supabase 설정**: 15-30분
- **스키마 설계 및 테이블 생성**: 30분-1시간
- **인증 설정**: 30분-1시간
- **API Routes 구현**: 2-3시간
- **프론트엔드 연동**: 1-2시간
- **테스트 및 버그 수정**: 1시간
- **총 예상 시간**: 5.5-8시간

**⚠️ 7시간 제약 고려**: 목 데이터로 시작하고, 시간이 남으면 Supabase로 마이그레이션 권장

---

## 2. Supabase 프로젝트 생성

### 2.1 프로젝트 생성
1. [Supabase](https://supabase.com) 접속 및 회원가입
2. "New Project" 클릭
3. 프로젝트 정보 입력:
   - **Name**: SumUp
   - **Database Password**: 강력한 비밀번호 설정 (저장 필수)
   - **Region**: Northeast Asia (Seoul) 또는 가장 가까운 리전
4. 프로젝트 생성 완료 대기 (약 2분)

### 2.2 프로젝트 설정 확인
- **Project URL**: `https://xxxxx.supabase.co`
- **API Key (anon/public)**: 클라이언트에서 사용
- **API Key (service_role)**: 서버에서만 사용 (절대 노출 금지)

---

## 3. 데이터베이스 스키마 설계

### 3.1 테이블 구조

#### 3.1.1 users 테이블
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password_hash TEXT, -- 이메일/비밀번호 로그인용
  avatar TEXT,
  provider TEXT DEFAULT 'email', -- 'email' | 'google'
  provider_id TEXT, -- Google OAuth ID
  role TEXT DEFAULT 'MEMBER', -- 'OWNER' | 'ADMIN' | 'MEMBER'
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_provider ON users(provider, provider_id);
```

#### 3.1.2 teams 테이블
```sql
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  avatar TEXT,
  owner_id UUID REFERENCES users(id),
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_teams_owner ON teams(owner_id);
```

#### 3.1.3 team_members 테이블
```sql
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'MEMBER', -- 'OWNER' | 'ADMIN' | 'MEMBER'
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(team_id, user_id)
);

CREATE INDEX idx_team_members_team ON team_members(team_id);
CREATE INDEX idx_team_members_user ON team_members(user_id);
```

#### 3.1.4 projects 테이블
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  owner_id UUID REFERENCES users(id),
  is_archived BOOLEAN DEFAULT FALSE,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_projects_team ON projects(team_id);
CREATE INDEX idx_projects_owner ON projects(owner_id);
CREATE INDEX idx_projects_archived ON projects(is_archived);
```

#### 3.1.5 project_favorites 테이블
```sql
CREATE TABLE project_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, user_id)
);

CREATE INDEX idx_project_favorites_user ON project_favorites(user_id);
```

#### 3.1.6 issues 테이블
```sql
CREATE TABLE issues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'TODO', -- 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE'
  priority TEXT NOT NULL DEFAULT 'MEDIUM', -- 'HIGH' | 'MEDIUM' | 'LOW'
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  assignee_id UUID REFERENCES users(id),
  due_date TIMESTAMPTZ,
  order_position INTEGER DEFAULT 0,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_issues_project ON issues(project_id);
CREATE INDEX idx_issues_assignee ON issues(assignee_id);
CREATE INDEX idx_issues_status ON issues(status);
```

#### 3.1.7 issue_labels 테이블
```sql
CREATE TABLE issue_labels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  color TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, name)
);

CREATE INDEX idx_issue_labels_project ON issue_labels(project_id);
```

#### 3.1.8 issue_label_mappings 테이블
```sql
CREATE TABLE issue_label_mappings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_id UUID REFERENCES issues(id) ON DELETE CASCADE,
  label_id UUID REFERENCES issue_labels(id) ON DELETE CASCADE,
  UNIQUE(issue_id, label_id)
);

CREATE INDEX idx_issue_label_mappings_issue ON issue_label_mappings(issue_id);
```

#### 3.1.9 subtasks 테이블
```sql
CREATE TABLE subtasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_id UUID REFERENCES issues(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  order_position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_subtasks_issue ON subtasks(issue_id);
```

#### 3.1.10 comments 테이블
```sql
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_id UUID REFERENCES issues(id) ON DELETE CASCADE,
  author_id UUID REFERENCES users(id),
  content TEXT NOT NULL,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_comments_issue ON comments(issue_id);
CREATE INDEX idx_comments_author ON comments(author_id);
```

#### 3.1.11 notifications 테이블
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'ISSUE_CREATED' | 'ISSUE_UPDATED' | 'ISSUE_COMMENTED' | 'TEAM_INVITE' 등
  target_id TEXT NOT NULL, -- 이슈 ID, 팀 ID 등
  description TEXT NOT NULL,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(user_id, read_at);
```

#### 3.1.12 activities 테이블
```sql
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  type TEXT NOT NULL,
  target_id TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_activities_team ON activities(team_id);
CREATE INDEX idx_activities_user ON activities(user_id);
```

---

## 4. Supabase 클라이언트 설정

### 4.1 패키지 설치
```bash
npm install @supabase/supabase-js
npm install @supabase/ssr  # Next.js SSR 지원
```

### 4.2 환경 변수 설정
`.env.local`에 추가:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 4.3 Supabase 클라이언트 생성

**`src/lib/supabase/client.ts`**:
```typescript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

**`src/lib/supabase/server.ts`**:
```typescript
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // 서버 컴포넌트에서만 사용 가능
          }
        },
      },
    }
  );
}
```

---

## 5. 인증 구현

### 5.1 회원가입 API Route

**`src/app/api/auth/signup/route.ts`**:
```typescript
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Email, password, and name are required" },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // 회원가입
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // users 테이블에 사용자 정보 저장
    if (data.user) {
      const { error: dbError } = await supabase.from("users").insert({
        id: data.user.id,
        email: data.user.email!,
        name,
        provider: "email",
      });

      if (dbError) {
        console.error("Error creating user:", dbError);
      }
    }

    return NextResponse.json({
      user: data.user,
      session: data.session,
    });
  } catch (error) {
    console.error("Error signing up:", error);
    return NextResponse.json(
      { error: "Failed to sign up" },
      { status: 500 }
    );
  }
}
```

### 5.2 로그인 API Route

**`src/app/api/auth/login/route.ts`**:
```typescript
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user: data.user,
      session: data.session,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json(
      { error: "Failed to login" },
      { status: 500 }
    );
  }
}
```

### 5.3 Google OAuth 설정

#### 5.3.1 Google Cloud Console 프로젝트 설정

**옵션 A: 새 프로젝트 생성 (권장, 5-10분 소요)**
1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 상단 프로젝트 선택 드롭다운 클릭 → "New Project" 클릭
3. 프로젝트 정보 입력:
   - **Project name**: `SumUp Hackathon` (또는 원하는 이름)
   - **Organization**: 선택 사항
4. "Create" 클릭 후 프로젝트 생성 완료 대기 (약 1분)

**옵션 B: 기존 프로젝트 사용 (빠른 진행)**
- 기존 Google Cloud 프로젝트가 있고 OAuth 동의 화면이 이미 설정되어 있다면 사용 가능
- 단, 프로덕션 환경에서는 별도 프로젝트 생성 권장

#### 5.3.2 OAuth 클라이언트 ID 생성

1. **OAuth 동의 화면 설정** (새 프로젝트인 경우):
   - 좌측 메뉴: "APIs & Services" → "OAuth consent screen"
   - **User Type**: "External" 선택 (개인 Google 계정 사용 시)
   - **App information**:
     - App name: `SumUp`
     - User support email: 본인 이메일
     - Developer contact: 본인 이메일
   - **Scopes**: 기본값 유지 (email, profile, openid)
   - **Test users**: 해커톤 기간 동안 테스트할 이메일 추가 (선택)
   - "Save and Continue" 클릭하여 완료

2. **OAuth 클라이언트 ID 생성**:
   - 좌측 메뉴: "APIs & Services" → "Credentials"
   - 상단 "Create Credentials" → "OAuth client ID" 선택
   - **Application type**: "Web application"
   - **Name**: `SumUp Web Client` (또는 원하는 이름)
   - **Authorized JavaScript origins**:
     - `http://localhost:3000` (개발용)
     - `https://your-app.vercel.app` (배포용, 나중에 추가)
   - **Authorized redirect URIs**:
     - `http://localhost:3000/api/auth/google` (개발용)
     - `https://your-project-ref.supabase.co/auth/v1/callback` (Supabase 콜백 URL)
     - `https://your-app.vercel.app/api/auth/google` (배포용, 나중에 추가)
   - "Create" 클릭
   - **Client ID**와 **Client Secret** 복사 (한 번만 표시되므로 저장 필수)

#### 5.3.3 Supabase 대시보드에서 설정

1. **Supabase 대시보드에서 설정**:
   - Authentication → Providers → Google
   - **Enable Google provider**: 활성화
   - **Client ID (for OAuth)**: 위에서 복사한 Client ID 입력
   - **Client Secret (for OAuth)**: 위에서 복사한 Client Secret 입력
   - "Save" 클릭

2. **Google OAuth API Route**:
```typescript
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      return NextResponse.redirect(new URL("/login?error=auth_failed", request.url));
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Google OAuth URL 생성
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${request.nextUrl.origin}/api/auth/google`,
    },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.redirect(data.url);
}
```

---

## 6. 시간 절약 전략

### 6.1 하이브리드 접근법 (권장)

**Phase 1 (1-2시간)**: 목 데이터로 핵심 기능 구현
- 목 데이터 구조 완성 ✅ (이미 완료)
- API Routes 기본 구조 구현
- 프론트엔드 연동

**Phase 2 (2-3시간)**: Supabase 마이그레이션
- Supabase 프로젝트 생성 및 스키마 설정
- 인증 기능만 Supabase로 전환
- 데이터는 목 데이터 유지

**Phase 3 (1-2시간)**: 데이터베이스 연동
- 목 데이터를 Supabase로 마이그레이션
- API Routes를 Supabase 쿼리로 교체

**Phase 4 (1시간)**: 마무리
- 테스트 및 버그 수정
- 배포

### 6.2 빠른 Supabase 설정 (30분)

1. **Supabase 프로젝트 생성** (5분)
2. **기본 테이블 생성** (SQL 스크립트 실행) (10분)
3. **환경 변수 설정** (5분)
4. **인증만 Supabase 사용** (10분)

나머지는 목 데이터로 진행하고, 시간이 남으면 점진적으로 마이그레이션

---

## 7. Supabase vs 목 데이터 비교

| 항목 | Supabase | 목 데이터 |
|------|----------|----------|
| 설정 시간 | 30분-1시간 | 0분 (이미 완료) |
| 인증 구현 | 빠름 (내장) | 직접 구현 필요 |
| 데이터 영속성 | ✅ 있음 | ❌ 없음 (새로고침 시 초기화) |
| 실시간 기능 | ✅ 쉬움 | ❌ 어려움 |
| 배포 복잡도 | 중간 | 낮음 |
| 개발 속도 | 중간 | 빠름 |
| 프로덕션 준비 | ✅ 준비됨 | ❌ 마이그레이션 필요 |

---

## 8. 추천 전략

### 8.1 7시간 제약 시 추천: 하이브리드

1. **목 데이터로 시작** (이미 완료)
2. **핵심 기능 구현** (API Routes + 프론트엔드)
3. **시간이 남으면 Supabase로 전환**
4. **최소한 인증만 Supabase 사용** (Google OAuth 빠른 구현)

### 8.2 Supabase 사용 시 체크리스트

- [ ] Supabase 프로젝트 생성 (15분)
- [ ] 기본 스키마 생성 (30분)
- [ ] 환경 변수 설정 (5분)
- [ ] 인증 API Routes 구현 (30분)
- [ ] 데이터 API Routes를 Supabase 쿼리로 교체 (2-3시간)
- [ ] 프론트엔드 연동 (1시간)
- [ ] 테스트 (30분)

**총 예상 시간**: 5-6시간

---

## 9. 빠른 시작 가이드

### 9.1 Supabase 선택 시
1. 이 문서의 SQL 스크립트를 Supabase SQL Editor에서 실행
2. 환경 변수 설정
3. 인증 API Routes 구현
4. 데이터 API Routes는 목 데이터로 시작

### 9.2 목 데이터 선택 시
1. `src/lib/mock/` 구조 활용 (이미 완료)
2. API Routes 구현
3. 시간이 남으면 Supabase로 마이그레이션

---

## 10. 참고 자료

### 10.1 관련 문서
- [BACKEND_API_GUIDE.md](./BACKEND_API_GUIDE.md) - 백엔드 API 개발 가이드
- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - API 문서

### 10.2 외부 자료
- [Supabase 공식 문서](https://supabase.com/docs)
- [Supabase Auth 가이드](https://supabase.com/docs/guides/auth)
- [Next.js + Supabase 가이드](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

---

## 문서 이력

| 버전 | 날짜 | 작성자 | 변경사항 |
|------|------|--------|---------|
| 1.0 | 2025-11-29 | Initial | 초기 Supabase 설정 가이드 작성 |

---

**문서 종료**

