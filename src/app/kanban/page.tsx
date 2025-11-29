"use client";

import { useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { AppLayout } from "@/components/layout";
import type { KanbanStatus, KanbanCard } from "@/components/kanban";
import { Card, CardHeader, CardTitle, CardContent } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { Button } from "@hua-labs/ui";
import { LoadingState, SectionErrorBoundary, ErrorState } from "@/components/common";
import { useIssues } from "@/hooks/useIssues";
import { apiClient } from "@/lib/api/client";
import { useToast } from "@hua-labs/ui";
import {
  issueToKanbanCard,
  getDefaultKanbanStatuses,
  kanbanStatusIdToIssueStatus,
} from "@/lib/utils/kanban-utils";

const KanbanBoard = dynamic(
  () => import("@/components/kanban").then((mod) => ({ default: mod.KanbanBoard })),
  {
    ssr: false,
    loading: () => <LoadingState message="칸반 보드를 불러오는 중..." />,
  }
);

export default function KanbanPage() {
  const router = useRouter();
  const { addToast } = useToast(); // @hua-labs/ui의 useToast 사용
  const statuses = getDefaultKanbanStatuses();

  // 모든 이슈 조회 (칸반 보드용)
  const { issues, isLoading, error, refetch } = useIssues({
    limit: 1000, // 칸반 보드는 많은 이슈를 표시할 수 있도록 큰 limit 설정
  });

  // 이슈를 칸반 카드로 변환
  const cards = useMemo(() => {
    return issues.map((issue, index) => issueToKanbanCard(issue, index));
  }, [issues]);

  // 카드 이동 (상태 변경)
  const handleCardMove = useCallback(
    async (cardId: string, newStatusId: string, newOrder: number) => {
      try {
        const newStatus = kanbanStatusIdToIssueStatus(newStatusId);
        
        // 이슈 상태 업데이트
        await apiClient.put(`/api/issues/${cardId}`, {
          status: newStatus,
          orderPosition: newOrder,
        });

        // 목록 새로고침
        await refetch();

        addToast({
          title: "이슈 상태가 변경되었습니다",
          message: "칸반 보드가 업데이트되었습니다",
          type: "success",
        });
      } catch (err) {
        console.error("Failed to move card:", err);
        addToast({
          title: "오류",
          message: err instanceof Error ? err.message : "이슈 상태 변경에 실패했습니다",
          type: "error",
        });
        // 실패 시 목록 새로고침하여 원래 상태로 복구
        await refetch();
      }
    },
    [refetch, addToast]
  );

  // 카드 순서 변경 (같은 상태 내에서)
  const handleCardReorder = useCallback(
    async (cardId: string, statusId: string, newOrder: number) => {
      try {
        // 이슈 순서 업데이트
        await apiClient.put(`/api/issues/${cardId}`, {
          orderPosition: newOrder,
        });

        // 목록 새로고침
        await refetch();
      } catch (err) {
        console.error("Failed to reorder card:", err);
        addToast({
          title: "오류",
          message: err instanceof Error ? err.message : "이슈 순서 변경에 실패했습니다",
          type: "error",
        });
        // 실패 시 목록 새로고침하여 원래 상태로 복구
        await refetch();
      }
    },
    [refetch, addToast]
  );

  const handleCardClick = useCallback(
    (cardId: string) => {
      router.push(`/issues/${cardId}`);
    },
    [router]
  );

  return (
    <AppLayout
      title="칸반 보드"
      description="드래그 앤 드롭으로 이슈를 관리하세요"
      activeItem="kanban"
    >
      <SectionErrorBoundary sectionName="칸반 보드">
        {isLoading ? (
          <LoadingState message="칸반 보드를 불러오는 중..." />
        ) : error ? (
          <ErrorState
            title="칸반 보드를 불러올 수 없습니다"
            message={error.message}
            onRetry={refetch}
          />
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-[var(--text-strong)]">칸반 보드</h1>
                <p className="text-sm text-[var(--text-muted)] mt-1">
                  이슈를 드래그하여 상태를 변경할 수 있습니다
                </p>
              </div>
              <Button onClick={() => refetch()}>
                <Icon name="refresh" size={16} className="mr-2" />
                새로고침
              </Button>
            </div>

            <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
              <CardContent className="p-6">
                <div className="h-[calc(100vh-300px)] min-h-[600px]">
                  {cards.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <p className="text-[var(--text-muted)] mb-2">표시할 이슈가 없습니다</p>
                        <Button onClick={() => router.push("/issues")}>
                          이슈 생성하기
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <KanbanBoard
                      statuses={statuses}
                      cards={cards}
                      onCardMove={handleCardMove}
                      onCardReorder={handleCardReorder}
                      onCardClick={handleCardClick}
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </SectionErrorBoundary>
    </AppLayout>
  );
}

