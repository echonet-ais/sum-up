"use client";

import { useState, useEffect } from "react";
import { Icon } from "@hua-labs/ui";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // 스크롤 위치가 300px 이상이면 버튼 표시
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // 초기 실행
    toggleVisibility();

    window.addEventListener("scroll", toggleVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-6 right-6 z-50 w-10 h-10",
        "bg-[var(--surface)] border border-[var(--border-subtle)]",
        "text-[var(--text-strong)]",
        "rounded-lg shadow-sm",
        "hover:bg-[var(--surface-muted)] hover:shadow-md",
        "transition-all duration-150",
        "flex items-center justify-center",
        "active:scale-95",
        "focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:ring-offset-2"
      )}
      aria-label="맨 위로 스크롤"
      title="맨 위로 스크롤"
    >
      <Icon name="arrowUp" size={20} provider="phosphor" />
    </button>
  );
}

