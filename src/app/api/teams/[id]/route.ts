import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import type { Team, TeamMember, User } from "@/types";

interface TeamMemberRow {
  id: string;
  team_id: string;
  user_id: string;
  role: TeamMember["role"];
  joined_at: string;
  users: {
    id: string;
    name: string;
    email: string;
    avatar?: string | null;
    created_at: string;
    updated_at: string;
  };
}

function mapTeamRowToTeam(row: any, members: TeamMember[]): Team {
  return {
    id: row.id,
    name: row.name,
    description: row.description ?? undefined,
    avatar: row.avatar ?? undefined,
    members,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapMemberRowToTeamMember(row: any): TeamMember {
  // Supabase join 결과에서 users는 배열일 수 있음
  const userData = Array.isArray(row.users) ? row.users[0] : row.users;
  
  if (!userData) {
    throw new Error("User data not found");
  }

  const user: User = {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    avatar: userData.avatar ?? undefined,
    createdAt: userData.created_at,
    updatedAt: userData.updated_at,
  };

  return {
    id: row.id,
    userId: row.user_id,
    teamId: row.team_id,
    role: row.role,
    user,
    joinedAt: row.joined_at,
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

    const { data: teamRow, error: teamError } = await supabase
      .from("teams")
      .select("*")
      .eq("id", id)
      .single();

    if (teamError || !teamRow) {
      const status = teamError?.code === "PGRST116" ? 404 : 500;
      return NextResponse.json(
        { error: "Team not found" },
        { status }
      );
    }

    const { data: memberRows, error: membersError } = await supabase
      .from("team_members")
      .select(
        "id, team_id, user_id, role, joined_at, users ( id, name, email, avatar, created_at, updated_at )"
      )
      .eq("team_id", id)
      .order("joined_at", { ascending: true });

    if (membersError) {
      console.error("Error fetching team members:", membersError);
    }

    const members: TeamMember[] =
      (memberRows || []).map(mapMemberRowToTeamMember);

    const team = mapTeamRowToTeam(teamRow, members);

    return NextResponse.json(team);
  } catch (error) {
    console.error("Unexpected error fetching team:", error);
    return NextResponse.json(
      { error: "Failed to fetch team" },
      { status: 500 }
    );
  }
}

export async function PUT(
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

    const body = await request.json();
    const { name, description, avatar } = body as Partial<{
      name: string;
      description?: string;
      avatar?: string;
    }>;

    const updates: Record<string, unknown> = {};
    if (typeof name === "string") updates.name = name;
    if (typeof description === "string" || description === null) {
      updates.description = description ?? null;
    }
    if (typeof avatar === "string" || avatar === null) {
      updates.avatar = avatar ?? null;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "No fields to update" },
        { status: 400 }
      );
    }

    const { data: updatedRow, error } = await supabase
      .from("teams")
      .update(updates)
      .eq("id", id)
      .select("*")
      .single();

    if (error || !updatedRow) {
      const status = error?.code === "PGRST116" ? 404 : 500;
      return NextResponse.json(
        { error: "Failed to update team" },
        { status }
      );
    }

    // 멤버 목록 다시 조회
    const { data: memberRows } = await supabase
      .from("team_members")
      .select(
        "id, team_id, user_id, role, joined_at, users ( id, name, email, avatar, created_at, updated_at )"
      )
      .eq("team_id", id)
      .order("joined_at", { ascending: true });

    const members: TeamMember[] =
      (memberRows || []).map(mapMemberRowToTeamMember);

    const team = mapTeamRowToTeam(updatedRow, members);

    return NextResponse.json(team);
  } catch (error) {
    console.error("Unexpected error updating team:", error);
    return NextResponse.json(
      { error: "Failed to update team" },
      { status: 500 }
    );
  }
}

export async function DELETE(
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

    const { error } = await supabase
      .from("teams")
      .delete()
      .eq("id", id);

    if (error) {
      const status = error.code === "PGRST116" ? 404 : 500;
      return NextResponse.json(
        { error: "Failed to delete team" },
        { status }
      );
    }

    return NextResponse.json({ message: "Team deleted successfully" });
  } catch (error) {
    console.error("Unexpected error deleting team:", error);
    return NextResponse.json(
      { error: "Failed to delete team" },
      { status: 500 }
    );
  }
}


