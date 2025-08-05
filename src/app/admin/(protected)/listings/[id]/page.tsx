// src/app/admin/(protected)/listings/[id]/page.tsx
import { Suspense } from "react";
import { getLeadsByPropertyId, getPropertyById } from "@/lib/firestore";
import { notFound } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";
import { PropertyDetailsHeader } from "@/components/admin/PropertyDetailsHeader";
import { PropertyImageGallery } from "@/components/admin/PropertyImageGallery";
import { PropertyDetailsContent } from "@/components/admin/PropertyDetailsContent";
import { PropertyLeadsSection } from "@/components/admin/PropertyLeadsSection";

interface ViewPageProps {
  params: Promise<{ id: string }>;
}

function PropertyDetailsSkeleton() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="p-8 max-w-6xl mx-auto space-y-8">
        {/* Header Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-6 w-32" />
        </div>

        {/* Content Grid Skeleton */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-64 rounded-2xl" />
            <Skeleton className="h-40 rounded-2xl" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-32 rounded-2xl" />
            <Skeleton className="h-48 rounded-2xl" />
          </div>
        </div>

        {/* Leads Section Skeleton */}
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    </main>
  );
}

async function PropertyDetailsData({ id }: { id: string }) {
  const [property, leads] = await Promise.all([
    getPropertyById(id),
    getLeadsByPropertyId(id),
  ]);

  if (!property) return notFound();

  return (
    <>
      <PropertyDetailsHeader property={property} />

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <PropertyImageGallery
            images={property.images}
            title={property.title}
          />
          <PropertyDetailsContent property={property} />
        </div>

        <div className="space-y-6">
          <PropertyLeadsSection leads={leads} propertyTitle={property.title} />
        </div>
      </div>
    </>
  );
}

export default async function ViewPropertyPage({ params }: ViewPageProps) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-white">
      <div className="p-8 max-w-6xl mx-auto space-y-8">
        <Suspense fallback={<PropertyDetailsSkeleton />}>
          <PropertyDetailsData id={id} />
        </Suspense>
      </div>
    </main>
  );
}
