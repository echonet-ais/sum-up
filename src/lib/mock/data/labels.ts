/**
 * 라벨 목 데이터
 */

import type { IssueLabel } from "@/types";

export const mockLabels: IssueLabel[] = [
  {
    id: "label1",
    name: "버그",
    color: "#EF4444",
  },
  {
    id: "label2",
    name: "프론트엔드",
    color: "#3B82F6",
  },
  {
    id: "label3",
    name: "백엔드",
    color: "#10B981",
  },
  {
    id: "label4",
    name: "디자인",
    color: "#8B5CF6",
  },
  {
    id: "label5",
    name: "문서화",
    color: "#F59E0B",
  },
  {
    id: "label6",
    name: "리팩토링",
    color: "#6366F1",
  },
  {
    id: "label7",
    name: "성능",
    color: "#EC4899",
  },
  {
    id: "label8",
    name: "보안",
    color: "#DC2626",
  },
];

/**
 * 프로젝트별 라벨 (프로젝트당 최대 20개)
 * 프로젝트 ID를 키로 하는 맵
 */
export const mockProjectLabels: Record<string, IssueLabel[]> = {
  proj1: [
    mockLabels[0], // 버그
    mockLabels[1], // 프론트엔드
    mockLabels[2], // 백엔드
    mockLabels[5], // 리팩토링
  ],
  proj2: [
    mockLabels[1], // 프론트엔드
    mockLabels[3], // 디자인
  ],
  proj4: [
    mockLabels[3], // 디자인
    mockLabels[4], // 문서화
  ],
};

/**
 * 프로젝트 ID로 라벨 찾기
 */
export function findLabelsByProjectId(projectId: string): IssueLabel[] {
  return mockProjectLabels[projectId] || [];
}

/**
 * 라벨 ID로 라벨 찾기
 */
export function findLabelById(id: string): IssueLabel | undefined {
  return mockLabels.find((label) => label.id === id);
}

