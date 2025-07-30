"use client";

import React, { createContext, useContext, useState } from "react";

type AdminSidebarContextType = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

const AdminSidebarContext = createContext<AdminSidebarContextType | undefined>(
  undefined
);

export function AdminSidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AdminSidebarContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      {children}
    </AdminSidebarContext.Provider>
  );
}

export function useAdminSidebar() {
  const context = useContext(AdminSidebarContext);
  if (!context)
    throw new Error("useAdminSidebar must be used within AdminSidebarProvider");
  return context;
}
