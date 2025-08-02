// src/components/admin/ImageUploadField.tsx
"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";
import {
  X,
  Upload,
  Image as ImageIcon,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useState, useCallback, useRef } from "react";
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
  const [uploaderKey, setUploaderKey] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [deletingImages, setDeletingImages] = useState<Set<string>>(new Set());
  const uploadContainerRef = useRef<HTMLDivElement>(null);

  const canUploadMore = value.length < maxImages;
  const remainingSlots = maxImages - value.length;
  const totalUploaded = value.length;

  // Enhanced reset function that forces component remount
  const resetUploader = useCallback(() => {
    console.log("Resetting uploader...");
    setUploaderKey((prev) => prev + 1);
    setIsUploading(false);
    setUploadProgress(0);

    // Additional cleanup: try to clear any file input values
    setTimeout(() => {
      const fileInputs = document.querySelectorAll('input[type="file"]');
      fileInputs.forEach((input) => {
        (input as HTMLInputElement).value = "";
      });
    }, 100);
  }, []);

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

  const handleUploadBegin = useCallback((fileName: string) => {
    console.log("Upload started for file:", fileName);
    setIsUploading(true);
    setUploadProgress(0);

    // Reset the component immediately to clear file input state
    setTimeout(() => {
      setUploaderKey((prev) => prev + 1);
    }, 50);
  }, []);

  const handleUploadProgress = useCallback((progress: number) => {
    console.log("Upload progress:", progress);
    setUploadProgress(progress);
  }, []);

  const handleComplete = useCallback(
    (res: { url: string; name: string }[] | undefined) => {
      console.log("Upload completed, resetting...");

      if (!res) {
        toast.error("No files uploaded");
        resetUploader();
        return;
      }

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

      resetUploader();
    },
    [value, onChange, maxImages, remainingSlots, resetUploader]
  );

  const handleError = useCallback(
    (error: Error) => {
      console.error("Upload failed, resetting...", error);
      toast.error(`Upload failed: ${error.message}`);

      resetUploader();
    },
    [resetUploader]
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

  // Click handler to ensure component is ready
  const handleUploadAreaClick = useCallback(() => {
    console.log("Upload area clicked - ensuring fresh state");
    if (!isUploading) {
      const fileInputs = document.querySelectorAll('input[type="file"]');
      fileInputs.forEach((input) => {
        (input as HTMLInputElement).value = "";
      });
    }
  }, [isUploading]);

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
                Uploading...
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
          <div
            ref={uploadContainerRef}
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-emerald-400 transition-colors"
            onClick={handleUploadAreaClick}
          >
            <UploadDropzone
              key={`upload-${uploaderKey}-${Date.now()}`}
              endpoint="imageUploader"
              onUploadBegin={handleUploadBegin}
              onUploadProgress={handleUploadProgress}
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
                  : "Drag & drop images here or click to browse",
                allowedContent: `JPG, PNG, JPEG up to 8MB each • Select multiple files`,
                button: isUploading ? "Uploading..." : "Choose Files",
              }}
              disabled={isUploading}
            />

            {/* Progress Bar */}
            {isUploading && uploadProgress > 0 && (
              <div className="mt-4 space-y-2">
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

      {/* Uploaded Images */}
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
