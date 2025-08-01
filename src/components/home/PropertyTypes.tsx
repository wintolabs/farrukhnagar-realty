"use client";

import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export function PropertyTypes() {
  const propertyTypes = [
    {
      lottieUrl: "/lottie/residential.json",
      title: "Residential Plots",
      description:
        "Perfect for building your dream home in a growing locality with excellent connectivity.",
    },
    {
      lottieUrl: "/lottie/commercial.json",
      title: "Commercial Spaces",
      description:
        "Ideal for showrooms, shops, or rental income opportunities with high ROI potential.",
    },
    {
      lottieUrl: "/lottie/farm-house.json",
      title: "Farmland & Open Plots",
      description:
        "For long-term investment, weekend homes, or agriculture with appreciation potential.",
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Responsive */}
        <div className="text-center mb-12 sm:mb-14 lg:mb-16">
          <h2
            className="text-gray-900 font-semibold"
            style={{
              fontFamily: "Poppins",
              fontWeight: 600,
              fontSize: "clamp(1.5rem, 4vw, 2.625rem)", // 24px to 42px responsive
              lineHeight: "120%",
            }}
          >
            Property Types We Offer
          </h2>
        </div>

        {/* Responsive Grid with Lottie animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          {propertyTypes.map((p, index) => (
            <div
              key={index}
              className="text-left group cursor-pointer flex flex-col items-center sm:items-start"
            >
              {/* Lottie Animation - Responsive sizing */}
              <div className="mb-4 sm:mb-6 lg:mb-8 w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 xl:w-48 xl:h-48 group-hover:scale-110 transition-transform duration-300">
                <DotLottieReact src={p.lottieUrl} loop autoplay />
              </div>

              {/* Content Container */}
              <div className="text-center sm:text-left">
                {/* Title - Responsive typography */}
                <h3
                  className="text-gray-900 mb-2 sm:mb-3 group-hover:text-emerald-600 transition-colors duration-300"
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: 600,
                    fontSize: "clamp(1rem, 2.5vw, 1.125rem)", // 16px to 18px responsive
                    lineHeight: "120%",
                  }}
                >
                  {p.title}
                </h3>

                {/* Description - Responsive typography */}
                <p
                  className="text-gray-600 leading-relaxed max-w-xs sm:max-w-sm mx-auto sm:mx-0"
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: 400,
                    fontSize: "clamp(0.75rem, 2vw, 0.875rem)", // 12px to 14px responsive
                    lineHeight: "150%",
                  }}
                >
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
