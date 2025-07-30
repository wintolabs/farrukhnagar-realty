import { Property } from "@/types/property";
import Image from "next/image";
import Link from "next/link";

export function PropertyCard({ property }: { property: Property }) {
  return (
    <Link
      href={`/listings/${property.id}`}
      className="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      {/* Property Image - Landing page style */}
      <div className="aspect-[5/3] bg-gray-200 overflow-hidden relative">
        <Image
          src={property.images[0] || "/images/hero.jpg"}
          alt={property.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Status Badge - Top left */}
        <div className="absolute top-4 left-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              property.status === "Sold"
                ? "bg-red-500 text-white"
                : property.status === "Available"
                  ? "bg-emerald-600 text-white"
                  : "bg-blue-500 text-white"
            }`}
          >
            {property.status}
          </span>
        </div>
      </div>

      {/* Card Content - Landing page typography */}
      <div className="p-6">
        {/* Property Title */}
        <h3
          className="text-gray-900 mb-2"
          style={{
            fontFamily: "Poppins",
            fontWeight: 600,
            fontSize: "18px",
            lineHeight: "120%",
          }}
        >
          {property.title}
        </h3>

        {/* Property Description */}
        <p
          className="text-gray-600 mb-4 line-clamp-2"
          style={{
            fontFamily: "Poppins",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "150%",
          }}
        >
          {property.description ||
            "Prime location with excellent connectivity and modern amenities."}
        </p>

        {/* Property Details - Price and Location */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <span
              className="text-emerald-600 font-semibold"
              style={{
                fontFamily: "Poppins",
                fontSize: "20px",
                fontWeight: 600,
              }}
            >
              ₹{property.price?.toLocaleString()}
            </span>
          </div>
          <div
            className="text-gray-500"
            style={{
              fontFamily: "Poppins",
              fontSize: "12px",
              fontWeight: 400,
            }}
          >
            {property.area && `${property.area} sq ft`}
          </div>
        </div>

        {/* Location */}
        <div
          className="text-gray-600"
          style={{
            fontFamily: "Poppins",
            fontSize: "14px",
            fontWeight: 400,
          }}
        >
          📍 {property.location}
        </div>
      </div>
    </Link>
  );
}
