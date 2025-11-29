"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@hua-labs/ui";
import { Button } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import dynamic from "next/dynamic";
import { NotificationDropdown } from "@/components/notification";
import { useAuthStore } from "@/store/auth-store";
import Link from "next/link";
import Image from "next/image";
import { UserPopover } from "./UserPopover";
import { cn } from "../../lib/utils";

const GlobalSearch = dynamic(() => import("@/components/search").then((mod) => ({ default: mod.GlobalSearch })));
import { useRouter } from "next/navigation";

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  onProfileClick?: () => void;
  onLogout?: () => void;
  className?: string;
}

const Header = React.forwardRef<HTMLElement, HeaderProps>(
  (
    {
      user: propUser,
      onProfileClick,
      onLogout: propOnLogout,
      className,
      ...props
    },
    ref
  ) => {
    const router = useRouter();
    const { user: storeUser, logout } = useAuthStore();
    const user = propUser || storeUser;
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);
    
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
      if (propOnLogout) {
        propOnLogout();
      } else {
        logout();
        router.push("/login");
      }
    };

    return (
      <header
        ref={ref}
        className={cn(
          "sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800",
          "bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60",
          className
        )}
        {...props}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              SumUp
            </h1>
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
        </div>
      </header>
    );
  }
);

Header.displayName = "Header";

export { Header };

