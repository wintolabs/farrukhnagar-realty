"use client";

import Link from "next/link";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface DroneVideoSimpleProps {
  videoSrc?: string;
  contentSide?: "left" | "right";
  className?: string;
}

export default function DroneVideo({
  videoSrc = "https://05z3nnmdtq.ufs.sh/f/iU5967clh2Wv5CKx4aJSaxWjzwBSlmJFhI0Ar72XvOEKyGHk",
  contentSide = "left",
  className = "",
}: DroneVideoSimpleProps) {
  return (
    <section className={`w-full py-8 sm:py-12 lg:py-16 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center ${
            contentSide === "right" ? "lg:grid-flow-col-dense" : ""
          }`}
        >
          {/* Content Side */}
          <div
            className={`space-y-6 sm:space-y-8 ${contentSide === "right" ? "lg:col-start-2" : ""}`}
          >
            <div>
              {/* Badge with Lottie Animation - Responsive */}
              <div className="inline-flex items-center bg-gray-700 text-gray-50 rounded-full px-4 sm:px-5 py-2 sm:py-3 text-sm font-semibold mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mr-2 sm:mr-3 flex items-center justify-center">
                  <DotLottieReact
                    src="/lottie/helicopter.json"
                    loop
                    autoplay
                    className="w-full h-full"
                  />
                </div>
                <span className="text-xs sm:text-sm">
                  Aerial View of Farrukhnagar
                </span>
              </div>

              {/* Main Heading - Responsive Typography */}
              <h2
                className="font-bold text-gray-900 mb-4 sm:mb-6 leading-tight"
                style={{
                  fontSize: "clamp(1.75rem, 5vw, 3.125rem)", // 28px to 50px responsive
                }}
              >
                See the Area We
                <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  {" "}
                  Know Best
                </span>
              </h2>

              {/* Description - Responsive */}
              <p className="text-gray-600 leading-relaxed mb-6 sm:mb-8 text-base sm:text-lg lg:text-xl">
                The essence of Farrukhnagar - from bustling markets to peaceful
                residential areas, see why this location is perfect for your
                next property investment.
              </p>
            </div>

            {/* CTA Buttons - Responsive */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/listings"
                className="inline-flex items-center justify-center bg-emerald-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold hover:bg-emerald-700 transition-colors shadow-lg text-sm sm:text-base"
              >
                Browse Properties
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border-2 border-emerald-600 text-emerald-600 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold hover:bg-emerald-50 transition-colors text-sm sm:text-base"
              >
                Schedule Tour
              </Link>
            </div>
          </div>

          {/* Video Side - Responsive */}
          <div
            className={`mt-8 lg:mt-0 ${contentSide === "right" ? "lg:col-start-1" : ""}`}
          >
            <div className="relative group">
              <video
                className="w-full h-[300px] sm:h-[350px] lg:h-[400px] xl:h-[500px] object-cover rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl"
                src={videoSrc}
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl sm:rounded-3xl pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
