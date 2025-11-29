"use client";

import { use, useState } from "react";
import dynamic from "next/dynamic";
import { DetailPageLayout } from "@/components/layout";
import { Card, CardHeader, CardTitle, CardContent } from "@hua-labs/ui";
import { Button } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { EmptyState, SectionErrorBoundary } from "@/components/common";
import { TeamMemberList } from "@/components/team";
import { FormDrawer, MetaInfoCard } from "@/components/common";
import { useTeam } from "@/hooks/useTeam";
import { useAuthStore } from "@/store/auth-store";
import { useToast } from "@hua-labs/ui";

const InviteMemberForm = dynamic(() => import("@/components/team").then((mod) => ({ default: mod.InviteMemberForm })));
const TeamActivityLog = dynamic(() => import("@/components/team").then((mod) => ({ default: mod.TeamActivityLog })));
const TeamStats = dynamic(() => import("@/components/team").then((mod) => ({ default: mod.TeamStats })));

export default function TeamDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { team, isLoading, error, inviteMember, updateMemberRole, removeMember } = useTeam(id);
  const { user } = useAuthStore();
  const { addToast } = useToast();
  const [isInviteFormOpen, setIsInviteFormOpen] = useState(false);

  const handleInvite = async (email: string, role: "ADMIN" | "MEMBER") => {
    try {
      // TODO: 실제 API로 사용자 ID 조회 후 초대
      // 임시: email을 userId로 사용
      // 초대 시에는 OWNER 역할을 부여할 수 없으므로 타입 제한
      await inviteMember(email, role);
      addToast({
        title: "성공",
        message: "멤버가 초대되었습니다",
        type: "success",
      });
      setIsInviteFormOpen(false);
    } catch (err) {
      throw err;
    }
  };

  const handleRoleChange = async (memberId: string, role: "OWNER" | "ADMIN" | "MEMBER") => {
    try {
      await updateMemberRole(memberId, role);
      addToast({
        title: "성공",
        message: "멤버 역할이 변경되었습니다",
        type: "success",
      });
    } catch (err) {
      addToast({
        title: "오류",
        message: err instanceof Error ? err.message : "역할 변경에 실패했습니다",
        type: "error",
      });
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    try {
      await removeMember(memberId);
      addToast({
        title: "성공",
        message: "멤버가 제거되었습니다",
        type: "success",
      });
    } catch (err) {
      addToast({
        title: "오류",
        message: err instanceof Error ? err.message : "멤버 제거에 실패했습니다",
        type: "error",
      });
    }
  };

  // 헤더 액션
  const headerActions = team ? (
    <Button onClick={() => setIsInviteFormOpen(true)} className="w-full sm:w-auto">
      <Icon name="userPlus" size={16} className="mr-2" />
      멤버 초대
    </Button>
  ) : undefined;

  return (
    <DetailPageLayout
      title={team?.name || "팀"}
      description={team?.description || (team ? `팀 #${team.id}` : undefined)}
      activeItem="teams"
      isLoading={isLoading}
      error={error}
      backHref="/teams"
      backLabel="팀 목록으로"
      actions={headerActions}
    >
      <SectionErrorBoundary sectionName="팀 상세">
        {team && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 팀 정보 */}
            <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
              <CardHeader>
                <CardTitle>팀 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-[var(--text-muted)] mb-2">팀 이름</div>
                  <div className="text-[var(--text-strong)] font-medium">{team.name}</div>
                </div>
                {team.description && (
                  <div>
                    <div className="text-sm text-[var(--text-muted)] mb-2">설명</div>
                    <div className="text-[var(--text-strong)]">{team.description}</div>
                  </div>
                )}
                <div>
                  <div className="text-sm text-[var(--text-muted)] mb-2">멤버 수</div>
                  <div className="text-[var(--text-strong)]">{team.members.length}명</div>
                </div>
              </CardContent>
            </Card>

            {/* 멤버 목록 */}
            <TeamMemberList
              team={team}
              currentUserId={user?.id}
              onRoleChange={handleRoleChange}
              onRemoveMember={handleRemoveMember}
            />

            {/* 팀 통계 */}
            <SectionErrorBoundary sectionName="팀 통계">
              <TeamStats teamId={team.id} />
            </SectionErrorBoundary>

            {/* 활동 로그 */}
            <SectionErrorBoundary sectionName="활동 로그">
              <TeamActivityLog teamId={team.id} />
            </SectionErrorBoundary>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 메타 정보 */}
            <MetaInfoCard
              items={[
                {
                  label: "생성일",
                  value: new Date(team.createdAt).toLocaleString("ko-KR"),
                },
                {
                  label: "수정일",
                  value: new Date(team.updatedAt).toLocaleString("ko-KR"),
                },
              ]}
            />
          </div>
        </div>
        )}
      </SectionErrorBoundary>

      {/* 멤버 초대 Drawer */}
      <FormDrawer
        open={isInviteFormOpen}
        onOpenChange={setIsInviteFormOpen}
        title="멤버 초대"
        size="md"
      >
        <InviteMemberForm
          onInvite={handleInvite}
          isLoading={false}
        />
      </FormDrawer>
    </DetailPageLayout>
  );
}
