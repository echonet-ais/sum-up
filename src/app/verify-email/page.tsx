"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@hua-labs/ui";
import { Button } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import Link from "next/link";
import { apiClient } from "@/lib/api/client";
import { ErrorBoundary } from "@/components/common";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleResend = async () => {
    if (!email) return;

    setIsResending(true);
    setError("");
    setResendSuccess(false);

    try {
      await apiClient.post("/api/auth/verify-email", { email });
      setResendSuccess(true);
    } catch (err: any) {
      if (err.status === 429) {
        setError(
          err.response?.error ||
            "보안을 위해 잠시 후 다시 시도해주세요. (최소 8초 대기)"
        );
      } else {
        setError(
          err.response?.error || "이메일 재전송에 실패했습니다. 다시 시도해주세요."
        );
      }
    } finally {
      setIsResending(false);
    }
  };

  const handleCheckStatus = () => {
    // 이메일 인증 확인 후 로그인 페이지로 이동
    router.push(`/login?email=${encodeURIComponent(email || "")}`);
  };

  if (!email) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--background)] p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>이메일 주소가 필요합니다</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-[var(--text-muted)] mb-4">
              이메일 인증 페이지로 올바르게 접근해주세요.
            </p>
            <Button onClick={() => router.push("/register")} className="w-full">
              회원가입으로 돌아가기
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="flex min-h-screen items-center justify-center bg-[var(--background)] p-4">
        <Card className="w-full max-w-md rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--brand-primary)]/10">
            <Icon
              name="mail"
              className="h-8 w-8 text-[var(--brand-primary)]"
            />
          </div>
          <CardTitle className="text-2xl">이메일 인증이 필요합니다</CardTitle>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            {email}로 인증 링크를 보냈습니다.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4">
            <div className="flex items-start">
              <Icon
                name="info"
                className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5"
              />
              <div className="text-sm text-blue-800 dark:text-blue-200">
                <p className="font-semibold mb-1">다음 단계:</p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>이메일 받은편지함을 확인해주세요</li>
                  <li>인증 링크를 클릭해주세요</li>
                  <li>인증 완료 후 로그인해주세요</li>
                </ol>
              </div>
            </div>
          </div>

          {resendSuccess && (
            <div className="rounded-md bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-3 text-sm text-green-800 dark:text-green-200">
              이메일 인증 링크를 재전송했습니다. 받은편지함을 확인해주세요.
            </div>
          )}

          {error && (
            <div className="rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3 text-sm text-red-800 dark:text-red-400">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Button
              onClick={handleResend}
              disabled={isResending}
              variant="outline"
              className="w-full"
            >
              {isResending ? (
                <>
                  <Icon name="loader" size={16} className="mr-2 animate-spin" />
                  재전송 중...
                </>
              ) : (
                <>
                  <Icon name="refresh" size={16} className="mr-2" />
                  인증 링크 재전송
                </>
              )}
            </Button>

            <Button
              onClick={handleCheckStatus}
              className="w-full"
            >
              <Icon name="check" size={16} className="mr-2" />
              인증 완료 확인
            </Button>
          </div>

          <div className="text-center text-sm text-[var(--text-muted)]">
            <p>
              이미 인증을 완료하셨나요?{" "}
              <Link
                href={`/login?email=${encodeURIComponent(email)}`}
                className="text-[var(--brand-primary)] hover:underline"
              >
                로그인하기
              </Link>
            </p>
          </div>
        </CardContent>
        </Card>
      </div>
    </ErrorBoundary>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Icon
              name="loader"
              size={48}
              className="animate-spin mx-auto text-[var(--brand-primary)]"
            />
            <p className="mt-4 text-[var(--text-muted)]">로딩 중...</p>
          </div>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}

