"use client";

import * as React from "react";
import { Button, Action } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { cn } from "../../lib/utils";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  iconName?: string;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: "primary" | "outline" | "ghost";
  };
  className?: string;
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ icon, iconName = "inbox", title, description, action, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center py-12 px-4 text-center",
          className
        )}
        {...props}
      >
        <div className="mb-4 text-gray-400 dark:text-gray-500">
          {icon || <Icon name={iconName} className="h-12 w-12" />}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-sm">
            {description}
          </p>
        )}
        {action && (
          <div>
            <Button
              variant={action.variant === "primary" ? "default" : action.variant || "outline"}
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          </div>
        )}
      </div>
    );
  }
);

EmptyState.displayName = "EmptyState";

export { EmptyState };

