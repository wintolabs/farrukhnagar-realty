import EditPropertyClient from "@/components/admin/EditPropertyClient";
import { getPropertyById } from "@/lib/firestore";

interface EditPageProps {
  params: { id: string };
}

export default async function EditPropertyPage({ params }: EditPageProps) {
  const property = await getPropertyById(params.id);

  if (!property) {
    return <div className="p-8">Property not found.</div>;
  }

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Property</h1>
      <EditPropertyClient property={property} />
    </main>
  );
}
