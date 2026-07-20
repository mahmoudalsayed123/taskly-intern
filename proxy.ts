import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  const protectedRoutes = ["/projects"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!accessToken && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (accessToken && (pathname === "/login" || pathname === "/sign-up")) {
    return NextResponse.redirect(new URL("/projects", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/projects/:path*", "/login", "/sign-up"],
};
