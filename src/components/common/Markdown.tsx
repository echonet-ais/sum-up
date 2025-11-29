"use client";

import * as React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "../../lib/utils";

export interface MarkdownProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string;
  className?: string;
}

const Markdown = React.forwardRef<HTMLDivElement, MarkdownProps>(
  ({ content, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "prose prose-sm max-w-none",
          "prose-headings:font-semibold prose-headings:text-[var(--text-strong)]",
          "prose-p:text-[var(--text-strong)]",
          "prose-a:text-[var(--brand-primary)] hover:text-[var(--brand-primary-dark)]",
          "prose-code:text-[var(--text-strong)] prose-code:bg-[var(--surface-muted)] prose-code:px-1 prose-code:py-0.5 prose-code:rounded",
          "prose-pre:bg-[var(--surface-muted)] prose-pre:border prose-pre:border-[var(--border-subtle)]",
          "prose-strong:text-[var(--text-strong)]",
          "prose-blockquote:border-[var(--border-subtle)] prose-blockquote:text-[var(--text-muted)]",
          "prose-hr:border-[var(--border-subtle)]",
          "prose-table:border-[var(--border-subtle)]",
          "prose-th:border-[var(--border-subtle)] prose-th:text-[var(--text-strong)]",
          "prose-td:border-[var(--border-subtle)]",
          className
        )}
        {...props}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </div>
    );
  }
);

Markdown.displayName = "Markdown";

export { Markdown };

