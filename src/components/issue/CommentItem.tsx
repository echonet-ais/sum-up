"use client";

import * as React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@hua-labs/ui";
import { Button } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { Markdown } from "@/components/common";
import { CommentForm } from "./CommentForm";
import type { Comment } from "@/types";
import { formatTimeAgo } from "@/lib/utils/date";
import { ConfirmDialog } from "@/components/common";

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
    const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);

    const handleDelete = async () => {
      setIsDeleting(true);
      try {
        await onDelete?.();
      } catch (error) {
        console.error("Failed to delete comment:", error);
      } finally {
        setIsDeleting(false);
        setShowDeleteConfirm(false);
      }
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
                    {formatTimeAgo(comment.createdAt)}
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
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowDeleteConfirm(true)}
                          disabled={isDeleting}
                          className="h-8 px-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <Icon name="trash" size={14} />
                        </Button>
                        <ConfirmDialog
                          open={showDeleteConfirm}
                          onOpenChange={setShowDeleteConfirm}
                          title="댓글 삭제"
                          description="댓글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
                          confirmLabel="삭제"
                          cancelLabel="취소"
                          variant="destructive"
                          onConfirm={handleDelete}
                          isLoading={isDeleting}
                        />
                      </>
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

