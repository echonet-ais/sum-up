"use client";

import * as React from "react";
import { Input } from "@hua-labs/ui";
import { Button } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { FileUpload } from "@/components/forms";
import { useAuthStore } from "@/store/auth-store";
import { useToast } from "@hua-labs/ui";
import { Avatar, AvatarImage, AvatarFallback } from "@hua-labs/ui";
import { apiClient } from "@/lib/api/client";
import type { User } from "@/types";

export function ProfileForm() {
  const { user, updateUser } = useAuthStore();
  const { addToast } = useToast();

  const [formData, setFormData] = React.useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        avatar: user.avatar || "",
      });
    }
  }, [user]);

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

    if (!formData.name.trim()) {
      newErrors.name = "이름을 입력해주세요";
    }

    // 이메일은 변경 불가하므로 검증 제거

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
      // 프로필 정보 업데이트 (이메일은 변경 불가하므로 제외)
      const updatedUser = await apiClient.put<User>("/api/users/me", {
        name: formData.name.trim(),
        avatar: formData.avatar.trim() || undefined,
      });

      // 스토어 업데이트
      updateUser({
        name: updatedUser.name,
        avatar: updatedUser.avatar,
      });

      addToast({
        title: "성공",
        message: "프로필이 업데이트되었습니다",
        type: "success",
      });
    } catch (err) {
      addToast({
        title: "오류",
        message: err instanceof Error ? err.message : "프로필 업데이트에 실패했습니다",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 아바타 */}
      <div className="flex flex-col items-center gap-4">
        <Avatar className="h-24 w-24">
          {formData.avatar && <AvatarImage src={formData.avatar} alt={user?.name || "User"} />}
          <AvatarFallback className="text-2xl">
            {formData.name.charAt(0)?.toUpperCase() || user?.name?.charAt(0)?.toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
        <div className="w-full max-w-md">
          <FileUpload
            onFileSelect={async (file) => {
              if (file) {
                try {
                  // 아바타 업로드
                  const formData = new FormData();
                  formData.append("file", file);

                  const response = await fetch("/api/users/me/avatar", {
                    method: "POST",
                    body: formData,
                  });

                  if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error || "아바타 업로드에 실패했습니다");
                  }

                  const { avatarUrl } = await response.json();
                  handleChange("avatar", avatarUrl);

                  // 프로필 정보도 즉시 업데이트
                  const updatedUser = await apiClient.put<User>("/api/users/me", {
                    avatar: avatarUrl,
                  });
                  updateUser({
                    avatar: updatedUser.avatar,
                  });

                  addToast({
                    title: "성공",
                    message: "프로필 이미지가 업로드되었습니다",
                    type: "success",
                  });
                } catch (err) {
                  addToast({
                    title: "오류",
                    message: err instanceof Error ? err.message : "아바타 업로드에 실패했습니다",
                    type: "error",
                  });
                }
              } else {
                // 아바타 제거
                const updatedUser = await apiClient.put<User>("/api/users/me", {
                  avatar: null,
                });
                updateUser({
                  avatar: updatedUser.avatar,
                });
                handleChange("avatar", "");
              }
            }}
            accept="image/*"
            maxSize={5} // 5MB
            label="프로필 이미지 업로드"
            preview
          />
        </div>
      </div>

      {/* 이름 */}
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-[var(--text-strong)]"
        >
          이름 <span className="text-red-500">*</span>
        </label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className={errors.name ? "border-red-500" : ""}
          placeholder="이름을 입력하세요"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-[var(--color-error)]">{errors.name}</p>
        )}
      </div>

      {/* 이메일 (읽기 전용) */}
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-[var(--text-strong)]"
        >
          이메일
        </label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          disabled
          className="bg-[var(--surface-muted)] cursor-not-allowed"
          placeholder="이메일을 입력하세요"
        />
        <p className="mt-1 text-xs text-[var(--text-muted)]">
          이메일은 변경할 수 없습니다
        </p>
      </div>

      {/* 저장 버튼 */}
      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Icon name="loader" size={16} className="mr-2 animate-spin" />
              저장 중...
            </>
          ) : (
            "저장"
          )}
        </Button>
      </div>
    </form>
  );
}

