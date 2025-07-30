import { getAllProperties, getLeads } from "@/lib/firestore";
import { AdminPropertyCard } from "@/components/admin/AdminPropertyCard";
import Link from "next/link";

export default async function AdminListingsPage() {
  const properties = await getAllProperties();

  const leads = await getLeads();

  // Map: propertyId → lead count
  const leadCountMap = new Map<string, number>();
  leads.forEach((lead) => {
    leadCountMap.set(
      lead.propertyId,
      (leadCountMap.get(lead.propertyId) ?? 0) + 1
    );
  });

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Listings</h1>
        <Link
          href="/admin/listings/create"
          className="px-4 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700 transition"
        >
          + Add Listing
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <AdminPropertyCard
            key={property.id}
            property={property}
            leadCount={leadCountMap.get(property.id) ?? 0}
          />
        ))}
      </div>
    </div>
  );
}
