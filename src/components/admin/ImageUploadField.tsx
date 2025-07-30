"use client";

import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import { X, Loader2 } from "lucide-react";
import { useState } from "react";

type ImageUploadFieldProps = {
  value: string[];
  onChange: (urls: string[]) => void;
};

export default function ImageUploadField({
  value,
  onChange,
}: ImageUploadFieldProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleComplete = (res: { url: string }[] | undefined) => {
    setIsUploading(false);
    if (!res) return;
    const urls = res.map((file) => file.url);
    onChange([...value, ...urls]);
  };

  const handleRemove = (indexToRemove: number) => {
    const updated = value.filter((_, index) => index !== indexToRemove);
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="relative inline-block">
        <UploadButton
          endpoint="imageUploader"
          onUploadBegin={() => setIsUploading(true)}
          onClientUploadComplete={handleComplete}
          onUploadError={(error) => {
            console.error("Upload failed:", error);
            alert("Upload failed");
            setIsUploading(false);
          }}
          appearance={{
            button() {
              return `bg-black text-white px-4 py-2 rounded hover:opacity-90 ${
                isUploading ? "opacity-50 cursor-not-allowed" : ""
              }`;
            },
          }}
          disabled={isUploading}
        />
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white rounded">
            <Loader2 className="animate-spin" size={20} />
            <span className="ml-2">Uploading...</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {value.map((url, index) => (
          <div
            key={index}
            className="relative aspect-[4/3] w-full rounded overflow-hidden shadow group"
          >
            <Image
              src={url}
              alt={`Uploaded image ${index + 1}`}
              fill
              className="object-cover rounded"
              sizes="(min-width: 768px) 384px, 100vw"
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
              aria-label="Remove image"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
