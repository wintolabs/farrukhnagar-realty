// src/components/admin/PropertyLeadsSection.tsx
import { Lead } from "@/types/lead";
import { format } from "date-fns";
import { Clock, Users } from "lucide-react";
import { useMemo } from "react";

interface PropertyLeadsSectionProps {
  leads: Lead[];
  propertyTitle: string;
}

export function PropertyLeadsSection({ leads }: PropertyLeadsSectionProps) {
  const stats = useMemo(() => {
    const newLeads = leads.filter((l) => (l.status || "New") === "New").length;
    const responded = leads.filter((l) => l.status === "Responded").length;
    const converted = leads.filter((l) => l.status === "Converted").length;

    return { total: leads.length, new: newLeads, responded, converted };
  }, [leads]);

  return (
    <div className="space-y-6">
      {/* Leads Stats */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Lead Statistics
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Total Inquiries</span>
            <span className="text-2xl font-bold text-gray-900">
              {stats.total}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">New</span>
              <span className="font-medium text-blue-600">{stats.new}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Responded</span>
              <span className="font-medium text-yellow-600">
                {stats.responded}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Converted</span>
              <span className="font-medium text-green-600">
                {stats.converted}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      {leads.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Recent Activity
          </h3>

          <div className="space-y-3">
            {leads.slice(0, 3).map((lead) => (
              <div
                key={lead.id}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {lead.name}
                  </p>
                  <p className="text-xs text-gray-600">
                    {lead.createdAt
                      ? format(new Date(lead.createdAt), "MMM dd, yyyy")
                      : "Recent"}
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    lead.status === "Converted"
                      ? "bg-green-100 text-green-800"
                      : lead.status === "Responded"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {lead.status || "New"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
