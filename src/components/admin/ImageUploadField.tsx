// src/components/admin/ImageUploadField.tsx
"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";
import { X, Upload, Image as ImageIcon, AlertCircle } from "lucide-react";
import { useState, useCallback } from "react";
import { toast } from "sonner";

type ImageUploadFieldProps = {
  value: string[];
  onChange: (urls: string[]) => void;
  maxImages?: number;
  required?: boolean;
};

export default function ImageUploadField({
  value,
  onChange,
  maxImages = 10,
  required = false,
}: ImageUploadFieldProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const canUploadMore = value.length < maxImages;
  const remainingSlots = maxImages - value.length;

  const handleComplete = useCallback(
    (res: { url: string }[] | undefined) => {
      setIsUploading(false);
      setUploadProgress(0);
      if (!res) return;

      const urls = res.map((file) => file.url);
      const newUrls = [...value, ...urls];

      if (newUrls.length > maxImages) {
        toast.warning(
          `Maximum ${maxImages} images allowed. Some images were not added.`
        );
        onChange([...value, ...urls.slice(0, remainingSlots)]);
      } else {
        onChange(newUrls);
        toast.success(`${urls.length} image(s) uploaded successfully!`);
      }
    },
    [value, onChange, maxImages, remainingSlots]
  );

  const handleRemove = useCallback(
    (indexToRemove: number) => {
      const updated = value.filter((_, index) => index !== indexToRemove);
      onChange(updated);
      toast.success("Image removed");
    },
    [value, onChange]
  );

  const handleError = useCallback((error: Error) => {
    console.error("Upload failed:", error);
    setIsUploading(false);
    setUploadProgress(0);
    toast.error(`Upload failed: ${error.message}`);
  }, []);

  const handleReorder = useCallback(
    (fromIndex: number, toIndex: number) => {
      const newOrder = [...value];
      const [removed] = newOrder.splice(fromIndex, 1);
      newOrder.splice(toIndex, 0, removed);
      onChange(newOrder);
    },
    [value, onChange]
  );

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            Property Images{" "}
            {required && <span className="text-red-500">*</span>}
          </label>
          <span className="text-xs text-gray-500">
            {value.length}/{maxImages} images
          </span>
        </div>

        {canUploadMore && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-emerald-400 transition-colors">
            <UploadDropzone
              endpoint="imageUploader"
              onUploadBegin={() => {
                setIsUploading(true);
                setUploadProgress(0);
              }}
              onUploadProgress={(progress) => setUploadProgress(progress)}
              onClientUploadComplete={handleComplete}
              onUploadError={handleError}
              appearance={{
                container: "w-full h-32 border-none",
                uploadIcon: "text-emerald-600 w-8 h-8",
                label: "text-emerald-600 font-medium",
                allowedContent: "text-gray-500 text-xs",
                button:
                  "bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors ut-ready:bg-emerald-600 ut-uploading:bg-emerald-400",
              }}
              content={{
                uploadIcon: <Upload className="w-8 h-8" />,
                label: isUploading
                  ? `Uploading... ${Math.round(uploadProgress)}%`
                  : `Drag & drop images here or click to browse`,
                allowedContent: `JPG, PNG, JPEG up to 8MB each (${remainingSlots} slots remaining)`,
                button: isUploading ? "Uploading..." : "Choose Files",
              }}
              disabled={isUploading}
            />

            {isUploading && (
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}
          </div>
        )}

        {!canUploadMore && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
            <ImageIcon className="w-6 h-6 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">
              Maximum {maxImages} images reached
            </p>
          </div>
        )}
      </div>

      {/* Validation Message */}
      {required && value.length === 0 && (
        <div className="flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>At least one image is required</span>
        </div>
      )}

      {/* Image Preview Grid */}
      {value.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Uploaded Images</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {value.map((url, index) => (
              <div
                key={`${url}-${index}`}
                className="relative group aspect-square rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-move"
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", index.toString());
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const fromIndex = parseInt(
                    e.dataTransfer.getData("text/plain")
                  );
                  if (fromIndex !== index) {
                    handleReorder(fromIndex, index);
                  }
                }}
              >
                <Image
                  src={url}
                  alt={`Property image ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />

                {/* Image Controls Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="bg-red-600 hover:bg-red-700 text-white rounded-full p-2 transition-colors"
                    aria-label={`Remove image ${index + 1}`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Image Number Badge */}
                <div className="absolute top-2 left-2 bg-black/70 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                  {index + 1}
                </div>

                {/* First Image Badge */}
                {index === 0 && (
                  <div className="absolute top-2 right-2 bg-emerald-600 text-white text-xs px-2 py-1 rounded">
                    Cover
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-500 flex items-center gap-1">
            <span>💡</span>
            Drag images to reorder. The first image will be the cover photo.
          </p>
        </div>
      )}
    </div>
  );
}
