"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@hua-labs/ui";
import type { IconName } from "@hua-labs/ui";
import { usePathname } from "next/navigation";
import { useUIStore } from "@/store/ui-store";
import { useAuthStore } from "@/store/auth-store";
import { cn } from "@/lib/utils";

const COLLAPSED_WIDTH = 72;
const EXPANDED_WIDTH = 264;
const MOBILE_BREAKPOINT = 1024;
const AUTO_COLLAPSE_BREAKPOINT = 1280;
const FAVORITE_LIMIT = 5;

interface SidebarItemConfig {
  id: string;
  label: string;
  href: string;
  icon: IconName;
}

interface SidebarSection {
  id: string;
  label: string;
  items: SidebarItemConfig[];
}

const sidebarSections: SidebarSection[] = [
  {
    id: "main",
    label: "메인",
    items: [
      {
        id: "dashboard",
        label: "대시보드",
        href: "/dashboard",
        icon: "layout-dashboard",
      },
      {
        id: "projects",
        label: "프로젝트",
        href: "/projects",
        icon: "folder",
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
        icon: "alertCircle",
      },
      {
        id: "kanban",
        label: "칸반 보드",
        href: "/kanban",
        icon: "columns",
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
        icon: "users",
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
        icon: "user",
      },
      {
        id: "settings",
        label: "설정",
        href: "/settings",
        icon: "settings",
      },
    ],
  },
];

interface CustomSidebarProps {
  activeItem?: string;
}

export function CustomSidebar({ activeItem }: CustomSidebarProps) {
  const pathname = usePathname();
  const { sidebarCollapsed, setSidebarCollapsed } = useUIStore();
  const { logout } = useAuthStore();
  const [isMobileView, setIsMobileView] = useState(false);
  const [mobilePanelWidth, setMobilePanelWidth] = useState(320);
  const [isForcedCollapsed, setIsForcedCollapsed] = useState(false);
  const preferredCollapsedRef = useRef(sidebarCollapsed);

  useEffect(() => {
    if (!isForcedCollapsed) {
      preferredCollapsedRef.current = sidebarCollapsed;
    }
  }, [sidebarCollapsed, isForcedCollapsed]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobileView(width <= MOBILE_BREAKPOINT);
      setMobilePanelWidth(Math.min(Math.max(Math.round(width * 0.82), 280), 360));
      const shouldForceCollapse = width <= AUTO_COLLAPSE_BREAKPOINT;
      setIsForcedCollapsed(shouldForceCollapse);
      if (shouldForceCollapse) {
        setSidebarCollapsed(true);
      } else {
        setSidebarCollapsed(preferredCollapsedRef.current);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setSidebarCollapsed]);

  const toggleCollapsed = () => {
    const nextState = !sidebarCollapsed;
    preferredCollapsedRef.current = nextState;
    setSidebarCollapsed(nextState);
  };

  const handleLogout = () => {
    logout();
  };

  const sections = useMemo(() => {
    return sidebarSections.map((section) => ({
      ...section,
      items: section.items.map((item) => ({
        ...item,
        active:
          activeItem
            ? item.id === activeItem
            : pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href || "")),
      })),
    }));
  }, [activeItem, pathname]);

  const favoriteItems = useMemo(() => {
    const flattened = sections.flatMap((section) => section.items);
    return flattened.slice(0, FAVORITE_LIMIT);
  }, [sections]);

  const widthValue = isMobileView
    ? mobilePanelWidth
    : sidebarCollapsed
    ? COLLAPSED_WIDTH
    : EXPANDED_WIDTH;

  return (
    <>
      {isMobileView && !sidebarCollapsed && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
          aria-hidden="true"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}

      <aside
        className={cn(
          "relative z-40 flex h-screen flex-col overflow-hidden border-r border-[var(--border-subtle)] bg-[var(--surface)] text-[var(--text-strong)] transition-[width,transform] duration-200 ease-out",
          isMobileView ? "fixed left-0 top-0 shadow-xl" : "sticky top-0",
          isMobileView && sidebarCollapsed && "pointer-events-none"
        )}
        style={{
          width: widthValue,
          transform: isMobileView && sidebarCollapsed ? "translateX(-110%)" : "translateX(0)",
          maxWidth: isMobileView ? 360 : undefined,
        }}
      >
        <div
          className="flex w-full items-center border-b border-[var(--border-subtle)] bg-[var(--surface)] px-4"
          style={{ height: "var(--header-height)" }}
        >
          {!sidebarCollapsed && (
            <Link href="/" className="flex items-center gap-3 flex-1 min-w-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--brand-primary)] text-white font-semibold flex-shrink-0">
                S
              </div>
              <div className="flex flex-col leading-tight min-w-0 flex-1">
                <span className="text-base font-semibold tracking-tight text-[var(--text-strong)] truncate">
                  SumUp
                </span>
                <span className="text-[10px] font-medium tracking-wide text-[var(--text-subtle)] truncate">
                  Issue Tracker
                </span>
              </div>
            </Link>
          )}
          <button
            type="button"
            onClick={toggleCollapsed}
            className="micro-button ml-auto flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-[var(--border-subtle)] text-[var(--text-muted)] transition-colors hover:border-[var(--brand-primary)]/50 hover:text-[var(--brand-primary)]"
            aria-label={sidebarCollapsed ? "사이드바 확장" : "사이드바 접기"}
          >
            <Icon
              name={sidebarCollapsed ? "chevronRight" : "chevronLeft"}
              size={16}
              provider="phosphor"
            />
          </button>
        </div>

        {!isMobileView && sidebarCollapsed && favoriteItems.length > 0 && (
          <div className="border-b border-[var(--border-subtle)] px-2.5 pb-4 pt-5">
            <div className="flex flex-col items-center gap-3">
              {favoriteItems.map((item) => {
                const isActive = Boolean(item.active);
                return (
                  <Link
                    key={`fav-${item.id}`}
                    href={item.href ?? "#"}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg border transition-colors",
                      isActive
                        ? "border-[var(--brand-primary)]/50 bg-[var(--surface-muted)] shadow-sm"
                        : "border-[var(--border-subtle)] bg-[var(--surface)] hover:border-[var(--brand-primary)]/30"
                    )}
                    title={item.label}
                  >
                    <Icon
                      name={item.icon}
                      size={18}
                      provider="phosphor"
                      className={isActive ? "text-[var(--brand-primary)]" : "text-[var(--text-muted)]"}
                    />
                    <span className="sr-only">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {!sidebarCollapsed && (
          <nav className="flex-1 overflow-y-auto px-4 py-5">
            <div className="flex flex-col gap-6">
              {sections.map((section, sectionIndex) => (
                <div key={section.id} className="flex flex-col gap-2">
                  <h3 className="px-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--text-subtle)]">
                    {section.label}
                  </h3>
                  <div className="divide-y divide-[var(--border-subtle)] rounded-lg">
                    {section.items.map((item) => {
                      const isActive = Boolean(item.active);
                      return (
                        <Link
                          key={item.id}
                          href={item.href ?? "#"}
                          className={cn(
                            "group relative flex items-center gap-3 px-3 py-3 text-sm font-medium transition-colors",
                            isActive
                              ? "text-[var(--brand-primary)]"
                              : "text-[var(--text-muted)] hover:text-[var(--brand-primary)]"
                          )}
                        >
                          {isActive && (
                            <span className="absolute inset-y-2 left-0 w-1 rounded-full bg-[var(--brand-primary)]" />
                          )}
                          <span
                            className={cn(
                              "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
                              isActive
                                ? "bg-[var(--brand-primary-subtle)] text-[var(--brand-primary)]"
                                : "bg-transparent text-[var(--text-muted)]"
                            )}
                          >
                            <Icon
                              name={item.icon}
                              size={18}
                              provider="phosphor"
                            />
                          </span>
                          <span className="flex-1 truncate text-[var(--text-strong)]">
                            {item.label}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                  {sectionIndex < sections.length - 1 && (
                    <div className="border-b border-dashed border-[var(--border-subtle)]" />
                  )}
                </div>
              ))}
            </div>
          </nav>
        )}

        <div className="border-t border-[var(--border-subtle)]">
          <div className="flex flex-col">
            {sidebarCollapsed ? (
              <div className="flex flex-col items-center gap-3 py-3">
                <Link
                  href="/settings"
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg border transition-colors",
                    activeItem === "settings"
                      ? "border-[var(--brand-primary)]/50 bg-[var(--surface-muted)] shadow-sm"
                      : "border-[var(--border-subtle)] bg-[var(--surface)] hover:border-[var(--brand-primary)]/30"
                  )}
                  title="설정"
                >
                  <Icon
                    name="settings"
                    size={18}
                    provider="phosphor"
                    className={activeItem === "settings" ? "text-[var(--brand-primary)]" : "text-[var(--text-muted)]"}
                  />
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-muted)] text-[var(--text-muted)] transition-colors hover:border-[var(--color-error)]/30 hover:bg-[var(--color-error-subtle)] hover:text-[var(--color-error)]"
                  title="로그아웃"
                >
                  <Icon name="signOut" size={18} provider="phosphor" />
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/settings"
                  className={cn(
                    "group relative flex items-center gap-3 px-3 py-3 text-sm font-medium transition-colors",
                    activeItem === "settings"
                      ? "bg-[var(--surface-muted)] text-[var(--brand-primary)]"
                      : "text-[var(--text-muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--brand-primary)]"
                  )}
                >
                  {activeItem === "settings" && (
                    <span className="absolute inset-y-2 left-0 w-1 rounded-full bg-[var(--brand-primary)]" />
                  )}
                  <span
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border-subtle)]",
                      activeItem === "settings"
                        ? "border-[var(--brand-primary)]/40 bg-[var(--surface)] shadow-sm text-[var(--brand-primary)]"
                        : "text-[var(--text-muted)]"
                    )}
                  >
                    <Icon
                      name="settings"
                      size={18}
                      provider="phosphor"
                    />
                  </span>
                  <span className="flex-1 text-[var(--text-strong)]">설정</span>
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="group relative flex items-center gap-3 px-3 py-3 text-sm font-medium text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-muted)] hover:text-[var(--color-error)]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border-subtle)] text-[var(--color-error)]">
                    <Icon name="signOut" size={18} provider="phosphor" />
                  </span>
                  <span className="flex-1 text-left text-[var(--text-strong)]">로그아웃</span>
                </button>
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

