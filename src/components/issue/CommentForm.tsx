"use client";

import * as React from "react";
import { Button } from "@hua-labs/ui";
import { Textarea } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { useAuthStore } from "@/store/auth-store";

export interface CommentFormProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSubmit'> {
  issueId: string;
  initialContent?: string;
  placeholder?: string;
  submitLabel?: string;
  cancelLabel?: string;
  onSubmit?: (content: string) => Promise<void>;
  onCancel?: () => void;
  autoFocus?: boolean;
}

const CommentForm = React.forwardRef<HTMLDivElement, CommentFormProps>(
  (
    {
      issueId,
      initialContent = "",
      placeholder = "댓글을 입력하세요...",
      submitLabel = "댓글 작성",
      cancelLabel = "취소",
      onSubmit,
      onCancel,
      autoFocus = false,
      className,
      ...props
    },
    ref
  ) => {
    const { user } = useAuthStore();
    const [content, setContent] = React.useState(initialContent);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    React.useEffect(() => {
      if (autoFocus && textareaRef.current) {
        textareaRef.current.focus();
      }
    }, [autoFocus]);

    React.useEffect(() => {
      setContent(initialContent);
    }, [initialContent]);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!content.trim()) return;
      if (!user) {
        alert("로그인이 필요합니다");
        return;
      }

      setIsSubmitting(true);
      try {
        await onSubmit?.(content.trim());
        setContent("");
      } catch (error) {
        console.error("Failed to submit comment:", error);
      } finally {
        setIsSubmitting(false);
      }
    };

    const handleCancel = () => {
      setContent(initialContent);
      onCancel?.();
    };

    return (
      <div ref={ref} className={className} {...props}>
        <form onSubmit={handleSubmit}>
        <div className="space-y-3">
          <Textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={placeholder}
            rows={3}
            disabled={isSubmitting || !user}
            className="resize-none"
          />
          <div className="flex items-center justify-end gap-2">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                {cancelLabel}
              </Button>
            )}
            <Button
              type="submit"
              disabled={!content.trim() || isSubmitting || !user}
            >
              {isSubmitting ? (
                <>
                  <Icon name="loader" size={16} className="mr-2 animate-spin" />
                  처리 중...
                </>
              ) : (
                submitLabel
              )}
            </Button>
          </div>
        </div>
        </form>
      </div>
    );
  }
);

CommentForm.displayName = "CommentForm";

export { CommentForm };

