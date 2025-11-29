"use client";

import * as React from "react";
import { Dropdown, DropdownMenu, DropdownItem } from "@hua-labs/ui";
import { Button } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { Badge } from "@hua-labs/ui";
import { EmptyState } from "@/components/common";
import { NotificationItem } from "./NotificationItem";
import { useNotifications } from "@/hooks";
import { LoadingState } from "@/components/common";

export interface NotificationDropdownProps {
  trigger?: React.ReactNode;
  align?: "start" | "end";
}

export function NotificationDropdown({
  trigger,
  align = "end",
}: NotificationDropdownProps) {
  const {
    notifications,
    unreadCount,
    isLoading,
    error,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    refetch,
  } = useNotifications();

  const handleNotificationClick = async (id: string) => {
    try {
      await markAsRead(id);
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNotification(id);
    } catch (err) {
      console.error("Failed to delete notification:", err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
    } catch (err) {
      console.error("Failed to mark all as read:", err);
    }
  };

  const defaultTrigger = (
    <Button variant="ghost" size="sm" className="relative">
      <Icon name="bell" className="h-5 w-5" />
      {unreadCount > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
        >
          {unreadCount > 9 ? "9+" : unreadCount}
        </Badge>
      )}
    </Button>
  );

  return (
    <Dropdown trigger={trigger || defaultTrigger} align={align}>
      <DropdownMenu className="w-[calc(100vw-2rem)] sm:w-80 max-h-[600px] overflow-y-auto">
        <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-[var(--border-subtle)]">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[var(--text-strong)]">
              알림
            </h3>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-xs text-[var(--brand-primary)] hover:underline"
              >
                모두 읽음
              </button>
            )}
          </div>
        </div>

        <div className="max-h-[500px] overflow-y-auto">
          {isLoading ? (
            <div className="p-8">
              <LoadingState message="알림을 불러오는 중..." />
            </div>
          ) : error ? (
            <div className="p-8">
              <EmptyState
                title="알림을 불러올 수 없습니다"
                description={error.message}
                iconName="alertCircle"
                action={{
                  label: "다시 시도",
                  onClick: () => refetch(),
                  variant: "primary",
                }}
              />
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-8">
              <EmptyState
                title="알림이 없습니다"
                description="새로운 알림이 오면 여기에 표시됩니다"
                iconName="bell"
              />
            </div>
          ) : (
            <div className="divide-y divide-[var(--border-subtle)]">
              {notifications.map((notification) => (
                <div key={notification.id} className="px-1 sm:px-2 py-0.5 sm:py-1">
                  <NotificationItem
                    notification={notification}
                    onRead={handleNotificationClick}
                    onDelete={handleDelete}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {notifications.length > 0 && (
          <div className="px-3 sm:px-4 py-2 border-t border-[var(--border-subtle)]">
            <DropdownItem
              onClick={() => {
                // TODO: 알림 페이지로 이동
              }}
              className="text-center text-sm text-[var(--text-muted)] hover:text-[var(--text-strong)]"
            >
              모든 알림 보기
            </DropdownItem>
          </div>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}

