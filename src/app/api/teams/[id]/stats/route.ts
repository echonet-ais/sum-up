import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

/**
 * GET /api/teams/[id]/stats
 * 팀 통계 조회 (FR-082)
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

    // 팀 멤버인지 확인
    const { data: memberCheck } = await supabase
      .from("team_members")
      .select("id")
      .eq("team_id", id)
      .eq("user_id", user.id)
      .single();

    if (!memberCheck) {
      return NextResponse.json(
        { error: "Forbidden: Not a team member" },
        { status: 403 }
      );
    }

    // 프로젝트 통계
    const { count: totalProjects, error: projectsError } = await supabase
      .from("projects")
      .select("*", { count: "exact", head: true })
      .eq("team_id", id)
      .is("deleted_at", null);

    if (projectsError) {
      console.error("Error counting projects:", projectsError);
    }

    // 아카이브된 프로젝트 개수
    const { count: archivedProjects, error: archivedError } = await supabase
      .from("projects")
      .select("*", { count: "exact", head: true })
      .eq("team_id", id)
      .eq("is_archived", true)
      .is("deleted_at", null);

    if (archivedError) {
      console.error("Error counting archived projects:", archivedError);
    }

    // 활성 프로젝트 개수
    const activeProjects = (totalProjects || 0) - (archivedProjects || 0);

    // 이슈 통계 (팀의 모든 프로젝트에 속한 이슈)
    const { data: teamProjects } = await supabase
      .from("projects")
      .select("id")
      .eq("team_id", id)
      .is("deleted_at", null);

    const projectIds = teamProjects?.map((p) => p.id) || [];

    let totalIssues = 0;
    let issuesByStatus: Record<string, number> = {
      TODO: 0,
      IN_PROGRESS: 0,
      IN_REVIEW: 0,
      DONE: 0,
    };
    let issuesByPriority: Record<string, number> = {
      HIGH: 0,
      MEDIUM: 0,
      LOW: 0,
    };

    if (projectIds.length > 0) {
      const { data: issues, error: issuesError } = await supabase
        .from("issues")
        .select("status, priority")
        .in("project_id", projectIds)
        .is("deleted_at", null);

      if (issuesError) {
        console.error("Error fetching issues:", issuesError);
      } else {
        totalIssues = issues?.length || 0;

        // 상태별 집계
        issues?.forEach((issue) => {
          const status = issue.status as keyof typeof issuesByStatus;
          if (status in issuesByStatus) {
            issuesByStatus[status]++;
          }
        });

        // 우선순위별 집계
        issues?.forEach((issue) => {
          const priority = issue.priority as keyof typeof issuesByPriority;
          if (priority in issuesByPriority) {
            issuesByPriority[priority]++;
          }
        });
      }
    }

    // 멤버 통계
    const { count: totalMembers, error: membersError } = await supabase
      .from("team_members")
      .select("*", { count: "exact", head: true })
      .eq("team_id", id);

    if (membersError) {
      console.error("Error counting members:", membersError);
    }

    // 역할별 멤버 수
    const { data: membersByRole, error: roleError } = await supabase
      .from("team_members")
      .select("role")
      .eq("team_id", id);

    const membersByRoleCount: Record<string, number> = {
      OWNER: 0,
      ADMIN: 0,
      MEMBER: 0,
    };

    if (!roleError && membersByRole) {
      membersByRole.forEach((member) => {
        const role = member.role as keyof typeof membersByRoleCount;
        if (role in membersByRoleCount) {
          membersByRoleCount[role]++;
        }
      });
    }

    // 최근 활동 통계 (최근 7일)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { count: recentActivities, error: activitiesError } = await supabase
      .from("activities")
      .select("*", { count: "exact", head: true })
      .eq("team_id", id)
      .gte("created_at", sevenDaysAgo.toISOString());

    if (activitiesError) {
      console.error("Error counting recent activities:", activitiesError);
    }

    const stats = {
      projects: {
        total: totalProjects || 0,
        active: activeProjects,
        archived: archivedProjects || 0,
      },
      issues: {
        total: totalIssues,
        byStatus: issuesByStatus,
        byPriority: issuesByPriority,
      },
      members: {
        total: totalMembers || 0,
        byRole: membersByRoleCount,
      },
      activities: {
        recent7Days: recentActivities || 0,
      },
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Unexpected error fetching team stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch team statistics" },
      { status: 500 }
    );
  }
}
