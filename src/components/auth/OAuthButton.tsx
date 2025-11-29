"use client";

import * as React from "react";
import { Button } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { cn } from "../../lib/utils";
import { supabase } from "@/lib/supabase/client";

export interface OAuthButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onError"> {
  provider: "google" | "github" | "kakao";
  onSuccess?: (token: string) => void;
  onError?: (error: Error) => void;
  className?: string;
}

const providerConfig = {
  google: {
    label: "Google로 계속하기",
    icon: "chrome" as const,
    color: "bg-[var(--surface)] hover:bg-[var(--surface-muted)] text-[var(--text-strong)] border border-[var(--border-subtle)]",
  },
  github: {
    label: "GitHub로 계속하기",
    icon: "github" as const,
    color: "bg-[var(--surface-dark)] hover:bg-[var(--surface-dark-hover)] text-white",
  },
  kakao: {
    label: "카카오로 계속하기",
    icon: "message" as const,
    color: "bg-[#FEE500] hover:bg-[#FEE500]/90 text-[#000000] dark:text-[#000000]", // 카카오 브랜드 컬러 유지 (다크모드에서도 검정 텍스트)
  },
};

const OAuthButton = React.forwardRef<HTMLButtonElement, OAuthButtonProps>(
  ({ provider, onSuccess, onError, className, ...props }, ref) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const config = providerConfig[provider];

    const handleClick = async () => {
      setIsLoading(true);
      try {
        // Supabase OAuth 로그인
        // 카카오의 경우 이메일이 선택 동의 항목이므로 이메일 스코프를 제외
        const oAuthOptions: any = {
          redirectTo: `${window.location.origin}/auth/callback`,
        };

        // 카카오 OAuth의 경우 이메일 스코프 제외
        if (provider === "kakao") {
          // 카카오 기본 스코프만 요청 (이메일 제외)
          // profile_nickname, profile_image는 기본으로 포함됨
          oAuthOptions.queryParams = {
            scope: "profile_nickname,profile_image", // account_email 제외
          };
        }

        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: provider,
          options: oAuthOptions,
        });

        if (error) {
          setIsLoading(false);
          // 에러 메시지 개선
          let errorMessage = error.message;
          if (error.message?.includes("not enabled") || error.message?.includes("Unsupported provider")) {
            errorMessage = `${provider === "kakao" ? "카카오" : provider === "google" ? "구글" : "깃허브"} OAuth가 활성화되지 않았습니다. Supabase 대시보드에서 OAuth 제공자를 활성화해주세요.`;
          }
          onError?.(new Error(errorMessage));
          return;
        }

        // OAuth 리다이렉트가 시작되면 페이지가 이동하므로
        // 로딩 상태는 유지됨 (페이지 이동 후 콜백에서 처리)
        // onSuccess는 호출하지 않음 (콜백에서 처리)
      } catch (error) {
        setIsLoading(false);
        onError?.(error as Error);
      }
    };

    return (
      <Button
        ref={ref}
        type="button"
        variant="outline"
        onClick={handleClick}
        disabled={isLoading}
        className={cn(
          "w-full flex items-center justify-center gap-2",
          config.color,
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <Icon name="loader" className="h-4 w-4 animate-spin" />
            <span>연결 중...</span>
          </>
        ) : (
          <>
            <Icon name={config.icon} className="h-4 w-4" />
            <span>{config.label}</span>
          </>
        )}
      </Button>
    );
  }
);

OAuthButton.displayName = "OAuthButton";

export { OAuthButton };

