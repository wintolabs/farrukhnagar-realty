// src/components/admin/ImageUploadField.tsx
"use client";

import { UploadButton, UploadDropzone } from "@/utils/uploadthing";
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
  const [uploaderType, setUploaderType] = useState<"dropzone" | "button">(
    "dropzone"
  );

  const canUploadMore = value.length < maxImages;
  const remainingSlots = maxImages - value.length;
  const totalUploaded = value.length;

  // Delete image from UploadThing storage
  const deleteImageFromStorage = useCallback(async (url: string) => {
    try {
      const fileKey = url.split("/").pop();
      if (fileKey) {
        const response = await fetch("/api/uploadthing/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileKey }),
        });

        if (!response.ok) {
          throw new Error("Failed to delete from storage");
        }
      }
    } catch (error) {
      console.error("Error deleting image from storage:", error);
      toast.error("Failed to delete image from storage");
    }
  }, []);

  const handleRemove = useCallback(
    async (indexToRemove: number) => {
      const urlToRemove = value[indexToRemove];
      setDeletingImages((prev) => new Set([...prev, urlToRemove]));

      try {
        const updated = value.filter((_, index) => index !== indexToRemove);
        onChange(updated);
        await deleteImageFromStorage(urlToRemove);
        onImageDeleted?.(urlToRemove);
        toast.success("Image deleted successfully");
      } catch (error) {
        console.error("Error removing image:", error);
        onChange(value);
        toast.error("Failed to delete image");
      } finally {
        setDeletingImages((prev) => {
          const newSet = new Set([...prev]);
          newSet.delete(urlToRemove);
          return newSet;
        });
      }
    },
    [value, onChange, deleteImageFromStorage, onImageDeleted]
  );

  const handleUploadBegin = useCallback(() => {
    console.log("🚀 Upload started via", uploaderType);
    setIsUploading(true);
    setUploadProgress(0);
  }, [uploaderType]);

  const handleUploadProgress = useCallback((progress: number) => {
    console.log("📊 Upload progress:", progress + "%");
    setUploadProgress(progress);
  }, []);

  const handleClientUploadComplete = useCallback(
    (res: { url?: string; ufsUrl?: string; name: string }[] | undefined) => {
      console.log("✅ Upload completed via", uploaderType, ":", res);

      if (!res || res.length === 0) {
        console.log("❌ No files in response");
        toast.error("No files uploaded");
        setIsUploading(false);
        return;
      }

      const urls = res
        .map((file) => {
          const imageUrl = file.ufsUrl || file.url;
          console.log("🖼️ Extracted URL:", imageUrl);
          return imageUrl;
        })
        .filter((url): url is string => url !== undefined);

      if (urls.length === 0) {
        console.log("❌ No valid URLs extracted");
        toast.error("No valid image URLs received");
        setIsUploading(false);
        return;
      }

      const newUrls = [...value, ...urls];

      if (newUrls.length > maxImages) {
        toast.warning(
          `Maximum ${maxImages} images allowed. Some images were not added.`
        );
        const urlsToAdd = urls.slice(0, remainingSlots);
        onChange([...value, ...urlsToAdd]);
      } else {
        onChange(newUrls);
      }

      toast.success(`${urls.length} image(s) uploaded successfully!`);
      setIsUploading(false);
      setUploadProgress(0);
    },
    [value, onChange, maxImages, remainingSlots, uploaderType]
  );

  const handleUploadError = useCallback(
    (error: Error) => {
      console.error("❌ Upload error via", uploaderType, ":", error);
      toast.error(`Upload failed: ${error.message}`);
      setIsUploading(false);
      setUploadProgress(0);
    },
    [uploaderType]
  );

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
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            Property Images{" "}
            {required && <span className="text-red-500">*</span>}
          </label>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>
              {totalUploaded}/{maxImages} uploaded
            </span>
            {isUploading && (
              <span className="flex items-center gap-1 text-blue-600">
                <Loader2 className="w-3 h-3 animate-spin" />
                Uploading... {Math.round(uploadProgress)}%
              </span>
            )}
            {canUploadMore && (
              <span className="text-emerald-600">
                {remainingSlots} slots remaining
              </span>
            )}
          </div>
        </div>

        {canUploadMore && (
          <div className="space-y-4">
            {/* ✅ Try UploadButton Approach */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-emerald-400 transition-colors text-center">
              <div className="flex flex-col items-center space-y-4">
                <Upload className="w-12 h-12 text-emerald-600" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Upload Property Images
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    JPG, PNG, JPEG up to 8MB each • Select multiple files
                  </p>

                  <UploadButton
                    endpoint="imageUploader"
                    onUploadBegin={() => {
                      setUploaderType("button");
                      handleUploadBegin();
                    }}
                    onUploadProgress={handleUploadProgress}
                    onClientUploadComplete={handleClientUploadComplete}
                    onUploadError={handleUploadError}
                    appearance={{
                      button:
                        "bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors ut-ready:bg-emerald-600 ut-uploading:bg-emerald-400",
                      allowedContent: "text-gray-500 text-xs mt-2",
                    }}
                    content={{
                      button: isUploading
                        ? `Uploading... ${Math.round(uploadProgress)}%`
                        : "Choose Files",
                      allowedContent: "Select images to upload",
                    }}
                    disabled={isUploading}
                  />
                </div>

                {/* Progress Bar for Button Upload */}
                {isUploading && uploaderType === "button" && (
                  <div className="w-full max-w-xs space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Upload Progress
                      </span>
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
            </div>

            {/* ✅ Alternative: Fallback UploadDropzone */}
            <details className="bg-gray-50 rounded-lg">
              <summary className="cursor-pointer p-4 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                Alternative: Drag & Drop Upload
              </summary>
              <div className="p-4 pt-0">
                <UploadDropzone
                  key={`fallback-dropzone-${Date.now()}`}
                  endpoint="imageUploader"
                  onUploadBegin={() => {
                    setUploaderType("dropzone");
                    handleUploadBegin();
                  }}
                  onUploadProgress={handleUploadProgress}
                  onClientUploadComplete={handleClientUploadComplete}
                  onUploadError={handleUploadError}
                  appearance={{
                    container:
                      "w-full h-32 border border-dashed border-gray-300 rounded-lg",
                    uploadIcon: "text-emerald-600 w-8 h-8",
                    label: "text-emerald-600 font-medium",
                    allowedContent: "text-gray-500 text-xs",
                    button:
                      "bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors",
                  }}
                  content={{
                    uploadIcon: <Upload className="w-8 h-8" />,
                    label:
                      isUploading && uploaderType === "dropzone"
                        ? `Uploading... ${Math.round(uploadProgress)}%`
                        : "Drag & drop images here",
                    allowedContent: "Or click to browse files",
                    button: "Browse Files",
                  }}
                  disabled={isUploading}
                />

                {/* Progress Bar for Dropzone Upload */}
                {isUploading && uploaderType === "dropzone" && (
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Upload Progress
                      </span>
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
            </details>
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

      {required && value.length === 0 && (
        <div className="flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>At least one image is required</span>
        </div>
      )}

      {/* Image Preview - Keep existing code */}
      {value.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Uploaded Images</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {value.map((url, index) => (
              <div
                key={`image-${index}-${url.split("/").pop()}`}
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
                  unoptimized
                  onError={() => {
                    console.error("❌ Image failed to load:", url);
                  }}
                  onLoad={() => {
                    console.log("✅ Image loaded successfully:", url);
                  }}
                />

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    disabled={deletingImages.has(url)}
                    className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-full p-2 transition-colors flex items-center justify-center"
                    aria-label={`Remove image ${index + 1}`}
                  >
                    {deletingImages.has(url) ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <X className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <div className="absolute top-2 left-2 bg-black/70 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                  {index + 1}
                </div>

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
