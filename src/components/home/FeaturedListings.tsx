// components/home/FeaturedListings.tsx
"use client";

import { Property } from "@/types/property";
import { PropertyCard } from "@/components/shared/PropertyCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export function FeaturedListings({ properties }: { properties: Property[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);

  // Responsive items per slide
  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth < 640) {
        setItemsPerSlide(1); // Mobile: 1 property per slide
      } else if (window.innerWidth < 1024) {
        setItemsPerSlide(2); // Tablet: 2 properties per slide
      } else {
        setItemsPerSlide(3); // Desktop: 3 properties per slide
      }
    };

    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);
    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  const totalSlides = Math.ceil(properties.length / itemsPerSlide);
  const canScrollLeft = currentSlide > 0;
  const canScrollRight = currentSlide < totalSlides - 1;

  // Reset slide when items per slide changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [itemsPerSlide]);

  const scrollLeft = () => {
    if (canScrollLeft) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const scrollRight = () => {
    if (canScrollRight) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header - Responsive */}
        <div className="relative mb-12 sm:mb-16 lg:mb-20">
          {/* Responsive header layout */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-0">
            <div>
              {/* "Best Projects of the Year" - Responsive text */}
              <p
                className="text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base"
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 400,
                  lineHeight: "120%",
                }}
              >
                Best Projects of the Year
              </p>

              {/* "Our recent projects" - Responsive typography */}
              <h2
                className="text-gray-900 font-semibold"
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 600,
                  fontSize: "clamp(1.75rem, 5vw, 3.125rem)", // 28px to 50px responsive
                  lineHeight: "120%",
                }}
              >
                Our recent projects
              </h2>
            </div>

            {/* Navigation Arrows - Responsive positioning */}
            <div className="flex items-center gap-2 self-start sm:self-end">
              {/* Left Button */}
              <button
                onClick={scrollLeft}
                className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-all duration-200 ${
                  canScrollLeft
                    ? "bg-black rounded-full shadow-sm hover:bg-gray-800"
                    : "bg-transparent"
                }`}
                aria-label="Previous properties"
                disabled={!canScrollLeft}
              >
                <ChevronLeft
                  className={`w-6 h-6 sm:w-8 sm:h-8 ${
                    canScrollLeft ? "text-white" : "text-black"
                  }`}
                />
              </button>

              {/* Right Button */}
              <button
                onClick={scrollRight}
                className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-all duration-200 ${
                  canScrollRight
                    ? "bg-black rounded-full shadow-sm hover:bg-gray-800"
                    : "bg-transparent"
                }`}
                aria-label="Next properties"
                disabled={!canScrollRight}
              >
                <ChevronRight
                  className={`w-6 h-6 sm:w-8 sm:h-8 ${
                    canScrollRight ? "text-white" : "text-black"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Property Cards Grid - Responsive */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {/* Group properties responsively */}
            {Array.from({ length: totalSlides }, (_, slideIndex) => (
              <div key={slideIndex} className="w-full flex-shrink-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                  {properties
                    .slice(
                      slideIndex * itemsPerSlide,
                      (slideIndex + 1) * itemsPerSlide
                    )
                    .map((property) => (
                      <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
              </div>
            ))}
          </div>

          {/* View All Button - Responsive positioning */}
          <div className="flex justify-center sm:justify-end mt-6 sm:mt-8">
            <Button
              asChild
              className="bg-gray-900 hover:bg-gray-800 text-white px-6 sm:px-8 py-3 sm:py-4 lg:py-8 rounded-full font-semibold shadow-sm transition-all duration-200 text-sm sm:text-base"
              style={{
                fontFamily: "Poppins",
                fontWeight: 500,
              }}
            >
              <Link href="/listings">View All</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
