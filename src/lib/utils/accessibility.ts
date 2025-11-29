/**
 * 접근성 유틸리티 함수
 */

/**
 * 키보드 이벤트가 특정 키인지 확인
 */
export function isKey(
  event: KeyboardEvent | React.KeyboardEvent,
  key: string | string[]
): boolean {
  const keys = Array.isArray(key) ? key : [key];
  return keys.includes(event.key) || keys.includes(event.code);
}

/**
 * Enter 또는 Space 키인지 확인
 */
export function isActivationKey(event: KeyboardEvent | React.KeyboardEvent): boolean {
  return isKey(event, ["Enter", " "]);
}

/**
 * Escape 키인지 확인
 */
export function isEscapeKey(event: KeyboardEvent | React.KeyboardEvent): boolean {
  return isKey(event, "Escape");
}

/**
 * Arrow 키인지 확인
 */
export function isArrowKey(event: KeyboardEvent | React.KeyboardEvent): boolean {
  return isKey(event, ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]);
}

/**
 * 포커스 트랩 설정 (모달 등에서 사용)
 */
export function createFocusTrap(
  container: HTMLElement,
  options?: { initialFocus?: HTMLElement; returnFocus?: HTMLElement }
): () => void {
  const focusableElements = container.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key !== "Tab") return;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement?.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement?.focus();
        e.preventDefault();
      }
    }
  };

  container.addEventListener("keydown", handleTabKey);

  // 초기 포커스 설정
  if (options?.initialFocus) {
    options.initialFocus.focus();
  } else if (firstElement) {
    firstElement.focus();
  }

  return () => {
    container.removeEventListener("keydown", handleTabKey);
    options?.returnFocus?.focus();
  };
}

/**
 * ARIA 라이브 영역에 메시지 표시
 */
export function announceToScreenReader(message: string, priority: "polite" | "assertive" = "polite") {
  const liveRegion = document.getElementById("aria-live-region") || createLiveRegion();
  liveRegion.setAttribute("aria-live", priority);
  liveRegion.textContent = message;

  // 메시지가 읽힌 후 정리
  setTimeout(() => {
    liveRegion.textContent = "";
  }, 1000);
}

function createLiveRegion(): HTMLElement {
  const region = document.createElement("div");
  region.id = "aria-live-region";
  region.setAttribute("aria-live", "polite");
  region.setAttribute("aria-atomic", "true");
  region.className = "sr-only";
  region.style.cssText = "position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0;";
  document.body.appendChild(region);
  return region;
}

/**
 * 색상 대비 비율 계산 (WCAG AA 기준: 4.5:1)
 */
export function getContrastRatio(color1: string, color2: string): number {
  const getLuminance = (color: string): number => {
    const rgb = hexToRgb(color);
    if (!rgb) return 0;

    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((val) => {
      val = val / 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * WCAG AA 기준 충족 여부 확인
 */
export function meetsWCAGAA(foreground: string, background: string): boolean {
  return getContrastRatio(foreground, background) >= 4.5;
}

