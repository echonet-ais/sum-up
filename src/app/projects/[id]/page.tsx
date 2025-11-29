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
import { EmptyState, ErrorState, LoadingState, ConfirmDialog, StatCard, FormDrawer, MetaInfoCard, SectionErrorBoundary } from "@/components/common";
import { PieChart } from "@/components/charts/PieChart";
import { LineChart } from "@/components/charts/LineChart";
import { useProject } from "@/hooks/useProject";
import { useDeleteDialog } from "@/hooks";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Project } from "@/types";

const ProjectForm = dynamic(() => import("@/components/project").then((mod) => ({ default: mod.ProjectForm })));
const ProjectSettings = dynamic(() => import("@/components/project").then((mod) => ({ default: mod.ProjectSettings })));

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

  // 프로젝트 통계 조회
  const [projectStats, setProjectStats] = React.useState<{
    totalIssues: number;
    openIssues: number;
    inProgressIssues: number;
    completedIssues: number;
    issuesByStatus: Record<string, number>;
    issuesByPriority: Record<string, number>;
    dailyTrend: Array<{ date: string; count: number }>;
  } | null>(null);
  const [isLoadingStats, setIsLoadingStats] = React.useState(true);

  React.useEffect(() => {
    async function fetchProjectStats() {
      if (!id) return;
      try {
        setIsLoadingStats(true);
        const response = await fetch(`/api/projects/${id}/stats`);
        if (response.ok) {
          const data = await response.json();
          setProjectStats(data);
        }
      } catch (err) {
        console.error("Error fetching project stats:", err);
      } finally {
        setIsLoadingStats(false);
      }
    }
    fetchProjectStats();
  }, [id]);

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
      <SectionErrorBoundary sectionName="프로젝트 상세">
        {project && (
        <>
          {/* 통계 */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <StatCard 
              label="전체 이슈" 
              value={isLoadingStats ? "..." : (projectStats?.totalIssues || 0)} 
            />
            <StatCard 
              label="열린 이슈" 
              value={isLoadingStats ? "..." : (projectStats?.openIssues || 0)} 
            />
            <StatCard 
              label="진행 중" 
              value={isLoadingStats ? "..." : (projectStats?.inProgressIssues || 0)} 
            />
            <StatCard 
              label="완료" 
              value={isLoadingStats ? "..." : (projectStats?.completedIssues || 0)} 
            />
          </div>

          {/* 통계 차트 */}
          {projectStats && !isLoadingStats && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 상태별 이슈 분포 */}
              {Object.keys(projectStats.issuesByStatus).length > 0 && (
                <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
                  <CardHeader>
                    <CardTitle>상태별 이슈 분포</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PieChart
                      data={Object.entries(projectStats.issuesByStatus).map(([status, count]) => ({
                        name: status === "TODO" ? "할 일" : 
                              status === "IN_PROGRESS" ? "진행 중" :
                              status === "IN_REVIEW" ? "검토 중" :
                              status === "DONE" ? "완료" : status,
                        value: count as number,
                      }))}
                      height={250}
                    />
                  </CardContent>
                </Card>
              )}

              {/* 우선순위별 이슈 분포 */}
              {Object.keys(projectStats.issuesByPriority).length > 0 && (
                <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
                  <CardHeader>
                    <CardTitle>우선순위별 이슈 분포</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PieChart
                      data={Object.entries(projectStats.issuesByPriority).map(([priority, count]) => ({
                        name: priority === "HIGH" ? "높음" :
                              priority === "MEDIUM" ? "보통" :
                              priority === "LOW" ? "낮음" : priority,
                        value: count as number,
                      }))}
                      height={250}
                    />
                  </CardContent>
                </Card>
              )}

              {/* 최근 7일 이슈 생성 추이 */}
              {projectStats.dailyTrend.length > 0 && (
                <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm lg:col-span-2">
                  <CardHeader>
                    <CardTitle>최근 7일 이슈 생성 추이</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <LineChart
                      data={projectStats.dailyTrend.map((item) => ({
                        name: new Date(item.date).toLocaleDateString("ko-KR", { month: "short", day: "numeric" }),
                        이슈: item.count,
                      }))}
                      dataKeys={["이슈"]}
                      height={250}
                    />
                  </CardContent>
                </Card>
              )}
            </div>
          )}

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
            <SectionErrorBoundary sectionName="프로젝트 설정">
              <ProjectSettings projectId={id} />
            </SectionErrorBoundary>
          </TabsContent>
        </Tabs>
        </>
        )}
      </SectionErrorBoundary>

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
