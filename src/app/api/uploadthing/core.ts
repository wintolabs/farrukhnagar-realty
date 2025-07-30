import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 4 } })
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
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
