import type { Project, Issue, IssueStatus } from "@/types";

/**
 * 프로젝트별 이슈 통계 계산
 */
export function calculateProjectIssueStats(projectId: string, issues: Issue[]) {
  const projectIssues = issues.filter((issue) => issue.projectId === projectId);

  return {
    total: projectIssues.length,
    byStatus: {
      TODO: projectIssues.filter((i) => i.status === "TODO").length,
      IN_PROGRESS: projectIssues.filter((i) => i.status === "IN_PROGRESS").length,
      IN_REVIEW: projectIssues.filter((i) => i.status === "IN_REVIEW").length,
      DONE: projectIssues.filter((i) => i.status === "DONE").length,
    },
    byPriority: {
      HIGH: projectIssues.filter((i) => i.priority === "HIGH").length,
      MEDIUM: projectIssues.filter((i) => i.priority === "MEDIUM").length,
      LOW: projectIssues.filter((i) => i.priority === "LOW").length,
    },
  };
}

/**
 * 프로젝트 진행률 계산
 */
export function calculateProjectProgress(projectId: string, issues: Issue[]): number {
  const projectIssues = issues.filter((issue) => issue.projectId === projectId);
  if (projectIssues.length === 0) return 0;

  const completedIssues = projectIssues.filter((i) => i.status === "DONE").length;
  return Math.round((completedIssues / projectIssues.length) * 100);
}

/**
 * 프로젝트별 멤버 활동 통계
 */
export interface MemberActivity {
  userId: string;
  userName: string;
  issuesCreated: number;
  issuesCompleted: number;
  commentsAdded: number;
}

export function calculateProjectMemberActivity(
  projectId: string,
  issues: Issue[]
): MemberActivity[] {
  const projectIssues = issues.filter((issue) => issue.projectId === projectId);
  const memberMap = new Map<string, MemberActivity>();

  projectIssues.forEach((issue) => {
    // 이슈 생성자
    // TODO: 실제로는 issue.createdBy 같은 필드가 필요
    // 현재는 assignee로 대체

    // 이슈 완료자
    if (issue.status === "DONE" && issue.assigneeId) {
      const member = memberMap.get(issue.assigneeId) || {
        userId: issue.assigneeId,
        userName: issue.assignee?.name || "알 수 없음",
        issuesCreated: 0,
        issuesCompleted: 0,
        commentsAdded: 0,
      };
      member.issuesCompleted++;
      memberMap.set(issue.assigneeId, member);
    }

    // 댓글 작성자
    issue.comments?.forEach((comment) => {
      const member = memberMap.get(comment.authorId) || {
        userId: comment.authorId,
        userName: comment.author.name,
        issuesCreated: 0,
        issuesCompleted: 0,
        commentsAdded: 0,
      };
      member.commentsAdded++;
      memberMap.set(comment.authorId, member);
    });
  });

  return Array.from(memberMap.values());
}

