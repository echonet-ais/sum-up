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
      // TODO: 실제 API 엔드포인트로 교체
      // const response = await apiClient.get<Team>(`/teams/${teamId}`);
      // setTeam(response);

      // 임시: Mock 데이터
      setTeam(null);
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
        // TODO: 실제 API 엔드포인트로 교체
        // const response = await apiClient.put<Team>(`/teams/${teamId}`, updates);
        // setTeam(response);

        // 임시: 로컬 상태 업데이트
        setTeam({ ...team, ...updates, updatedAt: new Date().toISOString() });
      } catch (err) {
        throw err instanceof Error ? err : new Error("팀을 업데이트하는데 실패했습니다");
      }
    },
    [team, teamId]
  );

  const deleteTeam = useCallback(async () => {
    try {
      // TODO: 실제 API 엔드포인트로 교체
      // await apiClient.delete(`/teams/${teamId}`);
      setTeam(null);
    } catch (err) {
      throw err instanceof Error ? err : new Error("팀을 삭제하는데 실패했습니다");
    }
  }, [teamId]);

  const inviteMember = useCallback(
    async (email: string, role: TeamMember["role"]) => {
      if (!team) return;

      try {
        // TODO: 실제 API 엔드포인트로 교체
        // const response = await apiClient.post<TeamMember>(`/teams/${teamId}/members`, {
        //   email,
        //   role,
        // });
        // setTeam({
        //   ...team,
        //   members: [...team.members, response],
        // });

        // 임시: Mock 데이터
        const { user } = useAuthStore.getState();
        const newMember: TeamMember = {
          id: `member-${Date.now()}`,
          userId: `user-${Date.now()}`,
          teamId: team.id,
          role,
          user: {
            id: `user-${Date.now()}`,
            name: email.split("@")[0],
            email,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          joinedAt: new Date().toISOString(),
        };
        setTeam({
          ...team,
          members: [...team.members, newMember],
        });
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
        // TODO: 실제 API 엔드포인트로 교체
        // const response = await apiClient.put<TeamMember>(
        //   `/teams/${teamId}/members/${memberId}`,
        //   { role }
        // );
        // setTeam({
        //   ...team,
        //   members: team.members.map((m) => (m.id === memberId ? response : m)),
        // });

        // 임시: 로컬 상태 업데이트
        setTeam({
          ...team,
          members: team.members.map((m) =>
            m.id === memberId ? { ...m, role } : m
          ),
        });
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
        // TODO: 실제 API 엔드포인트로 교체
        // await apiClient.delete(`/teams/${teamId}/members/${memberId}`);
        // setTeam({
        //   ...team,
        //   members: team.members.filter((m) => m.id !== memberId),
        // });

        // 임시: 로컬 상태 업데이트
        setTeam({
          ...team,
          members: team.members.filter((m) => m.id !== memberId),
        });
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

