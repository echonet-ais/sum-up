"use client";

import { use, useState } from "react";
import dynamic from "next/dynamic";
import { AppLayout } from "@/components/layout";
import { Card, CardHeader, CardTitle, CardContent } from "@hua-labs/ui";
import { Button } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { Drawer, DrawerHeader, DrawerContent } from "@hua-labs/ui";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@hua-labs/ui";
import { EmptyState, ErrorState, LoadingState } from "@/components/common";
import { TeamMemberList } from "@/components/team";

const InviteMemberForm = dynamic(() => import("@/components/team").then((mod) => ({ default: mod.InviteMemberForm })));
import { useTeam } from "@/hooks/useTeam";
import { useAuthStore } from "@/store/auth-store";
import Link from "next/link";
import { useToast } from "@hua-labs/ui";

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

  if (isLoading) {
    return (
      <AppLayout title="팀" activeItem="teams">
        <LoadingState message="팀 정보를 불러오는 중..." />
      </AppLayout>
    );
  }

  if (error || !team) {
    return (
      <AppLayout title="팀을 찾을 수 없습니다" activeItem="teams">
        <ErrorState
          title="팀을 찾을 수 없습니다"
          message={error?.message || "요청하신 팀이 존재하지 않거나 삭제되었습니다."}
          onRetry={() => window.location.reload()}
          retryLabel="다시 시도"
        />
      </AppLayout>
    );
  }

  return (
    <AppLayout
      title={team.name}
      description={team.description || `팀 #${team.id}`}
      activeItem="teams"
    >
      <div className="flex flex-col gap-6">
        {/* 헤더 액션 */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
          <Link
            href="/teams"
            className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-strong)]"
          >
            <Icon name="chevronLeft" size={16} />
            팀 목록으로
          </Link>
          <Button onClick={() => setIsInviteFormOpen(true)} className="w-full sm:w-auto">
            <Icon name="userPlus" size={16} className="mr-2" />
            멤버 초대
          </Button>
        </div>

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
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 메타 정보 */}
            <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
              <CardHeader>
                <CardTitle>정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <div className="text-[var(--text-muted)]">생성일</div>
                  <div className="text-[var(--text-strong)]">
                    {new Date(team.createdAt).toLocaleString("ko-KR")}
                  </div>
                </div>
                <div>
                  <div className="text-[var(--text-muted)]">수정일</div>
                  <div className="text-[var(--text-strong)]">
                    {new Date(team.updatedAt).toLocaleString("ko-KR")}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* 멤버 초대 Drawer */}
      <Drawer
        open={isInviteFormOpen}
        onOpenChange={setIsInviteFormOpen}
        side="right"
        size="md"
      >
        <DrawerHeader showCloseButton onClose={() => setIsInviteFormOpen(false)}>
          <h2 className="text-lg font-semibold text-[var(--text-strong)]">멤버 초대</h2>
        </DrawerHeader>
        <DrawerContent>
          <InviteMemberForm
            onInvite={handleInvite}
            isLoading={false}
          />
        </DrawerContent>
      </Drawer>
    </AppLayout>
  );
}
