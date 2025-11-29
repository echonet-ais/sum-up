"use client";

import { StatCard } from "@/components/common";

interface DashboardStats {
  totalProjects: number;
  totalIssues: number;
  openIssues: number;
  completedIssues: number;
}

interface StatsCardsProps {
  stats: DashboardStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        label="전체 프로젝트"
        value={stats.totalProjects}
        icon="folder"
      />
      <StatCard
        label="전체 이슈"
        value={stats.totalIssues}
        icon="issue"
      />
      <StatCard
        label="진행 중 이슈"
        value={stats.openIssues}
        icon="alert-circle"
      />
      <StatCard
        label="완료된 이슈"
        value={stats.completedIssues}
        icon="check-circle"
      />
    </div>
  );
}

