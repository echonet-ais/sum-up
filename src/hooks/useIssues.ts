"use client";

import { useState, useEffect, useCallback } from "react";
import { apiClient } from "@/lib/api/client";
import { useAuthStore } from "@/store/auth-store";
import { validateIssueForm, type IssueFormData } from "@/lib/utils/validation";
import type { Issue, PaginatedResponse, Subtask, IssueLabel } from "@/types";
import { useRealtimeIssues } from "./useRealtimeIssues";

export interface UseIssuesOptions {
  projectId?: string;
  status?: Issue["status"];
  priority?: Issue["priority"];
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: "created" | "updated" | "title";
  sortOrder?: "asc" | "desc";
}

export interface CreateIssueData {
  title: string;
  description?: string;
  status?: Issue["status"];
  priority: Issue["priority"];
  projectId: string;
  assigneeId?: string;
  labels?: string[];
  dueDate?: Date | string;
  subtasks?: Array<{ title: string }>;
}

export interface UseIssuesReturn {
  issues: Issue[];
  isLoading: boolean;
  error: Error | null;
  total: number;
  totalPages: number;
  currentPage: number;
  refetch: () => Promise<void>;
  createIssue: (data: CreateIssueData) => Promise<Issue>;
}

export function useIssues(options: UseIssuesOptions = {}): UseIssuesReturn {
  const {
    projectId,
    status,
    priority,
    search,
    page = 1,
    limit = 20,
    sortBy = "updated",
    sortOrder = "desc",
  } = options;

  const [issues, setIssues] = useState<Issue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(page);

  const fetchIssues = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: 실제 API 엔드포인트로 교체
      const params = new URLSearchParams();
      if (projectId) params.append("projectId", projectId);
      if (status) params.append("status", status);
      if (priority) params.append("priority", priority);
      if (search) params.append("search", search);
      params.append("page", String(page));
      params.append("limit", String(limit));
      params.append("sortBy", sortBy);
      params.append("sortOrder", sortOrder);

      const response = await apiClient.get<PaginatedResponse<Issue>>(
        `/api/issues?${params.toString()}`
      );
      setIssues(response.data);
      setTotal(response.pagination.total);
      setTotalPages(response.pagination.totalPages);
      setCurrentPage(response.pagination.page);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("이슈를 불러오는데 실패했습니다"));
    } finally {
      setIsLoading(false);
    }
  }, [projectId, status, priority, search, page, limit, sortBy, sortOrder]);

  const createIssue = useCallback(
    async (data: CreateIssueData): Promise<Issue> => {
      // 폼 검증
      const validation = validateIssueForm(data as IssueFormData);
      if (!validation.isValid) {
        throw new Error(Object.values(validation.errors)[0] || "입력값이 올바르지 않습니다");
      }

      try {
        const response = await apiClient.post<Issue>("/api/issues", data);
        await fetchIssues();
        return response;
      } catch (err) {
        throw err instanceof Error ? err : new Error("이슈를 생성하는데 실패했습니다");
      }
    },
    [fetchIssues]
  );

  useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);

  // 실시간 이슈 업데이트
  useRealtimeIssues({
    projectId,
    onIssueInsert: (newIssue) => {
      // 새 이슈 추가 (필터 조건에 맞는 경우만)
      const matchesFilter =
        (!projectId || newIssue.projectId === projectId) &&
        (!status || newIssue.status === status) &&
        (!priority || newIssue.priority === priority);
      
      if (matchesFilter) {
        setIssues((prev) => {
          // 중복 체크
          if (prev.some((i) => i.id === newIssue.id)) {
            return prev;
          }
          return [newIssue, ...prev];
        });
        // 전체 개수도 업데이트 (정확한 개수는 서버에서 다시 조회 필요)
        setTotal((prev) => prev + 1);
      }
    },
    onIssueUpdate: (updatedIssue) => {
      // 이슈 업데이트
      setIssues((prev) =>
        prev.map((issue) => (issue.id === updatedIssue.id ? { ...issue, ...updatedIssue } : issue))
      );
    },
    onIssueDelete: (issueId) => {
      // 이슈 삭제
      setIssues((prev) => prev.filter((issue) => issue.id !== issueId));
      setTotal((prev) => Math.max(0, prev - 1));
    },
  });

  return {
    issues,
    isLoading,
    error,
    total,
    totalPages,
    currentPage,
    refetch: fetchIssues,
    createIssue,
  };
}

