"use client";

import * as React from "react";
import { PasswordInput } from "@/components/auth";
import { Button } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { useToast } from "@hua-labs/ui";

export function PasswordChangeForm() {
  const { addToast } = useToast();

  const [formData, setFormData] = React.useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "현재 비밀번호를 입력해주세요";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "새 비밀번호를 입력해주세요";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "비밀번호는 8자 이상이어야 합니다";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호 확인을 입력해주세요";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다";
    }

    if (formData.currentPassword && formData.newPassword === formData.currentPassword) {
      newErrors.newPassword = "새 비밀번호는 현재 비밀번호와 달라야 합니다";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      addToast({
        title: "유효성 검사 실패",
        message: "입력값을 확인해주세요",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: 실제 API 엔드포인트로 교체
      // await apiClient.put("/users/password", {
      //   currentPassword: formData.currentPassword,
      //   newPassword: formData.newPassword,
      // });

      addToast({
        title: "성공",
        message: "비밀번호가 변경되었습니다",
        type: "success",
      });

      // 폼 초기화
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      addToast({
        title: "오류",
        message: err instanceof Error ? err.message : "비밀번호 변경에 실패했습니다",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 현재 비밀번호 */}
      <div>
        <label
          htmlFor="currentPassword"
          className="mb-2 block text-sm font-medium text-[var(--text-strong)]"
        >
          현재 비밀번호 <span className="text-red-500">*</span>
        </label>
        <PasswordInput
          id="currentPassword"
          value={formData.currentPassword}
          onChange={(e) => handleChange("currentPassword", e.target.value)}
          className={errors.currentPassword ? "border-red-500" : ""}
          placeholder="현재 비밀번호를 입력하세요"
        />
        {errors.currentPassword && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.currentPassword}</p>
        )}
      </div>

      {/* 새 비밀번호 */}
      <div>
        <label
          htmlFor="newPassword"
          className="mb-2 block text-sm font-medium text-[var(--text-strong)]"
        >
          새 비밀번호 <span className="text-red-500">*</span>
        </label>
        <PasswordInput
          id="newPassword"
          value={formData.newPassword}
          onChange={(e) => handleChange("newPassword", e.target.value)}
          className={errors.newPassword ? "border-red-500" : ""}
          placeholder="새 비밀번호를 입력하세요 (8자 이상)"
        />
        {errors.newPassword && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.newPassword}</p>
        )}
      </div>

      {/* 비밀번호 확인 */}
      <div>
        <label
          htmlFor="confirmPassword"
          className="mb-2 block text-sm font-medium text-[var(--text-strong)]"
        >
          비밀번호 확인 <span className="text-red-500">*</span>
        </label>
        <PasswordInput
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
          className={errors.confirmPassword ? "border-red-500" : ""}
          placeholder="새 비밀번호를 다시 입력하세요"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword}</p>
        )}
      </div>

      {/* 변경 버튼 */}
      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Icon name="loader" size={16} className="mr-2 animate-spin" />
              변경 중...
            </>
          ) : (
            "비밀번호 변경"
          )}
        </Button>
      </div>
    </form>
  );
}

