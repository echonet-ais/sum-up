"use client";

import { useState, useEffect } from "react";
import { toastManager, type Toast } from "@/lib/utils/toast";

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const unsubscribe = toastManager.subscribe(setToasts);
    return () => {
      unsubscribe();
    };
  }, []);

  return {
    toasts,
    remove: (id: string) => toastManager.remove(id),
    clear: () => toastManager.clear(),
  };
}

