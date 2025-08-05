// src/app/admin/(protected)/layout.tsx

import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AdminSidebarProvider } from "@/components/layout/AdminSidebarContext";

import { verifyToken } from "@/lib/auth";
import { getContactLeads, getLeads } from "@/lib/firestore";
import { redirect } from "next/navigation";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Use JWT verification instead of simple cookie check
  const user = await verifyToken();
  if (!user) {
    redirect("/admin/login");
  }

  const leads = await getLeads();
  const newLeadCount = leads.filter((l) => l.status === "New").length;

  const contactLeads = await getContactLeads();
  const newContactLeadCount = contactLeads.filter(
    (l) => l.status === "New"
  ).length;

  return (
    <AdminSidebarProvider>
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1 md:ml-64">
          <AdminSidebar
            newLeadCount={newLeadCount}
            newContactLeadCount={newContactLeadCount}
          />
          <main className="flex-1 p-6 bg-white">{children}</main>
        </div>
      </div>
    </AdminSidebarProvider>
  );
}
