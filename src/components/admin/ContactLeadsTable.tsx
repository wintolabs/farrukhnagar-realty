// src/components/admin/ContactLeadsTable.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { updateContactLeadStatus } from "@/lib/firestore";
import { ContactLead, ContactLeadStatus } from "@/types/contactLead";
import { format, isToday, isYesterday } from "date-fns";
import {
  Clock,
  Loader2,
  Mail,
  MessageCircle,
  Phone,
  Search,
  TrendingUp,
} from "lucide-react";
import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";

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

interface ContactLeadsTableProps {
  initialLeads: ContactLead[];
}

export function ContactLeadsTable({ initialLeads }: ContactLeadsTableProps) {
  const [leads, setLeads] = useState<ContactLead[]>(initialLeads);
  const [selectedLead, setSelectedLead] = useState<ContactLead | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ContactLeadStatus | "All">(
    "All"
  );
  const [, startTransition] = useTransition();
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  // Statistics
  const stats = useMemo(() => {
    return {
      total: leads.length,
      new: leads.filter((l) => (l.status || "New") === "New").length,
      responded: leads.filter((l) => l.status === "Responded").length,
      converted: leads.filter((l) => l.status === "Converted").length,
    };
  }, [leads]);

  // Filtered leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesStatus =
        statusFilter === "All" ? true : (lead.status || "New") === statusFilter;

      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        [lead.name, lead.email, lead.phone || "", lead.message || ""].some(
          (field) => field.toLowerCase().includes(query)
        );

      return matchesStatus && matchesSearch;
    });
  }, [leads, statusFilter, search]);

  const handleStatusUpdate = async (
    leadId: string,
    newStatus: ContactLeadStatus
  ) => {
    setUpdatingStatus(leadId);

    startTransition(async () => {
      try {
        await updateContactLeadStatus(leadId, newStatus);

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

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "—";

    const date = new Date(dateString);
    if (isToday(date)) return `Today ${format(date, "HH:mm")}`;
    if (isYesterday(date)) return `Yesterday ${format(date, "HH:mm")}`;
    return format(date, "MMM dd, yyyy HH:mm");
  };

  const getQuickActions = (lead: ContactLead) => (
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Inquiries</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <MessageCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">New</p>
              <p className="text-3xl font-bold text-blue-600">{stats.new}</p>
            </div>
            <div className="text-3xl">🆕</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Responded</p>
              <p className="text-3xl font-bold text-yellow-600">
                {stats.responded}
              </p>
            </div>
            <div className="text-3xl">💬</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Converted</p>
              <p className="text-3xl font-bold text-green-600">
                {stats.converted}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-xl">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search contacts by name, email, phone, or message..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="min-w-[140px]">
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as ContactLeadStatus | "All")
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="All">All Status</option>
              <option value="New">New</option>
              <option value="Responded">Responded</option>
              <option value="Converted">Converted</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredLeads.length} of {leads.length} inquiries
        </div>
      </div>

      {/* Enhanced Table */}
      {filteredLeads.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-gray-200 shadow-sm text-center">
          <div className="text-gray-400 mb-4">
            <MessageCircle className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No inquiries found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact Info
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message
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
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {lead.message || "No message"}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatDate(lead.createdAt)}
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
              Contact Inquiry Details
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
              {/* Status Update */}
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
                          status as ContactLeadStatus
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

              {/* Contact Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">
                    Contact Information
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-600">Name</label>
                      <p className="font-medium">{selectedLead.name}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Email</label>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{selectedLead.email}</p>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            window.open(`mailto:${selectedLead.email}`)
                          }
                        >
                          <Mail className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    {selectedLead.phone && (
                      <div>
                        <label className="text-sm text-gray-600">Phone</label>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{selectedLead.phone}</p>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              window.open(`tel:${selectedLead.phone}`)
                            }
                          >
                            <Phone className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Inquiry Details</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-600">
                        Inquiry Date
                      </label>
                      <p className="font-medium">
                        {formatDate(selectedLead.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-900 whitespace-pre-wrap">
                    {selectedLead.message || "No message provided"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
