import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { notifyDueDateApproaching, notifyDueDateToday } from "@/lib/utils/notifications";

/**
 * POST /api/notifications/check-due-dates
 * 마감일 임박/당일 알림 체크 및 생성
 * 
 * 이 API는 cron job으로 주기적으로 호출되어야 합니다.
 * 예: Vercel Cron Jobs에서 매일 오전 9시에 호출
 * 
 * vercel.json 예시:
 * {
 *   "crons": [{
 *     "path": "/api/notifications/check-due-dates",
 *     "schedule": "0 9 * * *"
 *   }]
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // API 키 검증 (선택사항, 보안 강화용)
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = await createServerClient();
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // 오늘 날짜 (시간 제외)
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(todayStart);
    todayEnd.setDate(todayEnd.getDate() + 1);
    
    // 내일 날짜 (시간 제외)
    const tomorrowStart = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());
    const tomorrowEnd = new Date(tomorrowStart);
    tomorrowEnd.setDate(tomorrowEnd.getDate() + 1);

    // 오늘 마감일인 이슈 조회
    const { data: todayIssues, error: todayError } = await supabase
      .from("issues")
      .select("id, title, assignee_id, due_date")
      .gte("due_date", todayStart.toISOString())
      .lt("due_date", todayEnd.toISOString())
      .not("assignee_id", "is", null)
      .is("deleted_at", null);

    if (todayError) {
      console.error("Error fetching today issues:", todayError);
    }

    // 내일 마감일인 이슈 조회
    const { data: tomorrowIssues, error: tomorrowError } = await supabase
      .from("issues")
      .select("id, title, assignee_id, due_date")
      .gte("due_date", tomorrowStart.toISOString())
      .lt("due_date", tomorrowEnd.toISOString())
      .not("assignee_id", "is", null)
      .is("deleted_at", null);

    if (tomorrowError) {
      console.error("Error fetching tomorrow issues:", tomorrowError);
    }

    let todayCount = 0;
    let tomorrowCount = 0;

    // 오늘 마감일 알림 생성
    if (todayIssues) {
      for (const issue of todayIssues) {
        if (issue.assignee_id && issue.due_date) {
          // 이미 오늘 알림을 보냈는지 확인 (중복 방지)
          const { data: existingNotification } = await supabase
            .from("notifications")
            .select("id")
            .eq("user_id", issue.assignee_id)
            .eq("type", "DUE_DATE_TODAY")
            .eq("metadata->>issueId", issue.id)
            .gte("created_at", todayStart.toISOString())
            .limit(1);

          if (!existingNotification || existingNotification.length === 0) {
            await notifyDueDateToday(
              issue.assignee_id,
              issue.id,
              issue.title,
              issue.due_date
            );
            todayCount++;
          }
        }
      }
    }

    // 내일 마감일 알림 생성
    if (tomorrowIssues) {
      for (const issue of tomorrowIssues) {
        if (issue.assignee_id && issue.due_date) {
          // 이미 내일 알림을 보냈는지 확인 (중복 방지)
          const { data: existingNotification } = await supabase
            .from("notifications")
            .select("id")
            .eq("user_id", issue.assignee_id)
            .eq("type", "DUE_DATE_APPROACHING")
            .eq("metadata->>issueId", issue.id)
            .gte("created_at", todayStart.toISOString())
            .limit(1);

          if (!existingNotification || existingNotification.length === 0) {
            await notifyDueDateApproaching(
              issue.assignee_id,
              issue.id,
              issue.title,
              issue.due_date
            );
            tomorrowCount++;
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      today: todayCount,
      tomorrow: tomorrowCount,
      timestamp: now.toISOString(),
    });
  } catch (error) {
    console.error("Unexpected error checking due dates:", error);
    return NextResponse.json(
      {
        error: "Failed to check due dates",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/notifications/check-due-dates
 * 수동 실행용 (테스트 목적)
 */
export async function GET(request: NextRequest) {
  return POST(request);
}

