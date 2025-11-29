"use client";

import { useState, useEffect, useCallback } from "react";
import { apiClient } from "@/lib/api/client";
import type { Activity } from "@/types";
import { useRealtimeNotifications } from "./useRealtimeNotifications";
import { useAuthStore } from "@/store/auth-store";

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

  // 실시간 알림 업데이트 (Supabase Realtime)
  const { user } = useAuthStore();
  useRealtimeNotifications({
    userId: user?.id || "",
    onNotificationInsert: (newNotification) => {
      // 새 알림 추가
      const notification: Notification = {
        id: newNotification.id,
        type: newNotification.type as Notification["type"],
        title: newNotification.description || "",
        message: newNotification.description || "",
        read: newNotification.read_at != null,
        link: newNotification.metadata?.link,
        createdAt: newNotification.created_at,
      };
      setNotifications((prev) => [notification, ...prev]);
    },
    onNotificationUpdate: (updatedNotification) => {
      // 알림 업데이트 (예: 읽음 처리)
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === updatedNotification.id
            ? {
                ...notif,
                read: updatedNotification.read_at != null,
                title: updatedNotification.description || notif.title,
                message: updatedNotification.description || notif.message,
              }
            : notif
        )
      );
    },
    onNotificationDelete: (notificationId) => {
      // 알림 삭제
      setNotifications((prev) => prev.filter((notif) => notif.id !== notificationId));
    },
  });

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

