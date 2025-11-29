import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import type { Project, PaginatedResponse, CustomStatus, WipLimits } from "@/types";

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: 프로젝트 목록 조회
 *     description: 현재 사용자가 접근 가능한 프로젝트 목록을 조회합니다. 팀 멤버만 접근 가능합니다.
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: query
 *         name: teamId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: 팀 ID로 필터링
 *       - in: query
 *         name: isArchived
 *         schema:
 *           type: boolean
 *         description: 아카이브 여부로 필터링
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: 검색어 (프로젝트 이름, 설명 검색)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *           minimum: 1
 *         description: 페이지 번호
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *           minimum: 1
 *           maximum: 100
 *         description: 페이지당 항목 수
 *     responses:
 *       200:
 *         description: 프로젝트 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/PaginatedResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Project'
 *       401:
 *         description: 인증되지 않은 사용자
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   post:
 *     summary: 프로젝트 생성
 *     description: 새로운 프로젝트를 생성합니다. 팀 멤버만 생성 가능합니다.
 *     tags:
 *       - Projects
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - teamId
 *             properties:
 *               name:
 *                 type: string
 *                 example: SumUp 웹앱
 *                 description: 프로젝트 이름
 *               description:
 *                 type: string
 *                 example: AI 기반 이슈 트래킹 시스템
 *                 description: 프로젝트 설명
 *               teamId:
 *                 type: string
 *                 format: uuid
 *                 description: 소속 팀 ID
 *     responses:
 *       201:
 *         description: 프로젝트 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 프로젝트가 생성되었습니다.
 *                 project:
 *                   $ref: '#/components/schemas/Project'
 *       400:
 *         description: 입력값 오류
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: 인증되지 않은 사용자
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
function mapProjectRowToProject(row: any, isFavorite: boolean): Project {
  return {
    id: row.id,
    name: row.name,
    description: row.description ?? undefined,
    teamId: row.team_id,
    isArchived: row.is_archived ?? false,
    isFavorite,
    customStatuses: row.custom_statuses ? (row.custom_statuses as CustomStatus[]) : undefined,
    wipLimits: row.wip_limits ? (row.wip_limits as WipLimits) : undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function GET(request: NextRequest) {
  try {
    const nextResponse = new NextResponse();
    const supabase = await createServerClient(request, nextResponse);
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    // 디버깅: 인증 상태 확인
    if (userError || !user) {
      console.error("Auth error in projects API:", {
        error: userError?.message,
        hasUser: !!user,
        cookies: request.cookies.getAll().map(c => c.name),
      });
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const teamId = searchParams.get("teamId");
    const search = searchParams.get("search");
    const showArchived = searchParams.get("archived") === "true";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from("projects")
      .select("*", { count: "exact" })
      .is("deleted_at", null) // Soft Delete: 삭제되지 않은 프로젝트만 조회
      .order("updated_at", { ascending: false });

    if (teamId) {
      query = query.eq("team_id", teamId);
    }

    if (!showArchived) {
      query = query.eq("is_archived", false);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      // Supabase는 ilike로 부분 검색 지원
      query = query.or(
        `name.ilike.%${searchLower}%,description.ilike.%${searchLower}%`
      );
    }

    const { data, error, count } = await query.range(from, to);

    if (error) {
      console.error("Error fetching projects:", error);
      return NextResponse.json(
        { error: "Failed to fetch projects" },
        { status: 500 }
      );
    }

    const rows = data ?? [];

    // 즐겨찾기 정보 조회
    const projectIds = rows.map((row) => row.id);
    const { data: favoriteRows, error: favoriteError } = await supabase
      .from("project_favorites")
      .select("project_id")
      .eq("user_id", user.id)
      .in("project_id", projectIds.length > 0 ? projectIds : [""]);

    if (favoriteError) {
      console.error("Error fetching project favorites:", favoriteError);
    }

    const favoriteSet = new Set(
      favoriteRows?.map((fav) => fav.project_id as string) ?? []
    );

    const projects: Project[] = rows.map((row) =>
      mapProjectRowToProject(row, favoriteSet.has(row.id))
    );

    const total = count ?? projects.length;
    const totalPages = Math.ceil(total / limit) || 1;

    const response: PaginatedResponse<Project> = {
      data: projects,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Unexpected error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const nextResponse = new NextResponse();
    const supabase = await createServerClient(request, nextResponse);
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, teamId, isFavorite } = body as {
      name?: string;
      description?: string;
      teamId?: string;
      isFavorite?: boolean;
    };

    if (!name || !teamId) {
      return NextResponse.json(
        { error: "Name and teamId are required" },
        { status: 400 }
      );
    }

    // 데이터 제한 검증: 팀당 최대 15개 프로젝트
    const { validateTeamProjectLimit } = await import("@/lib/utils/validation-limits");
    try {
      await validateTeamProjectLimit(teamId);
    } catch (limitError) {
      return NextResponse.json(
        { error: limitError instanceof Error ? limitError.message : "프로젝트 생성 제한을 초과했습니다." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("projects")
      .insert({
        name,
        description: description ?? null,
        team_id: teamId,
        is_archived: false,
      })
      .select("*")
      .single();

    if (error || !data) {
      console.error("Error creating project:", error);
      return NextResponse.json(
        { error: "Failed to create project" },
        { status: 500 }
      );
    }

    if (isFavorite) {
      const { error: favError } = await supabase.from("project_favorites").insert({
        project_id: data.id,
        user_id: user.id,
      });

      if (favError) {
        console.error("Error creating project favorite:", favError);
      }
    }

    // 프로젝트 생성 활동 로그 기록
    const { logTeamActivity, createActivityDescription } = await import("@/lib/utils/team-activity");
    await logTeamActivity(
      teamId,
      user.id,
      "PROJECT_CREATED",
      data.id,
      createActivityDescription("PROJECT_CREATED", { projectName: name })
    );

    const project = mapProjectRowToProject(data, !!isFavorite);

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Unexpected error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}


