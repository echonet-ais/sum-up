"use client";

import { StatCard, DashboardGrid, ActivityFeed } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { AppLayout } from "@/components/layout";

export default function Home() {
  // TODO: 실제 데이터로 교체
  const stats = {
    totalProjects: 12,
    totalIssues: 48,
    openIssues: 32,
    completedIssues: 16,
  };

  const activities = [
    {
      id: "1",
      type: "ISSUE_CREATED" as const,
      userId: "user1",
      user: { id: "user1", name: "홍길동", email: "hong@example.com" },
      targetId: "issue1",
      title: "새 이슈를 생성했습니다",
      description: "새 이슈를 생성했습니다",
      timestamp: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      type: "ISSUE_UPDATED" as const,
      userId: "user2",
      user: { id: "user2", name: "김철수", email: "kim@example.com" },
      targetId: "issue2",
      title: "이슈 상태를 업데이트했습니다",
      description: "이슈 상태를 업데이트했습니다",
      timestamp: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
  ];

  return (
    <AppLayout
      title="대시보드"
      description="프로젝트와 이슈 현황을 한눈에 확인하세요"
      activeItem="dashboard"
    >
      <div className="flex flex-col gap-6">
        <DashboardGrid columns={4} gap="lg">
          <StatCard
            title="전체 프로젝트"
            value={stats.totalProjects.toString()}
            icon={<Icon name="folder" size={24} />}
            className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm"
          />
          <StatCard
            title="전체 이슈"
            value={stats.totalIssues.toString()}
            icon={<Icon name="alert-circle" size={24} />}
            className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm"
          />
          <StatCard
            title="진행 중 이슈"
            value={stats.openIssues.toString()}
            icon={<Icon name="clock" size={24} />}
            className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm"
          />
          <StatCard
            title="완료된 이슈"
            value={stats.completedIssues.toString()}
            icon={<Icon name="check-circle" size={24} />}
            className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm"
          />
        </DashboardGrid>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm p-6">
              <h2 className="text-xl font-semibold text-[var(--text-strong)] mb-4">
                최근 활동
              </h2>
              <ActivityFeed items={activities} />
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm p-6">
              <h2 className="text-xl font-semibold text-[var(--text-strong)] mb-4">
                빠른 작업
              </h2>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 rounded-md border border-[var(--border-subtle)] hover:bg-[var(--surface-muted)] transition-colors">
                  <div className="font-medium text-[var(--text-strong)]">새 이슈 생성</div>
                  <div className="text-sm text-[var(--text-muted)] mt-1">
                    프로젝트에 새로운 이슈를 추가하세요
                  </div>
                </button>
                <button className="w-full text-left px-4 py-3 rounded-md border border-[var(--border-subtle)] hover:bg-[var(--surface-muted)] transition-colors">
                  <div className="font-medium text-[var(--text-strong)]">새 프로젝트 생성</div>
                  <div className="text-sm text-[var(--text-muted)] mt-1">
                    새로운 프로젝트를 시작하세요
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
