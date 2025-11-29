"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@hua-labs/ui";

export interface UseDeleteDialogOptions {
  title: string;
  description: string;
  onSuccess?: () => void;
  redirectTo?: string;
}

export function useDeleteDialog(
  onDelete: () => Promise<void>,
  options: UseDeleteDialogOptions
) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { addToast } = useToast();
  const router = useRouter();

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onDelete();
      addToast({
        title: "성공",
        message: "삭제되었습니다",
        type: "success",
      });
      if (options.redirectTo) {
        router.push(options.redirectTo);
      } else {
        options.onSuccess?.();
      }
    } catch (err) {
      addToast({
        title: "오류",
        message: err instanceof Error ? err.message : "삭제에 실패했습니다",
        type: "error",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    isOpen,
    setIsOpen,
    isDeleting,
    handleConfirm,
  };
}

