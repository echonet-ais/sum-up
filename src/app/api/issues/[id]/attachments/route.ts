import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import type { IssueAttachment } from "@/types";

const STORAGE_BUCKET = "issue-attachments";
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

/**
 * GET /api/issues/[id]/attachments
 * 이슈 첨부파일 목록 조회
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

    // 첨부파일 목록 조회
    const { data: attachments, error: attachmentsError } = await supabase
      .from("issue_attachments")
      .select("*")
      .eq("issue_id", id)
      .order("uploaded_at", { ascending: false });

    if (attachmentsError) {
      console.error("Error fetching attachments:", attachmentsError);
      return NextResponse.json(
        { error: "Failed to fetch attachments" },
        { status: 500 }
      );
    }

    // 서명된 URL 생성 (다운로드용)
    const mappedAttachments: IssueAttachment[] = await Promise.all(
      (attachments || []).map(async (row: any) => {
        // 서명된 URL 생성 (1시간 유효)
        let signedUrl = row.file_url;
        if (row.file_url.startsWith(STORAGE_BUCKET + "/")) {
          const { data: signedUrlData } = await supabase.storage
            .from(STORAGE_BUCKET)
            .createSignedUrl(row.file_url.replace(`${STORAGE_BUCKET}/`, ""), 3600);
          signedUrl = signedUrlData?.signedUrl || row.file_url;
        }

        return {
          id: row.id,
          issueId: row.issue_id,
          fileName: row.file_name,
          fileSize: row.file_size,
          fileType: row.file_type,
          fileUrl: signedUrl,
          uploadedBy: row.uploaded_by || "",
          uploadedAt: row.uploaded_at,
        };
      })
    );

    return NextResponse.json(mappedAttachments);
  } catch (error) {
    console.error("Unexpected error fetching attachments:", error);
    return NextResponse.json(
      { error: "Failed to fetch attachments" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/issues/[id]/attachments
 * 파일 업로드
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

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "File is required" },
        { status: 400 }
      );
    }

    // 파일 크기 검증
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File size exceeds maximum limit of ${MAX_FILE_SIZE / 1024 / 1024}MB` },
        { status: 400 }
      );
    }

    // 파일명 생성 (issue_id/user_id/timestamp_filename)
    const timestamp = Date.now();
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const filePath = `${id}/${user.id}/${timestamp}_${sanitizedFileName}`;

    // Supabase Storage에 파일 업로드
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, file, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Error uploading file:", uploadError);
      return NextResponse.json(
        { error: "Failed to upload file" },
        { status: 500 }
      );
    }

    // DB에 첨부파일 정보 저장
    const { data: attachment, error: dbError } = await supabase
      .from("issue_attachments")
      .insert({
        issue_id: id,
        file_name: file.name,
        file_size: file.size,
        file_type: file.type,
        file_url: `${STORAGE_BUCKET}/${filePath}`,
        uploaded_by: user.id,
      })
      .select("*")
      .single();

    if (dbError || !attachment) {
      // DB 저장 실패 시 업로드된 파일 삭제
      await supabase.storage.from(STORAGE_BUCKET).remove([filePath]);
      console.error("Error saving attachment to database:", dbError);
      return NextResponse.json(
        { error: "Failed to save attachment information" },
        { status: 500 }
      );
    }

    // 서명된 URL 생성
    const { data: signedUrlData } = await supabase.storage
      .from(STORAGE_BUCKET)
      .createSignedUrl(filePath, 3600);

    const mappedAttachment: IssueAttachment = {
      id: attachment.id,
      issueId: attachment.issue_id,
      fileName: attachment.file_name,
      fileSize: attachment.file_size,
      fileType: attachment.file_type,
      fileUrl: signedUrlData?.signedUrl || `${STORAGE_BUCKET}/${filePath}`,
      uploadedBy: attachment.uploaded_by || "",
      uploadedAt: attachment.uploaded_at,
    };

    return NextResponse.json(mappedAttachment, { status: 201 });
  } catch (error) {
    console.error("Unexpected error uploading attachment:", error);
    return NextResponse.json(
      { error: "Failed to upload attachment" },
      { status: 500 }
    );
  }
}

