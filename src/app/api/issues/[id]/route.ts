import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import type { Issue, IssueLabel } from "@/types";
import { notifyIssueAssigned } from "@/lib/utils/notifications";

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

    // 댓글 정보 조회
    const { data: comments } = await supabase
      .from("comments")
      .select(
        `
        id,
        content,
        issue_id,
        author_id,
        created_at,
        updated_at,
        author:users(id, name, email, avatar)
        `
      )
      .eq("issue_id", id)
      .is("deleted_at", null)
      .order("created_at", { ascending: true });

    const issueComments = (comments || []).map((row: any) => ({
      id: row.id,
      content: row.content,
      issueId: row.issue_id,
      authorId: row.author_id,
      author: row.author
        ? {
            id: row.author.id,
            name: row.author.name,
            email: row.author.email,
            avatar: row.author.avatar,
            createdAt: row.author.created_at,
            updatedAt: row.author.updated_at,
          }
        : {
            id: row.author_id || "",
            name: "알 수 없음",
            email: "",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));

    // 서브태스크 정보 조회
    const { data: subtasks } = await supabase
      .from("subtasks")
      .select("*")
      .eq("issue_id", id)
      .order("order_position", { ascending: true });

    const issueSubtasks = (subtasks || []).map((row: any) => ({
      id: row.id,
      title: row.title,
      completed: row.completed,
      issueId: row.issue_id,
      order: row.order_position ?? 0,
    }));

    // 첨부파일 정보 조회
    const { data: attachments } = await supabase
      .from("issue_attachments")
      .select("*")
      .eq("issue_id", id)
      .order("uploaded_at", { ascending: false });

    const issueAttachments = (attachments || []).map((row: any) => ({
      id: row.id,
      issueId: row.issue_id,
      fileName: row.file_name,
      fileSize: row.file_size,
      fileType: row.file_type,
      fileUrl: row.file_url, // 서명된 URL은 클라이언트에서 요청 시 생성
      uploadedBy: row.uploaded_by || "",
      uploadedAt: row.uploaded_at,
    }));

    const issue = mapIssueRowToIssue(data, issueLabels);
    issue.comments = issueComments;
    issue.subtasks = issueSubtasks;
    issue.attachments = issueAttachments;

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

    // 기존 이슈 조회 (히스토리 기록용)
    const { data: existingIssue } = await supabase
      .from("issues")
      .select("*")
      .eq("id", id)
      .single();

    if (!existingIssue) {
      return NextResponse.json(
        { error: "Issue not found" },
        { status: 404 }
      );
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
      status?: Issue["status"] | string; // 커스텀 상태 ID도 허용
      priority?: Issue["priority"];
      projectId?: string;
      assigneeId?: string;
      dueDate?: Date | string;
      orderPosition?: number;
    };

    const updates: any = {};
    const historyEntries: Array<{
      field: string;
      oldValue: string | null;
      newValue: string | null;
    }> = [];

    // 변경된 필드 감지 및 히스토리 기록 준비
    if (title !== undefined && title !== existingIssue.title) {
      updates.title = title;
      historyEntries.push({
        field: "title",
        oldValue: existingIssue.title || null,
        newValue: title || null,
      });
    }
    if (description !== undefined && description !== existingIssue.description) {
      updates.description = description ?? null;
      historyEntries.push({
        field: "description",
        oldValue: existingIssue.description || null,
        newValue: description || null,
      });
    }
    if (status !== undefined && status !== existingIssue.status) {
      updates.status = status;
      historyEntries.push({
        field: "status",
        oldValue: existingIssue.status || null,
        newValue: status || null,
      });

      // 이슈 상태 변경 알림 생성 (FR-090)
      if (status === "DONE" && existingIssue.assignee_id) {
        const { notifyIssueStatusChanged } = await import("@/lib/utils/notifications");
        await notifyIssueStatusChanged(
          existingIssue.assignee_id,
          id,
          existingIssue.title,
          status
        );
      }
    }
    if (priority !== undefined && priority !== existingIssue.priority) {
      updates.priority = priority;
      historyEntries.push({
        field: "priority",
        oldValue: existingIssue.priority || null,
        newValue: priority || null,
      });
    }
    if (assigneeId !== undefined && assigneeId !== existingIssue.assignee_id) {
      updates.assignee_id = assigneeId ?? null;
      
      // 담당자 이름 조회
      let oldAssigneeName = null;
      let newAssigneeName = null;
      
      if (existingIssue.assignee_id) {
        const { data: oldAssignee } = await supabase
          .from("users")
          .select("name")
          .eq("id", existingIssue.assignee_id)
          .single();
        oldAssigneeName = oldAssignee?.name || null;
      }
      
      if (assigneeId) {
        const { data: newAssignee } = await supabase
          .from("users")
          .select("name")
          .eq("id", assigneeId)
          .single();
        newAssigneeName = newAssignee?.name || null;
      }
      
      historyEntries.push({
        field: "assignee",
        oldValue: oldAssigneeName,
        newValue: newAssigneeName,
      });

      // 담당자 지정 알림 생성 (FR-090)
      if (assigneeId && assigneeId !== existingIssue.assignee_id) {
        await notifyIssueAssigned(
          assigneeId,
          id,
          existingIssue.title,
          user.id
        );
      }
    }
    if (dueDate !== undefined) {
      const newDueDate = dueDate ? new Date(dueDate).toISOString() : null;
      const oldDueDate = existingIssue.due_date ? new Date(existingIssue.due_date).toISOString() : null;
      
      if (newDueDate !== oldDueDate) {
        updates.due_date = newDueDate;
        historyEntries.push({
          field: "dueDate",
          oldValue: oldDueDate,
          newValue: newDueDate,
        });
      }
    }
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

    // 변경 히스토리 기록
    if (historyEntries.length > 0) {
      const historyInserts = historyEntries.map((entry) => ({
        issue_id: id,
        field: entry.field,
        old_value: entry.oldValue,
        new_value: entry.newValue,
        user_id: user.id,
      }));

      const { error: historyError } = await supabase
        .from("issue_history")
        .insert(historyInserts);

      if (historyError) {
        console.error("Error creating issue history:", historyError);
        // 히스토리 기록 실패해도 이슈 업데이트는 성공으로 처리
      }
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

    // 댓글 정보 조회
    const { data: comments } = await supabase
      .from("comments")
      .select(
        `
        id,
        content,
        issue_id,
        author_id,
        created_at,
        updated_at,
        author:users(id, name, email, avatar)
        `
      )
      .eq("issue_id", id)
      .is("deleted_at", null)
      .order("created_at", { ascending: true });

    const issueComments = (comments || []).map((row: any) => ({
      id: row.id,
      content: row.content,
      issueId: row.issue_id,
      authorId: row.author_id,
      author: row.author
        ? {
            id: row.author.id,
            name: row.author.name,
            email: row.author.email,
            avatar: row.author.avatar,
            createdAt: row.author.created_at,
            updatedAt: row.author.updated_at,
          }
        : {
            id: row.author_id || "",
            name: "알 수 없음",
            email: "",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));

    // 서브태스크 정보 조회
    const { data: subtasks } = await supabase
      .from("subtasks")
      .select("*")
      .eq("issue_id", id)
      .order("order_position", { ascending: true });

    const issueSubtasks = (subtasks || []).map((row: any) => ({
      id: row.id,
      title: row.title,
      completed: row.completed,
      issueId: row.issue_id,
      order: row.order_position ?? 0,
    }));

    // 첨부파일 정보 조회
    const { data: attachments } = await supabase
      .from("issue_attachments")
      .select("*")
      .eq("issue_id", id)
      .order("uploaded_at", { ascending: false });

    const issueAttachments = (attachments || []).map((row: any) => ({
      id: row.id,
      issueId: row.issue_id,
      fileName: row.file_name,
      fileSize: row.file_size,
      fileType: row.file_type,
      fileUrl: row.file_url, // 서명된 URL은 클라이언트에서 요청 시 생성
      uploadedBy: row.uploaded_by || "",
      uploadedAt: row.uploaded_at,
    }));

    const issue = mapIssueRowToIssue(data, issueLabels);
    issue.comments = issueComments;
    issue.subtasks = issueSubtasks;
    issue.attachments = issueAttachments;

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

    // 이슈 정보 조회 (히스토리용)
    const { data: issueData } = await supabase
      .from("issues")
      .select("title")
      .eq("id", id)
      .single();

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

    // 이슈 삭제 히스토리 기록
    const { error: historyError } = await supabase
      .from("issue_history")
      .insert({
        issue_id: id,
        field: "deleted",
        old_value: issueData?.title || null,
        new_value: null,
        user_id: user.id,
      });

    if (historyError) {
      console.error("Error creating issue history:", historyError);
      // 히스토리 기록 실패해도 이슈 삭제는 성공으로 처리
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

