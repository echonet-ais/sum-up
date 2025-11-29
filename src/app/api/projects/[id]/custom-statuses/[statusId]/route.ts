import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import type { CustomStatus } from "@/types";

function mapCustomStatusRowToCustomStatus(row: any): CustomStatus {
  return {
    id: row.id,
    projectId: row.project_id,
    name: row.name,
    color: row.color ?? undefined,
    position: row.position,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; statusId: string }> }
) {
  try {
    const { id, statusId } = await params;
    const supabase = await createServerClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 프로젝트 접근 권한 및 관리 권한 확인
    const { data: project } = await supabase
      .from("projects")
      .select("team_id")
      .eq("id", id)
      .is("deleted_at", null)
      .single();

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // 팀 멤버 권한 확인 (OWNER, ADMIN만 가능)
    const { data: member } = await supabase
      .from("team_members")
      .select("role")
      .eq("team_id", project.team_id)
      .eq("user_id", user.id)
      .single();

    if (!member || !["OWNER", "ADMIN"].includes(member.role)) {
      return NextResponse.json(
        { error: "Forbidden: Only team owners and admins can manage custom statuses" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name, color, position } = body as {
      name?: string;
      color?: string;
      position?: number;
    };

    const updates: Record<string, unknown> = {};
    if (name !== undefined) {
      if (name.trim().length === 0 || name.length > 30) {
        return NextResponse.json(
          { error: "상태 이름은 1~30자여야 합니다." },
          { status: 400 }
        );
      }
      updates.name = name.trim();
    }
    if (color !== undefined) updates.color = color || null;
    if (position !== undefined) updates.position = position;

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "No fields to update" },
        { status: 400 }
      );
    }

    const { data: updatedStatus, error } = await supabase
      .from("custom_statuses")
      .update(updates)
      .eq("id", statusId)
      .eq("project_id", id)
      .select("*")
      .single();

    if (error || !updatedStatus) {
      const status = error?.code === "PGRST116" ? 404 : 500;
      return NextResponse.json(
        { error: "Failed to update custom status" },
        { status }
      );
    }

    const customStatus = mapCustomStatusRowToCustomStatus(updatedStatus);

    return NextResponse.json(customStatus);
  } catch (error) {
    console.error("Unexpected error updating custom status:", error);
    return NextResponse.json(
      { error: "Failed to update custom status" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; statusId: string }> }
) {
  try {
    const { id, statusId } = await params;
    const supabase = await createServerClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 프로젝트 접근 권한 및 관리 권한 확인
    const { data: project } = await supabase
      .from("projects")
      .select("team_id")
      .eq("id", id)
      .is("deleted_at", null)
      .single();

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // 팀 멤버 권한 확인 (OWNER, ADMIN만 가능)
    const { data: member } = await supabase
      .from("team_members")
      .select("role")
      .eq("team_id", project.team_id)
      .eq("user_id", user.id)
      .single();

    if (!member || !["OWNER", "ADMIN"].includes(member.role)) {
      return NextResponse.json(
        { error: "Forbidden: Only team owners and admins can manage custom statuses" },
        { status: 403 }
      );
    }

    // 해당 상태를 사용하는 이슈들을 TODO로 이동
    const { error: updateIssuesError } = await supabase
      .from("issues")
      .update({ status: "TODO" })
      .eq("project_id", id)
      .eq("status", statusId)
      .is("deleted_at", null);

    if (updateIssuesError) {
      console.error("Error updating issues:", updateIssuesError);
      // 이슈 업데이트 실패해도 상태 삭제는 진행
    }

    // 커스텀 상태 삭제
    const { error } = await supabase
      .from("custom_statuses")
      .delete()
      .eq("id", statusId)
      .eq("project_id", id);

    if (error) {
      console.error("Error deleting custom status:", error);
      const status = error.code === "PGRST116" ? 404 : 500;
      return NextResponse.json(
        { error: "Failed to delete custom status" },
        { status }
      );
    }

    return NextResponse.json({ message: "Custom status deleted successfully" });
  } catch (error) {
    console.error("Unexpected error deleting custom status:", error);
    return NextResponse.json(
      { error: "Failed to delete custom status" },
      { status: 500 }
    );
  }
}

