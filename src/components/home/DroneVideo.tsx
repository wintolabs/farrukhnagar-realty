"use client";

import Link from "next/link";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface DroneVideoSimpleProps {
  videoSrc?: string;
  contentSide?: "left" | "right";
  className?: string;
}

export default function DroneVideoSimple({
  videoSrc = "https://05z3nnmdtq.ufs.sh/f/iU5967clh2Wv5CKx4aJSaxWjzwBSlmJFhI0Ar72XvOEKyGHk",
  contentSide = "left",
  className = "",
}: DroneVideoSimpleProps) {
  return (
    <section className={`w-full py-12 lg:py-16 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div
          className={`grid lg:grid-cols-2 gap-12 items-center ${
            contentSide === "right" ? "lg:grid-flow-col-dense" : ""
          }`}
        >
          {/* Content Side */}
          <div
            className={`space-y-8 ${contentSide === "right" ? "lg:col-start-2" : ""}`}
          >
            <div>
              {/* Badge with Larger Lottie Animation */}
              <div className="inline-flex items-center bg-gray-700 text-gray-50 rounded-full px-5 py-3 text-sm font-semibold mb-6">
                <div className="w-12 h-12 mr-3 flex items-center justify-center">
                  <DotLottieReact
                    src="/lottie/helicopter.json"
                    loop
                    autoplay
                    className="w-full h-full"
                  />
                </div>
                Aerial View of Farrukhnagar
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                See the Area We
                <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  {" "}
                  Know Best
                </span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                The essence of Farrukhnagar - from bustling markets to peaceful
                residential areas, see why this location is perfect for your
                next property investment.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/listings"
                className="inline-flex items-center bg-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-emerald-700 transition-colors shadow-lg"
              >
                Browse Properties
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center border-2 border-emerald-600 text-emerald-600 px-8 py-4 rounded-2xl font-semibold hover:bg-emerald-50 transition-colors"
              >
                Schedule Tour
              </Link>
            </div>
          </div>

          {/* Video Side */}
          <div className={contentSide === "right" ? "lg:col-start-1" : ""}>
            <div className="relative group">
              <video
                className="w-full h-[400px] lg:h-[500px] object-cover rounded-3xl shadow-2xl"
                src={videoSrc}
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
