"use client";

import { create } from "zustand";
import type { IssueStatus, IssuePriority } from "@/types";

interface IssueFilterState {
  searchQuery: string;
  statusFilter: IssueStatus | "ALL";
  priorityFilter: IssuePriority | "ALL";
  projectIdFilter: string | null;
  sortBy: "created" | "updated" | "title";
  sortOrder: "asc" | "desc";
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: IssueStatus | "ALL") => void;
  setPriorityFilter: (priority: IssuePriority | "ALL") => void;
  setProjectIdFilter: (projectId: string | null) => void;
  setSortBy: (field: "created" | "updated" | "title") => void;
  setSortOrder: (order: "asc" | "desc") => void;
  resetFilters: () => void;
}

const initialState = {
  searchQuery: "",
  statusFilter: "ALL" as IssueStatus | "ALL",
  priorityFilter: "ALL" as IssuePriority | "ALL",
  projectIdFilter: null,
  sortBy: "updated" as const,
  sortOrder: "desc" as const,
};

export const useIssueFilterStore = create<IssueFilterState>((set) => ({
  ...initialState,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setStatusFilter: (status) => set({ statusFilter: status }),
  setPriorityFilter: (priority) => set({ priorityFilter: priority }),
  setProjectIdFilter: (projectId) => set({ projectIdFilter: projectId }),
  setSortBy: (field) => set({ sortBy: field }),
  setSortOrder: (order) => set({ sortOrder: order }),
  resetFilters: () => set(initialState),
}));

