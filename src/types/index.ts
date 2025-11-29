/**
 * SumUp Type Definitions
 * 기본 데이터 모델 타입 정의
 */

// 사용자 관련 타입
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: "OWNER" | "ADMIN" | "MEMBER";
  createdAt: Date | string;
  updatedAt: Date | string;
}

// 팀 관련 타입
export interface Team {
  id: string;
  name: string;
  description?: string;
  avatar?: string;
  members: TeamMember[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface TeamMember {
  id: string;
  userId: string;
  teamId: string;
  role: "OWNER" | "ADMIN" | "MEMBER";
  user: User;
  joinedAt: Date | string;
}

// 팀 활동 로그 관련 타입
export type TeamActivityType = 
  | "TEAM_CREATED"
  | "TEAM_UPDATED"
  | "TEAM_DELETED"
  | "MEMBER_ADDED"
  | "MEMBER_REMOVED"
  | "MEMBER_ROLE_CHANGED"
  | "PROJECT_CREATED"
  | "PROJECT_DELETED";

export interface TeamActivity {
  id: string;
  teamId: string;
  type: TeamActivityType;
  userId: string;
  user: User;
  description: string;
  metadata?: Record<string, unknown>; // 추가 정보 (예: 변경된 필드, 프로젝트 ID 등)
  createdAt: Date | string;
}

// 커스텀 상태 관련 타입 (FR-053)
export interface CustomStatus {
  id: string;
  projectId: string;
  name: string;
  color?: string;
  position: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// WIP Limit 관련 타입 (FR-054)
export interface WipLimit {
  id: string;
  projectId: string;
  status: string; // 기본 상태 또는 custom_statuses.id
  wipLimit: number | null; // 1-50 또는 null (무제한)
  createdAt: Date | string;
  updatedAt: Date | string;
}

export type WipLimits = Record<string, number | null>; // status -> limit

// 프로젝트 관련 타입
export interface Project {
  id: string;
  name: string;
  description?: string;
  teamId: string;
  team?: Team;
  isArchived: boolean;
  isFavorite: boolean;
  customStatuses?: CustomStatus[]; // FR-053: 커스텀 컬럼
  wipLimits?: WipLimits; // FR-054: WIP Limit
  createdAt: Date | string;
  updatedAt: Date | string;
}

// 이슈 관련 타입
export type IssueStatus = "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE";
export type IssuePriority = "HIGH" | "MEDIUM" | "LOW";

export interface Issue {
  id: string;
  title: string;
  description?: string;
  status: IssueStatus | string; // 커스텀 상태 ID도 허용 (FR-053)
  priority: IssuePriority;
  projectId: string;
  project?: Project;
  assigneeId?: string;
  assignee?: User;
  labels: IssueLabel[];
  dueDate?: Date | string;
  subtasks?: Subtask[]; // 선택적 필드로 변경
  comments?: Comment[]; // 댓글 목록
  attachments?: IssueAttachment[]; // 첨부파일 목록
  orderPosition?: number; // 칸반 보드 순서
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface IssueLabel {
  id: string;
  name: string;
  color: string;
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  issueId: string;
  order: number;
}

// 댓글 관련 타입
export interface Comment {
  id: string;
  content: string;
  issueId: string;
  authorId: string;
  author: User;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// 첨부파일 관련 타입
export interface IssueAttachment {
  id: string;
  issueId: string;
  fileName: string;
  fileSize: number; // bytes
  fileType: string; // MIME type
  fileUrl: string; // 다운로드 URL
  uploadedBy: string; // userId
  uploadedAt: Date | string;
}

// 이슈 변경 히스토리 관련 타입
export type IssueHistoryField = 
  | "title" 
  | "description" 
  | "status" 
  | "priority" 
  | "assignee" 
  | "dueDate" 
  | "labels"
  | "created"
  | "deleted";

export interface IssueHistory {
  id: string;
  issueId: string;
  field: IssueHistoryField;
  oldValue: string | null;
  newValue: string | null;
  userId: string;
  user: User;
  createdAt: Date | string;
}

// 통계 관련 타입
export interface DashboardStats {
  totalProjects: number;
  totalIssues: number;
  openIssues: number;
  completedIssues: number;
  issuesByStatus: Record<IssueStatus, number>;
  issuesByPriority: Record<IssuePriority, number>;
  recentActivity: Activity[];
}

export interface Activity {
  id: string;
  type: "ISSUE_CREATED" | "ISSUE_UPDATED" | "ISSUE_COMMENTED" | "PROJECT_CREATED";
  userId: string;
  user: User;
  targetId: string;
  description: string;
  createdAt: Date | string;
}

// API 응답 타입
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

