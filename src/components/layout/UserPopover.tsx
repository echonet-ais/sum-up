"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback, Icon } from "@hua-labs/ui";
import { cn } from "@/lib/utils";

interface UserPopoverProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
    role?: "ADMIN" | "MEMBER" | "VIEWER";
  };
  onClose: () => void;
  onLogout: () => void;
}

/**
 * 헤더의 사용자 팝오버 컴포넌트
 * 
 * @description
 * 사용자 정보, 메뉴 링크, 로그아웃 버튼을 표시합니다.
 */
export function UserPopover({
  user,
  onClose,
  onLogout,
}: UserPopoverProps) {
  const router = useRouter();
  const isAdmin = user.role === "ADMIN";

  const handleProfileClick = () => {
    onClose();
    router.push("/profile");
  };

  const handleSettingsClick = () => {
    onClose();
    router.push("/settings");
  };

  const handleLogout = () => {
    onClose();
    onLogout();
  };

  return (
    <div className={cn(
      "absolute right-0 mt-2 w-72",
      "bg-[var(--surface)] border border-[var(--border-subtle)]",
      "rounded-lg shadow-lg",
      "overflow-hidden z-50",
      "animate-in fade-in slide-in-from-top-2 duration-200"
    )}>
      {/* 사용자 정보 섹션 */}
      <div className={cn(
        "px-4 py-4 border-b border-[var(--border-subtle)]",
        "bg-gradient-to-br from-[var(--brand-primary-subtle)] to-[var(--color-secondary-subtle)]"
      )}>
        <div className="flex items-center space-x-3">
          <Avatar size="lg" className="ring-2 ring-[var(--surface)]">
            {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
            <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-[var(--text-strong)] truncate">
              {user.name}
            </div>
            <div className="text-sm text-[var(--text-muted)] truncate">
              {user.email}
            </div>
            {isAdmin && (
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[var(--color-secondary-subtle)] text-[var(--color-secondary)] rounded-full mt-2">
                <Icon name="shield" className="h-3 w-3" provider="phosphor" />
                <span className="text-xs font-medium">관리자</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 메뉴 링크 섹션 */}
      <div className="py-2">
        {/* 프로필 */}
        <button
          onClick={handleProfileClick}
          className={cn(
            "block w-full text-left px-4 py-3 text-sm",
            "text-[var(--text-strong)]",
            "hover:bg-[var(--surface-muted)]",
            "transition-colors"
          )}
        >
          <div className="flex items-center">
            <Icon name="user" className="h-4 w-4 mr-2" provider="phosphor" />
            프로필
          </div>
        </button>

        {/* 설정 */}
        <button
          onClick={handleSettingsClick}
          className={cn(
            "block w-full text-left px-4 py-3 text-sm",
            "text-[var(--text-strong)]",
            "hover:bg-[var(--surface-muted)]",
            "transition-colors"
          )}
        >
          <div className="flex items-center">
            <Icon name="settings" className="h-4 w-4 mr-2" provider="phosphor" />
            설정
          </div>
        </button>

        {/* 관리자 링크 (관리자만 표시) */}
        {isAdmin && (
          <>
            <hr className="border-[var(--border-subtle)] my-2" />
            <Link
              href="/admin"
              className={cn(
                "block px-4 py-3 text-sm",
                "text-[var(--text-strong)]",
                "hover:bg-[var(--surface-muted)]",
                "transition-colors"
              )}
              onClick={onClose}
            >
              <div className="flex items-center">
                <Icon name="shield" className="h-4 w-4 mr-2 text-[var(--color-secondary)]" provider="phosphor" />
                <span>관리자</span>
                <span className={cn(
                  "ml-auto text-xs px-2 py-0.5 rounded-full",
                  "bg-[var(--color-secondary-subtle)] text-[var(--color-secondary)]"
                )}>
                  ADMIN
                </span>
              </div>
            </Link>
          </>
        )}

        {/* 로그아웃 */}
        <hr className="border-[var(--border-subtle)] my-2" />
        <button
          onClick={handleLogout}
          className={cn(
            "block w-full text-left px-4 py-3 text-sm",
            "text-[var(--color-error)]",
            "hover:bg-[var(--surface-muted)]",
            "transition-colors"
          )}
        >
          <div className="flex items-center">
            <Icon name="logOut" className="h-4 w-4 mr-2" provider="phosphor" />
            로그아웃
          </div>
        </button>
      </div>
    </div>
  );
}

