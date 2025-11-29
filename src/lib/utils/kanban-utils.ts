import type { Issue, CustomStatus, WipLimits } from "@/types";
import type { KanbanCardType, KanbanStatus } from "@/components/kanban";

/**
 * 이슈 상태를 칸반 상태 ID로 변환
 * 커스텀 상태인 경우 그대로 반환
 */
export function issueStatusToKanbanStatusId(
  status: Issue["status"] | string,
  customStatuses?: CustomStatus[]
): string {
  // 커스텀 상태인지 확인
  if (customStatuses) {
    const customStatus = customStatuses.find((cs) => cs.id === status);
    if (customStatus) {
      return customStatus.id;
    }
  }

  // 기본 상태 매핑
  const statusMap: Record<string, string> = {
    TODO: "todo",
    IN_PROGRESS: "in_progress",
    IN_REVIEW: "in_review",
    DONE: "done",
  };
  return statusMap[status] || "todo";
}

/**
 * 칸반 상태 ID를 이슈 상태로 변환
 * 커스텀 상태인 경우 그대로 반환
 */
export function kanbanStatusIdToIssueStatus(
  statusId: string,
  customStatuses?: CustomStatus[]
): Issue["status"] | string {
  // 커스텀 상태인지 확인
  if (customStatuses) {
    const customStatus = customStatuses.find((cs) => cs.id === statusId);
    if (customStatus) {
      return customStatus.id;
    }
  }

  // 기본 상태 매핑
  const statusMap: Record<string, Issue["status"]> = {
    todo: "TODO",
    in_progress: "IN_PROGRESS",
    in_review: "IN_REVIEW",
    done: "DONE",
  };
  return statusMap[statusId] || "TODO";
}

/**
 * 이슈를 칸반 카드로 변환
 */
export function issueToKanbanCard(
  issue: Issue,
  order?: number,
  customStatuses?: CustomStatus[]
): KanbanCardType {
  return {
    id: issue.id,
    title: issue.title,
    description: issue.description || undefined,
    statusId: issueStatusToKanbanStatusId(issue.status, customStatuses),
    assignee: issue.assignee
      ? {
          id: issue.assignee.id,
          name: issue.assignee.name,
          avatar: issue.assignee.avatar,
        }
      : undefined,
    priority: issue.priority,
    labels: issue.labels?.map((label) => ({
      id: label.id,
      name: label.name,
      color: label.color,
    })),
    dueDate: issue.dueDate,
    subtaskProgress: issue.subtasks
      ? {
          completed: issue.subtasks.filter((st) => st.completed).length,
          total: issue.subtasks.length,
        }
      : undefined,
    createdAt: issue.createdAt,
    order: order ?? issue.orderPosition ?? 0,
  };
}

/**
 * 기본 칸반 상태 목록
 */
export function getDefaultKanbanStatuses(): KanbanStatus[] {
  return [
    { id: "todo", name: "할 일", position: 0 },
    { id: "in_progress", name: "진행 중", position: 1 },
    { id: "in_review", name: "검토 중", position: 2 },
    { id: "done", name: "완료", position: 3 },
  ];
}

/**
 * 커스텀 상태를 칸반 상태로 변환 (FR-053)
 */
export function customStatusesToKanbanStatuses(customStatuses: CustomStatus[]): KanbanStatus[] {
  return customStatuses.map((status) => ({
    id: status.id,
    name: status.name,
    color: status.color,
    position: status.position + 4, // 기본 상태 4개 이후에 배치
  }));
}

/**
 * 프로젝트의 칸반 상태 목록 가져오기 (기본 상태 + 커스텀 상태)
 */
export function getProjectKanbanStatuses(customStatuses?: CustomStatus[]): KanbanStatus[] {
  const defaultStatuses = getDefaultKanbanStatuses();
  
  if (customStatuses && customStatuses.length > 0) {
    // 기본 상태와 커스텀 상태를 position 기준으로 정렬하여 합침
    const customKanbanStatuses = customStatusesToKanbanStatuses(customStatuses);
    const allStatuses = [...defaultStatuses, ...customKanbanStatuses];
    return allStatuses.sort((a, b) => a.position - b.position);
  }
  
  return defaultStatuses;
}

/**
 * WIP Limit을 칸반 보드 형식으로 변환 (FR-054)
 */
export function wipLimitsToKanbanWipLimits(wipLimits?: WipLimits): Record<string, number> | undefined {
  if (!wipLimits) return undefined;
  
  const result: Record<string, number> = {};
  for (const [statusId, limit] of Object.entries(wipLimits)) {
    if (limit !== null && limit !== undefined) {
      result[statusId] = limit;
    }
  }
  return Object.keys(result).length > 0 ? result : undefined;
}

