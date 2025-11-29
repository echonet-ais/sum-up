"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@hua-labs/ui";
import { LoadingState, EmptyState } from "@/components/common";
import Link from "next/link";

interface Activity {
  id: string;
  type: string;
  userId: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  targetId: string;
  title: string;
  description: string;
  timestamp: string;
  createdAt: string;
}

export function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchActivities() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/dashboard/activities?limit=10");
        
        if (!response.ok) {
          throw new Error("활동 내역을 불러오는데 실패했습니다.");
        }
        
        const data = await response.json();
        setActivities(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "활동 내역을 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchActivities();
  }, []);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}일 전`;
    if (hours > 0) return `${hours}시간 전`;
    if (minutes > 0) return `${minutes}분 전`;
    return "방금 전";
  };

  const getActivityLink = (activity: Activity) => {
    if (activity.type.includes("ISSUE")) {
      return `/issues/${activity.targetId}`;
    }
    if (activity.type.includes("PROJECT")) {
      return `/projects/${activity.targetId}`;
    }
    if (activity.type.includes("TEAM") || activity.type.includes("MEMBER")) {
      return `/teams/${activity.targetId}`;
    }
    return null;
  };

  return (
    <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
      <CardHeader>
        <CardTitle>최근 활동</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <div className="text-sm text-[var(--color-error)]">{error}</div>
        ) : activities.length === 0 ? (
          <EmptyState 
            title="활동 내역이 없습니다"
            description="최근 활동 내역이 표시됩니다"
            iconName="activity"
          />
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => {
              const link = getActivityLink(activity);
              const content = (
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-[var(--surface-muted)] transition-colors">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--surface-muted)] flex items-center justify-center">
                    {activity.user.avatar ? (
                      <img
                        src={activity.user.avatar}
                        alt={activity.user.name}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <span className="text-xs font-medium text-[var(--text-muted)]">
                        {activity.user.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-[var(--text-strong)]">
                        {activity.user.name}
                      </span>
                      <span className="text-xs text-[var(--text-muted)]">
                        {formatTimeAgo(activity.timestamp || activity.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--text-strong)]">{activity.description || activity.title}</p>
                  </div>
                </div>
              );

              return link ? (
                <Link key={activity.id} href={link}>
                  {content}
                </Link>
              ) : (
                <div key={activity.id}>{content}</div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

