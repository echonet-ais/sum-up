import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: "ADMIN" | "MEMBER" | "VIEWER";
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  loginWithOAuth: (provider: "google" | "github" | "kakao", token: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  clearError: () => void;
  updateUser: (userData: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch("/api/auth/login", {
            method: "POST",
            credentials: "include", // 쿠키를 포함하여 전송
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          const data = await response.json();

          if (!response.ok) {
            // 이메일 미인증 에러 처리
            if (data.code === "email_not_confirmed") {
              const errorMessage = data.error || "이메일 인증이 완료되지 않았습니다.";
              set({
                isLoading: false,
                error: errorMessage,
              });
              // 이메일 인증 페이지로 리다이렉트
              if (typeof window !== "undefined") {
                window.location.href = `/verify-email?email=${encodeURIComponent(email)}`;
              }
              throw new Error(errorMessage);
            }
            
            throw new Error(data.error || "로그인에 실패했습니다");
          }

          // Supabase 클라이언트에 세션 저장
          const { supabase } = await import("@/lib/supabase/client");
          if (data.session) {
            await supabase.auth.setSession({
              access_token: data.session.access_token,
              refresh_token: data.session.refresh_token,
            });
          }

          set({
            user: data.user,
            token: data.session?.access_token || null,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : "로그인에 실패했습니다",
          });
          throw error;
        }
      },

      register: async (email: string, password: string, name?: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch("/api/auth/signup", {
            method: "POST",
            credentials: "include", // 쿠키를 포함하여 전송
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, name: name || email.split("@")[0] }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || "회원가입에 실패했습니다");
          }

          // 회원가입 성공 시 자동 로그인하지 않음 (로그인 페이지로 이동)
          set({
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : "회원가입에 실패했습니다",
          });
          throw error;
        }
      },

      loginWithOAuth: async (provider: "google" | "github" | "kakao", token: string) => {
        // OAuth 로그인은 OAuthButton에서 signInWithOAuth를 호출하고
        // 콜백에서 처리되므로 여기서는 아무것도 하지 않음
        // 실제 인증은 /auth/callback에서 처리됨
        set({ isLoading: true, error: null });
      },

      logout: async () => {
        try {
          // Supabase 세션 정리
          const { supabase } = await import("@/lib/supabase/client");
          await supabase.auth.signOut();

          // API 호출 (선택 사항)
          await fetch("/api/auth/logout", {
            method: "POST",
            credentials: "include", // 쿠키를 포함하여 전송
          });
        } catch (error) {
          console.error("Logout error:", error);
        } finally {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            error: null,
          });
        }
      },

      setUser: (user: User | null) => {
        set({ user, isAuthenticated: user !== null });
      },

      setToken: (token: string | null) => {
        set({ token });
      },

      clearError: () => {
        set({ error: null });
      },
      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...userData } as User });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

