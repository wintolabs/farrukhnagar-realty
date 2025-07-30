"use client";

import {
  Home,
  List,
  FileText,
  User,
  LogOut,
  ChevronDown,
  MailIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useAdminSidebar } from "@/components/layout/AdminSidebarContext";
import Image from "next/image";

const dummyProfile = {
  name: "Admin",
  email: "me@example.com",
  avatarUrl: "/images/profile.png",
};

const navLinks = [
  { name: "Dashboard", href: "/admin", icon: <Home size={20} /> },
  { name: "Leads", href: "/admin/leads", icon: <List size={20} /> },
  { name: "Listings", href: "/admin/listings", icon: <FileText size={20} /> },
  {
    name: "Contact Leads",
    href: "/admin/contact-leads",
    icon: <MailIcon size={20} />,
  },
];

export function AdminSidebar({
  newLeadCount = 0,
  newContactLeadCount = 0,
}: {
  newLeadCount?: number;
  newContactLeadCount?: number;
}) {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen } = useAdminSidebar();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  // Sidebar content: one solid structure for both desktop and mobile
  const SidebarContent = (
    <div className="flex flex-col h-screen bg-white border-r w-64">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b font-bold text-xl">
        <span className="text-red-600">LOGO</span>
      </div>
      {/* Nav */}
      <nav className="flex-1 flex flex-col py-4">
        {navLinks.map((link) => {
          const isLeads = link.name === "Leads";
          const isContactLeads = link.name === "Contact Leads";
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-6 py-2 my-1 rounded-md font-medium transition 
        ${pathname === link.href ? "bg-gray-100 text-black" : "text-gray-600 hover:bg-gray-50"}
      `}
              onClick={() => setSidebarOpen(false)}
            >
              {link.icon}
              {link.name}
              {isLeads && newLeadCount > 0 && (
                <span className="ml-2 inline-block min-w-[20px] text-xs px-1 py-0.5 rounded-full bg-blue-600 text-white text-center">
                  {newLeadCount}
                </span>
              )}
              {isContactLeads && newContactLeadCount > 0 && (
                <span className="ml-2 inline-block min-w-[20px] text-xs px-1 py-0.5 rounded-full bg-blue-600 text-white text-center">
                  {newContactLeadCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      {/* Bottom: Profile Card Dropdown */}
      <div className="px-4 pb-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 w-full rounded-lg p-2 hover:bg-gray-100 transition focus:outline-none">
              <Image
                src={dummyProfile.avatarUrl}
                alt={dummyProfile.name}
                width={40}
                height={40}
                className="rounded-lg object-cover"
                priority
              />
              <div className="flex flex-col text-left flex-1">
                <span className="text-sm font-medium">{dummyProfile.name}</span>
                <span className="text-xs text-gray-500">
                  {dummyProfile.email}
                </span>
              </div>
              <ChevronDown size={18} className="text-gray-400 ml-auto" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="font-semibold">{dummyProfile.name}</span>
                <span className="text-xs text-gray-500">
                  {dummyProfile.email}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
              <User size={16} /> Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex items-center gap-2 text-red-600 cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut size={16} /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col h-screen fixed left-0 top-0 z-30">
        {SidebarContent}
      </aside>
      {/* Mobile sidebar in Sheet */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64 h-screen fixed inset-0">
          {SidebarContent}
        </SheetContent>
      </Sheet>
    </>
  );
}
