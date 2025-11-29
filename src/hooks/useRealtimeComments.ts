/**
 * 실시간 댓글 업데이트 훅
 * Supabase Realtime을 사용하여 댓글 테이블 변경을 실시간으로 감지
 */

"use client";

import { useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase/client";
import type { RealtimeChannel } from "@supabase/supabase-js";
import type { Comment } from "@/types";
import { isRealtimeEnabled } from "@/lib/utils/realtime";

export interface UseRealtimeCommentsOptions {
  issueId: string;
  onCommentInsert?: (comment: Comment) => void;
  onCommentUpdate?: (comment: Comment) => void;
  onCommentDelete?: (commentId: string) => void;
}

export function useRealtimeComments({
  issueId,
  onCommentInsert,
  onCommentUpdate,
  onCommentDelete,
}: UseRealtimeCommentsOptions) {
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    // Realtime이 비활성화되어 있으면 early return
    if (!isRealtimeEnabled() || !issueId) return;

    // Realtime 채널 생성
    const channel = supabase
      .channel(`comments:${issueId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "comments",
          filter: `issue_id=eq.${issueId}`,
        },
        async (payload) => {
          console.log("New comment received:", payload);
          
          // 작성자 정보 조회
          const { data: authorData } = await supabase
            .from("users")
            .select("id, name, email, avatar, created_at, updated_at")
            .eq("id", payload.new.author_id)
            .single();

          const comment: Comment = {
            id: payload.new.id,
            content: payload.new.content,
            issueId: payload.new.issue_id,
            authorId: payload.new.author_id,
            author: authorData
              ? {
                  id: authorData.id,
                  name: authorData.name,
                  email: authorData.email,
                  avatar: authorData.avatar,
                  createdAt: authorData.created_at,
                  updatedAt: authorData.updated_at,
                }
              : {
                  id: payload.new.author_id || "",
                  name: "알 수 없음",
                  email: "",
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                },
            createdAt: payload.new.created_at,
            updatedAt: payload.new.updated_at,
          };

          onCommentInsert?.(comment);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "comments",
          filter: `issue_id=eq.${issueId}`,
        },
        async (payload) => {
          console.log("Comment updated:", payload);
          
          // 작성자 정보 조회
          const { data: authorData } = await supabase
            .from("users")
            .select("id, name, email, avatar, created_at, updated_at")
            .eq("id", payload.new.author_id)
            .single();

          const comment: Comment = {
            id: payload.new.id,
            content: payload.new.content,
            issueId: payload.new.issue_id,
            authorId: payload.new.author_id,
            author: authorData
              ? {
                  id: authorData.id,
                  name: authorData.name,
                  email: authorData.email,
                  avatar: authorData.avatar,
                  createdAt: authorData.created_at,
                  updatedAt: authorData.updated_at,
                }
              : {
                  id: payload.new.author_id || "",
                  name: "알 수 없음",
                  email: "",
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                },
            createdAt: payload.new.created_at,
            updatedAt: payload.new.updated_at,
          };

          onCommentUpdate?.(comment);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "comments",
          filter: `issue_id=eq.${issueId}`,
        },
        (payload) => {
          console.log("Comment deleted:", payload);
          onCommentDelete?.(payload.old.id);
        }
      )
      .subscribe((status) => {
        console.log("Comment channel status:", status);
      });

    channelRef.current = channel;

    return () => {
      // 정리
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [issueId, onCommentInsert, onCommentUpdate, onCommentDelete]);
}

