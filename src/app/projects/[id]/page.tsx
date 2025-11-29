"use client";

import * as React from "react";
import { use } from "react";
import dynamic from "next/dynamic";
import { DetailPageLayout } from "@/components/layout";
import { Card, CardHeader, CardTitle, CardContent } from "@hua-labs/ui";
import { Badge } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { Button } from "@hua-labs/ui";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@hua-labs/ui";
import { EmptyState, ErrorState, LoadingState, ConfirmDialog, StatCard, FormDrawer, MetaInfoCard } from "@/components/common";
import { useProject } from "@/hooks/useProject";
import { useDeleteDialog } from "@/hooks";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Project } from "@/types";

const ProjectForm = dynamic(() => import("@/components/project").then((mod) => ({ default: mod.ProjectForm })));

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { project, isLoading, error, deleteProject, refetch } = useProject(id);
  const router = useRouter();
  const [isEditFormOpen, setIsEditFormOpen] = React.useState(false);

  // 삭제 다이얼로그 훅
  const { isOpen: isDeleteDialogOpen, setIsOpen: setIsDeleteDialogOpen, isDeleting, handleConfirm } = useDeleteDialog(
    () => deleteProject(),
    {
      title: "프로젝트 삭제",
      description: project ? `"${project.name}" 프로젝트를 정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.` : "",
      redirectTo: "/projects",
    }
  );

  // 액션 버튼들
  const actions = (
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
  );

  // TODO: 실제 데이터로 교체
  const stats = {
    totalIssues: 24,
    openIssues: 12,
    inProgressIssues: 6,
    completedIssues: 6,
  };

  return (
    <DetailPageLayout
      title={project?.name || "프로젝트"}
      description={project?.description}
      activeItem="projects"
      isLoading={isLoading}
      error={error || (!project && !isLoading ? new Error("프로젝트를 찾을 수 없습니다") : null)}
      backHref="/projects"
      backLabel="프로젝트 목록으로"
      actions={actions}
    >
      {project && (
        <>
          {/* 통계 */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard label="전체 이슈" value={stats.totalIssues} />
          <StatCard label="열린 이슈" value={stats.openIssues} />
          <StatCard label="진행 중" value={stats.inProgressIssues} />
          <StatCard label="완료" value={stats.completedIssues} />
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
                  action={
                    project
                      ? {
                          label: "이슈 페이지로 이동",
                          onClick: () => {
                            window.location.href = `/issues?projectId=${project.id}`;
                          },
                          variant: "primary",
                        }
                      : undefined
                  }
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
                {project && (
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
                )}
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
        </>
      )}

      {/* 프로젝트 수정 Drawer */}
      <FormDrawer
        open={isEditFormOpen}
        onOpenChange={setIsEditFormOpen}
        title="프로젝트 수정"
      >
        <ProjectForm
          projectId={id}
          onSuccess={() => {
            setIsEditFormOpen(false);
            refetch();
          }}
          onCancel={() => setIsEditFormOpen(false)}
        />
      </FormDrawer>

        {/* 삭제 확인 다이얼로그 */}
        {project && (
          <ConfirmDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
            title="프로젝트 삭제"
            description={`"${project.name}" 프로젝트를 정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`}
            confirmLabel="삭제"
            cancelLabel="취소"
            variant="destructive"
            isLoading={isDeleting}
            onConfirm={handleConfirm}
          />
        )}
    </DetailPageLayout>
  );
}
