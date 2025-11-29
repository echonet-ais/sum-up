import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import type { WipLimit } from "@/types";

function mapWipLimitRowToWipLimit(row: any): WipLimit {
  return {
    id: row.id,
    projectId: row.project_id,
    status: row.status,
    wipLimit: row.wip_limit,
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

    // WIP Limit 조회
    const { data: limitRows, error } = await supabase
      .from("project_wip_limits")
      .select("*")
      .eq("project_id", id);

    if (error) {
      console.error("Error fetching wip limits:", error);
      return NextResponse.json(
        { error: "Failed to fetch wip limits" },
        { status: 500 }
      );
    }

    const wipLimits: WipLimit[] = (limitRows || []).map(
      mapWipLimitRowToWipLimit
    );

    // Record 형식으로 변환
    const limitsRecord: Record<string, number | null> = {};
    wipLimits.forEach((limit) => {
      limitsRecord[limit.status] = limit.wipLimit;
    });

    return NextResponse.json({ data: limitsRecord });
  } catch (error) {
    console.error("Unexpected error fetching wip limits:", error);
    return NextResponse.json(
      { error: "Failed to fetch wip limits" },
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
        { error: "Forbidden: Only team owners and admins can manage wip limits" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { limits } = body as {
      limits: Record<string, number | null>; // status -> limit
    };

    if (!limits || typeof limits !== "object") {
      return NextResponse.json(
        { error: "Invalid limits format" },
        { status: 400 }
      );
    }

    // 각 limit 값 검증
    for (const [status, limit] of Object.entries(limits)) {
      if (limit !== null && (limit < 1 || limit > 50)) {
        return NextResponse.json(
          { error: `WIP Limit for ${status} must be between 1 and 50, or null` },
          { status: 400 }
        );
      }
    }

    // 기존 WIP Limit 삭제 후 새로 생성
    const { error: deleteError } = await supabase
      .from("project_wip_limits")
      .delete()
      .eq("project_id", id);

    if (deleteError) {
      console.error("Error deleting existing wip limits:", deleteError);
    }

    // 새 WIP Limit 생성
    const inserts = Object.entries(limits)
      .filter(([_, limit]) => limit !== null) // null인 것은 저장하지 않음
      .map(([status, limit]) => ({
        project_id: id,
        status,
        wip_limit: limit,
      }));

    if (inserts.length > 0) {
      const { error: insertError } = await supabase
        .from("project_wip_limits")
        .insert(inserts);

      if (insertError) {
        console.error("Error creating wip limits:", insertError);
        return NextResponse.json(
          { error: "Failed to update wip limits" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ data: limits });
  } catch (error) {
    console.error("Unexpected error updating wip limits:", error);
    return NextResponse.json(
      { error: "Failed to update wip limits" },
      { status: 500 }
    );
  }
}

