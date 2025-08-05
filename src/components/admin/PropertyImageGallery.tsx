// src/components/admin/PropertyImageGallery.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PropertyImageGalleryProps {
  images: string[];
  title: string;
}

export function PropertyImageGallery({
  images,
  title,
}: PropertyImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  if (!images?.length) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm text-center">
        <div className="text-gray-400 text-6xl mb-4">🏠</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Images</h3>
        <p className="text-gray-600">
          No images have been uploaded for this property.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Property Images ({images.length})
        </h2>

        {/* Main Image */}
        <div className="mb-6">
          <div
            className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden cursor-pointer group"
            onClick={() => setSelectedImage(0)}
          >
            <Image
              src={images[0]}
              alt={`${title} - Main Image`}
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-2">
                <span className="text-sm font-medium text-gray-900">
                  Click to view full size
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Grid */}
        {images.length > 1 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.slice(1).map((url, index) => (
              <div
                key={index + 1}
                className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => setSelectedImage(index + 1)}
              >
                <Image
                  src={url}
                  alt={`${title} - Image ${index + 2}`}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ✅ Fixed Full Size Modal */}
      {selectedImage !== null &&
        selectedImage >= 0 &&
        selectedImage < images.length && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white border border-white/20"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-4 h-4" />
              </Button>

              {/* Navigation Buttons */}
              {images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white border border-white/20"
                    onClick={() =>
                      setSelectedImage(
                        selectedImage > 0
                          ? selectedImage - 1
                          : images.length - 1
                      )
                    }
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white border border-white/20"
                    onClick={() =>
                      setSelectedImage(
                        selectedImage < images.length - 1
                          ? selectedImage + 1
                          : 0
                      )
                    }
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </>
              )}

              {/* ✅ Fixed Image Container */}
              <div className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center">
                <Image
                  src={images[selectedImage]}
                  alt={`${title} - Full Size Image ${selectedImage + 1}`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 rounded-full px-4 py-2 text-white text-sm">
                {selectedImage + 1} of {images.length}
              </div>
            </div>
          </div>
        )}
    </>
  );
}
