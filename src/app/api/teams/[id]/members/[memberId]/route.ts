import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import type { TeamMember, User } from "@/types";

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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; memberId: string }> }
) {
  try {
    const { id, memberId } = await params;
    const supabase = await createServerClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { role } = body as { role?: TeamMember["role"] };

    if (!role) {
      return NextResponse.json(
        { error: "Role is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("team_members")
      .update({ role })
      .eq("id", memberId)
      .eq("team_id", id)
      .select(
        "id, team_id, user_id, role, joined_at, users ( id, name, email, avatar, created_at, updated_at )"
      )
      .single();

    if (error || !data) {
      console.error("Error updating team member:", error);
      const status = error?.code === "PGRST116" ? 404 : 500;
      return NextResponse.json(
        { error: "Failed to update member role" },
        { status }
      );
    }

    const member = mapMemberRowToTeamMember(data);

    return NextResponse.json(member);
  } catch (error) {
    console.error("Unexpected error updating member role:", error);
    return NextResponse.json(
      { error: "Failed to update member role" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; memberId: string }> }
) {
  try {
    const { id, memberId } = await params;
    const supabase = await createServerClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { error } = await supabase
      .from("team_members")
      .delete()
      .eq("id", memberId)
      .eq("team_id", id);

    if (error) {
      console.error("Error removing team member:", error);
      const status = error.code === "PGRST116" ? 404 : 500;
      return NextResponse.json(
        { error: "Failed to remove member" },
        { status }
      );
    }

    return NextResponse.json({ message: "Member removed successfully" });
  } catch (error) {
    console.error("Unexpected error removing member:", error);
    return NextResponse.json(
      { error: "Failed to remove member" },
      { status: 500 }
    );
  }
}


