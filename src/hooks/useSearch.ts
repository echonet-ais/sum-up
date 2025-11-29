"use client";

import { useState, useCallback, useMemo } from "react";
import { useIssues } from "./useIssues";
import { useProjects } from "./useProjects";
import { useTeams } from "./useTeams";
import type { Issue, Project, Team } from "@/types";

export interface SearchResult {
  type: "issue" | "project" | "team";
  id: string;
  title: string;
  description?: string;
  url: string;
  metadata?: Record<string, any>;
}

export interface UseSearchOptions {
  query: string;
  types?: Array<"issue" | "project" | "team">;
  limit?: number;
}

export interface UseSearchReturn {
  results: SearchResult[];
  isLoading: boolean;
  error: Error | null;
  search: (query: string) => void;
  clearResults: () => void;
}

export function useSearch(options: UseSearchOptions = { query: "" }): UseSearchReturn {
  const { query, types = ["issue", "project", "team"], limit = 20 } = options;

  const { issues, isLoading: issuesLoading } = useIssues();
  const { projects, isLoading: projectsLoading } = useProjects();
  const { teams, isLoading: teamsLoading } = useTeams();

  const [searchQuery, setSearchQuery] = useState(query);
  const [error, setError] = useState<Error | null>(null);

  const search = useCallback((query: string) => {
    setSearchQuery(query);
    setError(null);
  }, []);

  const clearResults = useCallback(() => {
    setSearchQuery("");
    setError(null);
  }, []);

  const results = useMemo(() => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      return [];
    }

    const queryLower = searchQuery.toLowerCase().trim();
    const searchResults: SearchResult[] = [];

    try {
      // 이슈 검색
      if (types.includes("issue")) {
        const issueResults = issues
          .filter((issue) => {
            const titleMatch = issue.title.toLowerCase().includes(queryLower);
            const descriptionMatch = issue.description?.toLowerCase().includes(queryLower);
            const projectMatch = issue.projectId.toLowerCase().includes(queryLower);
            return titleMatch || descriptionMatch || projectMatch;
          })
          .slice(0, limit)
          .map((issue): SearchResult => ({
            type: "issue",
            id: issue.id,
            title: issue.title,
            description: issue.description,
            url: `/issues/${issue.id}`,
            metadata: {
              status: issue.status,
              priority: issue.priority,
              projectId: issue.projectId,
            },
          }));

        searchResults.push(...issueResults);
      }

      // 프로젝트 검색
      if (types.includes("project")) {
        const projectResults = projects
          .filter((project) => {
            const nameMatch = project.name.toLowerCase().includes(queryLower);
            const descriptionMatch = project.description?.toLowerCase().includes(queryLower);
            return nameMatch || descriptionMatch;
          })
          .slice(0, limit)
          .map((project): SearchResult => ({
            type: "project",
            id: project.id,
            title: project.name,
            description: project.description,
            url: `/projects/${project.id}`,
            metadata: {
              teamId: project.teamId,
              isFavorite: project.isFavorite,
            },
          }));

        searchResults.push(...projectResults);
      }

      // 팀 검색
      if (types.includes("team")) {
        const teamResults = teams
          .filter((team) => {
            const nameMatch = team.name.toLowerCase().includes(queryLower);
            const descriptionMatch = team.description?.toLowerCase().includes(queryLower);
            return nameMatch || descriptionMatch;
          })
          .slice(0, limit)
          .map((team): SearchResult => ({
            type: "team",
            id: team.id,
            title: team.name,
            description: team.description,
            url: `/teams/${team.id}`,
            metadata: {
              memberCount: team.members?.length || 0,
            },
          }));

        searchResults.push(...teamResults);
      }

      // 관련도 순으로 정렬 (타이틀 매치 > 설명 매치)
      return searchResults.sort((a, b) => {
        const aTitleMatch = a.title.toLowerCase().includes(queryLower);
        const bTitleMatch = b.title.toLowerCase().includes(queryLower);
        if (aTitleMatch && !bTitleMatch) return -1;
        if (!aTitleMatch && bTitleMatch) return 1;
        return 0;
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error("검색 중 오류가 발생했습니다"));
      return [];
    }
  }, [searchQuery, issues, projects, teams, types, limit]);

  const isLoading = issuesLoading || projectsLoading || teamsLoading;

  return {
    results,
    isLoading,
    error,
    search,
    clearResults,
  };
}

