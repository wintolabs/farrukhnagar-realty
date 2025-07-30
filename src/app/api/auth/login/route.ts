// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const adminPass = process.env.ADMIN_PASSWORD!;

  if (!password) {
    return NextResponse.json(
      { success: false, error: "Missing password" },
      { status: 400 }
    );
  }
  if (password !== adminPass) {
    return NextResponse.json(
      { success: false, error: "Invalid password" },
      { status: 401 }
    );
  }

  // On success, set a secure HTTP-only cookie
  const res = NextResponse.json({ success: true });
  res.cookies.set({
    name: "admin-session",
    value: "1",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 2, // 2 hours
  });

  return res;
}
