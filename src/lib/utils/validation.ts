/**
 * 폼 검증 유틸리티
 */

export interface ValidationRule<T = unknown> {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: T) => boolean | string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * 단일 필드 검증
 */
export function validateField<T = unknown>(value: T, rules: ValidationRule<T>): string | null {
  if (rules.required && (value === null || value === undefined || value === "")) {
    return "필수 항목입니다";
  }

  if (value === null || value === undefined || value === "") {
    return null; // 비어있지만 필수가 아닌 경우 통과
  }

  const stringValue = String(value);

  if (rules.minLength && stringValue.length < rules.minLength) {
    return `최소 ${rules.minLength}자 이상 입력해주세요`;
  }

  if (rules.maxLength && stringValue.length > rules.maxLength) {
    return `최대 ${rules.maxLength}자까지 입력 가능합니다`;
  }

  if (rules.pattern && !rules.pattern.test(stringValue)) {
    return "형식이 올바르지 않습니다";
  }

  if (rules.custom) {
    const result = rules.custom(value);
    if (result !== true) {
      return typeof result === "string" ? result : "유효하지 않은 값입니다";
    }
  }

  return null;
}

/**
 * 폼 전체 검증
 */
export function validateForm<T extends Record<string, unknown>>(
  data: T,
  rules: Record<keyof T, ValidationRule<T[keyof T]>>
): ValidationResult {
  const errors: Record<string, string> = {};

  (Object.keys(rules) as Array<keyof T>).forEach((key) => {
    const error = validateField(data[key], rules[key]);
    if (error) {
      errors[key as string] = error;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * 이메일 검증
 */
export function isValidEmail(email: string): boolean {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

/**
 * URL 검증
 */
export function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * 비밀번호 강도 검증
 */
export function validatePasswordStrength(password: string): {
  isValid: boolean;
  score: number; // 0-4
  feedback: string[];
} {
  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 8) {
    score++;
  } else {
    feedback.push("최소 8자 이상이어야 합니다");
  }

  if (/[a-z]/.test(password)) {
    score++;
  } else {
    feedback.push("소문자를 포함해야 합니다");
  }

  if (/[A-Z]/.test(password)) {
    score++;
  } else {
    feedback.push("대문자를 포함해야 합니다");
  }

  if (/[0-9]/.test(password)) {
    score++;
  } else {
    feedback.push("숫자를 포함해야 합니다");
  }

  if (/[^a-zA-Z0-9]/.test(password)) {
    score++;
  } else {
    feedback.push("특수문자를 포함하면 더 안전합니다");
  }

  return {
    isValid: score >= 3,
    score,
    feedback: score >= 3 ? [] : feedback,
  };
}

/**
 * 이슈 폼 검증
 */
export interface IssueFormData extends Record<string, unknown> {
  title: string;
  description?: string;
  status?: string;
  priority: string;
  projectId: string;
  assigneeId?: string;
  labels?: string[];
  dueDate?: Date | string;
  subtasks?: Array<{ title: string }>;
}

export function validateIssueForm(data: IssueFormData): ValidationResult {
  const rules: Record<keyof IssueFormData, ValidationRule> = {
    title: {
      required: true,
      minLength: 1,
      maxLength: 200,
    },
    description: {
      maxLength: 5000,
    },
    status: {},
    priority: {
      required: true,
      custom: (value) => {
        return ["HIGH", "MEDIUM", "LOW"].includes(value as string) || "우선순위를 선택해주세요";
      },
    },
    projectId: {
      required: true,
      custom: (value) => {
        return value ? true : "프로젝트를 선택해주세요";
      },
    },
    assigneeId: {},
    labels: {},
    dueDate: {
      custom: (value) => {
        if (!value) return true;
        const date = new Date(value as string);
        return !isNaN(date.getTime()) || "올바른 날짜 형식이 아닙니다";
      },
    },
    subtasks: {},
  };

  return validateForm(data as Record<string, unknown>, rules);
}

/**
 * 프로젝트 폼 검증
 */
export interface ProjectFormData extends Record<string, unknown> {
  name: string;
  description?: string;
  teamId: string;
  isFavorite?: boolean;
}

export function validateProjectForm(data: ProjectFormData): ValidationResult {
  const rules: Record<keyof ProjectFormData, ValidationRule> = {
    name: {
      required: true,
      minLength: 1,
      maxLength: 100,
    },
    description: {
      maxLength: 1000,
    },
    teamId: {
      required: true,
      custom: (value) => {
        return value ? true : "팀을 선택해주세요";
      },
    },
    isFavorite: {},
  };

  return validateForm(data as Record<string, unknown>, rules);
}

