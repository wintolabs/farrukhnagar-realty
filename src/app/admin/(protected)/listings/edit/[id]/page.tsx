// src/app/admin/(protected)/listings/edit/[id]/page.tsx

import EditPropertyClient from "@/components/admin/EditPropertyClient";
import { getPropertyById } from "@/lib/firestore";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPropertyPage({ params }: EditPageProps) {
  const { id } = await params;

  const property = await getPropertyById(id);

  if (!property) {
    return <div className="p-8">Property not found.</div>;
  }

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <EditPropertyClient property={property} />
    </main>
  );
}
