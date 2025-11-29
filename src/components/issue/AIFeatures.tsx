"use client";

import { useState } from "react";
import { Button } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { Card, CardHeader, CardTitle, CardContent } from "@hua-labs/ui";
import { useAI } from "@/hooks/useAI";
import { useAuthStore } from "@/store/auth-store";
import type { Issue, Comment } from "@/types";
import { Markdown } from "@/components/common";

interface AIFeaturesProps {
  issue: Issue;
  comments?: Comment[];
}

export function AIFeatures({ issue, comments = [] }: AIFeaturesProps) {
  const { user } = useAuthStore();
  const { generateSummary, generateSuggestion, generateCommentSummary, isLoading, error } = useAI();
  
  const [summary, setSummary] = useState<string | null>(null);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [commentSummary, setCommentSummary] = useState<string | null>(null);
  const [loadingType, setLoadingType] = useState<"summary" | "suggestion" | "comment" | null>(null);

  const handleGenerateSummary = async () => {
    if (!issue.description || issue.description.length <= 10) {
      alert("설명이 10자 이하여서 AI 요약을 생성할 수 없습니다.");
      return;
    }

    if (!user?.id) {
      alert("로그인이 필요합니다.");
      return;
    }

    setLoadingType("summary");
    try {
      const result = await generateSummary(issue.id, issue.description, user.id);
      setSummary(result.content);
    } catch (err) {
      console.error("Failed to generate summary:", err);
      alert(err instanceof Error ? err.message : "요약 생성에 실패했습니다.");
    } finally {
      setLoadingType(null);
    }
  };

  const handleGenerateSuggestion = async () => {
    if (!issue.description || issue.description.length <= 10) {
      alert("설명이 10자 이하여서 AI 제안을 생성할 수 없습니다.");
      return;
    }

    if (!user?.id) {
      alert("로그인이 필요합니다.");
      return;
    }

    setLoadingType("suggestion");
    try {
      const result = await generateSuggestion(issue.id, issue.title, issue.description, user.id);
      setSuggestion(result.content);
    } catch (err) {
      console.error("Failed to generate suggestion:", err);
      alert(err instanceof Error ? err.message : "제안 생성에 실패했습니다.");
    } finally {
      setLoadingType(null);
    }
  };

  const handleGenerateCommentSummary = async () => {
    if (comments.length < 5) {
      alert("댓글이 5개 이상일 때만 요약할 수 있습니다.");
      return;
    }

    if (!user?.id) {
      alert("로그인이 필요합니다.");
      return;
    }

    setLoadingType("comment");
    try {
      const result = await generateCommentSummary(
        issue.id,
        issue.title,
        issue.description || "",
        comments.map((c) => ({
          author: { name: c.author?.name || "Unknown" },
          content: c.content,
          createdAt: typeof c.createdAt === "string" ? c.createdAt : c.createdAt.toISOString(),
        })),
        user.id
      );
      setCommentSummary(result.content);
    } catch (err) {
      console.error("Failed to generate comment summary:", err);
      alert(err instanceof Error ? err.message : "댓글 요약 생성에 실패했습니다.");
    } finally {
      setLoadingType(null);
    }
  };

  const canGenerateSummary = issue.description && issue.description.length > 10;
  const canGenerateCommentSummary = comments.length >= 5;

  return (
    <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="sparkles" size={20} />
          AI 기능
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* AI 요약 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[var(--text-strong)]">설명 요약</span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleGenerateSummary}
              disabled={!canGenerateSummary || isLoading}
            >
              {loadingType === "summary" ? (
                <>
                  <Icon name="loader" size={16} className="animate-spin mr-1" />
                  생성 중...
                </>
              ) : (
                <>
                  <Icon name="sparkles" size={16} className="mr-1" />
                  요약 생성
                </>
              )}
            </Button>
          </div>
          {summary && (
            <div className="p-3 rounded-md bg-[var(--surface-subtle)] border border-[var(--border-subtle)]">
              <Markdown content={summary} />
            </div>
          )}
          {!canGenerateSummary && (
            <p className="text-xs text-[var(--text-muted)]">
              설명이 10자 이상이어야 요약을 생성할 수 있습니다.
            </p>
          )}
        </div>

        {/* AI 제안 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[var(--text-strong)]">해결 전략 제안</span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleGenerateSuggestion}
              disabled={!canGenerateSummary || isLoading}
            >
              {loadingType === "suggestion" ? (
                <>
                  <Icon name="loader" size={16} className="animate-spin mr-1" />
                  생성 중...
                </>
              ) : (
                <>
                  <Icon name="lightbulb" size={16} className="mr-1" />
                  제안 생성
                </>
              )}
            </Button>
          </div>
          {suggestion && (
            <div className="p-3 rounded-md bg-[var(--surface-subtle)] border border-[var(--border-subtle)]">
              <Markdown content={suggestion} />
            </div>
          )}
        </div>

        {/* 댓글 요약 */}
        {comments.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[var(--text-strong)]">
                댓글 요약 ({comments.length}개)
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleGenerateCommentSummary}
                disabled={!canGenerateCommentSummary || isLoading}
              >
                {loadingType === "comment" ? (
                  <>
                    <Icon name="loader" size={16} className="animate-spin mr-1" />
                    생성 중...
                  </>
                ) : (
                  <>
                    <Icon name="message-square" size={16} className="mr-1" />
                    요약 생성
                  </>
                )}
              </Button>
            </div>
            {commentSummary && (
              <div className="p-3 rounded-md bg-[var(--surface-subtle)] border border-[var(--border-subtle)]">
                <Markdown content={commentSummary} />
              </div>
            )}
            {!canGenerateCommentSummary && (
              <p className="text-xs text-[var(--text-muted)]">
                댓글이 5개 이상일 때만 요약할 수 있습니다.
              </p>
            )}
          </div>
        )}

        {error && (
          <div className="p-3 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <p className="text-sm text-red-600 dark:text-red-400">
              {error.message}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

