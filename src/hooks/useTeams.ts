"use client";

import { useState, useEffect, useCallback } from "react";
import { apiClient } from "@/lib/api/client";
import type { Team, PaginatedResponse } from "@/types";

export interface UseTeamsOptions {
  search?: string;
  page?: number;
  limit?: number;
}

export interface CreateTeamData {
  name: string;
  description?: string;
  avatar?: string;
}

export interface UseTeamsReturn {
  teams: Team[];
  isLoading: boolean;
  error: Error | null;
  total: number;
  totalPages: number;
  currentPage: number;
  refetch: () => Promise<void>;
  createTeam: (data: CreateTeamData) => Promise<Team>;
}

export function useTeams(options: UseTeamsOptions = {}): UseTeamsReturn {
  const { search, page = 1, limit = 20 } = options;

  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(page);

  const fetchTeams = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: 실제 API 엔드포인트로 교체
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      params.append("page", String(page));
      params.append("limit", String(limit));

      // const response = await apiClient.get<PaginatedResponse<Team>>(`/teams?${params}`);
      // setTeams(response.data);
      // setTotal(response.pagination.total);
      // setTotalPages(response.pagination.totalPages);
      // setCurrentPage(response.pagination.page);

      // 임시: Mock 데이터
      const mockTeams: Team[] = [];
      setTeams(mockTeams);
      setTotal(0);
      setTotalPages(0);
      setCurrentPage(1);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("팀을 불러오는데 실패했습니다"));
    } finally {
      setIsLoading(false);
    }
  }, [search, page, limit]);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  const createTeam = useCallback(
    async (data: CreateTeamData): Promise<Team> => {
      try {
        // TODO: 실제 API 엔드포인트로 교체
        // const response = await apiClient.post<Team>("/teams", data);
        // await fetchTeams(); // 목록 새로고침
        // return response;

        // 임시: Mock 데이터
        const newTeam: Team = {
          id: `team-${Date.now()}`,
          name: data.name,
          description: data.description,
          avatar: data.avatar,
          members: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setTeams((prev) => [...prev, newTeam]);
        await fetchTeams(); // 목록 새로고침
        return newTeam;
      } catch (err) {
        throw err instanceof Error ? err : new Error("팀 생성에 실패했습니다");
      }
    },
    [fetchTeams]
  );

  return {
    teams,
    isLoading,
    error,
    total,
    totalPages,
    currentPage,
    refetch: fetchTeams,
    createTeam,
  };
}

