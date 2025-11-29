"use client";

import { useState, useEffect } from "react";
import { validatePassword, getPasswordStrength, checkPasswordMatch } from "@/lib/password-validation";

interface UsePasswordValidationOptions {
  /**
   * 비밀번호
   */
  password: string;
  /**
   * 확인 비밀번호
   */
  confirmPassword?: string;
  /**
   * 비밀번호 일치 확인 여부
   * @default true
   */
  checkMatch?: boolean;
}

interface PasswordValidationResult {
  /**
   * 전체 유효성 (비밀번호 규칙 + 일치 여부)
   */
  isValid: boolean;
  /**
   * 비밀번호 규칙 유효성 (일치 여부 제외)
   */
  isPasswordValid: boolean;
  /**
   * 비밀번호 일치 여부
   */
  isMatch: boolean;
  /**
   * 에러 메시지 배열
   */
  errors: string[];
  /**
   * 비밀번호 강도
   */
  strength: "weak" | "medium" | "strong";
}

/**
 * 비밀번호 검증 훅
 *
 * @description
 * 비밀번호 규칙 검증과 확인 비밀번호 일치 여부를 확인합니다.
 * 실시간으로 검증 결과를 업데이트합니다.
 */
export function usePasswordValidation(
  options: UsePasswordValidationOptions
): PasswordValidationResult {
  const { password, confirmPassword = "", checkMatch = true } = options;

  const [validation, setValidation] = useState<PasswordValidationResult>({
    isValid: false,
    isPasswordValid: false,
    isMatch: true,
    errors: [],
    strength: "weak",
  });

  useEffect(() => {
    // 비밀번호 규칙 검증
    const passwordValidation = validatePassword(password);
    const strength = getPasswordStrength(password);

    // 비밀번호 일치 확인
    const isMatch = checkMatch
      ? checkPasswordMatch(password, confirmPassword)
      : true;

    // 에러 메시지 수집
    const allErrors = [...passwordValidation.errors];
    if (checkMatch && !isMatch && confirmPassword.length > 0) {
      allErrors.push("비밀번호가 일치하지 않습니다.");
    }

    setValidation({
      isValid: passwordValidation.isValid && isMatch,
      isPasswordValid: passwordValidation.isValid,
      isMatch,
      errors: allErrors,
      strength: strength.level,
    });
  }, [password, confirmPassword, checkMatch]);

  return validation;
}

