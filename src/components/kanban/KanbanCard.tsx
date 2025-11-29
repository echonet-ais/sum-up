"use client";

import * as React from "react";
import { Card, CardContent } from "@hua-labs/ui";
import { Avatar, AvatarImage, AvatarFallback } from "@hua-labs/ui";
import { Badge } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { cn } from "../../lib/utils";

export interface KanbanCardProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  title: string;
  description?: string;
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
  onClick?: () => void;
}

const priorityColors = {
  HIGH: "bg-red-500",
  MEDIUM: "bg-yellow-500",
  LOW: "bg-blue-500",
};

const KanbanCard = React.forwardRef<HTMLDivElement, KanbanCardProps>(
  (
    {
      id,
      title,
      description,
      assignee,
      priority,
      labels,
      dueDate,
      subtaskProgress,
      createdAt,
      onClick,
      className,
      ...props
    },
    ref
  ) => {
    const formatDate = (date: Date | string | undefined) => {
      if (!date) return null;
      const d = typeof date === "string" ? new Date(date) : date;
      return d.toLocaleDateString("ko-KR", { month: "short", day: "numeric" });
    };

    const isOverdue = dueDate && new Date(dueDate) < new Date();

    return (
      <Card
        ref={ref}
        className={cn(
          "cursor-pointer hover:shadow-md transition-shadow",
          "border-l-4",
          priority && priorityColors[priority],
          className
        )}
        onClick={onClick}
        {...props}
      >
        <CardContent className="p-3 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-semibold text-sm text-gray-900 dark:text-white line-clamp-2">
              {title}
            </h4>
            {priority && (
              <div
                className={cn(
                  "w-2 h-2 rounded-full flex-shrink-0 mt-1",
                  priorityColors[priority]
                )}
                title={priority}
              />
            )}
          </div>

          {description && (
            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
              {description}
            </p>
          )}

          {labels && labels.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {labels.slice(0, 3).map((label) => (
                <Badge
                  key={label.id}
                  variant="secondary"
                  className="text-xs"
                  style={{ backgroundColor: `${label.color}20`, color: label.color }}
                >
                  {label.name}
                </Badge>
              ))}
              {labels.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{labels.length - 3}
                </Badge>
              )}
            </div>
          )}

          {subtaskProgress && subtaskProgress.total > 0 && (
            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
              <Icon name="checkSquare" className="h-3 w-3" />
              <span>
                {subtaskProgress.completed}/{subtaskProgress.total}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between pt-1">
            {assignee && (
              <Avatar className="h-6 w-6">
                {assignee.avatar && <AvatarImage src={assignee.avatar} alt={assignee.name} />}
                <AvatarFallback>{assignee.name.charAt(0)}</AvatarFallback>
              </Avatar>
            )}
            {dueDate && (
              <div
                className={cn(
                  "flex items-center gap-1 text-xs",
                  isOverdue ? "text-red-600 dark:text-red-400" : "text-gray-600 dark:text-gray-400"
                )}
              >
                <Icon name="calendar" className="h-3 w-3" />
                <span>{formatDate(dueDate)}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
);

KanbanCard.displayName = "KanbanCard";

export { KanbanCard };

