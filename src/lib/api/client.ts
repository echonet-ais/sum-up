/**
 * SumUp API Client
 * 중앙화된 API 클라이언트 설정
 */

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function parseErrorBody(response: Response): Promise<unknown> {
  try {
    return await response.clone().json();
  } catch {
    try {
      const text = await response.text();
      return text || null;
    } catch {
      return null;
    }
  }
}

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  // Next.js API Routes 사용 시: 빈 문자열 또는 설정되지 않은 경우 상대 경로 사용
  // 외부 API 사용 시: NEXT_PUBLIC_API_BASE_URL에 전체 URL 설정
  let baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  
  // api.example.com 같은 예시 URL이 설정된 경우 빈 문자열로 처리 (로컬 API Routes 사용)
  if (baseUrl.includes("api.example.com") || baseUrl.includes("example.com")) {
    baseUrl = "";
  }
  
  const url = `${baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorBody = await parseErrorBody(response);
      
      // 401 Unauthorized 에러 발생 시 로그인 페이지로 리다이렉트
      if (response.status === 401) {
        // 브라우저 환경에서만 리다이렉트 (서버 사이드에서는 실행되지 않음)
        if (typeof window !== "undefined") {
          const currentPath = window.location.pathname;
          // 로그인/회원가입 페이지에서는 리다이렉트하지 않음 (무한 루프 방지)
          if (!currentPath.startsWith("/login") && !currentPath.startsWith("/register")) {
            // 현재 경로를 저장하여 로그인 후 돌아올 수 있도록
            const returnUrl = encodeURIComponent(currentPath + window.location.search);
            window.location.href = `/login?returnUrl=${returnUrl}`;
            // 리다이렉트 중이므로 에러를 throw하지 않고 대기
            return new Promise(() => {}) as T;
          }
        }
      }
      
      throw new ApiError(
        `API Error: ${response.status} ${response.statusText}`,
        response.status,
        errorBody
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // 네트워크 에러 구분
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new ApiError(
        "네트워크 연결을 확인해주세요. 인터넷 연결이 끊어졌거나 서버에 접근할 수 없습니다.",
        0,
        error
      );
    }
    
    // 기타 네트워크 관련 에러
    if (error instanceof Error && error.name === "NetworkError") {
      throw new ApiError(
        "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        0,
        error
      );
    }
    
    // 알 수 없는 에러
    throw new ApiError(
      `네트워크 오류: ${error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다"}`,
      0,
      error
    );
  }
}

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestInit): Promise<T> =>
    fetchApi<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> =>
    fetchApi<T>(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    }),

  put: <T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> =>
    fetchApi<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: <T>(endpoint: string, options?: RequestInit): Promise<T> =>
    fetchApi<T>(endpoint, { ...options, method: "DELETE" }),
};

