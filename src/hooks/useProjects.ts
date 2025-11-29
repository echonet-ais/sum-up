"use client";

import { useState, useEffect, useCallback } from "react";
import { apiClient } from "@/lib/api/client";
import { validateProjectForm } from "@/lib/utils/validation";
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
      // TODO: 실제 API 엔드포인트로 교체
      const params = new URLSearchParams();
      if (teamId) params.append("teamId", teamId);
      if (search) params.append("search", search);
      if (showArchived) params.append("archived", "true");
      params.append("page", String(page));
      params.append("limit", String(limit));

      // const response = await apiClient.get<PaginatedResponse<Project>>(`/projects?${params}`);
      // setProjects(response.data);
      // setTotal(response.pagination.total);
      // setTotalPages(response.pagination.totalPages);
      // setCurrentPage(response.pagination.page);

      // 임시: Mock 데이터
      const mockProjects: Project[] = [];
      setProjects(mockProjects);
      setTotal(0);
      setTotalPages(0);
      setCurrentPage(1);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("프로젝트를 불러오는데 실패했습니다"));
    } finally {
      setIsLoading(false);
    }
  }, [teamId, search, showArchived, page, limit]);

  const createProject = useCallback(
    async (data: CreateProjectData): Promise<Project> => {
      // 폼 검증
      const validation = validateProjectForm(data);
      if (!validation.isValid) {
        throw new Error(Object.values(validation.errors)[0] || "입력값이 올바르지 않습니다");
      }

      try {
        // TODO: 실제 API 엔드포인트로 교체
        // const response = await apiClient.post<Project>("/projects", data);
        // await fetchProjects(); // 목록 새로고침
        // return response;

        // 임시: Mock 데이터
        const newProject: Project = {
          id: `project-${Date.now()}`,
          name: data.name,
          description: data.description,
          teamId: data.teamId,
          isArchived: false,
          isFavorite: data.isFavorite || false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        setProjects((prev) => [newProject, ...prev]);
        await fetchProjects(); // 목록 새로고침
        return newProject;
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

