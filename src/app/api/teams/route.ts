import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import type { Team, PaginatedResponse } from "@/types";

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
    const supabase = await createServerClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
    const supabase = await createServerClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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


