// components/home/FeaturedListings.tsx
"use client";

import { Property } from "@/types/property";
import { PropertyCard } from "@/components/shared/PropertyCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export function FeaturedListings({ properties }: { properties: Property[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = Math.ceil(properties.length / 3); // Assuming 3 properties per slide

  const canScrollLeft = currentSlide > 0;
  const canScrollRight = currentSlide < totalSlides - 1;

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
    <section className="py-16 bg-white">
      <div className="w-full max-w-[1381px] mx-auto px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="relative mb-20 h-24">
          {/* "Our recent projects" */}
          <p
            className="text-black absolute"
            style={{
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "120%",
              color: "#000000",
              left: "0px",
              top: "0px",
            }}
          >
            Best Projects of the Year
          </p>

          {/* "Best Projects of the Year" */}
          <h2
            className="text-black absolute"
            style={{
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: 600,
              fontSize: "50px",
              lineHeight: "120%",
              color: "#000000",
              left: "0px",
              top: "35px",
            }}
          >
            Our recent projects
          </h2>

          {/* Smart Navigation Arrows - Matching your screenshot */}
          <div className="absolute right-0 top-12 flex items-center gap-2">
            {/* Left Button */}
            <button
              onClick={scrollLeft}
              className={`w-12 h-12 flex items-center justify-center transition-all duration-200 ${
                canScrollLeft
                  ? "bg-black rounded-full shadow-sm hover:bg-gray-800" // Enabled: black box, white icon
                  : "bg-transparent" // Disabled: no box, black icon
              }`}
              aria-label="Previous properties"
              disabled={!canScrollLeft}
            >
              <ChevronLeft
                className={`w-8 h-8 ${
                  canScrollLeft ? "text-white" : "text-black"
                }`}
              />
            </button>

            {/* Right Button */}
            <button
              onClick={scrollRight}
              className={`w-12 h-12 flex items-center justify-center transition-all duration-200 ${
                canScrollRight
                  ? "bg-black rounded-full shadow-sm hover:bg-gray-800" // Enabled: black box, white icon
                  : "bg-transparent" // Disabled: no box, black icon
              }`}
              aria-label="Next properties"
              disabled={!canScrollRight}
            >
              <ChevronRight
                className={`w-8 h-8 ${
                  canScrollRight ? "text-white" : "text-black"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Property Cards Grid */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {/* Group properties in sets of 3 */}
            {Array.from({ length: totalSlides }, (_, slideIndex) => (
              <div key={slideIndex} className="w-full flex-shrink-0">
                <div className="grid md:grid-cols-3 gap-8">
                  {properties
                    .slice(slideIndex * 3, (slideIndex + 1) * 3)
                    .map((property) => (
                      <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
              </div>
            ))}
          </div>

          {/* View All Button - Bottom Right */}
          <div className="flex justify-end mt-8">
            <Button
              asChild
              className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-8 rounded-full font-semibold shadow-sm transition-all duration-200"
              style={{
                fontFamily: "Poppins",
                fontWeight: 500,
                fontSize: "14px",
              }}
            >
              <Link href="/listings">View All</Link>
            </Button>
          </div>
        </div>

        {/* Extra spacing at bottom */}
        <div className="mt-16"></div>
      </div>
    </section>
  );
}
