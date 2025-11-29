"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@hua-labs/ui";
import { PreferenceToggle } from "./PreferenceToggle";

export interface AccessibilitySectionProps {
  highContrast: boolean;
  reducedMotion: boolean;
  onToggleHighContrast: () => void;
  onToggleReducedMotion: () => void;
}

export function AccessibilitySection({
  highContrast,
  reducedMotion,
  onToggleHighContrast,
  onToggleReducedMotion,
}: AccessibilitySectionProps) {
  return (
    <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
      <CardHeader>
        <CardTitle>접근성</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <PreferenceToggle
          label="고대비 모드"
          description="색상 대비를 높여 가독성을 향상시킵니다"
          checked={highContrast}
          onChange={onToggleHighContrast}
        />
        <PreferenceToggle
          label="모션 감소"
          description="애니메이션 효과를 줄여 움직임에 민감한 사용자를 지원합니다"
          checked={reducedMotion}
          onChange={onToggleReducedMotion}
        />
      </CardContent>
    </Card>
  );
}

