"use client";

import React from "react";
import { DashboardSidebar, DashboardSidebarSection } from "@hua-labs/ui";
import { useUIStore } from "../../store/ui-store";
import { useAuthStore } from "../../store/auth-store";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "@hua-labs/ui";
import Link from "next/link";
import { ScrollToTop, SectionErrorBoundary } from "../common";
import dynamic from "next/dynamic";
import { NotificationDropdown } from "@/components/notification";
import { UserPopover } from "./UserPopover";
import { Avatar, AvatarImage, AvatarFallback } from "@hua-labs/ui";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const GlobalSearch = dynamic(() => import("@/components/search").then((mod) => ({ default: mod.GlobalSearch })));

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
  const { user, logout } = useAuthStore();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // 현재 경로에 따라 활성 상태 업데이트
  const sectionsWithActive = navigationSections.map((section => ({
    ...section,
    items: section.items.map((item) => ({
      ...item,
      active: activeItem 
        ? item.id === activeItem 
        : pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href || "")),
    })),
  })));

  // 팝오버 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsPopoverOpen(false);
      }
    };

    if (isPopoverOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopoverOpen]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

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
        <header className="flex h-16 items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--surface)] px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="flex h-9 w-9 items-center justify-center rounded-md text-[var(--text-muted)] hover:bg-[var(--surface-muted)] transition-colors"
              aria-label="Toggle sidebar"
            >
              <Icon name="menu" size={20} provider="phosphor" />
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
          
          <div className="flex items-center gap-2">
            <GlobalSearch />
            <NotificationDropdown />

            {user && (
              <div className="relative" ref={popoverRef}>
                <button
                  onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                  className={cn(
                    "flex items-center gap-2 rounded-lg",
                    "focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:ring-offset-2",
                    "transition-colors",
                    isPopoverOpen && "ring-2 ring-[var(--brand-primary)]"
                  )}
                  aria-label="사용자 메뉴"
                  aria-expanded={isPopoverOpen}
                >
                  <Avatar>
                    {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
                    <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </button>
                {isPopoverOpen && (
                  <UserPopover
                    user={user}
                    onClose={() => setIsPopoverOpen(false)}
                    onLogout={handleLogout}
                  />
                )}
              </div>
            )}
          </div>
        </header>
        <SectionErrorBoundary sectionName="메인 콘텐츠">
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </SectionErrorBoundary>
      </div>
      <ScrollToTop />
    </div>
  );
}

