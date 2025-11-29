"use client";

import * as React from "react";
import { Badge } from "@hua-labs/ui";
import { cn } from "../../lib/utils";

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  status: string;
  color?: string;
  size?: "sm" | "md" | "lg";
}

const defaultStatusColors: Record<string, string> = {
  Backlog: "bg-[var(--surface-muted)] text-[var(--text-strong)]",
  "In Progress": "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
  Done: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  Review: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
  Blocked: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
};

const StatusBadge = React.forwardRef<HTMLDivElement, StatusBadgeProps>(
  ({ status, color, size = "md", className, ...props }, ref) => {
    const sizeClasses = {
      sm: "text-xs px-1.5 py-0.5",
      md: "text-xs px-2 py-1",
      lg: "text-sm px-2.5 py-1.5",
    };

    const badgeColor = color
      ? `bg-[${color}]20 text-[${color}]`
      : defaultStatusColors[status] || "bg-[var(--surface-muted)] text-[var(--text-strong)]";

    return (
      <Badge
        ref={ref}
        variant="secondary"
        className={cn(
          "inline-flex items-center",
          badgeColor,
          sizeClasses[size],
          className
        )}
        style={color ? { backgroundColor: `${color}20`, color } : undefined}
        {...props}
      >
        {status}
      </Badge>
    );
  }
);

StatusBadge.displayName = "StatusBadge";

export { StatusBadge };

