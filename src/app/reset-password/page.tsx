"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@hua-labs/ui";
import { Button } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { PasswordInput } from "@/components/auth";
import { ErrorBoundary } from "@/components/common";
import Link from "next/link";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);

  useEffect(() => {
    // URL에서 토큰 확인 (Supabase는 자동으로 처리하지만, 페이지 로드 확인용)
    const hash = window.location.hash;
    const token = searchParams.get("token") || (hash.includes("access_token") ? "valid" : null);
    
    if (!token && !hash.includes("access_token")) {
      setTokenValid(false);
      setError("유효하지 않은 링크입니다. 비밀번호 재설정을 다시 요청해주세요.");
    } else {
      setTokenValid(true);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 비밀번호 확인
    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 비밀번호 강도 검증
    if (password.length < 8) {
      setError("비밀번호는 최소 8자 이상이어야 합니다.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "비밀번호 재설정에 실패했습니다.");
      }

      setSuccess(true);
      
      // 3초 후 로그인 페이지로 이동
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      setError(error instanceof Error ? error.message : "비밀번호 재설정에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  if (tokenValid === false) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--background)] p-4 sm:p-6">
        <Card className="w-full max-w-md rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-error)] text-white">
              <Icon name="alert-circle" size={24} />
            </div>
            <CardTitle className="text-xl sm:text-2xl">유효하지 않은 링크</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md bg-[var(--color-error-subtle)] border border-[var(--color-error)] p-3 text-sm text-[var(--color-error)]">
              {error || "비밀번호 재설정 링크가 만료되었거나 유효하지 않습니다."}
            </div>
            <div className="text-center space-y-2">
              <Button
                variant="outline"
                onClick={() => router.push("/forgot-password")}
                className="w-full"
              >
                비밀번호 재설정 다시 요청
              </Button>
              <Link
                href="/login"
                className="block text-sm text-[var(--brand-primary)] hover:underline"
              >
                로그인 페이지로 돌아가기
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--background)] p-4 sm:p-6">
        <Card className="w-full max-w-md rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-success)] text-white">
              <Icon name="check" size={24} />
            </div>
            <CardTitle className="text-xl sm:text-2xl">비밀번호 재설정 완료</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md bg-[var(--color-success-subtle)] border border-[var(--color-success)] p-3 text-sm text-[var(--color-success)]">
              비밀번호가 성공적으로 변경되었습니다. 로그인 페이지로 이동합니다.
            </div>
            <div className="text-center">
              <Button
                onClick={() => router.push("/login")}
                className="w-full"
              >
                로그인 페이지로 이동
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)] p-4 sm:p-6">
      <Card className="w-full max-w-md rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-primary)] text-white">
            <Icon name="lock" size={24} />
          </div>
          <CardTitle className="text-xl sm:text-2xl">새 비밀번호 설정</CardTitle>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            새로운 비밀번호를 입력해주세요.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="rounded-md bg-[var(--color-error-subtle)] border border-[var(--color-error)] p-3 text-sm text-[var(--color-error)]">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[var(--text-strong)] mb-1">
                새 비밀번호
              </label>
              <PasswordInput
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="최소 8자 이상"
                required
                disabled={isLoading}
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[var(--text-strong)] mb-1">
                비밀번호 확인
              </label>
              <PasswordInput
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="비밀번호를 다시 입력하세요"
                required
                disabled={isLoading}
                className="w-full"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Icon name="loader" size={16} className="mr-2 animate-spin" />
                  재설정 중...
                </>
              ) : (
                "비밀번호 재설정"
              )}
            </Button>
          </form>

          <div className="text-center">
            <Link
              href="/login"
              className="text-sm text-[var(--brand-primary)] hover:underline"
            >
              로그인 페이지로 돌아가기
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <Icon name="loader" size={48} className="animate-spin mx-auto text-[var(--brand-primary)]" />
              <p className="mt-4 text-[var(--text-muted)]">로딩 중...</p>
            </div>
          </div>
        }
      >
        <ResetPasswordForm />
      </Suspense>
    </ErrorBoundary>
  );
}

