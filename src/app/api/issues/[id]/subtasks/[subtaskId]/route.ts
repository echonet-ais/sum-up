import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import type { Subtask } from "@/types";

/**
 * PUT /api/issues/[id]/subtasks/[subtaskId]
 * 서브태스크 수정
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; subtaskId: string }> }
) {
  try {
    const { id, subtaskId } = await params;
    const supabase = await createServerClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 서브태스크 존재 여부 확인
    const { data: subtask, error: subtaskError } = await supabase
      .from("subtasks")
      .select("id, issue_id")
      .eq("id", subtaskId)
      .eq("issue_id", id)
      .single();

    if (subtaskError || !subtask) {
      return NextResponse.json(
        { error: "Subtask not found" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { title, completed, order } = body;

    const updates: any = {};
    if (title !== undefined) {
      if (typeof title !== "string" || title.trim().length === 0) {
        return NextResponse.json(
          { error: "Subtask title cannot be empty" },
          { status: 400 }
        );
      }
      updates.title = title.trim();
    }
    if (completed !== undefined) updates.completed = completed;
    if (order !== undefined) updates.order_position = order;
    updates.updated_at = new Date().toISOString();

    // 서브태스크 수정
    const { data: updatedSubtask, error: updateError } = await supabase
      .from("subtasks")
      .update(updates)
      .eq("id", subtaskId)
      .select("*")
      .single();

    if (updateError || !updatedSubtask) {
      console.error("Error updating subtask:", updateError);
      return NextResponse.json(
        { error: "Failed to update subtask" },
        { status: 500 }
      );
    }

    const mappedSubtask: Subtask = {
      id: updatedSubtask.id,
      title: updatedSubtask.title,
      completed: updatedSubtask.completed,
      issueId: updatedSubtask.issue_id,
      order: updatedSubtask.order_position ?? 0,
    };

    return NextResponse.json(mappedSubtask);
  } catch (error) {
    console.error("Unexpected error updating subtask:", error);
    return NextResponse.json(
      { error: "Failed to update subtask" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/issues/[id]/subtasks/[subtaskId]
 * 서브태스크 삭제
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; subtaskId: string }> }
) {
  try {
    const { id, subtaskId } = await params;
    const supabase = await createServerClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 서브태스크 존재 여부 확인
    const { data: subtask, error: subtaskError } = await supabase
      .from("subtasks")
      .select("id, issue_id")
      .eq("id", subtaskId)
      .eq("issue_id", id)
      .single();

    if (subtaskError || !subtask) {
      return NextResponse.json(
        { error: "Subtask not found" },
        { status: 404 }
      );
    }

    // 서브태스크 삭제 (하드 삭제 - 서브태스크는 soft delete 불필요)
    const { error: deleteError } = await supabase
      .from("subtasks")
      .delete()
      .eq("id", subtaskId);

    if (deleteError) {
      console.error("Error deleting subtask:", deleteError);
      return NextResponse.json(
        { error: "Failed to delete subtask" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Subtask deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Unexpected error deleting subtask:", error);
    return NextResponse.json(
      { error: "Failed to delete subtask" },
      { status: 500 }
    );
  }
}

