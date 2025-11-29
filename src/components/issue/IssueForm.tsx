"use client";

import * as React from "react";
import { useIssues, useIssue, type CreateIssueData } from "@/hooks";
import { useAI } from "@/hooks/useAI";
import { useAuthStore } from "@/store/auth-store";
import { validateIssueForm, type IssueFormData as ValidationIssueFormData } from "@/lib/utils/validation";
import { useFormValidation } from "@/hooks/useFormValidation";
import { useToast } from "@hua-labs/ui";
import { Button } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import Link from "next/link";
import type { IssueStatus, IssuePriority, CustomStatus } from "@/types";
import { IssueFormFields, type IssueFormData } from "./IssueFormFields";
import { FormActions } from "@/components/common";

export interface IssueFormProps {
  issueId?: string; // 수정 모드일 때
  initialData?: Partial<IssueFormData>;
  onSuccess?: () => void;
  onCancel?: () => void;
  projects?: Array<{ id: string; name: string }>;
  users?: Array<{ id: string; name: string; email: string }>;
  labels?: Array<{ id: string; name: string; color: string }>;
}

export function IssueForm({
  issueId,
  initialData,
  onSuccess,
  onCancel,
  projects = [],
  users = [],
  labels = [],
}: IssueFormProps) {
  const { addToast } = useToast();
  const { createIssue, issues } = useIssues();
  const { issue, updateIssue } = useIssue(issueId || "");
  const { generateAutoLabel, detectDuplicates, isLoading: isAILoading } = useAI();
  const { user } = useAuthStore();

  const isEditMode = !!issueId;
  const [duplicateIssues, setDuplicateIssues] = React.useState<Array<{ id: string; title: string }>>([]);
  const [showDuplicates, setShowDuplicates] = React.useState(false);
  const [customStatuses, setCustomStatuses] = React.useState<CustomStatus[]>([]);

  const [formData, setFormData] = React.useState<IssueFormData>(() => {
    if (isEditMode && issue) {
      return {
        title: issue.title,
        description: issue.description,
        status: issue.status,
        priority: issue.priority,
        projectId: issue.projectId,
        assigneeId: issue.assigneeId,
        labels: issue.labels.map((l) => l.id),
        dueDate: issue.dueDate,
        subtasks: issue.subtasks?.map((st) => ({ title: st.title })) || [],
      };
    }
    return {
      title: initialData?.title || "",
      description: initialData?.description || "",
      status: (initialData?.status as IssueStatus | string) || "TODO",
      priority: (initialData?.priority as IssuePriority) || "MEDIUM",
      projectId: initialData?.projectId || "",
      assigneeId: initialData?.assigneeId,
      labels: initialData?.labels || [],
      dueDate: initialData?.dueDate,
      subtasks: initialData?.subtasks || [],
    };
  });

  const [submitError, setSubmitError] = React.useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // 실시간 검증 훅
  const {
    errors,
    handleChange: handleValidationChange,
    handleBlur: handleValidationBlur,
    validateForm: validateFormData,
    setErrors,
  } = useFormValidation<ValidationIssueFormData>({
    validateForm: validateIssueForm,
    validateOnBlur: true,
    validateOnChange: false,
  });

  const handleChange = <K extends keyof IssueFormData>(
    field: K,
    value: IssueFormData[K]
  ) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };
      // 검증 훅의 handleChange 호출 (에러 초기화)
      handleValidationChange(field as keyof ValidationIssueFormData, value as ValidationIssueFormData[keyof ValidationIssueFormData], newData as ValidationIssueFormData);
      return newData;
    });
    setSubmitError(undefined);
    
    // 제목이 변경되면 중복 탐지 (생성 모드일 때만)
    if (field === "title" && !isEditMode && typeof value === "string" && value.length > 5) {
      handleDuplicateDetection(value, formData.description || "");
    }
  };

  const handleBlur = <K extends keyof IssueFormData>(field: K) => {
    handleValidationBlur(field as keyof ValidationIssueFormData, formData as ValidationIssueFormData);
  };

  // AI 자동 분류
  const handleAutoLabel = async () => {
    if (!formData.title || !formData.projectId || !user?.id) {
      addToast({
        title: "알림",
        message: "제목과 프로젝트를 먼저 입력해주세요",
        type: "warning",
      });
      return;
    }

    try {
      const result = await generateAutoLabel(
        formData.title,
        formData.description || "",
        labels,
        user.id
      );

      if (result.labels.length > 0) {
        const recommendedLabelIds = result.labels.map((l) => {
          const label = labels.find((label) => label.name === l.name);
          return label?.id;
        }).filter((id): id is string => !!id);

        if (recommendedLabelIds.length > 0) {
          const currentLabels = formData.labels || [];
          const newLabels = [...new Set([...currentLabels, ...recommendedLabelIds])];
          handleChange("labels", newLabels);
          
          addToast({
            title: "성공",
            message: `${result.labels.length}개의 라벨이 추천되었습니다`,
            type: "success",
          });
        }
      } else {
        addToast({
          title: "알림",
          message: "추천할 라벨을 찾을 수 없습니다",
          type: "info",
        });
      }
    } catch (err) {
      addToast({
        title: "오류",
        message: err instanceof Error ? err.message : "라벨 추천에 실패했습니다",
        type: "error",
      });
    }
  };

  // 중복 탐지
  const handleDuplicateDetection = async (title: string, description: string) => {
    if (!user?.id || !title || title.length < 5) return;

    try {
      const existingIssues = issues
        .filter((i) => i.id !== issueId)
        .map((i) => ({
          id: i.id,
          title: i.title,
          description: i.description,
        }));

      if (existingIssues.length === 0) return;

      const result = await detectDuplicates(title, description, existingIssues, user.id);

      if (result.duplicates.length > 0) {
        setDuplicateIssues(result.duplicates);
        setShowDuplicates(true);
      } else {
        setDuplicateIssues([]);
        setShowDuplicates(false);
      }
    } catch (err) {
      // 중복 탐지 실패는 조용히 무시 (사용자 경험 방해 안 함)
      console.error("Duplicate detection failed:", err);
    }
  };

  // 프로젝트 선택 시 커스텀 상태 가져오기
  React.useEffect(() => {
    async function fetchCustomStatuses() {
      if (!formData.projectId) {
        setCustomStatuses([]);
        return;
      }

      try {
        const response = await fetch(`/api/projects/${formData.projectId}/custom-statuses`);
        if (response.ok) {
          const data = await response.json();
          setCustomStatuses(data.data || []);
        }
      } catch (err) {
        console.error("Error fetching custom statuses:", err);
        setCustomStatuses([]);
      }
    }

    fetchCustomStatuses();
  }, [formData.projectId]);

  // AI 자동 분류 이벤트 리스너
  React.useEffect(() => {
    const handleAIAutoLabel = (event: Event) => {
      const customEvent = event as CustomEvent<{ title: string; description?: string }>;
      if (customEvent.detail) {
        handleAutoLabel();
      }
    };

    window.addEventListener("ai-auto-label", handleAIAutoLabel);
    return () => {
      window.removeEventListener("ai-auto-label", handleAIAutoLabel);
    };
  }, [formData.title, formData.description, formData.projectId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(undefined);

    // 폼 검증
    const isValid = validateFormData(formData as ValidationIssueFormData);
    if (!isValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (isEditMode) {
        // 수정 모드
        await updateIssue({
          title: formData.title,
          description: formData.description,
          status: formData.status,
          priority: formData.priority,
          projectId: formData.projectId,
          assigneeId: formData.assigneeId,
          labels: formData.labels?.map((labelId) => {
            const label = labels.find((l) => l.id === labelId);
            return label
              ? { id: label.id, name: label.name, color: label.color }
              : { id: labelId, name: labelId, color: "#3B82F6" };
          }) || [],
          dueDate: formData.dueDate,
        });

        addToast({
          title: "성공",
          message: "이슈가 수정되었습니다",
          type: "success",
        });
      } else {
        // 생성 모드
        const createData: CreateIssueData = {
          title: formData.title,
          description: formData.description,
          status: formData.status,
          priority: formData.priority,
          projectId: formData.projectId,
          assigneeId: formData.assigneeId,
          labels: formData.labels || [],
          dueDate: formData.dueDate,
          subtasks: formData.subtasks?.filter((st) => st.title.trim()) || [],
        };

        await createIssue(createData);

        addToast({ title: "이슈 생성 완료", message: "이슈가 생성되었습니다", type: "success" });
      }

      onSuccess?.();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "오류가 발생했습니다";
      setSubmitError(errorMessage);
      addToast({ title: "이슈 생성 실패", message: errorMessage, type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 중복 이슈 경고 */}
      {showDuplicates && duplicateIssues.length > 0 && !isEditMode && (
        <div className="p-4 rounded-lg bg-[var(--color-warning-subtle)] border border-[var(--color-warning)]">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="text-sm font-medium text-[var(--color-warning)] mb-2">
                ⚠️ 유사한 이슈가 발견되었습니다
              </h4>
              <ul className="space-y-1">
                {duplicateIssues.map((dup) => (
                  <li key={dup.id}>
                    <Link
                      href={`/issues/${dup.id}`}
                      className="text-sm text-[var(--color-warning)] hover:underline"
                      target="_blank"
                    >
                      • {dup.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              onClick={() => setShowDuplicates(false)}
              className="text-[var(--color-warning)] hover:text-[var(--color-warning-hover)] transition-colors"
            >
              <Icon name="x" size={16} />
            </button>
          </div>
        </div>
      )}

      <IssueFormFields
        formData={formData}
        errors={errors}
        onChange={handleChange}
        onBlur={handleBlur}
        projects={projects}
        users={users}
        labels={labels}
        customStatuses={customStatuses}
      />
      <FormActions
        isSubmitting={isSubmitting}
        submitError={submitError}
        onCancel={onCancel || (() => {})}
        submitLabel={isEditMode ? "수정" : "생성"}
      />
    </form>
  );
}
