"use client";

import { Icon, type IconName } from "@hua-labs/ui";
import { Card, CardHeader, CardTitle, CardContent } from "@hua-labs/ui";
import type { ThemeMode, FontScale } from "@/store/preferences-store";
import { FONT_SCALE_MAP } from "@/store/preferences-store";

export interface ThemeSectionProps {
  theme: ThemeMode;
  fontScale: FontScale;
  onThemeChange: (theme: ThemeMode) => void;
  onFontScaleChange: (scale: FontScale) => void;
}

export function ThemeSection({
  theme,
  fontScale,
  onThemeChange,
  onFontScaleChange,
}: ThemeSectionProps) {
  const themeOptions: Array<{
    value: ThemeMode;
    label: string;
    description: string;
    icon: IconName;
  }> = [
    {
      value: "system",
      label: "시스템 설정",
      description: "시스템 테마를 따릅니다",
      icon: "monitor",
    },
    {
      value: "light",
      label: "라이트",
      description: "밝은 테마를 사용합니다",
      icon: "sun",
    },
    {
      value: "dark",
      label: "다크",
      description: "어두운 테마를 사용합니다",
      icon: "moon",
    },
  ];

  const fontScaleOptions: Array<{
    value: FontScale;
    label: string;
    description: string;
  }> = [
    {
      value: "small",
      label: "작게",
      description: "95% 크기",
    },
    {
      value: "medium",
      label: "보통",
      description: "100% 크기",
    },
    {
      value: "large",
      label: "크게",
      description: "108% 크기",
    },
    {
      value: "xlarge",
      label: "매우 크게",
      description: "115% 크기",
    },
  ];

  return (
    <Card className="lg:col-span-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
      <CardHeader>
        <CardTitle>테마 및 타이포그래피</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* 테마 선택 */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)] mb-4">
            인터페이스 테마
          </p>
          <div className="grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {themeOptions.map((option) => {
              const isSelected = theme === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onThemeChange(option.value)}
                  className={`micro-button relative rounded-lg border p-3 sm:p-4 text-left transition-all ${
                    isSelected
                      ? "border-[var(--brand-primary)] bg-[var(--brand-primary)]/10 shadow-sm ring-2 ring-[var(--brand-primary)]/20"
                      : "border-[var(--border-subtle)] hover:border-[var(--brand-primary)]/40 hover:bg-[var(--surface-muted)]/50"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute right-3 top-3">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--brand-primary)]">
                        <Icon name="check" size={12} className="text-white" />
                      </div>
                    </div>
                  )}
                  <div className={`mb-3 flex items-center gap-2 ${isSelected ? "text-[var(--brand-primary)]" : "text-[var(--text-muted)]"}`}>
                    <Icon name={option.icon} size={16} />
                    <span className={`text-xs font-semibold uppercase tracking-wide ${isSelected ? "text-[var(--brand-primary)]" : "text-[var(--text-muted)]"}`}>
                      {option.value}
                    </span>
                  </div>
                  <div>
                    <div className={`text-sm font-semibold ${isSelected ? "text-[var(--text-strong)]" : "text-[var(--text-muted)]"}`}>
                      {option.label}
                    </div>
                    <div className="mt-1 text-xs text-[var(--text-muted)]">
                      {option.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 폰트 스케일 */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
              폰트 크기
            </p>
            <span className="text-xs font-mono font-semibold text-[var(--brand-primary)]">
              {Math.round(FONT_SCALE_MAP[fontScale] * 100)}%
            </span>
          </div>
          <div className="grid gap-2 sm:gap-3 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
            {fontScaleOptions.map((option) => {
              const isActive = option.value === fontScale;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onFontScaleChange(option.value)}
                  className={`micro-button relative rounded-lg border p-3 sm:p-4 text-left transition-all ${
                    isActive
                      ? "border-[var(--brand-primary)] bg-[var(--brand-primary)]/10 shadow-sm ring-2 ring-[var(--brand-primary)]/20"
                      : "border-[var(--border-subtle)] bg-[var(--surface)] hover:border-[var(--brand-primary)]/40 hover:bg-[var(--surface-muted)]/50"
                  }`}
                >
                  {isActive && (
                    <div className="absolute right-3 top-3">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--brand-primary)]">
                        <Icon name="check" size={12} className="text-white" />
                      </div>
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-2">
                    <p className={`text-sm font-semibold ${isActive ? "text-[var(--text-strong)]" : "text-[var(--text-muted)]"}`}>
                      {option.label}
                    </p>
                    <span className="text-xs font-mono text-[var(--text-muted)]">
                      {Math.round(FONT_SCALE_MAP[option.value] * 100)}%
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)]">
                    {option.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

