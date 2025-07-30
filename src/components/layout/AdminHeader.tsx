"use client";

import { useAdminSidebar } from "@/components/layout/AdminSidebarContext";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

const pageTitleMap: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/leads": "Leads",
  "/admin/listings": "Listings",
};

export function AdminHeader() {
  const { setSidebarOpen } = useAdminSidebar();
  const pathname = usePathname();
  const title = pageTitleMap[pathname] || "Admin";

  return (
    <header className="h-14 flex items-center border-b bg-white px-6">
      {/* Hamburger (left) - only visible on mobile */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden mr-3"
        aria-label="Open sidebar"
      >
        <Menu size={24} />
      </button>
      {/* Page Title */}
      <span className="text-lg font-semibold">{title}</span>
      {/* (Add avatar/profile actions here in the future) */}
    </header>
  );
}
