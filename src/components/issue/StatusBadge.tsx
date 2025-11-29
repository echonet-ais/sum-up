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
  "In Progress": "bg-[var(--color-info-subtle)] text-[var(--color-info)]",
  Done: "bg-[var(--color-success-subtle)] text-[var(--color-success)]",
  Review: "bg-[var(--brand-primary-subtle)] text-[var(--brand-primary)]",
  Blocked: "bg-[var(--color-error-subtle)] text-[var(--color-error)]",
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

