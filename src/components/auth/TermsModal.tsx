"use client";

import React, { useEffect } from "react";
import { Modal, Button, Icon } from "@hua-labs/ui";
import { useScrollDetection, useTermsSteps } from "@/hooks";
import { TermsContent, PrivacyContent } from "@/constants/terms-content";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAgree?: () => void;
  children?: React.ReactNode; // 커스텀 컨텐츠 지원
}

export function TermsModal({
  isOpen,
  onClose,
  onAgree,
  children,
}: TermsModalProps) {
  const {
    currentStep,
    setCurrentStep,
    hasScrolledTerms,
    setHasScrolledTerms,
    hasScrolledPrivacy,
    setHasScrolledPrivacy,
    stepTitle,
    stepNumber,
    canProceed,
    isAllCompleted,
    reset,
  } = useTermsSteps({
    isOpen,
    onComplete: onAgree,
  });

  // Terms 단계 스크롤 감지
  const termsScroll = useScrollDetection({
    isActive: isOpen && currentStep === "terms",
    onScrollToEnd: () => {
      if (currentStep === "terms") {
        setHasScrolledTerms(true);
      }
    },
  });

  // Privacy 단계 스크롤 감지
  const privacyScroll = useScrollDetection({
    isActive: isOpen && currentStep === "privacy",
    onScrollToEnd: () => {
      if (currentStep === "privacy") {
        setHasScrolledPrivacy(true);
      }
    },
  });

  // 현재 단계에 맞는 ref 선택
  const scrollContainerRef =
    currentStep === "terms"
      ? termsScroll.scrollContainerRef
      : privacyScroll.scrollContainerRef;

  // 모달 열릴 때 body 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // 단계 변경 시 스크롤 위치 초기화
  useEffect(() => {
    if (currentStep === "terms") {
      termsScroll.resetScroll();
    } else {
      privacyScroll.resetScroll();
    }
  }, [currentStep, termsScroll, privacyScroll]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleAgree = () => {
    onAgree?.();
    handleClose();
  };

  const handleNext = () => {
    if (currentStep === "terms" && hasScrolledTerms) {
      setCurrentStep("privacy");
    }
  };

  const handleBack = () => {
    if (currentStep === "privacy") {
      setCurrentStep("terms");
    }
  };

  const renderContent = () => {
    if (children) {
      return children;
    }

    if (currentStep === "terms") {
      return <TermsContent />;
    } else if (currentStep === "privacy") {
      return <PrivacyContent />;
    }

    return null;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={stepTitle}
      description={`${stepNumber}/2 단계`}
      size="xl"
      showCloseButton={true}
    >
      {/* 스크롤 컨테이너 */}
      <div
        ref={scrollContainerRef}
        className="max-h-[60vh] overflow-y-auto p-6 bg-[var(--background-subtle)] rounded-lg"
      >
        {renderContent()}
      </div>

      {/* 하단 버튼 */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex gap-2">
          {/* 뒤로가기 버튼 (개인정보처리방침 단계에만 표시) */}
          {currentStep === "privacy" && (
            <Button
              onClick={handleBack}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Icon name="chevronLeft" className="h-4 w-4" />
              이전
            </Button>
          )}
        </div>

        <div className="flex gap-2">
          {/* 다음 버튼 (이용약관 단계에만 표시) */}
          {currentStep === "terms" && (
            <Button
              onClick={handleNext}
              disabled={!canProceed}
              className="flex items-center gap-2"
            >
              다음
              <Icon name="chevronRight" className="h-4 w-4" />
            </Button>
          )}

          {/* 동의 버튼 (개인정보처리방침 단계에만 표시) */}
          {currentStep === "privacy" && (
            <Button
              onClick={handleAgree}
              disabled={!isAllCompleted}
              className="bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] text-white"
            >
              동의하고 시작하기
            </Button>
          )}
        </div>
      </div>

      {/* 진행 상태 표시 */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <div
          className={`h-2 w-2 rounded-full ${
            hasScrolledTerms
              ? "bg-[var(--brand-primary)]"
              : "bg-[var(--border-subtle)]"
          }`}
        />
        <div
          className={`h-2 w-2 rounded-full ${
            hasScrolledPrivacy
              ? "bg-[var(--brand-primary)]"
              : "bg-[var(--border-subtle)]"
          }`}
        />
      </div>

      {/* 안내 메시지 */}
      {!canProceed && (
        <p className="mt-2 text-xs text-center text-[var(--text-muted)]">
          {currentStep === "terms"
            ? "내용을 끝까지 읽어주세요"
            : "내용을 끝까지 읽으면 자동으로 동의됩니다"}
        </p>
      )}
    </Modal>
  );
}

