"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@hua-labs/ui";
import { cn } from "@/lib/utils";

export interface ContentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  headerClassName?: string;
  contentClassName?: string;
  showHeader?: boolean;
}

export const ContentCard = React.forwardRef<HTMLDivElement, ContentCardProps>(
  (
    {
      title,
      description,
      actions,
      children,
      headerClassName,
      contentClassName,
      showHeader = true,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <Card
        ref={ref}
        className={cn(
          "rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm",
          className
        )}
        {...props}
      >
        {showHeader && (
          <CardHeader
            className={cn(
              "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 sm:px-6 py-4 sm:py-5",
              headerClassName
            )}
          >
            <div className="min-w-0 flex-1">
              <CardTitle className="text-base sm:text-lg font-semibold text-[var(--text-strong)]">
                {title}
              </CardTitle>
              {description && (
                <p className="mt-1 text-xs sm:text-sm text-[var(--text-muted)]">{description}</p>
              )}
            </div>
            {actions && (
              <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                {actions}
              </div>
            )}
          </CardHeader>
        )}
        <CardContent className={cn("p-0", contentClassName)}>
          {children}
        </CardContent>
      </Card>
    );
  }
);

ContentCard.displayName = "ContentCard";

