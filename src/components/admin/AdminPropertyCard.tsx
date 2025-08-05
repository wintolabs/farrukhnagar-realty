// src/components/admin/AdminPropertyCard.tsx

"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { markPropertyAsSold } from "@/lib/firestore";
import { Property } from "@/types/property";
import {
  CheckCircle,
  MoreVertical,
  Pencil,
  Trash2,
  MapPin,
  Users,
  IndianRupee,
  Building,
} from "lucide-react";
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
      className="relative bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-white/40 dark:border-slate-700/60 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group cursor-pointer"
      onClick={() => router.push(`/admin/listings/${property.id}`)}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${property.title}`}
    >
      {/* Status Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
            property.status === "Sold"
              ? "bg-red-100/90 text-red-800 border border-red-200/50"
              : "bg-green-100/90 text-green-800 border border-green-200/50"
          }`}
        >
          {property.status}
        </span>
      </div>

      {/* 3-dot menu */}
      <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="p-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white dark:hover:bg-slate-800 transition-all duration-200 border border-white/40"
              onClick={(e) => e.stopPropagation()}
              tabIndex={0}
            >
              <MoreVertical size={16} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border border-white/40 dark:border-slate-700/60"
          >
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/admin/listings/edit/${property.id}`);
              }}
              className="cursor-pointer flex items-center space-x-3 px-3 py-2"
            >
              <Pencil className="h-4 w-4 text-blue-600" />
              <span>Edit Property</span>
            </DropdownMenuItem>
            {property.status !== "Sold" && (
              <DropdownMenuItem
                onClick={async (e) => {
                  e.stopPropagation();
                  await markPropertyAsSold(property.id!);
                  toast.success("Property marked as Sold");
                  router.refresh();
                }}
                className="cursor-pointer flex items-center space-x-3 px-3 py-2"
              >
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Mark as Sold</span>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                setDeleteTarget(true);
              }}
              className="text-red-600 focus:bg-red-50 dark:focus:bg-red-900/20 flex items-center space-x-3 cursor-pointer px-3 py-2"
            >
              <Trash2 className="w-4 h-4 text-red-600" />
              <span>Delete Property</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* ✅ Fixed Main Image - Shows Full Image Without Cropping */}
      {property.images?.[0] ? (
        <div className="relative h-48 bg-gray-100 dark:bg-slate-700 overflow-hidden">
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            sizes="(min-width: 1280px) 384px, (min-width: 768px) 50vw, 100vw"
          />
          {/* Optional: Keep gradient overlay but make it subtle */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
          <Building className="h-12 w-12 text-slate-400 dark:text-slate-500" />
        </div>
      )}

      {/* Content - Keep existing styling */}
      <div className="p-6">
        <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 mb-2 line-clamp-1">
          {property.title}
        </h3>

        <div className="flex items-center text-slate-600 dark:text-slate-400 mb-3">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="text-sm line-clamp-1">{property.location}</span>
        </div>

        <div className="flex items-center text-slate-900 dark:text-slate-100 mb-4">
          <IndianRupee className="h-5 w-5 mr-1" />
          <span className="text-xl font-bold">
            {property.price.toLocaleString()}
          </span>
        </div>

        {/* Lead Count */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center">
            <Users className="h-4 w-4 text-slate-500 mr-2" />
            <span
              className={`text-sm font-medium ${
                leadCount > 0
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            >
              {leadCount} {leadCount === 1 ? "lead" : "leads"}
            </span>
          </div>

          {leadCount > 0 && (
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          )}
        </div>
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
