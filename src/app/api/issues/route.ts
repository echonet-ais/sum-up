import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import type { Issue, PaginatedResponse, IssueLabel } from "@/types";

function mapIssueRowToIssue(row: any, labels: IssueLabel[] = []): Issue {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? undefined,
    status: row.status,
    priority: row.priority,
    projectId: row.project_id,
    assigneeId: row.assignee_id ?? undefined,
    dueDate: row.due_date ?? undefined,
    labels: labels,
    orderPosition: row.order_position ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId");
    const status = searchParams.get("status");
    const priority = searchParams.get("priority");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const sortBy = searchParams.get("sortBy") || "updated";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from("issues")
      .select("*", { count: "exact" })
      .is("deleted_at", null);

    if (projectId) {
      query = query.eq("project_id", projectId);
    }

    if (status) {
      query = query.eq("status", status);
    }

    if (priority) {
      query = query.eq("priority", priority);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      query = query.or(
        `title.ilike.%${searchLower}%,description.ilike.%${searchLower}%`
      );
    }

    // 정렬
    const orderColumn =
      sortBy === "created"
        ? "created_at"
        : sortBy === "title"
        ? "title"
        : "updated_at";
    query = query.order(orderColumn, {
      ascending: sortOrder === "asc",
    });

    const { data, error, count } = await query.range(from, to);

    if (error) {
      console.error("Error fetching issues:", error);
      return NextResponse.json(
        { error: "Failed to fetch issues" },
        { status: 500 }
      );
    }

    const rows = data ?? [];

    // 라벨 정보 조회
    const issueIds = rows.map((row) => row.id);
    let labelsMap: Map<string, IssueLabel[]> = new Map();

    if (issueIds.length > 0) {
      const { data: labelMappings, error: labelError } = await supabase
        .from("issue_label_mappings")
        .select("issue_id, issue_labels(id, name, color)")
        .in("issue_id", issueIds);

      if (!labelError && labelMappings) {
        for (const mapping of labelMappings) {
          const issueId = mapping.issue_id as string;
          const label = mapping.issue_labels as any;
          if (label) {
            if (!labelsMap.has(issueId)) {
              labelsMap.set(issueId, []);
            }
            labelsMap.get(issueId)!.push({
              id: label.id,
              name: label.name,
              color: label.color,
            });
          }
        }
      }
    }

    const issues: Issue[] = rows.map((row) =>
      mapIssueRowToIssue(row, labelsMap.get(row.id) || [])
    );

    const total = count ?? issues.length;
    const totalPages = Math.ceil(total / limit) || 1;

    const response: PaginatedResponse<Issue> = {
      data: issues,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Unexpected error fetching issues:", error);
    return NextResponse.json(
      { error: "Failed to fetch issues" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      description,
      status,
      priority,
      projectId,
      assigneeId,
      dueDate,
      labels,
      subtasks,
    } = body as {
      title?: string;
      description?: string;
      status?: Issue["status"];
      priority?: Issue["priority"];
      projectId?: string;
      assigneeId?: string;
      dueDate?: Date | string;
      labels?: string[];
      subtasks?: Array<{ title: string }>;
    };

    if (!title || !priority || !projectId) {
      return NextResponse.json(
        { error: "Title, priority, and projectId are required" },
        { status: 400 }
      );
    }

    // 이슈 생성
    const { data: issueData, error: issueError } = await supabase
      .from("issues")
      .insert({
        title,
        description: description ?? null,
        status: status || "TODO",
        priority,
        project_id: projectId,
        assignee_id: assigneeId ?? null,
        due_date: dueDate ? new Date(dueDate).toISOString() : null,
      })
      .select("*")
      .single();

    if (issueError || !issueData) {
      console.error("Error creating issue:", issueError);
      return NextResponse.json(
        { error: "Failed to create issue" },
        { status: 500 }
      );
    }

    // 라벨 매핑 생성
    if (labels && labels.length > 0) {
      const labelMappings = labels.map((labelId) => ({
        issue_id: issueData.id,
        label_id: labelId,
      }));

      const { error: labelError } = await supabase
        .from("issue_label_mappings")
        .insert(labelMappings);

      if (labelError) {
        console.error("Error creating issue labels:", labelError);
      }
    }

    // 서브태스크 생성
    if (subtasks && subtasks.length > 0) {
      const subtaskRows = subtasks.map((subtask, index) => ({
        issue_id: issueData.id,
        title: subtask.title,
        completed: false,
        order_position: index,
      }));

      const { error: subtaskError } = await supabase
        .from("subtasks")
        .insert(subtaskRows);

      if (subtaskError) {
        console.error("Error creating subtasks:", subtaskError);
      }
    }

    // 라벨 정보 조회
    const { data: labelMappings } = await supabase
      .from("issue_label_mappings")
      .select("issue_labels(id, name, color)")
      .eq("issue_id", issueData.id);

    const issueLabels: IssueLabel[] =
      labelMappings?.map((mapping: any) => ({
        id: mapping.issue_labels.id,
        name: mapping.issue_labels.name,
        color: mapping.issue_labels.color,
      })) || [];

    const issue = mapIssueRowToIssue(issueData, issueLabels);

    return NextResponse.json(issue, { status: 201 });
  } catch (error) {
    console.error("Unexpected error creating issue:", error);
    return NextResponse.json(
      { error: "Failed to create issue" },
      { status: 500 }
    );
  }
}

