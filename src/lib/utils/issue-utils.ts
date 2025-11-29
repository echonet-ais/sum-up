import type { Issue, IssueStatus, IssuePriority } from "@/types";

/**
 * 이슈 필터링 유틸리티
 */
export function filterIssues(
  issues: Issue[],
  filters: {
    searchQuery?: string;
    status?: IssueStatus | "ALL";
    priority?: IssuePriority | "ALL";
    projectId?: string | null;
  }
): Issue[] {
  let filtered = [...issues];

  // 검색 필터
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(
      (issue) =>
        issue.title.toLowerCase().includes(query) ||
        issue.description?.toLowerCase().includes(query)
    );
  }

  // 상태 필터
  if (filters.status && filters.status !== "ALL") {
    filtered = filtered.filter((issue) => issue.status === filters.status);
  }

  // 우선순위 필터
  if (filters.priority && filters.priority !== "ALL") {
    filtered = filtered.filter((issue) => issue.priority === filters.priority);
  }

  // 프로젝트 필터
  if (filters.projectId) {
    filtered = filtered.filter((issue) => issue.projectId === filters.projectId);
  }

  return filtered;
}

/**
 * 이슈 정렬 유틸리티
 */
export function sortIssues(
  issues: Issue[],
  sortBy: "created" | "updated" | "title",
  sortOrder: "asc" | "desc"
): Issue[] {
  const sorted = [...issues];

  sorted.sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case "created":
        comparison =
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
      case "updated":
        comparison =
          new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
        break;
      case "title":
        comparison = a.title.localeCompare(b.title, "ko");
        break;
    }

    return sortOrder === "asc" ? comparison : -comparison;
  });

  return sorted;
}

/**
 * 이슈 통계 계산
 */
export function calculateIssueStats(issues: Issue[]) {
  return {
    total: issues.length,
    byStatus: {
      TODO: issues.filter((i) => i.status === "TODO").length,
      IN_PROGRESS: issues.filter((i) => i.status === "IN_PROGRESS").length,
      IN_REVIEW: issues.filter((i) => i.status === "IN_REVIEW").length,
      DONE: issues.filter((i) => i.status === "DONE").length,
    },
    byPriority: {
      HIGH: issues.filter((i) => i.priority === "HIGH").length,
      MEDIUM: issues.filter((i) => i.priority === "MEDIUM").length,
      LOW: issues.filter((i) => i.priority === "LOW").length,
    },
  };
}

/**
 * 이슈 상태 변경 가능 여부 확인
 */
export function canChangeStatus(
  currentStatus: IssueStatus,
  newStatus: IssueStatus
): boolean {
  // 상태 전환 규칙 정의
  const validTransitions: Record<IssueStatus, IssueStatus[]> = {
    TODO: ["IN_PROGRESS", "DONE"],
    IN_PROGRESS: ["IN_REVIEW", "TODO", "DONE"],
    IN_REVIEW: ["DONE", "IN_PROGRESS"],
    DONE: ["IN_PROGRESS", "IN_REVIEW"],
  };

  return validTransitions[currentStatus]?.includes(newStatus) ?? false;
}

/**
 * 서브태스크 진행률 계산
 */
export function calculateSubtaskProgress(subtasks?: Array<{ completed: boolean }>): number {
  if (!subtasks || subtasks.length === 0) return 0;
  const completed = subtasks.filter((st) => st.completed).length;
  return Math.round((completed / subtasks.length) * 100);
}

