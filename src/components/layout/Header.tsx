"use client";

import * as React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@hua-labs/ui";
import { Button } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { Dropdown, DropdownMenu, DropdownItem } from "@hua-labs/ui";
import { Badge } from "@hua-labs/ui";
import dynamic from "next/dynamic";
import { NotificationDropdown } from "@/components/notification";
import { useAuthStore } from "@/store/auth-store";

const GlobalSearch = dynamic(() => import("@/components/search").then((mod) => ({ default: mod.GlobalSearch })));
import { useRouter } from "next/navigation";
import { cn } from "../../lib/utils";

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
              <Dropdown
                trigger={
                  <button className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <Avatar>
                      {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </button>
                }
                align="end"
              >
                <DropdownMenu className="w-56">
                  <div className="px-2 py-1.5 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                  </div>
                  <DropdownItem
                    onClick={() => {
                      if (onProfileClick) {
                        onProfileClick();
                      } else {
                        router.push("/profile");
                      }
                    }}
                  >
                    <Icon name="user" className="mr-2 h-4 w-4" />
                    프로필
                  </DropdownItem>
                  <DropdownItem onClick={handleLogout}>
                    <Icon name="logOut" className="mr-2 h-4 w-4" />
                    로그아웃
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}
          </div>
        </div>
      </header>
    );
  }
);

Header.displayName = "Header";

export { Header };

