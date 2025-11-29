import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import type { User } from "@/types";

/**
 * GET /api/users/search?email=...
 * 이메일로 사용자 검색
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    if (!email || email.trim().length === 0) {
      return NextResponse.json(
        { error: "Email parameter is required" },
        { status: 400 }
      );
    }

    // 이메일로 사용자 검색 (부분 일치)
    const { data: users, error } = await supabase
      .from("users")
      .select("id, name, email, avatar, role, created_at, updated_at")
      .ilike("email", `%${email.trim()}%`)
      .is("deleted_at", null) // Soft Delete: 삭제되지 않은 사용자만 검색
      .limit(limit);

    if (error) {
      console.error("Error searching users:", error);
      return NextResponse.json(
        { error: "Failed to search users" },
        { status: 500 }
      );
    }

    const mappedUsers: User[] = (users || []).map((row: any) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      avatar: row.avatar ?? undefined,
      role: row.role,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));

    return NextResponse.json(mappedUsers);
  } catch (error) {
    console.error("Unexpected error searching users:", error);
    return NextResponse.json(
      { error: "Failed to search users" },
      { status: 500 }
    );
  }
}

