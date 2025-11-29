"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@hua-labs/ui";
import { Badge } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import Link from "next/link";
import type { Team } from "@/types";

export interface TeamCardProps {
  team: Team;
  showMemberCount?: boolean;
  showActions?: boolean;
  onEdit?: (team: Team) => void;
  onDelete?: (team: Team) => void;
}

export function TeamCard({
  team,
  showMemberCount = true,
  showActions = false,
  onEdit,
  onDelete,
}: TeamCardProps) {
  const memberCount = team.members?.length || 0;

  return (
    <Link href={`/teams/${team.id}`}>
      <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm hover:shadow-md transition-shadow h-full">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                {team.avatar ? (
                  <img
                    src={team.avatar}
                    alt={team.name}
                    className="h-10 w-10 rounded-md object-cover"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-md bg-[var(--brand-primary)] flex items-center justify-center text-white font-semibold">
                    {team.name[0]?.toUpperCase() || "T"}
                  </div>
                )}
                <div className="flex-1">
                  <CardTitle className="text-lg">{team.name}</CardTitle>
                  {team.description && (
                    <p className="text-sm text-[var(--text-muted)] mt-1 line-clamp-2">
                      {team.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {showActions && (
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onEdit?.(team);
                  }}
                  className="p-2 text-[var(--text-muted)] hover:text-[var(--text-strong)] transition-colors"
                  aria-label="팀 수정"
                >
                  <Icon name="pencil" size={16} />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDelete?.(team);
                  }}
                  className="p-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                  aria-label="팀 삭제"
                >
                  <Icon name="trash" size={16} />
                </button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            {showMemberCount && (
              <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <Icon name="users" size={16} />
                <span>{memberCount}명</span>
              </div>
            )}
            <Icon name="chevronRight" size={16} className="text-[var(--text-muted)]" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
