"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Image from "next/image";

export default function ContactSection() {
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9876543210";
  const email = process.env.ADMIN_EMAIL || "info@farrukhnagarrealty.com";

  return (
    <section
      className="relative w-full py-0 px-4 mt-8"
      style={{ minHeight: "400px" }}
    >
      <div
        className="relative max-w-[1380px] mx-auto rounded-[1.5rem] overflow-visible shadow-lg flex items-center"
        style={{
          background: "linear-gradient(90deg, #C1DEE8 0%, #FBD9B9 100%)",
          height: "380px",
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

        {/* Left: CTA content - Reduced padding and content sizes */}
        <div className="z-10 flex-1 py-6 pl-16 pr-4 max-w-[45%]">
          <h2
            className="text-2xl md:text-3xl font-semibold mb-4 leading-tight" // Reduced from text-3xl/4xl
            style={{ fontFamily: "Poppins", color: "#1f2937" }}
          >
            Ready to Find Your Dream Property?
          </h2>
          <p
            className="mb-6 text-gray-700 max-w-md text-sm md:text-base leading-relaxed" // Reduced margin and font size
            style={{ fontFamily: "Poppins" }}
          >
            Connect with Farrukhnagar&apos;s trusted real estate experts.
          </p>
          {/* Compact CTA buttons */}
          <div className="flex gap-12 items-start">
            {" "}
            <a
              href={`https://wa.me/${whatsappNumber}?text=Hi, I'm interested in a property.`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center focus:outline-none transform hover:scale-105 transition-all duration-200"
              aria-label="Chat on WhatsApp"
            >
              {/* Smaller icon containers */}
              <div className="flex items-center justify-center w-24 h-24 mb-4 bg-white/20 rounded-full group-hover:bg-white/30 transition-all duration-200">
                <div className="w-18 h-18">
                  {" "}
                  <DotLottieReact src="/lottie/whatsapp.json" loop autoplay />
                </div>
              </div>
              <span
                className="text-gray-800 font-medium text-sm group-hover:text-gray-900 transition-colors" // Reduced font size
                style={{ fontFamily: "Poppins" }}
              >
                WhatsApp
              </span>
              <span className="text-gray-600 text-xs mt-0.5">
                Get instant response
              </span>{" "}
            </a>
            <a
              href={`mailto:${email}?subject=Property Inquiry`}
              className="group flex flex-col items-center focus:outline-none transform hover:scale-105 transition-all duration-200"
              aria-label="Email us"
            >
              <div className="flex items-center justify-center w-24 h-24 mb-4 bg-white/20 rounded-full group-hover:bg-white/30 transition-all duration-200">
                <div className="w-20 h-20">
                  {" "}
                  {/* Slightly smaller than WhatsApp to balance the email icon */}
                  <DotLottieReact src="/lottie/email.json" loop autoplay />
                </div>
              </div>
              <span
                className="text-gray-800 font-medium text-sm group-hover:text-gray-900 transition-colors"
                style={{ fontFamily: "Poppins" }}
              >
                Email
              </span>
              <span className="text-gray-600 text-xs mt-0.5">
                Detailed inquiries
              </span>
            </a>
          </div>
        </div>

        {/* Right: Building illustration - unchanged to maintain 3D effect */}
        <div
          className="absolute right-0 top-1/2 z-20"
          style={{
            width: "540px",
            height: "567px",
            transform: "translateY(-50%)",
            pointerEvents: "none",
          }}
        >
          <Image
            src="/images/building-2.png"
            alt="Modern Property"
            fill
            className="object-contain"
            draggable={false}
            priority
          />
        </div>
      </div>
    </section>
  );
}
