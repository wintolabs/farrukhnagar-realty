// src/components/admin/AdminListingsGrid.tsx
"use client";

import { AdminPropertyCard } from "@/components/admin/AdminPropertyCard";
import { Lead } from "@/types/lead";
import { Property } from "@/types/property";
import { IconMoneybag } from "@tabler/icons-react";
import { Building2, Plus, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { Button } from "../ui/button";

interface AdminListingsGridProps {
  properties: Property[];
  leads: Lead[];
}

export function AdminListingsGrid({
  properties,
  leads,
}: AdminListingsGridProps) {
  // ✅ Calculate statistics
  const stats = useMemo(() => {
    const totalValue = properties.reduce((sum, p) => sum + p.price, 0);
    const availableCount = properties.filter(
      (p) => p.status === "Available"
    ).length;
    const soldCount = properties.filter((p) => p.status === "Sold").length;

    return {
      total: properties.length,
      totalValue,
      available: availableCount,
      sold: soldCount,
      totalLeads: leads.length,
    };
  }, [properties, leads]);

  // ✅ Lead count mapping
  const leadCountMap = useMemo(() => {
    const map = new Map<string, number>();
    leads.forEach((lead) => {
      map.set(lead.propertyId, (map.get(lead.propertyId) ?? 0) + 1);
    });
    return map;
  }, [leads]);

  return (
    <div className="space-y-8">
      {/* ✅ Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Properties</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Value</p>
              <p className="text-3xl font-bold text-gray-900">
                ₹{(stats.totalValue / 10000000).toFixed(1)}Cr
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-xl">
              <IconMoneybag className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Available</p>
              <p className="text-3xl font-bold text-emerald-600">
                {stats.available}
              </p>
              <p className="text-xs text-gray-500 mt-1">Sold: {stats.sold}</p>
            </div>
            <div className="p-3 bg-emerald-100 rounded-xl">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Leads</p>
              <p className="text-3xl font-bold text-purple-600">
                {stats.totalLeads}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-xl">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Properties Grid */}
      {properties.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-gray-200 shadow-sm text-center">
          <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No properties yet
          </h3>
          <p className="text-gray-600 mb-6">
            Get started by adding your first property listing.
          </p>
          <Link href="/admin/listings/create">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add First Property
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {properties.map((property) => (
            <AdminPropertyCard
              key={property.id}
              property={property}
              leadCount={leadCountMap.get(property.id) ?? 0}
            />
          ))}
        </div>
      )}
    </div>
  );
}
