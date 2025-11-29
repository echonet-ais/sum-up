"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { LoadingState, EmptyState } from "@/components/common";
import type { TeamActivity } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

interface TeamActivityLogProps {
  teamId: string;
}

// 활동 타입 아이콘 매핑
const activityIconMap: Record<TeamActivity["type"], string> = {
  TEAM_CREATED: "plus",
  TEAM_UPDATED: "edit",
  TEAM_DELETED: "trash",
  MEMBER_ADDED: "user-plus",
  MEMBER_REMOVED: "user-minus",
  MEMBER_ROLE_CHANGED: "user-cog",
  PROJECT_CREATED: "folder-plus",
  PROJECT_DELETED: "folder-minus",
};

export function TeamActivityLog({ teamId }: TeamActivityLogProps) {
  const [activities, setActivities] = useState<TeamActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchActivities() {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/teams/${teamId}/activities?limit=50`);
        
        if (!response.ok) {
          throw new Error("활동 로그를 불러오는데 실패했습니다.");
        }
        
        const data = await response.json();
        setActivities(data.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "활동 로그를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchActivities();
  }, [teamId]);

  if (isLoading) {
    return (
      <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
        <CardHeader>
          <CardTitle>활동 로그</CardTitle>
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
          <CardTitle>활동 로그</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-[var(--color-error)]">{error}</div>
        </CardContent>
      </Card>
    );
  }

  if (activities.length === 0) {
    return (
      <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
        <CardHeader>
          <CardTitle>활동 로그</CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState title="활동 로그가 없습니다." description="팀 활동 내역이 없습니다." iconName="activity" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
      <CardHeader>
        <CardTitle>활동 로그</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex gap-3 pb-4 border-b border-[var(--border-subtle)] last:border-0 last:pb-0">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-[var(--brand-primary)] flex items-center justify-center text-white">
                  <Icon name={activityIconMap[activity.type] || "activity"} size={20} />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-[var(--text-strong)]">
                    {activity.user.name}
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">
                    {formatDistanceToNow(new Date(activity.createdAt), {
                      addSuffix: true,
                      locale: ko,
                    })}
                  </span>
                </div>
                <p className="text-sm text-[var(--text-muted)]">
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

