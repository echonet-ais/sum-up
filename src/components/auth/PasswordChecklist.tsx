"use client";

import React from "react";
import { Icon } from "@hua-labs/ui";
import { cn } from "../../lib/utils";
import { PASSWORD_RULES } from "@/lib/password-validation";

interface PasswordChecklistProps {
  password: string;
  confirm?: string;
  lang?: "ko" | "en";
  className?: string;
}

export function PasswordChecklist({ password, confirm, lang = "ko", className }: PasswordChecklistProps) {
  return (
    <ul className={cn("list-none p-0 m-0 space-y-2 text-sm", className)}>
      {PASSWORD_RULES.map((rule) => {
        const ok = rule.test(password);
        return (
          <li
            key={rule.key}
            className={cn(
              "flex items-center gap-2",
              ok
                ? "text-[var(--color-success)]"
                : "text-[var(--text-muted)]"
            )}
          >
            {ok ? (
              <Icon name="check-circle" className="h-4 w-4" provider="phosphor" />
            ) : (
              <span className="text-[var(--text-muted)] w-4 h-4 flex items-center justify-center">×</span>
            )}
            <span>{lang === "ko" ? rule.label.ko : rule.label.en}</span>
          </li>
        );
      })}
      {confirm !== undefined && (
        <li
          className={cn(
            "flex items-center gap-2",
            password && confirm === password
              ? "text-green-600 dark:text-green-400"
              : "text-[var(--text-muted)]"
          )}
        >
          {password && confirm === password ? (
            <Icon name="check-circle" className="h-4 w-4" provider="phosphor" />
          ) : (
            <span className="text-[var(--text-muted)] w-4 h-4 flex items-center justify-center">×</span>
          )}
          <span>{lang === "ko" ? "비밀번호 일치" : "Passwords match"}</span>
        </li>
      )}
    </ul>
  );
}

