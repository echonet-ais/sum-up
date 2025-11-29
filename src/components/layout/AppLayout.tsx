"use client";

import React from "react";
import { DashboardSidebar, DashboardSidebarSection } from "@hua-labs/ui";
import { useUIStore } from "../../store/ui-store";
import { useAuthStore } from "../../store/auth-store";
import { usePathname } from "next/navigation";
import { Icon } from "@hua-labs/ui";
import { Header } from "./Header";
import Link from "next/link";

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  activeItem?: string;
}

const navigationSections: DashboardSidebarSection[] = [
  {
    id: "main",
    label: "메인",
    items: [
      {
        id: "dashboard",
        label: "대시보드",
        href: "/",
        icon: <Icon name="layout-dashboard" size={20} />,
      },
      {
        id: "projects",
        label: "프로젝트",
        href: "/projects",
        icon: <Icon name="folder" size={20} />,
      },
    ],
  },
  {
    id: "work",
    label: "작업",
    items: [
      {
        id: "issues",
        label: "이슈",
        href: "/issues",
        icon: <Icon name="alert-circle" size={20} />,
      },
      {
        id: "kanban",
        label: "칸반 보드",
        href: "/kanban",
        icon: <Icon name="columns" size={20} />,
      },
    ],
  },
  {
    id: "team",
    label: "팀",
    items: [
      {
        id: "teams",
        label: "팀 관리",
        href: "/teams",
        icon: <Icon name="users" size={20} />,
      },
    ],
  },
  {
    id: "settings",
    label: "설정",
    items: [
      {
        id: "profile",
        label: "프로필",
        href: "/profile",
        icon: <Icon name="user" size={20} />,
      },
      {
        id: "settings",
        label: "설정",
        href: "/settings",
        icon: <Icon name="settings" size={20} />,
      },
    ],
  },
];

export function AppLayout({ 
  children, 
  title,
  description,
  activeItem 
}: AppLayoutProps) {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useUIStore();
  const { user } = useAuthStore();

  // 현재 경로에 따라 활성 상태 업데이트
  const sectionsWithActive = navigationSections.map((section) => ({
    ...section,
    items: section.items.map((item) => ({
      ...item,
      active: activeItem 
        ? item.id === activeItem 
        : pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href || "")),
    })),
  }));

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[var(--background)]">
      <DashboardSidebar
        sections={sectionsWithActive}
        isCollapsed={sidebarCollapsed}
        onToggleCollapsed={toggleSidebar}
        collapsedWidth={72}
        expandedWidth={264}
        mobileBreakpoint={1024}
        logo={
          <Link href="/" className="flex items-center gap-2 px-4 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--brand-primary)] text-white font-semibold">
              S
            </div>
            {!sidebarCollapsed && (
              <span className="text-lg font-semibold text-[var(--text-strong)]">SumUp</span>
            )}
          </Link>
        }
        className="border-r border-[var(--border-subtle)] bg-[var(--surface)]"
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex h-16 items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--surface)] px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="flex h-9 w-9 items-center justify-center rounded-md text-[var(--text-muted)] hover:bg-[var(--surface-muted)] transition-colors"
              aria-label="Toggle sidebar"
            >
              <Icon name="menu" size={20} />
            </button>
            {title && (
              <div>
                <h1 className="text-xl font-semibold text-[var(--text-strong)]">{title}</h1>
                {description && (
                  <p className="text-sm text-[var(--text-muted)] mt-0.5">{description}</p>
                )}
              </div>
            )}
          </div>
          <Header user={user || undefined} />
        </div>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}

