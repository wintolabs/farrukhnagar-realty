// components/home/ProcessSection.tsx
"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function ProcessSection() {
  const steps = [
    {
      lottieUrl: "/lottie/message.json",
      title: "Answer questions",
      subtitle: "Tell us your investment goals",
      description:
        "Share your budget, preferred location, and investment timeline. Our experts will understand your requirements in just a few minutes.",
    },
    {
      lottieUrl: "/lottie/map-search.json",
      title: "Select a property",
      subtitle: "Browse curated options",
      description:
        "Choose from our RERA-verified plots and properties in prime Farrukhnagar locations. All with clear legal documentation.",
    },
    {
      lottieUrl: "/lottie/registration.json",
      title: "Get registered",
      subtitle: "Complete legal process",
      description:
        "Our legal team handles all documentation and registration for a smooth, transparent transaction with full compliance.",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Responsive typography only */}
        <div className="text-center mb-12 sm:mb-16">
          <p
            className="text-black text-center mx-auto mb-3 text-sm sm:text-base"
            style={{
              fontFamily: "Poppins",
              fontWeight: 400,
              lineHeight: "120%",
              color: "#000000",
            }}
          >
            Three steps. Three minutes.
          </p>

          <h2
            className="text-black text-center mx-auto font-semibold"
            style={{
              fontFamily: "Poppins",
              fontWeight: 600,
              fontSize: "clamp(1.75rem, 5vw, 3.125rem)", // 28px to 50px responsive
              lineHeight: "120%",
              color: "#000000",
            }}
          >
            Everything should be this easy.
          </h2>
        </div>

        {/* Three Process Cards - Responsive grid with Lottie */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="text-center flex flex-col items-center group cursor-pointer"
            >
              {/* Lottie Animation - responsive sizing */}
              <div className="mb-4 sm:mb-6 flex justify-center">
                <div className="w-18 h-18 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 group-hover:scale-110 transition-transform duration-300">
                  <DotLottieReact
                    src={step.lottieUrl}
                    loop
                    autoplay
                    className="w-full h-full"
                  />
                </div>
              </div>

              {/* Title - responsive typography */}
              <h3
                className="text-black mb-2"
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 600,
                  fontSize: "clamp(1rem, 2.5vw, 1.25rem)", // 16px to 20px responsive
                  lineHeight: "120%",
                  color: "#000000",
                }}
              >
                {step.title}
              </h3>

              {/* Subtitle - responsive typography */}
              <p
                className="text-emerald-600 mb-3"
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 500,
                  fontSize: "clamp(0.75rem, 2vw, 0.875rem)", // 12px to 14px responsive
                  lineHeight: "120%",
                }}
              >
                {step.subtitle}
              </p>

              {/* Description - responsive typography and width */}
              <p
                className="text-gray-600 leading-relaxed max-w-xs sm:max-w-sm mx-auto"
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 400,
                  fontSize: "clamp(0.75rem, 2vw, 0.875rem)", // 12px to 14px responsive
                  lineHeight: "150%",
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
