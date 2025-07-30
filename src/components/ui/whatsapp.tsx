// components/ui/AnimatedWhatsapp.tsx
"use client";

import { IconBrandWhatsapp } from "@tabler/icons-react";
import React from "react";

interface AnimatedWhatsappProps {
  phone?: string;
  className?: string;
}

export function AnimatedWhatsapp({
  phone = "919XXXXXXXXX",
  className = "",
}: AnimatedWhatsappProps) {
  return (
    <a
      href={`https://wa.me/${phone}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={`flex items-center gap-2 px-4 py-2 bg-emerald-600 rounded-full shadow text-white font-semibold transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 ${className}`}
    >
      <IconBrandWhatsapp className="w-6 h-6 animate-pulse" />
      <span className="hidden sm:inline">Chat</span>
    </a>
  );
}
