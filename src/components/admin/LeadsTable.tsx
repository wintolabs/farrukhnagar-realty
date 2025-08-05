"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { updateLeadStatus } from "@/lib/firestore";
import { format, isToday, isYesterday } from "date-fns";
import {
  Clock,
  ExternalLink,
  Loader2,
  Mail,
  Phone,
  Search,
  TrendingUp,
  Users,
} from "lucide-react";
import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";

type LeadStatus = "New" | "Responded" | "Converted";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  propertyId: string;
  propertyTitle: string;
  budgetRange?: string;
  preferredContactMethod?: string;
  createdAt?: string | null;
  status?: LeadStatus;
}

const STATUS_CONFIG = {
  New: {
    label: "New",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: "🆕",
  },
  Responded: {
    label: "Responded",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: "💬",
  },
  Converted: {
    label: "Converted",
    color: "bg-green-100 text-green-800 border-green-200",
    icon: "✅",
  },
};

export function LeadsTable({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "All">("All");
  const [search, setSearch] = useState("");
  const [, startTransition] = useTransition();
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  // Enhanced filtering with memoization
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesProperty = filter ? lead.propertyTitle === filter : true;
      const matchesStatus =
        statusFilter === "All" ? true : (lead.status || "New") === statusFilter;

      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        [
          lead.name,
          lead.email,
          lead.phone || "",
          lead.propertyTitle,
          lead.budgetRange || "",
        ].some((field) => field.toLowerCase().includes(query));

      return matchesProperty && matchesStatus && matchesSearch;
    });
  }, [leads, filter, statusFilter, search]);

  const uniqueProperties = Array.from(
    new Set(leads.map((l) => l.propertyTitle))
  );

  // Statistics
  const stats = useMemo(() => {
    return {
      total: leads.length,
      new: leads.filter((l) => (l.status || "New") === "New").length,
      responded: leads.filter((l) => l.status === "Responded").length,
      converted: leads.filter((l) => l.status === "Converted").length,
    };
  }, [leads]);

  const handleStatusUpdate = async (leadId: string, newStatus: LeadStatus) => {
    setUpdatingStatus(leadId);

    startTransition(async () => {
      try {
        await updateLeadStatus(leadId, newStatus);

        // Update local state
        setLeads((prev) =>
          prev.map((lead) =>
            lead.id === leadId ? { ...lead, status: newStatus } : lead
          )
        );

        if (selectedLead?.id === leadId) {
          setSelectedLead((prev) =>
            prev ? { ...prev, status: newStatus } : null
          );
        }

        toast.success(`Lead status updated to ${newStatus}!`);
      } catch {
        toast.error("Failed to update lead status");
      } finally {
        setUpdatingStatus(null);
      }
    });
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "—";

    const date = new Date(dateString);
    if (isToday(date)) return `Today ${format(date, "HH:mm")}`;
    if (isYesterday(date)) return `Yesterday ${format(date, "HH:mm")}`;
    return format(date, "MMM dd, yyyy HH:mm");
  };

  const getQuickActions = (lead: Lead) => (
    <div className="flex gap-2">
      <Button
        size="sm"
        variant="outline"
        onClick={(e) => {
          e.stopPropagation();
          window.open(`mailto:${lead.email}`);
        }}
        className="h-8 px-2"
      >
        <Mail className="w-3 h-3" />
      </Button>
      {lead.phone && (
        <Button
          size="sm"
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            window.open(`tel:${lead.phone}`);
          }}
          className="h-8 px-2"
        >
          <Phone className="w-3 h-3" />
        </Button>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Leads</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">New</p>
              <p className="text-2xl font-bold text-blue-600">{stats.new}</p>
            </div>
            <div className="text-2xl">🆕</div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Responded</p>
              <p className="text-2xl font-bold text-yellow-600">
                {stats.responded}
              </p>
            </div>
            <div className="text-2xl">💬</div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Converted</p>
              <p className="text-2xl font-bold text-green-600">
                {stats.converted}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Enhanced Filters */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search leads by name, email, phone, or property..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="min-w-[140px]">
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as LeadStatus | "All")
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="All">All Status</option>
              <option value="New">New</option>
              <option value="Responded">Responded</option>
              <option value="Converted">Converted</option>
            </select>
          </div>

          {/* Property Filter */}
          {uniqueProperties.length > 1 && (
            <div className="min-w-[200px]">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">All Properties</option>
                {uniqueProperties.map((title) => (
                  <option key={title} value={title}>
                    {title}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Table */}
      {filteredLeads.length === 0 ? (
        <div className="bg-white rounded-lg border p-12 text-center">
          <div className="text-gray-400 mb-4">
            <Users className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No leads found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full table-fixed">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lead Info
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Property
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedLead(lead)}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">
                          {lead.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {lead.email}
                        </div>
                        {lead.phone && (
                          <div className="text-sm text-gray-600">
                            {lead.phone}
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Badge
                          className={`${STATUS_CONFIG[lead.status || "New"].color} border`}
                        >
                          <span className="mr-1">
                            {STATUS_CONFIG[lead.status || "New"].icon}
                          </span>
                          {STATUS_CONFIG[lead.status || "New"].label}
                        </Badge>
                        {updatingStatus === lead.id && (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <Button
                        variant="link"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(
                            `/admin/listings/${lead.propertyId}`,
                            "_blank"
                          );
                        }}
                        className="p-0 h-auto text-blue-600 hover:text-blue-800"
                      >
                        {lead.propertyTitle}
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </Button>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {lead.budgetRange || "—"}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatDate(lead.createdAt ?? null)}
                      </div>
                    </td>

                    <td className="px-6 py-4">{getQuickActions(lead)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Enhanced Dialog */}
      <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Lead Details
              {selectedLead && (
                <Badge
                  className={STATUS_CONFIG[selectedLead.status || "New"].color}
                >
                  {STATUS_CONFIG[selectedLead.status || "New"].icon}
                  {STATUS_CONFIG[selectedLead.status || "New"].label}
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>

          {selectedLead && (
            <div className="space-y-6">
              {/* Status Update - Keep as is */}
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Update Status:
                </label>
                <div className="flex gap-2">
                  {Object.entries(STATUS_CONFIG).map(([status, config]) => (
                    <Button
                      key={status}
                      size="sm"
                      variant={
                        selectedLead.status === status ? "default" : "outline"
                      }
                      onClick={() =>
                        handleStatusUpdate(
                          selectedLead.id,
                          status as LeadStatus
                        )
                      }
                      disabled={updatingStatus === selectedLead.id}
                      className="flex items-center gap-1"
                    >
                      <span>{config.icon}</span>
                      {config.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* ✅ Fixed: Single Grid Layout for All Information */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 text-lg border-b pb-2">
                  Lead Information
                </h4>

                {/* ✅ Grid container with proper column constraints */}
                <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-4">
                  {/* Contact Information */}
                  <div className="font-medium text-gray-700 whitespace-nowrap">
                    Name
                  </div>
                  <div className="text-gray-900">{selectedLead.name}</div>

                  <div className="font-medium text-gray-700 whitespace-nowrap">
                    Email
                  </div>
                  <div className="text-gray-900 break-words flex items-center gap-2">
                    <span className="break-all">{selectedLead.email}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        window.open(`mailto:${selectedLead.email}`)
                      }
                      className="flex-shrink-0"
                    >
                      <Mail className="w-3 h-3" />
                    </Button>
                  </div>

                  {selectedLead.phone && (
                    <>
                      <div className="font-medium text-gray-700 whitespace-nowrap">
                        Phone
                      </div>
                      <div className="text-gray-900 flex items-center gap-2">
                        <span>{selectedLead.phone}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            window.open(`tel:${selectedLead.phone}`)
                          }
                          className="flex-shrink-0"
                        >
                          <Phone className="w-3 h-3" />
                        </Button>
                      </div>
                    </>
                  )}

                  {/* Property Information */}
                  <div className="font-medium text-gray-700 whitespace-nowrap">
                    Property
                  </div>
                  <div className="text-gray-900">
                    <Button
                      variant="link"
                      size="sm"
                      onClick={() =>
                        window.open(
                          `/admin/listings/${selectedLead.propertyId}`,
                          "_blank"
                        )
                      }
                      className="p-0 h-auto font-medium text-blue-600 hover:text-blue-800"
                    >
                      <span className="break-words">
                        {selectedLead.propertyTitle}
                      </span>
                      <ExternalLink className="w-3 h-3 ml-1 flex-shrink-0" />
                    </Button>
                  </div>

                  <div className="font-medium text-gray-700 whitespace-nowrap">
                    Budget Range
                  </div>
                  <div className="text-gray-900">
                    {selectedLead.budgetRange || "Not specified"}
                  </div>

                  <div className="font-medium text-gray-700 whitespace-nowrap">
                    Contact Method
                  </div>
                  <div className="text-gray-900">
                    {selectedLead.preferredContactMethod || "Not specified"}
                  </div>

                  <div className="font-medium text-gray-700 whitespace-nowrap">
                    Inquiry Date
                  </div>
                  <div className="text-gray-900">
                    {formatDate(selectedLead.createdAt ?? null)}
                  </div>
                </div>
              </div>

              {/* Message Section - Keep separate for better readability */}
              {selectedLead.message && (
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900 text-lg border-b pb-2">
                    Message
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
                      {selectedLead.message}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
