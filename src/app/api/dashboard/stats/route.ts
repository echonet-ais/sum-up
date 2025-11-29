import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

/**
 * GET /api/dashboard/stats
 * 대시보드 통계 데이터 조회
 */
export async function GET(request: NextRequest) {
  try {
    const response = new NextResponse();
    const supabase = await createServerClient(request, response);
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      // API는 401 Unauthorized를 반환 (307 리다이렉트는 REST API 관례에 맞지 않음)
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // 실제로 DB에 사용자가 존재하는지 확인 (DB 초기화 후 세션이 남아있을 수 있음)
    const { data: dbUser } = await supabase
      .from("users")
      .select("id")
      .eq("id", user.id)
      .single();

    if (!dbUser) {
      // DB에 사용자가 없으면 세션이 무효한 것으로 간주
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
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

    // 상태별 이슈 분포
    const { data: issuesByStatus } = await supabase
      .from("issues")
      .select("status")
      .is("deleted_at", null);

    const statusCounts: Record<string, number> = {};
    (issuesByStatus || []).forEach((issue) => {
      statusCounts[issue.status] = (statusCounts[issue.status] || 0) + 1;
    });

    // 우선순위별 이슈 분포
    const { data: issuesByPriority } = await supabase
      .from("issues")
      .select("priority")
      .is("deleted_at", null);

    const priorityCounts: Record<string, number> = {};
    (issuesByPriority || []).forEach((issue) => {
      priorityCounts[issue.priority] = (priorityCounts[issue.priority] || 0) + 1;
    });

    return NextResponse.json({
      totalProjects: totalProjects ?? 0,
      totalIssues: totalIssues ?? 0,
      openIssues: openIssues ?? 0,
      completedIssues: completedIssues ?? 0,
      issuesByStatus: statusCounts,
      issuesByPriority: priorityCounts,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}

