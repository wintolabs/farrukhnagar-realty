import Link from "next/link";
import { Landmark, Phone, Mail } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-white py-10 mt-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-start md:justify-between gap-12">
        {/* Left: Logo */}
        <div className="flex flex-col gap-4 min-w-[120px]">
          <Image
            src="/logo-3.png"
            alt="Logo"
            width={280}
            height={48}
            className="rounded-xl"
          />
          <p className="text-gray-700 text-sm leading-relaxed">
            Building trust in real estate since 2000.
          </p>
        </div>

        {/* Center: Products or Navigation */}
        <div className="flex flex-col gap-2 min-w-[160px]">
          <div className="text-gray-900 font-semibold mb-2">Quick Links</div>
          <Link href="/" className="text-gray-700 font-light">
            Home
          </Link>
          <Link href="/about" className="text-gray-700 font-light">
            About Us
          </Link>
          <Link href="/listings" className="text-gray-700 font-light">
            Listings
          </Link>
          <Link href="/services" className="text-gray-700 font-light">
            Services
          </Link>
        </div>

        {/* Right: Contact Us */}
        <div className="flex flex-col gap-2 min-w-[200px]">
          <div className="text-gray-900 font-medium mb-2">Contact Us</div>
          <div className="flex items-center gap-2 text-gray-900">
            <Landmark className="w-5 h-5" />
            Farrukhnagar Realty
          </div>
          <a
            href="tel:+911234567890"
            className="flex items-center gap-2 text-gray-900 hover:underline"
          >
            <Phone className="w-5 h-5" />
            +91 12345 67890
          </a>
          <a
            href="mailto:info@farrukhnagar-realty.com"
            className="flex items-center gap-2 text-gray-900 hover:underline"
          >
            <Mail className="w-5 h-5" />
            farrukhnagarrealty@gmail.com
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 pt-6 flex items-center justify-center text-gray-500 font-extralight text-sm">
        All rights reserved &bull; Farrukhnagar Realty &bull; Copyright©{" "}
        {new Date().getFullYear()}
      </div>
    </footer>
  );
}
