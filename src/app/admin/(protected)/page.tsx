import { getAllProperties, getLeads } from "@/lib/firestore";
import AdminDashboardClient from "@/components/admin/AdminDashboardClient";

export default async function AdminDashboardPage() {
  const properties = await getAllProperties();

  const leads = await getLeads();

  // Build map propertyId → lead count
  const leadCountMap = new Map<string, number>();
  leads.forEach((lead) => {
    leadCountMap.set(
      lead.propertyId,
      (leadCountMap.get(lead.propertyId) ?? 0) + 1
    );
  });

  return (
    <AdminDashboardClient properties={properties} leadCountMap={leadCountMap} />
  );
}
