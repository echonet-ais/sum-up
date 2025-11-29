"use client";

import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout";
import { Card, CardHeader, CardTitle, CardContent } from "@hua-labs/ui";
import { Badge } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { Button } from "@hua-labs/ui";
import { Drawer, DrawerHeader, DrawerContent } from "@hua-labs/ui";
import { EmptyState, LoadingState, ErrorState, StatCard, FilterBar } from "@/components/common";
import dynamic from "next/dynamic";

const ProjectForm = dynamic(() => import("@/components/project").then((mod) => ({ default: mod.ProjectForm })));
import { useProjects } from "@/hooks/useProjects";
import { useTeams } from "@/hooks/useTeams";
import Link from "next/link";
import type { Project } from "@/types";

export default function ProjectsPage() {
  const { teams } = useTeams();
  const [searchQuery, setSearchQuery] = useState("");
  const [showArchived, setShowArchived] = useState(false);
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);

  // TODO: 실제 API로 교체
  const { projects, isLoading, error, refetch } = useProjects({
    search: searchQuery || undefined,
    showArchived,
  });

  const filteredProjects = useMemo(() => {
    let filtered = [...projects];

    // 검색 필터
    if (searchQuery) {
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 아카이브 필터
    if (!showArchived) {
      filtered = filtered.filter((project) => !project.isArchived);
    }

    // 즐겨찾기 우선 정렬
    filtered.sort((a, b) => {
      if (a.isFavorite && !b.isFavorite) return -1;
      if (!a.isFavorite && b.isFavorite) return 1;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    return filtered;
  }, [projects, searchQuery, showArchived]);

  const activeProjects = projects.filter((p) => !p.isArchived);
  const archivedProjects = projects.filter((p) => p.isArchived);
  const favoriteProjects = projects.filter((p) => p.isFavorite);

  if (error) {
    return (
      <AppLayout
        title="프로젝트"
        description="프로젝트를 관리하고 이슈를 추적하세요"
        activeItem="projects"
      >
        <ErrorState
          message={error.message}
          onRetry={() => window.location.reload()}
        />
      </AppLayout>
    );
  }

  return (
    <AppLayout
      title="프로젝트"
      description="프로젝트를 관리하고 이슈를 추적하세요"
      activeItem="projects"
    >
      <div className="flex flex-col gap-6">
        {/* 필터 및 검색 */}
        <FilterBar
          searchPlaceholder="프로젝트 이름 또는 설명으로 검색..."
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          filters={[
            {
              type: "checkbox",
              label: "아카이브된 프로젝트 표시",
              value: showArchived,
              onChange: (value) => setShowArchived(value as boolean),
            },
          ]}
          onReset={() => {
            setSearchQuery("");
            setShowArchived(false);
          }}
          showResetButton
        />

        {/* 통계 */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <StatCard label="전체" value={projects.length} />
          <StatCard label="활성" value={activeProjects.length} />
          <StatCard label="즐겨찾기" value={favoriteProjects.length} />
        </div>

        {/* 프로젝트 그리드 */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[var(--text-strong)]">
              {showArchived ? "모든 프로젝트" : "활성 프로젝트"}
            </h2>
            <Button onClick={() => setIsProjectFormOpen(true)}>
              <Icon name="add" size={16} className="mr-2" />
              새 프로젝트
            </Button>
          </div>
          {isLoading ? (
            <LoadingState message="프로젝트를 불러오는 중..." />
          ) : filteredProjects.length === 0 ? (
            <EmptyState
              title="프로젝트가 없습니다"
              description={
                searchQuery || showArchived
                  ? "검색 조건에 맞는 프로젝트가 없습니다"
                  : "새로운 프로젝트를 생성해보세요"
              }
              iconName="folder"
              action={
                !searchQuery && !showArchived
                  ? {
                      label: "새 프로젝트 생성",
                      onClick: () => (window.location.href = "/projects/new"),
                      variant: "primary" as const,
                    }
                  : undefined
              }
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProjects.map((project) => (
                <Link key={project.id} href={`/projects/${project.id}`}>
                  <Card className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm hover:shadow-md transition-shadow h-full">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <CardTitle className="text-lg">{project.name}</CardTitle>
                            {project.isFavorite && (
                              <Icon name="star" size={16} className="text-yellow-500 fill-yellow-500" />
                            )}
                          </div>
                          {project.description && (
                            <p className="text-sm text-[var(--text-muted)] line-clamp-2">
                              {project.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {project.isArchived && (
                            <Badge className="bg-gray-100 text-gray-700">아카이브</Badge>
                          )}
                        </div>
                        <Icon name="chevronRight" size={16} className="text-[var(--text-muted)]" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 프로젝트 생성/수정 Drawer */}
      <Drawer
        open={isProjectFormOpen}
        onOpenChange={setIsProjectFormOpen}
        side="right"
        size="lg"
      >
        <DrawerHeader showCloseButton onClose={() => setIsProjectFormOpen(false)}>
          <h2 className="text-lg font-semibold text-[var(--text-strong)]">새 프로젝트 생성</h2>
        </DrawerHeader>
        <DrawerContent>
          <ProjectForm
            onSuccess={() => {
              setIsProjectFormOpen(false);
              refetch();
            }}
            onCancel={() => setIsProjectFormOpen(false)}
            teams={teams.map((t) => ({ id: t.id, name: t.name }))}
          />
        </DrawerContent>
      </Drawer>
    </AppLayout>
  );
}
