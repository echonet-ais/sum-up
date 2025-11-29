"use client";

import * as React from "react";
import { useProjects, useProject, type CreateProjectData } from "@/hooks";
import { validateProjectForm, type ProjectFormData as ValidationProjectFormData } from "@/lib/utils/validation";
import { useFormValidation } from "@/hooks/useFormValidation";
import { useToast } from "@hua-labs/ui";
import { ProjectFormFields, type ProjectFormData } from "./ProjectFormFields";
import { FormActions } from "@/components/common";

export interface ProjectFormProps {
  projectId?: string; // 수정 모드일 때
  initialData?: Partial<ProjectFormData>;
  onSuccess?: () => void;
  onCancel?: () => void;
  teams?: Array<{ id: string; name: string }>;
}

export function ProjectForm({
  projectId,
  initialData,
  onSuccess,
  onCancel,
  teams = [],
}: ProjectFormProps) {
  const { addToast } = useToast();
  const { createProject } = useProjects();
  const { project, updateProject } = useProject(projectId || "");

  const isEditMode = !!projectId;

  const [formData, setFormData] = React.useState<ProjectFormData>(() => {
    if (isEditMode && project) {
      return {
        name: project.name,
        description: project.description,
        teamId: project.teamId,
        isFavorite: project.isFavorite,
      };
    }
    return {
      name: initialData?.name || "",
      description: initialData?.description || "",
      teamId: initialData?.teamId || "",
      isFavorite: initialData?.isFavorite || false,
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
  } = useFormValidation<ValidationProjectFormData>({
    validateForm: validateProjectForm,
    validateOnBlur: true,
    validateOnChange: false,
  });

  const handleChange = <K extends keyof ProjectFormData>(
    field: K,
    value: ProjectFormData[K]
  ) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };
      // 검증 훅의 handleChange 호출 (에러 초기화)
      handleValidationChange(field as keyof ValidationProjectFormData, value as ValidationProjectFormData[keyof ValidationProjectFormData], newData as ValidationProjectFormData);
      return newData;
    });
    setSubmitError(undefined);
  };

  const handleBlur = <K extends keyof ProjectFormData>(field: K) => {
    handleValidationBlur(field as keyof ValidationProjectFormData, formData as ValidationProjectFormData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(undefined);

    // 폼 검증
    const isValid = validateFormData(formData as ValidationProjectFormData);
    if (!isValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (isEditMode) {
        // 수정 모드
        await updateProject({
          name: formData.name,
          description: formData.description,
          teamId: formData.teamId,
          isFavorite: formData.isFavorite,
        });

        addToast({ title: "프로젝트 수정 완료", message: "프로젝트가 수정되었습니다", type: "success" });
      } else {
        // 생성 모드
        const createData: CreateProjectData = {
          name: formData.name,
          description: formData.description,
          teamId: formData.teamId,
          isFavorite: formData.isFavorite,
        };

        await createProject(createData);

        addToast({ title: "프로젝트 생성 완료", message: "프로젝트가 생성되었습니다", type: "success" });
      }

      onSuccess?.();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "오류가 발생했습니다";
      setSubmitError(errorMessage);
      addToast({ title: "프로젝트 저장 실패", message: errorMessage, type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ProjectFormFields
        formData={formData}
        errors={errors}
        onChange={handleChange}
        onBlur={handleBlur}
        teams={teams}
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
