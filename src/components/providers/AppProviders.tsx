"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { ToastProvider } from "@hua-labs/ui";
import { usePreferencesStore } from "@/store/preferences-store";
import { FONT_SCALE_MAP } from "@/store/preferences-store";
import { initPhosphorIcons } from "@hua-labs/ui";

interface AppProvidersProps {
  children: ReactNode;
}

function ThemeSyncBridge() {
  const selectedTheme = usePreferencesStore((state) => state.theme);
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  // 시스템 테마 감지
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = (matches: boolean) => setSystemTheme(matches ? "dark" : "light");
    const handleChange = (event: MediaQueryListEvent) => apply(event.matches);

    apply(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // 실제 적용될 테마 계산
  const effectiveTheme =
    selectedTheme === "system" ? systemTheme : selectedTheme;

  // DOM에 테마 적용
  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    root.classList.toggle("dark", effectiveTheme === "dark");
    root.dataset.theme = effectiveTheme;
  }, [effectiveTheme]);

  return null;
}

function AccessibilitySyncBridge() {
  const fontScale = usePreferencesStore((state) => state.fontScale);
  const highContrast = usePreferencesStore((state) => state.highContrast);
  const reducedMotion = usePreferencesStore((state) => state.reducedMotion);

  // 폰트 스케일 적용
  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    root.style.setProperty("--font-scale", String(FONT_SCALE_MAP[fontScale]));
  }, [fontScale]);

  // 고대비 모드 적용
  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    if (highContrast) {
      root.setAttribute("data-contrast", "high");
    } else {
      root.removeAttribute("data-contrast");
    }
  }, [highContrast]);

  // 감소된 모션 적용
  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    root.dataset.motion = reducedMotion ? "reduce" : "normal";
  }, [reducedMotion]);

  return null;
}

function IconProviderBridge() {
  // Phosphor Icons 초기화 (lazy load)
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Phosphor Icons는 필요할 때만 로드됩니다
    initPhosphorIcons().catch(() => {
      // Phosphor Icons가 없어도 Lucide Icons로 fallback
    });
  }, []);

  return null;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ToastProvider>
      <ThemeSyncBridge />
      <AccessibilitySyncBridge />
      <IconProviderBridge />
      {children}
    </ToastProvider>
  );
}

