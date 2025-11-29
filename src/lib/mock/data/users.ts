/**
 * 사용자 목 데이터
 */

import type { User } from "@/types";

export const mockUsers: User[] = [
  {
    id: "user1",
    name: "홍길동",
    email: "hong@example.com",
    avatar: undefined,
    role: "OWNER",
    createdAt: new Date("2025-01-01").toISOString(),
    updatedAt: new Date("2025-01-01").toISOString(),
  },
  {
    id: "user2",
    name: "김철수",
    email: "kim@example.com",
    avatar: undefined,
    role: "ADMIN",
    createdAt: new Date("2025-01-02").toISOString(),
    updatedAt: new Date("2025-01-02").toISOString(),
  },
  {
    id: "user3",
    name: "이영희",
    email: "lee@example.com",
    avatar: undefined,
    role: "MEMBER",
    createdAt: new Date("2025-01-03").toISOString(),
    updatedAt: new Date("2025-01-03").toISOString(),
  },
  {
    id: "user4",
    name: "박민수",
    email: "park@example.com",
    avatar: undefined,
    role: "MEMBER",
    createdAt: new Date("2025-01-04").toISOString(),
    updatedAt: new Date("2025-01-04").toISOString(),
  },
];

/**
 * 사용자 ID로 사용자 찾기
 */
export function findUserById(id: string): User | undefined {
  return mockUsers.find((user) => user.id === id);
}

/**
 * 이메일로 사용자 찾기
 */
export function findUserByEmail(email: string): User | undefined {
  return mockUsers.find((user) => user.email === email);
}

