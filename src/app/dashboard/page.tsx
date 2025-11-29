"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { StatCard, DashboardGrid, ActivityFeed } from "@hua-labs/ui";
import { Card, CardHeader, CardTitle, CardContent } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { AppLayout } from "@/components/layout";
import { SectionErrorBoundary, LoadingState, ErrorState } from "@/components/common";
import { supabase } from "@/lib/supabase/client";
import { useAuthStore } from "@/store/auth-store";
import { useDashboard } from "@/hooks/useDashboard";
import { PieChart } from "@/components/charts/PieChart";
import Link from "next/link";

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser, setToken } = useAuthStore();
  const { stats, activities, isLoading, error, refetch } = useDashboard(10);

  // OAuth 콜백 처리
  useEffect(() => {
    const sessionToken = searchParams.get("session");
    const refreshToken = searchParams.get("refresh");

    if (sessionToken && refreshToken) {
      // 세션 설정
      supabase.auth.setSession({
        access_token: sessionToken,
        refresh_token: refreshToken,
      }).then(async ({ data, error }) => {
        if (error) {
          console.error("Failed to set session:", error);
          router.replace("/login?error=session_failed");
          return;
        }

        if (data.user && data.session) {
          // 사용자 정보 가져오기
          const { data: profile } = await supabase
            .from("users")
            .select("*")
            .eq("id", data.user.id)
            .single();

          // 스토어에 사용자 정보 저장
          setUser({
            id: data.user.id,
            email: data.user.email!,
            name: profile?.name || data.user.user_metadata?.name || "사용자",
            avatar: profile?.avatar || data.user.user_metadata?.avatar_url,
            role: profile?.role || "MEMBER",
          });
          setToken(data.session.access_token);

          // URL에서 토큰 제거 (리다이렉트)
          router.replace("/dashboard");
        }
      });
    }
  }, [searchParams, router, setUser, setToken]);

  return (
    <AppLayout
      title="대시보드"
      description="프로젝트와 이슈 현황을 한눈에 확인하세요"
      activeItem="dashboard"
    >
      <SectionErrorBoundary sectionName="대시보드">
        {isLoading ? (
          <LoadingState message="대시보드 데이터를 불러오는 중..." />
        ) : error ? (
          <ErrorState
            title="대시보드 데이터를 불러올 수 없습니다"
            message={error.message}
            onRetry={refetch}
          />
        ) : (
          <div className="flex flex-col gap-6">
            <DashboardGrid columns={4} gap="lg">
              <StatCard
                title="전체 프로젝트"
                value={stats?.totalProjects.toString() || "0"}
                icon={<Icon name="folder" size={24} />}
                className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm"
              />
              <StatCard
                title="전체 이슈"
                value={stats?.totalIssues.toString() || "0"}
                icon={<Icon name="alert-circle" size={24} />}
                className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm"
              />
              <StatCard
                title="진행 중 이슈"
                value={stats?.openIssues.toString() || "0"}
                icon={<Icon name="clock" size={24} />}
                className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm"
              />
              <StatCard
                title="완료된 이슈"
                value={stats?.completedIssues.toString() || "0"}
                icon={<Icon name="check-circle" size={24} />}
                className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm"
              />
            </DashboardGrid>

            {/* 통계 차트 */}
            {stats && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 상태별 이슈 분포 */}
                {stats.issuesByStatus && Object.keys(stats.issuesByStatus).length > 0 && (
                  <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
                    <CardHeader>
                      <CardTitle>상태별 이슈 분포</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <PieChart
                        data={Object.entries(stats.issuesByStatus).map(([status, count]) => ({
                          name: status === "TODO" ? "할 일" : 
                                status === "IN_PROGRESS" ? "진행 중" :
                                status === "IN_REVIEW" ? "검토 중" :
                                status === "DONE" ? "완료" : status,
                          value: count,
                        }))}
                        height={250}
                      />
                    </CardContent>
                  </Card>
                )}

                {/* 우선순위별 이슈 분포 */}
                {stats.issuesByPriority && Object.keys(stats.issuesByPriority).length > 0 && (
                  <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
                    <CardHeader>
                      <CardTitle>우선순위별 이슈 분포</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <PieChart
                        data={Object.entries(stats.issuesByPriority).map(([priority, count]) => ({
                          name: priority === "HIGH" ? "높음" :
                                priority === "MEDIUM" ? "보통" :
                                priority === "LOW" ? "낮음" : priority,
                          value: count,
                        }))}
                        height={250}
                      />
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-[var(--text-strong)] mb-4">
                    최근 활동
                  </h2>
                  {activities.length > 0 ? (
                    <ActivityFeed items={activities} />
                  ) : (
                    <div className="text-center py-8 text-[var(--text-muted)]">
                      최근 활동이 없습니다
                    </div>
                  )}
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-[var(--text-strong)] mb-4">
                    빠른 작업
                  </h2>
                  <div className="space-y-3">
                    <Link
                      href="/issues"
                      className="block w-full text-left px-4 py-3 rounded-md border border-[var(--border-subtle)] hover:bg-[var(--surface-muted)] transition-colors"
                    >
                      <div className="font-medium text-[var(--text-strong)]">새 이슈 생성</div>
                      <div className="text-sm text-[var(--text-muted)] mt-1">
                        프로젝트에 새로운 이슈를 추가하세요
                      </div>
                    </Link>
                    <Link
                      href="/projects"
                      className="block w-full text-left px-4 py-3 rounded-md border border-[var(--border-subtle)] hover:bg-[var(--surface-muted)] transition-colors"
                    >
                      <div className="font-medium text-[var(--text-strong)]">새 프로젝트 생성</div>
                      <div className="text-sm text-[var(--text-muted)] mt-1">
                        새로운 프로젝트를 시작하세요
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </SectionErrorBoundary>
    </AppLayout>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <AppLayout title="대시보드" activeItem="dashboard">
          <LoadingState message="대시보드를 불러오는 중..." />
        </AppLayout>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
