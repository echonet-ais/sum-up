"use client";

import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { Button } from "@hua-labs/ui";
import { Card, CardHeader, CardTitle, CardContent } from "@hua-labs/ui";
import { FormDrawer } from "@/components/common";
import { Input } from "@hua-labs/ui";
import { Select, SelectOption } from "@hua-labs/ui";
import dynamic from "next/dynamic";
import { PriorityBadge } from "@/components/issue";

const IssueForm = dynamic(() => import("@/components/issue").then((mod) => ({ default: mod.IssueForm })));
import { StatusBadge } from "@/components/issue";
import { EmptyState, LoadingState, ErrorState } from "@/components/common";
import { useIssues } from "@/hooks/useIssues";
import { useProjects } from "@/hooks/useProjects";
import { useIssueFilterStore } from "@/store/issue-filter-store";
import { filterIssues, sortIssues, calculateIssueStats } from "@/lib/utils/issue-utils";
import Link from "next/link";
import type { Issue, IssueStatus, IssuePriority } from "@/types";

const statusOptions: { value: IssueStatus | "ALL"; label: string }[] = [
  { value: "ALL", label: "전체" },
  { value: "TODO", label: "할 일" },
  { value: "IN_PROGRESS", label: "진행 중" },
  { value: "IN_REVIEW", label: "검토 중" },
  { value: "DONE", label: "완료" },
];

const priorityOptions: { value: IssuePriority | "ALL"; label: string }[] = [
  { value: "ALL", label: "전체" },
  { value: "HIGH", label: "높음" },
  { value: "MEDIUM", label: "보통" },
  { value: "LOW", label: "낮음" },
];

// 상태 이름 매핑
const statusNameMap: Record<IssueStatus, string> = {
  TODO: "할 일",
  IN_PROGRESS: "진행 중",
  IN_REVIEW: "검토 중",
  DONE: "완료",
};

export default function IssuesPage() {
  const [isIssueFormOpen, setIsIssueFormOpen] = useState(false);
  const { projects } = useProjects();
  const {
    searchQuery,
    statusFilter,
    priorityFilter,
    sortBy,
    sortOrder,
    setSearchQuery,
    setStatusFilter,
    setPriorityFilter,
    setSortBy,
    setSortOrder,
  } = useIssueFilterStore();

  // TODO: 실제 API로 교체
  const { issues, isLoading, error, refetch: refetchIssues } = useIssues({
    status: statusFilter !== "ALL" ? statusFilter : undefined,
    priority: priorityFilter !== "ALL" ? priorityFilter : undefined,
    search: searchQuery || undefined,
    sortBy,
    sortOrder,
  });

  // 필터링 및 정렬
  const filteredAndSortedIssues = useMemo(() => {
    let filtered = filterIssues(issues, {
      searchQuery,
      status: statusFilter !== "ALL" ? statusFilter : undefined,
      priority: priorityFilter !== "ALL" ? priorityFilter : undefined,
    });

    return sortIssues(filtered, sortBy, sortOrder);
  }, [issues, searchQuery, statusFilter, priorityFilter, sortBy, sortOrder]);

  const stats = useMemo(() => calculateIssueStats(issues), [issues]);

  const handleSort = (field: "created" | "updated" | "title") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  if (error) {
    return (
      <AppLayout title="이슈" description="프로젝트 이슈를 관리하고 추적하세요" activeItem="issues">
        <ErrorState
          message={error.message}
          onRetry={() => window.location.reload()}
        />
      </AppLayout>
    );
  }

  return (
    <AppLayout
      title="이슈"
      description="프로젝트 이슈를 관리하고 추적하세요"
      activeItem="issues"
    >
      <div className="flex flex-col gap-6">
        {/* 필터 및 검색 */}
        <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="flex-1">
                <Input
                  placeholder="이슈 제목 또는 설명으로 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex gap-2">
                <Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as IssueStatus | "ALL")}
                  className="w-40"
                >
                  {statusOptions.map((option) => (
                    <SelectOption key={option.value} value={option.value}>
                      {option.label}
                    </SelectOption>
                  ))}
                </Select>
                <Select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value as IssuePriority | "ALL")}
                  className="w-40"
                >
                  {priorityOptions.map((option) => (
                    <SelectOption key={option.value} value={option.value}>
                      {option.label}
                    </SelectOption>
                  ))}
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 통계 */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
            <CardContent className="p-4">
              <div className="text-sm text-[var(--text-muted)]">전체</div>
              <div className="text-2xl font-semibold text-[var(--text-strong)]">
                {stats.total}
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
            <CardContent className="p-4">
              <div className="text-sm text-[var(--text-muted)]">할 일</div>
              <div className="text-2xl font-semibold text-[var(--text-strong)]">
                {stats.byStatus.TODO}
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
            <CardContent className="p-4">
              <div className="text-sm text-[var(--text-muted)]">진행 중</div>
              <div className="text-2xl font-semibold text-[var(--text-strong)]">
                {stats.byStatus.IN_PROGRESS}
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
            <CardContent className="p-4">
              <div className="text-sm text-[var(--text-muted)]">완료</div>
              <div className="text-2xl font-semibold text-[var(--text-strong)]">
                {stats.byStatus.DONE}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 이슈 테이블 */}
        <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>이슈 목록</CardTitle>
            <Button onClick={() => setIsIssueFormOpen(true)}>
              <Icon name="add" size={16} className="mr-2" />
              새 이슈
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <LoadingState message="이슈를 불러오는 중..." />
            ) : filteredAndSortedIssues.length === 0 ? (
              <EmptyState
                title="이슈가 없습니다"
                description={searchQuery || statusFilter !== "ALL" || priorityFilter !== "ALL"
                  ? "검색 조건에 맞는 이슈가 없습니다"
                  : "새로운 이슈를 생성해보세요"}
                iconName="inbox"
                action={
                  !searchQuery && statusFilter === "ALL" && priorityFilter === "ALL"
                    ? {
                        label: "새 이슈 생성",
                        onClick: () => setIsIssueFormOpen(true),
                        variant: "primary" as const,
                      }
                    : undefined
                }
              />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <button
                        onClick={() => handleSort("title")}
                        className="flex items-center gap-2 hover:text-[var(--text-strong)]"
                      >
                        제목
                        {sortBy === "title" && (
                          <Icon
                            name={sortOrder === "asc" ? "chevronUp" : "chevronDown"}
                            size={16}
                          />
                        )}
                      </button>
                    </TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead>우선순위</TableHead>
                    <TableHead>라벨</TableHead>
                    <TableHead>담당자</TableHead>
                    <TableHead>
                      <button
                        onClick={() => handleSort("updated")}
                        className="flex items-center gap-2 hover:text-[var(--text-strong)]"
                      >
                        수정일
                        {sortBy === "updated" && (
                          <Icon
                            name={sortOrder === "asc" ? "chevronUp" : "chevronDown"}
                            size={16}
                          />
                        )}
                      </button>
                    </TableHead>
                    <TableHead>
                      <span className="sr-only">액션</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedIssues.map((issue) => (
                    <TableRow key={issue.id}>
                      <TableCell>
                        <Link
                          href={`/issues/${issue.id}`}
                          className="font-medium text-[var(--text-strong)] hover:text-[var(--brand-primary)]"
                        >
                          {issue.title}
                        </Link>
                        {issue.description && (
                          <div className="text-sm text-[var(--text-muted)] mt-1 line-clamp-1">
                            {issue.description}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={statusNameMap[issue.status]} />
                      </TableCell>
                      <TableCell>
                        <PriorityBadge priority={issue.priority} />
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1 flex-wrap">
                          {issue.labels.map((label) => (
                            <StatusBadge
                              key={label.id}
                              status={label.name}
                              color={label.color}
                              size="sm"
                            />
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        {issue.assignee ? (
                          <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full bg-[var(--brand-primary)] flex items-center justify-center text-white text-xs">
                              {issue.assignee.name?.[0] || "?"}
                            </div>
                            <span className="text-sm text-[var(--text-muted)]">
                              {issue.assignee.name}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm text-[var(--text-muted)]">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-[var(--text-muted)]">
                        {new Date(issue.updatedAt).toLocaleDateString("ko-KR")}
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`/issues/${issue.id}`}
                          className="text-[var(--brand-primary)] hover:underline"
                        >
                          <Icon name="chevronRight" size={16} />
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 이슈 생성/수정 Drawer */}
      <FormDrawer
        open={isIssueFormOpen}
        onOpenChange={setIsIssueFormOpen}
        title="새 이슈 생성"
      >
        <IssueForm
          onSuccess={() => {
            setIsIssueFormOpen(false);
            refetchIssues();
          }}
          onCancel={() => setIsIssueFormOpen(false)}
          projects={projects.map((p) => ({ id: p.id, name: p.name }))}
        />
      </FormDrawer>
    </AppLayout>
  );
}
