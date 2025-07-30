"use client";

import { UploadButton } from "@/utils/uploadthing";

export default function ImageUploader() {
  return (
    <div className="p-4 border rounded-md w-full max-w-sm">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log("Upload complete", res);
          alert("Upload complete!");
        }}
        onUploadError={(error) => {
          console.error("Upload error:", error);
          alert("Upload failed.");
        }}
      />
    </div>
  );
}
