"use client";

import { useState, useEffect, useCallback } from "react";
import { apiClient } from "@/lib/api/client";
import { useAuthStore } from "@/store/auth-store";
import type { Team, TeamMember, User } from "@/types";

export interface UseTeamReturn {
  team: Team | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  updateTeam: (updates: Partial<Team>) => Promise<void>;
  deleteTeam: () => Promise<void>;
  inviteMember: (email: string, role: TeamMember["role"]) => Promise<void>;
  updateMemberRole: (memberId: string, role: TeamMember["role"]) => Promise<void>;
  removeMember: (memberId: string) => Promise<void>;
}

export function useTeam(teamId: string): UseTeamReturn {
  const [team, setTeam] = useState<Team | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTeam = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.get<Team>(`/api/teams/${teamId}`);
      setTeam(response);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("팀을 불러오는데 실패했습니다"));
    } finally {
      setIsLoading(false);
    }
  }, [teamId]);

  const updateTeam = useCallback(
    async (updates: Partial<Team>) => {
      if (!team) return;

      try {
        const response = await apiClient.put<Team>(`/api/teams/${teamId}`, updates);
        setTeam(response);
      } catch (err) {
        throw err instanceof Error ? err : new Error("팀을 업데이트하는데 실패했습니다");
      }
    },
    [team, teamId]
  );

  const deleteTeam = useCallback(async () => {
    try {
      await apiClient.delete(`/api/teams/${teamId}`);
      setTeam(null);
    } catch (err) {
      throw err instanceof Error ? err : new Error("팀을 삭제하는데 실패했습니다");
    }
  }, [teamId]);

  const inviteMember = useCallback(
    async (email: string, role: TeamMember["role"]) => {
      if (!team) return;

      try {
        await apiClient.post<TeamMember>(`/api/teams/${teamId}/members`, {
          email,
          role,
        });
        await fetchTeam();
      } catch (err) {
        throw err instanceof Error ? err : new Error("멤버를 초대하는데 실패했습니다");
      }
    },
    [team, teamId]
  );

  const updateMemberRole = useCallback(
    async (memberId: string, role: TeamMember["role"]) => {
      if (!team) return;

      try {
        await apiClient.put<TeamMember>(
          `/api/teams/${teamId}/members/${memberId}`,
          { role }
        );
        await fetchTeam();
      } catch (err) {
        throw err instanceof Error ? err : new Error("멤버 역할을 변경하는데 실패했습니다");
      }
    },
    [team, teamId]
  );

  const removeMember = useCallback(
    async (memberId: string) => {
      if (!team) return;

      try {
        await apiClient.delete(`/api/teams/${teamId}/members/${memberId}`);
        await fetchTeam();
      } catch (err) {
        throw err instanceof Error ? err : new Error("멤버를 제거하는데 실패했습니다");
      }
    },
    [team, teamId]
  );

  useEffect(() => {
    fetchTeam();
  }, [fetchTeam]);

  return {
    team,
    isLoading,
    error,
    refetch: fetchTeam,
    updateTeam,
    deleteTeam,
    inviteMember,
    updateMemberRole,
    removeMember,
  };
}

