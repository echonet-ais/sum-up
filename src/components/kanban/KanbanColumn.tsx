"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@hua-labs/ui";
import { Badge } from "@hua-labs/ui";
import { cn } from "../../lib/utils";
import { KanbanCard, KanbanCardProps } from "./KanbanCard";
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export interface KanbanColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  title: string;
  color?: string;
  cards: KanbanCardProps[];
  wipLimit?: number;
  onCardClick?: (cardId: string) => void;
}

const KanbanColumn = React.forwardRef<HTMLDivElement, KanbanColumnProps>(
  ({ id, title, color, cards, wipLimit, onCardClick, className, ...props }, ref) => {
    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
      id,
    });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    const isWipExceeded = wipLimit && cards.length > wipLimit;

    return (
      <div
        ref={setNodeRef}
        style={style}
        className={cn("flex flex-col h-full", className)}
        {...props}
      >
        <Card className="flex-1 flex flex-col min-h-0">
          <CardHeader
            className={cn(
              "pb-3 border-b",
              color && `border-l-4`,
              isWipExceeded && "bg-red-50 dark:bg-red-900/10"
            )}
            style={color ? { borderLeftColor: color } : undefined}
          >
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">{title}</CardTitle>
              <div className="flex items-center gap-2">
                {wipLimit && (
                  <Badge
                    variant={isWipExceeded ? "destructive" : "secondary"}
                    className="text-xs"
                  >
                    {cards.length}/{wipLimit}
                  </Badge>
                )}
                {!wipLimit && <Badge variant="secondary" className="text-xs">{cards.length}</Badge>}
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-3 space-y-2">
            <SortableContext items={cards.map((card) => card.id)} strategy={verticalListSortingStrategy}>
              {cards.map((card) => (
                <KanbanCard
                  key={card.id}
                  {...card}
                  onClick={() => onCardClick?.(card.id)}
                />
              ))}
            </SortableContext>
            {cards.length === 0 && (
              <div className="text-center text-sm text-gray-400 dark:text-gray-500 py-8">
                카드가 없습니다
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }
);

KanbanColumn.displayName = "KanbanColumn";

export { KanbanColumn };

