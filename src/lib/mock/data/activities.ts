/**
 * 활동 로그 목 데이터
 */

import type { Activity } from "@/types";
import { mockUsers } from "./users";

export const mockActivities: Activity[] = [
  {
    id: "activity1",
    type: "PROJECT_CREATED",
    userId: "user1",
    user: mockUsers[0],
    targetId: "proj1",
    description: "프로젝트 'SumUp 웹앱'을 생성했습니다",
    createdAt: new Date("2025-01-10T08:00:00").toISOString(),
  },
  {
    id: "activity2",
    type: "ISSUE_CREATED",
    userId: "user1",
    user: mockUsers[0],
    targetId: "issue1",
    description: "이슈 '로그인 기능 개선'을 생성했습니다",
    createdAt: new Date("2025-01-15T09:00:00").toISOString(),
  },
  {
    id: "activity3",
    type: "ISSUE_UPDATED",
    userId: "user1",
    user: mockUsers[0],
    targetId: "issue1",
    description: "이슈 '로그인 기능 개선'의 상태를 '진행 중'으로 변경했습니다",
    createdAt: new Date("2025-01-20T10:00:00").toISOString(),
  },
  {
    id: "activity4",
    type: "ISSUE_COMMENTED",
    userId: "user1",
    user: mockUsers[0],
    targetId: "issue1",
    description: "이슈 '로그인 기능 개선'에 댓글을 작성했습니다",
    createdAt: new Date("2025-01-20T10:00:00").toISOString(),
  },
  {
    id: "activity5",
    type: "ISSUE_CREATED",
    userId: "user2",
    user: mockUsers[1],
    targetId: "issue2",
    description: "이슈 'API 응답 시간 최적화'를 생성했습니다",
    createdAt: new Date("2025-01-16T11:00:00").toISOString(),
  },
  {
    id: "activity6",
    type: "ISSUE_UPDATED",
    userId: "user2",
    user: mockUsers[1],
    targetId: "issue3",
    description: "이슈 'UI 디자인 개선'의 상태를 '완료'로 변경했습니다",
    createdAt: new Date("2025-01-18T15:00:00").toISOString(),
  },
];

/**
 * 활동 ID로 활동 찾기
 */
export function findActivityById(id: string): Activity | undefined {
  return mockActivities.find((activity) => activity.id === id);
}

/**
 * 사용자 ID로 활동 찾기 (최신순)
 */
export function findActivitiesByUserId(userId: string): Activity[] {
  return mockActivities
    .filter((activity) => activity.userId === userId)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}

/**
 * 타겟 ID로 활동 찾기 (최신순)
 */
export function findActivitiesByTargetId(targetId: string): Activity[] {
  return mockActivities
    .filter((activity) => activity.targetId === targetId)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}

/**
 * 활동 타입으로 활동 찾기
 */
export function findActivitiesByType(type: Activity["type"]): Activity[] {
  return mockActivities
    .filter((activity) => activity.type === type)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}

