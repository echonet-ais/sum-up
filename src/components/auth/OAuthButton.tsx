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
    color: "bg-white hover:bg-gray-50 text-gray-700 border border-gray-300",
  },
  github: {
    label: "GitHub로 계속하기",
    icon: "github" as const,
    color: "bg-gray-900 hover:bg-gray-800 text-white",
  },
  kakao: {
    label: "카카오로 계속하기",
    icon: "message" as const,
    color: "bg-yellow-400 hover:bg-yellow-500 text-gray-900",
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
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: provider,
          options: {
            redirectTo: `${window.location.origin}/auth/callback`,
          },
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

