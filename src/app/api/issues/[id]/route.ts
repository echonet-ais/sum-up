import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import type { Issue, IssueLabel } from "@/types";

function mapIssueRowToIssue(row: any, labels: IssueLabel[] = []): Issue {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? undefined,
    status: row.status,
    priority: row.priority,
    projectId: row.project_id,
    assigneeId: row.assignee_id ?? undefined,
    dueDate: row.due_date ?? undefined,
    labels: labels,
    orderPosition: row.order_position ?? undefined,
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
      .from("issues")
      .select("*")
      .eq("id", id)
      .is("deleted_at", null)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Issue not found" },
        { status: 404 }
      );
    }

    // 라벨 정보 조회
    const { data: labelMappings } = await supabase
      .from("issue_label_mappings")
      .select("issue_labels(id, name, color)")
      .eq("issue_id", id);

    const issueLabels: IssueLabel[] =
      labelMappings?.map((mapping: any) => ({
        id: mapping.issue_labels.id,
        name: mapping.issue_labels.name,
        color: mapping.issue_labels.color,
      })) || [];

    const issue = mapIssueRowToIssue(data, issueLabels);

    return NextResponse.json(issue);
  } catch (error) {
    console.error("Unexpected error fetching issue:", error);
    return NextResponse.json(
      { error: "Failed to fetch issue" },
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
    const {
      title,
      description,
      status,
      priority,
      projectId,
      assigneeId,
      dueDate,
      orderPosition,
    } = body as {
      title?: string;
      description?: string;
      status?: Issue["status"];
      priority?: Issue["priority"];
      projectId?: string;
      assigneeId?: string;
      dueDate?: Date | string;
      orderPosition?: number;
    };

    const updates: any = {};
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description ?? null;
    if (status !== undefined) updates.status = status;
    if (priority !== undefined) updates.priority = priority;
    if (projectId !== undefined) updates.project_id = projectId;
    if (assigneeId !== undefined) updates.assignee_id = assigneeId ?? null;
    if (dueDate !== undefined)
      updates.due_date = dueDate ? new Date(dueDate).toISOString() : null;
    if (orderPosition !== undefined) updates.order_position = orderPosition;
    updates.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from("issues")
      .update(updates)
      .eq("id", id)
      .select("*")
      .single();

    if (error || !data) {
      console.error("Error updating issue:", error);
      return NextResponse.json(
        { error: "Failed to update issue" },
        { status: 500 }
      );
    }

    // 라벨 정보 조회
    const { data: labelMappings } = await supabase
      .from("issue_label_mappings")
      .select("issue_labels(id, name, color)")
      .eq("issue_id", id);

    const issueLabels: IssueLabel[] =
      labelMappings?.map((mapping: any) => ({
        id: mapping.issue_labels.id,
        name: mapping.issue_labels.name,
        color: mapping.issue_labels.color,
      })) || [];

    const issue = mapIssueRowToIssue(data, issueLabels);

    return NextResponse.json(issue);
  } catch (error) {
    console.error("Unexpected error updating issue:", error);
    return NextResponse.json(
      { error: "Failed to update issue" },
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

    // Soft delete
    const { error } = await supabase
      .from("issues")
      .update({
        deleted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      console.error("Error deleting issue:", error);
      return NextResponse.json(
        { error: "Failed to delete issue" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Unexpected error deleting issue:", error);
    return NextResponse.json(
      { error: "Failed to delete issue" },
      { status: 500 }
    );
  }
}

