"use client";

import { useState, useEffect } from "react";

type TermsStep = "terms" | "privacy";

interface UseTermsStepsOptions {
  /**
   * 모달이 열려있는지 여부
   */
  isOpen: boolean;
  /**
   * 모든 단계를 완료했을 때 실행할 콜백
   */
  onComplete?: () => void;
  /**
   * 완료 콜백 실행 전 대기 시간 (ms)
   * @default 500
   */
  completionDelay?: number;
}

/**
 * 약관 동의 단계 관리 훅
 *
 * @description
 * 이용약관과 개인정보처리방침 단계를 관리하고,
 * 각 단계의 스크롤 완료 상태를 추적합니다.
 * 모든 단계를 완료하면 자동으로 콜백을 실행합니다.
 */
export function useTermsSteps(options: UseTermsStepsOptions) {
  const { isOpen, onComplete, completionDelay = 500 } = options;

  const [currentStep, setCurrentStep] = useState<TermsStep>("terms");
  const [hasScrolledTerms, setHasScrolledTerms] = useState(false);
  const [hasScrolledPrivacy, setHasScrolledPrivacy] = useState(false);

  // 모달이 열릴 때 상태 리셋
  useEffect(() => {
    if (isOpen) {
      setHasScrolledTerms(false);
      setHasScrolledPrivacy(false);
      setCurrentStep("terms");
    }
  }, [isOpen]);

  // 모든 단계 완료 시 자동 동의 처리
  useEffect(() => {
    if (hasScrolledTerms && hasScrolledPrivacy && isOpen) {
      const timer = setTimeout(() => {
        onComplete?.();
      }, completionDelay);
      return () => clearTimeout(timer);
    }
  }, [hasScrolledTerms, hasScrolledPrivacy, isOpen, onComplete, completionDelay]);

  /**
   * 상태 리셋
   */
  const reset = () => {
    setCurrentStep("terms");
    setHasScrolledTerms(false);
    setHasScrolledPrivacy(false);
  };

  /**
   * 현재 단계 제목 가져오기
   */
  const getStepTitle = () => {
    switch (currentStep) {
      case "terms":
        return "SumUp 이용약관";
      case "privacy":
        return "SumUp 개인정보처리방침";
      default:
        return "약관 및 정책";
    }
  };

  /**
   * 현재 단계 번호 가져오기
   */
  const getStepNumber = () => {
    return currentStep === "terms" ? 1 : 2;
  };

  /**
   * 다음 단계로 진행할 수 있는지 여부
   */
  const canProceed = () => {
    if (currentStep === "terms") {
      return hasScrolledTerms;
    }
    return hasScrolledPrivacy;
  };

  /**
   * 모든 단계를 완료했는지 여부
   */
  const isAllCompleted = hasScrolledTerms && hasScrolledPrivacy;

  return {
    /**
     * 현재 단계
     */
    currentStep,
    /**
     * 단계 변경 함수
     */
    setCurrentStep,
    /**
     * 이용약관을 끝까지 스크롤했는지
     */
    hasScrolledTerms,
    /**
     * 이용약관 스크롤 상태 설정
     */
    setHasScrolledTerms,
    /**
     * 개인정보처리방침을 끝까지 스크롤했는지
     */
    hasScrolledPrivacy,
    /**
     * 개인정보처리방침 스크롤 상태 설정
     */
    setHasScrolledPrivacy,
    /**
     * 현재 단계 제목
     */
    stepTitle: getStepTitle(),
    /**
     * 현재 단계 번호
     */
    stepNumber: getStepNumber(),
    /**
     * 다음 단계로 진행 가능 여부
     */
    canProceed: canProceed(),
    /**
     * 모든 단계 완료 여부
     */
    isAllCompleted,
    /**
     * 상태 리셋
     */
    reset,
  };
}

