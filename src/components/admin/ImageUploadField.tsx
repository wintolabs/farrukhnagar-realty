// src/components/admin/ImageUploadField.tsx

"use client";

import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import {
  X,
  Upload,
  Image as ImageIcon,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useState, useCallback } from "react";
import { toast } from "sonner";

type ImageUploadFieldProps = {
  value: string[];
  onChange: (urls: string[]) => void;
  maxImages?: number;
  required?: boolean;
  onImageDeleted?: (url: string) => void;
};

export default function ImageUploadField({
  value,
  onChange,
  maxImages = 10,
  required = false,
  onImageDeleted,
}: ImageUploadFieldProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [deletingImages, setDeletingImages] = useState<Set<string>>(new Set());

  const canUploadMore = value.length < maxImages;
  const remainingSlots = maxImages - value.length;

  // ✅ Upload Progress Handler
  const handleUploadProgress = useCallback((progress: number) => {
    setUploadProgress(progress);
  }, []);

  // ✅ Upload Begin Handler
  const handleUploadBegin = useCallback((fileName: string) => {
    console.log("Upload started for:", fileName);
    setIsUploading(true);
    setUploadProgress(0);
  }, []);

  // ✅ Upload Complete Handler with Immediate Preview
  const handleUploadComplete = useCallback(
    (res: { url: string; key: string; name: string }[]) => {
      if (!res?.length) {
        toast.error("Upload failed - no files received");
        setIsUploading(false);
        return;
      }

      const newUrls = res.map((file) => file.url);

      // ✅ Immediately update the preview
      const updatedUrls = [...value, ...newUrls];

      if (updatedUrls.length > maxImages) {
        const allowedUrls = [...value, ...newUrls.slice(0, remainingSlots)];
        onChange(allowedUrls);
        toast.warning(
          `Only ${remainingSlots} images added. Maximum ${maxImages} allowed.`
        );
      } else {
        onChange(updatedUrls);
        toast.success(`${newUrls.length} image(s) uploaded successfully!`);
      }

      // Reset upload state
      setIsUploading(false);
      setUploadProgress(0);
    },
    [value, onChange, maxImages, remainingSlots]
  );

  const handleUploadError = useCallback((error: Error) => {
    console.error("Upload error:", error);
    toast.error(`Upload failed: ${error.message}`);
    setIsUploading(false);
    setUploadProgress(0);
  }, []);

  const deleteImageFromStorage = useCallback(async (url: string) => {
    try {
      const fileKey = url.split("/").pop();
      if (!fileKey) return;

      const response = await fetch("/api/uploadthing/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileKey }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete from storage");
      }
    } catch (error) {
      console.error("Storage deletion failed:", error);
    }
  }, []);

  const handleRemove = useCallback(
    async (indexToRemove: number) => {
      const urlToRemove = value[indexToRemove];
      setDeletingImages((prev) => new Set([...prev, urlToRemove]));

      try {
        const updatedUrls = value.filter((_, index) => index !== indexToRemove);
        onChange(updatedUrls);

        await deleteImageFromStorage(urlToRemove);
        onImageDeleted?.(urlToRemove);

        toast.success("Image removed successfully");
      } catch (error) {
        console.error("Remove failed:", error);
        toast.error("Failed to remove image");
      } finally {
        setDeletingImages((prev) => {
          const newSet = new Set(prev);
          newSet.delete(urlToRemove);
          return newSet;
        });
      }
    },
    [value, onChange, deleteImageFromStorage, onImageDeleted]
  );

  return (
    <div className="space-y-4">
      {/* Header with Upload Counter */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Property Images {required && <span className="text-red-500">*</span>}
        </h3>
        <div className="text-sm text-gray-500">
          {value.length}/{maxImages} uploaded
          {canUploadMore && (
            <span className="text-emerald-600 ml-2">
              • {remainingSlots} remaining
            </span>
          )}
        </div>
      </div>

      {/* Upload Interface with Progress */}
      {canUploadMore && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-emerald-400 hover:bg-emerald-50/30 transition-colors">
          <Upload className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">
            Upload Property Images
          </h4>
          <p className="text-sm text-gray-500 mb-6">
            Select multiple images • JPG, PNG up to 8MB each
          </p>

          <UploadButton
            endpoint="imageUploader"
            onUploadBegin={(fileName) => handleUploadBegin(fileName)}
            onUploadProgress={handleUploadProgress}
            onClientUploadComplete={(res) => handleUploadComplete(res || [])}
            onUploadError={(error) => handleUploadError(error)}
            appearance={{
              button: `
                bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg 
                font-semibold transition-colors min-w-[200px]
                ut-ready:bg-emerald-600 ut-uploading:bg-emerald-400
                disabled:opacity-50 disabled:cursor-not-allowed
              `,
              allowedContent: "text-gray-500 text-xs mt-3",
            }}
            content={{
              button: isUploading
                ? `Uploading... ${Math.round(uploadProgress)}%`
                : "Choose Images",
              allowedContent: `Maximum ${remainingSlots} more images`,
            }}
          />

          {/* ✅ Progress Bar */}
          {isUploading && (
            <div className="mt-6 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Upload Progress</span>
                <span className="text-sm font-medium text-emerald-600">
                  {Math.round(uploadProgress)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-emerald-600 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Max Images Reached */}
      {!canUploadMore && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500">
            Maximum {maxImages} images uploaded
          </p>
        </div>
      )}

      {/* Required Field Error */}
      {required && value.length === 0 && (
        <div className="flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>At least one image is required</span>
        </div>
      )}

      {/* ✅ Image Preview Grid - Shows Immediately After Upload */}
      {value.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-700">
              Uploaded Images ({value.length})
            </h4>
            <p className="text-xs text-gray-500">
              💡 First image will be the cover photo
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {value.map((url, index) => (
              <div
                key={`${url}-${index}`}
                className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Image
                  src={url}
                  alt={`Property image ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  onLoad={() => console.log("✅ Image loaded:", url)}
                  onError={() => console.error("❌ Image failed to load:", url)}
                />

                {/* Remove Button Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    disabled={deletingImages.has(url)}
                    className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-full p-2 transition-colors shadow-lg"
                    aria-label={`Remove image ${index + 1}`}
                  >
                    {deletingImages.has(url) ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <X className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Image Number Badge */}
                <div className="absolute top-2 left-2 bg-black/70 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-medium">
                  {index + 1}
                </div>

                {/* Cover Photo Badge */}
                {index === 0 && (
                  <div className="absolute top-2 right-2 bg-emerald-600 text-white text-xs px-2 py-1 rounded font-medium">
                    Cover
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
