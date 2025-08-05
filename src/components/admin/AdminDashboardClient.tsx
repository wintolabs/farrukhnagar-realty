// src/components/admin/AdminDashboardClient.tsx
"use client";

import { Property } from "@/types/property";
import { Plus, TrendingUp, Building, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AdminPropertyCard } from "./AdminPropertyCard";
import { DeletePropertyDialog } from "./DeletePropertyDialog";

export default function AdminDashboardClient({
  properties,
  leadCountMap,
}: {
  properties: Property[];
  leadCountMap: Map<string, number>;
}) {
  const total = properties.length;
  const sold = properties.filter((p) => p.status === "Sold").length;
  const available = total - sold;
  const totalLeads = Array.from(leadCountMap.values()).reduce(
    (sum, count) => sum + count,
    0
  );

  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    title: string;
  } | null>(null);

  return (
    <div className="relative min-h-screen bg-white">
      <main className="p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                Manage your properties and track performance
              </p>
            </div>
            <Link
              href="/admin/listings/create"
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 font-medium"
            >
              <Plus size={20} />
              <span>Add Property</span>
            </Link>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            label="Total Properties"
            value={total}
            icon={<Building className="h-6 w-6" />}
            color="bg-gradient-to-br from-blue-500 to-blue-600"
            bgColor="bg-blue-50 dark:bg-blue-900/20"
          />
          <StatCard
            label="Available"
            value={available}
            icon={<TrendingUp className="h-6 w-6" />}
            color="bg-gradient-to-br from-green-500 to-green-600"
            bgColor="bg-green-50 dark:bg-green-900/20"
          />
          <StatCard
            label="Sold"
            value={sold}
            icon={<CheckCircle className="h-6 w-6" />}
            color="bg-gradient-to-br from-purple-500 to-purple-600"
            bgColor="bg-purple-50 dark:bg-purple-900/20"
          />
          <StatCard
            label="Total Leads"
            value={totalLeads}
            icon={<TrendingUp className="h-6 w-6" />}
            color="bg-gradient-to-br from-orange-500 to-orange-600"
            bgColor="bg-orange-50 dark:bg-orange-900/20"
          />
        </div>

        {/* Properties Section */}
        <div className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-white/40 dark:border-slate-700/60 shadow-xl p-6 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              All Properties
            </h2>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              {properties.length}{" "}
              {properties.length === 1 ? "property" : "properties"}
            </div>
          </div>

          {properties.length === 0 ? (
            <div className="text-center py-12">
              <Building className="h-16 w-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                No properties yet
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6">
                Get started by adding your first property listing
              </p>
              <Link
                href="/admin/listings/create"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300"
              >
                <Plus size={20} />
                Add First Property
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

        {deleteTarget && (
          <DeletePropertyDialog
            id={deleteTarget.id}
            title={deleteTarget.title}
            onClose={() => setDeleteTarget(null)}
          />
        )}
      </main>

      {/* Mobile FAB */}
      <Link
        href="/admin/listings/create"
        className="sm:hidden fixed bottom-6 right-6 flex items-center justify-center w-14 h-14 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      >
        <Plus size={24} />
      </Link>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  color,
  bgColor,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}) {
  return (
    <div
      className={`${bgColor} backdrop-blur-sm p-6 rounded-2xl border border-white/40 dark:border-slate-700/60 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`${color} text-white p-3 rounded-xl shadow-lg`}>
          {icon}
        </div>
      </div>
      <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-1">
        {value.toLocaleString()}
      </div>
      <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
        {label}
      </div>
    </div>
  );
}
