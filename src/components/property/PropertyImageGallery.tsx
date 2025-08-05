// src/components/property/PropertyImageGallery.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
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
  const [mainImage, setMainImage] = useState(0);

  if (!images?.length) {
    return (
      <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center mb-12">
        <div className="text-gray-400 text-6xl mb-4">🏠</div>
        <h3 className="text-lg font-medium text-gray-900">
          No Images Available
        </h3>
      </div>
    );
  }

  return (
    <>
      <div className="mb-12">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Main Image */}
          <div className="relative">
            <div
              className="relative aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => setSelectedImage(mainImage)}
            >
              <Image
                src={images[mainImage]}
                alt={`${title} - Main Image`}
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-3">
                  <Maximize2 className="w-6 h-6 text-gray-900" />
                </div>
              </div>

              {/* Image counter */}
              <div className="absolute bottom-4 right-4 bg-black/70 text-white text-sm px-3 py-1 rounded-full">
                {mainImage + 1} of {images.length}
              </div>
            </div>

            {/* Navigation arrows for main image */}
            {images.length > 1 && (
              <>
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={() =>
                    setMainImage(
                      mainImage > 0 ? mainImage - 1 : images.length - 1
                    )
                  }
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={() =>
                    setMainImage(
                      mainImage < images.length - 1 ? mainImage + 1 : 0
                    )
                  }
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>

          {/* Thumbnail Grid */}
          <div className="grid grid-cols-2 gap-4">
            {images.slice(0, 4).map((url, index) => (
              <div
                key={index}
                className={`relative aspect-square bg-gray-100 rounded-xl overflow-hidden cursor-pointer group border-2 transition-all ${
                  index === mainImage
                    ? "border-emerald-500 shadow-lg"
                    : "border-transparent hover:border-gray-300"
                }`}
                onClick={() => setMainImage(index)}
              >
                <Image
                  src={url}
                  alt={`${title} - Thumbnail ${index + 1}`}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />

                {/* Show +X more overlay on last image */}
                {index === 3 && images.length > 4 && (
                  <div
                    className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-semibold text-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(0);
                    }}
                  >
                    +{images.length - 4} more
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* View All Images Button */}
        {images.length > 1 && (
          <div className="text-center mt-6">
            <Button
              variant="outline"
              onClick={() => setSelectedImage(0)}
              className="px-8 py-3 text-emerald-600 border-emerald-600 hover:bg-emerald-50"
            >
              View All {images.length} Images
            </Button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <div className="relative w-full h-full max-w-6xl max-h-[90vh]">
            {/* Close Button */}
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-5 h-5" />
            </Button>

            {/* Navigation */}
            {images.length > 1 && (
              <>
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white"
                  onClick={() =>
                    setSelectedImage(
                      selectedImage > 0 ? selectedImage - 1 : images.length - 1
                    )
                  }
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white"
                  onClick={() =>
                    setSelectedImage(
                      selectedImage < images.length - 1 ? selectedImage + 1 : 0
                    )
                  }
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </>
            )}

            {/* Main Image */}
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={images[selectedImage]}
                alt={`${title} - Full Size`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 rounded-full px-4 py-2 text-white text-sm">
              {selectedImage + 1} of {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
