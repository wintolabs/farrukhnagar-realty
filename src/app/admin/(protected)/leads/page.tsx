import { getLeads } from "@/lib/firestore";
import { LeadsTable } from "@/components/admin/LeadsTable";

export default async function LeadsPage() {
  const leads = await getLeads();

  return (
    <main className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📋 Property Inquiry Leads</h1>
      <LeadsTable leads={leads} />
    </main>
  );
}
