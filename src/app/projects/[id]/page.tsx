"use client";

import * as React from "react";
import { use } from "react";
import { AppLayout } from "@/components/layout";
import { Card, CardHeader, CardTitle, CardContent } from "@hua-labs/ui";
import { Badge } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { Button } from "@hua-labs/ui";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@hua-labs/ui";
import { EmptyState, ErrorState, LoadingState, ConfirmDialog, StatCard } from "@/components/common";
import { ProjectForm } from "@/components/project";
import { useProject } from "@/hooks/useProject";
import { useToast } from "@hua-labs/ui";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Project } from "@/types";

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { project, isLoading, error, deleteProject, refetch } = useProject(id);
  const { addToast } = useToast();
  const router = useRouter();
  const [isEditFormOpen, setIsEditFormOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  if (isLoading) {
    return (
      <AppLayout title="프로젝트" activeItem="projects">
        <LoadingState message="프로젝트를 불러오는 중..." />
      </AppLayout>
    );
  }

  if (error || !project) {
    return (
      <AppLayout title="프로젝트를 찾을 수 없습니다" activeItem="projects">
        <ErrorState
          title="프로젝트를 찾을 수 없습니다"
          message={error?.message || "요청하신 프로젝트가 존재하지 않거나 삭제되었습니다."}
          onRetry={() => window.location.reload()}
          retryLabel="다시 시도"
        />
      </AppLayout>
    );
  }

  // TODO: 실제 데이터로 교체
  const stats = {
    totalIssues: 24,
    openIssues: 12,
    inProgressIssues: 6,
    completedIssues: 6,
  };

  return (
    <AppLayout title={project.name} description={project.description} activeItem="projects">
      <div className="flex flex-col gap-6">
        {/* 헤더 액션 */}
        <div className="flex items-center justify-between">
          <Link
            href="/projects"
            className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-strong)]"
          >
            <Icon name="chevronLeft" size={16} />
            프로젝트 목록으로
          </Link>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditFormOpen(true)}>
              수정
            </Button>
            <Button>새 이슈</Button>
            <Button
              variant="destructive"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              삭제
            </Button>
          </div>
        </div>

        {/* 통계 */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
            <CardContent className="p-4">
              <div className="text-sm text-[var(--text-muted)]">전체 이슈</div>
              <div className="text-2xl font-semibold text-[var(--text-strong)]">
                {stats.totalIssues}
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
            <CardContent className="p-4">
              <div className="text-sm text-[var(--text-muted)]">열린 이슈</div>
              <div className="text-2xl font-semibold text-[var(--text-strong)]">
                {stats.openIssues}
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
            <CardContent className="p-4">
              <div className="text-sm text-[var(--text-muted)]">진행 중</div>
              <div className="text-2xl font-semibold text-[var(--text-strong)]">
                {stats.inProgressIssues}
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
            <CardContent className="p-4">
              <div className="text-sm text-[var(--text-muted)]">완료</div>
              <div className="text-2xl font-semibold text-[var(--text-strong)]">
                {stats.completedIssues}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 메인 콘텐츠 */}
        <Tabs defaultValue="issues" className="w-full">
          <TabsList>
            <TabsTrigger value="issues">이슈</TabsTrigger>
            <TabsTrigger value="overview">개요</TabsTrigger>
            <TabsTrigger value="settings">설정</TabsTrigger>
          </TabsList>

          <TabsContent value="issues" className="mt-6">
            <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
              <CardHeader>
                <CardTitle>이슈 목록</CardTitle>
              </CardHeader>
              <CardContent>
                <EmptyState
                  title="이슈가 없습니다"
                  description="이 프로젝트의 이슈를 확인하려면 이슈 페이지로 이동하세요"
                  iconName="inbox"
                  action={{
                    label: "이슈 페이지로 이동",
                    onClick: () => (window.location.href = `/issues?projectId=${project.id}`),
                    variant: "primary",
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="overview" className="mt-6">
            <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
              <CardHeader>
                <CardTitle>프로젝트 개요</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-[var(--text-muted)] mb-2">설명</div>
                    <p className="text-[var(--text-strong)]">{project.description}</p>
                  </div>
                  <div>
                    <div className="text-sm text-[var(--text-muted)] mb-2">상태</div>
                    <div className="flex gap-2">
                      {project.isArchived && (
                        <Badge className="bg-gray-100 text-gray-700">아카이브됨</Badge>
                      )}
                      {project.isFavorite && (
                        <Badge className="bg-yellow-100 text-yellow-700">
                          <Icon name="star" size={12} className="mr-1 fill-current" />
                          즐겨찾기
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
              <CardHeader>
                <CardTitle>프로젝트 설정</CardTitle>
              </CardHeader>
              <CardContent>
                <EmptyState
                  title="설정 기능 준비 중"
                  description="프로젝트 설정 기능은 곧 추가될 예정입니다"
                  iconName="settings"
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* 삭제 확인 다이얼로그 */}
      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="프로젝트 삭제"
        description={`"${project.name}" 프로젝트를 정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`}
        confirmLabel="삭제"
        cancelLabel="취소"
        variant="destructive"
        isLoading={isDeleting}
        onConfirm={async () => {
          setIsDeleting(true);
          try {
            await deleteProject();
            addToast({
              title: "성공",
              message: "프로젝트가 삭제되었습니다",
              type: "success",
            });
            router.push("/projects");
          } catch (err) {
            addToast({
              title: "오류",
              message: err instanceof Error ? err.message : "프로젝트 삭제에 실패했습니다",
              type: "error",
            });
          } finally {
            setIsDeleting(false);
          }
        }}
      />
    </AppLayout>
  );
}
