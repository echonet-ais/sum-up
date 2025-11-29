"use client";

import { useState, useEffect, useCallback } from "react";
import { apiClient } from "@/lib/api/client";
import { useAuthStore } from "@/store/auth-store";
import type { Issue, Subtask, User } from "@/types";

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

export interface UseIssueReturn {
  issue: Issue | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  createIssue: (data: CreateIssueData) => Promise<Issue>;
  updateIssue: (updates: Partial<Issue>) => Promise<void>;
  deleteIssue: () => Promise<void>;
  changeStatus: (newStatus: Issue["status"]) => Promise<void>;
  addSubtask: (title: string) => Promise<void>;
  updateSubtask: (subtaskId: string, updates: Partial<{ title: string; completed: boolean; order: number }>) => Promise<void>;
  deleteSubtask: (subtaskId: string) => Promise<void>;
  toggleSubtask: (subtaskId: string) => Promise<void>;
  reorderSubtasks: (subtaskIds: string[]) => Promise<void>;
  addComment: (content: string) => Promise<void>;
  updateComment: (commentId: string, content: string) => Promise<void>;
  deleteComment: (commentId: string) => Promise<void>;
}

export function useIssue(issueId: string): UseIssueReturn {
  const [issue, setIssue] = useState<Issue | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchIssue = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.get<Issue>(`/api/issues/${issueId}`);
      setIssue(response);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("이슈를 불러오는데 실패했습니다"));
    } finally {
      setIsLoading(false);
    }
  }, [issueId]);

  const updateIssue = useCallback(
    async (updates: Partial<Issue>) => {
      if (!issue) return;

      try {
        const response = await apiClient.put<Issue>(`/api/issues/${issueId}`, updates);
        setIssue(response);
      } catch (err) {
        throw err instanceof Error ? err : new Error("이슈를 업데이트하는데 실패했습니다");
      }
    },
    [issue, issueId]
  );

  const deleteIssue = useCallback(async () => {
    try {
      await apiClient.delete(`/api/issues/${issueId}`);
      setIssue(null);
    } catch (err) {
      throw err instanceof Error ? err : new Error("이슈를 삭제하는데 실패했습니다");
    }
  }, [issueId]);

  const changeStatus = useCallback(
    async (newStatus: Issue["status"]) => {
      if (!issue) return;

      try {
        const response = await apiClient.put<Issue>(`/api/issues/${issueId}`, {
          status: newStatus,
        });
        setIssue(response);
      } catch (err) {
        throw err instanceof Error ? err : new Error("이슈 상태를 변경하는데 실패했습니다");
      }
    },
    [issue, issueId]
  );

  const addSubtask = useCallback(
    async (title: string) => {
      if (!issue) return;

      try {
        // TODO: 실제 API 엔드포인트로 교체
        // const response = await apiClient.post<Subtask>(`/issues/${issueId}/subtasks`, { title });
        // setIssue({ ...issue, subtasks: [...(issue.subtasks || []), response] });

        // 임시: Mock 데이터
        const newSubtask: Subtask = {
          id: `subtask-${Date.now()}`,
          title,
          completed: false,
          issueId: issue.id,
          order: (issue.subtasks?.length || 0) + 1,
        };
        setIssue({
          ...issue,
          subtasks: [...(issue.subtasks || []), newSubtask],
        });
      } catch (err) {
        throw err instanceof Error ? err : new Error("서브태스크를 추가하는데 실패했습니다");
      }
    },
    [issue, issueId]
  );

  const updateSubtask = useCallback(
    async (subtaskId: string, updates: Partial<{ title: string; completed: boolean; order: number }>) => {
      if (!issue) return;

      try {
        // TODO: 실제 API 엔드포인트로 교체
        // const response = await apiClient.put<Subtask>(`/issues/${issueId}/subtasks/${subtaskId}`, updates);
        // setIssue({
        //   ...issue,
        //   subtasks: issue.subtasks?.map((st) => (st.id === subtaskId ? response : st)) || [],
        // });

        // 임시: 로컬 상태 업데이트
        setIssue({
          ...issue,
          subtasks: issue.subtasks?.map((st) =>
            st.id === subtaskId ? { ...st, ...updates } : st
          ) || [],
        });
      } catch (err) {
        throw err instanceof Error ? err : new Error("서브태스크를 업데이트하는데 실패했습니다");
      }
    },
    [issue, issueId]
  );

  const deleteSubtask = useCallback(
    async (subtaskId: string) => {
      if (!issue) return;

      try {
        // TODO: 실제 API 엔드포인트로 교체
        // await apiClient.delete(`/issues/${issueId}/subtasks/${subtaskId}`);
        // setIssue({
        //   ...issue,
        //   subtasks: issue.subtasks?.filter((st) => st.id !== subtaskId) || [],
        // });

        // 임시: 로컬 상태 업데이트
        setIssue({
          ...issue,
          subtasks: issue.subtasks?.filter((st) => st.id !== subtaskId) || [],
        });
      } catch (err) {
        throw err instanceof Error ? err : new Error("서브태스크를 삭제하는데 실패했습니다");
      }
    },
    [issue, issueId]
  );

  const toggleSubtask = useCallback(
    async (subtaskId: string) => {
      if (!issue) return;
      const subtask = issue.subtasks?.find((st) => st.id === subtaskId);
      if (!subtask) return;
      await updateSubtask(subtaskId, { completed: !subtask.completed });
    },
    [issue, updateSubtask]
  );

  const reorderSubtasks = useCallback(
    async (subtaskIds: string[]) => {
      if (!issue) return;

      try {
        // TODO: 실제 API 엔드포인트로 교체
        // await apiClient.put(`/issues/${issueId}/subtasks/reorder`, { order: subtaskIds });

        // 임시: 로컬 상태 업데이트
        const subtasksMap = new Map(issue.subtasks?.map((st) => [st.id, st]) || []);
        const reorderedSubtasks = subtaskIds
          .map((id, index) => {
            const subtask = subtasksMap.get(id);
            return subtask ? { ...subtask, order: index + 1 } : null;
          })
          .filter((st): st is Subtask => st !== null);

        setIssue({
          ...issue,
          subtasks: reorderedSubtasks,
        });
      } catch (err) {
        throw err instanceof Error ? err : new Error("서브태스크 순서를 변경하는데 실패했습니다");
      }
    },
    [issue, issueId]
  );

  const addComment = useCallback(
    async (content: string) => {
      if (!issue) return;

      try {
        // TODO: 실제 API 엔드포인트로 교체
        // const response = await apiClient.post<Comment>(`/issues/${issueId}/comments`, { content });
        // setIssue({ ...issue, comments: [...(issue.comments || []), response] });

        // 임시: Mock 데이터
        const newComment = {
          id: `comment-${Date.now()}`,
          content,
          issueId: issue.id,
          authorId: "current-user",
          author: {
            id: "current-user",
            name: "현재 사용자",
            email: "user@example.com",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setIssue({
          ...issue,
          comments: [...(issue.comments || []), newComment],
        });
      } catch (err) {
        throw err instanceof Error ? err : new Error("댓글을 추가하는데 실패했습니다");
      }
    },
    [issue, issueId]
  );

  const updateComment = useCallback(
    async (commentId: string, content: string) => {
      if (!issue) return;

      try {
        // TODO: 실제 API 엔드포인트로 교체
        // const response = await apiClient.put<Comment>(`/issues/${issueId}/comments/${commentId}`, { content });
        // setIssue({
        //   ...issue,
        //   comments: issue.comments?.map((c) => (c.id === commentId ? response : c)) || [],
        // });

        // 임시: 로컬 상태 업데이트
        setIssue({
          ...issue,
          comments: issue.comments?.map((c) =>
            c.id === commentId ? { ...c, content, updatedAt: new Date().toISOString() } : c
          ) || [],
        });
      } catch (err) {
        throw err instanceof Error ? err : new Error("댓글을 업데이트하는데 실패했습니다");
      }
    },
    [issue, issueId]
  );

  const deleteComment = useCallback(
    async (commentId: string) => {
      if (!issue) return;

      try {
        // TODO: 실제 API 엔드포인트로 교체
        // await apiClient.delete(`/issues/${issueId}/comments/${commentId}`);
        // setIssue({
        //   ...issue,
        //   comments: issue.comments?.filter((c) => c.id !== commentId) || [],
        // });

        // 임시: 로컬 상태 업데이트
        setIssue({
          ...issue,
          comments: issue.comments?.filter((c) => c.id !== commentId) || [],
        });
      } catch (err) {
        throw err instanceof Error ? err : new Error("댓글을 삭제하는데 실패했습니다");
      }
    },
    [issue, issueId]
  );

  useEffect(() => {
    fetchIssue();
  }, [fetchIssue]);

  return {
    issue,
    isLoading,
    error,
    refetch: fetchIssue,
    createIssue: async () => {
      throw new Error("createIssue는 useIssues 훅에서 사용하세요");
    },
    updateIssue,
    deleteIssue,
    changeStatus,
    addSubtask,
    updateSubtask,
    deleteSubtask,
    toggleSubtask,
    reorderSubtasks,
    addComment,
    updateComment,
    deleteComment,
  };
}

