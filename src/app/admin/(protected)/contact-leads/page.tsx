// src/app/admin/contact-leads/page.tsx
import { Suspense } from "react";
import { getContactLeads } from "@/lib/firestore";

import { ContactLeadsTable } from "@/components/admin/ContactLeadsTable";
import { Skeleton } from "@/components/ui/skeleton";
import { ContactLeadsHeader } from "@/components/admin/ContactLeadsHeader";

function ContactLeadsSkeleton() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>

      {/* Statistics Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-2xl" />
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="bg-white rounded-2xl border">
        <div className="p-6 border-b">
          <Skeleton className="h-6 w-48" />
        </div>
        <div className="p-6 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-4">
              {Array.from({ length: 5 }).map((_, j) => (
                <Skeleton key={j} className="h-4 flex-1" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

async function ContactLeadsData() {
  const leads = await getContactLeads();
  return <ContactLeadsTable initialLeads={leads} />;
}

export default function AdminContactLeadsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={<ContactLeadsSkeleton />}>
        <div className="p-8 max-w-7xl mx-auto space-y-8">
          <ContactLeadsHeader />
          <ContactLeadsData />
        </div>
      </Suspense>
    </div>
  );
}
