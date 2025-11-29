"use client";

import { useState, useEffect, useCallback } from "react";
import { apiClient } from "@/lib/api/client";
import type { Activity } from "@/types";

export interface Notification {
  id: string;
  type: "ISSUE_CREATED" | "ISSUE_UPDATED" | "ISSUE_COMMENTED" | "PROJECT_CREATED" | "MENTION";
  title: string;
  message: string;
  read: boolean;
  link?: string;
  createdAt: Date | string;
}

export interface UseNotificationsReturn {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: Error | null;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useNotifications(): UseNotificationsReturn {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchNotifications = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.get<Notification[]>("/api/notifications");
      setNotifications(response);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("알림을 불러오는데 실패했습니다"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const markAsRead = useCallback(async (id: string) => {
    try {
      await apiClient.put(`/api/notifications/${id}`);
      setNotifications((prev) =>
        prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
      );
    } catch (err) {
      throw err instanceof Error ? err : new Error("알림을 읽음 처리하는데 실패했습니다");
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    try {
      await apiClient.put("/api/notifications/read-all");
      setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
    } catch (err) {
      throw err instanceof Error ? err : new Error("모든 알림을 읽음 처리하는데 실패했습니다");
    }
  }, []);

  const deleteNotification = useCallback(async (id: string) => {
    try {
      await apiClient.delete(`/api/notifications/${id}`);
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    } catch (err) {
      throw err instanceof Error ? err : new Error("알림을 삭제하는데 실패했습니다");
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // 실시간 알림 업데이트 (폴링)
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 30초마다 알림 새로고침
    const interval = setInterval(() => {
      fetchNotifications();
    }, 30000); // 30초

    // 페이지 포커스 시에도 새로고침
    const handleFocus = () => {
      fetchNotifications();
    };
    window.addEventListener("focus", handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", handleFocus);
    };
  }, [fetchNotifications]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return {
    notifications,
    unreadCount,
    isLoading,
    error,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    refetch: fetchNotifications,
  };
}

