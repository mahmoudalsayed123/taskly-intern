import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  if (!accessToken && (pathname === "/" || pathname.startsWith("/projects"))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (accessToken && (pathname === "/login" || pathname === "/sign-up")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/projects/:path*", "/login", "/sign-up"],
};
