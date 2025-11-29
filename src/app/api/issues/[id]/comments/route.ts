import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import type { Comment } from "@/types";
import { notifyIssueCommented, notifyIssueMentioned, extractMentions } from "@/lib/utils/notifications";

/**
 * GET /api/issues/[id]/comments
 * 이슈 댓글 목록 조회
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

    // 댓글 목록 조회
    const { data: comments, error: commentsError } = await supabase
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

    if (commentsError) {
      console.error("Error fetching comments:", commentsError);
      return NextResponse.json(
        { error: "Failed to fetch comments" },
        { status: 500 }
      );
    }

    const mappedComments: Comment[] = (comments || []).map((row: any) => ({
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

    return NextResponse.json(mappedComments);
  } catch (error) {
    console.error("Unexpected error fetching comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/issues/[id]/comments
 * 댓글 생성
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
      .select("id, assignee_id, project_id, title")
      .eq("id", id)
      .is("deleted_at", null)
      .single();

    if (issueError || !issue) {
      return NextResponse.json(
        { error: "Issue not found" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { content } = body;

    if (!content || typeof content !== "string" || content.trim().length === 0) {
      return NextResponse.json(
        { error: "Comment content is required" },
        { status: 400 }
      );
    }

    // 댓글 생성
    const { data: newComment, error: commentError } = await supabase
      .from("comments")
      .insert({
        issue_id: id,
        author_id: user.id,
        content: content.trim(),
      })
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
      .single();

    if (commentError || !newComment) {
      console.error("Error creating comment:", commentError);
      return NextResponse.json(
        { error: "Failed to create comment" },
        { status: 500 }
      );
    }

    const mappedComment: Comment = {
      id: newComment.id,
      content: newComment.content,
      issueId: newComment.issue_id,
      authorId: newComment.author_id,
      author: (newComment as any).author
        ? {
            id: (newComment as any).author.id,
            name: (newComment as any).author.name,
            email: (newComment as any).author.email,
            avatar: (newComment as any).author.avatar,
            createdAt: (newComment as any).author.created_at,
            updatedAt: (newComment as any).author.updated_at,
          }
        : {
            id: newComment.author_id || "",
            name: "알 수 없음",
            email: "",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
      createdAt: newComment.created_at,
      updatedAt: newComment.updated_at,
    };

    // 댓글 작성자 정보 조회
    const commenterName = mappedComment.author.name || "알 수 없음";

    // 댓글 작성 알림 생성 (FR-090)
    await notifyIssueCommented(
      id,
      issue.title,
      user.id,
      commenterName
    );

    // 멘션 알림 생성 (선택)
    const mentions = extractMentions(content.trim());
    if (mentions.length > 0) {
      // 멘션된 사용자 이름으로 사용자 ID 조회
      const { data: mentionedUsers } = await supabase
        .from("users")
        .select("id, name")
        .in("name", mentions)
        .is("deleted_at", null);

      if (mentionedUsers && mentionedUsers.length > 0) {
        const mentionedUserIds = mentionedUsers
          .map((u) => u.id)
          .filter((uid) => uid !== user.id); // 댓글 작성자 제외

        if (mentionedUserIds.length > 0) {
          await notifyIssueMentioned(
            mentionedUserIds,
            id,
            issue.title,
            commenterName
          );
        }
      }
    }


    return NextResponse.json(mappedComment, { status: 201 });
  } catch (error) {
    console.error("Unexpected error creating comment:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}

