"use client";

import { useState, useCallback } from "react";
import type { ValidationResult } from "@/lib/utils/validation";

export interface UseFormValidationOptions<T extends Record<string, unknown>> {
  validateForm: (data: T) => ValidationResult;
  validateField?: (field: keyof T, value: T[keyof T], data: T) => string | null;
  validateOnBlur?: boolean; // blur 시 검증 여부 (기본값: true)
  validateOnChange?: boolean; // change 시 검증 여부 (기본값: false)
}

export interface UseFormValidationReturn<T extends Record<string, unknown>> {
  errors: Record<string, string>;
  touched: Record<string, boolean>; // 필드가 한 번이라도 포커스되었는지 여부
  validateField: (field: keyof T, value: T[keyof T], formData: T) => void;
  validateForm: (formData: T) => boolean;
  handleBlur: (field: keyof T, formData?: T) => void;
  handleChange: (field: keyof T, value: T[keyof T], formData: T) => void;
  clearError: (field: keyof T) => void;
  clearAllErrors: () => void;
  setErrors: (errors: Record<string, string>) => void;
}

/**
 * 폼 검증을 위한 커스텀 훅
 * 실시간 검증 및 에러 상태 관리 제공
 */
export function useFormValidation<T extends Record<string, unknown>>(
  options: UseFormValidationOptions<T>
): UseFormValidationReturn<T> {
  const {
    validateForm: validateFormFn,
    validateField: validateFieldFn,
    validateOnBlur = true,
    validateOnChange = false,
  } = options;

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // 단일 필드 검증
  const validateField = useCallback(
    (field: keyof T, value: T[keyof T], formData: T) => {
      // 커스텀 필드 검증 함수가 있으면 사용
      if (validateFieldFn) {
        const error = validateFieldFn(field, value, formData);
        if (error) {
          setErrors((prev) => ({ ...prev, [field]: error }));
          return;
        }
      }

      // 전체 폼 검증에서 해당 필드만 추출
      const validation = validateFormFn(formData);
      const fieldError = validation.errors[field as string];

      if (fieldError) {
        setErrors((prev) => ({ ...prev, [field]: fieldError }));
      } else {
        // 에러가 없으면 해당 필드 에러 제거
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field as string];
          return newErrors;
        });
      }
    },
    [validateFormFn, validateFieldFn]
  );

  // 전체 폼 검증
  const validateForm = useCallback(
    (formData: T): boolean => {
      const validation = validateFormFn(formData);
      setErrors(validation.errors);
      return validation.isValid;
    },
    [validateFormFn]
  );

  // 필드 blur 핸들러 (formData를 받는 버전)
  const handleBlur = useCallback(
    (field: keyof T, formData?: T) => {
      setTouched((prev) => ({ ...prev, [field]: true }));

      if (validateOnBlur && formData) {
        const value = formData[field];
        validateField(field, value, formData);
      }
    },
    [validateOnBlur, validateField]
  );

  // 필드 change 핸들러 (에러 초기화 및 선택적 검증)
  const handleChange = useCallback(
    (field: keyof T, value: T[keyof T], formData: T) => {
      // 에러 초기화
      if (errors[field as string]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field as string];
          return newErrors;
        });
      }

      // change 시 검증 (선택적)
      if (validateOnChange && touched[field as string]) {
        validateField(field, value, formData);
      }
    },
    [errors, touched, validateOnChange, validateField]
  );

  // 특정 필드 에러 제거
  const clearError = useCallback((field: keyof T) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field as string];
      return newErrors;
    });
  }, []);

  // 모든 에러 제거
  const clearAllErrors = useCallback(() => {
    setErrors({});
    setTouched({});
  }, []);

  return {
    errors,
    touched,
    validateField,
    validateForm,
    handleBlur,
    handleChange,
    clearError,
    clearAllErrors,
    setErrors,
  };
}

