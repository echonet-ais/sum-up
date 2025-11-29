/**
 * 목 데이터 헬퍼 함수
 */

import type { Issue, Project, User, Team } from "@/types";

/**
 * ID 생성 헬퍼
 */
export function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * 현재 타임스탬프 반환
 */
export function getCurrentTimestamp(): string {
  return new Date().toISOString();
}

/**
 * 날짜로부터 N일 전/후 계산
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * 이슈 상태별 개수 계산
 */
export function countIssuesByStatus(
  issues: Issue[]
): Record<Issue["status"], number> {
  return issues.reduce(
    (acc, issue) => {
      acc[issue.status] = (acc[issue.status] || 0) + 1;
      return acc;
    },
    {
      TODO: 0,
      IN_PROGRESS: 0,
      IN_REVIEW: 0,
      DONE: 0,
    } as Record<Issue["status"], number>
  );
}

/**
 * 프로젝트별 이슈 개수 계산
 */
export function countIssuesByProject(issues: Issue[]): Record<string, number> {
  return issues.reduce((acc, issue) => {
    acc[issue.projectId] = (acc[issue.projectId] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}

/**
 * 사용자별 담당 이슈 개수 계산
 */
export function countIssuesByAssignee(issues: Issue[]): Record<string, number> {
  return issues.reduce((acc, issue) => {
    if (issue.assigneeId) {
      acc[issue.assigneeId] = (acc[issue.assigneeId] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
}

/**
 * 팀 멤버 확인
 */
export function isTeamMember(team: Team, userId: string): boolean {
  return team.members.some((member) => member.userId === userId);
}

/**
 * 팀 역할 확인
 */
export function getTeamRole(team: Team, userId: string): Team["members"][0]["role"] | undefined {
  const member = team.members.find((m) => m.userId === userId);
  return member?.role;
}

/**
 * 프로젝트 접근 권한 확인
 */
export function canAccessProject(
  project: Project,
  team: Team,
  userId: string
): boolean {
  return isTeamMember(team, userId);
}

/**
 * 이슈 수정 권한 확인
 */
export function canEditIssue(
  issue: Issue,
  team: Team,
  userId: string
): boolean {
  // 팀 멤버면 수정 가능
  return isTeamMember(team, userId);
}

/**
 * 이슈 삭제 권한 확인
 */
export function canDeleteIssue(
  issue: Issue,
  team: Team,
  userId: string
): boolean {
  const role = getTeamRole(team, userId);
  const isOwner = issue.assigneeId === userId; // 이슈 소유자
  const isProjectOwner = false; // TODO: 프로젝트 소유자 확인 로직 추가

  return (
    role === "OWNER" ||
    role === "ADMIN" ||
    isOwner ||
    isProjectOwner
  );
}

