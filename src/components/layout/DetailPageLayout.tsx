"use client";

import * as React from "react";
import Link from "next/link";
import { Icon } from "@hua-labs/ui";
import { AppLayout } from "./AppLayout";
import { LoadingState, ErrorState } from "@/components/common";

export interface DetailPageLayoutProps {
  title: string;
  description?: string;
  activeItem: string;
  isLoading: boolean;
  error: Error | null;
  backHref: string;
  backLabel: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export function DetailPageLayout({
  title,
  description,
  activeItem,
  isLoading,
  error,
  backHref,
  backLabel,
  actions,
  children,
}: DetailPageLayoutProps) {
  if (isLoading) {
    return (
      <AppLayout title={title} activeItem={activeItem}>
        <LoadingState message={`${title}를 불러오는 중...`} />
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout title={`${title}를 찾을 수 없습니다`} activeItem={activeItem}>
        <ErrorState
          title={`${title}를 찾을 수 없습니다`}
          message={error.message || "요청하신 항목이 존재하지 않거나 삭제되었습니다."}
          onRetry={() => window.location.reload()}
          retryLabel="다시 시도"
        />
      </AppLayout>
    );
  }

  return (
    <AppLayout title={title} description={description} activeItem={activeItem}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <Link
            href={backHref}
            className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-strong)]"
          >
            <Icon name="chevronLeft" size={16} />
            {backLabel}
          </Link>
          {actions && <div className="flex gap-2">{actions}</div>}
        </div>
        {children}
      </div>
    </AppLayout>
  );
}

