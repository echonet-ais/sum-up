"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { LoadingState, EmptyState } from "@/components/common";
import type { IssueHistory } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

interface IssueHistoryProps {
  issueId: string;
}

// 필드 이름 매핑
const fieldNameMap: Record<IssueHistory["field"], string> = {
  title: "제목",
  description: "설명",
  status: "상태",
  priority: "우선순위",
  assignee: "담당자",
  dueDate: "마감일",
  labels: "라벨",
  created: "생성",
  deleted: "삭제",
};

// 상태 이름 매핑
const statusNameMap: Record<string, string> = {
  TODO: "할 일",
  IN_PROGRESS: "진행 중",
  IN_REVIEW: "검토 중",
  DONE: "완료",
};

// 우선순위 이름 매핑
const priorityNameMap: Record<string, string> = {
  HIGH: "높음",
  MEDIUM: "보통",
  LOW: "낮음",
};

function formatHistoryValue(field: IssueHistory["field"], value: string | null): string {
  if (value === null) return "없음";
  
  switch (field) {
    case "status":
      return statusNameMap[value] || value;
    case "priority":
      return priorityNameMap[value] || value;
    default:
      return value;
  }
}

function formatHistoryDescription(history: IssueHistory): string {
  const fieldName = fieldNameMap[history.field] || history.field;
  
  if (history.field === "created") {
    return `${fieldName}됨`;
  }
  
  if (history.field === "deleted") {
    return `${fieldName}됨`;
  }
  
  if (history.oldValue === null) {
    return `${fieldName}을(를) "${formatHistoryValue(history.field, history.newValue)}"로 설정`;
  }
  
  if (history.newValue === null) {
    return `${fieldName}을(를) 제거`;
  }
  
  return `${fieldName}을(를) "${formatHistoryValue(history.field, history.oldValue)}"에서 "${formatHistoryValue(history.field, history.newValue)}"로 변경`;
}

export function IssueHistory({ issueId }: IssueHistoryProps) {
  const [history, setHistory] = useState<IssueHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHistory() {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/issues/${issueId}/history`);
        
        if (!response.ok) {
          throw new Error("히스토리를 불러오는데 실패했습니다.");
        }
        
        const data = await response.json();
        setHistory(data.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "히스토리를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchHistory();
  }, [issueId]);

  if (isLoading) {
    return (
      <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
        <CardHeader>
          <CardTitle>변경 히스토리</CardTitle>
        </CardHeader>
        <CardContent>
          <LoadingState />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
        <CardHeader>
          <CardTitle>변경 히스토리</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-[var(--color-error)]">{error}</div>
        </CardContent>
      </Card>
    );
  }

  if (history.length === 0) {
    return (
      <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
        <CardHeader>
          <CardTitle>변경 히스토리</CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState title="변경 히스토리가 없습니다." description="이슈에 대한 변경 사항이 없습니다." iconName="history" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
      <CardHeader>
        <CardTitle>변경 히스토리</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {history.map((item) => (
            <div key={item.id} className="flex gap-3 pb-4 border-b border-[var(--border-subtle)] last:border-0 last:pb-0">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-[var(--brand-primary)] flex items-center justify-center text-white text-sm">
                  {item.user.name[0]}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-[var(--text-strong)]">
                    {item.user.name}
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">
                    {formatDistanceToNow(new Date(item.createdAt), {
                      addSuffix: true,
                      locale: ko,
                    })}
                  </span>
                </div>
                <p className="text-sm text-[var(--text-muted)]">
                  {formatHistoryDescription(item)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

