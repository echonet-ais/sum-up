"use client";

import React from "react";
import { Icon } from "@hua-labs/ui";
import { cn } from "../../lib/utils";

interface PasswordChecklistProps {
  password: string;
  confirm?: string;
  lang?: "ko" | "en";
  className?: string;
}

const specials = "!@#$%^&*()_+-=[]{}|;:,.<>?";

const checklist = [
  {
    key: "length",
    test: (pw: string) => pw.length >= 8,
    ko: "8자 이상",
    en: "At least 8 characters",
  },
  {
    key: "upper",
    test: (pw: string) => /[A-Z]/.test(pw),
    ko: "대문자 포함",
    en: "Uppercase letter",
  },
  {
    key: "lower",
    test: (pw: string) => /[a-z]/.test(pw),
    ko: "소문자 포함",
    en: "Lowercase letter",
  },
  {
    key: "number",
    test: (pw: string) => /[0-9]/.test(pw),
    ko: "숫자 포함",
    en: "Number",
  },
  {
    key: "special",
    test: (pw: string) => {
      const specialRegex = new RegExp(`[${specials.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}]`);
      return specialRegex.test(pw);
    },
    ko: `특수문자 포함 (${specials})`,
    en: `Special character (${specials})`,
  },
];

export function PasswordChecklist({ password, confirm, lang = "ko", className }: PasswordChecklistProps) {
  return (
    <ul className={cn("list-none p-0 m-0 space-y-2 text-sm", className)}>
      {checklist.map((item) => {
        const ok = item.test(password);
        return (
          <li
            key={item.key}
            className={cn(
              "flex items-center gap-2",
              ok
                ? "text-green-600 dark:text-green-400"
                : "text-[var(--text-muted)]"
            )}
          >
            {ok ? (
              <Icon name="check-circle" className="h-4 w-4" />
            ) : (
              <span className="text-[var(--text-muted)] w-4 h-4 flex items-center justify-center">×</span>
            )}
            <span>{lang === "ko" ? item.ko : item.en}</span>
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
            <Icon name="check-circle" className="h-4 w-4" />
          ) : (
            <span className="text-[var(--text-muted)] w-4 h-4 flex items-center justify-center">×</span>
          )}
          <span>{lang === "ko" ? "비밀번호 일치" : "Passwords match"}</span>
        </li>
      )}
    </ul>
  );
}

