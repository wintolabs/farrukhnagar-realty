// components/home/ProcessSection.tsx
"use client";
import { MessageSquare, FileSearch, UserCheck } from "lucide-react";

export default function ProcessSection() {
  const steps = [
    {
      icon: <MessageSquare className="w-16 h-16 text-green-500" />,
      title: "Answer questions",
      subtitle: "Tell us your investment goals",
      description:
        "Share your budget, preferred location, and investment timeline. Our experts will understand your requirements in just a few minutes.",
    },
    {
      icon: <FileSearch className="w-16 h-16 text-orange-500" />,
      title: "Select a property",
      subtitle: "Browse curated options",
      description:
        "Choose from our RERA-verified plots and properties in prime Farrukhnagar locations. All with clear legal documentation.",
    },
    {
      icon: <UserCheck className="w-16 h-16 text-blue-800" />,
      title: "Get registered",
      subtitle: "Complete legal process",
      description:
        "Our legal team handles all documentation and registration for a smooth, transparent transaction with full compliance.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="w-full mx-auto px-6 lg:px-8">
        {/* Section Header - Exact Figma specifications */}
        <div className="text-center mb-16">
          {/* "Three steps. Three minutes." - Exact Figma styling */}
          <p
            className="text-black text-center mx-auto mb-3"
            style={{
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "120%",
              color: "#000000",
              width: "218px",
              height: "19px",
            }}
          >
            Three steps. Three minutes.
          </p>

          {/* "Everything should be this easy." - Exact Figma styling */}
          <h2
            className="text-black text-center mx-auto"
            style={{
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: 600,
              fontSize: "50px",
              lineHeight: "120%",
              color: "#000000",
              width: "788px",
              height: "60px",
            }}
          >
            Everything should be this easy.
          </h2>
        </div>

        {/* Three Process Cards - Group 9 container */}
        <div
          className="grid md:grid-cols-3 gap-8 mx-auto"
          style={{
            height: "225px",
          }}
        >
          {steps.map((step, index) => (
            <div key={index} className="text-center flex flex-col items-center">
              {/* Icon Circle */}
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center">
                  {step.icon}
                </div>
              </div>

              {/* Title */}
              <h3
                className="text-black mb-2"
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 600,
                  fontSize: "20px",
                  lineHeight: "120%",
                  color: "#000000",
                }}
              >
                {step.title}
              </h3>

              {/* Subtitle */}
              <p
                className="text-emerald-600 mb-3"
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "120%",
                }}
              >
                {step.subtitle}
              </p>

              {/* Description */}
              <p
                className="text-gray-600 leading-relaxed max-w-xs mx-auto"
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 400,
                  fontSize: "14px",
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
