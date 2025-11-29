"use client";

import { useMemo, useCallback, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { AppLayout } from "@/components/layout";
import type { KanbanStatus, KanbanCard } from "@/components/kanban";
import { Card, CardHeader, CardTitle, CardContent } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { Button } from "@hua-labs/ui";
import { LoadingState, SectionErrorBoundary, ErrorState } from "@/components/common";
import { useIssues } from "@/hooks/useIssues";
import { useProjects } from "@/hooks/useProjects";
import { apiClient } from "@/lib/api/client";
import { useToast } from "@hua-labs/ui";
import { useRealtimeIssues } from "@/hooks/useRealtimeIssues";
import {
  issueToKanbanCard,
  getProjectKanbanStatuses,
  kanbanStatusIdToIssueStatus,
  wipLimitsToKanbanWipLimits,
} from "@/lib/utils/kanban-utils";
import type { CustomStatus, WipLimits } from "@/types";

const KanbanBoard = dynamic(
  () => import("@/components/kanban").then((mod) => ({ default: mod.KanbanBoard })),
  {
    ssr: false,
    loading: () => <LoadingState message="칸반 보드를 불러오는 중..." />,
  }
);

export default function KanbanPage() {
  const router = useRouter();
  const { addToast } = useToast();
  const [customStatuses, setCustomStatuses] = useState<CustomStatus[]>([]);
  const [wipLimits, setWipLimits] = useState<WipLimits>({});
  const [isLoadingStatuses, setIsLoadingStatuses] = useState(true);

  // 모든 프로젝트 조회 (커스텀 상태 및 WIP Limit 가져오기)
  const { projects } = useProjects({ limit: 100 });

  // 모든 이슈 조회 (칸반 보드용)
  const { issues, isLoading, error, refetch } = useIssues({
    limit: 1000, // 칸반 보드는 많은 이슈를 표시할 수 있도록 큰 limit 설정
  });

  // 실시간 이슈 업데이트 (칸반 보드)
  useRealtimeIssues({
    onIssueInsert: (newIssue) => {
      // 새 이슈가 추가되면 목록 새로고침 (필터링/정렬이 복잡하므로)
      refetch();
    },
    onIssueUpdate: (updatedIssue) => {
      // 이슈가 업데이트되면 목록 새로고침 (상태 변경, 순서 변경 등)
      refetch();
    },
    onIssueDelete: (issueId) => {
      // 이슈가 삭제되면 목록 새로고침
      refetch();
    },
  });

  // 프로젝트별 커스텀 상태 및 WIP Limit 수집
  useEffect(() => {
    async function fetchCustomStatusesAndWipLimits() {
      try {
        setIsLoadingStatuses(true);
        const allCustomStatuses: CustomStatus[] = [];
        const allWipLimits: WipLimits = {};

        // 각 프로젝트의 커스텀 상태 및 WIP Limit 조회
        for (const project of projects) {
          try {
            const [statusesRes, limitsRes] = await Promise.all([
              fetch(`/api/projects/${project.id}/custom-statuses`),
              fetch(`/api/projects/${project.id}/wip-limits`),
            ]);

            if (statusesRes.ok) {
              const statusesData = await statusesRes.json();
              if (statusesData.data) {
                allCustomStatuses.push(...statusesData.data);
              }
            }

            if (limitsRes.ok) {
              const limitsData = await limitsRes.json();
              if (limitsData.data) {
                Object.assign(allWipLimits, limitsData.data);
              }
            }
          } catch (err) {
            console.error(`Error fetching data for project ${project.id}:`, err);
          }
        }

        setCustomStatuses(allCustomStatuses);
        setWipLimits(allWipLimits);
      } catch (err) {
        console.error("Error fetching custom statuses and wip limits:", err);
      } finally {
        setIsLoadingStatuses(false);
      }
    }

    if (projects.length > 0) {
      fetchCustomStatusesAndWipLimits();
    } else {
      setIsLoadingStatuses(false);
    }
  }, [projects]);

  // 칸반 상태 목록 (기본 + 커스텀)
  const statuses = useMemo(() => {
    return getProjectKanbanStatuses(customStatuses);
  }, [customStatuses]);

  // 이슈를 칸반 카드로 변환
  const cards = useMemo(() => {
    return issues.map((issue, index) => issueToKanbanCard(issue, index, customStatuses));
  }, [issues, customStatuses]);

  // 카드 이동 (상태 변경)
  const handleCardMove = useCallback(
    async (cardId: string, newStatusId: string, newOrder: number) => {
      try {
        const newStatus = kanbanStatusIdToIssueStatus(newStatusId, customStatuses);
        
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
    [refetch, addToast, customStatuses]
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
        {isLoading || isLoadingStatuses ? (
          <LoadingState message="칸반 보드를 불러오는 중..." />
        ) : error ? (
          <ErrorState
            title="칸반 보드를 불러올 수 없습니다"
            message={error.message}
            onRetry={refetch}
          />
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold text-[var(--text-strong)]">칸반 보드</h1>
                <p className="text-sm text-[var(--text-muted)] mt-1">
                  이슈를 드래그하여 상태를 변경할 수 있습니다
                </p>
              </div>
              <Button onClick={() => refetch()} className="w-full sm:w-auto">
                <Icon name="refresh" size={16} className="mr-2" />
                새로고침
              </Button>
            </div>

            <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
              <CardContent className="p-6">
                <div className="h-[calc(100vh-300px)] min-h-[400px] sm:min-h-[600px]">
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
                      wipLimits={wipLimitsToKanbanWipLimits(wipLimits)}
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

