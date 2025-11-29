/**
 * AI 결과 캐싱
 * 이슈 설명이나 댓글이 변경되면 캐시 무효화
 */

interface CacheEntry {
  content: string;
  createdAt: number;
  contentHash: string; // 원본 내용의 해시
}

class AICache {
  private cache: Map<string, CacheEntry> = new Map();

  /**
   * 간단한 해시 함수 (실제로는 crypto 사용 권장)
   */
  private hash(content: string): string {
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
      const char = content.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString(36);
  }

  /**
   * 캐시 키 생성
   */
  private getKey(issueId: string, type: string, contentHash: string): string {
    return `${issueId}:${type}:${contentHash}`;
  }

  /**
   * 캐시에서 조회
   */
  get(issueId: string, type: string, content: string): string | null {
    const contentHash = this.hash(content);
    const key = this.getKey(issueId, type, contentHash);
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    // 캐시가 유효한지 확인 (24시간)
    const now = Date.now();
    const maxAge = 24 * 60 * 60 * 1000; // 24시간
    if (now - entry.createdAt > maxAge) {
      this.cache.delete(key);
      return null;
    }

    return entry.content;
  }

  /**
   * 캐시에 저장
   */
  set(issueId: string, type: string, content: string, result: string): void {
    const contentHash = this.hash(content);
    const key = this.getKey(issueId, type, contentHash);
    this.cache.set(key, {
      content: result,
      createdAt: Date.now(),
      contentHash,
    });
  }

  /**
   * 캐시 무효화 (이슈 설명이나 댓글이 변경된 경우)
   */
  invalidate(issueId: string, type?: string): void {
    if (type) {
      // 특정 타입만 무효화
      const prefix = `${issueId}:${type}:`;
      for (const key of this.cache.keys()) {
        if (key.startsWith(prefix)) {
          this.cache.delete(key);
        }
      }
    } else {
      // 이슈의 모든 캐시 무효화
      const prefix = `${issueId}:`;
      for (const key of this.cache.keys()) {
        if (key.startsWith(prefix)) {
          this.cache.delete(key);
        }
      }
    }
  }

  /**
   * 오래된 캐시 정리
   */
  cleanup(): void {
    const now = Date.now();
    const maxAge = 24 * 60 * 60 * 1000; // 24시간
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.createdAt > maxAge) {
        this.cache.delete(key);
      }
    }
  }
}

// 싱글톤 인스턴스
export const aiCache = new AICache();

// 주기적으로 정리 (1시간마다)
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    aiCache.cleanup();
  }, 60 * 60 * 1000);
}

