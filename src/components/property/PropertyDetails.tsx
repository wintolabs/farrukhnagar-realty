// src/components/property/PropertyDetails.tsx
import { Property } from "@/types/property";

interface PropertyDetailsProps {
  property: Property;
}

export function PropertyDetails({ property }: PropertyDetailsProps) {
  return (
    <div className="space-y-8">
      {/* Description */}
      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Description</h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {property.description ||
              "No description available for this property."}
          </p>
        </div>
      </div>

      {/* Features & Amenities */}
      {property.tags?.length > 0 && (
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Features & Amenities
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {property.tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center p-3 bg-emerald-50 rounded-lg border border-emerald-200"
              >
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                <span className="text-emerald-800 font-medium">{tag}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Property Specifications */}
      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Property Specifications
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600">Property Type</span>
              <span className="font-semibold text-gray-900">
                {property.type}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600">Total Area</span>
              <span className="font-semibold text-gray-900">
                {property.area}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600">Status</span>
              <span
                className={`font-semibold ${
                  property.status === "Sold"
                    ? "text-red-600"
                    : "text-emerald-600"
                }`}
              >
                {property.status}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600">Price</span>
              <span className="font-bold text-emerald-600 text-lg">
                ₹{property.price.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600">Location</span>
              <span className="font-semibold text-gray-900">
                {property.location}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
