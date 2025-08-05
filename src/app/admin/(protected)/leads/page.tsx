// src/app/admin/leads/page.tsx
import { Suspense } from "react";
import { getLeads } from "@/lib/firestore";
import { LeadsTable } from "@/components/admin/LeadsTable";
import { Skeleton } from "@/components/ui/skeleton";

function LeadsTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex gap-4 mb-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-10 w-64" />
      </div>
      <div className="border rounded-lg">
        <div className="p-4 bg-gray-50 border-b">
          <div className="flex gap-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} className="h-4 flex-1" />
            ))}
          </div>
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="p-4 border-b flex gap-4">
            {Array.from({ length: 7 }).map((_, j) => (
              <Skeleton key={j} className="h-4 flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function LeadsPage() {
  return (
    <main className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          📋 Property Inquiry Leads
        </h1>
        <p className="text-gray-600">
          Manage and track all property inquiries and leads
        </p>
      </div>

      <Suspense fallback={<LeadsTableSkeleton />}>
        <LeadsTableWrapper />
      </Suspense>
    </main>
  );
}

async function LeadsTableWrapper() {
  const leads = await getLeads();
  return <LeadsTable initialLeads={leads} />;
}
