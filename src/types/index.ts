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

// 프로젝트 관련 타입
export interface Project {
  id: string;
  name: string;
  description?: string;
  teamId: string;
  team?: Team;
  isArchived: boolean;
  isFavorite: boolean;
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
  status: IssueStatus;
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

