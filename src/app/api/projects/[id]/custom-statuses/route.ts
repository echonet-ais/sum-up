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

    // 프로젝트 접근 권한 확인
    const { data: project } = await supabase
      .from("projects")
      .select("id")
      .eq("id", id)
      .is("deleted_at", null)
      .single();

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // 커스텀 상태 조회
    const { data: statusRows, error } = await supabase
      .from("custom_statuses")
      .select("*")
      .eq("project_id", id)
      .order("position", { ascending: true });

    if (error) {
      console.error("Error fetching custom statuses:", error);
      return NextResponse.json(
        { error: "Failed to fetch custom statuses" },
        { status: 500 }
      );
    }

    const customStatuses: CustomStatus[] = (statusRows || []).map(
      mapCustomStatusRowToCustomStatus
    );

    return NextResponse.json({ data: customStatuses });
  } catch (error) {
    console.error("Unexpected error fetching custom statuses:", error);
    return NextResponse.json(
      { error: "Failed to fetch custom statuses" },
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

    // 기존 커스텀 상태 개수 확인 (최대 5개)
    const { count: existingCount } = await supabase
      .from("custom_statuses")
      .select("*", { count: "exact", head: true })
      .eq("project_id", id);

    if ((existingCount || 0) >= 5) {
      return NextResponse.json(
        { error: "최대 5개의 커스텀 상태를 생성할 수 있습니다." },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { name, color, position } = body as {
      name?: string;
      color?: string;
      position?: number;
    };

    if (!name || name.trim().length === 0 || name.length > 30) {
      return NextResponse.json(
        { error: "상태 이름은 1~30자여야 합니다." },
        { status: 400 }
      );
    }

    // 위치가 지정되지 않으면 마지막 위치로 설정
    let finalPosition = position;
    if (finalPosition === undefined) {
      const { data: lastStatus } = await supabase
        .from("custom_statuses")
        .select("position")
        .eq("project_id", id)
        .order("position", { ascending: false })
        .limit(1)
        .single();

      finalPosition = lastStatus ? lastStatus.position + 1 : 0;
    }

    const { data: newStatus, error: insertError } = await supabase
      .from("custom_statuses")
      .insert({
        project_id: id,
        name: name.trim(),
        color: color || null,
        position: finalPosition,
      })
      .select("*")
      .single();

    if (insertError || !newStatus) {
      console.error("Error creating custom status:", insertError);
      return NextResponse.json(
        { error: "Failed to create custom status" },
        { status: 500 }
      );
    }

    const customStatus = mapCustomStatusRowToCustomStatus(newStatus);

    return NextResponse.json(customStatus, { status: 201 });
  } catch (error) {
    console.error("Unexpected error creating custom status:", error);
    return NextResponse.json(
      { error: "Failed to create custom status" },
      { status: 500 }
    );
  }
}

