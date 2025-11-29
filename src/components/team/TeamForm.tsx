"use client";

import * as React from "react";
import { useTeams, type CreateTeamData } from "@/hooks/useTeams";
import { Input } from "@hua-labs/ui";
import { Textarea } from "@hua-labs/ui";
import { Button } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { useToast } from "@hua-labs/ui";

export interface TeamFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function TeamForm({ onSuccess, onCancel }: TeamFormProps) {
  const { addToast } = useToast();
  const { createTeam } = useTeams();

  const [formData, setFormData] = React.useState<CreateTeamData>({
    name: "",
    description: "",
    avatar: "",
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [submitError, setSubmitError] = React.useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleChange = (field: keyof CreateTeamData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
    setSubmitError(undefined);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(undefined);

    // 간단한 검증
    if (!formData.name.trim()) {
      setErrors({ name: "팀 이름을 입력해주세요" });
      return;
    }

    setIsSubmitting(true);

    try {
      await createTeam({
        name: formData.name.trim(),
        description: formData.description?.trim() || undefined,
        avatar: formData.avatar?.trim() || undefined,
      });

      addToast({
        title: "성공",
        message: "팀이 생성되었습니다",
        type: "success",
      });

      onSuccess?.();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "오류가 발생했습니다";
      setSubmitError(errorMessage);
      addToast({
        title: "오류",
        message: errorMessage,
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 제출 에러 */}
      {submitError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
          <p className="text-sm text-red-800 dark:text-red-200">{submitError}</p>
        </div>
      )}

      {/* 팀 이름 */}
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-[var(--text-strong)]"
        >
          팀 이름 <span className="text-red-500">*</span>
        </label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className={errors.name ? "border-red-500" : ""}
          placeholder="팀 이름을 입력하세요"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
        )}
      </div>

      {/* 설명 */}
      <div>
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-medium text-[var(--text-strong)]"
        >
          설명
        </label>
        <Textarea
          id="description"
          value={formData.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="팀 설명을 입력하세요"
          rows={4}
        />
      </div>

      {/* 아바타 URL */}
      <div>
        <label
          htmlFor="avatar"
          className="mb-2 block text-sm font-medium text-[var(--text-strong)]"
        >
          아바타 URL
        </label>
        <Input
          id="avatar"
          type="url"
          value={formData.avatar || ""}
          onChange={(e) => handleChange("avatar", e.target.value)}
          placeholder="팀 아바타 이미지 URL (선택사항)"
        />
      </div>

      {/* 버튼 */}
      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex-1"
        >
          취소
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1"
        >
          {isSubmitting ? (
            <>
              <Icon name="loader" size={16} className="mr-2 animate-spin" />
              생성 중...
            </>
          ) : (
            "생성"
          )}
        </Button>
      </div>
    </form>
  );
}

