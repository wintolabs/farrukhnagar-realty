// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = req.cookies.get("admin-session")?.value;

  // Whitelist the login route
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const isProtectedPage = pathname.startsWith("/admin");
  const isProtectedApi = pathname.startsWith("/api/uploadthing");

  if (isProtectedPage || isProtectedApi) {
    if (session === "1") {
      return NextResponse.next();
    }
    // If it’s an admin page, redirect to login
    if (isProtectedPage) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    // Otherwise block API
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Everything else is public
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/uploadthing/:path*"],
};
