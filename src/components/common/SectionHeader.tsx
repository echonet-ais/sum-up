"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ title, description, actions, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4",
          "pb-3 border-b border-[var(--border-subtle)]",
          className
        )}
        {...props}
      >
        <div className="min-w-0 flex-1">
          <h2 className="text-lg sm:text-xl font-semibold text-[var(--text-strong)] truncate">
            {title}
          </h2>
          {description && (
            <p className="mt-1 text-xs sm:text-sm text-[var(--text-muted)] truncate">
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            {actions}
          </div>
        )}
      </div>
    );
  }
);

SectionHeader.displayName = "SectionHeader";

