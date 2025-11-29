import { describe, it, expect, vi, beforeEach } from "vitest";
import { GET, POST } from "@/app/api/projects/[id]/custom-statuses/route";
import { PUT, DELETE } from "@/app/api/projects/[id]/custom-statuses/[statusId]/route";
import { NextRequest } from "next/server";

// Supabase 클라이언트 모킹
vi.mock("@/lib/supabase/server", () => ({
  createServerClient: vi.fn(() => ({
    auth: {
      getUser: vi.fn(() => ({
        data: { user: { id: "test-user-id" } },
        error: null,
      })),
    },
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn(),
      order: vi.fn().mockReturnThis(),
    })),
  })),
}));

describe("커스텀 상태 API (FR-053)", () => {
  const projectId = "test-project-id";
  const customStatusId = "test-status-id";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("GET /api/projects/[id]/custom-statuses", () => {
    it("커스텀 상태 목록을 조회할 수 있어야 함", async () => {
      const request = new NextRequest(`http://localhost/api/projects/${projectId}/custom-statuses`);
      const params = Promise.resolve({ id: projectId });

      // TODO: 실제 Supabase 모킹 구현 필요
      // const response = await GET(request, { params });
      // expect(response.status).toBe(200);
    });

    it("인증되지 않은 사용자는 접근할 수 없어야 함", async () => {
      // TODO: 인증 실패 케이스 테스트
    });
  });

  describe("POST /api/projects/[id]/custom-statuses", () => {
    it("커스텀 상태를 생성할 수 있어야 함", async () => {
      const request = new NextRequest(`http://localhost/api/projects/${projectId}/custom-statuses`, {
        method: "POST",
        body: JSON.stringify({
          name: "테스트 상태",
          color: "#FF0000",
          position: 0,
        }),
      });
      const params = Promise.resolve({ id: projectId });

      // TODO: 실제 Supabase 모킹 구현 필요
    });

    it("최대 5개까지만 생성할 수 있어야 함", async () => {
      // TODO: 5개 초과 생성 시도 테스트
    });

    it("이름은 1-30자여야 함", async () => {
      // TODO: 이름 길이 검증 테스트
    });
  });

  describe("PUT /api/projects/[id]/custom-statuses/[statusId]", () => {
    it("커스텀 상태를 수정할 수 있어야 함", async () => {
      // TODO: 상태 수정 테스트
    });
  });

  describe("DELETE /api/projects/[id]/custom-statuses/[statusId]", () => {
    it("커스텀 상태를 삭제할 수 있어야 함", async () => {
      // TODO: 상태 삭제 테스트
    });

    it("삭제 시 해당 상태의 이슈는 TODO로 이동해야 함", async () => {
      // TODO: 이슈 상태 변경 테스트
    });
  });
});

