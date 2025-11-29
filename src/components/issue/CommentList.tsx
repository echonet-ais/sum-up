"use client";

import * as React from "react";
import { Card, CardContent } from "@hua-labs/ui";
import { Avatar, AvatarImage, AvatarFallback } from "@hua-labs/ui";
import { Button } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { EmptyState } from "@/components/common";
import { CommentItem } from "./CommentItem";
import { CommentForm } from "./CommentForm";
import type { Comment } from "@/types";

export interface CommentListProps extends React.HTMLAttributes<HTMLDivElement> {
  comments: Comment[];
  issueId: string;
  currentUserId?: string;
  onCommentAdd?: (content: string) => Promise<void>;
  onCommentUpdate?: (commentId: string, content: string) => Promise<void>;
  onCommentDelete?: (commentId: string) => Promise<void>;
  isLoading?: boolean;
}

const CommentList = React.forwardRef<HTMLDivElement, CommentListProps>(
  (
    {
      comments,
      issueId,
      currentUserId,
      onCommentAdd,
      onCommentUpdate,
      onCommentDelete,
      isLoading = false,
      className,
      ...props
    },
    ref
  ) => {
    const [editingId, setEditingId] = React.useState<string | null>(null);

    const handleEdit = (commentId: string) => {
      setEditingId(commentId);
    };

    const handleCancelEdit = () => {
      setEditingId(null);
    };

    const handleSave = async (commentId: string, content: string) => {
      try {
        await onCommentUpdate?.(commentId, content);
        setEditingId(null);
      } catch (error) {
        console.error("Failed to update comment:", error);
      }
    };

    return (
      <div ref={ref} className={className} {...props}>
        <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
          <CardContent className="p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-[var(--text-strong)] mb-2">댓글</h3>
              <CommentForm
                issueId={issueId}
                onSubmit={onCommentAdd}
                placeholder="댓글을 입력하세요..."
              />
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Icon name="loader" size={24} className="animate-spin text-[var(--text-muted)]" />
              </div>
            ) : comments.length === 0 ? (
              <EmptyState
                title="댓글이 없습니다"
                description="첫 번째 댓글을 작성해보세요"
                iconName="messageSquare"
              />
            ) : (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    isEditing={editingId === comment.id}
                    canEdit={currentUserId === comment.author?.id}
                    canDelete={currentUserId === comment.author?.id}
                    onEdit={() => handleEdit(comment.id)}
                    onCancelEdit={handleCancelEdit}
                    onSave={(content) => handleSave(comment.id, content)}
                    onDelete={() => onCommentDelete?.(comment.id)}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }
);

CommentList.displayName = "CommentList";

export { CommentList };

