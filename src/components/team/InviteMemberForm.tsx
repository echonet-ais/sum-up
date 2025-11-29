"use client";

import * as React from "react";
import { Input } from "@hua-labs/ui";
import { Select, SelectOption } from "@hua-labs/ui";
import { Button } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { apiClient } from "@/lib/api/client";
import { useToast } from "@hua-labs/ui";
import type { TeamMember, User } from "@/types";

export interface InviteMemberFormProps {
  onInvite: (email: string, role: "ADMIN" | "MEMBER") => Promise<void>;
  isLoading?: boolean;
}

export function InviteMemberForm({ onInvite, isLoading = false }: InviteMemberFormProps) {
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState<"ADMIN" | "MEMBER">("MEMBER");
  const [error, setError] = React.useState<string | null>(null);
  const [searchResults, setSearchResults] = React.useState<User[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const { addToast } = useToast();
  const searchTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const roleOptions: Array<{ value: "ADMIN" | "MEMBER"; label: string }> = [
    { value: "MEMBER", label: "멤버" },
    { value: "ADMIN", label: "관리자" },
  ];

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 사용자 검색
  const searchUsers = React.useCallback(async (searchEmail: string) => {
    if (!searchEmail.trim() || !validateEmail(searchEmail)) {
      setSearchResults([]);
      setSelectedUser(null);
      return;
    }

    setIsSearching(true);
    try {
      const users = await apiClient.get<User[]>(`/api/users/search?email=${encodeURIComponent(searchEmail)}&limit=5`);
      setSearchResults(users);
      
      // 정확히 일치하는 사용자가 있으면 자동 선택
      const exactMatch = users.find((u) => u.email.toLowerCase() === searchEmail.toLowerCase());
      if (exactMatch) {
        setSelectedUser(exactMatch);
      } else {
        setSelectedUser(null);
      }
    } catch (err) {
      console.error("Error searching users:", err);
      setSearchResults([]);
      setSelectedUser(null);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // 이메일 입력 시 검색 (디바운스)
  React.useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (email.trim() && validateEmail(email)) {
      searchTimeoutRef.current = setTimeout(() => {
        searchUsers(email);
      }, 500); // 500ms 디바운스
    } else {
      setSearchResults([]);
      setSelectedUser(null);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [email, searchUsers]);

  const handleUserSelect = (user: User) => {
    setEmail(user.email);
    setSelectedUser(user);
    setSearchResults([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("이메일을 입력해주세요");
      return;
    }

    if (!validateEmail(email)) {
      setError("올바른 이메일 형식이 아닙니다");
      return;
    }

    try {
      await onInvite(email.trim(), role);
      setEmail("");
      setRole("MEMBER");
      setSelectedUser(null);
      setSearchResults([]);
      addToast({
        title: "초대 완료",
        message: selectedUser 
          ? `${selectedUser.name}님을 초대했습니다`
          : `${email}로 초대 요청을 보냈습니다`,
        type: "success",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "멤버 초대에 실패했습니다");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-[var(--text-strong)]"
        >
          이메일 <span className="text-[var(--color-error)]">*</span>
        </label>
        <div className="relative">
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null);
            }}
            placeholder="초대할 사용자의 이메일을 입력하세요"
            className={error ? "border-[var(--color-error)]" : ""}
            disabled={isLoading}
          />
          {isSearching && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Icon name="loader" size={16} className="animate-spin text-[var(--text-muted)]" />
            </div>
          )}
        </div>
        
        {/* 검색 결과 표시 */}
        {searchResults.length > 0 && !selectedUser && (
          <div className="mt-2 border border-[var(--border-subtle)] rounded-lg bg-[var(--surface)] shadow-sm max-h-48 overflow-y-auto">
            {searchResults.map((user) => (
              <button
                key={user.id}
                type="button"
                onClick={() => handleUserSelect(user)}
                className="w-full px-4 py-3 text-left hover:bg-[var(--surface-muted)] transition-colors flex items-center gap-3 border-b border-[var(--border-subtle)] last:border-b-0"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-[var(--brand-primary)] flex items-center justify-center text-white text-sm font-semibold">
                    {user.name[0]?.toUpperCase() || "U"}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--text-strong)] truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-[var(--text-muted)] truncate">
                    {user.email}
                  </p>
                </div>
                <Icon name="chevronRight" size={16} className="text-[var(--text-muted)] flex-shrink-0" />
              </button>
            ))}
          </div>
        )}

        {/* 선택된 사용자 표시 */}
        {selectedUser && (
          <div className="mt-2 px-4 py-3 border border-[var(--border-subtle)] rounded-lg bg-[var(--surface-muted)] flex items-center gap-3">
            {selectedUser.avatar ? (
              <img
                src={selectedUser.avatar}
                alt={selectedUser.name}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-[var(--brand-primary)] flex items-center justify-center text-white font-semibold">
                {selectedUser.name[0]?.toUpperCase() || "U"}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[var(--text-strong)] truncate">
                {selectedUser.name}
              </p>
              <p className="text-xs text-[var(--text-muted)] truncate">
                {selectedUser.email}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedUser(null);
                setSearchResults([]);
              }}
              className="p-1 text-[var(--text-muted)] hover:text-[var(--text-strong)] transition-colors"
            >
              <Icon name="x" size={16} />
            </button>
          </div>
        )}

        {error && (
          <p className="mt-1 text-sm text-[var(--color-error)]">{error}</p>
        )}
        
        {!selectedUser && email.trim() && validateEmail(email) && searchResults.length === 0 && !isSearching && (
          <p className="mt-1 text-xs text-[var(--text-muted)]">
            등록되지 않은 이메일입니다. 초대하면 새 계정이 생성됩니다.
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="role"
          className="mb-2 block text-sm font-medium text-[var(--text-strong)]"
        >
          역할
        </label>
        <Select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value as "ADMIN" | "MEMBER")}
          disabled={isLoading}
        >
          {roleOptions.map((option) => (
            <SelectOption key={option.value} value={option.value}>
              {option.label}
            </SelectOption>
          ))}
        </Select>
      </div>

      <Button type="submit" disabled={isLoading || !email.trim()} className="w-full">
        {isLoading ? (
          <>
            <Icon name="loader" size={16} className="mr-2 animate-spin" />
            초대 중...
          </>
        ) : (
          <>
            <Icon name="userPlus" size={16} className="mr-2" />
            멤버 초대
          </>
        )}
      </Button>
    </form>
  );
}
