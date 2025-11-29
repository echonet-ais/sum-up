"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@hua-labs/ui";
import { SettingsSelect } from "./SettingsSelect";
import type { LanguageCode } from "@/store/preferences-store";

export interface LanguageSectionProps {
  language: LanguageCode;
  dateFormat: "YYYY-MM-DD" | "YYYY/MM/DD" | "MM/DD/YYYY";
  onLanguageChange: (language: LanguageCode) => void;
  onDateFormatChange: (format: "YYYY-MM-DD" | "YYYY/MM/DD" | "MM/DD/YYYY") => void;
}

export function LanguageSection({
  language,
  dateFormat,
  onLanguageChange,
  onDateFormatChange,
}: LanguageSectionProps) {
  const languageOptions: Array<{ value: LanguageCode; label: string }> = [
    { value: "ko", label: "한국어 (KO)" },
    { value: "en", label: "English (EN)" },
    { value: "ja", label: "日本語 (JA)" },
  ];

  const dateFormatOptions = [
    { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
    { value: "YYYY/MM/DD", label: "YYYY/MM/DD" },
    { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
  ];

  return (
    <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
      <CardHeader>
        <CardTitle>언어 및 지역</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <SettingsSelect
          label="인터페이스 언어"
          value={language}
          onChange={(event) =>
            onLanguageChange(event.target.value as LanguageCode)
          }
          options={languageOptions}
        />
        <SettingsSelect
          label="날짜 형식"
          value={dateFormat}
          onChange={(event) => onDateFormatChange(event.target.value as "YYYY-MM-DD" | "YYYY/MM/DD" | "MM/DD/YYYY")}
          options={dateFormatOptions}
        />
      </CardContent>
    </Card>
  );
}

