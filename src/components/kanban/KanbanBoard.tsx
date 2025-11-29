"use client";

import * as React from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { KanbanColumn, KanbanColumnProps } from "./KanbanColumn";
import { cn } from "../../lib/utils";

export interface KanbanStatus {
  id: string;
  name: string;
  color?: string;
  position: number;
}

export interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  statusId: string;
  assignee?: {
    id: string;
    name: string;
    avatar?: string;
  };
  priority?: "HIGH" | "MEDIUM" | "LOW";
  labels?: Array<{ id: string; name: string; color: string }>;
  dueDate?: Date | string;
  subtaskProgress?: { completed: number; total: number };
  createdAt?: Date | string;
  order?: number;
}

export interface KanbanBoardProps extends React.HTMLAttributes<HTMLDivElement> {
  statuses: KanbanStatus[];
  cards: KanbanCard[];
  onCardMove?: (cardId: string, newStatusId: string, newOrder: number) => void;
  onCardReorder?: (cardId: string, statusId: string, newOrder: number) => void;
  onCardClick?: (cardId: string) => void;
  wipLimits?: Record<string, number>; // statusId -> limit
}

const KanbanBoard = React.forwardRef<HTMLDivElement, KanbanBoardProps>(
  (
    {
      statuses,
      cards,
      onCardMove,
      onCardReorder,
      onCardClick,
      wipLimits,
      className,
      ...props
    },
    ref
  ) => {
    const [activeId, setActiveId] = React.useState<string | null>(null);

    const sensors = useSensors(
      useSensor(PointerSensor, {
        activationConstraint: {
          distance: 8,
        },
      })
    );

    const getCardsByStatus = (statusId: string) => {
      return cards
        .filter((card) => card.statusId === statusId)
        .sort((a, b) => (a.order || 0) - (b.order || 0));
    };

    const handleDragStart = (event: DragStartEvent) => {
      setActiveId(event.active.id as string);
    };

    const handleDragOver = (event: DragOverEvent) => {
      // Handle drag over logic if needed
    };

    const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over) {
        setActiveId(null);
        return;
      }

      const activeId = active.id as string;
      const overId = over.id as string;

      // Find the card and its current status
      const activeCard = cards.find((c) => c.id === activeId);
      if (!activeCard) {
        setActiveId(null);
        return;
      }

      // Check if dropped on a status (column)
      const targetStatus = statuses.find((s) => s.id === overId);
      if (targetStatus) {
        // Moving to a different status
        const targetCards = getCardsByStatus(targetStatus.id);
        const newOrder = targetCards.length;
        onCardMove?.(activeId, targetStatus.id, newOrder);
        setActiveId(null);
        return;
      }

      // Check if dropped on another card
      const overCard = cards.find((c) => c.id === overId);
      if (overCard) {
        // Moving within the same status or to a different status
        const targetStatusId = overCard.statusId;
        const targetCards = getCardsByStatus(targetStatusId);
        const overIndex = targetCards.findIndex((c) => c.id === overId);

        if (activeCard.statusId === targetStatusId) {
          // Reordering within the same status
          const newCards = arrayMove(targetCards, targetCards.findIndex((c) => c.id === activeId), overIndex);
          const newOrder = newCards.findIndex((c) => c.id === activeId);
          onCardReorder?.(activeId, targetStatusId, newOrder);
        } else {
          // Moving to a different status
          const newOrder = overIndex;
          onCardMove?.(activeId, targetStatusId, newOrder);
        }
      }

      setActiveId(null);
    };

    const columns: KanbanColumnProps[] = statuses
      .sort((a, b) => a.position - b.position)
      .map((status) => ({
        id: status.id,
        title: status.name,
        color: status.color,
        cards: getCardsByStatus(status.id).map((card) => ({
          id: card.id,
          title: card.title,
          description: card.description,
          assignee: card.assignee,
          priority: card.priority,
          labels: card.labels,
          dueDate: card.dueDate,
          subtaskProgress: card.subtaskProgress,
          createdAt: card.createdAt,
        })),
        wipLimit: wipLimits?.[status.id],
      }));

    return (
      <div ref={ref} className={cn("w-full h-full", className)} {...props}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-4 overflow-x-auto pb-4">
            <SortableContext items={statuses.map((s) => s.id)} strategy={horizontalListSortingStrategy}>
              {columns.map((column) => (
                <div key={column.id} className="flex-shrink-0 w-80">
                  <KanbanColumn {...column} onCardClick={onCardClick} />
                </div>
              ))}
            </SortableContext>
          </div>
        </DndContext>
      </div>
    );
  }
);

KanbanBoard.displayName = "KanbanBoard";

export { KanbanBoard };

