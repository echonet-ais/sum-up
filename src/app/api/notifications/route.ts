import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import type { Activity } from "@/types";
import type { Notification as UiNotification } from "@/hooks/useNotifications";

function mapRowToNotification(row: any): UiNotification {
  return {
    id: row.id,
    type: row.type as UiNotification["type"],
    title: row.description,
    message: row.description,
    read: row.read_at != null,
    link: undefined,
    createdAt: row.created_at,
  };
}

export async function GET(request: NextRequest) {
  try {
    const response = new NextResponse();
    const supabase = await createServerClient(request, response);
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

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

    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error("Error fetching notifications:", error);
      return NextResponse.json(
        { error: "Failed to fetch notifications" },
        { status: 500 }
      );
    }

    const rows = data ?? [];
    const notifications: UiNotification[] = rows.map(mapRowToNotification);

    return NextResponse.json(notifications);
  } catch (error) {
    console.error("Unexpected error fetching notifications:", error);
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}


