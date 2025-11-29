/**
 * 댓글 목 데이터
 */

import type { Comment } from "@/types";
import { mockUsers } from "./users";

export const mockComments: Comment[] = [
  {
    id: "comment1",
    content: "이슈를 확인했습니다. 세션 관리 로직부터 수정하겠습니다.",
    issueId: "issue1",
    authorId: "user1",
    author: mockUsers[0],
    createdAt: new Date("2025-01-20T10:00:00").toISOString(),
    updatedAt: new Date("2025-01-20T10:00:00").toISOString(),
  },
  {
    id: "comment2",
    content: "토큰 갱신 기능은 다음 주에 추가할 예정입니다.",
    issueId: "issue1",
    authorId: "user1",
    author: mockUsers[0],
    createdAt: new Date("2025-01-20T14:30:00").toISOString(),
    updatedAt: new Date("2025-01-20T14:30:00").toISOString(),
  },
  {
    id: "comment3",
    content: "데이터베이스 쿼리를 분석해보니 인덱스가 부족합니다.",
    issueId: "issue2",
    authorId: "user2",
    author: mockUsers[1],
    createdAt: new Date("2025-01-16T09:15:00").toISOString(),
    updatedAt: new Date("2025-01-16T09:15:00").toISOString(),
  },
  {
    id: "comment4",
    content: "UI 개선 작업이 완료되었습니다. 리뷰 부탁드립니다.",
    issueId: "issue3",
    authorId: "user2",
    author: mockUsers[1],
    createdAt: new Date("2025-01-18T11:00:00").toISOString(),
    updatedAt: new Date("2025-01-18T11:00:00").toISOString(),
  },
  {
    id: "comment5",
    content: "테스트 코드 작성 중입니다. 곧 완료 예정입니다.",
    issueId: "issue4",
    authorId: "user1",
    author: mockUsers[0],
    createdAt: new Date("2025-01-19T16:45:00").toISOString(),
    updatedAt: new Date("2025-01-19T16:45:00").toISOString(),
  },
];

/**
 * 댓글 ID로 댓글 찾기
 */
export function findCommentById(id: string): Comment | undefined {
  return mockComments.find((comment) => comment.id === id);
}

/**
 * 이슈 ID로 댓글 찾기 (시간순 정렬)
 */
export function findCommentsByIssueId(issueId: string): Comment[] {
  return mockComments
    .filter((comment) => comment.issueId === issueId)
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
}

/**
 * 작성자 ID로 댓글 찾기
 */
export function findCommentsByAuthorId(authorId: string): Comment[] {
  return mockComments.filter((comment) => comment.authorId === authorId);
}

