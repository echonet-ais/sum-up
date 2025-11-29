"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { AppLayout } from "@/components/layout";
import type { KanbanStatus, KanbanCardType } from "@/components/kanban";
import { Card, CardHeader, CardTitle, CardContent } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { Button } from "@hua-labs/ui";
import { LoadingState } from "@/components/common";

const KanbanBoard = dynamic(
  () => import("@/components/kanban").then((mod) => ({ default: mod.KanbanBoard })),
  {
    ssr: false,
    loading: () => <LoadingState message="칸반 보드를 불러오는 중..." />,
  }
);

// TODO: 실제 API로 교체
const initialStatuses: KanbanStatus[] = [
  { id: "todo", name: "할 일", position: 0 },
  { id: "in_progress", name: "진행 중", position: 1 },
  { id: "in_review", name: "검토 중", position: 2 },
  { id: "done", name: "완료", position: 3 },
];

const initialCards: KanbanCardType[] = [
  {
    id: "1",
    title: "로그인 기능 개선",
    description: "사용자 인증 로직을 개선해야 합니다",
    statusId: "in_progress",
    assignee: { id: "user1", name: "홍길동", avatar: undefined },
    priority: "HIGH",
    labels: [
      { id: "1", name: "버그", color: "#EF4444" },
      { id: "2", name: "프론트엔드", color: "#3B82F6" },
    ],
    order: 0,
  },
  {
    id: "2",
    title: "API 응답 시간 최적화",
    description: "데이터베이스 쿼리 최적화가 필요합니다",
    statusId: "todo",
    priority: "MEDIUM",
    labels: [{ id: "3", name: "백엔드", color: "#10B981" }],
    order: 0,
  },
  {
    id: "3",
    title: "UI 디자인 개선",
    description: "사용자 경험을 향상시키기 위한 UI 개선",
    statusId: "done",
    assignee: { id: "user2", name: "김철수", avatar: undefined },
    priority: "LOW",
    labels: [{ id: "2", name: "프론트엔드", color: "#3B82F6" }],
    order: 0,
  },
  {
    id: "4",
    title: "테스트 코드 작성",
    description: "단위 테스트 및 통합 테스트 작성",
    statusId: "in_review",
    assignee: { id: "user1", name: "홍길동", avatar: undefined },
    priority: "MEDIUM",
    order: 0,
  },
];

export default function KanbanPage() {
  const [statuses] = useState<KanbanStatus[]>(initialStatuses);
  const [cards, setCards] = useState<KanbanCardType[]>(initialCards);
  const router = useRouter();

  const handleCardMove = (cardId: string, newStatusId: string, newOrder: number) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId
          ? { ...card, statusId: newStatusId, order: newOrder }
          : card
      )
    );
    // TODO: API 호출
    console.log("Card moved:", { cardId, newStatusId, newOrder });
  };

  const handleCardReorder = (cardId: string, statusId: string, newOrder: number) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId && card.statusId === statusId
          ? { ...card, order: newOrder }
          : card
      )
    );
    // TODO: API 호출
    console.log("Card reordered:", { cardId, statusId, newOrder });
  };

  const handleCardClick = (cardId: string) => {
    // TODO: 이슈 상세 페이지로 이동
    router.push(`/issues/${cardId}`);
  };

  return (
    <AppLayout
      title="칸반 보드"
      description="드래그 앤 드롭으로 이슈를 관리하세요"
      activeItem="kanban"
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[var(--text-strong)]">칸반 보드</h1>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              이슈를 드래그하여 상태를 변경할 수 있습니다
            </p>
          </div>
          <Button>
            <Icon name="settings" size={16} className="mr-2" />
            설정
          </Button>
        </div>

        <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
          <CardContent className="p-6">
            <div className="h-[calc(100vh-300px)] min-h-[600px]">
              <KanbanBoard
                statuses={statuses}
                cards={cards}
                onCardMove={handleCardMove}
                onCardReorder={handleCardReorder}
                onCardClick={handleCardClick}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

