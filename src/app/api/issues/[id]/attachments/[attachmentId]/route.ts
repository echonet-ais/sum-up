import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

const STORAGE_BUCKET = "issue-attachments";

/**
 * GET /api/issues/[id]/attachments/[attachmentId]/download
 * 파일 다운로드 (서명된 URL 생성)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; attachmentId: string }> }
) {
  try {
    const { id, attachmentId } = await params;
    const supabase = await createServerClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 첨부파일 정보 조회
    const { data: attachment, error: attachmentError } = await supabase
      .from("issue_attachments")
      .select("*")
      .eq("id", attachmentId)
      .eq("issue_id", id)
      .single();

    if (attachmentError || !attachment) {
      return NextResponse.json(
        { error: "Attachment not found" },
        { status: 404 }
      );
    }

    // 파일 경로 추출
    const filePath = attachment.file_url.replace(`${STORAGE_BUCKET}/`, "");

    // 서명된 URL 생성 (1시간 유효)
    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .createSignedUrl(filePath, 3600);

    if (signedUrlError || !signedUrlData) {
      console.error("Error creating signed URL:", signedUrlError);
      return NextResponse.json(
        { error: "Failed to generate download URL" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      downloadUrl: signedUrlData.signedUrl,
      fileName: attachment.file_name,
    });
  } catch (error) {
    console.error("Unexpected error generating download URL:", error);
    return NextResponse.json(
      { error: "Failed to generate download URL" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/issues/[id]/attachments/[attachmentId]
 * 첨부파일 삭제
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; attachmentId: string }> }
) {
  try {
    const { id, attachmentId } = await params;
    const supabase = await createServerClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 첨부파일 정보 조회
    const { data: attachment, error: attachmentError } = await supabase
      .from("issue_attachments")
      .select("*")
      .eq("id", attachmentId)
      .eq("issue_id", id)
      .single();

    if (attachmentError || !attachment) {
      return NextResponse.json(
        { error: "Attachment not found" },
        { status: 404 }
      );
    }

    // 권한 확인 (업로드한 사용자만 삭제 가능, 또는 관리자)
    const { data: userProfile } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    const isAdmin = userProfile?.role === "ADMIN" || userProfile?.role === "OWNER";
    
    if (attachment.uploaded_by !== user.id && !isAdmin) {
      return NextResponse.json(
        { error: "You can only delete your own attachments" },
        { status: 403 }
      );
    }

    // 파일 경로 추출
    const filePath = attachment.file_url.replace(`${STORAGE_BUCKET}/`, "");

    // Storage에서 파일 삭제
    const { error: storageError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .remove([filePath]);

    if (storageError) {
      console.error("Error deleting file from storage:", storageError);
      // Storage 삭제 실패해도 DB는 삭제 (일관성 유지)
    }

    // DB에서 첨부파일 정보 삭제
    const { error: dbError } = await supabase
      .from("issue_attachments")
      .delete()
      .eq("id", attachmentId);

    if (dbError) {
      console.error("Error deleting attachment from database:", dbError);
      return NextResponse.json(
        { error: "Failed to delete attachment" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Attachment deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Unexpected error deleting attachment:", error);
    return NextResponse.json(
      { error: "Failed to delete attachment" },
      { status: 500 }
    );
  }
}

