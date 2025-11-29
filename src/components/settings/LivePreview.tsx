"use client";

import type { FontScale } from "@/store/preferences-store";
import { FONT_SCALE_MAP } from "@/store/preferences-store";

export interface LivePreviewProps {
  fontScale: FontScale;
}

export function LivePreview({ fontScale }: LivePreviewProps) {
  const formattedDate = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
          미리보기
        </p>
        <h2 className="text-xl font-semibold text-[var(--text-strong)]">
          설정 미리보기
        </h2>
        <p className="text-sm text-[var(--text-muted)]">
          선택한 폰트 크기가 어떻게 표시되는지 확인하세요
        </p>
      </div>

      <div className="flex flex-1 flex-col justify-between rounded-lg border border-dashed border-[var(--border-subtle)] bg-[var(--surface-muted)]/60 p-4 sm:p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-primary)]">
            이슈 상태
          </p>
          <p
            className="mt-2 text-4xl font-bold text-[var(--text-strong)]"
            style={{ fontSize: `calc(2.25rem * ${FONT_SCALE_MAP[fontScale]})` }}
          >
            진행 중
          </p>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            {formattedDate} · 프로젝트: SumUp
          </p>
        </div>

        <div className="rounded-lg bg-[var(--surface)] p-3 sm:p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-[var(--text-muted)]">
                완료된 작업
              </p>
              <p
                className="text-2xl font-semibold text-[var(--text-strong)]"
                style={{ fontSize: `calc(1.5rem * ${FONT_SCALE_MAP[fontScale]})` }}
              >
                28개
              </p>
            </div>
            <span className="rounded-full bg-[var(--brand-primary)]/10 px-3 py-1 text-xs font-semibold text-[var(--brand-primary)]">
              +12%
            </span>
          </div>

          <div className="mt-4 space-y-2">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-md border border-[var(--border-subtle)] bg-[var(--surface-muted)]/70 px-2 sm:px-3 py-1.5 sm:py-2"
              >
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold text-[var(--text-strong)]">
                    작업 {index}
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">•</span>
                  <span className="text-xs text-[var(--text-muted)]">{formattedDate}</span>
                </div>
                <span className="text-sm font-semibold text-[var(--brand-primary)]">
                  {index === 1 ? "완료" : "진행 중"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

