"use client";

import * as React from "react";
import { Input } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { Badge } from "@hua-labs/ui";
import { useSearch, type SearchResult } from "@/hooks/useSearch";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface GlobalSearchProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function GlobalSearch({ open = false, onOpenChange, className }: GlobalSearchProps) {
  const [isOpen, setIsOpen] = React.useState(open);
  const [query, setQuery] = React.useState("");
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { results, isLoading, search: performSearch } = useSearch({ query, limit: 10 });

  React.useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query, performSearch]);

  // 키보드 단축키 (Cmd/Ctrl + K)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        onOpenChange?.(!isOpen);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        onOpenChange?.(false);
        setQuery("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onOpenChange]);

  const handleResultClick = (result: SearchResult) => {
    router.push(result.url);
    setIsOpen(false);
    onOpenChange?.(false);
    setQuery("");
  };

  const handleEnterKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && results.length > 0) {
      handleResultClick(results[0]);
    }
  };

  const getTypeLabel = (type: SearchResult["type"]) => {
    switch (type) {
      case "issue":
        return "이슈";
      case "project":
        return "프로젝트";
      case "team":
        return "팀";
      default:
        return type;
    }
  };

  const getTypeIcon = (type: SearchResult["type"]) => {
    switch (type) {
      case "issue":
        return "alert-circle";
      case "project":
        return "folder";
      case "team":
        return "users";
      default:
        return "file";
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => {
          setIsOpen(true);
          onOpenChange?.(true);
        }}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--border-subtle)]",
          "bg-[var(--surface)] text-[var(--text-muted)] hover:bg-[var(--surface-muted)]",
          "transition-colors",
          className
        )}
        aria-label="검색"
      >
        <Icon name="search" size={16} />
        <span className="hidden md:inline text-sm">검색...</span>
        <kbd className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs font-semibold text-[var(--text-muted)] bg-[var(--surface-muted)] border border-[var(--border-subtle)] rounded">
          <span className="text-[10px]">⌘</span>K
        </kbd>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
      {/* 오버레이 */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => {
          setIsOpen(false);
          onOpenChange?.(false);
          setQuery("");
        }}
      />

      {/* 검색 모달 */}
      <div
        className={cn(
          "relative w-full max-w-2xl bg-[var(--surface)] rounded-xl border border-[var(--border-subtle)]",
          "shadow-xl",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 검색 입력 */}
        <div className="flex items-center gap-3 p-4 border-b border-[var(--border-subtle)]">
          <Icon name="search" size={20} className="text-[var(--text-muted)]" />
            <Input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleEnterKey}
              placeholder="이슈, 프로젝트, 팀 검색..."
              className="flex-1 border-0 bg-transparent focus:ring-0 text-lg"
              autoFocus
            />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-[var(--text-muted)] hover:text-[var(--text-strong)]"
              aria-label="검색어 지우기"
            >
              <Icon name="x" size={16} />
            </button>
          )}
          <kbd className="hidden md:flex items-center gap-1 px-2 py-1 text-xs font-semibold text-[var(--text-muted)] bg-[var(--surface-muted)] border border-[var(--border-subtle)] rounded">
            ESC
          </kbd>
        </div>

        {/* 검색 결과 */}
        <div className="max-h-[60vh] overflow-y-auto">
          {isLoading && query ? (
            <div className="flex items-center justify-center py-8 text-[var(--text-muted)]">
              <Icon name="loader" size={20} className="animate-spin mr-2" />
              검색 중...
            </div>
          ) : query.length < 2 ? (
            <div className="py-8 text-center text-[var(--text-muted)]">
              <p className="text-sm">최소 2글자 이상 입력해주세요</p>
            </div>
          ) : results.length === 0 ? (
            <div className="py-8 text-center text-[var(--text-muted)]">
              <p className="text-sm">검색 결과가 없습니다</p>
            </div>
          ) : (
            <div className="py-2">
              {results.map((result) => (
                <button
                  key={`${result.type}-${result.id}`}
                  onClick={() => handleResultClick(result)}
                  className="w-full flex items-start gap-3 px-4 py-3 hover:bg-[var(--surface-muted)] transition-colors text-left"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <Icon
                      name={getTypeIcon(result.type)}
                      size={18}
                      className="text-[var(--text-muted)]"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-[var(--text-strong)] truncate">
                        {result.title}
                      </span>
                      <Badge className="text-xs">{getTypeLabel(result.type)}</Badge>
                    </div>
                    {result.description && (
                      <p className="text-sm text-[var(--text-muted)] line-clamp-1">
                        {result.description}
                      </p>
                    )}
                  </div>
                  <Icon
                    name="chevronRight"
                    size={16}
                    className="flex-shrink-0 text-[var(--text-muted)]"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 하단 힌트 */}
        {query && results.length > 0 && (
          <div className="px-4 py-2 border-t border-[var(--border-subtle)] bg-[var(--surface-muted)] text-xs text-[var(--text-muted)]">
            <span>↑↓</span> 키로 이동, <span>Enter</span>로 선택, <span>ESC</span>로 닫기
          </div>
        )}
      </div>
    </div>
  );
}

