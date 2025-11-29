/**
 * Toast 알림 시스템
 * 클라이언트 사이드에서 사용하는 간단한 토스트 메시지 유틸리티
 */

export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

class ToastManager {
  private toasts: Toast[] = [];
  private listeners: Set<(toasts: Toast[]) => void> = new Set();

  subscribe(listener: (toasts: Toast[]) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener([...this.toasts]));
  }

  show(type: ToastType, message: string, duration = 3000) {
    const id = Math.random().toString(36).substring(7);
    const toast: Toast = { id, type, message, duration };

    this.toasts.push(toast);
    this.notify();

    if (duration > 0) {
      setTimeout(() => {
        this.remove(id);
      }, duration);
    }

    return id;
  }

  remove(id: string) {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.notify();
  }

  clear() {
    this.toasts = [];
    this.notify();
  }

  getToasts(): Toast[] {
    return [...this.toasts];
  }
}

export const toastManager = new ToastManager();

// 편의 함수
export const toast = {
  success: (message: string, duration?: number) =>
    toastManager.show("success", message, duration),
  error: (message: string, duration?: number) =>
    toastManager.show("error", message, duration),
  warning: (message: string, duration?: number) =>
    toastManager.show("warning", message, duration),
  info: (message: string, duration?: number) =>
    toastManager.show("info", message, duration),
};

