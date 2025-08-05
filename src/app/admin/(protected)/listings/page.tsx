// src/app/admin/listings/page.tsx
import { Suspense } from "react";
import { getAllProperties, getLeads } from "@/lib/firestore";
import { AdminListingsHeader } from "@/components/admin/AdminListingsHeader";
import { AdminListingsGrid } from "@/components/admin/AdminListingsGrid";
import { Skeleton } from "@/components/ui/skeleton";

// Loading skeleton component
function AdminListingsSkeleton() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-80" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Statistics Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-2xl" />
        ))}
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-48 rounded-2xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ✅ Parallel data fetching wrapper
async function AdminListingsData() {
  // Fetch data in parallel for better performance
  const [properties, leads] = await Promise.all([
    getAllProperties(),
    getLeads(),
  ]);

  return <AdminListingsGrid properties={properties} leads={leads} />;
}

export default function AdminListingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<AdminListingsSkeleton />}>
        <div className="p-8 max-w-7xl mx-auto">
          <AdminListingsHeader />
          <AdminListingsData />
        </div>
      </Suspense>
    </div>
  );
}
