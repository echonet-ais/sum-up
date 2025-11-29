/**
 * 비밀번호 검증 유틸리티
 */

export interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface PasswordStrength {
  level: 'weak' | 'medium' | 'strong';
  score: number; // 0-5
}

export const PASSWORD_SPECIALS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

export interface PasswordRule {
  key: string;
  test: (password: string) => boolean;
  errorMessage: string;
  label: {
    ko: string;
    en: string;
  };
}

/**
 * 비밀번호 검증 규칙 정의
 */
export const PASSWORD_RULES: PasswordRule[] = [
  {
    key: "length",
    test: (pw: string) => pw.length >= 8,
    errorMessage: "비밀번호는 8자 이상이어야 합니다.",
    label: {
      ko: "8자 이상",
      en: "At least 8 characters",
    },
  },
  {
    key: "upper",
    test: (pw: string) => /[A-Z]/.test(pw),
    errorMessage: "대문자를 포함해야 합니다.",
    label: {
      ko: "대문자 포함",
      en: "Uppercase letter",
    },
  },
  {
    key: "lower",
    test: (pw: string) => /[a-z]/.test(pw),
    errorMessage: "소문자를 포함해야 합니다.",
    label: {
      ko: "소문자 포함",
      en: "Lowercase letter",
    },
  },
  {
    key: "number",
    test: (pw: string) => /[0-9]/.test(pw),
    errorMessage: "숫자를 포함해야 합니다.",
    label: {
      ko: "숫자 포함",
      en: "Number",
    },
  },
  {
    key: "special",
    test: (pw: string) => {
      const specialRegex = new RegExp(`[${PASSWORD_SPECIALS.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}]`);
      return specialRegex.test(pw);
    },
    errorMessage: `특수문자를 포함해야 합니다. (${PASSWORD_SPECIALS})`,
    label: {
      ko: `특수문자 포함 (${PASSWORD_SPECIALS})`,
      en: `Special character (${PASSWORD_SPECIALS})`,
    },
  },
];

/**
 * 비밀번호 규칙 검증
 */
export function validatePassword(password: string): PasswordValidationResult {
  const errors: string[] = [];

  for (const rule of PASSWORD_RULES) {
    if (!rule.test(password)) {
      errors.push(rule.errorMessage);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * 비밀번호 강도 계산
 */
export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) {
    return { level: 'weak', score: 0 };
  }

  let score = 0;

  // 길이 체크
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;

  // 문자 종류 체크
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  
  const specialRegex = new RegExp(`[${PASSWORD_SPECIALS.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}]`);
  if (specialRegex.test(password)) score++;

  // 강도 레벨 결정
  let level: 'weak' | 'medium' | 'strong';
  if (score <= 2) {
    level = 'weak';
  } else if (score <= 4) {
    level = 'medium';
  } else {
    level = 'strong';
  }

  return { level, score };
}

/**
 * 비밀번호 일치 확인
 */
export function checkPasswordMatch(password: string, confirmPassword: string): boolean {
  return password === confirmPassword && password.length > 0;
}

