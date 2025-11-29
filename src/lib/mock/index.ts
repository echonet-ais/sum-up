/**
 * 목 데이터 모듈
 * 개발 환경에서 사용하는 목 데이터 및 유틸리티
 */

// 데이터
export * from "./data/users";
export * from "./data/teams";
export * from "./data/projects";
export * from "./data/issues";
export * from "./data/labels";
export * from "./data/comments";
export * from "./data/notifications";
export * from "./data/activities";

// 유틸리티
export { mockDb } from "./utils/mock-db";
export * from "./utils/mock-helpers";

// 초기화 함수
import { mockDb } from "./utils/mock-db";
import { mockUsers } from "./data/users";
import { mockTeams } from "./data/teams";
import { mockProjects } from "./data/projects";
import { mockIssues } from "./data/issues";
import { mockComments } from "./data/comments";
import { mockActivities } from "./data/activities";

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
      activities: mockActivities,
    });
  }
}

