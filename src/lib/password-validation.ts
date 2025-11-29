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

const specials = "!@#$%^&*()_+-=[]{}|;:,.<>?";

/**
 * 비밀번호 규칙 검증
 */
export function validatePassword(password: string): PasswordValidationResult {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('비밀번호는 8자 이상이어야 합니다.');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('대문자를 포함해야 합니다.');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('소문자를 포함해야 합니다.');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('숫자를 포함해야 합니다.');
  }

  const specialRegex = new RegExp(`[${specials.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}]`);
  if (!specialRegex.test(password)) {
    errors.push(`특수문자를 포함해야 합니다. (${specials})`);
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
  
  const specialRegex = new RegExp(`[${specials.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}]`);
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

