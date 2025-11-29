"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@hua-labs/ui";
import { Input } from "@hua-labs/ui";
import { Button } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { OAuthButton, PasswordInput } from "@/components/auth";
import { useAuthStore } from "@/store/auth-store";
import { ErrorState, ErrorBoundary, LoadingState } from "@/components/common";
import { AppLayout } from "@/components/layout";
import { supabase } from "@/lib/supabase/client";
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
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)] p-4 sm:p-6">
        <Card className="w-full max-w-md rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-primary)] text-white">
            <span className="text-xl font-semibold">L</span>
          </div>
          <CardTitle className="text-xl sm:text-2xl">SumUp에 로그인</CardTitle>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            계정이 없으신가요?{" "}
            <Link href="/register" className="text-[var(--brand-primary)] hover:underline">
              회원가입
            </Link>
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {displayError && (
            <div className="rounded-md bg-[var(--color-error-subtle)] border border-[var(--color-error)] p-3 text-sm text-[var(--color-error)]">
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
              provider="google"
              onError={(error) => setLocalError(error.message)}
            />
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
  const router = useRouter();
  const { user, isAuthenticated, setUser, setToken } = useAuthStore();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // 스토어에 사용자 정보가 있으면 대시보드로 리다이렉트
      if (isAuthenticated || user) {
        router.replace("/dashboard");
        return;
      }

      // Supabase 세션 확인
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session) {
        // 세션이 없으면 로그인 폼 표시
        setIsCheckingAuth(false);
        return;
      }

      // 세션이 있지만 스토어에 사용자 정보가 없는 경우
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        // 사용자 프로필 가져오기
        const { data: profile } = await supabase
          .from("users")
          .select("*")
          .eq("id", authUser.id)
          .single();

        // 스토어에 사용자 정보 저장
        setUser({
          id: authUser.id,
          email: authUser.email!,
          name: profile?.name || authUser.user_metadata?.name || "사용자",
          avatar: profile?.avatar || authUser.user_metadata?.avatar_url,
          role: profile?.role || "MEMBER",
        });
        setToken(session.access_token);

        // 대시보드로 리다이렉트
        router.replace("/dashboard");
      } else {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, [router, user, isAuthenticated, setUser, setToken]);

  // 인증 확인 중
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingState message="인증 상태 확인 중..." />
      </div>
    );
  }

  // 로그인 안 되어 있으면 로그인 폼 표시
  return (
    <ErrorBoundary>
      <LoginForm />
    </ErrorBoundary>
  );
}

