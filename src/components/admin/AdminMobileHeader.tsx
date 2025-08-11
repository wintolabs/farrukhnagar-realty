// src/components/layout/AdminMobileHeader.tsx
"use client";

import { useAdminSidebar } from "@/components/layout/AdminSidebarContext";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function AdminMobileHeader() {
  const { setSidebarOpen } = useAdminSidebar();

  return (
    <header className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setSidebarOpen(true)}
        className="hover:bg-gray-100 h-12 w-12 p-0 -m-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 rounded-md"
        aria-label="Open sidebar"
      >
        <span className="grid place-items-center w-full h-full">
          <Menu className="size-8" />
        </span>
      </Button>

      <div className="w-10" />
    </header>
  );
}
