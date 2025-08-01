import Link from "next/link";
import { Landmark, Phone, Mail } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-white py-8 sm:py-10 mt-8 sm:mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-start md:justify-between gap-8 sm:gap-10 lg:gap-12">
        {/* Left: Logo - Responsive */}
        <div className="flex flex-col gap-3 sm:gap-4 min-w-[120px] text-center md:text-left">
          <Image
            src="/logo-3.png"
            alt="Logo"
            width={280}
            height={48}
            className="rounded-xl w-auto h-8 sm:h-10 lg:h-12 mx-auto md:mx-0"
            sizes="(max-width: 640px) 200px, (max-width: 1024px) 240px, 280px"
          />
          <p className="text-gray-700 text-xs sm:text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
            Building trust in real estate since 2000.
          </p>
        </div>

        {/* Center: Quick Links - Responsive */}
        <div className="flex flex-col gap-2 sm:gap-3 min-w-[160px] text-center md:text-left">
          <div className="text-gray-900 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
            Quick Links
          </div>
          <Link
            href="/"
            className="text-gray-700 font-light text-sm sm:text-base hover:text-gray-900 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-gray-700 font-light text-sm sm:text-base hover:text-gray-900 transition-colors"
          >
            About Us
          </Link>
          <Link
            href="/listings"
            className="text-gray-700 font-light text-sm sm:text-base hover:text-gray-900 transition-colors"
          >
            Listings
          </Link>
          <Link
            href="/services"
            className="text-gray-700 font-light text-sm sm:text-base hover:text-gray-900 transition-colors"
          >
            Services
          </Link>
        </div>

        {/* Right: Contact Us - Responsive */}
        <div className="flex flex-col gap-2 sm:gap-3 min-w-[200px] text-center md:text-left">
          <div className="text-gray-900 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
            Contact Us
          </div>

          <div className="flex items-center gap-2 text-gray-900 text-sm sm:text-base justify-center md:justify-start">
            <Landmark className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span>Farrukhnagar Realty</span>
          </div>

          <a
            href="tel:+911234567890"
            className="flex items-center gap-2 text-gray-900 hover:text-emerald-600 hover:underline text-sm sm:text-base transition-colors justify-center md:justify-start"
          >
            <Phone className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span>+91 12345 67890</span>
          </a>

          <a
            href="mailto:farrukhnagarrealty@gmail.com"
            className="flex items-center gap-2 text-gray-900 hover:text-emerald-600 hover:underline text-sm sm:text-base transition-colors justify-center md:justify-start break-all sm:break-normal"
          >
            <Mail className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span className="text-xs sm:text-sm lg:text-base">
              farrukhnagarrealty@gmail.com
            </span>
          </a>
        </div>
      </div>

      {/* Copyright - Responsive */}
      <div className="mt-8 sm:mt-10 pt-4 sm:pt-6 border-t border-gray-100 flex items-center justify-center text-gray-500 font-extralight text-xs sm:text-sm text-center px-4">
        <span className="leading-relaxed">
          All rights reserved &bull; Farrukhnagar Realty &bull; Copyright©{" "}
          {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}
