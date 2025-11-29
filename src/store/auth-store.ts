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
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          const data = await response.json();

          if (!response.ok) {
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
        set({ isLoading: true, error: null });
        try {
          // TODO: 실제 API로 교체
          // const response = await apiClient.post(`/auth/oauth/${provider}`, { token });
          
          // Mock 데이터
          await new Promise((resolve) => setTimeout(resolve, 1000));
          
          const mockUser: User = {
            id: `oauth-${provider}-user`,
            name: provider === "google" ? "구글 사용자" : provider === "github" ? "깃허브 사용자" : "카카오 사용자",
            email: `${provider}@example.com`,
            avatar: undefined,
            role: "MEMBER",
          };
          
          set({
            user: mockUser,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : "OAuth 로그인에 실패했습니다",
          });
          throw error;
        }
      },

      logout: async () => {
        try {
          // Supabase 세션 정리
          const { supabase } = await import("@/lib/supabase/client");
          await supabase.auth.signOut();

          // API 호출 (선택 사항)
          await fetch("/api/auth/logout", {
            method: "POST",
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

