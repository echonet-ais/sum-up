/**
 * 실시간 알림 업데이트 훅
 * Supabase Realtime을 사용하여 알림 테이블 변경을 실시간으로 감지
 */

"use client";

import { useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase/client";
import type { RealtimeChannel } from "@supabase/supabase-js";

export interface UseRealtimeNotificationsOptions {
  userId: string;
  onNotificationInsert?: (notification: any) => void;
  onNotificationUpdate?: (notification: any) => void;
  onNotificationDelete?: (notificationId: string) => void;
}

export function useRealtimeNotifications({
  userId,
  onNotificationInsert,
  onNotificationUpdate,
  onNotificationDelete,
}: UseRealtimeNotificationsOptions) {
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    if (!userId) return;

    // Realtime 채널 생성
    const channel = supabase
      .channel(`notifications:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          console.log("New notification received:", payload);
          onNotificationInsert?.(payload.new);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          console.log("Notification updated:", payload);
          onNotificationUpdate?.(payload.new);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          console.log("Notification deleted:", payload);
          onNotificationDelete?.(payload.old.id);
        }
      )
      .subscribe((status) => {
        console.log("Notification channel status:", status);
      });

    channelRef.current = channel;

    return () => {
      // 정리
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [userId, onNotificationInsert, onNotificationUpdate, onNotificationDelete]);
}

