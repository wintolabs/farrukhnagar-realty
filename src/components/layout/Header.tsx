"use client";

import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  Navbar,
  NavBody,
  NavItems,
} from "@/components/ui/resizable-navbar";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { WhatsApp } from "../ui/whatsapp";

const navItems = [
  { name: "Home", link: "/" },
  { name: "About Us", link: "/about" },
  { name: "Listings", link: "/listings" },
  { name: "Services", link: "/services" },
];

const Logo = () => (
  <div className="flex items-center gap-2">
    <Image
      src="/logo-5.png"
      alt="Farrukhnagar Realty Logo"
      width={180}
      height={50}
      className="h-12 w-auto object-contain rounded-full"
      priority
      sizes="(max-width: 640px) 180px, (max-width: 1024px) 200px, 260px"
    />
  </div>
);

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full z-50 font-sans">
      <Navbar className="transition-all duration-200">
        {/* Desktop Navigation */}
        <NavBody className="py-2 sm:py-3 px-4 sm:px-6 lg:px-8 min-h-[60px] sm:min-h-[65px] lg:min-h-[70px] max-w-7xl mx-auto bg-white">
          <Link href="/" className="flex-shrink-0">
            <Logo />
          </Link>

          <NavItems
            items={navItems}
            className="hidden lg:flex gap-4 xl:gap-8 text-sm lg:text-base font-light text-gray-700 hover:text-gray-900 transition-colors"
          />

          <WhatsApp variant="header" />
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav className="lg:hidden bg-white">
          <MobileNavHeader className="px-4 sm:px-6 py-3 bg-white">
            <Link href="/" className="flex-shrink-0">
              <Logo />
            </Link>
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            className="bg-white shadow-lg mt-2"
          >
            {/* Mobile Navigation Links */}
            <div className="py-2 bg-white">
              {navItems.map((item, idx) => (
                <Link
                  key={item.name + idx}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-700 font-normal px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}

export default Header;
