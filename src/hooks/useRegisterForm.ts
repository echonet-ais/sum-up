"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@hua-labs/ui";
import { useAuthStore } from "@/store/auth-store";

export type RegisterStep = "email" | "password" | "terms" | "complete";

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

interface UseRegisterFormOptions {
  /**
   * 초기 step
   * @default 'email'
   */
  initialStep?: RegisterStep;
  /**
   * 회원가입 성공 시 콜백
   */
  onSuccess?: () => void;
  /**
   * 회원가입 실패 시 콜백
   */
  onError?: (error: string) => void;
}

/**
 * 회원가입 Form 관리 훅
 *
 * @description
 * 회원가입 폼의 상태와 step을 관리합니다.
 * 이메일, 비밀번호, 약관 동의 단계를 순차적으로 진행합니다.
 */
export function useRegisterForm(options: UseRegisterFormOptions = {}) {
  const { initialStep = "email", onSuccess, onError } = options;
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addToast } = useToast();
  const { register: registerUser } = useAuthStore();

  const [currentStep, setCurrentStep] = useState<RegisterStep>(initialStep);
  const [formData, setFormData] = useState<RegisterFormData>({
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * Form 데이터 업데이트
   */
  const updateFormData = (updates: Partial<RegisterFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
    setError(""); // 입력 시 에러 초기화
  };

  /**
   * 다음 step으로 이동
   */
  const nextStep = () => {
    const steps: RegisterStep[] = ["email", "password", "terms", "complete"];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
      setError("");
    }
  };

  /**
   * 이전 step으로 이동
   */
  const prevStep = () => {
    const steps: RegisterStep[] = ["email", "password", "terms", "complete"];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
      setError("");
    }
  };

  /**
   * 특정 step으로 이동
   */
  const goToStep = (step: RegisterStep) => {
    setCurrentStep(step);
    setError("");
  };

  /**
   * 이메일 검증 및 다음 단계로
   */
  const validateEmailAndNext = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      setError("올바른 이메일 형식을 입력해주세요.");
      return false;
    }
    nextStep();
    return true;
  };

  /**
   * 비밀번호 검증 및 다음 단계로
   */
  const validatePasswordAndNext = (isPasswordValid: boolean) => {
    if (!isPasswordValid) {
      setError("비밀번호 요구사항을 모두 충족해주세요.");
      return false;
    }
    nextStep();
    return true;
  };

  /**
   * 회원가입 API 호출
   */
  const register = async () => {
    if (!formData.agreeToTerms) {
      setError("약관에 동의해주세요.");
      return false;
    }

    setIsLoading(true);
    setError("");

    try {
      await registerUser(formData.email, formData.password);

      // 성공 - 이메일 인증 대기 페이지로 이동
      goToStep("complete");
      onSuccess?.();

      // 2초 후 이메일 인증 대기 페이지로 이동
      setTimeout(() => {
        router.push(`/verify-email?email=${encodeURIComponent(formData.email)}`);
      }, 2000);

      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "회원가입에 실패했습니다.";
      setError(errorMessage);
      onError?.(errorMessage);

      addToast({
        title: "회원가입 실패",
        message: errorMessage,
        type: "error",
      });

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // State
    currentStep,
    formData,
    isLoading,
    error,

    // Actions
    updateFormData,
    nextStep,
    prevStep,
    goToStep,
    setError,
    validateEmailAndNext,
    validatePasswordAndNext,
    register,
  };
}

