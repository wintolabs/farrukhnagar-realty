// src/components/admin/AdminListingsHeader.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export function AdminListingsHeader() {
  return (
    <div className="mb-8">
      {/* Header with Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Property Listings
          </h1>
          <p className="text-gray-600 text-base">
            Manage all your property listings and track performance
          </p>
        </div>

        <Link href="/admin/listings/create">
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 shrink-0">
            <Plus className="w-5 h-5" />
            Add New Listing
          </Button>
        </Link>
      </div>
    </div>
  );
}
