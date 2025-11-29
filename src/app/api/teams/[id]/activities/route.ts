import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import type { TeamActivity, User } from "@/types";

interface ActivityRow {
  id: string;
  team_id: string;
  user_id: string | null;
  type: string;
  target_id: string;
  description: string;
  created_at: string;
  users: {
    id: string;
    name: string;
    email: string;
    avatar?: string | null;
    created_at: string;
    updated_at: string;
  } | null;
}

function mapActivityRowToTeamActivity(row: ActivityRow): TeamActivity {
  const user: User | null = row.users
    ? {
        id: row.users.id,
        name: row.users.name,
        email: row.users.email,
        avatar: row.users.avatar ?? undefined,
        createdAt: row.users.created_at,
        updatedAt: row.users.updated_at,
      }
    : null;

  return {
    id: row.id,
    teamId: row.team_id,
    type: row.type as TeamActivity["type"],
    userId: row.user_id || "",
    user: user || {
      id: row.user_id || "",
      name: "알 수 없음",
      email: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    description: row.description,
    createdAt: row.created_at,
  };
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createServerClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 페이지네이션 파라미터
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const offset = (page - 1) * limit;

    // 팀 멤버인지 확인
    const { data: memberCheck } = await supabase
      .from("team_members")
      .select("id")
      .eq("team_id", id)
      .eq("user_id", user.id)
      .single();

    if (!memberCheck) {
      return NextResponse.json(
        { error: "Forbidden: Not a team member" },
        { status: 403 }
      );
    }

    // 활동 로그 조회
    const { data: activityRows, error: activitiesError } = await supabase
      .from("activities")
      .select(
        `
        id,
        team_id,
        user_id,
        type,
        target_id,
        description,
        created_at,
        users (
          id,
          name,
          email,
          avatar,
          created_at,
          updated_at
        )
        `
      )
      .eq("team_id", id)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (activitiesError) {
      console.error("Error fetching team activities:", activitiesError);
      return NextResponse.json(
        { error: "Failed to fetch activities" },
        { status: 500 }
      );
    }

    // 전체 개수 조회
    const { count, error: countError } = await supabase
      .from("activities")
      .select("*", { count: "exact", head: true })
      .eq("team_id", id);

    if (countError) {
      console.error("Error counting activities:", countError);
    }

    const activities: TeamActivity[] = (activityRows || []).map((row) => {
      // Supabase join 결과에서 users는 단일 객체로 반환됨
      const activityRow: ActivityRow = {
        ...row,
        users: Array.isArray(row.users) ? row.users[0] : row.users,
      };
      return mapActivityRowToTeamActivity(activityRow);
    });

    const total = count || 0;
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      data: activities,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Unexpected error fetching team activities:", error);
    return NextResponse.json(
      { error: "Failed to fetch activities" },
      { status: 500 }
    );
  }
}
