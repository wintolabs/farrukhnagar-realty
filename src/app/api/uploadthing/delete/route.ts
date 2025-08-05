import { NextRequest, NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";
import { jwtVerify } from "jose";

export async function POST(request: NextRequest) {
  try {
    // ✅ Get JWT token instead of simple session cookie
    const token = request.cookies.get("admin-token")?.value;

    if (!token) {
      return new NextResponse("No authentication token", { status: 401 });
    }

    // ✅ Verify JWT token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);

    if (!payload || payload.role !== "admin") {
      return new NextResponse("Invalid authentication token", { status: 401 });
    }

    const { fileKey } = await request.json();

    if (!fileKey) {
      return new NextResponse("File key is required", { status: 400 });
    }

    const utapi = new UTApi();
    await utapi.deleteFiles(fileKey);

    return NextResponse.json({
      success: true,
      message: "File deleted successfully",
    });
  } catch (error) {
    console.error("❌ Delete error:", error);
    return new NextResponse("Failed to delete file", { status: 500 });
  }
}
