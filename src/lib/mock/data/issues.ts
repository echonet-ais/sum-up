/**
 * 이슈 목 데이터
 */

import type { Issue, Subtask } from "@/types";
import { mockUsers } from "./users";
import { mockProjectLabels } from "./labels";

export const mockSubtasks: Subtask[] = [
  {
    id: "subtask1",
    title: "세션 관리 로직 수정",
    completed: true,
    issueId: "issue1",
    order: 1,
  },
  {
    id: "subtask2",
    title: "토큰 갱신 기능 추가",
    completed: false,
    issueId: "issue1",
    order: 2,
  },
  {
    id: "subtask3",
    title: "보안 테스트",
    completed: false,
    issueId: "issue1",
    order: 3,
  },
  {
    id: "subtask4",
    title: "데이터베이스 쿼리 최적화",
    completed: true,
    issueId: "issue2",
    order: 1,
  },
  {
    id: "subtask5",
    title: "인덱스 추가",
    completed: false,
    issueId: "issue2",
    order: 2,
  },
];

export const mockIssues: Issue[] = [
  {
    id: "issue1",
    title: "로그인 기능 개선",
    description:
      "사용자 인증 로직을 개선하여 보안을 강화하고 사용자 경험을 향상시켜야 합니다. 현재 세션 관리 방식에 문제가 있어 개선이 필요합니다.",
    status: "IN_PROGRESS",
    priority: "HIGH",
    projectId: "proj1",
    assigneeId: "user1",
    assignee: mockUsers[0],
    labels: mockProjectLabels.proj1.slice(0, 2), // 버그, 프론트엔드
    subtasks: mockSubtasks.filter((st) => st.issueId === "issue1"),
    createdAt: new Date("2025-01-15").toISOString(),
    updatedAt: new Date("2025-01-20").toISOString(),
  },
  {
    id: "issue2",
    title: "API 응답 시간 최적화",
    description: "데이터베이스 쿼리 최적화가 필요합니다. 현재 응답 시간이 너무 느립니다.",
    status: "TODO",
    priority: "MEDIUM",
    projectId: "proj1",
    assigneeId: undefined,
    labels: [mockProjectLabels.proj1[2]], // 백엔드
    subtasks: mockSubtasks.filter((st) => st.issueId === "issue2"),
    createdAt: new Date("2025-01-16").toISOString(),
    updatedAt: new Date("2025-01-16").toISOString(),
  },
  {
    id: "issue3",
    title: "UI 디자인 개선",
    description: "사용자 경험을 향상시키기 위한 UI 개선이 필요합니다.",
    status: "DONE",
    priority: "LOW",
    projectId: "proj2",
    assigneeId: "user2",
    assignee: mockUsers[1],
    labels: mockProjectLabels.proj2, // 프론트엔드, 디자인
    subtasks: [],
    createdAt: new Date("2025-01-10").toISOString(),
    updatedAt: new Date("2025-01-18").toISOString(),
  },
  {
    id: "issue4",
    title: "테스트 코드 작성",
    description: "단위 테스트 및 통합 테스트 작성이 필요합니다.",
    status: "IN_REVIEW",
    priority: "MEDIUM",
    projectId: "proj1",
    assigneeId: "user1",
    assignee: mockUsers[0],
    labels: [mockProjectLabels.proj1[2]], // 백엔드
    subtasks: [],
    createdAt: new Date("2025-01-17").toISOString(),
    updatedAt: new Date("2025-01-19").toISOString(),
  },
  {
    id: "issue5",
    title: "컴포넌트 문서화",
    description: "재사용 가능한 컴포넌트에 대한 문서를 작성해야 합니다.",
    status: "TODO",
    priority: "LOW",
    projectId: "proj4",
    assigneeId: "user3",
    assignee: mockUsers[2],
    labels: mockProjectLabels.proj4, // 디자인, 문서화
    subtasks: [],
    createdAt: new Date("2025-01-18").toISOString(),
    updatedAt: new Date("2025-01-18").toISOString(),
  },
];

/**
 * 이슈 ID로 이슈 찾기
 */
export function findIssueById(id: string): Issue | undefined {
  return mockIssues.find((issue) => issue.id === id);
}

/**
 * 프로젝트 ID로 이슈 찾기
 */
export function findIssuesByProjectId(projectId: string): Issue[] {
  return mockIssues.filter((issue) => issue.projectId === projectId);
}

/**
 * 담당자 ID로 이슈 찾기
 */
export function findIssuesByAssigneeId(assigneeId: string): Issue[] {
  return mockIssues.filter((issue) => issue.assigneeId === assigneeId);
}

/**
 * 상태별 이슈 찾기
 */
export function findIssuesByStatus(status: Issue["status"]): Issue[] {
  return mockIssues.filter((issue) => issue.status === status);
}

