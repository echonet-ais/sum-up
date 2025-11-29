/**
 * AI 프롬프트 템플릿
 * 각 AI 기능별 프롬프트 생성
 */

/**
 * 이슈 설명 요약 프롬프트
 */
export function createSummaryPrompt(description: string): string {
  return `다음 이슈 설명을 2-4문장으로 간결하게 요약해주세요. 핵심 내용만 포함하고 불필요한 세부사항은 제외해주세요.

이슈 설명:
${description}

요약:`;
}

/**
 * 해결 전략 제안 프롬프트
 */
export function createSuggestionPrompt(title: string, description: string): string {
  return `다음 이슈를 해결하기 위한 접근 방식을 제안해주세요. 구체적이고 실행 가능한 단계별 전략을 제시해주세요.

이슈 제목: ${title}
이슈 설명: ${description}

해결 전략:`;
}

/**
 * 라벨 자동 분류 프롬프트
 */
export function createAutoLabelPrompt(
  title: string,
  description: string,
  availableLabels: Array<{ name: string; color: string }>
): string {
  const labelsList = availableLabels.map((l) => `- ${l.name}`).join("\n");

  return `다음 이슈에 가장 적합한 라벨을 최대 3개까지 추천해주세요. 라벨 이름만 쉼표로 구분하여 답변해주세요.

이슈 제목: ${title}
이슈 설명: ${description}

사용 가능한 라벨:
${labelsList}

추천 라벨 (최대 3개, 쉼표로 구분):`;
}

/**
 * 중복 이슈 탐지 프롬프트
 */
export function createDuplicateDetectionPrompt(
  title: string,
  description: string,
  existingIssues: Array<{ id: string; title: string; description?: string }>
): string {
  const issuesList = existingIssues
    .map((issue, idx) => {
      return `${idx + 1}. [ID: ${issue.id}] ${issue.title}${issue.description ? `\n   ${issue.description.substring(0, 100)}...` : ""}`;
    })
    .join("\n\n");

  return `다음 새 이슈가 기존 이슈들과 유사한지 판단해주세요. 유사한 이슈가 있다면 해당 이슈의 ID를 쉼표로 구분하여 답변해주세요. 유사한 이슈가 없다면 "없음"이라고 답변해주세요.

새 이슈:
제목: ${title}
설명: ${description}

기존 이슈 목록:
${issuesList}

유사한 이슈 ID (쉼표로 구분, 없으면 "없음"):`;
}

/**
 * 댓글 요약 프롬프트
 */
export function createCommentSummaryPrompt(
  issueTitle: string,
  issueDescription: string,
  comments: Array<{ author: string; content: string; createdAt: string }>
): string {
  const commentsList = comments
    .map((comment, idx) => {
      return `${idx + 1}. [${comment.author}] (${comment.createdAt}): ${comment.content}`;
    })
    .join("\n\n");

  return `다음 이슈의 댓글들을 읽고 논의 내용을 3-5문장으로 요약해주세요. 주요 결정 사항이 있다면 함께 명시해주세요.

이슈:
제목: ${issueTitle}
설명: ${issueDescription}

댓글:
${commentsList}

요약:`;
}

