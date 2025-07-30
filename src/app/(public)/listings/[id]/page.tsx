import { PropertyInquiryForm } from "@/components/forms/PropertyInquiryForm";
import { getPropertyById } from "@/lib/firestore";
import Image from "next/image";
import { notFound } from "next/navigation";

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id: propertyId } = await params;

  const property = await getPropertyById(propertyId);
  if (!property || property.isDeleted) return notFound();

  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">{property.title}</h1>

      <div className="text-gray-600 mb-6 space-y-1">
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
          <strong>Status:</strong>{" "}
          <span
            className={
              property.status === "Sold"
                ? "text-red-600 font-medium"
                : "text-green-600 font-medium"
            }
          >
            {property.status}
          </span>
        </p>
        <p>
          <strong>Type:</strong> {property.type}
        </p>
        {property.tags.length > 0 && (
          <p>
            <strong>Tags:</strong> {property.tags.join(", ")}
          </p>
        )}
      </div>

      {property.description && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-700 whitespace-pre-line">
            {property.description}
          </p>
        </div>
      )}

      {property.images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {property.images.map((url, index) => (
            <div key={index} className="border rounded overflow-hidden">
              <Image
                src={url}
                alt={`Property Image ${index + 1}`}
                width={640}
                height={480}
                className="w-full h-60 object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {property.status !== "Sold" ? (
        <PropertyInquiryForm
          propertyId={String(propertyId)}
          propertyTitle={property.title}
        />
      ) : (
        <div className="mt-10 p-4 border rounded bg-gray-50 text-gray-700">
          This property is marked as <strong>Sold</strong>. You can explore
          other listings from our site.
        </div>
      )}
    </main>
  );
}
