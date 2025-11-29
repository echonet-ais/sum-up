"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@hua-labs/ui";
import { LoadingState, EmptyState } from "@/components/common";
import { StatCard } from "@/components/common";
import type { IssueStatus, IssuePriority } from "@/types";

interface TeamStatsData {
  projects: {
    total: number;
    active: number;
    archived: number;
  };
  issues: {
    total: number;
    byStatus: Record<string, number>;
    byPriority: Record<string, number>;
  };
  members: {
    total: number;
    byRole: Record<string, number>;
  };
  activities: {
    recent7Days: number;
  };
}

interface TeamStatsProps {
  teamId: string;
}

const statusNameMap: Record<IssueStatus, string> = {
  TODO: "할 일",
  IN_PROGRESS: "진행 중",
  IN_REVIEW: "검토 중",
  DONE: "완료",
};

const priorityNameMap: Record<IssuePriority, string> = {
  HIGH: "높음",
  MEDIUM: "보통",
  LOW: "낮음",
};

export function TeamStats({ teamId }: TeamStatsProps) {
  const [stats, setStats] = useState<TeamStatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/teams/${teamId}/stats`);
        
        if (!response.ok) {
          throw new Error("통계를 불러오는데 실패했습니다.");
        }
        
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "통계를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, [teamId]);

  if (isLoading) {
    return (
      <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
        <CardHeader>
          <CardTitle>팀 통계</CardTitle>
        </CardHeader>
        <CardContent>
          <LoadingState />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
        <CardHeader>
          <CardTitle>팀 통계</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-[var(--color-error)]">{error}</div>
        </CardContent>
      </Card>
    );
  }

  if (!stats) {
    return (
      <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
        <CardHeader>
          <CardTitle>팀 통계</CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState title="통계 데이터가 없습니다." description="팀 통계 정보가 없습니다." iconName="bar-chart" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
      <CardHeader>
        <CardTitle>팀 통계</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* 주요 통계 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              label="프로젝트"
              value={stats.projects.total}
              icon="folder"
            />
            <StatCard
              label="이슈"
              value={stats.issues.total}
              icon="issue"
            />
            <StatCard
              label="활성 프로젝트"
              value={stats.projects.active}
              icon="folder-open"
            />
            <StatCard
              label="멤버"
              value={stats.members.total}
              icon="users"
            />
          </div>

          {/* 상태별 이슈 통계 */}
          <div>
            <h3 className="text-sm font-medium text-[var(--text-strong)] mb-3">
              상태별 이슈
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(stats.issues.byStatus).map(([status, count]) => (
                <div
                  key={status}
                  className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] p-3"
                >
                  <div className="text-xs text-[var(--text-muted)] mb-1">
                    {statusNameMap[status as IssueStatus]}
                  </div>
                  <div className="text-lg font-semibold text-[var(--text-strong)]">
                    {count}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 우선순위별 이슈 통계 */}
          <div>
            <h3 className="text-sm font-medium text-[var(--text-strong)] mb-3">
              우선순위별 이슈
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(stats.issues.byPriority).map(([priority, count]) => (
                <div
                  key={priority}
                  className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] p-3"
                >
                  <div className="text-xs text-[var(--text-muted)] mb-1">
                    {priorityNameMap[priority as IssuePriority]}
                  </div>
                  <div className="text-lg font-semibold text-[var(--text-strong)]">
                    {count}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 최근 활동 */}
          <div>
            <h3 className="text-sm font-medium text-[var(--text-strong)] mb-3">
              최근 활동 (7일)
            </h3>
            <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] p-3">
              <div className="text-lg font-semibold text-[var(--text-strong)]">
                {stats.activities.recent7Days}건
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

