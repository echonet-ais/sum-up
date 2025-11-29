import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import type { Comment } from "@/types";

/**
 * PUT /api/issues/[id]/comments/[commentId]
 * 댓글 수정
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; commentId: string }> }
) {
  try {
    const { id, commentId } = await params;
    const supabase = await createServerClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 댓글 존재 여부 및 권한 확인
    const { data: comment, error: commentError } = await supabase
      .from("comments")
      .select("id, author_id, issue_id")
      .eq("id", commentId)
      .eq("issue_id", id)
      .is("deleted_at", null)
      .single();

    if (commentError || !comment) {
      return NextResponse.json(
        { error: "Comment not found" },
        { status: 404 }
      );
    }

    // 본인 댓글만 수정 가능
    if (comment.author_id !== user.id) {
      return NextResponse.json(
        { error: "You can only edit your own comments" },
        { status: 403 }
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

    // 댓글 수정
    const { data: updatedComment, error: updateError } = await supabase
      .from("comments")
      .update({
        content: content.trim(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", commentId)
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

    if (updateError || !updatedComment) {
      console.error("Error updating comment:", updateError);
      return NextResponse.json(
        { error: "Failed to update comment" },
        { status: 500 }
      );
    }

    const mappedComment: Comment = {
      id: updatedComment.id,
      content: updatedComment.content,
      issueId: updatedComment.issue_id,
      authorId: updatedComment.author_id,
      author: (updatedComment as any).author
        ? {
            id: (updatedComment as any).author.id,
            name: (updatedComment as any).author.name,
            email: (updatedComment as any).author.email,
            avatar: (updatedComment as any).author.avatar,
            createdAt: (updatedComment as any).author.created_at,
            updatedAt: (updatedComment as any).author.updated_at,
          }
        : {
            id: updatedComment.author_id || "",
            name: "알 수 없음",
            email: "",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
      createdAt: updatedComment.created_at,
      updatedAt: updatedComment.updated_at,
    };

    return NextResponse.json(mappedComment);
  } catch (error) {
    console.error("Unexpected error updating comment:", error);
    return NextResponse.json(
      { error: "Failed to update comment" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/issues/[id]/comments/[commentId]
 * 댓글 삭제 (Soft Delete)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; commentId: string }> }
) {
  try {
    const { id, commentId } = await params;
    const supabase = await createServerClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 댓글 존재 여부 및 권한 확인
    const { data: comment, error: commentError } = await supabase
      .from("comments")
      .select("id, author_id, issue_id")
      .eq("id", commentId)
      .eq("issue_id", id)
      .is("deleted_at", null)
      .single();

    if (commentError || !comment) {
      return NextResponse.json(
        { error: "Comment not found" },
        { status: 404 }
      );
    }

    // 본인 댓글만 삭제 가능 (또는 관리자)
    const { data: userProfile } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    const isAdmin = userProfile?.role === "ADMIN" || userProfile?.role === "OWNER";
    
    if (comment.author_id !== user.id && !isAdmin) {
      return NextResponse.json(
        { error: "You can only delete your own comments" },
        { status: 403 }
      );
    }

    // Soft Delete
    const { error: deleteError } = await supabase
      .from("comments")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", commentId);

    if (deleteError) {
      console.error("Error deleting comment:", deleteError);
      return NextResponse.json(
        { error: "Failed to delete comment" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Comment deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Unexpected error deleting comment:", error);
    return NextResponse.json(
      { error: "Failed to delete comment" },
      { status: 500 }
    );
  }
}

