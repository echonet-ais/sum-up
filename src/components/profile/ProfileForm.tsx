"use client";

import * as React from "react";
import { Input } from "@hua-labs/ui";
import { Button } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { FileUpload } from "@/components/forms";
import { useAuthStore } from "@/store/auth-store";
import { useToast } from "@hua-labs/ui";
import { Avatar, AvatarImage, AvatarFallback } from "@hua-labs/ui";

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

    if (!formData.email.trim()) {
      newErrors.email = "이메일을 입력해주세요";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "올바른 이메일 형식이 아닙니다";
      }
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
      // await apiClient.put("/users/profile", formData);

      // 임시: 로컬 상태 업데이트
      updateUser({
        ...user!,
        name: formData.name.trim(),
        email: formData.email.trim(),
        avatar: formData.avatar.trim() || undefined,
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
                // TODO: 실제 파일 업로드 API 호출
                // const formData = new FormData();
                // formData.append("file", file);
                // const response = await apiClient.post("/upload/avatar", formData);
                // handleChange("avatar", response.url);

                // 임시: 로컬 URL 생성 (실제로는 서버에 업로드 후 URL 받아야 함)
                const url = URL.createObjectURL(file);
                handleChange("avatar", url);
              } else {
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
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
        )}
      </div>

      {/* 이메일 */}
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-[var(--text-strong)]"
        >
          이메일 <span className="text-red-500">*</span>
        </label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className={errors.email ? "border-red-500" : ""}
          placeholder="이메일을 입력하세요"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
        )}
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

