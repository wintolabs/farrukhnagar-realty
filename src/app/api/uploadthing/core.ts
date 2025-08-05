// src/app/api/uploadthing/core.ts
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { jwtVerify } from "jose";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 10,
    },
  })
    .middleware(async ({ req }) => {
      try {
        const cookieHeader = req.headers.get("cookie") || "";

        // ✅ Extract JWT token instead of simple session cookie
        const adminTokenMatch = cookieHeader.match(/admin-token=([^;]+)/);
        const token = adminTokenMatch ? adminTokenMatch[1] : null;

        if (!token) {
          throw new Error("No authentication token found");
        }

        // ✅ Verify JWT token
        const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
        const { payload } = await jwtVerify(token, secret);

        if (!payload || payload.role !== "admin") {
          throw new Error("Invalid authentication token");
        }

        return { uploadedBy: payload.userId as string };
      } catch (error) {
        console.error("❌ UploadThing middleware error:", error);
        throw new Error("Unauthorized upload - invalid token");
      }
    })
    .onUploadComplete(async ({ file, metadata }) => {
      try {
        return {
          uploadedBy: metadata.uploadedBy,
          fileUrl: file.ufsUrl || file.url,
          fileName: file.name,
          success: true,
        };
      } catch (error) {
        console.error("❌ Upload callback error:", error);
        return {
          uploadedBy: metadata.uploadedBy,
          error: "Callback processing failed but upload succeeded",
        };
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
