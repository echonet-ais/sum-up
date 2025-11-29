import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import type { Team, PaginatedResponse } from "@/types";
import { logTeamActivity, createActivityDescription } from "@/lib/utils/team-activity";

/**
 * @swagger
 * /api/teams:
 *   get:
 *     summary: 팀 목록 조회
 *     description: 현재 사용자가 속한 팀 목록을 조회합니다. 검색 및 페이지네이션을 지원합니다.
 *     tags:
 *       - Teams
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: 검색어 (팀 이름, 설명 검색)
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
 *         description: 팀 목록 조회 성공
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
 *                         $ref: '#/components/schemas/Team'
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
 *     summary: 팀 생성
 *     description: 새로운 팀을 생성합니다. 생성자는 자동으로 OWNER 역할을 가집니다.
 *     tags:
 *       - Teams
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: 개발팀
 *                 description: 팀 이름
 *               description:
 *                 type: string
 *                 example: SumUp 웹앱 개발을 담당하는 팀입니다.
 *                 description: 팀 설명
 *               avatar:
 *                 type: string
 *                 format: uri
 *                 nullable: true
 *                 description: 팀 아바타 이미지 URL
 *     responses:
 *       201:
 *         description: 팀 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 팀이 생성되었습니다.
 *                 team:
 *                   $ref: '#/components/schemas/Team'
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
function mapTeamRowToTeam(row: any): Team {
  return {
    id: row.id,
    name: row.name,
    description: row.description ?? undefined,
    avatar: row.avatar ?? undefined,
    members: [],
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

    if (userError || !user) {
      // API는 401 Unauthorized를 반환 (307 리다이렉트는 REST API 관례에 맞지 않음)
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // 실제로 DB에 사용자가 존재하는지 확인 (DB 초기화 후 세션이 남아있을 수 있음)
    const { data: dbUser } = await supabase
      .from("users")
      .select("id")
      .eq("id", user.id)
      .single();

    if (!dbUser) {
      // DB에 사용자가 없으면 세션이 무효한 것으로 간주
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // RLS에 의해 현재 사용자(team_members.user_id = auth.uid())가 속한 팀만 조회됨
    let query = supabase
      .from("teams")
      .select("*", { count: "exact" })
      .is("deleted_at", null) // Soft Delete: 삭제되지 않은 팀만 조회
      .order("updated_at", { ascending: false });

    if (search) {
      const searchLower = search.toLowerCase();
      query = query.or(
        `name.ilike.%${searchLower}%,description.ilike.%${searchLower}%`
      );
    }

    const { data, error, count } = await query.range(from, to);

    if (error) {
      console.error("Error fetching teams:", error);
      return NextResponse.json(
        { error: "Failed to fetch teams" },
        { status: 500 }
      );
    }

    const rows = data ?? [];
    const teams: Team[] = rows.map(mapTeamRowToTeam);

    const total = count ?? teams.length;
    const totalPages = Math.ceil(total / limit) || 1;

    const response: PaginatedResponse<Team> = {
      data: teams,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Unexpected error fetching teams:", error);
    return NextResponse.json(
      { error: "Failed to fetch teams" },
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
      // API는 401 Unauthorized를 반환 (307 리다이렉트는 REST API 관례에 맞지 않음)
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // 실제로 DB에 사용자가 존재하는지 확인 (DB 초기화 후 세션이 남아있을 수 있음)
    const { data: dbUser } = await supabase
      .from("users")
      .select("id")
      .eq("id", user.id)
      .single();

    if (!dbUser) {
      // DB에 사용자가 없으면 세션이 무효한 것으로 간주
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, description, avatar } = body as {
      name?: string;
      description?: string;
      avatar?: string;
    };

    if (!name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("teams")
      .insert({
        name,
        description: description ?? null,
        avatar: avatar ?? null,
        owner_id: user.id,
      })
      .select("*")
      .single();

    if (error || !data) {
      console.error("Error creating team:", error);
      return NextResponse.json(
        { error: "Failed to create team" },
        { status: 500 }
      );
    }

    // 팀 멤버에 OWNER로 추가
    const { error: memberError } = await supabase.from("team_members").insert({
      team_id: data.id,
      user_id: user.id,
      role: "OWNER",
    });

    if (memberError) {
      console.error("Error creating team member:", memberError);
    }

    // 팀 생성 활동 로그 기록
    await logTeamActivity(
      data.id,
      user.id,
      "TEAM_CREATED",
      data.id,
      createActivityDescription("TEAM_CREATED", { teamName: name })
    );

    const team = mapTeamRowToTeam(data);

    return NextResponse.json(team, { status: 201 });
  } catch (error) {
    console.error("Unexpected error creating team:", error);
    return NextResponse.json(
      { error: "Failed to create team" },
      { status: 500 }
    );
  }
}


