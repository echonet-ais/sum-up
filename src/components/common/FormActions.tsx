"use client";

import * as React from "react";
import { Button } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";

export interface FormActionsProps {
  isSubmitting: boolean;
  submitError?: string;
  onCancel: () => void;
  submitLabel?: string;
  cancelLabel?: string;
}

export function FormActions({
  isSubmitting,
  submitError,
  onCancel,
  submitLabel = "저장",
  cancelLabel = "취소",
}: FormActionsProps) {
  return (
    <>
      {/* 제출 에러 */}
      {submitError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
          <p className="text-sm text-red-800 dark:text-red-200">{submitError}</p>
        </div>
      )}

      {/* 버튼 */}
      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex-1"
        >
          {cancelLabel}
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1"
        >
          {isSubmitting ? (
            <>
              <Icon name="loader" size={16} className="mr-2 animate-spin" />
              저장 중...
            </>
          ) : (
            submitLabel
          )}
        </Button>
      </div>
    </>
  );
}

