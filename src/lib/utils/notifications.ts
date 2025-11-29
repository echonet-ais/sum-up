import { createServerClient } from "@/lib/supabase/server";

/**
 * 알림 타입 정의
 */
export type NotificationType =
  | "ISSUE_ASSIGNED"
  | "ISSUE_COMMENTED"
  | "ISSUE_MENTIONED"
  | "ISSUE_STATUS_CHANGED"
  | "MEMBER_INVITED"
  | "MEMBER_ROLE_CHANGED"
  | "PROJECT_CREATED"
  | "PROJECT_UPDATED"
  | "DUE_DATE_APPROACHING"
  | "DUE_DATE_TODAY";

/**
 * 알림 생성 인터페이스
 */
export interface CreateNotificationParams {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  targetId?: string; // 이슈 ID, 프로젝트 ID 등
  link?: string; // 클릭 시 이동할 링크
}

/**
 * 알림 생성 함수
 * @param params 알림 생성 파라미터
 */
export async function createNotification(
  params: CreateNotificationParams
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createServerClient();

    const { userId, type, title, message, targetId, link } = params;

    // 알림 생성
    const { error } = await supabase.from("notifications").insert({
      user_id: userId,
      type,
      title,
      message,
      target_id: targetId || null,
      link: link || null,
      read_at: null,
    });

    if (error) {
      console.error("Error creating notification:", error);
      return {
        success: false,
        error: error.message,
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Unexpected error creating notification:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create notification",
    };
  }
}

/**
 * 이슈 할당 알림 생성
 * @param assigneeId 담당자 ID
 * @param issueId 이슈 ID
 * @param issueTitle 이슈 제목
 * @param assignerId 할당한 사용자 ID (선택)
 */
export async function notifyIssueAssigned(
  assigneeId: string,
  issueId: string,
  issueTitle: string,
  assignerId?: string
): Promise<void> {
  try {
    const supabase = await createServerClient();

    // 할당한 사용자 정보 조회 (있으면)
    let assignerName = "누군가";
    if (assignerId) {
      const { data: assigner } = await supabase
        .from("users")
        .select("name")
        .eq("id", assignerId)
        .is("deleted_at", null)
        .single();

      if (assigner?.name) {
        assignerName = assigner.name;
      }
    }

    await createNotification({
      userId: assigneeId,
      type: "ISSUE_ASSIGNED",
      title: "이슈가 할당되었습니다",
      message: `${assignerName}님이 "${issueTitle}" 이슈를 할당했습니다.`,
      targetId: issueId,
      link: `/issues/${issueId}`,
    });
  } catch (error) {
    console.error("Error notifying issue assignment:", error);
    // 알림 생성 실패해도 이슈 할당은 성공으로 처리
  }
}

/**
 * 이슈 댓글 알림 생성
 * @param issueId 이슈 ID
 * @param issueTitle 이슈 제목
 * @param commenterId 댓글 작성자 ID
 * @param commenterName 댓글 작성자 이름
 */
export async function notifyIssueCommented(
  issueId: string,
  issueTitle: string,
  commenterId: string,
  commenterName: string
): Promise<void> {
  try {
    const supabase = await createServerClient();

    // 이슈 정보 조회 (작성자, 담당자)
    const { data: issue } = await supabase
      .from("issues")
      .select("author_id, assignee_id")
      .eq("id", issueId)
      .is("deleted_at", null)
      .single();

    if (!issue) return;

    const notifyUserIds = new Set<string>();

    // 이슈 작성자에게 알림 (댓글 작성자가 아닌 경우)
    if (issue.author_id && issue.author_id !== commenterId) {
      notifyUserIds.add(issue.author_id);
    }

    // 이슈 담당자에게 알림 (있는 경우, 댓글 작성자가 아닌 경우)
    if (issue.assignee_id && issue.assignee_id !== commenterId && !notifyUserIds.has(issue.assignee_id)) {
      notifyUserIds.add(issue.assignee_id);
    }

    // 알림 생성
    const notificationPromises = Array.from(notifyUserIds).map((userId) =>
      createNotification({
        userId,
        type: "ISSUE_COMMENTED",
        title: "이슈에 댓글이 작성되었습니다",
        message: `${commenterName}님이 "${issueTitle}" 이슈에 댓글을 작성했습니다.`,
        targetId: issueId,
        link: `/issues/${issueId}`,
      })
    );

    await Promise.all(notificationPromises);
  } catch (error) {
    console.error("Error notifying issue comment:", error);
    // 알림 생성 실패해도 댓글 작성은 성공으로 처리
  }
}

/**
 * 이슈 멘션 알림 생성
 * @param mentionedUserIds 멘션된 사용자 ID 목록
 * @param issueId 이슈 ID
 * @param issueTitle 이슈 제목
 * @param commenterName 댓글 작성자 이름
 */
export async function notifyIssueMentioned(
  mentionedUserIds: string[],
  issueId: string,
  issueTitle: string,
  commenterName: string
): Promise<void> {
  try {
    if (mentionedUserIds.length === 0) return;

    // 알림 생성
    const notificationPromises = mentionedUserIds.map((userId) =>
      createNotification({
        userId,
        type: "ISSUE_MENTIONED",
        title: "이슈에서 멘션되었습니다",
        message: `${commenterName}님이 "${issueTitle}" 이슈에서 당신을 멘션했습니다.`,
        targetId: issueId,
        link: `/issues/${issueId}`,
      })
    );

    await Promise.all(notificationPromises);
  } catch (error) {
    console.error("Error notifying issue mention:", error);
  }
}

/**
 * 이슈 상태 변경 알림 생성
 * @param assigneeId 담당자 ID
 * @param issueId 이슈 ID
 * @param issueTitle 이슈 제목
 * @param newStatus 새로운 상태
 */
export async function notifyIssueStatusChanged(
  assigneeId: string | null,
  issueId: string,
  issueTitle: string,
  newStatus: string
): Promise<void> {
  try {
    // DONE 상태로 변경된 경우에만 알림
    if (newStatus !== "DONE" || !assigneeId) return;

    await createNotification({
      userId: assigneeId,
      type: "ISSUE_STATUS_CHANGED",
      title: "이슈가 완료되었습니다",
      message: `"${issueTitle}" 이슈가 완료 상태로 변경되었습니다.`,
      targetId: issueId,
      link: `/issues/${issueId}`,
    });
  } catch (error) {
    console.error("Error notifying issue status change:", error);
  }
}

/**
 * 팀 멤버 초대 알림 생성
 * @param userId 초대된 사용자 ID
 * @param teamId 팀 ID
 * @param teamName 팀 이름
 * @param inviterName 초대한 사용자 이름
 */
export async function notifyMemberInvited(
  userId: string,
  teamId: string,
  teamName: string,
  inviterName: string
): Promise<void> {
  try {
    await createNotification({
      userId,
      type: "MEMBER_INVITED",
      title: "팀에 초대되었습니다",
      message: `${inviterName}님이 "${teamName}" 팀에 초대했습니다.`,
      targetId: teamId,
      link: `/teams/${teamId}`,
    });
  } catch (error) {
    console.error("Error notifying member invite:", error);
  }
}

/**
 * 팀 멤버 역할 변경 알림 생성
 * @param userId 역할이 변경된 사용자 ID
 * @param teamId 팀 ID
 * @param teamName 팀 이름
 * @param oldRole 이전 역할
 * @param newRole 새로운 역할
 * @param changerName 변경한 사용자 이름
 */
export async function notifyRoleChanged(
  userId: string,
  teamId: string,
  teamName: string,
  oldRole: string,
  newRole: string,
  changerName: string
): Promise<void> {
  try {
    await createNotification({
      userId,
      type: "MEMBER_ROLE_CHANGED",
      title: "역할이 변경되었습니다",
      message: `${changerName}님이 "${teamName}" 팀에서 당신의 역할을 "${oldRole}"에서 "${newRole}"로 변경했습니다.`,
      targetId: teamId,
      link: `/teams/${teamId}`,
    });
  } catch (error) {
    console.error("Error notifying role change:", error);
  }
}

/**
 * 마감일 임박 알림 생성 (내일 마감)
 * @param assigneeId 담당자 ID
 * @param issueId 이슈 ID
 * @param issueTitle 이슈 제목
 * @param dueDate 마감일
 */
export async function notifyDueDateApproaching(
  assigneeId: string,
  issueId: string,
  issueTitle: string,
  dueDate: string
): Promise<void> {
  try {
    await createNotification({
      userId: assigneeId,
      type: "DUE_DATE_APPROACHING",
      title: "마감일이 임박했습니다",
      message: `"${issueTitle}" 이슈의 마감일이 내일입니다.`,
      targetId: issueId,
      link: `/issues/${issueId}`,
    });
  } catch (error) {
    console.error("Error notifying due date approaching:", error);
  }
}

/**
 * 마감일 당일 알림 생성
 * @param assigneeId 담당자 ID
 * @param issueId 이슈 ID
 * @param issueTitle 이슈 제목
 * @param dueDate 마감일
 */
export async function notifyDueDateToday(
  assigneeId: string,
  issueId: string,
  issueTitle: string,
  dueDate: string
): Promise<void> {
  try {
    await createNotification({
      userId: assigneeId,
      type: "DUE_DATE_TODAY",
      title: "오늘 마감일입니다",
      message: `"${issueTitle}" 이슈의 마감일이 오늘입니다.`,
      targetId: issueId,
      link: `/issues/${issueId}`,
    });
  } catch (error) {
    console.error("Error notifying due date today:", error);
  }
}

/**
 * 멘션된 사용자 ID 추출
 * @param content 댓글 내용
 * @returns 멘션된 사용자 ID 목록
 */
export function extractMentions(content: string): string[] {
  // @username 패턴 찾기
  const mentionRegex = /@(\w+)/g;
  const mentions: string[] = [];
  let match;

  while ((match = mentionRegex.exec(content)) !== null) {
    mentions.push(match[1]);
  }

  return [...new Set(mentions)]; // 중복 제거
}
