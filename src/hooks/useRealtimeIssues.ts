/**
 * 실시간 이슈 업데이트 훅
 * Supabase Realtime을 사용하여 이슈 테이블 변경을 실시간으로 감지
 */

"use client";

import { useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase/client";
import type { RealtimeChannel } from "@supabase/supabase-js";
import type { Issue } from "@/types";
import { isRealtimeEnabled } from "@/lib/utils/realtime";

export interface UseRealtimeIssuesOptions {
  projectId?: string;
  onIssueInsert?: (issue: Issue) => void;
  onIssueUpdate?: (issue: Issue) => void;
  onIssueDelete?: (issueId: string) => void;
}

export function useRealtimeIssues({
  projectId,
  onIssueInsert,
  onIssueUpdate,
  onIssueDelete,
}: UseRealtimeIssuesOptions) {
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    // Realtime이 비활성화되어 있으면 early return
    if (!isRealtimeEnabled()) return;
    // Realtime 채널 생성
    const channelName = projectId ? `issues:project:${projectId}` : "issues:all";
    const channel = supabase
      .channel(channelName)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "issues",
          ...(projectId ? { filter: `project_id=eq.${projectId}` } : {}),
        },
        async (payload) => {
          console.log("New issue received:", payload);
          // 이슈 데이터를 Issue 타입으로 변환 (라벨, 댓글 등은 별도 조회 필요)
          // 여기서는 기본 정보만 전달하고, 상세 정보는 클라이언트에서 다시 조회
          const newIssue: Partial<Issue> = {
            id: payload.new.id,
            title: payload.new.title,
            description: payload.new.description,
            status: payload.new.status as Issue["status"],
            priority: payload.new.priority as Issue["priority"],
            projectId: payload.new.project_id,
            assigneeId: payload.new.assignee_id,
            dueDate: payload.new.due_date,
            orderPosition: payload.new.order_position,
            createdAt: payload.new.created_at,
            updatedAt: payload.new.updated_at,
          };
          // 라벨과 기타 정보는 클라이언트에서 다시 조회하도록 함
          onIssueInsert?.(newIssue as Issue);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "issues",
          ...(projectId ? { filter: `project_id=eq.${projectId}` } : {}),
        },
        async (payload) => {
          console.log("Issue updated:", payload);
          const updatedIssue: Partial<Issue> = {
            id: payload.new.id,
            title: payload.new.title,
            description: payload.new.description,
            status: payload.new.status as Issue["status"],
            priority: payload.new.priority as Issue["priority"],
            projectId: payload.new.project_id,
            assigneeId: payload.new.assignee_id,
            dueDate: payload.new.due_date,
            orderPosition: payload.new.order_position,
            createdAt: payload.new.created_at,
            updatedAt: payload.new.updated_at,
          };
          onIssueUpdate?.(updatedIssue as Issue);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "issues",
          ...(projectId ? { filter: `project_id=eq.${projectId}` } : {}),
        },
        (payload) => {
          console.log("Issue deleted:", payload);
          onIssueDelete?.(payload.old.id);
        }
      )
      .subscribe((status) => {
        console.log("Issue channel status:", status);
      });

    channelRef.current = channel;

    return () => {
      // 정리
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [projectId, onIssueInsert, onIssueUpdate, onIssueDelete]);
}

