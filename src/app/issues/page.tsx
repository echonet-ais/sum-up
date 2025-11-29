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
import { Pagination } from "@hua-labs/ui";
import dynamic from "next/dynamic";
import { PriorityBadge } from "@/components/issue";

const IssueForm = dynamic(() => import("@/components/issue").then((mod) => ({ default: mod.IssueForm })));
import { StatusBadge } from "@/components/issue";
import { EmptyState, LoadingState, ErrorState, SectionErrorBoundary, StatsPanel, ContentCard } from "@/components/common";
import { useIssues } from "@/hooks/useIssues";
import { useProjects } from "@/hooks/useProjects";
import { useIssueFilterStore } from "@/store/issue-filter-store";
import { calculateIssueStats } from "@/lib/utils/issue-utils";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [projectFilter, setProjectFilter] = useState<string>("ALL");
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

  // API에서 필터링/정렬/페이지네이션 처리
  const {
    issues,
    isLoading,
    error,
    total,
    totalPages,
    currentPage: apiCurrentPage,
    refetch: refetchIssues,
  } = useIssues({
    projectId: projectFilter !== "ALL" ? projectFilter : undefined,
    status: statusFilter !== "ALL" ? statusFilter : undefined,
    priority: priorityFilter !== "ALL" ? priorityFilter : undefined,
    search: searchQuery || undefined,
    sortBy,
    sortOrder,
    page: currentPage,
    limit: pageSize,
  });

  // 필터 변경 시 첫 페이지로 리셋
  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  const stats = useMemo(() => calculateIssueStats(issues), [issues]);

  const handleSort = (field: "created" | "updated" | "title") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
    setCurrentPage(1); // 정렬 변경 시 첫 페이지로
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 페이지 변경 시 스크롤을 상단으로
    window.scrollTo({ top: 0, behavior: "smooth" });
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
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    handleFilterChange();
                  }}
                  className="w-full"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <Select
                  value={projectFilter}
                  onChange={(e) => {
                    setProjectFilter(e.target.value);
                    handleFilterChange();
                  }}
                  className="w-40"
                >
                  <SelectOption value="ALL">전체 프로젝트</SelectOption>
                  {projects.map((project) => (
                    <SelectOption key={project.id} value={project.id}>
                      {project.name}
                    </SelectOption>
                  ))}
                </Select>
                <Select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value as IssueStatus | "ALL");
                    handleFilterChange();
                  }}
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
                  onChange={(e) => {
                    setPriorityFilter(e.target.value as IssuePriority | "ALL");
                    handleFilterChange();
                  }}
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
        <StatsPanel
          columns={4}
          items={[
            {
              label: "전체",
              value: stats.total.toString(),
              accent: "neutral",
            },
            {
              label: "할 일",
              value: stats.byStatus.TODO.toString(),
              accent: "warning",
            },
            {
              label: "진행 중",
              value: stats.byStatus.IN_PROGRESS.toString(),
              accent: "primary",
            },
            {
              label: "완료",
              value: stats.byStatus.DONE.toString(),
              accent: "secondary",
            },
          ]}
        />

        {/* 이슈 테이블 */}
        <SectionErrorBoundary sectionName="이슈 목록">
          <ContentCard
            title="이슈 목록"
            actions={
              <Button onClick={() => setIsIssueFormOpen(true)} className="w-full sm:w-auto">
                <Icon name="add" size={16} className="mr-2" />
                새 이슈
              </Button>
            }
            contentClassName="p-0"
          >
            {isLoading ? (
              <LoadingState message="이슈를 불러오는 중..." />
            ) : issues.length === 0 ? (
              <EmptyState
                title="이슈가 없습니다"
                description={
                  searchQuery ||
                  statusFilter !== "ALL" ||
                  priorityFilter !== "ALL" ||
                  projectFilter !== "ALL"
                    ? "검색 조건에 맞는 이슈가 없습니다"
                    : "새로운 이슈를 생성해보세요"
                }
                iconName="inbox"
                action={
                  !searchQuery &&
                  statusFilter === "ALL" &&
                  priorityFilter === "ALL" &&
                  projectFilter === "ALL"
                    ? {
                        label: "새 이슈 생성",
                        onClick: () => setIsIssueFormOpen(true),
                        variant: "primary" as const,
                      }
                    : undefined
                }
              />
            ) : (
              <>
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
                    {issues.map((issue) => (
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
                          <StatusBadge status={statusNameMap[issue.status as IssueStatus]} />
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

                {/* 페이지네이션 */}
                {totalPages > 1 && (
                  <div className="border-t border-[var(--border-subtle)] px-4 py-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-[var(--text-muted)]">
                        총 {total}개의 이슈 중 {((currentPage - 1) * pageSize) + 1}-
                        {Math.min(currentPage * pageSize, total)}개 표시
                      </div>
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        showFirstLast
                        showPrevNext
                        variant="outlined"
                        shape="square"
                        className="gap-2"
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </ContentCard>
        </SectionErrorBoundary>
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
