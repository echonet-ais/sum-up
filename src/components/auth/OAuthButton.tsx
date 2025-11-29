"use client";

import * as React from "react";
import { Button } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { cn } from "../../lib/utils";

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
        // TODO: 실제 OAuth 인증 로직 구현
        // 예시: window.location.href = `/api/auth/${provider}`;
        // 현재는 Mock 토큰 생성
        const mockToken = `mock-${provider}-token-${Date.now()}`;
        onSuccess?.(mockToken);
      } catch (error) {
        onError?.(error as Error);
      } finally {
        setIsLoading(false);
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

