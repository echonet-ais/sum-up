"use client";

import * as React from "react";
import { LoadingSpinner } from "@hua-labs/ui";
import { cn } from "../../lib/utils";

export interface LoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string;
  fullScreen?: boolean;
  size?: "sm" | "md" | "lg";
}

const LoadingState = React.forwardRef<HTMLDivElement, LoadingStateProps>(
  ({ message, fullScreen = false, size = "md", className, ...props }, ref) => {
    const sizeClasses = {
      sm: "h-4 w-4",
      md: "h-8 w-8",
      lg: "h-12 w-12",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center",
          fullScreen ? "min-h-screen" : "py-12",
          className
        )}
        {...props}
      >
        <LoadingSpinner className={sizeClasses[size]} />
        {message && (
          <p className="mt-4 text-sm text-[var(--text-muted)]">
            {message}
          </p>
        )}
      </div>
    );
  }
);

LoadingState.displayName = "LoadingState";

export { LoadingState };

