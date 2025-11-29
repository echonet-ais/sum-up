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

    const { data, error } = await supabase
      .from("team_members")
      .select(
        "id, team_id, user_id, role, joined_at, users ( id, name, email, avatar, created_at, updated_at )"
      )
      .eq("team_id", id)
      .order("joined_at", { ascending: true });

    if (error) {
      console.error("Error fetching team members:", error);
      return NextResponse.json(
        { error: "Failed to fetch team members" },
        { status: 500 }
      );
    }

    const members: TeamMember[] =
      (data || []).map(mapMemberRowToTeamMember);

    return NextResponse.json(members);
  } catch (error) {
    console.error("Unexpected error fetching team members:", error);
    return NextResponse.json(
      { error: "Failed to fetch team members" },
      { status: 500 }
    );
  }
}

export async function POST(
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
    const { email, role } = body as { email?: string; role?: TeamMember["role"] };

    if (!email || !role) {
      return NextResponse.json(
        { error: "Email and role are required" },
        { status: 400 }
      );
    }

    // users 테이블에서 사용자 찾기 또는 생성
    const { data: existingUser, error: findError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    let targetUser = existingUser;

    if (!targetUser) {
      const name = email.split("@")[0] || email;
      const { data: newUser, error: createError } = await supabase
        .from("users")
        .insert({
          id: crypto.randomUUID(),
          email,
          name,
        })
        .select("*")
        .single();

      if (createError || !newUser) {
        console.error("Error creating user for invite:", createError);
        return NextResponse.json(
          { error: "Failed to create user for invite" },
          { status: 500 }
        );
      }

      targetUser = newUser;
    } else if (findError) {
      console.error("Error finding user for invite:", findError);
    }

    const { data: memberRow, error } = await supabase
      .from("team_members")
      .insert({
        team_id: id,
        user_id: targetUser.id,
        role,
      })
      .select(
        "id, team_id, user_id, role, joined_at, users ( id, name, email, avatar, created_at, updated_at )"
      )
      .single();

    if (error || !memberRow) {
      console.error("Error creating team member:", error);
      return NextResponse.json(
        { error: "Failed to invite member" },
        { status: 500 }
      );
    }

    const member = mapMemberRowToTeamMember(memberRow);

    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    console.error("Unexpected error inviting member:", error);
    return NextResponse.json(
      { error: "Failed to invite member" },
      { status: 500 }
    );
  }
}


