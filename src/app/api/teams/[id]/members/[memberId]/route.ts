import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import type { TeamMember, User } from "@/types";
import { notifyRoleChanged } from "@/lib/utils/notifications";

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

    // 기존 멤버 정보 조회 (활동 로그용)
    const { data: existingMember } = await supabase
      .from("team_members")
      .select("role, user_id, users(id, name)")
      .eq("id", memberId)
      .single();

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

    // 역할 변경 활동 로그 기록
    const { logTeamActivity, createActivityDescription } = await import("@/lib/utils/team-activity");
    const existingUserData = existingMember?.users;
    const memberName = Array.isArray(existingUserData)
      ? existingUserData[0]?.name 
      : (existingUserData as unknown as { name?: string } | null)?.name || member.user.name;
    await logTeamActivity(
      id,
      user.id,
      "MEMBER_ROLE_CHANGED",
      member.userId,
      createActivityDescription("MEMBER_ROLE_CHANGED", {
        memberName,
        oldRole: existingMember?.role || "",
        newRole: role,
      })
    );

    // 역할 변경 알림 생성 (FR-090)
    if (existingMember?.role !== role) {
      const { data: teamData } = await supabase
        .from("teams")
        .select("name")
        .eq("id", id)
        .single();

      const { data: changerData } = await supabase
        .from("users")
        .select("name")
        .eq("id", user.id)
        .single();

      const roleNames: Record<string, string> = {
        OWNER: "소유자",
        ADMIN: "관리자",
        MEMBER: "멤버",
      };

      await notifyRoleChanged(
        member.userId,
        id,
        teamData?.name || "팀",
        roleNames[existingMember?.role || ""] || existingMember?.role || "",
        roleNames[role] || role,
        changerData?.name || user.email || "사용자"
      ).catch((err) => {
        console.error("Failed to create role change notification:", err);
      });
    }

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

    // 멤버 정보 조회 (활동 로그용)
    const { data: memberData } = await supabase
      .from("team_members")
      .select("user_id, users(id, name)")
      .eq("id", memberId)
      .single();

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

    // 멤버 제거 활동 로그 기록
    const { logTeamActivity, createActivityDescription } = await import("@/lib/utils/team-activity");
    // 멤버의 사용자 이름 조회
    let memberName = "알 수 없음";
    if (memberData?.user_id) {
      const { data: memberUser } = await supabase
        .from("users")
        .select("name")
        .eq("id", memberData.user_id)
        .single();
      memberName = memberUser?.name || "알 수 없음";
    }
    await logTeamActivity(
      id,
      user.id,
      "MEMBER_REMOVED",
      memberData?.user_id || "",
      createActivityDescription("MEMBER_REMOVED", { memberName })
    );

    return NextResponse.json({ message: "Member removed successfully" });
  } catch (error) {
    console.error("Unexpected error removing member:", error);
    return NextResponse.json(
      { error: "Failed to remove member" },
      { status: 500 }
    );
  }
}


