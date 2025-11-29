import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

/**
 * GET /api/dashboard/activities
 * 최근 활동 내역 조회
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

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    // 알림을 활동 피드로 사용 (최근 알림 조회)
    const { data: notifications, error: notificationsError } = await supabase
      .from("notifications")
      .select(
        `
        id,
        type,
        title,
        message,
        created_at,
        user_id,
        target_id,
        users!notifications_user_id_fkey(id, name, email, avatar)
        `
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (notificationsError) {
      console.error("Error fetching activities:", notificationsError);
      return NextResponse.json(
        { error: "Failed to fetch activities" },
        { status: 500 }
      );
    }

    // 알림을 활동 피드 형식으로 변환
    const activities = (notifications || []).map((notification: any) => {
      // Supabase join 결과는 단일 객체 또는 배열일 수 있음
      const userData = Array.isArray(notification.users) 
        ? notification.users[0] 
        : notification.users;
      const user = userData as { id: string; name: string; email: string; avatar?: string } | null | undefined;
      
      return {
        id: notification.id,
        type: notification.type as "ISSUE_CREATED" | "ISSUE_UPDATED" | "ISSUE_COMMENTED" | "PROJECT_CREATED" | "PROJECT_UPDATED",
        userId: user?.id || notification.user_id,
        user: user ? {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        } : {
          id: notification.user_id,
          name: "알 수 없음",
          email: "",
        },
        targetId: notification.target_id || "",
        title: notification.title || "",
        description: notification.message || "",
        timestamp: notification.created_at,
        createdAt: notification.created_at,
      };
    });

    return NextResponse.json(activities);
  } catch (error) {
    console.error("Error fetching activities:", error);
    return NextResponse.json(
      { error: "Failed to fetch activities" },
      { status: 500 }
    );
  }
}

