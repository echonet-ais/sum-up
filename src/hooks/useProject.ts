"use client";

import { useState, useEffect, useCallback } from "react";
import { apiClient } from "@/lib/api/client";
import type { Project } from "@/types";

export interface UseProjectReturn {
  project: Project | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  updateProject: (updates: Partial<Project>) => Promise<void>;
  deleteProject: () => Promise<void>;
  archiveProject: () => Promise<void>;
  unarchiveProject: () => Promise<void>;
  toggleFavorite: () => Promise<void>;
}

export function useProject(projectId: string): UseProjectReturn {
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProject = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.get<Project>(`/api/projects/${projectId}`);
      setProject(response);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("프로젝트를 불러오는데 실패했습니다"));
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  const updateProject = useCallback(
    async (updates: Partial<Project>) => {
      if (!project) return;

      try {
        const response = await apiClient.put<Project>(
          `/api/projects/${projectId}`,
          updates
        );
        setProject(response);
      } catch (err) {
        throw err instanceof Error ? err : new Error("프로젝트를 업데이트하는데 실패했습니다");
      }
    },
    [project, projectId]
  );

  const deleteProject = useCallback(async () => {
    try {
      await apiClient.delete(`/api/projects/${projectId}`);
      setProject(null);
    } catch (err) {
      throw err instanceof Error ? err : new Error("프로젝트를 삭제하는데 실패했습니다");
    }
  }, [projectId]);

  const archiveProject = useCallback(async () => {
    if (!project) return;
    await updateProject({ isArchived: true });
  }, [project, updateProject]);

  const unarchiveProject = useCallback(async () => {
    if (!project) return;
    await updateProject({ isArchived: false });
  }, [project, updateProject]);

  const toggleFavorite = useCallback(async () => {
    if (!project) return;
    await updateProject({ isFavorite: !project.isFavorite });
  }, [project, updateProject]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  return {
    project,
    isLoading,
    error,
    refetch: fetchProject,
    updateProject,
    deleteProject,
    archiveProject,
    unarchiveProject,
    toggleFavorite,
  };
}

