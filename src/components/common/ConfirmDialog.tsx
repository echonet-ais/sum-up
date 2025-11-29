"use client";

import * as React from "react";
import { Modal } from "@hua-labs/ui";
import { Button } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "destructive";
  onConfirm: () => void | Promise<void>;
  isLoading?: boolean;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "확인",
  cancelLabel = "취소",
  variant = "default",
  onConfirm,
  isLoading = false,
}: ConfirmDialogProps) {
  const handleConfirm = async () => {
    await onConfirm();
    onOpenChange(false);
  };

  return (
    <Modal
      isOpen={open}
      onClose={() => onOpenChange(false)}
      size="md"
      title={title}
      showCloseButton={false}
      closeOnOverlayClick={!isLoading}
    >
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          {variant === "destructive" && (
            <Icon name="alert-triangle" size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
          )}
          <p className="text-sm text-[var(--text-muted)]">{description}</p>
        </div>
        <div className="flex justify-end gap-2 pt-4 border-t border-[var(--border-subtle)]">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            {cancelLabel}
          </Button>
          <Button
            variant={variant === "destructive" ? "destructive" : "default"}
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Icon name="loader" size={16} className="mr-2 animate-spin" />
                처리 중...
              </>
            ) : (
              confirmLabel
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

