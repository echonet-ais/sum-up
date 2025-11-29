import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import type { Subtask } from "@/types";
import { validateIssueSubtaskLimit } from "@/lib/utils/validation-limits";

/**
 * GET /api/issues/[id]/subtasks
 * 이슈 서브태스크 목록 조회
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createServerClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 이슈 존재 여부 확인
    const { data: issue, error: issueError } = await supabase
      .from("issues")
      .select("id")
      .eq("id", id)
      .is("deleted_at", null)
      .single();

    if (issueError || !issue) {
      return NextResponse.json(
        { error: "Issue not found" },
        { status: 404 }
      );
    }

    // 서브태스크 목록 조회
    const { data: subtasks, error: subtasksError } = await supabase
      .from("subtasks")
      .select("*")
      .eq("issue_id", id)
      .order("order_position", { ascending: true });

    if (subtasksError) {
      console.error("Error fetching subtasks:", subtasksError);
      return NextResponse.json(
        { error: "Failed to fetch subtasks" },
        { status: 500 }
      );
    }

    const mappedSubtasks: Subtask[] = (subtasks || []).map((row: any) => ({
      id: row.id,
      title: row.title,
      completed: row.completed,
      issueId: row.issue_id,
      order: row.order_position ?? 0,
    }));

    return NextResponse.json(mappedSubtasks);
  } catch (error) {
    console.error("Unexpected error fetching subtasks:", error);
    return NextResponse.json(
      { error: "Failed to fetch subtasks" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/issues/[id]/subtasks
 * 서브태스크 생성
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createServerClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 이슈 존재 여부 확인
    const { data: issue, error: issueError } = await supabase
      .from("issues")
      .select("id")
      .eq("id", id)
      .is("deleted_at", null)
      .single();

    if (issueError || !issue) {
      return NextResponse.json(
        { error: "Issue not found" },
        { status: 404 }
      );
    }

    // 데이터 제한 검증: 이슈당 최대 20개 서브태스크
    try {
      await validateIssueSubtaskLimit(id);
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : "서브태스크 제한을 초과했습니다" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { title, order } = body;

    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return NextResponse.json(
        { error: "Subtask title is required" },
        { status: 400 }
      );
    }

    // 기존 서브태스크의 최대 order_position 확인
    const { data: existingSubtasks } = await supabase
      .from("subtasks")
      .select("order_position")
      .eq("issue_id", id)
      .order("order_position", { ascending: false })
      .limit(1);

    const maxOrder = existingSubtasks && existingSubtasks.length > 0
      ? (existingSubtasks[0].order_position ?? 0) + 1
      : (order ?? 0);

    // 서브태스크 생성
    const { data: newSubtask, error: subtaskError } = await supabase
      .from("subtasks")
      .insert({
        issue_id: id,
        title: title.trim(),
        completed: false,
        order_position: maxOrder,
      })
      .select("*")
      .single();

    if (subtaskError || !newSubtask) {
      console.error("Error creating subtask:", subtaskError);
      return NextResponse.json(
        { error: "Failed to create subtask" },
        { status: 500 }
      );
    }

    const mappedSubtask: Subtask = {
      id: newSubtask.id,
      title: newSubtask.title,
      completed: newSubtask.completed,
      issueId: newSubtask.issue_id,
      order: newSubtask.order_position ?? 0,
    };

    return NextResponse.json(mappedSubtask, { status: 201 });
  } catch (error) {
    console.error("Unexpected error creating subtask:", error);
    return NextResponse.json(
      { error: "Failed to create subtask" },
      { status: 500 }
    );
  }
}

