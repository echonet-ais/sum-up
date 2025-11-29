import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

/**
 * GET /api/dashboard/stats
 * 대시보드 통계 데이터 조회
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 전체 프로젝트 수 (아카이브되지 않은 것만)
    const { count: totalProjects } = await supabase
      .from("projects")
      .select("*", { count: "exact", head: true })
      .is("deleted_at", null)
      .eq("is_archived", false);

    // 전체 이슈 수 (삭제되지 않은 것만)
    const { count: totalIssues } = await supabase
      .from("issues")
      .select("*", { count: "exact", head: true })
      .is("deleted_at", null);

    // 진행 중 이슈 수 (IN_PROGRESS 상태)
    const { count: openIssues } = await supabase
      .from("issues")
      .select("*", { count: "exact", head: true })
      .is("deleted_at", null)
      .eq("status", "IN_PROGRESS");

    // 완료된 이슈 수 (DONE 상태)
    const { count: completedIssues } = await supabase
      .from("issues")
      .select("*", { count: "exact", head: true })
      .is("deleted_at", null)
      .eq("status", "DONE");

    return NextResponse.json({
      totalProjects: totalProjects ?? 0,
      totalIssues: totalIssues ?? 0,
      openIssues: openIssues ?? 0,
      completedIssues: completedIssues ?? 0,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}

