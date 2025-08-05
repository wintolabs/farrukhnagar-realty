// src/components/admin/PropertyDetailsContent.tsx
import { Property } from "@/types/property";
import { format } from "date-fns";

interface PropertyDetailsContentProps {
  property: Property;
}

export function PropertyDetailsContent({
  property,
}: PropertyDetailsContentProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Property Details
      </h2>

      <div className="space-y-6">
        {/* Description */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Description
          </h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-900 whitespace-pre-line leading-relaxed">
              {property.description}
            </p>
          </div>
        </div>

        {/* Tags */}
        {property.tags?.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Features & Amenities
            </h3>
            <div className="flex flex-wrap gap-2">
              {property.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-800 border border-blue-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Metadata */}
        <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
          {property.createdAt && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-1">
                Listed On
              </h3>
              <p className="text-sm text-gray-600">
                {format(new Date(property.createdAt), "PPP 'at' p")}
              </p>
            </div>
          )}

          {property.updatedAt && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-1">
                Last Updated
              </h3>
              <p className="text-sm text-gray-600">
                {format(new Date(property.updatedAt), "PPP 'at' p")}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
