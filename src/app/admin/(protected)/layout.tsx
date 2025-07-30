import { AdminHeader } from "@/components/layout/AdminHeader";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AdminSidebarProvider } from "@/components/layout/AdminSidebarContext";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getContactLeads, getLeads } from "@/lib/firestore";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = (await cookies()).get("admin-session");
  if (!session || session.value !== "1") redirect("/admin/login");

  const leads = await getLeads();
  const newLeadCount = leads.filter((l) => l.status === "New").length;

  const contactLeads = await getContactLeads();
  const newContactLeadCount = contactLeads.filter(
    (l) => l.status === "New"
  ).length;

  return (
    <AdminSidebarProvider>
      <div className="flex flex-col min-h-screen">
        <AdminHeader />
        <div className="flex flex-1 md:ml-64">
          <AdminSidebar
            newLeadCount={newLeadCount}
            newContactLeadCount={newContactLeadCount}
          />
          <main className="flex-1 p-6 bg-gray-50">{children}</main>
        </div>
      </div>
    </AdminSidebarProvider>
  );
}
