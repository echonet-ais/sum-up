"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@hua-labs/ui";
import { Input } from "@hua-labs/ui";
import { Button } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { OAuthButton, PasswordInput } from "@/components/auth";
import { useAuthStore } from "@/store/auth-store";
import { ErrorState, ErrorBoundary } from "@/components/common";
import { AppLayout } from "@/components/layout";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuthStore();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearError();

    try {
      await login(email, password);
      router.push("/");
      router.refresh();
    } catch (error) {
      setLocalError(error instanceof Error ? error.message : "로그인에 실패했습니다");
    }
  };

  // OAuth는 리다이렉트 방식이므로 onSuccess 핸들러가 필요 없음
  // 콜백에서 자동으로 처리됨
  const handleOAuthError = (error: Error) => {
    setLocalError(error.message || "OAuth 로그인에 실패했습니다");
  };

  const displayError = error || localError;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)] p-4">
        <Card className="w-full max-w-md rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-primary)] text-white">
            <span className="text-xl font-semibold">L</span>
          </div>
          <CardTitle className="text-2xl">SumUp에 로그인</CardTitle>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            계정이 없으신가요?{" "}
            <Link href="/register" className="text-[var(--brand-primary)] hover:underline">
              회원가입
            </Link>
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {displayError && (
            <div className="rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
              {displayError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--text-strong)] mb-1">
                이메일
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={isLoading}
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[var(--text-strong)] mb-1">
                비밀번호
              </label>
              <PasswordInput
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                required
                disabled={isLoading}
                className="w-full"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <input type="checkbox" className="w-4 h-4" />
                <span>로그인 상태 유지</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-[var(--brand-primary)] hover:underline"
              >
                비밀번호 찾기
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Icon name="loader" size={16} className="mr-2 animate-spin" />
                  로그인 중...
                </>
              ) : (
                "로그인"
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--border-subtle)]" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[var(--surface)] px-2 text-[var(--text-muted)]">또는</span>
            </div>
          </div>

          <div className="space-y-2">
            <OAuthButton
              provider="kakao"
              onError={(error) => setLocalError(error.message)}
            />
          </div>
        </CardContent>
        </Card>
      </div>
  );
}

export default function LoginPage() {
  const { isAuthenticated } = useAuthStore();

  // 로그인되어 있으면 AppLayout으로 감싸기
  if (isAuthenticated) {
    return (
      <AppLayout>
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
          <LoginForm />
        </div>
      </AppLayout>
    );
  }

  // 로그인 안 되어 있으면 독립적으로 렌더링
  return (
    <ErrorBoundary>
      <LoginForm />
    </ErrorBoundary>
  );
}

