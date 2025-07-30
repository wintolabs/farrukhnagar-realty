import { Property } from "@/types/property";
import { PropertyCard } from "@/components/shared/PropertyCard";

interface PropertyGridProps {
  properties: Property[];
}

export function PropertyGrid({ properties }: PropertyGridProps) {
  return (
    <section
      id="listings"
      className="bg-gray-50 py-16 border-t border-gray-200"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-800">
          Our Curated Listings
        </h2>

        {properties.length === 0 ? (
          <p className="text-gray-500">
            No properties available right now. Please check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
