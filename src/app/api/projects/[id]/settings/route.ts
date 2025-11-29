import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import type { CustomStatus, WipLimits } from "@/types";

/**
 * GET /api/projects/[id]/settings
 * 프로젝트 설정 조회 (커스텀 상태, WIP Limit)
 */
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

    // 프로젝트 조회
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("id, team_id, custom_statuses, wip_limits")
      .eq("id", id)
      .is("deleted_at", null)
      .single();

    if (projectError || !project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // 팀 멤버인지 확인
    const { data: teamMember } = await supabase
      .from("team_members")
      .select("role")
      .eq("team_id", project.team_id)
      .eq("user_id", user.id)
      .single();

    if (!teamMember) {
      return NextResponse.json(
        { error: "Forbidden: Not a team member" },
        { status: 403 }
      );
    }

    return NextResponse.json({
      customStatuses: (project.custom_statuses as CustomStatus[]) || null,
      wipLimits: (project.wip_limits as WipLimits) || null,
    });
  } catch (error) {
    console.error("Error fetching project settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch project settings" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/projects/[id]/settings
 * 프로젝트 설정 업데이트 (커스텀 상태, WIP Limit)
 */
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
    const { customStatuses, wipLimits } = body as {
      customStatuses?: CustomStatus[] | null;
      wipLimits?: WipLimits | null;
    };

    // 프로젝트 조회
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("team_id")
      .eq("id", id)
      .is("deleted_at", null)
      .single();

    if (projectError || !project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // 팀 멤버이고 ADMIN 또는 OWNER인지 확인
    const { data: teamMember } = await supabase
      .from("team_members")
      .select("role")
      .eq("team_id", project.team_id)
      .eq("user_id", user.id)
      .single();

    if (!teamMember || (teamMember.role !== "ADMIN" && teamMember.role !== "OWNER")) {
      return NextResponse.json(
        { error: "Forbidden: Only admins can update project settings" },
        { status: 403 }
      );
    }

    // 커스텀 상태 검증
    if (customStatuses !== undefined) {
      if (customStatuses !== null && !Array.isArray(customStatuses)) {
        return NextResponse.json(
          { error: "customStatuses must be an array or null" },
          { status: 400 }
        );
      }

      if (customStatuses) {
        // 각 상태에 필수 필드가 있는지 확인
        for (const status of customStatuses) {
          if (!status.id || !status.name || status.position === undefined || !status.color) {
            return NextResponse.json(
              { error: "Each custom status must have id, name, position, and color" },
              { status: 400 }
            );
          }
        }
      }
    }

    // WIP Limit 검증
    if (wipLimits !== undefined) {
      if (wipLimits !== null && typeof wipLimits !== "object") {
        return NextResponse.json(
          { error: "wipLimits must be an object or null" },
          { status: 400 }
        );
      }

      if (wipLimits) {
        // 각 값이 숫자이거나 null인지 확인
        for (const [key, value] of Object.entries(wipLimits)) {
          if (value !== null && (typeof value !== "number" || value < 0)) {
            return NextResponse.json(
              { error: `WIP limit for ${key} must be a positive number or null` },
              { status: 400 }
            );
          }
        }
      }
    }

    // 업데이트할 필드 구성
    const updateData: {
      custom_statuses?: CustomStatus[] | null;
      wip_limits?: WipLimits | null;
    } = {};

    if (customStatuses !== undefined) {
      updateData.custom_statuses = customStatuses;
    }

    if (wipLimits !== undefined) {
      updateData.wip_limits = wipLimits;
    }

    // 프로젝트 설정 업데이트
    const { data: updatedProject, error: updateError } = await supabase
      .from("projects")
      .update(updateData)
      .eq("id", id)
      .select("custom_statuses, wip_limits")
      .single();

    if (updateError) {
      console.error("Error updating project settings:", updateError);
      return NextResponse.json(
        { error: "Failed to update project settings" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      customStatuses: updatedProject.custom_statuses as CustomStatus[] | null,
      wipLimits: updatedProject.wip_limits as WipLimits | null,
    });
  } catch (error) {
    console.error("Error updating project settings:", error);
    return NextResponse.json(
      { error: "Failed to update project settings" },
      { status: 500 }
    );
  }
}

