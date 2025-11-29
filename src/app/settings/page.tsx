"use client";

import { AppLayout } from "@/components/layout";
import { Card } from "@hua-labs/ui";
import { usePreferencesStore } from "@/store/preferences-store";
import { ThemeSection } from "@/components/settings/ThemeSection";
import { LivePreview } from "@/components/settings/LivePreview";
import { LanguageSection } from "@/components/settings/LanguageSection";
import { AccessibilitySection } from "@/components/settings/AccessibilitySection";

export default function SettingsPage() {
  const {
    theme,
    setTheme,
    language,
    setLanguage,
    dateFormat,
    setDateFormat,
    fontScale,
    setFontScale,
    highContrast,
    toggleHighContrast,
    reducedMotion,
    toggleReducedMotion,
  } = usePreferencesStore();

  return (
    <AppLayout title="설정" description="애플리케이션 설정을 관리하세요" activeItem="settings">
      <div className="flex flex-col gap-6">
        {/* 테마 & 타이포그래피 섹션 */}
        <section className="grid gap-6 lg:grid-cols-3">
          <ThemeSection
            theme={theme}
            fontScale={fontScale}
            onThemeChange={setTheme}
            onFontScaleChange={setFontScale}
          />

          {/* 미리보기 패널 */}
          <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
            <div className="p-6">
              <LivePreview fontScale={fontScale} />
            </div>
          </Card>
        </section>

        {/* 지역 및 데이터 형식, 접근성 섹션 */}
        <section className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          <LanguageSection
            language={language}
            dateFormat={dateFormat}
            onLanguageChange={setLanguage}
            onDateFormatChange={setDateFormat}
          />

          <AccessibilitySection
            highContrast={highContrast}
            reducedMotion={reducedMotion}
            onToggleHighContrast={toggleHighContrast}
            onToggleReducedMotion={toggleReducedMotion}
          />
        </section>
      </div>
    </AppLayout>
  );
}
