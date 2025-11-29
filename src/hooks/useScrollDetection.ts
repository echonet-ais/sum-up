"use client";

import { useState, useEffect, useRef } from "react";

interface UseScrollDetectionOptions {
  /**
   * 스크롤 감지를 활성화할지 여부
   */
  isActive: boolean;
  /**
   * 끝에서 몇 px 이내면 끝까지 본 것으로 간주할지
   * @default 10
   */
  threshold?: number;
  /**
   * 끝까지 스크롤했을 때 실행할 콜백
   */
  onScrollToEnd?: () => void;
}

/**
 * 스크롤 끝 도달 감지 훅
 *
 * @description
 * 컨테이너가 끝까지 스크롤되었는지 감지합니다.
 * 약관 동의 등에서 사용자가 내용을 모두 확인했는지 확인할 때 유용합니다.
 */
export function useScrollDetection(options: UseScrollDetectionOptions) {
  const { isActive, threshold = 10, onScrollToEnd } = options;
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !scrollContainerRef.current) return;

    const scrollContainer = scrollContainerRef.current;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const isAtBottom =
        Math.abs(scrollHeight - scrollTop - clientHeight) < threshold;

      if (isAtBottom && !hasScrolledToEnd) {
        setHasScrolledToEnd(true);
        onScrollToEnd?.();
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    // 초기 체크 (이미 스크롤할 필요가 없는 경우)
    handleScroll();

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, [isActive, hasScrolledToEnd, threshold, onScrollToEnd]);

  /**
   * 스크롤 상태 리셋
   */
  const resetScroll = () => {
    setHasScrolledToEnd(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  return {
    /**
     * 끝까지 스크롤했는지 여부
     */
    hasScrolledToEnd,
    /**
     * 스크롤 컨테이너에 연결할 ref
     */
    scrollContainerRef,
    /**
     * 스크롤 상태를 리셋하는 함수
     */
    resetScroll,
  };
}

