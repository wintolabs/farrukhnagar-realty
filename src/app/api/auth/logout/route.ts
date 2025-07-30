import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });

  // Clear the cookie
  res.cookies.set("admin-session", "", {
    path: "/",
    expires: new Date(0), // Expire immediately
    httpOnly: true,
    sameSite: "lax",
  });

  return res;
}
