/**
 * 알림 목 데이터
 */

import type { Activity } from "@/types";
import { mockUsers } from "./users";

export const mockNotifications: Activity[] = [
  {
    id: "notif1",
    type: "ISSUE_CREATED",
    userId: "user1",
    user: mockUsers[0],
    targetId: "issue1",
    description: "새 이슈 '로그인 기능 개선'을 생성했습니다",
    createdAt: new Date("2025-01-15T09:00:00").toISOString(),
  },
  {
    id: "notif2",
    type: "ISSUE_UPDATED",
    userId: "user1",
    user: mockUsers[0],
    targetId: "issue1",
    description: "이슈 '로그인 기능 개선'의 상태를 '진행 중'으로 변경했습니다",
    createdAt: new Date("2025-01-20T10:00:00").toISOString(),
  },
  {
    id: "notif3",
    type: "ISSUE_COMMENTED",
    userId: "user1",
    user: mockUsers[0],
    targetId: "issue1",
    description: "이슈 '로그인 기능 개선'에 댓글을 작성했습니다",
    createdAt: new Date("2025-01-20T10:00:00").toISOString(),
  },
  {
    id: "notif4",
    type: "ISSUE_CREATED",
    userId: "user2",
    user: mockUsers[1],
    targetId: "issue2",
    description: "새 이슈 'API 응답 시간 최적화'를 생성했습니다",
    createdAt: new Date("2025-01-16T11:00:00").toISOString(),
  },
  {
    id: "notif5",
    type: "PROJECT_CREATED",
    userId: "user1",
    user: mockUsers[0],
    targetId: "proj1",
    description: "새 프로젝트 'SumUp 웹앱'을 생성했습니다",
    createdAt: new Date("2025-01-10T08:00:00").toISOString(),
  },
];

/**
 * 알림 ID로 알림 찾기
 */
export function findNotificationById(id: string): Activity | undefined {
  return mockNotifications.find((notification) => notification.id === id);
}

/**
 * 사용자 ID로 알림 찾기 (최신순)
 */
export function findNotificationsByUserId(userId: string): Activity[] {
  return mockNotifications
    .filter((notification) => notification.userId === userId)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}

/**
 * 읽지 않은 알림 찾기 (읽음 상태는 별도 관리 필요)
 */
export function findUnreadNotifications(userId: string): Activity[] {
  // TODO: 읽음 상태 필드 추가 필요
  return findNotificationsByUserId(userId);
}

