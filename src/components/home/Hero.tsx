"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full px-4 lg:px-8 py-8">
      <div className="relative w-full max-w-[1380px] h-[617px] mx-auto">
        <div
          className="absolute inset-0 rounded-[15px] overflow-hidden"
          style={{
            background: "linear-gradient(90deg, #C1DEE8 0%, #FBD9B9 100%)",
          }}
        >
          {/* Texture overlay */}
          <div
            className="absolute inset-0 opacity-[1] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' seed='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
              mixBlendMode: "overlay",
            }}
          />
        </div>

        {/* Content positioned exactly as per Figma */}
        <div className="relative z-10 h-full">
          {/* LEFT: Text Content - Exact Figma positioning */}
          <div className="absolute" style={{ left: "76px", top: "91px" }}>
            {/* Welcome Text - Exact Figma specs */}
            <p
              className="text-black mb-8"
              style={{
                fontFamily: "Poppins",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "120%",
              }}
            >
              Welcome to Farrukhnagar Realty
            </p>

            {/* Main Headline - Exact Figma specs */}
            <h1
              className="text-black mb-12"
              style={{
                fontFamily: "Poppins",
                fontWeight: 600,
                fontSize: "67px",
                lineHeight: "120%",
                width: "479px",
                height: "160px",
              }}
            >
              Manage Your
              <br />
              Property
            </h1>

            {/* Description - Exact Figma specs */}
            <p
              className="text-black mb-8"
              style={{
                fontFamily: "Poppins",
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "150%",
                width: "435px",
              }}
            >
              You will have everything nearby - expressways, metro connections,
              schools, the heritage Farrukhnagar neighborhood, etc
            </p>

            {/* Email Input - Positioned as per Figma Group 4 */}
            <div style={{ width: "438px", height: "60px" }}>
              <div className="flex bg-white rounded-full border border-gray-200 shadow-sm overflow-hidden h-full">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 bg-transparent text-gray-800 border-none focus:ring-0 focus:outline-none text-base h-full"
                  style={{ fontFamily: "Poppins" }}
                />
                <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 font-semibold rounded-full transition-colors text-base h-full">
                  Get a Quote
                </Button>
              </div>
            </div>
          </div>

          {/* RIGHT: Building Image - Exact positioning as per Figma Group 2 */}
          <div
            className="absolute z-20"
            style={{
              left: "600px",
              top: "0px",
              width: "785px",
              height: "667px",
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src="/images/building-1.png"
                alt="Modern Property"
                width={785}
                height={667}
                className="object-contain w-full h-full"
                style={{
                  filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.25))",
                }}
                priority
              />

              {/* Floating Stats Cards */}
              <div className="absolute bottom-18 left-14 bg-white rounded-2xl shadow-xl p-5 z-30">
                <div
                  className="text-3xl font-bold text-emerald-600 mb-1"
                  style={{ fontFamily: "Poppins" }}
                >
                  500+
                </div>
                <div
                  className="text-sm text-gray-600 font-medium"
                  style={{ fontFamily: "Poppins" }}
                >
                  Happy Investors
                </div>
              </div>

              <div className="absolute top-8 right-12 bg-white rounded-2xl shadow-xl p-5 z-30">
                <div
                  className="text-3xl font-bold text-emerald-600 mb-1"
                  style={{ fontFamily: "Poppins" }}
                >
                  ₹50Cr+
                </div>
                <div
                  className="text-sm text-gray-600 font-medium"
                  style={{ fontFamily: "Poppins" }}
                >
                  Properties Sold
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
