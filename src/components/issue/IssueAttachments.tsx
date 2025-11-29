"use client";

import * as React from "react";
import { Icon } from "@hua-labs/ui";
import { Button } from "@hua-labs/ui";
import type { IssueAttachment } from "@/types";

export interface IssueAttachmentsProps {
  attachments: IssueAttachment[];
  onDelete?: (attachmentId: string) => void;
  canDelete?: boolean;
}

export function IssueAttachments({
  attachments,
  onDelete,
  canDelete = false,
}: IssueAttachmentsProps) {
  if (!attachments || attachments.length === 0) {
    return null;
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileIcon = (fileType: string): string => {
    if (fileType.startsWith("image/")) return "image";
    if (fileType.startsWith("video/")) return "video";
    if (fileType.includes("pdf")) return "file-text";
    if (fileType.includes("word") || fileType.includes("document")) return "file-text";
    if (fileType.includes("excel") || fileType.includes("spreadsheet")) return "file-text";
    return "file";
  };

  const handleDownload = (attachment: IssueAttachment) => {
    window.open(attachment.fileUrl, "_blank");
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-[var(--text-strong)]">첨부파일</h3>
      <div className="space-y-2">
        {attachments.map((attachment) => (
          <div
            key={attachment.id}
            className="flex items-center justify-between p-3 bg-[var(--surface-muted)] rounded-lg hover:bg-[var(--surface-hover)] transition-colors"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Icon
                name={getFileIcon(attachment.fileType)}
                size={20}
                className="text-[var(--text-muted)] flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--text-strong)] truncate">
                  {attachment.fileName}
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  {formatFileSize(attachment.fileSize)} ·{" "}
                  {new Date(attachment.uploadedAt).toLocaleDateString("ko-KR")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDownload(attachment)}
                className="h-8"
              >
                <Icon name="download" size={16} className="mr-1" />
                다운로드
              </Button>
              {canDelete && onDelete && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(attachment.id)}
                  className="h-8 text-red-600 hover:text-red-700"
                >
                  <Icon name="trash" size={16} />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

