/**
 * AI Rate Limiter
 * 사용자별 AI API 호출 제한 관리
 */

interface RateLimitRecord {
  count: number;
  resetAt: number; // timestamp
}

// 메모리 기반 Rate Limiter (프로덕션에서는 Redis 사용 권장)
class RateLimiter {
  private records: Map<string, RateLimitRecord> = new Map();
  private readonly minuteLimit: number;
  private readonly dayLimit: number;

  constructor(minuteLimit: number = 10, dayLimit: number = 100) {
    this.minuteLimit = minuteLimit;
    this.dayLimit = dayLimit;
  }

  /**
   * 사용자 ID와 타입(분/일)으로 키 생성
   */
  private getKey(userId: string, type: "minute" | "day"): string {
    const now = Date.now();
    if (type === "minute") {
      // 분 단위: userId:minute:timestamp (1분 단위)
      const minute = Math.floor(now / 60000);
      return `${userId}:minute:${minute}`;
    } else {
      // 일 단위: userId:day:YYYY-MM-DD
      const date = new Date(now).toISOString().split("T")[0];
      return `${userId}:day:${date}`;
    }
  }

  /**
   * Rate Limit 체크
   */
  checkLimit(userId: string): { allowed: boolean; remaining: number; resetAt: number } {
    const now = Date.now();
    const minuteKey = this.getKey(userId, "minute");
    const dayKey = this.getKey(userId, "day");

    // 분 단위 체크
    const minuteRecord = this.records.get(minuteKey);
    const minuteResetAt = Math.floor(now / 60000) * 60000 + 60000; // 다음 분

    if (minuteRecord && minuteRecord.count >= this.minuteLimit) {
      return {
        allowed: false,
        remaining: 0,
        resetAt: minuteResetAt,
      };
    }

    // 일 단위 체크
    const dayRecord = this.records.get(dayKey);
    const dayResetAt = new Date(now).setHours(24, 0, 0, 0); // 다음 날 자정

    if (dayRecord && dayRecord.count >= this.dayLimit) {
      return {
        allowed: false,
        remaining: 0,
        resetAt: dayResetAt,
      };
    }

    // 제한 내에 있음
    const minuteCount = minuteRecord?.count || 0;
    const dayCount = dayRecord?.count || 0;
    const remaining = Math.min(
      this.minuteLimit - minuteCount,
      this.dayLimit - dayCount
    );

    return {
      allowed: true,
      remaining,
      resetAt: Math.min(minuteResetAt, dayResetAt),
    };
  }

  /**
   * 호출 기록
   */
  recordCall(userId: string): void {
    const now = Date.now();
    const minuteKey = this.getKey(userId, "minute");
    const dayKey = this.getKey(userId, "day");

    // 분 단위 기록
    const minuteRecord = this.records.get(minuteKey);
    if (minuteRecord) {
      minuteRecord.count++;
    } else {
      this.records.set(minuteKey, {
        count: 1,
        resetAt: Math.floor(now / 60000) * 60000 + 60000,
      });
    }

    // 일 단위 기록
    const dayRecord = this.records.get(dayKey);
    if (dayRecord) {
      dayRecord.count++;
    } else {
      this.records.set(dayKey, {
        count: 1,
        resetAt: new Date(now).setHours(24, 0, 0, 0),
      });
    }

    // 오래된 레코드 정리 (메모리 절약)
    this.cleanup();
  }

  /**
   * 오래된 레코드 정리
   */
  private cleanup(): void {
    const now = Date.now();
    for (const [key, record] of this.records.entries()) {
      if (record.resetAt < now) {
        this.records.delete(key);
      }
    }
  }
}

// 싱글톤 인스턴스
export const rateLimiter = new RateLimiter(10, 100);

