import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import type { Project, PaginatedResponse } from "@/types";

function mapProjectRowToProject(row: any, isFavorite: boolean): Project {
  return {
    id: row.id,
    name: row.name,
    description: row.description ?? undefined,
    teamId: row.team_id,
    isArchived: row.is_archived ?? false,
    isFavorite,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient();
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
    const supabase = await createServerClient();
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


