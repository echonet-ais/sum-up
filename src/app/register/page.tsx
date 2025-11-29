"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@hua-labs/ui";
import { Input } from "@hua-labs/ui";
import { Button } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { Label } from "@hua-labs/ui";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { PasswordChecklist } from "@/components/auth/PasswordChecklist";
import { OAuthButton } from "@/components/auth/OAuthButton";
import { TermsModal } from "@/components/auth/TermsModal";
import { useRegisterForm } from "@/hooks/useRegisterForm";
import { usePasswordValidation } from "@/hooks/usePasswordValidation";
import { useAuthStore } from "@/store/auth-store";
import { ErrorBoundary } from "@/components/common";
import { AppLayout } from "@/components/layout";
import Link from "next/link";

function RegisterPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showTermsModal, setShowTermsModal] = useState(false);

  const {
    currentStep,
    formData,
    isLoading,
    error,
    updateFormData,
    validateEmailAndNext,
    validatePasswordAndNext,
    prevStep,
    register,
    setError,
  } = useRegisterForm();

  const passwordValidation = usePasswordValidation({
    password: formData.password,
    confirmPassword: formData.confirmPassword,
  });

  // OAuth는 리다이렉트 방식이므로 스토어 사용 불필요

  // OAuth는 리다이렉트 방식이므로 onSuccess 핸들러가 필요 없음
  // 콜백에서 자동으로 처리됨
  const handleOAuthError = (error: Error) => {
    setError(error.message || "OAuth 로그인에 실패했습니다");
  };

  // Step별 렌더링
  const renderStep = () => {
    switch (currentStep) {
      case "email":
        return (
          <>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="이메일을 입력하세요"
                  value={formData.email}
                  onChange={(e) => updateFormData({ email: e.target.value })}
                  onKeyDown={(e) =>
                    e.key === "Enter" && validateEmailAndNext()
                  }
                  disabled={isLoading}
                  autoFocus
                  className="w-full"
                />
              </div>

              {error && (
                <div className="rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
                  {error}
                </div>
              )}

              <Button
                onClick={validateEmailAndNext}
                disabled={isLoading || !formData.email}
                className="w-full"
              >
                다음
              </Button>
            </div>
          </>
        );

      case "password":
        return (
          <>
            <button
              onClick={prevStep}
              className="mb-4 text-sm text-[var(--text-muted)] hover:text-[var(--text-strong)] flex items-center transition-colors"
            >
              <Icon name="chevronLeft" className="h-4 w-4 mr-1" />
              이전으로
            </button>

            <div className="space-y-4">
              <div>
                <Label htmlFor="password">비밀번호</Label>
                <PasswordInput
                  id="password"
                  value={formData.password}
                  onChange={(e) =>
                    updateFormData({ password: e.target.value })
                  }
                  placeholder="비밀번호를 입력하세요"
                  disabled={isLoading}
                  showStrength={true}
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                <PasswordInput
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    updateFormData({ confirmPassword: e.target.value })
                  }
                  placeholder="비밀번호를 다시 입력하세요"
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    passwordValidation.isValid &&
                    validatePasswordAndNext(passwordValidation.isValid)
                  }
                  disabled={isLoading}
                  className="w-full"
                />
              </div>

              <PasswordChecklist
                password={formData.password}
                confirm={formData.confirmPassword}
              />

              {passwordValidation.errors.length > 0 &&
                formData.password && (
                  <div className="text-sm space-y-1">
                    {passwordValidation.errors.map((error, i) => (
                      <p
                        key={i}
                        className="text-red-600 dark:text-red-400"
                      >
                        {error}
                      </p>
                    ))}
                  </div>
                )}

              {error && (
                <div className="rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
                  {error}
                </div>
              )}

              <Button
                onClick={() =>
                  validatePasswordAndNext(passwordValidation.isValid)
                }
                disabled={isLoading || !passwordValidation.isValid}
                className="w-full"
              >
                다음
              </Button>
            </div>
          </>
        );

      case "terms":
        return (
          <>
            <button
              onClick={prevStep}
              className="mb-4 text-sm text-[var(--text-muted)] hover:text-[var(--text-strong)] flex items-center transition-colors"
            >
              <Icon name="chevronLeft" className="h-4 w-4 mr-1" />
              이전으로
            </button>

            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={(e) =>
                    updateFormData({ agreeToTerms: e.target.checked })
                  }
                  className="mt-1 w-4 h-4"
                  disabled={isLoading}
                />
                <label
                  htmlFor="agreeToTerms"
                  className="text-sm text-[var(--text-strong)] cursor-pointer"
                >
                  <button
                    type="button"
                    onClick={() => setShowTermsModal(true)}
                    className="text-[var(--brand-primary)] hover:underline"
                  >
                    이용약관
                  </button>
                  에 동의합니다.
                </label>
              </div>

              {error && (
                <div className="rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
                  {error}
                </div>
              )}

              <Button
                onClick={register}
                disabled={isLoading || !formData.agreeToTerms}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Icon name="loader" size={16} className="mr-2 animate-spin" />
                    회원가입 중...
                  </>
                ) : (
                  "회원가입"
                )}
              </Button>
            </div>
          </>
        );

      case "complete":
        return (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
              <Icon
                name="check-circle"
                className="h-8 w-8 text-green-600 dark:text-green-400"
              />
            </div>
            <h3 className="text-xl font-semibold text-[var(--text-strong)]">
              회원가입 완료!
            </h3>
            <p className="text-[var(--text-muted)]">
              이메일 인증 페이지로 이동합니다...
            </p>
            <p className="text-sm text-[var(--text-muted)]">
              이메일을 확인하여 인증을 완료해주세요.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)] p-4">
        <Card className="w-full max-w-md rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-primary)] text-white">
            <span className="text-xl font-semibold">S</span>
          </div>
          <CardTitle className="text-2xl">SumUp 회원가입</CardTitle>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            이미 계정이 있으신가요?{" "}
            <Link
              href="/login"
              className="text-[var(--brand-primary)] hover:underline"
            >
              로그인
            </Link>
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {renderStep()}

          {currentStep !== "complete" && (
            <>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[var(--border-subtle)]" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[var(--surface)] px-2 text-[var(--text-muted)]">
                    또는
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <OAuthButton
                  provider="kakao"
                  onError={(error) => setError(error.message)}
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <TermsModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        onAgree={() => {
          updateFormData({ agreeToTerms: true });
          setShowTermsModal(false);
        }}
      />
      </div>
  );
}

function RegisterPageWrapper() {
  const { isAuthenticated } = useAuthStore();

  // 로그인되어 있으면 AppLayout으로 감싸기
  if (isAuthenticated) {
    return (
      <AppLayout>
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
          <RegisterPageContent />
        </div>
      </AppLayout>
    );
  }

  // 로그인 안 되어 있으면 독립적으로 렌더링
  return (
    <ErrorBoundary>
      <RegisterPageContent />
    </ErrorBoundary>
  );
}

export default function RegisterPage() {
  return (
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
      <RegisterPageWrapper />
    </Suspense>
  );
}

