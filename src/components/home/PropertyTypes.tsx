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
    <section className="py-20 bg-white">
      <div className="w-full max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="text-gray-900"
            style={{
              fontFamily: "Poppins",
              fontWeight: 600,
              fontSize: "42px",
              lineHeight: "120%",
            }}
          >
            Property Types We Offer
          </h2>
        </div>

        {/* Clean minimal grid with Lottie animations */}
        <div className="grid md:grid-cols-3 gap-12">
          {propertyTypes.map((p, index) => (
            <div key={index} className="text-left group cursor-pointer">
              {/* Lottie Animation */}
              <div className="mb-3 w-48 h-48 group-hover:scale-110 transition-transform duration-300">
                <DotLottieReact src={p.lottieUrl} loop autoplay />
              </div>

              {/* Title */}
              <h3
                className="text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors duration-300"
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 600,
                  fontSize: "18px",
                  lineHeight: "120%",
                }}
              >
                {p.title}
              </h3>

              {/* Description */}
              <p
                className="text-gray-600 leading-relaxed"
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "150%",
                }}
              >
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
