"use client";

import { useSearchParams } from "next/navigation";
import { AppLayout } from "@/components/layout";
import { Card, CardHeader, CardTitle, CardContent } from "@hua-labs/ui";
import { Badge } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { EmptyState } from "@/components/common";
import { useSearch, type SearchResultType } from "@/hooks/useSearch";
import Link from "next/link";
import { useMemo } from "react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const { results, isLoading } = useSearch({ query, limit: 50 });

  const groupedResults = useMemo(() => {
    const grouped: Record<SearchResultType, typeof results> = {
      issue: [],
      project: [],
      team: [],
    };

    results.forEach((result) => {
      grouped[result.type].push(result);
    });

    return grouped;
  }, [results]);

  const getTypeLabel = (type: SearchResultType) => {
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

  const getTypeIcon = (type: SearchResultType) => {
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

  return (
    <AppLayout
      title="검색 결과"
      description={query ? `"${query}" 검색 결과` : "검색어를 입력하세요"}
      activeItem="search"
    >
      <div className="flex flex-col gap-6">
        {!query ? (
          <EmptyState
            title="검색어를 입력하세요"
            description="이슈, 프로젝트, 팀을 검색할 수 있습니다"
            iconName="search"
          />
        ) : isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Icon name="loader" size={24} className="animate-spin text-[var(--text-muted)]" />
          </div>
        ) : results.length === 0 ? (
          <EmptyState
            title="검색 결과가 없습니다"
            description={`"${query}"에 대한 검색 결과를 찾을 수 없습니다`}
            iconName="search"
          />
        ) : (
          <>
            {/* 검색 통계 */}
            <div className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
              <span>
                총 <strong className="text-[var(--text-strong)]">{results.length}개</strong>의
                결과
              </span>
              {Object.entries(groupedResults).map(([type, items]) => {
                const typedType = type as SearchResultType;
                return (
                  <span key={typedType}>
                    {getTypeLabel(typedType)}{" "}
                    <strong className="text-[var(--text-strong)]">{items.length}</strong>
                  </span>
                );
              })}
            </div>

            {/* 검색 결과 그룹 */}
            {Object.entries(groupedResults).map(([type, items]) => {
              const typedType = type as SearchResultType;
              if (items.length === 0) return null;

              return (
                <Card
                  key={type}
                  className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name={getTypeIcon(typedType)} size={20} />
                      {getTypeLabel(typedType)} ({items.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {items.map((result) => (
                        <Link
                          key={`${result.type}-${result.id}`}
                          href={result.url}
                          className="block p-3 rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--surface-muted)] transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <Icon
                              name={getTypeIcon(result.type)}
                              size={18}
                              className="mt-0.5 text-[var(--text-muted)]"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-[var(--text-strong)]">
                                  {result.title}
                                </span>
                                <Badge className="text-xs">{getTypeLabel(result.type)}</Badge>
                              </div>
                              {result.description && (
                                <p className="text-sm text-[var(--text-muted)] line-clamp-2">
                                  {result.description}
                                </p>
                              )}
                            </div>
                            <Icon
                              name="chevronRight"
                              size={16}
                              className="flex-shrink-0 text-[var(--text-muted)]"
                            />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </>
        )}
      </div>
    </AppLayout>
  );
}

