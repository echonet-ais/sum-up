"use client";

import { useState, useEffect, useCallback } from "react";
import { apiClient } from "@/lib/api/client";
import { useAuthStore } from "@/store/auth-store";
import type { Issue, Subtask, User, IssueAttachment, Comment } from "@/types";
import { useRealtimeComments } from "./useRealtimeComments";

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
  uploadAttachment: (file: File) => Promise<void>;
  deleteAttachment: (attachmentId: string) => Promise<void>;
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
        const response = await apiClient.post<Subtask>(`/api/issues/${issueId}/subtasks`, { title });
        setIssue({ ...issue, subtasks: [...(issue.subtasks || []), response] });
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
        const response = await apiClient.put<Subtask>(`/api/issues/${issueId}/subtasks/${subtaskId}`, updates);
        setIssue({
          ...issue,
          subtasks: issue.subtasks?.map((st) => (st.id === subtaskId ? response : st)) || [],
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
        await apiClient.delete(`/api/issues/${issueId}/subtasks/${subtaskId}`);
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
        // 각 서브태스크의 순서를 업데이트
        const updatePromises = subtaskIds.map((subtaskId, index) =>
          apiClient.put(`/api/issues/${issueId}/subtasks/${subtaskId}`, { order: index + 1 })
        );

        await Promise.all(updatePromises);

        // 로컬 상태 업데이트
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
        const response = await apiClient.post<Comment>(`/api/issues/${issueId}/comments`, { content });
        setIssue({ ...issue, comments: [...(issue.comments || []), response] });
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
        const response = await apiClient.put<Comment>(`/api/issues/${issueId}/comments/${commentId}`, { content });
        setIssue({
          ...issue,
          comments: issue.comments?.map((c) => (c.id === commentId ? response : c)) || [],
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
        await apiClient.delete(`/api/issues/${issueId}/comments/${commentId}`);
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

  const uploadAttachment = useCallback(
    async (file: File) => {
      if (!issue) return;

      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(`/api/issues/${issueId}/attachments`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "파일 업로드에 실패했습니다");
        }

        const newAttachment: IssueAttachment = await response.json();
        setIssue({
          ...issue,
          attachments: [...(issue.attachments || []), newAttachment],
        });
      } catch (err) {
        throw err instanceof Error ? err : new Error("파일을 업로드하는데 실패했습니다");
      }
    },
    [issue, issueId]
  );

  const deleteAttachment = useCallback(
    async (attachmentId: string) => {
      if (!issue) return;

      try {
        await apiClient.delete(`/api/issues/${issueId}/attachments/${attachmentId}`);
        setIssue({
          ...issue,
          attachments: issue.attachments?.filter((a) => a.id !== attachmentId) || [],
        });
      } catch (err) {
        throw err instanceof Error ? err : new Error("파일을 삭제하는데 실패했습니다");
      }
    },
    [issue, issueId]
  );

  useEffect(() => {
    fetchIssue();
  }, [fetchIssue]);

  // 실시간 댓글 업데이트
  useRealtimeComments({
    issueId,
    onCommentInsert: (newComment) => {
      setIssue((prev) => {
        if (!prev) return prev;
        // 중복 체크 (이미 있는 댓글은 제외)
        const existingCommentIds = (prev.comments || []).map((c) => c.id);
        if (existingCommentIds.includes(newComment.id)) {
          return prev;
        }
        return {
          ...prev,
          comments: [...(prev.comments || []), newComment],
        };
      });
    },
    onCommentUpdate: (updatedComment) => {
      setIssue((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          comments: (prev.comments || []).map((c) =>
            c.id === updatedComment.id ? updatedComment : c
          ),
        };
      });
    },
    onCommentDelete: (commentId) => {
      setIssue((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          comments: (prev.comments || []).filter((c) => c.id !== commentId),
        };
      });
    },
  });

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
    uploadAttachment,
    deleteAttachment,
  };
}

