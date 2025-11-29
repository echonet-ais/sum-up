"use client";

import * as React from "react";
import { Button } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { cn } from "../../lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface SidebarItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
}

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: SidebarItem[];
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ items, isOpen = true, onClose, className, ...props }, ref) => {
    const pathname = usePathname();

    return (
      <>
        {/* Mobile Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
        )}

        {/* Sidebar */}
        <div
          ref={ref}
          role="complementary"
          aria-label="사이드바 네비게이션"
          className={cn(
            "fixed lg:sticky top-0 left-0 z-50 h-screen",
            "bg-[var(--surface)] border-r border-[var(--border-subtle)]",
            "transition-transform duration-300 ease-in-out",
            isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
            "w-64 flex flex-col",
            className
          )}
          {...props}
        >
          <div className="p-4 border-b border-[var(--border-subtle)] flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[var(--text-strong)]">
              메뉴
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="lg:hidden"
            >
              <Icon name="close" className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {items.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                        isActive
                          ? "bg-[var(--brand-primary-subtle)] text-[var(--brand-primary)]"
                          : "text-[var(--text-strong)] hover:bg-[var(--surface-muted)]",
                        className
                      )}
                      onClick={onClose}
                    >
                      <Icon name={item.icon} className="h-5 w-5" />
                      <span className="flex-1">{item.label}</span>
                      {item.badge && item.badge > 0 && (
                        <span className="bg-[var(--brand-primary-subtle)] text-[var(--brand-primary)] text-xs font-semibold px-2 py-0.5 rounded-full">
                          {item.badge > 9 ? "9+" : item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </>
    );
  }
);

Sidebar.displayName = "Sidebar";

export { Sidebar };

