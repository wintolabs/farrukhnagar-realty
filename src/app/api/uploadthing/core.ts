// src/app/api/uploadthing/core.ts
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 10, // Allow up to 10 images for property listings
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
      console.log("✅ Upload complete by:", metadata.uploadedBy);
      console.log("📸 File URL:", file.url);
      console.log("📏 File size:", file.size);
      console.log("📄 File type:", file.type);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
