// src/components/property/PropertyHeader.tsx
import { Property } from "@/types/property";
import { Badge } from "@/components/ui/badge";
import { MapPin, Home, Maximize, IndianRupee } from "lucide-react";

interface PropertyHeaderProps {
  property: Property;
}

export function PropertyHeader({ property }: PropertyHeaderProps) {
  return (
    <div className="mb-12">
      {/* Title and Status */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div className="flex-1">
          <h2 className="text-sm md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {property.title}
          </h2>
          <div className="flex items-center text-gray-600 mb-4">
            <MapPin className="w-5 h-5 mr-2 text-emerald-600" />
            <span className="text-lg">{property.location}</span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3">
          <Badge
            className={`text-lg px-4 py-2 ${
              property.status === "Sold"
                ? "bg-red-100 text-red-800 border-red-200"
                : "bg-emerald-100 text-emerald-800 border-emerald-200"
            } border`}
          >
            {property.status}
          </Badge>
          <div className="text-right">
            <div className="text-xl md:text-4xl font-bold text-emerald-600 flex items-center">
              <IndianRupee className="w-8 h-8 mr-1" />
              {property.price.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Home className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Type</p>
              <p className="font-semibold text-gray-900">{property.type}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Maximize className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Area</p>
              <p className="font-semibold text-gray-900">{property.area}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <MapPin className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <p
                className={`font-semibold ${
                  property.status === "Sold"
                    ? "text-red-600"
                    : "text-emerald-600"
                }`}
              >
                {property.status}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Home className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Images</p>
              <p className="font-semibold text-gray-900">
                {property.images.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
