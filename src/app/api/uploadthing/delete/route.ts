// src/app/api/uploadthing/delete/route.ts
import { NextRequest, NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

export async function POST(request: NextRequest) {
  try {
    const session = request.cookies.get("admin-session")?.value;

    if (session !== "1") {
      return new NextResponse("Unauthorized", { status: 401 });
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
    console.error("Delete error:", error);
    return new NextResponse("Failed to delete file", { status: 500 });
  }
}
