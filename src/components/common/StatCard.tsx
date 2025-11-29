"use client";

import * as React from "react";
import { Card, CardContent } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { cn } from "../../lib/utils";

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: number | string;
  icon?: string;
  trend?: {
    value: number;
    isPositive: boolean;
    label?: string;
  };
  onClick?: () => void;
  variant?: "default" | "primary" | "success" | "warning" | "danger";
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      label,
      value,
      icon,
      trend,
      onClick,
      variant = "default",
      className,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      default: "border-[var(--border-subtle)] bg-[var(--surface)]",
      primary: "border-[var(--brand-primary)] bg-[var(--surface)]",
      success: "border-[var(--color-success-border)] bg-[var(--color-success-subtle)]",
      warning: "border-[var(--color-warning-border)] bg-[var(--color-warning-subtle)]",
      danger: "border-[var(--color-error-border)] bg-[var(--color-error-subtle)]",
    };

    return (
      <Card
        ref={ref}
        className={cn(
          "rounded-lg border shadow-sm transition-shadow",
          variantStyles[variant],
          onClick && "cursor-pointer hover:shadow-md",
          className
        )}
        onClick={onClick}
        {...props}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="text-sm text-[var(--text-muted)] mb-1">{label}</div>
              <div className="text-2xl font-semibold text-[var(--text-strong)]">
                {value}
              </div>
              {trend && (
                <div
                  className={cn(
                    "text-xs mt-1 flex items-center gap-1",
                    trend.isPositive
                      ? "text-[var(--color-success)]"
                      : "text-[var(--color-error)]"
                  )}
                >
                  <Icon
                    name={trend.isPositive ? "trendingUp" : "trendingDown"}
                    size={12}
                  />
                  <span>
                    {trend.isPositive ? "+" : ""}
                    {trend.value}%
                  </span>
                  {trend.label && <span className="text-[var(--text-muted)] ml-1">{trend.label}</span>}
                </div>
              )}
            </div>
            {icon && (
              <div className="text-[var(--text-muted)]">
                <Icon name={icon} size={20} />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
);

StatCard.displayName = "StatCard";

export { StatCard };

