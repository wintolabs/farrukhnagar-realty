import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProduction = process.env.NODE_ENV === "production";

  // Allow UploadThing API routes to pass through without auth check
  if (pathname.startsWith("/api/uploadthing")) {
    return NextResponse.next();
  }

  // Read token once
  const token = req.cookies.get("admin-token")?.value;

  // If user navigates to login but already authenticated, redirect to /admin
  if (pathname === "/admin/login") {
    if (token) {
      try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
        await jwtVerify(token, secret);
        return NextResponse.redirect(new URL("/admin", req.url));
      } catch {
        // invalid token? allow them to see login
      }
    }
    return NextResponse.next();
  }

  // Only protect admin pages (everything under /admin)
  const isProtectedPage = pathname.startsWith("/admin");

  if (isProtectedPage) {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch {
      const response = NextResponse.redirect(new URL("/admin/login", req.url));
      response.cookies.set("admin-token", "", {
        expires: new Date(0),
        path: "/",
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "strict" : "lax",
      });
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
