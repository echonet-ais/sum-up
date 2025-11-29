import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import type { IssueHistory, User } from "@/types";

interface HistoryRow {
  id: string;
  issue_id: string;
  field: string;
  old_value: string | null;
  new_value: string | null;
  user_id: string | null;
  created_at: string;
  users: {
    id: string;
    name: string;
    email: string;
    avatar?: string | null;
    created_at: string;
    updated_at: string;
  } | null;
}

function mapHistoryRowToIssueHistory(row: HistoryRow): IssueHistory {
  const user: User | null = row.users
    ? {
        id: row.users.id,
        name: row.users.name,
        email: row.users.email,
        avatar: row.users.avatar ?? undefined,
        createdAt: row.users.created_at,
        updatedAt: row.users.updated_at,
      }
    : null;

  return {
    id: row.id,
    issueId: row.issue_id,
    field: row.field as IssueHistory["field"],
    oldValue: row.old_value,
    newValue: row.new_value,
    userId: row.user_id || "",
    user: user || {
      id: row.user_id || "",
      name: "알 수 없음",
      email: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    createdAt: row.created_at,
  };
}

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

    // 이슈 존재 및 접근 권한 확인
    const { data: issueData, error: issueError } = await supabase
      .from("issues")
      .select("id")
      .eq("id", id)
      .is("deleted_at", null)
      .single();

    if (issueError || !issueData) {
      return NextResponse.json(
        { error: "Issue not found" },
        { status: 404 }
      );
    }

    // 페이지네이션 파라미터
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const offset = (page - 1) * limit;

    // 히스토리 조회
    const { data: historyRows, error: historyError } = await supabase
      .from("issue_history")
      .select(
        `
        id,
        issue_id,
        field,
        old_value,
        new_value,
        user_id,
        created_at,
        users (
          id,
          name,
          email,
          avatar,
          created_at,
          updated_at
        )
        `
      )
      .eq("issue_id", id)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (historyError) {
      console.error("Error fetching issue history:", historyError);
      return NextResponse.json(
        { error: "Failed to fetch issue history" },
        { status: 500 }
      );
    }

    // 전체 개수 조회
    const { count, error: countError } = await supabase
      .from("issue_history")
      .select("*", { count: "exact", head: true })
      .eq("issue_id", id);

    if (countError) {
      console.error("Error counting issue history:", countError);
    }

    const history: IssueHistory[] = (historyRows || []).map((row) => {
      // Supabase join 결과에서 users는 단일 객체로 반환됨
      const historyRow: HistoryRow = {
        ...row,
        users: Array.isArray(row.users) ? row.users[0] : row.users,
      };
      return mapHistoryRowToIssueHistory(historyRow);
    });

    const total = count || 0;
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      data: history,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Unexpected error fetching issue history:", error);
    return NextResponse.json(
      { error: "Failed to fetch issue history" },
      { status: 500 }
    );
  }
}
