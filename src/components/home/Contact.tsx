"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Image from "next/image";

export default function Contact() {
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9876543210";
  const email = process.env.ADMIN_EMAIL || "info@farrukhnagarrealty.com";

  return (
    <section
      className="relative w-full py-4 sm:py-6 lg:py-0 px-4 mt-6 sm:mt-8"
      style={{ minHeight: "350px" }}
    >
      <div
        className="relative max-w-[1380px] mx-auto rounded-2xl sm:rounded-[1.5rem] shadow-lg min-h-[300px] sm:min-h-[350px] lg:h-[380px] overflow-visible"
        style={{
          background: "linear-gradient(90deg, #C1DEE8 0%, #FBD9B9 100%)",
        }}
      >
        {/* Texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.4] pointer-events-none rounded-2xl sm:rounded-[1.5rem]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' seed='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
            mixBlendMode: "overlay",
          }}
        />

        {/* Content - Only on the left side for desktop, centered for mobile */}
        <div className="relative z-10 lg:max-w-[45%] p-6 sm:p-8 lg:py-6 lg:pl-12 lg:pr-4 flex flex-col justify-center h-full">
          <h2
            className="font-semibold mb-3 sm:mb-4 leading-tight text-center lg:text-left"
            style={{
              fontFamily: "Poppins",
              color: "#1f2937",
              fontSize: "clamp(1.25rem, 3vw, 1.875rem)", // 20px to 30px responsive
            }}
          >
            Ready to Find Your Dream Property?
          </h2>

          <p
            className="mb-6 sm:mb-8 text-gray-700 max-w-md mx-auto lg:mx-0 leading-relaxed text-center lg:text-left"
            style={{
              fontFamily: "Poppins",
              fontSize: "clamp(0.875rem, 2vw, 1rem)", // 14px to 16px responsive
            }}
          >
            Connect with Farrukhnagar&apos;s trusted real estate experts.
          </p>

          {/* Responsive CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 lg:gap-12 items-center justify-center lg:justify-start">
            <a
              href={`https://wa.me/91${whatsappNumber}?text=Hi,  I'm interested in your real estate services in Farrukhnagar.`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center focus:outline-none transform hover:scale-105 transition-all duration-200"
              aria-label="Chat on WhatsApp"
            >
              <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mb-2 sm:mb-3 lg:mb-4 bg-white/20 rounded-full group-hover:bg-white/30 transition-all duration-200">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-18 lg:h-18">
                  <DotLottieReact src="/lottie/whatsapp.json" loop autoplay />
                </div>
              </div>
              <span
                className="text-gray-800 font-medium group-hover:text-gray-900 transition-colors"
                style={{
                  fontFamily: "Poppins",
                  fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
                }}
              >
                WhatsApp
              </span>
              <span className="text-gray-600 text-xs mt-0.5">
                Get instant response
              </span>
            </a>

            <a
              href={`mailto:${email}?subject=Property Inquiry`}
              className="group flex flex-col items-center focus:outline-none transform hover:scale-105 transition-all duration-200"
              aria-label="Email us"
            >
              <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mb-2 sm:mb-3 lg:mb-4 bg-white/20 rounded-full group-hover:bg-white/30 transition-all duration-200">
                <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20">
                  <DotLottieReact src="/lottie/email.json" loop autoplay />
                </div>
              </div>
              <span
                className="text-gray-800 font-medium group-hover:text-gray-900 transition-colors"
                style={{
                  fontFamily: "Poppins",
                  fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
                }}
              >
                Email
              </span>
              <span className="text-gray-600 text-xs mt-0.5">
                Detailed inquiries
              </span>
            </a>
          </div>
        </div>

        {/* Building Image - Restored 3D overflow effect */}
        <div
          className="absolute right-0 top-1/2 z-20 hidden lg:block"
          style={{
            width: "clamp(300px, 40vw, 540px)",
            height: "clamp(315px, 42vw, 567px)",
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
            sizes="(max-width: 1024px) 0px, (max-width: 1280px) 400px, 540px"
          />
        </div>

        {/* Mobile Building Image - Centered and contained */}
        <div className="block lg:hidden mt-6">
          <div className="relative w-full max-w-xs mx-auto aspect-[540/567]">
            <Image
              src="/images/building-2.png"
              alt="Modern Property"
              fill
              className="object-contain"
              draggable={false}
              priority
              sizes="(max-width: 1024px) 300px, 0px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
