"use client";

import * as React from "react";
import { Input, Textarea, Select, SelectOption } from "@hua-labs/ui";
import { DatePicker, FileUpload } from "@/components/forms";
import { MultiSelect } from "@/components/forms";
import { Icon } from "@hua-labs/ui";
import { Button } from "@hua-labs/ui";
import type { Issue, IssueStatus, IssuePriority } from "@/types";

export interface IssueFormData {
  title: string;
  description?: string;
  status: IssueStatus;
  priority: IssuePriority;
  projectId: string;
  assigneeId?: string;
  labels?: string[];
  dueDate?: Date | string;
  subtasks?: Array<{ title: string }>;
  attachments?: File[]; // 업로드할 파일 목록
}

export interface IssueFormFieldsProps {
  formData: IssueFormData;
  errors: Record<string, string>;
  onChange: <K extends keyof IssueFormData>(
    field: K,
    value: IssueFormData[K]
  ) => void;
  projects?: Array<{ id: string; name: string }>;
  users?: Array<{ id: string; name: string; email: string }>;
  labels?: Array<{ id: string; name: string; color: string }>;
}

export function IssueFormFields({
  formData,
  errors,
  onChange,
  projects = [],
  users = [],
  labels = [],
}: IssueFormFieldsProps) {
  const statusOptions: Array<{ value: IssueStatus; label: string }> = [
    { value: "TODO", label: "할 일" },
    { value: "IN_PROGRESS", label: "진행 중" },
    { value: "IN_REVIEW", label: "검토 중" },
    { value: "DONE", label: "완료" },
  ];

  const priorityOptions: Array<{ value: IssuePriority; label: string }> = [
    { value: "HIGH", label: "높음" },
    { value: "MEDIUM", label: "보통" },
    { value: "LOW", label: "낮음" },
  ];

  return (
    <div className="space-y-6">
      {/* 제목 */}
      <div>
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-medium text-[var(--text-strong)]"
        >
          제목 <span className="text-red-500">*</span>
        </label>
        <Input
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) => onChange("title", e.target.value)}
          className={errors.title ? "border-red-500" : ""}
          placeholder="이슈 제목을 입력하세요"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title}</p>
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
          onChange={(e) => onChange("description", e.target.value)}
          className={errors.description ? "border-red-500" : ""}
          placeholder="이슈 설명을 입력하세요 (Markdown 지원)"
          rows={6}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 프로젝트 */}
        <div>
          <label
            htmlFor="projectId"
            className="mb-2 block text-sm font-medium text-[var(--text-strong)]"
          >
            프로젝트 <span className="text-red-500">*</span>
          </label>
          <Select
            id="projectId"
            value={formData.projectId}
            onChange={(e) => onChange("projectId", e.target.value)}
            className={errors.projectId ? "border-red-500" : ""}
          >
            <SelectOption value="">프로젝트 선택</SelectOption>
            {projects.map((project) => (
              <SelectOption key={project.id} value={project.id}>
                {project.name}
              </SelectOption>
            ))}
          </Select>
          {errors.projectId && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.projectId}</p>
          )}
        </div>

        {/* 상태 */}
        <div>
          <label
            htmlFor="status"
            className="mb-2 block text-sm font-medium text-[var(--text-strong)]"
          >
            상태
          </label>
          <Select
            id="status"
            value={formData.status}
            onChange={(e) => onChange("status", e.target.value as IssueStatus)}
          >
            {statusOptions.map((option) => (
              <SelectOption key={option.value} value={option.value}>
                {option.label}
              </SelectOption>
            ))}
          </Select>
        </div>

        {/* 우선순위 */}
        <div>
          <label
            htmlFor="priority"
            className="mb-2 block text-sm font-medium text-[var(--text-strong)]"
          >
            우선순위 <span className="text-red-500">*</span>
          </label>
          <Select
            id="priority"
            value={formData.priority}
            onChange={(e) => onChange("priority", e.target.value as IssuePriority)}
            className={errors.priority ? "border-red-500" : ""}
          >
            {priorityOptions.map((option) => (
              <SelectOption key={option.value} value={option.value}>
                {option.label}
              </SelectOption>
            ))}
          </Select>
          {errors.priority && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.priority}</p>
          )}
        </div>

        {/* 담당자 */}
        <div>
          <label
            htmlFor="assigneeId"
            className="mb-2 block text-sm font-medium text-[var(--text-strong)]"
          >
            담당자
          </label>
          <Select
            id="assigneeId"
            value={formData.assigneeId || ""}
            onChange={(e) => onChange("assigneeId", e.target.value || undefined)}
          >
            <SelectOption value="">담당자 선택</SelectOption>
            {users.map((user) => (
              <SelectOption key={user.id} value={user.id}>
                {user.name} ({user.email})
              </SelectOption>
            ))}
          </Select>
        </div>

        {/* 마감일 */}
        <div>
          <label
            htmlFor="dueDate"
            className="mb-2 block text-sm font-medium text-[var(--text-strong)]"
          >
            마감일
          </label>
          <DatePicker
            selected={formData.dueDate ? new Date(formData.dueDate) : null}
            onChange={(date: Date | null) => onChange("dueDate", date || undefined)}
            placeholderText="마감일 선택"
            className={errors.dueDate ? "border-red-500" : ""}
          />
          {errors.dueDate && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.dueDate}</p>
          )}
        </div>
      </div>

      {/* 라벨 */}
      {labels.length > 0 && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-sm font-medium text-[var(--text-strong)]">
              라벨
            </label>
            {formData.title && formData.projectId && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  // AI 자동 분류는 부모 컴포넌트에서 처리
                  const event = new CustomEvent("ai-auto-label", {
                    detail: { title: formData.title, description: formData.description },
                  });
                  window.dispatchEvent(event);
                }}
                className="text-xs text-[var(--brand-primary)] hover:underline flex items-center gap-1"
              >
                <span>✨</span>
                AI 라벨 추천
              </button>
            )}
          </div>
          <MultiSelect
            options={labels.map((label) => ({
              value: label.id,
              label: label.name,
            }))}
            value={formData.labels || []}
            onChange={(selected) => onChange("labels", selected)}
            placeholder="라벨 선택"
          />
        </div>
      )}

      {/* 서브태스크 */}
      <div>
        <label className="mb-2 block text-sm font-medium text-[var(--text-strong)]">
          서브태스크
        </label>
        <div className="space-y-2">
          {(formData.subtasks || []).map((subtask, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={subtask.title}
                onChange={(e) => {
                  const newSubtasks = [...(formData.subtasks || [])];
                  newSubtasks[index] = { ...subtask, title: e.target.value };
                  onChange("subtasks", newSubtasks);
                }}
                placeholder="서브태스크 제목"
              />
              <button
                type="button"
                onClick={() => {
                  const newSubtasks = (formData.subtasks || []).filter((_, i) => i !== index);
                  onChange("subtasks", newSubtasks);
                }}
                className="px-3 py-2 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              >
                삭제
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              onChange("subtasks", [...(formData.subtasks || []), { title: "" }]);
            }}
            className="text-sm text-[var(--brand-primary)] hover:underline"
          >
            + 서브태스크 추가
          </button>
        </div>
      </div>

      {/* 첨부파일 */}
      <div>
        <label className="mb-2 block text-sm font-medium text-[var(--text-strong)]">
          첨부파일
        </label>
        <div className="space-y-2">
          {/* 파일 업로드 */}
          <FileUpload
            onFileSelect={(file) => {
              if (file) {
                const currentFiles = formData.attachments || [];
                onChange("attachments", [...currentFiles, file]);
              }
            }}
            accept="*/*"
            maxSize={10} // 10MB
            label=""
            buttonText="파일 추가"
          />
          
          {/* 업로드된 파일 목록 */}
          {formData.attachments && formData.attachments.length > 0 && (
            <div className="mt-2 space-y-2">
              {formData.attachments.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-[var(--surface-muted)] rounded-lg"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <Icon name="file" size={16} className="text-[var(--text-muted)] flex-shrink-0" />
                    <span className="text-sm text-[var(--text-strong)] truncate">
                      {file.name}
                    </span>
                    <span className="text-xs text-[var(--text-muted)] flex-shrink-0">
                      ({(file.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const newFiles = formData.attachments?.filter((_, i) => i !== index) || [];
                      onChange("attachments", newFiles);
                    }}
                    className="h-6 w-6 p-0 flex-shrink-0"
                  >
                    <Icon name="x" size={14} />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

