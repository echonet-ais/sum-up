/**
 * 팀 목 데이터
 */

import type { Team, TeamMember } from "@/types";
import { mockUsers } from "./users";

export const mockTeamMembers: TeamMember[] = [
  {
    id: "tm1",
    userId: "user1",
    teamId: "team1",
    role: "OWNER",
    user: mockUsers[0],
    joinedAt: new Date("2025-01-01").toISOString(),
  },
  {
    id: "tm2",
    userId: "user2",
    teamId: "team1",
    role: "ADMIN",
    user: mockUsers[1],
    joinedAt: new Date("2025-01-02").toISOString(),
  },
  {
    id: "tm3",
    userId: "user3",
    teamId: "team1",
    role: "MEMBER",
    user: mockUsers[2],
    joinedAt: new Date("2025-01-03").toISOString(),
  },
  {
    id: "tm4",
    userId: "user1",
    teamId: "team2",
    role: "OWNER",
    user: mockUsers[0],
    joinedAt: new Date("2025-01-05").toISOString(),
  },
  {
    id: "tm5",
    userId: "user4",
    teamId: "team2",
    role: "MEMBER",
    user: mockUsers[3],
    joinedAt: new Date("2025-01-06").toISOString(),
  },
];

export const mockTeams: Team[] = [
  {
    id: "team1",
    name: "개발팀",
    description: "프로덕션 개발을 담당하는 팀",
    avatar: undefined,
    members: mockTeamMembers.filter((tm) => tm.teamId === "team1"),
    createdAt: new Date("2025-01-01").toISOString(),
    updatedAt: new Date("2025-01-01").toISOString(),
  },
  {
    id: "team2",
    name: "디자인팀",
    description: "UI/UX 디자인을 담당하는 팀",
    avatar: undefined,
    members: mockTeamMembers.filter((tm) => tm.teamId === "team2"),
    createdAt: new Date("2025-01-05").toISOString(),
    updatedAt: new Date("2025-01-05").toISOString(),
  },
];

/**
 * 팀 ID로 팀 찾기
 */
export function findTeamById(id: string): Team | undefined {
  return mockTeams.find((team) => team.id === id);
}

/**
 * 사용자 ID로 소속 팀 찾기
 */
export function findTeamsByUserId(userId: string): Team[] {
  return mockTeams.filter((team) =>
    team.members.some((member) => member.userId === userId)
  );
}

