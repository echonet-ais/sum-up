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
      // 비로그인 상태일 때 로그인 페이지로 리다이렉트
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("returnUrl", request.url);
      return NextResponse.redirect(loginUrl);
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


