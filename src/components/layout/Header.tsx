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
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { name: "Home", link: "/" },
  { name: "About Us", link: "/about" },
  { name: "Listings", link: "/listings" },
  { name: "Services", link: "/services" },
];

const Logo = () => (
  <div className="flex items-center gap-2">
    <Image
      src="/logo-3.png"
      alt="Farrukhnagar Realty Logo"
      width={180}
      height={48}
      className="h-8 sm:h-9 lg:h-10 w-auto object-contain rounded-full"
      priority
      sizes="(max-width: 640px) 120px, (max-width: 1024px) 150px, 180px"
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

          <Button
            asChild
            style={{
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
            }}
            className="hidden sm:flex px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-6 rounded-full font-normal text-sm sm:text-base lg:text-md text-black bg-white/90 border-1 border-gray-400 hover:bg-white/20 transition cursor-pointer"
          >
            <Link href="/contact">Contact Us</Link>
          </Button>

          <Button
            asChild
            className="flex sm:hidden px-3 py-2 rounded-full font-normal text-sm text-black bg-white/90 hover:bg-white/20 transition cursor-pointer"
          >
            <Link href="/contact">Contact</Link>
          </Button>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav className="lg:hidden bg-white">
          <MobileNavHeader className="px-4 sm:px-6 py-3 bg-white">
            {/* ☝️ REMOVED: border-b border-gray-200 */}
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
            className="bg-white shadow-lg"
          >
            {/* Mobile Navigation Links - NO DIVIDERS */}
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

            {/* Mobile Contact Button - WHITE BACKGROUND */}
            <div className="p-4 sm:p-6 bg-white">
              {/* ☝️ CHANGED: bg-gray-50 → bg-white */}
              <Button
                asChild
                className="w-full px-6 py-3 sm:py-4 rounded-full font-medium text-base text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-lg"
              >
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </Button>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}

export default Header;
