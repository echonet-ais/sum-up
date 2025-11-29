"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { useAuthStore } from "@/store/auth-store";
import { LoadingState } from "@/components/common";

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAuthenticated, setUser, setToken } = useAuthStore();

  useEffect(() => {
    // OAuth 콜백 처리
    const sessionToken = searchParams.get("session");
    const refreshToken = searchParams.get("refresh");

    if (sessionToken && refreshToken) {
      // 세션 설정
      supabase.auth.setSession({
        access_token: sessionToken,
        refresh_token: refreshToken,
      }).then(async ({ data, error }) => {
        if (error) {
          console.error("Failed to set session:", error);
          router.replace("/login?error=session_failed");
          return;
        }

        if (data.user && data.session) {
          // 사용자 정보 가져오기
          const { data: profile } = await supabase
            .from("users")
            .select("*")
            .eq("id", data.user.id)
            .single();

          // 스토어에 사용자 정보 저장
          setUser({
            id: data.user.id,
            email: data.user.email!,
            name: profile?.name || data.user.user_metadata?.name || "사용자",
            avatar: profile?.avatar || data.user.user_metadata?.avatar_url,
            role: profile?.role || "MEMBER",
          });
          setToken(data.session.access_token);

          // 대시보드로 리다이렉트
          router.replace("/dashboard");
        }
      });
      return;
    }

    // 인증 상태 확인 및 리다이렉트
    const checkAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session) {
        // 로그인하지 않은 경우 로그인 페이지로
        router.replace("/login");
        return;
      }

      // 로그인된 경우 대시보드로
      if (isAuthenticated || user) {
        router.replace("/dashboard");
      } else {
        // 세션은 있지만 스토어에 사용자 정보가 없는 경우
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser) {
          const { data: profile } = await supabase
            .from("users")
            .select("*")
            .eq("id", authUser.id)
            .single();

          setUser({
            id: authUser.id,
            email: authUser.email!,
            name: profile?.name || authUser.user_metadata?.name || "사용자",
            avatar: profile?.avatar || authUser.user_metadata?.avatar_url,
            role: profile?.role || "MEMBER",
          });
          setToken(session.access_token);
          router.replace("/dashboard");
        } else {
          router.replace("/login");
        }
      }
    };

    checkAuth();
  }, [searchParams, router, user, isAuthenticated, setUser, setToken]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoadingState message="리다이렉트 중..." />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<LoadingState message="로딩 중..." />}>
      <HomeContent />
    </Suspense>
  );
}
