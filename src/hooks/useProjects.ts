"use client";

import { useState, useEffect, useCallback } from "react";
import { apiClient } from "@/lib/api/client";
import { validateProjectForm, type ProjectFormData } from "@/lib/utils/validation";
import type { Project, PaginatedResponse } from "@/types";

export interface UseProjectsOptions {
  teamId?: string;
  search?: string;
  showArchived?: boolean;
  page?: number;
  limit?: number;
}

export interface CreateProjectData {
  name: string;
  description?: string;
  teamId: string;
  isFavorite?: boolean;
}

export interface UseProjectsReturn {
  projects: Project[];
  isLoading: boolean;
  error: Error | null;
  total: number;
  totalPages: number;
  currentPage: number;
  refetch: () => Promise<void>;
  createProject: (data: CreateProjectData) => Promise<Project>;
}

export function useProjects(options: UseProjectsOptions = {}): UseProjectsReturn {
  const { teamId, search, showArchived = false, page = 1, limit = 20 } = options;

  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(page);

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (teamId) params.append("teamId", teamId);
      if (search) params.append("search", search);
      if (showArchived) params.append("archived", "true");
      params.append("page", String(page));
      params.append("limit", String(limit));

      const response = await apiClient.get<PaginatedResponse<Project>>(
        `/api/projects?${params.toString()}`
      );
      setProjects(response.data);
      setTotal(response.pagination.total);
      setTotalPages(response.pagination.totalPages);
      setCurrentPage(response.pagination.page);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("프로젝트를 불러오는데 실패했습니다"));
    } finally {
      setIsLoading(false);
    }
  }, [teamId, search, showArchived, page, limit]);

  const createProject = useCallback(
    async (data: CreateProjectData): Promise<Project> => {
      // 폼 검증
      const validation = validateProjectForm(data as ProjectFormData);
      if (!validation.isValid) {
        throw new Error(Object.values(validation.errors)[0] || "입력값이 올바르지 않습니다");
      }

      try {
        const response = await apiClient.post<Project>("/api/projects", data);
        await fetchProjects(); // 목록 새로고침
        return response;
      } catch (err) {
        throw err instanceof Error ? err : new Error("프로젝트를 생성하는데 실패했습니다");
      }
    },
    [fetchProjects]
  );

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    isLoading,
    error,
    total,
    totalPages,
    currentPage,
    refetch: fetchProjects,
    createProject,
  };
}

