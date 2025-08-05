// src/app/listings/[id]/page.tsx
import { Suspense } from "react";
import { getPropertyById } from "@/lib/firestore";
import { notFound } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";
import { PropertyHeader } from "@/components/property/PropertyHeader";
import { PropertyImageGallery } from "@/components/property/PropertyImageGallery";
import { PropertyDetails } from "@/components/property/PropertyDetails";
import { PropertyInquirySection } from "@/components/property/PropertyInquirySection";

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

function PropertyPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-12 w-3/4 mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-16" />
            ))}
          </div>
        </div>

        {/* Gallery Skeleton */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <Skeleton className="h-96 rounded-2xl" />
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-44 rounded-xl" />
            ))}
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Skeleton className="h-64 rounded-2xl" />
          </div>
          <Skeleton className="h-96 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

async function PropertyPageContent({ id }: { id: string }) {
  const property = await getPropertyById(id);

  if (!property || property.isDeleted) {
    return notFound();
  }

  return (
    <>
      <PropertyHeader property={property} />
      <PropertyImageGallery images={property.images} title={property.title} />

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <PropertyDetails property={property} />
        </div>
        <div className="lg:col-span-1">
          <PropertyInquirySection property={property} propertyId={id} />
        </div>
      </div>
    </>
  );
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Suspense fallback={<PropertyPageSkeleton />}>
          <PropertyPageContent id={id} />
        </Suspense>
      </div>
    </div>
  );
}
