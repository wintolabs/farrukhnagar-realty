"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface WhatsAppProps {
  phoneNumber?: string;
  className?: string;
  variant?: "floating" | "header";
}

export function WhatsApp({
  phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9876543210",
  className = "",
  variant = "floating",
}: WhatsAppProps) {
  if (variant === "floating") {
    // Original floating version
    return (
      <div
        className={`fixed bottom-6 right-6 block lg:hidden z-50 ${className}`}
      >
        <a
          href={`https://wa.me/91${phoneNumber}?text=Hi,  I'm interested in your real estate services in Farrukhnagar.`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-24 h-24 hover:scale-110 transition-transform duration-200"
          aria-label="Chat on WhatsApp"
        >
          <DotLottieReact
            src="/lottie/whatsapp.json"
            loop
            autoplay
            className="w-full h-full"
          />
        </a>
      </div>
    );
  }

  // Header version
  return (
    <div className={` block z-50 ${className}`}>
      <a
        href={`https://wa.me/91${phoneNumber}?text=Hi,  I'm interested in your real estate services in Farrukhnagar.`}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-16 h-16 hover:scale-110 transition-transform duration-200"
        aria-label="Chat on WhatsApp"
      >
        <DotLottieReact
          src="/lottie/whatsapp.json"
          loop
          autoplay
          className="w-full h-full"
        />
      </a>
    </div>
  );
}
