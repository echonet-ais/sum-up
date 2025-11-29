"use client";

import * as React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@hua-labs/ui";
import { Button } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { Markdown } from "@/components/common";
import { CommentForm } from "./CommentForm";
import type { Comment } from "@/types";

export interface CommentItemProps extends React.HTMLAttributes<HTMLDivElement> {
  comment: Comment;
  isEditing?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  onEdit?: () => void;
  onCancelEdit?: () => void;
  onSave?: (content: string) => Promise<void>;
  onDelete?: () => void;
}

const CommentItem = React.forwardRef<HTMLDivElement, CommentItemProps>(
  (
    {
      comment,
      isEditing = false,
      canEdit = false,
      canDelete = false,
      onEdit,
      onCancelEdit,
      onSave,
      onDelete,
      className,
      ...props
    },
    ref
  ) => {
    const [isDeleting, setIsDeleting] = React.useState(false);

    const handleDelete = async () => {
      if (!confirm("댓글을 삭제하시겠습니까?")) return;
      
      setIsDeleting(true);
      try {
        await onDelete?.();
      } catch (error) {
        console.error("Failed to delete comment:", error);
      } finally {
        setIsDeleting(false);
      }
    };

    const formatDate = (date: string | Date) => {
      const d = typeof date === "string" ? new Date(date) : date;
      const now = new Date();
      const diff = now.getTime() - d.getTime();
      const minutes = Math.floor(diff / 60000);
      const hours = Math.floor(diff / 3600000);
      const days = Math.floor(diff / 86400000);

      if (minutes < 1) return "방금 전";
      if (minutes < 60) return `${minutes}분 전`;
      if (hours < 24) return `${hours}시간 전`;
      if (days < 7) return `${days}일 전`;
      return d.toLocaleDateString("ko-KR");
    };

    return (
      <div
        ref={ref}
        className={`flex gap-3 p-4 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-muted)] ${className}`}
        {...props}
      >
        <Avatar className="h-10 w-10 flex-shrink-0">
          {comment.author?.avatar && (
            <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
          )}
          <AvatarFallback>
            {comment.author?.name?.[0] || "U"}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <CommentForm
              issueId={comment.issueId}
              initialContent={comment.content}
              onSubmit={async (content) => {
                await onSave?.(content);
              }}
              onCancel={onCancelEdit}
              submitLabel="저장"
              cancelLabel="취소"
            />
          ) : (
            <>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-medium text-[var(--text-strong)]">
                    {comment.author?.name || "알 수 없음"}
                  </div>
                  <div className="text-xs text-[var(--text-muted)]">
                    {formatDate(comment.createdAt)}
                  </div>
                </div>
                {(canEdit || canDelete) && (
                  <div className="flex gap-2">
                    {canEdit && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={onEdit}
                        className="h-8 px-2"
                      >
                        <Icon name="edit" size={14} />
                      </Button>
                    )}
                    {canDelete && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="h-8 px-2 text-red-600 hover:text-red-700"
                      >
                        {isDeleting ? (
                          <Icon name="loader" size={14} className="animate-spin" />
                        ) : (
                          <Icon name="trash" size={14} />
                        )}
                      </Button>
                    )}
                  </div>
                )}
              </div>
              <div className="text-sm text-[var(--text-strong)]">
                <Markdown content={comment.content} />
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
);

CommentItem.displayName = "CommentItem";

export { CommentItem };

