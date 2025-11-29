"use client";

import * as React from "react";
import { Badge } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { cn } from "../../lib/utils";

export type Priority = "HIGH" | "MEDIUM" | "LOW";

export interface PriorityBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  priority: Priority;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
}

const priorityConfig = {
  HIGH: {
    label: "높음",
    color: "bg-[var(--color-error-subtle)] text-[var(--color-error)]",
    icon: "arrowUp" as const,
  },
  MEDIUM: {
    label: "보통",
    color: "bg-[var(--color-warning-subtle)] text-[var(--color-warning)]",
    icon: "remove" as const,
  },
  LOW: {
    label: "낮음",
    color: "bg-[var(--color-info-subtle)] text-[var(--color-info)]",
    icon: "arrowDown" as const,
  },
};

const PriorityBadge = React.forwardRef<HTMLDivElement, PriorityBadgeProps>(
  ({ priority, showIcon = true, size = "md", className, ...props }, ref) => {
    const config = priorityConfig[priority];
    const sizeClasses = {
      sm: "text-xs px-1.5 py-0.5",
      md: "text-xs px-2 py-1",
      lg: "text-sm px-2.5 py-1.5",
    };

    return (
      <Badge
        ref={ref}
        variant="secondary"
        className={cn(
          "inline-flex items-center gap-1",
          config.color,
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {showIcon && <Icon name={config.icon} className="h-3 w-3" />}
        <span>{config.label}</span>
      </Badge>
    );
  }
);

PriorityBadge.displayName = "PriorityBadge";

export { PriorityBadge };

