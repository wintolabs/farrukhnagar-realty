// src/components/admin/PropertyDetailsHeader.tsx
import { Property } from "@/types/property";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, ExternalLink } from "lucide-react";
import Link from "next/link";

interface PropertyDetailsHeaderProps {
  property: Property;
}

export function PropertyDetailsHeader({
  property,
}: PropertyDetailsHeaderProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/listings">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Listings
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link href={`/listings/${property.id}`} target="_blank">
            <Button variant="outline" size="sm">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Public Page
            </Button>
          </Link>
          <Link href={`/admin/listings/edit/${property.id}`}>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Edit className="w-4 h-4 mr-2" />
              Edit Property
            </Button>
          </Link>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
          <Badge
            className={`${
              property.status === "Sold"
                ? "bg-red-100 text-red-800 border-red-200"
                : "bg-green-100 text-green-800 border-green-200"
            } border`}
          >
            {property.status}
          </Badge>
        </div>

        <div className="flex items-center gap-6 text-gray-600">
          <span>📍 {property.location}</span>
          <span>🏠 {property.type}</span>
          <span>📐 {property.area}</span>
        </div>

        <div className="text-2xl font-bold text-emerald-600">
          ₹{property.price.toLocaleString()}
        </div>
      </div>
    </div>
  );
}
