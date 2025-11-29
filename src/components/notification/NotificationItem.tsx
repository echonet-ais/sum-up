"use client";

import * as React from "react";
import { Icon } from "@hua-labs/ui";
import { Badge } from "@hua-labs/ui";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { Notification } from "@/hooks/useNotifications";

export interface NotificationItemProps {
  notification: Notification;
  onRead?: (id: string) => void;
  onDelete?: (id: string) => void;
  onClick?: () => void;
}

const notificationIcons: Record<Notification["type"], string> = {
  ISSUE_CREATED: "add",
  ISSUE_UPDATED: "edit",
  ISSUE_COMMENTED: "messageSquare",
  PROJECT_CREATED: "folder",
  MENTION: "user",
};

const notificationColors: Record<Notification["type"], string> = {
  ISSUE_CREATED: "text-[var(--color-info)]",
  ISSUE_UPDATED: "text-[var(--color-warning)]",
  ISSUE_COMMENTED: "text-[var(--color-success)]",
  PROJECT_CREATED: "text-[var(--brand-primary)]",
  MENTION: "text-[var(--color-error)]",
};

import { formatTimeAgo } from "@/lib/utils/date";

export function NotificationItem({
  notification,
  onRead,
  onDelete,
  onClick,
}: NotificationItemProps) {
  const handleClick = () => {
    if (!notification.read && onRead) {
      onRead(notification.id);
    }
    onClick?.();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(notification.id);
    }
  };

  const iconName = notificationIcons[notification.type];
  const iconColor = notificationColors[notification.type];

  const content = (
    <div
      className={cn(
        "flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-md transition-colors cursor-pointer",
        "hover:bg-[var(--surface-muted)]",
        !notification.read && "bg-[var(--color-info-subtle)]"
      )}
      onClick={handleClick}
    >
      <div className={cn("flex-shrink-0 mt-0.5", iconColor)}>
        <Icon name={iconName} size={20} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p
              className={cn(
                "text-sm font-medium text-[var(--text-strong)]",
                !notification.read && "font-semibold"
              )}
            >
              {notification.title}
            </p>
          </div>

          {!notification.read && (
            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[var(--color-info)] ring-2 ring-[var(--color-info-subtle)]" />
          )}
        </div>

        <p className="text-sm text-[var(--text-muted)] mt-1 line-clamp-2">
          {notification.message}
        </p>

        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-[var(--text-muted)]">
            {formatTimeAgo(notification.createdAt)}
          </span>

          <button
            onClick={handleDelete}
            className="text-[var(--text-muted)] hover:text-[var(--text-strong)] transition-colors"
            aria-label="알림 삭제"
          >
            <Icon name="x" size={14} />
          </button>
        </div>
      </div>
    </div>
  );

  if (notification.link) {
    return (
      <Link href={notification.link} className="block">
        {content}
      </Link>
    );
  }

  return content;
}

