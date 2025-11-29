"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@hua-labs/ui";
import { Input } from "@hua-labs/ui";
import { Button } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import Link from "next/link";
import { ErrorBoundary } from "@/components/common";

function ForgotPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "비밀번호 재설정 요청에 실패했습니다.");
      }

      setSuccess(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : "비밀번호 재설정 요청에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--background)] p-4 sm:p-6">
        <Card className="w-full max-w-md rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-primary)] text-white">
              <Icon name="mail" size={24} />
            </div>
            <CardTitle className="text-xl sm:text-2xl">이메일을 확인해주세요</CardTitle>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              비밀번호 재설정 링크를 이메일로 발송했습니다.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md bg-[var(--color-success-subtle)] border border-[var(--color-success)] p-3 text-sm text-[var(--color-success)]">
              {email}로 비밀번호 재설정 링크를 발송했습니다. 이메일을 확인하고 링크를 클릭하여 비밀번호를 재설정해주세요.
            </div>
            <div className="text-center space-y-2">
              <p className="text-sm text-[var(--text-muted)]">
                이메일이 오지 않았나요? 스팸 폴더를 확인해주세요.
              </p>
              <Button
                variant="outline"
                onClick={() => router.push("/login")}
                className="w-full"
              >
                로그인 페이지로 돌아가기
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
          <CardTitle className="text-xl sm:text-2xl">비밀번호 찾기</CardTitle>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            비밀번호를 재설정할 이메일 주소를 입력해주세요.
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

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Icon name="loader" size={16} className="mr-2 animate-spin" />
                  발송 중...
                </>
              ) : (
                "비밀번호 재설정 이메일 발송"
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

export default function ForgotPasswordPage() {
  return (
    <ErrorBoundary>
      <ForgotPasswordForm />
    </ErrorBoundary>
  );
}

