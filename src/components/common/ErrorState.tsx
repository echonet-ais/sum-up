"use client";

import * as React from "react";
import { Alert, AlertError } from "@hua-labs/ui";
import { Button } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { cn } from "../../lib/utils";

export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

const ErrorState = React.forwardRef<HTMLDivElement, ErrorStateProps>(
  ({ title = "오류가 발생했습니다", message, onRetry, retryLabel = "다시 시도", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center py-12 px-4",
          className
        )}
        {...props}
      >
        <div className="max-w-md w-full">
          <AlertError className="mb-4">
            <div className="flex items-start gap-3">
              <Icon name="alertCircle" className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{title}</h3>
                <p className="text-sm">{message}</p>
              </div>
            </div>
          </AlertError>
          {onRetry && (
            <div className="flex justify-center">
              <Button variant="outline" onClick={onRetry}>
                <Icon name="refresh" className="mr-2 h-4 w-4" />
                {retryLabel}
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
);

ErrorState.displayName = "ErrorState";

export { ErrorState };

