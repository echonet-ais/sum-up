import { NextResponse } from "next/server";
import { createServerClient, createServiceClient } from "@/lib/supabase/server";

/**
 * DELETE /api/auth/delete-account
 * 계정 삭제 (Soft Delete)
 */
export async function DELETE(request: Request) {
  try {
    const supabase = await createServerClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // public.users 테이블에서 Soft Delete (deleted_at 설정)
    const { error: updateError } = await supabase
      .from("users")
      .update({
        deleted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (updateError) {
      console.error("Error soft deleting user:", updateError);
      return NextResponse.json(
        { error: "계정 삭제에 실패했습니다." },
        { status: 500 }
      );
    }

    // Supabase Auth에서 사용자 삭제
    // 주의: 이 작업은 되돌릴 수 없습니다
    // admin API를 사용하려면 서비스 역할 키가 필요합니다
    const serviceClient = createServiceClient();
    const { error: deleteError } = await serviceClient.auth.admin.deleteUser(user.id);

    if (deleteError) {
      console.error("Error deleting auth user:", deleteError);
      // public.users는 이미 Soft Delete 되었으므로, Auth 삭제 실패해도 계속 진행
      // 하지만 사용자에게 경고 메시지 반환
      return NextResponse.json(
        { 
          message: "계정이 비활성화되었습니다. 일부 데이터는 남아있을 수 있습니다.",
          warning: true
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "계정이 성공적으로 삭제되었습니다." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error deleting account:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

