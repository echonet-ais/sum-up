import { createServerClient } from "@/lib/supabase/server";

/**
 * 데이터 제한 검증 유틸리티
 * 주최측 PRD 요구사항:
 * - 팀당 최대 15개 프로젝트
 * - 프로젝트당 최대 200개 이슈
 */

const LIMITS = {
  PROJECTS_PER_TEAM: 15,
  ISSUES_PER_PROJECT: 200,
  SUBTASKS_PER_ISSUE: 20,
  LABELS_PER_PROJECT: 20,
  LABELS_PER_ISSUE: 5,
  CUSTOM_STATUSES_PER_PROJECT: 5,
} as const;

/**
 * 팀의 프로젝트 개수 확인
 * @param teamId 팀 ID
 * @returns 현재 프로젝트 개수와 제한 여부
 */
export async function checkTeamProjectLimit(
  teamId: string
): Promise<{ count: number; limit: number; canCreate: boolean }> {
  const supabase = await createServerClient();
  
  const { count, error } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true })
    .eq("team_id", teamId)
    .is("deleted_at", null);
  
  if (error) {
    console.error("Error checking team project limit:", error);
    // 에러 발생 시 제한을 통과시키지 않음 (안전한 선택)
    return {
      count: LIMITS.PROJECTS_PER_TEAM,
      limit: LIMITS.PROJECTS_PER_TEAM,
      canCreate: false,
    };
  }
  
  const currentCount = count || 0;
  
  return {
    count: currentCount,
    limit: LIMITS.PROJECTS_PER_TEAM,
    canCreate: currentCount < LIMITS.PROJECTS_PER_TEAM,
  };
}

/**
 * 프로젝트의 이슈 개수 확인
 * @param projectId 프로젝트 ID
 * @returns 현재 이슈 개수와 제한 여부
 */
export async function checkProjectIssueLimit(
  projectId: string
): Promise<{ count: number; limit: number; canCreate: boolean }> {
  const supabase = await createServerClient();
  
  const { count, error } = await supabase
    .from("issues")
    .select("*", { count: "exact", head: true })
    .eq("project_id", projectId)
    .is("deleted_at", null);
  
  if (error) {
    console.error("Error checking project issue limit:", error);
    // 에러 발생 시 제한을 통과시키지 않음 (안전한 선택)
    return {
      count: LIMITS.ISSUES_PER_PROJECT,
      limit: LIMITS.ISSUES_PER_PROJECT,
      canCreate: false,
    };
  }
  
  const currentCount = count || 0;
  
  return {
    count: currentCount,
    limit: LIMITS.ISSUES_PER_PROJECT,
    canCreate: currentCount < LIMITS.ISSUES_PER_PROJECT,
  };
}

/**
 * 팀 프로젝트 제한 검증 (에러 발생 시 예외 던짐)
 * @param teamId 팀 ID
 * @throws 제한 초과 시 에러
 */
export async function validateTeamProjectLimit(teamId: string): Promise<void> {
  const check = await checkTeamProjectLimit(teamId);
  
  if (!check.canCreate) {
    throw new Error(
      `팀당 최대 ${LIMITS.PROJECTS_PER_TEAM}개의 프로젝트를 생성할 수 있습니다. (현재: ${check.count}개)`
    );
  }
}

/**
 * 프로젝트 이슈 제한 검증 (에러 발생 시 예외 던짐)
 * @param projectId 프로젝트 ID
 * @throws 제한 초과 시 에러
 */
export async function validateProjectIssueLimit(projectId: string): Promise<void> {
  const check = await checkProjectIssueLimit(projectId);
  
  if (!check.canCreate) {
    throw new Error(
      `프로젝트당 최대 ${LIMITS.ISSUES_PER_PROJECT}개의 이슈를 생성할 수 있습니다. (현재: ${check.count}개)`
    );
  }
}

/**
 * 이슈의 서브태스크 개수 확인
 * @param issueId 이슈 ID
 * @returns 현재 서브태스크 개수와 제한 여부
 */
export async function checkIssueSubtaskLimit(
  issueId: string
): Promise<{ count: number; limit: number; canCreate: boolean }> {
  const supabase = await createServerClient();
  
  const { count, error } = await supabase
    .from("subtasks")
    .select("*", { count: "exact", head: true })
    .eq("issue_id", issueId);
  
  if (error) {
    console.error("Error checking issue subtask limit:", error);
    return {
      count: LIMITS.SUBTASKS_PER_ISSUE,
      limit: LIMITS.SUBTASKS_PER_ISSUE,
      canCreate: false,
    };
  }
  
  const currentCount = count || 0;
  
  return {
    count: currentCount,
    limit: LIMITS.SUBTASKS_PER_ISSUE,
    canCreate: currentCount < LIMITS.SUBTASKS_PER_ISSUE,
  };
}

/**
 * 이슈 서브태스크 제한 검증 (에러 발생 시 예외 던짐)
 * @param issueId 이슈 ID
 * @throws 제한 초과 시 에러
 */
export async function validateIssueSubtaskLimit(issueId: string): Promise<void> {
  const check = await checkIssueSubtaskLimit(issueId);
  
  if (!check.canCreate) {
    throw new Error(
      `이슈당 최대 ${LIMITS.SUBTASKS_PER_ISSUE}개의 서브태스크를 생성할 수 있습니다. (현재: ${check.count}개)`
    );
  }
}

/**
 * 프로젝트의 라벨 개수 확인
 * @param projectId 프로젝트 ID
 * @returns 현재 라벨 개수와 제한 여부
 */
export async function checkProjectLabelLimit(
  projectId: string
): Promise<{ count: number; limit: number; canCreate: boolean }> {
  const supabase = await createServerClient();
  
  const { count, error } = await supabase
    .from("issue_labels")
    .select("*", { count: "exact", head: true })
    .eq("project_id", projectId);
  
  if (error) {
    console.error("Error checking project label limit:", error);
    return {
      count: LIMITS.LABELS_PER_PROJECT,
      limit: LIMITS.LABELS_PER_PROJECT,
      canCreate: false,
    };
  }
  
  const currentCount = count || 0;
  
  return {
    count: currentCount,
    limit: LIMITS.LABELS_PER_PROJECT,
    canCreate: currentCount < LIMITS.LABELS_PER_PROJECT,
  };
}

/**
 * 프로젝트 라벨 제한 검증 (에러 발생 시 예외 던짐)
 * @param projectId 프로젝트 ID
 * @throws 제한 초과 시 에러
 */
export async function validateProjectLabelLimit(projectId: string): Promise<void> {
  const check = await checkProjectLabelLimit(projectId);
  
  if (!check.canCreate) {
    throw new Error(
      `프로젝트당 최대 ${LIMITS.LABELS_PER_PROJECT}개의 라벨을 생성할 수 있습니다. (현재: ${check.count}개)`
    );
  }
}

/**
 * 이슈의 라벨 개수 확인
 * @param issueId 이슈 ID
 * @returns 현재 라벨 개수와 제한 여부
 */
export async function checkIssueLabelLimit(
  issueId: string
): Promise<{ count: number; limit: number; canAdd: boolean }> {
  const supabase = await createServerClient();
  
  const { count, error } = await supabase
    .from("issue_label_mappings")
    .select("*", { count: "exact", head: true })
    .eq("issue_id", issueId);
  
  if (error) {
    console.error("Error checking issue label limit:", error);
    return {
      count: LIMITS.LABELS_PER_ISSUE,
      limit: LIMITS.LABELS_PER_ISSUE,
      canAdd: false,
    };
  }
  
  const currentCount = count || 0;
  
  return {
    count: currentCount,
    limit: LIMITS.LABELS_PER_ISSUE,
    canAdd: currentCount < LIMITS.LABELS_PER_ISSUE,
  };
}

/**
 * 이슈 라벨 제한 검증 (에러 발생 시 예외 던짐)
 * @param issueId 이슈 ID
 * @throws 제한 초과 시 에러
 */
export async function validateIssueLabelLimit(issueId: string): Promise<void> {
  const check = await checkIssueLabelLimit(issueId);
  
  if (!check.canAdd) {
    throw new Error(
      `이슈당 최대 ${LIMITS.LABELS_PER_ISSUE}개의 라벨을 적용할 수 있습니다. (현재: ${check.count}개)`
    );
  }
}

