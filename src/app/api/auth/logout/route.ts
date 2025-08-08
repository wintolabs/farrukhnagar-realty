import { NextResponse } from "next/server";

export async function POST() {
  try {
    const isProduction = process.env.NODE_ENV === "production";

    const res = NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });

    // Clear the JWT token cookie
    res.cookies.set("admin-token", "", {
      path: "/",
      expires: new Date(0),
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "strict" : "lax",
    });

    return res;
  } catch (error) {
    console.error("Logout API error:", error);
    return NextResponse.json(
      { success: false, error: "Logout failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { success: false, error: "Method not allowed" },
    { status: 405 }
  );
}
