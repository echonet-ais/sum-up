/**
 * AI 기능 훅
 * AI 요약, 제안, 자동 분류, 중복 탐지, 댓글 요약 기능 제공
 */

import { useState } from "react";
import { apiClient } from "@/lib/api/client";

export interface AISummaryResponse {
  content: string;
  provider: string;
  model: string;
  cached?: boolean;
}

export interface AISuggestionResponse {
  content: string;
  provider: string;
  model: string;
  cached?: boolean;
}

export interface AILabelResponse {
  labels: Array<{ name: string; color: string }>;
  provider: string;
  model: string;
}

export interface AIDuplicateResponse {
  duplicates: Array<{ id: string; title: string; description?: string }>;
  provider: string;
  model: string;
}

export function useAI() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * 이슈 설명 요약
   */
  const generateSummary = async (
    issueId: string,
    description: string,
    userId: string
  ): Promise<AISummaryResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.post<AISummaryResponse>("/api/ai/summary", {
        issueId,
        description,
        userId,
      });
      return response;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to generate summary");
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 해결 전략 제안
   */
  const generateSuggestion = async (
    issueId: string,
    title: string,
    description: string,
    userId: string
  ): Promise<AISuggestionResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.post<AISuggestionResponse>("/api/ai/suggestion", {
        issueId,
        title,
        description,
        userId,
      });
      return response;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to generate suggestion");
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 라벨 자동 분류
   */
  const generateAutoLabel = async (
    title: string,
    description: string,
    availableLabels: Array<{ name: string; color: string }>,
    userId: string
  ): Promise<AILabelResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.post<AILabelResponse>("/api/ai/auto-label", {
        title,
        description,
        availableLabels,
        userId,
      });
      return response;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to generate auto-label");
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 중복 이슈 탐지
   */
  const detectDuplicates = async (
    title: string,
    description: string,
    existingIssues: Array<{ id: string; title: string; description?: string }>,
    userId: string
  ): Promise<AIDuplicateResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.post<AIDuplicateResponse>("/api/ai/duplicate-detection", {
        title,
        description,
        existingIssues,
        userId,
      });
      return response;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to detect duplicates");
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 댓글 요약
   */
  const generateCommentSummary = async (
    issueId: string,
    issueTitle: string,
    issueDescription: string,
    comments: Array<{ author: { name: string }; content: string; createdAt: string }>,
    userId: string
  ): Promise<AISummaryResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.post<AISummaryResponse>("/api/ai/comment-summary", {
        issueId,
        issueTitle,
        issueDescription,
        comments,
        userId,
      });
      return response;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to generate comment summary");
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    generateSummary,
    generateSuggestion,
    generateAutoLabel,
    detectDuplicates,
    generateCommentSummary,
  };
}

