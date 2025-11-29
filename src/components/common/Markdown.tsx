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
          "prose prose-sm dark:prose-invert max-w-none",
          "prose-headings:font-semibold prose-headings:text-gray-900 dark:prose-headings:text-white",
          "prose-p:text-gray-700 dark:prose-p:text-gray-300",
          "prose-a:text-blue-600 dark:prose-a:text-blue-400",
          "prose-code:text-gray-800 dark:prose-code:text-gray-200",
          "prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800",
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

