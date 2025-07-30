// src/app/admin/(protected)/listings/[id]/page.tsx
import { LeadsTable } from "@/components/admin/LeadsTable";
import { getLeadsByPropertyId, getPropertyById } from "@/lib/firestore";
import Image from "next/image";
import { notFound } from "next/navigation";

interface ViewPageProps {
  params: Promise<{ id: string }>;
}

export default async function ViewPropertyPage({ params }: ViewPageProps) {
  const { id } = await params;

  const property = await getPropertyById(id);
  if (!property) return notFound();

  const leads = await getLeadsByPropertyId(id);

  return (
    <main className="p-8 max-w-4xl mx-auto space-y-6">
      {/* Title + Meta */}
      <div>
        <h1 className="text-3xl font-bold mb-1">{property.title}</h1>
        <span
          className={`inline-block text-xs font-semibold px-2 py-1 rounded ${
            property.status === "Sold"
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {property.status}
        </span>
      </div>

      {/* Details */}
      <div className="bg-white rounded shadow p-6 space-y-2 text-gray-700">
        <p>
          <strong>Location:</strong> {property.location}
        </p>
        <p>
          <strong>Price:</strong> ₹{property.price.toLocaleString()}
        </p>
        <p>
          <strong>Area:</strong> {property.area}
        </p>
        <p>
          <strong>Type:</strong> {property.type}
        </p>
        <p>
          <strong>Tags:</strong>{" "}
          {property.tags?.length ? property.tags.join(", ") : "—"}
        </p>
        <div>
          <strong>Description:</strong>
          <p className="whitespace-pre-line mt-1 text-sm text-gray-600">
            {property.description}
          </p>
        </div>
        {property.createdAt && (
          <p className="text-xs text-gray-400 mt-4">
            Created on: {new Date(property.createdAt).toLocaleString()}
          </p>
        )}
        {property.updatedAt && (
          <p className="text-xs text-gray-400">
            Last updated: {new Date(property.updatedAt).toLocaleString()}
          </p>
        )}
      </div>

      {/* Image Gallery */}
      {property.images?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Image Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {property.images.map((url, index) => (
              <div
                key={index}
                className="border rounded overflow-hidden aspect-[4/3]"
              >
                <Image
                  src={url}
                  alt={`Property Image ${index + 1}`}
                  width={640}
                  height={480}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Leads for this Property</h2>
        {leads.length === 0 ? (
          <p className="text-gray-500">No inquiries yet for this property.</p>
        ) : (
          <LeadsTable leads={leads} />
        )}
      </section>
    </main>
  );
}
