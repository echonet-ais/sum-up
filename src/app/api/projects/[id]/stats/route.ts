import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

/**
 * GET /api/projects/[id]/stats
 * 프로젝트 통계 데이터 조회
 */
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

    // 프로젝트 접근 권한 확인
    const { data: project } = await supabase
      .from("projects")
      .select("id, team_id")
      .eq("id", id)
      .is("deleted_at", null)
      .single();

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // 전체 이슈 수
    const { count: totalIssues } = await supabase
      .from("issues")
      .select("*", { count: "exact", head: true })
      .eq("project_id", id)
      .is("deleted_at", null);

    // 열린 이슈 수 (TODO, IN_PROGRESS, IN_REVIEW)
    const { count: openIssues } = await supabase
      .from("issues")
      .select("*", { count: "exact", head: true })
      .eq("project_id", id)
      .is("deleted_at", null)
      .in("status", ["TODO", "IN_PROGRESS", "IN_REVIEW"]);

    // 진행 중 이슈 수
    const { count: inProgressIssues } = await supabase
      .from("issues")
      .select("*", { count: "exact", head: true })
      .eq("project_id", id)
      .is("deleted_at", null)
      .eq("status", "IN_PROGRESS");

    // 완료된 이슈 수
    const { count: completedIssues } = await supabase
      .from("issues")
      .select("*", { count: "exact", head: true })
      .eq("project_id", id)
      .is("deleted_at", null)
      .eq("status", "DONE");

    // 상태별 이슈 분포
    const { data: issuesByStatus } = await supabase
      .from("issues")
      .select("status")
      .eq("project_id", id)
      .is("deleted_at", null);

    const statusCounts: Record<string, number> = {};
    (issuesByStatus || []).forEach((issue) => {
      statusCounts[issue.status] = (statusCounts[issue.status] || 0) + 1;
    });

    // 우선순위별 이슈 분포
    const { data: issuesByPriority } = await supabase
      .from("issues")
      .select("priority")
      .eq("project_id", id)
      .is("deleted_at", null);

    const priorityCounts: Record<string, number> = {};
    (issuesByPriority || []).forEach((issue) => {
      priorityCounts[issue.priority] = (priorityCounts[issue.priority] || 0) + 1;
    });

    // 최근 7일간 이슈 생성 추이
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data: recentIssues } = await supabase
      .from("issues")
      .select("created_at")
      .eq("project_id", id)
      .is("deleted_at", null)
      .gte("created_at", sevenDaysAgo.toISOString())
      .order("created_at", { ascending: true });

    // 일별 이슈 생성 수 계산
    const dailyCounts: Record<string, number> = {};
    (recentIssues || []).forEach((issue) => {
      const date = new Date(issue.created_at).toISOString().split("T")[0];
      dailyCounts[date] = (dailyCounts[date] || 0) + 1;
    });

    // 최근 7일 날짜 배열 생성
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toISOString().split("T")[0];
    });

    const dailyTrend = last7Days.map((date) => ({
      date,
      count: dailyCounts[date] || 0,
    }));

    return NextResponse.json({
      totalIssues: totalIssues || 0,
      openIssues: openIssues || 0,
      inProgressIssues: inProgressIssues || 0,
      completedIssues: completedIssues || 0,
      issuesByStatus: statusCounts,
      issuesByPriority: priorityCounts,
      dailyTrend,
    });
  } catch (error) {
    console.error("Error fetching project stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch project stats" },
      { status: 500 }
    );
  }
}

