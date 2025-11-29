/**
 * 날짜 포맷팅 유틸리티 함수
 */

/**
 * 상대 시간 포맷팅 (예: "방금 전", "5분 전", "2시간 전")
 * 
 * @param date - 포맷팅할 날짜 (Date 객체 또는 ISO 문자열)
 * @returns 상대 시간 문자열
 */
export function formatTimeAgo(date: Date | string): string {
  const now = new Date();
  const targetDate = typeof date === "string" ? new Date(date) : date;
  const diffInSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "방금 전";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}분 전`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}시간 전`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}일 전`;
  } else {
    return targetDate.toLocaleDateString("ko-KR", {
      month: "short",
      day: "numeric",
    });
  }
}

/**
 * 날짜 포맷팅 옵션
 */
export interface FormatDateOptions {
  /** 날짜 형식 */
  format?: "short" | "medium" | "long" | "full";
  /** 월 표시 방식 */
  month?: "numeric" | "2-digit" | "short" | "long";
  /** 일 표시 방식 */
  day?: "numeric" | "2-digit";
  /** 연도 표시 여부 */
  year?: "numeric" | "2-digit" | undefined;
}

/**
 * 날짜 포맷팅
 * 
 * @param date - 포맷팅할 날짜 (Date 객체, ISO 문자열, 또는 undefined)
 * @param options - 포맷팅 옵션
 * @returns 포맷팅된 날짜 문자열 또는 null
 * 
 * @example
 * formatDate(new Date()) // "2025. 11. 29."
 * formatDate(new Date(), { month: "short", day: "numeric" }) // "11월 29일"
 */
export function formatDate(
  date: Date | string | undefined,
  options?: FormatDateOptions
): string | null {
  if (!date) return null;

  const d = typeof date === "string" ? new Date(date) : date;
  
  if (isNaN(d.getTime())) {
    return null;
  }

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: options?.year ?? "numeric",
    month: options?.month ?? "numeric",
    day: options?.day ?? "numeric",
  };

  return d.toLocaleDateString("ko-KR", defaultOptions);
}

/**
 * 간단한 날짜 포맷팅 (월 일만 표시)
 * 
 * @param date - 포맷팅할 날짜
 * @returns "11월 29일" 형식의 문자열 또는 null
 */
export function formatShortDate(date: Date | string | undefined): string | null {
  return formatDate(date, { month: "short", day: "numeric", year: undefined });
}

/**
 * 전체 날짜 포맷팅 (년 월 일 표시)
 * 
 * @param date - 포맷팅할 날짜
 * @returns "2025. 11. 29." 형식의 문자열 또는 null
 */
export function formatFullDate(date: Date | string | undefined): string | null {
  return formatDate(date, { year: "numeric", month: "numeric", day: "numeric" });
}

