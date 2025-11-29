"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProjectFilterState {
  searchQuery: string;
  teamIdFilter: string | null;
  showArchived: boolean;
  sortBy: "name" | "created" | "updated";
  sortOrder: "asc" | "desc";
  setSearchQuery: (query: string) => void;
  setTeamIdFilter: (teamId: string | null) => void;
  setShowArchived: (show: boolean) => void;
  setSortBy: (field: "name" | "created" | "updated") => void;
  setSortOrder: (order: "asc" | "desc") => void;
  resetFilters: () => void;
}

const initialState = {
  searchQuery: "",
  teamIdFilter: null,
  showArchived: false,
  sortBy: "updated" as const,
  sortOrder: "desc" as const,
};

export const useProjectFilterStore = create<ProjectFilterState>()(
  persist(
    (set) => ({
      ...initialState,
      setSearchQuery: (query) => set({ searchQuery: query }),
      setTeamIdFilter: (teamId) => set({ teamIdFilter: teamId }),
      setShowArchived: (show) => set({ showArchived: show }),
      setSortBy: (field) => set({ sortBy: field }),
      setSortOrder: (order) => set({ sortOrder: order }),
      resetFilters: () => set(initialState),
    }),
    {
      name: "project-filter-storage",
      partialize: (state) => ({
        searchQuery: state.searchQuery,
        showArchived: state.showArchived,
        sortBy: state.sortBy,
        sortOrder: state.sortOrder,
        // teamIdFilter는 세션별로 다를 수 있으므로 저장하지 않음
      }),
    }
  )
);

