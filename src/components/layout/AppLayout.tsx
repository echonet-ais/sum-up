"use client";

import React from "react";
import { useUIStore } from "../../store/ui-store";
import { useAuthStore } from "../../store/auth-store";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "@hua-labs/ui";
import { ScrollToTop, SectionErrorBoundary } from "../common";
import dynamic from "next/dynamic";
import { NotificationDropdown } from "@/components/notification";
import { UserPopover } from "./UserPopover";
import { Avatar, AvatarImage, AvatarFallback } from "@hua-labs/ui";
import { CustomSidebar } from "./CustomSidebar";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const GlobalSearch = dynamic(() => import("@/components/search").then((mod) => ({ default: mod.GlobalSearch })));

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  activeItem?: string;
}

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
      <CustomSidebar activeItem={activeItem} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <header 
          className="relative z-10 border-b border-[var(--border-subtle)] bg-[var(--surface)]/80 backdrop-blur-md"
          style={{ minHeight: "var(--header-height)" }}
        >
          <div className="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleSidebar}
                className="micro-button flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] text-[var(--text-strong)] shadow-sm hover:border-[var(--brand-primary)]/50 hover:text-[var(--brand-primary)] lg:hidden"
                aria-label="Toggle sidebar"
              >
                <Icon name="menu" size={18} provider="phosphor" />
              </button>
              {title && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--brand-primary)]">
                    SUMUP
                  </p>
                  <h1 className="mt-2 text-2xl md:text-3xl font-semibold text-[var(--text-strong)]">{title}</h1>
                  {description && (
                    <p className="mt-2 max-w-3xl text-sm text-[var(--text-subtle)]">{description}</p>
                  )}
                </div>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2 md:justify-end">
              <GlobalSearch />
              <NotificationDropdown />

              {user && (
                <div className="relative" ref={popoverRef}>
                  <button
                    onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                    className={cn(
                      "micro-button flex items-center gap-2 rounded-lg",
                      "focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:ring-offset-2",
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

