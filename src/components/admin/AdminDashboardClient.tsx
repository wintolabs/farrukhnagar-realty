// src/components/admin/AdminDashboardClient.tsx

"use client";

import { Property } from "@/types/property";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AdminPropertyCard } from "./AdminPropertyCard";
import { DeletePropertyDialog } from "./DeletePropertyDialog";

export default function AdminDashboardClient({
  properties,
  leadCountMap,
}: {
  properties: Property[];
  leadCountMap: Map<string, number>;
}) {
  const total = properties.length;
  const sold = properties.filter((p) => p.status === "Sold").length;
  const available = total - sold;

  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    title: string;
  } | null>(null);

  return (
    <div className="relative min-h-screen">
      <main className="p-8 max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <StatCard label="Total Properties" value={total} />
          <StatCard label="Available" value={available} />
          <StatCard label="Sold" value={sold} />
        </div>

        <h2 className="text-xl font-semibold mb-4">All Properties</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <AdminPropertyCard
              key={property.id}
              property={property}
              leadCount={leadCountMap.get(property.id) ?? 0}
            />
          ))}

          {deleteTarget && (
            <DeletePropertyDialog
              id={deleteTarget.id}
              title={deleteTarget.title}
              onClose={() => setDeleteTarget(null)}
            />
          )}
        </div>
      </main>

      <Link
        href="/admin/listings/create"
        className="fixed bottom-6 right-6 flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full shadow-lg hover:bg-gray-800 transition"
      >
        <Plus size={20} />
        <span className="text-sm font-medium">Add Property</span>
      </Link>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white p-6 rounded shadow text-center">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}
