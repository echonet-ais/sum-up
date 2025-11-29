import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import type { Project, CustomStatus, WipLimits } from "@/types";

function mapProjectRowToProject(row: any, isFavorite: boolean): Project {
  return {
    id: row.id,
    name: row.name,
    description: row.description ?? undefined,
    teamId: row.team_id,
    isArchived: row.is_archived ?? false,
    isFavorite,
    customStatuses: row.custom_statuses ? (row.custom_statuses as CustomStatus[]) : undefined,
    wipLimits: row.wip_limits ? (row.wip_limits as WipLimits) : undefined,
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

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .is("deleted_at", null) // Soft Delete: 삭제되지 않은 프로젝트만 조회
      .single();

    if (error || !data) {
      const status = error?.code === "PGRST116" ? 404 : 500;
      return NextResponse.json(
        { error: "Project not found" },
        { status }
      );
    }

    const { data: favoriteRows } = await supabase
      .from("project_favorites")
      .select("project_id")
      .eq("user_id", user.id)
      .eq("project_id", id);

    const isFavorite = (favoriteRows?.length ?? 0) > 0;

    // 커스텀 상태 조회
    const { data: customStatusRows } = await supabase
      .from("custom_statuses")
      .select("*")
      .eq("project_id", id)
      .order("position", { ascending: true });

    const customStatuses: CustomStatus[] = (customStatusRows || []).map((row: any) => ({
      id: row.id,
      projectId: row.project_id,
      name: row.name,
      color: row.color ?? undefined,
      position: row.position,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));

    // WIP Limit 조회
    const { data: wipLimitRows } = await supabase
      .from("project_wip_limits")
      .select("*")
      .eq("project_id", id);

    const wipLimits: WipLimits = {};
    (wipLimitRows || []).forEach((row: any) => {
      wipLimits[row.status] = row.wip_limit;
    });

    const project = mapProjectRowToProject(data, isFavorite);
    project.customStatuses = customStatuses.length > 0 ? customStatuses : undefined;
    project.wipLimits = Object.keys(wipLimits).length > 0 ? wipLimits : undefined;

    return NextResponse.json(project);
  } catch (error) {
    console.error("Unexpected error fetching project:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
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
    const { name, description, isArchived, isFavorite } = body as Partial<{
      name: string;
      description?: string;
      isArchived: boolean;
      isFavorite: boolean;
    }>;

    const updates: Record<string, unknown> = {};
    if (typeof name === "string") updates.name = name;
    if (typeof description === "string" || description === null) {
      updates.description = description ?? null;
    }
    if (typeof isArchived === "boolean") updates.is_archived = isArchived;

    let updatedRow: any | null = null;

    if (Object.keys(updates).length > 0) {
      const { data, error } = await supabase
        .from("projects")
        .update(updates)
        .eq("id", id)
        .is("deleted_at", null) // Soft Delete: 삭제되지 않은 프로젝트만 수정 가능
        .select("*")
        .single();

      if (error || !data) {
        const status = error?.code === "PGRST116" ? 404 : 500;
        return NextResponse.json(
          { error: "Failed to update project" },
          { status }
        );
      }

      updatedRow = data;
    } else {
      // 아무 필드도 업데이트하지 않는 경우 현재 값 조회
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .is("deleted_at", null) // Soft Delete: 삭제되지 않은 프로젝트만 조회
        .single();

      if (error || !data) {
        const status = error?.code === "PGRST116" ? 404 : 500;
        return NextResponse.json(
          { error: "Project not found" },
          { status }
        );
      }

      updatedRow = data;
    }

    if (typeof isFavorite === "boolean") {
      if (isFavorite) {
        const { error: favError } = await supabase.from("project_favorites").upsert(
          {
            project_id: id,
            user_id: user.id,
          },
          { onConflict: "project_id,user_id" }
        );

        if (favError) {
          console.error("Error upserting project favorite:", favError);
        }
      } else {
        const { error: favError } = await supabase
          .from("project_favorites")
          .delete()
          .eq("project_id", id)
          .eq("user_id", user.id);

        if (favError) {
          console.error("Error deleting project favorite:", favError);
        }
      }
    }

    const { data: favoriteRows } = await supabase
      .from("project_favorites")
      .select("project_id")
      .eq("user_id", user.id)
      .eq("project_id", id);

    const finalIsFavorite = (favoriteRows?.length ?? 0) > 0;
    const project = mapProjectRowToProject(updatedRow, finalIsFavorite);

    return NextResponse.json(project);
  } catch (error) {
    console.error("Unexpected error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
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

    // 프로젝트 정보 조회 (활동 로그용)
    const { data: projectData } = await supabase
      .from("projects")
      .select("name, team_id")
      .eq("id", id)
      .is("deleted_at", null) // Soft Delete: 삭제되지 않은 프로젝트만 조회
      .single();

    // Soft delete: archived + deleted_at 설정
    const { error } = await supabase
      .from("projects")
      .update({
        is_archived: true,
        deleted_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      const status = error.code === "PGRST116" ? 404 : 500;
      return NextResponse.json(
        { error: "Failed to delete project" },
        { status }
      );
    }

    // 프로젝트 삭제 활동 로그 기록
    if (projectData?.team_id) {
      const { logTeamActivity, createActivityDescription } = await import("@/lib/utils/team-activity");
      await logTeamActivity(
        projectData.team_id,
        user.id,
        "PROJECT_DELETED",
        id,
        createActivityDescription("PROJECT_DELETED", { projectName: projectData.name || "알 수 없음" })
      );
    }

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Unexpected error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}


