import type { Issue } from "@/types";
import type { KanbanCardType, KanbanStatus } from "@/components/kanban";

/**
 * 이슈 상태를 칸반 상태 ID로 변환
 */
export function issueStatusToKanbanStatusId(status: Issue["status"]): string {
  const statusMap: Record<Issue["status"], string> = {
    TODO: "todo",
    IN_PROGRESS: "in_progress",
    IN_REVIEW: "in_review",
    DONE: "done",
  };
  return statusMap[status] || "todo";
}

/**
 * 칸반 상태 ID를 이슈 상태로 변환
 */
export function kanbanStatusIdToIssueStatus(statusId: string): Issue["status"] {
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
export function issueToKanbanCard(issue: Issue, order?: number): KanbanCardType {
  return {
    id: issue.id,
    title: issue.title,
    description: issue.description || undefined,
    statusId: issueStatusToKanbanStatusId(issue.status),
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

