"use client";

import * as React from "react";
import { Input, Textarea, Select, SelectOption } from "@hua-labs/ui";

export interface ProjectFormData {
  name: string;
  description?: string;
  teamId: string;
  isFavorite?: boolean;
}

export interface ProjectFormFieldsProps {
  formData: ProjectFormData;
  errors: Record<string, string>;
  onChange: <K extends keyof ProjectFormData>(
    field: K,
    value: ProjectFormData[K]
  ) => void;
  onBlur?: <K extends keyof ProjectFormData>(field: K) => void;
  teams?: Array<{ id: string; name: string }>;
}

export function ProjectFormFields({
  formData,
  errors,
  onChange,
  onBlur,
  teams = [],
}: ProjectFormFieldsProps) {
  return (
    <div className="space-y-6">
      {/* 프로젝트 이름 */}
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-[var(--text-strong)]"
        >
          프로젝트 이름 <span className="text-red-500">*</span>
        </label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => onChange("name", e.target.value)}
          onBlur={() => onBlur?.("name")}
          className={errors.name ? "border-red-500" : ""}
          placeholder="프로젝트 이름을 입력하세요"
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
          onChange={(e) => onChange("description", e.target.value)}
          onBlur={() => onBlur?.("description")}
          className={errors.description ? "border-red-500" : ""}
          placeholder="프로젝트 설명을 입력하세요"
          rows={4}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>
        )}
      </div>

      {/* 팀 */}
      <div>
        <label
          htmlFor="teamId"
          className="mb-2 block text-sm font-medium text-[var(--text-strong)]"
        >
          팀 <span className="text-red-500">*</span>
        </label>
        <Select
          id="teamId"
          value={formData.teamId}
          onChange={(e) => onChange("teamId", e.target.value)}
          onBlur={() => onBlur?.("teamId")}
          className={errors.teamId ? "border-red-500" : ""}
        >
          <SelectOption value="">팀 선택</SelectOption>
          {teams.map((team) => (
            <SelectOption key={team.id} value={team.id}>
              {team.name}
            </SelectOption>
          ))}
        </Select>
        {errors.teamId && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.teamId}</p>
        )}
      </div>

      {/* 즐겨찾기 */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isFavorite"
          checked={formData.isFavorite || false}
          onChange={(e) => onChange("isFavorite", e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-[var(--brand-primary)] focus:ring-[var(--brand-primary)]"
        />
        <label
          htmlFor="isFavorite"
          className="text-sm font-medium text-[var(--text-strong)] cursor-pointer"
        >
          즐겨찾기에 추가
        </label>
      </div>
    </div>
  );
}

