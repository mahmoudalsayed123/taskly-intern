import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  const protectedRoutes = ["/project", "/invite"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!accessToken && isProtectedRoute) {
    const loginUrl = new URL("/login", request.url);

    const redirectTo = request.nextUrl.pathname + request.nextUrl.search;

    loginUrl.searchParams.set("redirect", redirectTo);

    return NextResponse.redirect(loginUrl);
  }

  if (accessToken && (pathname === "/login" || pathname === "/sign-up")) {
    return NextResponse.redirect(new URL("/project", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/project/:path*", "/login", "/sign-up", "/invite/:path*"],
};
