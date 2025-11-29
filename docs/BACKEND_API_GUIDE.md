# 백엔드 API 개발 가이드

> **프로젝트**: SumUp  
> **버전**: 1.0  
> **날짜**: 2025-11-29  
> **상태**: 초안

---

## 1. 개요

### 1.1 목적
본 문서는 SumUp 프로젝트의 백엔드 API 개발 가이드를 제공합니다. Next.js API Routes를 사용하여 백엔드 API를 구현하는 방법을 설명합니다.

### 1.2 아키텍처 선택

#### 옵션 1: 목 데이터 + Next.js API Routes (권장 - 빠른 시작)
- **장점**: 
  - 설정 시간 없음 (이미 완료)
  - 빠른 개발 속도
  - 타입 공유 용이
  - 배포 간소화
- **단점**:
  - 데이터 영속성 없음 (새로고침 시 초기화)
  - 인증 직접 구현 필요

#### 옵션 2: Supabase + Next.js API Routes
- **장점**:
  - 인증 기능 내장 (빠른 구현)
  - 데이터 영속성
  - 실시간 기능 쉬움
- **단점**:
  - 설정 시간 필요 (30분-1시간)
  - 외부 의존성

**⚠️ 7시간 제약 고려**: 목 데이터로 시작하고, 시간이 남으면 Supabase로 마이그레이션 권장

자세한 내용은 [SUPABASE_SETUP_GUIDE.md](./SUPABASE_SETUP_GUIDE.md) 참조

---

## 2. 프로젝트 구조

### 2.1 API Routes 구조
```
src/app/api/
├── auth/
│   ├── login/
│   │   └── route.ts          # POST /api/auth/login
│   ├── signup/
│   │   └── route.ts          # POST /api/auth/signup
│   ├── logout/
│   │   └── route.ts          # POST /api/auth/logout
│   ├── google/
│   │   └── route.ts          # GET/POST /api/auth/google
│   └── password-reset/
│       └── route.ts          # POST /api/auth/password-reset
├── teams/
│   ├── route.ts              # GET/POST /api/teams
│   ├── [id]/
│   │   └── route.ts          # GET/PUT/DELETE /api/teams/:id
│   ├── [id]/members/
│   │   └── route.ts          # GET/POST /api/teams/:id/members
│   └── [id]/invite/
│       └── route.ts          # POST /api/teams/:id/invite
├── projects/
│   ├── route.ts              # GET/POST /api/projects
│   └── [id]/
│       └── route.ts          # GET/PUT/DELETE /api/projects/:id
├── issues/
│   ├── route.ts              # GET/POST /api/issues
│   └── [id]/
│       └── route.ts          # GET/PUT/DELETE /api/issues/:id
├── notifications/
│   ├── route.ts              # GET /api/notifications
│   └── [id]/
│       └── route.ts          # PUT/DELETE /api/notifications/:id
└── ai/
    ├── summary/
    │   └── route.ts          # POST /api/ai/summary
    └── suggestion/
        └── route.ts          # POST /api/ai/suggestion
```

### 2.2 목 데이터 구조
```
src/lib/mock/
├── data/
│   ├── users.ts              # 사용자 목 데이터
│   ├── teams.ts              # 팀 목 데이터
│   ├── projects.ts            # 프로젝트 목 데이터
│   ├── issues.ts             # 이슈 목 데이터
│   ├── comments.ts           # 댓글 목 데이터
│   └── notifications.ts      # 알림 목 데이터
├── services/
│   ├── auth-service.ts       # 인증 서비스 (목 데이터)
│   ├── team-service.ts       # 팀 서비스 (목 데이터)
│   ├── project-service.ts    # 프로젝트 서비스 (목 데이터)
│   ├── issue-service.ts      # 이슈 서비스 (목 데이터)
│   └── notification-service.ts # 알림 서비스 (목 데이터)
└── utils/
    ├── mock-db.ts            # 목 데이터베이스 유틸리티
    └── mock-helpers.ts      # 목 데이터 헬퍼 함수
```

---

## 3. 목 데이터 구현

### 3.1 목 데이터베이스 유틸리티

**`src/lib/mock/utils/mock-db.ts`**:
```typescript
/**
 * 목 데이터베이스 유틸리티
 * 메모리 기반 데이터 저장소
 */

import type { User, Team, Project, Issue, Comment, Notification } from "@/types";

class MockDatabase {
  private users: Map<string, User> = new Map();
  private teams: Map<string, Team> = new Map();
  private projects: Map<string, Project> = new Map();
  private issues: Map<string, Issue> = new Map();
  private comments: Map<string, Comment> = new Map();
  private notifications: Map<string, Notification> = new Map();

  // Users
  getUser(id: string): User | undefined {
    return this.users.get(id);
  }

  getUsers(): User[] {
    return Array.from(this.users.values());
  }

  createUser(user: User): User {
    this.users.set(user.id, user);
    return user;
  }

  updateUser(id: string, updates: Partial<User>): User | undefined {
    const user = this.users.get(id);
    if (!user) return undefined;
    const updated = { ...user, ...updates, updatedAt: new Date().toISOString() };
    this.users.set(id, updated);
    return updated;
  }

  deleteUser(id: string): boolean {
    return this.users.delete(id);
  }

  // Teams
  getTeam(id: string): Team | undefined {
    return this.teams.get(id);
  }

  getTeams(): Team[] {
    return Array.from(this.teams.values());
  }

  createTeam(team: Team): Team {
    this.teams.set(team.id, team);
    return team;
  }

  updateTeam(id: string, updates: Partial<Team>): Team | undefined {
    const team = this.teams.get(id);
    if (!team) return undefined;
    const updated = { ...team, ...updates, updatedAt: new Date().toISOString() };
    this.teams.set(id, updated);
    return updated;
  }

  deleteTeam(id: string): boolean {
    return this.teams.delete(id);
  }

  // Projects
  getProject(id: string): Project | undefined {
    return this.projects.get(id);
  }

  getProjects(): Project[] {
    return Array.from(this.projects.values());
  }

  createProject(project: Project): Project {
    this.projects.set(project.id, project);
    return project;
  }

  updateProject(id: string, updates: Partial<Project>): Project | undefined {
    const project = this.projects.get(id);
    if (!project) return undefined;
    const updated = { ...project, ...updates, updatedAt: new Date().toISOString() };
    this.projects.set(id, updated);
    return updated;
  }

  deleteProject(id: string): boolean {
    return this.projects.delete(id);
  }

  // Issues
  getIssue(id: string): Issue | undefined {
    return this.issues.get(id);
  }

  getIssues(): Issue[] {
    return Array.from(this.issues.values());
  }

  createIssue(issue: Issue): Issue {
    this.issues.set(issue.id, issue);
    return issue;
  }

  updateIssue(id: string, updates: Partial<Issue>): Issue | undefined {
    const issue = this.issues.get(id);
    if (!issue) return undefined;
    const updated = { ...issue, ...updates, updatedAt: new Date().toISOString() };
    this.issues.set(id, updated);
    return updated;
  }

  deleteIssue(id: string): boolean {
    return this.issues.delete(id);
  }

  // Comments
  getComment(id: string): Comment | undefined {
    return this.comments.get(id);
  }

  getComments(): Comment[] {
    return Array.from(this.comments.values());
  }

  createComment(comment: Comment): Comment {
    this.comments.set(comment.id, comment);
    return comment;
  }

  updateComment(id: string, updates: Partial<Comment>): Comment | undefined {
    const comment = this.comments.get(id);
    if (!comment) return undefined;
    const updated = { ...comment, ...updates, updatedAt: new Date().toISOString() };
    this.comments.set(id, updated);
    return updated;
  }

  deleteComment(id: string): boolean {
    return this.comments.delete(id);
  }

  // Notifications
  getNotification(id: string): Notification | undefined {
    return this.notifications.get(id);
  }

  getNotifications(): Notification[] {
    return Array.from(this.notifications.values());
  }

  createNotification(notification: Notification): Notification {
    this.notifications.set(notification.id, notification);
    return notification;
  }

  updateNotification(id: string, updates: Partial<Notification>): Notification | undefined {
    const notification = this.notifications.get(id);
    if (!notification) return undefined;
    const updated = { ...notification, ...updates, updatedAt: new Date().toISOString() };
    this.notifications.set(id, updated);
    return updated;
  }

  deleteNotification(id: string): boolean {
    return this.notifications.delete(id);
  }

  // 초기 데이터 로드
  initialize(initialData: {
    users?: User[];
    teams?: Team[];
    projects?: Project[];
    issues?: Issue[];
    comments?: Comment[];
    notifications?: Notification[];
  }) {
    if (initialData.users) {
      initialData.users.forEach((user) => this.users.set(user.id, user));
    }
    if (initialData.teams) {
      initialData.teams.forEach((team) => this.teams.set(team.id, team));
    }
    if (initialData.projects) {
      initialData.projects.forEach((project) => this.projects.set(project.id, project));
    }
    if (initialData.issues) {
      initialData.issues.forEach((issue) => this.issues.set(issue.id, issue));
    }
    if (initialData.comments) {
      initialData.comments.forEach((comment) => this.comments.set(comment.id, comment));
    }
    if (initialData.notifications) {
      initialData.notifications.forEach((notification) =>
        this.notifications.set(notification.id, notification)
      );
    }
  }
}

// 싱글톤 인스턴스
export const mockDb = new MockDatabase();
```

### 3.2 초기 목 데이터

**`src/lib/mock/data/users.ts`**:
```typescript
import type { User } from "@/types";

export const mockUsers: User[] = [
  {
    id: "user1",
    name: "홍길동",
    email: "hong@example.com",
    avatar: undefined,
    role: "OWNER",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "user2",
    name: "김철수",
    email: "kim@example.com",
    avatar: undefined,
    role: "MEMBER",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  // 추가 사용자...
];
```

**`src/lib/mock/data/issues.ts`**:
```typescript
import type { Issue } from "@/types";

export const mockIssues: Issue[] = [
  {
    id: "issue1",
    title: "로그인 기능 개선",
    description: "사용자 인증 로직을 개선해야 합니다",
    status: "IN_PROGRESS",
    priority: "HIGH",
    projectId: "proj1",
    assigneeId: "user1",
    assignee: {
      id: "user1",
      name: "홍길동",
      email: "hong@example.com",
    },
    labels: [
      { id: "label1", name: "버그", color: "#EF4444" },
      { id: "label2", name: "프론트엔드", color: "#3B82F6" },
    ],
    subtasks: [
      { id: "subtask1", title: "세션 관리 로직 수정", completed: true, issueId: "issue1", order: 1 },
      { id: "subtask2", title: "토큰 갱신 기능 추가", completed: false, issueId: "issue1", order: 2 },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  // 추가 이슈...
];
```

### 3.3 목 데이터 초기화

**`src/lib/mock/index.ts`**:
```typescript
import { mockDb } from "./utils/mock-db";
import { mockUsers } from "./data/users";
import { mockTeams } from "./data/teams";
import { mockProjects } from "./data/projects";
import { mockIssues } from "./data/issues";
import { mockComments } from "./data/comments";
import { mockNotifications } from "./data/notifications";

/**
 * 목 데이터베이스 초기화
 * 개발 환경에서만 사용
 */
export function initializeMockData() {
  if (process.env.NODE_ENV === "development") {
    mockDb.initialize({
      users: mockUsers,
      teams: mockTeams,
      projects: mockProjects,
      issues: mockIssues,
      comments: mockComments,
      notifications: mockNotifications,
    });
  }
}

export { mockDb };
export * from "./data/users";
export * from "./data/teams";
export * from "./data/projects";
export * from "./data/issues";
export * from "./data/comments";
export * from "./data/notifications";
```

---

## 4. API Routes 구현

### 4.1 기본 API Route 구조

**`src/app/api/issues/route.ts`**:
```typescript
import { NextRequest, NextResponse } from "next/server";
import { mockDb } from "@/lib/mock";
import type { Issue, PaginatedResponse } from "@/types";

/**
 * GET /api/issues
 * 이슈 목록 조회
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId");
    const status = searchParams.get("status");
    const priority = searchParams.get("priority");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const sortBy = searchParams.get("sortBy") || "updated";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    // 목 데이터에서 이슈 조회
    let issues = mockDb.getIssues();

    // 필터링
    if (projectId) {
      issues = issues.filter((issue) => issue.projectId === projectId);
    }
    if (status) {
      issues = issues.filter((issue) => issue.status === status);
    }
    if (priority) {
      issues = issues.filter((issue) => issue.priority === priority);
    }
    if (search) {
      const searchLower = search.toLowerCase();
      issues = issues.filter(
        (issue) =>
          issue.title.toLowerCase().includes(searchLower) ||
          issue.description?.toLowerCase().includes(searchLower)
      );
    }

    // 정렬
    issues.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "created":
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case "updated":
          comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
          break;
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    // 페이지네이션
    const total = issues.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedIssues = issues.slice(startIndex, endIndex);

    const response: PaginatedResponse<Issue> = {
      data: paginatedIssues,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching issues:", error);
    return NextResponse.json(
      { error: "Failed to fetch issues" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/issues
 * 이슈 생성
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, projectId, assigneeId, priority, labels, dueDate } = body;

    // 유효성 검사
    if (!title || !projectId) {
      return NextResponse.json(
        { error: "Title and projectId are required" },
        { status: 400 }
      );
    }

    // 새 이슈 생성
    const newIssue: Issue = {
      id: `issue-${Date.now()}`,
      title,
      description,
      status: "TODO",
      priority: priority || "MEDIUM",
      projectId,
      assigneeId,
      labels: labels || [],
      dueDate,
      subtasks: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const createdIssue = mockDb.createIssue(newIssue);

    return NextResponse.json(createdIssue, { status: 201 });
  } catch (error) {
    console.error("Error creating issue:", error);
    return NextResponse.json(
      { error: "Failed to create issue" },
      { status: 500 }
    );
  }
}
```

**`src/app/api/issues/[id]/route.ts`**:
```typescript
import { NextRequest, NextResponse } from "next/server";
import { mockDb } from "@/lib/mock";
import type { Issue } from "@/types";

/**
 * GET /api/issues/:id
 * 이슈 상세 조회
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const issue = mockDb.getIssue(params.id);

    if (!issue) {
      return NextResponse.json(
        { error: "Issue not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(issue);
  } catch (error) {
    console.error("Error fetching issue:", error);
    return NextResponse.json(
      { error: "Failed to fetch issue" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/issues/:id
 * 이슈 수정
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const issue = mockDb.getIssue(params.id);

    if (!issue) {
      return NextResponse.json(
        { error: "Issue not found" },
        { status: 404 }
      );
    }

    const updatedIssue = mockDb.updateIssue(params.id, body);

    return NextResponse.json(updatedIssue);
  } catch (error) {
    console.error("Error updating issue:", error);
    return NextResponse.json(
      { error: "Failed to update issue" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/issues/:id
 * 이슈 삭제 (Soft Delete)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const issue = mockDb.getIssue(params.id);

    if (!issue) {
      return NextResponse.json(
        { error: "Issue not found" },
        { status: 404 }
      );
    }

    // Soft Delete: deletedAt 필드 추가
    mockDb.updateIssue(params.id, {
      deletedAt: new Date().toISOString(),
    });

    return NextResponse.json({ message: "Issue deleted successfully" });
  } catch (error) {
    console.error("Error deleting issue:", error);
    return NextResponse.json(
      { error: "Failed to delete issue" },
      { status: 500 }
    );
  }
}
```

### 4.2 인증 API Route

**`src/app/api/auth/login/route.ts`**:
```typescript
import { NextRequest, NextResponse } from "next/server";
import { mockDb } from "@/lib/mock";
import jwt from "jsonwebtoken";

/**
 * POST /api/auth/login
 * 로그인
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // 목 데이터에서 사용자 찾기
    const users = mockDb.getUsers();
    const user = users.find((u) => u.email === email);

    // 실제 구현에서는 비밀번호 해시 비교
    // 여기서는 간단히 이메일만 확인
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // JWT 토큰 생성
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || "default-secret",
      { expiresIn: process.env.JWT_EXPIRES_IN || "24h" }
    );

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
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

---

## 5. 인증 미들웨어

### 5.1 인증 미들웨어 구현

**`src/lib/api/middleware.ts`**:
```typescript
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export interface AuthRequest extends NextRequest {
  user?: {
    userId: string;
    email: string;
  };
}

/**
 * JWT 토큰 검증 미들웨어
 */
export function verifyAuth(request: NextRequest): {
  user?: { userId: string; email: string };
  error?: NextResponse;
} {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return {
      error: NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      ),
    };
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "default-secret"
    ) as { userId: string; email: string };

    return { user: decoded };
  } catch (error) {
    return {
      error: NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      ),
    };
  }
}

/**
 * 인증이 필요한 API Route 래퍼
 */
export function withAuth(
  handler: (request: NextRequest, user: { userId: string; email: string }) => Promise<NextResponse>
) {
  return async (request: NextRequest) => {
    const { user, error } = verifyAuth(request);

    if (error || !user) {
      return error || NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return handler(request, user);
  };
}
```

### 5.2 인증이 필요한 API Route 예시

**`src/app/api/projects/route.ts`**:
```typescript
import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/api/middleware";
import { mockDb } from "@/lib/mock";
import type { Project } from "@/types";

/**
 * GET /api/projects
 * 프로젝트 목록 조회 (인증 필요)
 */
export const GET = withAuth(async (request: NextRequest, user) => {
  try {
    const { searchParams } = new URL(request.url);
    const teamId = searchParams.get("teamId");
    const search = searchParams.get("search");
    const showArchived = searchParams.get("archived") === "true";

    let projects = mockDb.getProjects();

    // 필터링
    if (teamId) {
      projects = projects.filter((project) => project.teamId === teamId);
    }
    if (search) {
      const searchLower = search.toLowerCase();
      projects = projects.filter(
        (project) =>
          project.name.toLowerCase().includes(searchLower) ||
          project.description?.toLowerCase().includes(searchLower)
      );
    }
    if (!showArchived) {
      projects = projects.filter((project) => !project.isArchived);
    }

    return NextResponse.json({ data: projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
});

/**
 * POST /api/projects
 * 프로젝트 생성 (인증 필요)
 */
export const POST = withAuth(async (request: NextRequest, user) => {
  try {
    const body = await request.json();
    const { name, description, teamId } = body;

    if (!name || !teamId) {
      return NextResponse.json(
        { error: "Name and teamId are required" },
        { status: 400 }
      );
    }

    const newProject: Project = {
      id: `proj-${Date.now()}`,
      name,
      description,
      teamId,
      isArchived: false,
      isFavorite: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const createdProject = mockDb.createProject(newProject);

    return NextResponse.json(createdProject, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
});
```

---

## 6. 목 데이터 초기화

### 6.1 앱 시작 시 목 데이터 초기화

**`src/app/api/init/route.ts`** (선택):
```typescript
import { NextResponse } from "next/server";
import { initializeMockData } from "@/lib/mock";

/**
 * GET /api/init
 * 목 데이터 초기화 (개발 환경에서만)
 */
export async function GET() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Not available in production" },
      { status: 403 }
    );
  }

  initializeMockData();

  return NextResponse.json({ message: "Mock data initialized" });
}
```

또는 **`src/app/layout.tsx`**에서 초기화:
```typescript
import { initializeMockData } from "@/lib/mock";

// 개발 환경에서만 초기화
if (process.env.NODE_ENV === "development") {
  initializeMockData();
}
```

---

## 7. 에러 처리

### 7.1 통일된 에러 응답 형식

**`src/lib/api/errors.ts`**:
```typescript
import { NextResponse } from "next/server";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function handleApiError(error: unknown): NextResponse {
  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        error: {
          message: error.message,
          code: error.code,
        },
      },
      { status: error.status }
    );
  }

  console.error("Unexpected error:", error);
  return NextResponse.json(
    {
      error: {
        message: "Internal server error",
        code: "INTERNAL_ERROR",
      },
    },
    { status: 500 }
  );
}
```

---

## 8. 실제 데이터베이스 연동 (향후)

### 8.1 데이터베이스 선택
- SQLite (개발/소규모)
- PostgreSQL (프로덕션)
- Supabase (서버리스)
- PlanetScale (MySQL 호환)

### 8.2 ORM 선택
- Prisma (추천)
- Drizzle
- TypeORM

### 8.3 마이그레이션 계획
목 데이터 구조를 실제 데이터베이스 스키마로 변환:
1. Prisma 스키마 정의
2. 마이그레이션 실행
3. 목 데이터를 실제 DB로 이관
4. API Routes에서 DB 쿼리로 교체

---

## 9. 개발 워크플로우

### 9.1 개발 단계
1. **Phase 1**: 목 데이터 + API Routes 구현
2. **Phase 2**: 실제 데이터베이스 연동
3. **Phase 3**: 인증 및 권한 구현
4. **Phase 4**: AI 기능 연동
5. **Phase 5**: 이메일 발송 구현

### 9.2 테스트
- API Routes 단위 테스트
- 통합 테스트
- E2E 테스트

---

## 10. API 엔드포인트 요약

### 10.1 인증 API
- `POST /api/auth/login` - 로그인
- `POST /api/auth/signup` - 회원가입
- `POST /api/auth/logout` - 로그아웃
- `GET/POST /api/auth/google` - Google OAuth
- `POST /api/auth/password-reset` - 비밀번호 재설정

### 10.2 팀 API
- `GET /api/teams` - 팀 목록 조회
- `POST /api/teams` - 팀 생성
- `GET /api/teams/[id]` - 팀 상세 조회
- `PUT /api/teams/[id]` - 팀 수정
- `DELETE /api/teams/[id]` - 팀 삭제
- `GET /api/teams/[id]/members` - 팀 멤버 목록
- `POST /api/teams/[id]/members` - 팀 멤버 추가
- `POST /api/teams/[id]/invite` - 팀 멤버 초대

### 10.3 프로젝트 API
- `GET /api/projects` - 프로젝트 목록 조회
- `POST /api/projects` - 프로젝트 생성
- `GET /api/projects/[id]` - 프로젝트 상세 조회
- `PUT /api/projects/[id]` - 프로젝트 수정
- `DELETE /api/projects/[id]` - 프로젝트 삭제

### 10.4 이슈 API
- `GET /api/issues` - 이슈 목록 조회 (쿼리 파라미터: projectId, status, priority, search, page, limit, sortBy, sortOrder)
- `POST /api/issues` - 이슈 생성
- `GET /api/issues/[id]` - 이슈 상세 조회
- `PUT /api/issues/[id]` - 이슈 수정
- `DELETE /api/issues/[id]` - 이슈 삭제

### 10.5 알림 API
- `GET /api/notifications` - 알림 목록 조회
- `PUT /api/notifications/[id]` - 알림 읽음 처리
- `DELETE /api/notifications/[id]` - 알림 삭제

### 10.6 AI API
- `POST /api/ai/summary` - 이슈 설명 요약 (FR-040)
- `POST /api/ai/suggestion` - 해결 전략 제안 (FR-041)
- `POST /api/ai/auto-label` - 라벨 자동 분류 (FR-043)
- `POST /api/ai/duplicate-detection` - 중복 이슈 탐지 (FR-044)
- `POST /api/ai/comment-summary` - 댓글 요약 (FR-045)

**상세한 API 문서는 백업 폴더의 `API_DOCUMENTATION.md` 참조**

---

## 12. AI 기능 설정 및 사용 가이드

### 12.1 개요

SumUp 프로젝트의 AI 기능은 GPT와 Gemini API를 지원합니다. 모든 필수 AI 기능이 구현되어 있으며, Rate Limiting과 캐싱 시스템이 포함되어 있습니다.

### 12.2 환경 변수 설정

`.env.local` 파일에 다음 환경 변수를 설정하세요:

```env
# AI Provider 선택: "gpt" 또는 "gemini"
AI_PROVIDER=gpt

# OpenAI API Key (GPT 사용 시)
OPENAI_API_KEY=sk-...

# Gemini API Key (Gemini 사용 시)
GEMINI_API_KEY=...

# AI Model (선택사항, 기본값: gpt-3.5-turbo 또는 gemini-pro)
AI_MODEL=gpt-3.5-turbo
```

### 12.3 API 키 발급 방법

#### OpenAI (GPT)
1. [OpenAI Platform](https://platform.openai.com/)에 접속
2. 계정 생성 또는 로그인
3. API Keys 메뉴에서 새 API 키 생성
4. 생성된 키를 `OPENAI_API_KEY`에 설정

#### Google Gemini
1. [Google AI Studio](https://makersuite.google.com/app/apikey)에 접속
2. Google 계정으로 로그인
3. "Create API Key" 클릭
4. 생성된 키를 `GEMINI_API_KEY`에 설정

### 12.4 구현된 AI 기능

#### 1. 이슈 설명 요약 (FR-040)
- **엔드포인트**: `POST /api/ai/summary`
- **설명**: 이슈 설명을 2-4문장으로 요약
- **제한**: 설명이 10자 이상이어야 함
- **캐싱**: 설명이 변경되면 자동으로 캐시 무효화

#### 2. 해결 전략 제안 (FR-041)
- **엔드포인트**: `POST /api/ai/suggestion`
- **설명**: 이슈 해결을 위한 접근 방식 제안
- **제한**: 설명이 10자 이상이어야 함
- **캐싱**: 설명이 변경되면 자동으로 캐시 무효화

#### 3. 라벨 자동 분류 (FR-043)
- **엔드포인트**: `POST /api/ai/auto-label`
- **설명**: 이슈 제목과 설명을 기반으로 적절한 라벨 추천
- **출력**: 최대 3개의 라벨 추천

#### 4. 중복 이슈 탐지 (FR-044)
- **엔드포인트**: `POST /api/ai/duplicate-detection`
- **설명**: 새 이슈와 기존 이슈들의 유사도 비교
- **출력**: 유사한 이슈 최대 3개

#### 5. 댓글 요약 (FR-045)
- **엔드포인트**: `POST /api/ai/comment-summary`
- **설명**: 댓글이 많은 이슈의 논의 내용 요약
- **제한**: 댓글이 5개 이상이어야 함
- **캐싱**: 새 댓글이 추가되면 자동으로 캐시 무효화

### 12.5 Rate Limiting

AI API 호출은 다음 제한이 적용됩니다:
- **분당**: 10회
- **일당**: 100회

제한을 초과하면 429 에러가 반환되며, 남은 시간과 횟수가 표시됩니다.

### 12.6 캐싱 시스템

AI 결과는 다음 조건에서 캐싱됩니다:
1. **이슈 설명 요약**: 설명 내용이 변경되면 캐시 무효화
2. **해결 전략 제안**: 설명 내용이 변경되면 캐시 무효화
3. **댓글 요약**: 새 댓글이 추가되면 캐시 무효화

캐시는 24시간 동안 유효하며, 자동으로 정리됩니다.

### 12.7 사용 방법

#### 이슈 상세 페이지
이슈 상세 페이지의 사이드바에 "AI 기능" 카드가 표시됩니다:
1. **설명 요약**: "요약 생성" 버튼 클릭
2. **해결 전략 제안**: "제안 생성" 버튼 클릭
3. **댓글 요약**: 댓글이 5개 이상일 때 "요약 생성" 버튼 클릭

#### 프로그래밍 방식
```typescript
import { useAI } from "@/hooks/useAI";

function MyComponent() {
  const { generateSummary, generateSuggestion, isLoading, error } = useAI();

  const handleSummary = async () => {
    try {
      const result = await generateSummary(issueId, description, userId);
      console.log(result.content);
    } catch (err) {
      console.error(err);
    }
  };
}
```

### 12.8 에러 처리

AI API 호출 실패 시 다음 에러가 발생할 수 있습니다:
- **400**: 필수 파라미터 누락 또는 설명이 너무 짧음
- **429**: Rate Limit 초과
- **500**: AI API 키 미설정 또는 API 호출 실패

에러 메시지는 사용자에게 명확하게 표시됩니다.

### 12.9 비용 고려사항

#### GPT-3.5-turbo
- 약 $0.0015 per 1K tokens (입력)
- 약 $0.002 per 1K tokens (출력)

#### Gemini Pro
- 무료 티어 제공 (일일 제한 있음)
- 유료 플랜도 제공

**권장사항**: 개발/테스트 단계에서는 Gemini 무료 티어를 사용하고, 프로덕션에서는 GPT-3.5-turbo를 사용하는 것을 권장합니다.

### 12.10 구현 완료 항목

✅ AI API 엔드포인트 (5개)  
✅ AI 클라이언트 라이브러리 (GPT, Gemini 지원)  
✅ Rate Limiting (분당 10회, 일당 100회)  
✅ 캐싱 시스템 (24시간 유효)  
✅ AI 프롬프트 템플릿  
✅ AI 기능 훅 (`useAI`)  
✅ AI 기능 컴포넌트 (`AIFeatures`)  
✅ 이슈 생성 폼 AI 기능 (자동 라벨 추천, 중복 탐지)

---

## 11. 참고 자료

### 11.1 관련 문서
- [PRD.md](./PRD.md) - 제품 요구사항 문서
- [DEVELOPMENT_PLAN.md](./DEVELOPMENT_PLAN.md) - 개발 계획
- [REFACTORING_ANALYSIS.md](./REFACTORING_ANALYSIS.md) - 리팩토링 분석

### 11.2 외부 자료
- [Next.js API Routes 문서](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Prisma 문서](https://www.prisma.io/docs)
- [JWT 인증 가이드](https://jwt.io/introduction)

---

## 문서 이력

| 버전 | 날짜 | 작성자 | 변경사항 |
|------|------|--------|---------|
| 1.0 | 2025-11-29 | Initial | 초기 백엔드 API 개발 가이드 작성 |

---

**문서 종료**

