"use client";

import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout";
import { Card, CardHeader, CardTitle, CardContent } from "@hua-labs/ui";
import { Button } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { Input } from "@hua-labs/ui";
import { EmptyState, LoadingState, ErrorState, FormDrawer, SectionErrorBoundary, PageHeader } from "@/components/common";
import { TeamCard, TeamForm } from "@/components/team";
import { useTeams } from "@/hooks/useTeams";
import Link from "next/link";

export default function TeamsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isTeamFormOpen, setIsTeamFormOpen] = useState(false);

  const { teams, isLoading, error, refetch } = useTeams({
    search: searchQuery || undefined,
  });

  const filteredTeams = useMemo(() => {
    if (!searchQuery) return teams;
    return teams.filter(
      (team) =>
        team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [teams, searchQuery]);

  if (error) {
    return (
      <AppLayout
        title="팀"
        description="팀을 관리하고 멤버를 초대하세요"
        activeItem="teams"
      >
        <ErrorState
          message={error.message}
          onRetry={() => window.location.reload()}
        />
      </AppLayout>
    );
  }

  return (
    <AppLayout
      title="팀"
      description="팀을 관리하고 멤버를 초대하세요"
      activeItem="teams"
    >
      <SectionErrorBoundary sectionName="팀 페이지">
        <div className="flex flex-col gap-6">
        {/* 필터 및 검색 */}
        <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="flex-1">
                <Input
                  placeholder="팀 이름 또는 설명으로 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 팀 그리드 */}
        <div>
          <PageHeader
            title={`팀 목록 (${filteredTeams.length})`}
            actions={
              <Button onClick={() => setIsTeamFormOpen(true)} className="w-full sm:w-auto">
                <Icon name="add" size={16} className="mr-2" />
                새 팀 생성
              </Button>
            }
          />
          {isLoading ? (
            <LoadingState message="팀을 불러오는 중..." />
          ) : filteredTeams.length === 0 ? (
            <EmptyState
              title="팀이 없습니다"
              description={
                searchQuery
                  ? "검색 조건에 맞는 팀이 없습니다"
                  : "새로운 팀을 생성해보세요"
              }
              iconName="users"
              action={
                !searchQuery
                  ? {
                      label: "새 팀 생성",
                      onClick: () => setIsTeamFormOpen(true),
                      variant: "primary" as const,
                    }
                  : undefined
              }
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {filteredTeams.map((team) => (
                <TeamCard key={team.id} team={team} />
              ))}
            </div>
          )}
        </div>
        </div>
      </SectionErrorBoundary>

      {/* 팀 생성 Drawer */}
      <FormDrawer
        open={isTeamFormOpen}
        onOpenChange={setIsTeamFormOpen}
        title="새 팀 생성"
      >
        <TeamForm
          onSuccess={() => {
            setIsTeamFormOpen(false);
            refetch();
          }}
          onCancel={() => setIsTeamFormOpen(false)}
        />
      </FormDrawer>
    </AppLayout>
  );
}
