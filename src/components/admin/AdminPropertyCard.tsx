"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { markPropertyAsSold } from "@/lib/firestore";
import { Property } from "@/types/property";
import { CheckCircle, MoreVertical, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { DeletePropertyDialog } from "./DeletePropertyDialog";

export function AdminPropertyCard({
  property,
  leadCount,
}: {
  property: Property;
  leadCount: number;
}) {
  const router = useRouter();
  const [deleteTarget, setDeleteTarget] = useState(false);

  return (
    <div
      className="relative border rounded shadow-sm overflow-hidden group cursor-pointer hover:shadow-md hover:ring-2 ring-black/10 transition"
      onClick={() => router.push(`/admin/listings/${property.id}`)}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${property.title}`}
    >
      {/* 3-dot menu */}
      <div className="absolute top-2 right-2 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="p-1 bg-white rounded-full shadow hover:bg-gray-100 transition"
              onClick={(e) => e.stopPropagation()}
              tabIndex={0}
            >
              <MoreVertical size={18} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/admin/listings/edit/${property.id}`);
              }}
              className="cursor-pointer flex items-center space-x-2"
            >
              <Pencil className="h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
            {property.status !== "Sold" && (
              <DropdownMenuItem
                onClick={async (e) => {
                  e.stopPropagation();
                  await markPropertyAsSold(property.id!);
                  toast.success("Property marked as Sold");
                  router.refresh();
                }}
                className="cursor-pointer flex items-center space-x-2"
              >
                <CheckCircle className="h-4 w-4" />
                <span>Mark as Sold</span>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                setDeleteTarget(true);
              }}
              className="text-red-600 focus:bg-red-50 flex items-center space-x-2 cursor-pointer"
            >
              <Trash2 className="w-4 h-4 text-red-600 stroke-2" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Main Image */}
      {property.images?.[0] && (
        <Image
          src={property.images[0]}
          alt={property.title}
          width={640}
          height={480}
          className="w-full h-40 object-cover"
          sizes="(min-width: 768px) 384px, 100vw"
        />
      )}

      {/* Details */}
      <div className="p-4">
        <h3 className="font-semibold text-lg">{property.title}</h3>
        <p className="text-sm text-gray-500">
          ₹{property.price.toLocaleString()} – {property.location}
        </p>
        <span
          className={`inline-block text-xs font-semibold px-2 py-1 mt-1 rounded ${
            property.status === "Sold"
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {property.status}
        </span>
      </div>

      {/* Lead Count */}
      <div className="flex items-center gap-2 mt-2">
        <span
          className={`inline-block text-sm px-2 py-0.5  ${
            leadCount > 0
              ? "bg-blue-100 text-blue-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {leadCount} {leadCount === 1 ? "lead" : "leads"}
        </span>
      </div>

      {deleteTarget && (
        <DeletePropertyDialog
          id={property.id!}
          title={property.title}
          onClose={() => setDeleteTarget(false)}
        />
      )}
    </div>
  );
}
