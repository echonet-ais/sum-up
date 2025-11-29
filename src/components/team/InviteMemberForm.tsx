"use client";

import * as React from "react";
import { Input } from "@hua-labs/ui";
import { Select, SelectOption } from "@hua-labs/ui";
import { Button } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import type { TeamMember } from "@/types";

export interface InviteMemberFormProps {
  onInvite: (email: string, role: "ADMIN" | "MEMBER") => Promise<void>;
  isLoading?: boolean;
}

export function InviteMemberForm({ onInvite, isLoading = false }: InviteMemberFormProps) {
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState<"ADMIN" | "MEMBER">("MEMBER");
  const [error, setError] = React.useState<string | null>(null);

  const roleOptions: Array<{ value: "ADMIN" | "MEMBER"; label: string }> = [
    { value: "MEMBER", label: "멤버" },
    { value: "ADMIN", label: "관리자" },
  ];

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
    } catch (err) {
      setError(err instanceof Error ? err.message : "멤버 초대에 실패했습니다");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-[var(--text-strong)]"
        >
          이메일 <span className="text-red-500">*</span>
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(null);
          }}
          placeholder="초대할 사용자의 이메일을 입력하세요"
          className={error ? "border-red-500" : ""}
          disabled={isLoading}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
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
