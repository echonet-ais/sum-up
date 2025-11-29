import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import type { Project } from "@/types";

function mapProjectRowToProject(row: any, isFavorite: boolean): Project {
  return {
    id: row.id,
    name: row.name,
    description: row.description ?? undefined,
    teamId: row.team_id,
    isArchived: row.is_archived ?? false,
    isFavorite,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
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
      .eq("id", params.id)
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
      .eq("project_id", params.id);

    const isFavorite = (favoriteRows?.length ?? 0) > 0;
    const project = mapProjectRowToProject(data, isFavorite);

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
  { params }: { params: { id: string } }
) {
  try {
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
        .eq("id", params.id)
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
        .eq("id", params.id)
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
            project_id: params.id,
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
          .eq("project_id", params.id)
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
      .eq("project_id", params.id);

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
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createServerClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Soft delete: archived + deleted_at 설정
    const { error } = await supabase
      .from("projects")
      .update({
        is_archived: true,
        deleted_at: new Date().toISOString(),
      })
      .eq("id", params.id);

    if (error) {
      const status = error.code === "PGRST116" ? 404 : 500;
      return NextResponse.json(
        { error: "Failed to delete project" },
        { status }
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


