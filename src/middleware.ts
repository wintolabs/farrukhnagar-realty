// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = req.cookies.get("admin-session")?.value;

  // Allow UploadThing API routes to pass through without auth check
  if (pathname.startsWith("/api/uploadthing")) {
    return NextResponse.next();
  }

  // Whitelist the login route
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Only protect admin pages (not API routes)
  const isProtectedPage = pathname.startsWith("/admin");

  if (isProtectedPage) {
    if (session === "1") {
      return NextResponse.next();
    }
    // Redirect to login if not authenticated
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  // Everything else is public
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/uploadthing/:path*"],
};
