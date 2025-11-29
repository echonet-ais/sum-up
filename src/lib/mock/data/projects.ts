/**
 * 프로젝트 목 데이터
 */

import type { Project } from "@/types";

export const mockProjects: Project[] = [
  {
    id: "proj1",
    name: "SumUp 웹앱",
    description: "AI 기반 이슈 트래킹 시스템 개발",
    teamId: "team1",
    isArchived: false,
    isFavorite: true,
    createdAt: new Date("2025-01-10").toISOString(),
    updatedAt: new Date("2025-01-15").toISOString(),
  },
  {
    id: "proj2",
    name: "모바일 앱",
    description: "React Native 기반 모바일 애플리케이션",
    teamId: "team1",
    isArchived: false,
    isFavorite: false,
    createdAt: new Date("2025-01-12").toISOString(),
    updatedAt: new Date("2025-01-14").toISOString(),
  },
  {
    id: "proj3",
    name: "API 서버",
    description: "RESTful API 서버 개발",
    teamId: "team1",
    isArchived: true,
    isFavorite: false,
    createdAt: new Date("2025-01-08").toISOString(),
    updatedAt: new Date("2025-01-20").toISOString(),
  },
  {
    id: "proj4",
    name: "디자인 시스템",
    description: "컴포넌트 라이브러리 및 디자인 시스템 구축",
    teamId: "team2",
    isArchived: false,
    isFavorite: true,
    createdAt: new Date("2025-01-11").toISOString(),
    updatedAt: new Date("2025-01-13").toISOString(),
  },
];

/**
 * 프로젝트 ID로 프로젝트 찾기
 */
export function findProjectById(id: string): Project | undefined {
  return mockProjects.find((project) => project.id === id);
}

/**
 * 팀 ID로 프로젝트 찾기
 */
export function findProjectsByTeamId(teamId: string): Project[] {
  return mockProjects.filter((project) => project.teamId === teamId);
}

/**
 * 아카이브되지 않은 프로젝트 찾기
 */
export function findActiveProjects(teamId?: string): Project[] {
  let projects = mockProjects.filter((project) => !project.isArchived);
  if (teamId) {
    projects = projects.filter((project) => project.teamId === teamId);
  }
  return projects;
}

