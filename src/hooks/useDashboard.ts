"use client";

import { useState, useEffect, useCallback } from "react";
import { apiClient } from "@/lib/api/client";

export interface DashboardStats {
  totalProjects: number;
  totalIssues: number;
  openIssues: number;
  completedIssues: number;
}

export interface ActivityItem {
  id: string;
  type: "ISSUE_CREATED" | "ISSUE_UPDATED" | "ISSUE_COMMENTED" | "PROJECT_CREATED" | "PROJECT_UPDATED";
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

export interface UseDashboardReturn {
  stats: DashboardStats | null;
  activities: ActivityItem[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useDashboard(activitiesLimit: number = 10): UseDashboardReturn {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDashboard = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // 통계와 활동을 병렬로 조회
      const [statsResponse, activitiesResponse] = await Promise.all([
        apiClient.get<DashboardStats>("/api/dashboard/stats"),
        apiClient.get<ActivityItem[]>(`/api/dashboard/activities?limit=${activitiesLimit}`),
      ]);

      setStats(statsResponse);
      setActivities(activitiesResponse);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("대시보드 데이터를 불러오는데 실패했습니다"));
    } finally {
      setIsLoading(false);
    }
  }, [activitiesLimit]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    stats,
    activities,
    isLoading,
    error,
    refetch: fetchDashboard,
  };
}

