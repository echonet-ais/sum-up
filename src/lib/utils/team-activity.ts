import { createServerClient } from "@/lib/supabase/server";
import type { TeamActivityType } from "@/types";

/**
 * 팀 활동 로그 기록 유틸리티
 */
export async function logTeamActivity(
  teamId: string,
  userId: string,
  type: TeamActivityType,
  targetId: string,
  description: string
): Promise<void> {
  try {
    const supabase = await createServerClient();
    
    await supabase.from("activities").insert({
      team_id: teamId,
      user_id: userId,
      type,
      target_id: targetId,
      description,
    });
  } catch (error) {
    // 활동 로그 기록 실패해도 메인 작업은 계속 진행
    console.error("Failed to log team activity:", error);
  }
}

/**
 * 팀 활동 로그 설명 생성 헬퍼
 */
export function createActivityDescription(
  type: TeamActivityType,
  data: Record<string, unknown>
): string {
  switch (type) {
    case "TEAM_CREATED":
      return `팀 "${data.teamName}"이(가) 생성되었습니다.`;
    case "TEAM_UPDATED":
      return `팀 정보가 업데이트되었습니다.`;
    case "TEAM_DELETED":
      return `팀이 삭제되었습니다.`;
    case "MEMBER_ADDED":
      return `"${data.memberName}"이(가) 팀에 합류했습니다.`;
    case "MEMBER_REMOVED":
      return `"${data.memberName}"이(가) 팀에서 제거되었습니다.`;
    case "MEMBER_ROLE_CHANGED":
      return `"${data.memberName}"의 역할이 "${data.oldRole}"에서 "${data.newRole}"로 변경되었습니다.`;
    case "PROJECT_CREATED":
      return `프로젝트 "${data.projectName}"이(가) 생성되었습니다.`;
    case "PROJECT_DELETED":
      return `프로젝트 "${data.projectName}"이(가) 삭제되었습니다.`;
    default:
      return "활동이 발생했습니다.";
  }
}
