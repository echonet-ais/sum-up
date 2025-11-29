"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@hua-labs/ui";
import { Badge } from "@hua-labs/ui";
import { Button } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { Select, SelectOption } from "@hua-labs/ui";
import { Dropdown, DropdownMenu, DropdownItem } from "@hua-labs/ui";
import type { Team, TeamMember } from "@/types";
import { ConfirmDialog } from "@/components/common";

export interface TeamMemberListProps {
  team: Team;
  currentUserId?: string;
  onRoleChange?: (memberId: string, role: TeamMember["role"]) => void;
  onRemoveMember?: (memberId: string) => void;
  showActions?: boolean;
}

export function TeamMemberList({
  team,
  currentUserId,
  onRoleChange,
  onRemoveMember,
  showActions = true,
}: TeamMemberListProps) {
  const [removeMemberId, setRemoveMemberId] = React.useState<string | null>(null);
  const currentUserMember = team.members.find((m) => m.userId === currentUserId);
  const isOwner = currentUserMember?.role === "OWNER";
  const isAdmin = currentUserMember?.role === "ADMIN" || isOwner;

  const roleOptions: Array<{ value: TeamMember["role"]; label: string }> = [
    { value: "OWNER", label: "소유자" },
    { value: "ADMIN", label: "관리자" },
    { value: "MEMBER", label: "멤버" },
  ];

  const handleRoleChange = (memberId: string, newRole: TeamMember["role"]) => {
    if (!isAdmin) return;
    onRoleChange?.(memberId, newRole);
  };

  const handleRemoveMember = (memberId: string) => {
    if (!isAdmin) return;
    setRemoveMemberId(memberId);
  };

  const confirmRemoveMember = () => {
    if (removeMemberId) {
      onRemoveMember?.(removeMemberId);
      setRemoveMemberId(null);
    }
  };

  return (
    <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>팀 멤버 ({team.members.length}명)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {team.members.length === 0 ? (
            <p className="text-sm text-[var(--text-muted)] text-center py-4">
              멤버가 없습니다
            </p>
          ) : (
            team.members.map((member) => {
              const isCurrentUser = member.userId === currentUserId;
              const canEdit = isAdmin && !isCurrentUser && member.role !== "OWNER";

              return (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-2 sm:p-3 rounded-md border border-[var(--border-subtle)] bg-[var(--surface-muted)]"
                >
                  <div className="flex items-center gap-3 flex-1">
                    {member.user.avatar ? (
                      <img
                        src={member.user.avatar}
                        alt={member.user.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-[var(--brand-primary)] flex items-center justify-center text-white font-semibold">
                        {member.user.name[0]?.toUpperCase() || "U"}
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-[var(--text-strong)]">
                          {member.user.name}
                        </span>
                        {isCurrentUser && (
                          <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs">나</Badge>
                        )}
                      </div>
                      <p className="text-sm text-[var(--text-muted)]">{member.user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {showActions && canEdit ? (
                      <>
                        <Select
                          value={member.role}
                          onChange={(e) =>
                            handleRoleChange(member.id, e.target.value as TeamMember["role"])
                          }
                          className="w-28 sm:w-32"
                        >
                          {roleOptions.map((option) => (
                            <SelectOption key={option.value} value={option.value}>
                              {option.label}
                            </SelectOption>
                          ))}
                        </Select>
                        <button
                          onClick={() => handleRemoveMember(member.id)}
                          className="p-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                          aria-label="멤버 제거"
                        >
                          <Icon name="trash" size={16} />
                        </button>
                      </>
                    ) : (
                      <Badge className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                        {roleOptions.find((r) => r.value === member.role)?.label || member.role}
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
      <ConfirmDialog
        open={!!removeMemberId}
        onOpenChange={(open) => !open && setRemoveMemberId(null)}
        title="멤버 제거"
        description="정말 이 멤버를 제거하시겠습니까? 이 작업은 되돌릴 수 없습니다."
        confirmLabel="제거"
        cancelLabel="취소"
        variant="destructive"
        onConfirm={confirmRemoveMember}
      />
    </Card>
  );
}
