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
      success: "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950",
      warning: "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950",
      danger: "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950",
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
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
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

