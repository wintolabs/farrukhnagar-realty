// src/app/api/uploadthing/core.ts
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 10,
    },
  })
    .middleware(async ({ req }) => {
      const cookieHeader = req.headers.get("cookie") || "";

      const isAdmin = cookieHeader
        .split(";")
        .map((c) => c.trim())
        .some((c) => c === "admin-session=1");

      if (!isAdmin) {
        throw new Error("Unauthorized upload");
      }

      return { uploadedBy: "admin" };
    })
    .onUploadComplete(async ({ file, metadata }) => {
      try {
        console.log("✅ Upload complete by:", metadata.uploadedBy);
        console.log("📸 File URL:", file.url);
        console.log("📏 File size:", file.size);
        console.log("📄 File type:", file.type);

        // Return success data
        return {
          uploadedBy: metadata.uploadedBy,
          fileUrl: file.url,
          fileName: file.name,
        };
      } catch (error) {
        console.error("❌ Callback error:", error);
        // Don't throw error to prevent callback failure
        return {
          uploadedBy: metadata.uploadedBy,
          error: "Callback processing failed but upload succeeded",
        };
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
