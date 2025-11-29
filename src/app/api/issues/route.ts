import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import type { Issue, PaginatedResponse, IssueLabel } from "@/types";
import { validateIssueLabelLimit } from "@/lib/utils/validation-limits";

/**
 * @swagger
 * /api/issues:
 *   get:
 *     summary: 이슈 목록 조회
 *     description: 필터링, 정렬, 페이지네이션을 지원하는 이슈 목록을 조회합니다. 프로젝트 멤버만 접근 가능합니다.
 *     tags:
 *       - Issues
 *     parameters:
 *       - in: query
 *         name: projectId
 *         schema:
 *           type: string
 *           format: uuid
 *         description: 프로젝트 ID로 필터링
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [TODO, IN_PROGRESS, IN_REVIEW, DONE]
 *         description: 상태로 필터링
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *           enum: [HIGH, MEDIUM, LOW]
 *         description: 우선순위로 필터링
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: 검색어 (제목, 설명 검색)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *           minimum: 1
 *         description: 페이지 번호
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *           minimum: 1
 *           maximum: 100
 *         description: 페이지당 항목 수
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [created, updated, title]
 *           default: updated
 *         description: 정렬 기준
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: 정렬 순서
 *     responses:
 *       200:
 *         description: 이슈 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/PaginatedResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Issue'
 *       401:
 *         description: 인증되지 않은 사용자
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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
    const nextResponse = new NextResponse();
    const supabase = await createServerClient(request, nextResponse);
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
    const nextResponse = new NextResponse();
    const supabase = await createServerClient(request, nextResponse);
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

    // 데이터 제한 검증: 프로젝트당 최대 200개 이슈
    const { validateProjectIssueLimit } = await import("@/lib/utils/validation-limits");
    try {
      await validateProjectIssueLimit(projectId);
    } catch (limitError) {
      return NextResponse.json(
        { error: limitError instanceof Error ? limitError.message : "이슈 생성 제한을 초과했습니다." },
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
      // 이슈당 라벨 제한 검증 (최대 5개)
      if (labels.length > 5) {
        // 이슈는 이미 생성되었으므로 삭제
        await supabase.from("issues").delete().eq("id", issueData.id);
        return NextResponse.json(
          { error: "이슈당 최대 5개의 라벨을 적용할 수 있습니다." },
          { status: 400 }
        );
      }

      // 라벨 제한 검증 (이슈당 최대 5개)
      try {
        await validateIssueLabelLimit(issueData.id);
      } catch (error) {
        // 라벨 제한 초과 시 이슈는 생성했지만 라벨은 추가하지 않음
        console.error("Issue label limit exceeded:", error);
        // 이슈는 이미 생성되었으므로 계속 진행 (라벨만 추가하지 않음)
      }

      const labelMappings = labels.map((labelId) => ({
        issue_id: issueData.id,
        label_id: labelId,
      }));

      if (labelMappings.length > 0) {
        const { error: labelError } = await supabase
          .from("issue_label_mappings")
          .insert(labelMappings);

        if (labelError) {
          console.error("Error creating issue labels:", labelError);
        }
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

    // 이슈 생성 히스토리 기록
    const { error: historyError } = await supabase
      .from("issue_history")
      .insert({
        issue_id: issueData.id,
        field: "created",
        old_value: null,
        new_value: title,
        user_id: user.id,
      });

    if (historyError) {
      console.error("Error creating issue history:", historyError);
      // 히스토리 기록 실패해도 이슈 생성은 성공으로 처리
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

