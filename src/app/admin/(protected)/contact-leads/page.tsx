import { ContactLeadsTable } from "@/components/admin/ContactLeadsTable";
import { getContactLeads } from "@/lib/firestore";

export default async function AdminContactLeadsPage() {
  const leads = await getContactLeads();

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Contact Us Leads</h1>
      <ContactLeadsTable leads={leads} />
    </div>
  );
}
