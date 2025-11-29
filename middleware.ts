import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 보호된 라우트 목록
const protectedRoutes = ["/", "/issues", "/projects", "/kanban", "/settings", "/teams"];

// 인증이 필요 없는 라우트 목록
const publicRoutes = ["/login", "/register", "/forgot-password"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 정적 파일이나 API 라우트는 통과
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 쿠키에서 인증 토큰 확인
  const token = request.cookies.get("auth-storage");
  const isAuthenticated = !!token;

  // 보호된 라우트 접근 시
  if (protectedRoutes.some((route) => pathname === route || pathname.startsWith(route + "/"))) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 이미 로그인된 사용자가 로그인 페이지 접근 시
  if (publicRoutes.includes(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

