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

  // Whitelist the login route
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Only protect admin pages (not API routes)
  const isProtectedPage = pathname.startsWith("/admin");

  if (isProtectedPage) {
    const token = req.cookies.get("admin-token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    try {
      // Use jose for Edge Runtime compatibility with proper async/await
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

      // Properly await the JWT verification
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch {
      // Invalid or expired token - clear cookie and redirect
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

  // Everything else is public
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
