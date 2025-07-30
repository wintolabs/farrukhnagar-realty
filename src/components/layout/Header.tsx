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
      className="h-10 w-auto object-contain rounded-full"
      priority
    />
  </div>
);

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full z-50 font-sans">
      <Navbar className=" transition-all duration-200">
        {/* Light gray background */}
        <NavBody className="py-3 px-8 min-h-[70px] max-w-7xl mx-auto bg-zinc-100">
          {/* Logo - Left Side */}
          <Link href="/">
            <Logo />
          </Link>

          {/* Navigation Items - Center */}
          <NavItems
            items={navItems}
            className="gap-8 text-base font-light text-gray-700 hover:text-gray-900 transition-colors"
          />

          {/* Right Side Button */}

          <Button
            asChild
            style={{
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
            }}
            className="px-8 py-6 rounded-full font-normal text-md text-black bg-white/90 border-1 border-gray-400 hover:bg-white/20 transition cursor-pointer"
          >
            <Link href="/contact">Contact Us</Link>
          </Button>
        </NavBody>
        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader className="px-4 py-3 ">
            <Link href="/">
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
            className="bg-white border-t border-gray-200"
          >
            {navItems.map((item, idx) => (
              <Link
                key={item.name + idx}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-gray-700 font-normal px-4 py-3 text-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                {item.name}
              </Link>
            ))}

            <Button
              asChild
              className="px-8 py-6 rounded-full font-normal text-md text-black bg-white/90 border-1 border-gray-400 hover:bg-white/20 transition cursor-pointer"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}

export default Header;
