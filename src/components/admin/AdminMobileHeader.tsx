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
        className="p-2 hover:bg-gray-100"
        aria-label="Open sidebar"
      >
        <Menu size={24} className="text-gray-600" />
      </Button>
      <div className="w-10" />
    </header>
  );
}
