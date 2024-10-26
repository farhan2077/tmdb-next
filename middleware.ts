import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("demoAuthCookie");

  if (request.nextUrl.pathname === "/watchlist") {
    if (!authToken) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/watchlist", "/login"],
};
