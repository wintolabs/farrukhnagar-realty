"use client";

import { useState, useTransition } from "react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { updateLeadStatus } from "@/lib/firestore";
import { toast } from "sonner";
import { Search } from "lucide-react";

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

export function LeadsTable({ leads }: { leads: Lead[] }) {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const [filter, setFilter] = useState("");

  const uniqueProperties = Array.from(
    new Set(leads.map((l) => l.propertyTitle))
  );

  const [search, setSearch] = useState("");

  const filteredLeads = leads.filter((lead) => {
    // Property dropdown
    const matchesProperty = filter ? lead.propertyTitle === filter : true;

    // Search bar (case-insensitive, matches name/email/phone partial)
    const query = search.trim().toLowerCase();
    const matchesSearch =
      !query ||
      lead.name.toLowerCase().includes(query) ||
      lead.email.toLowerCase().includes(query) ||
      (lead.phone ?? "").toLowerCase().includes(query);

    return matchesProperty && matchesSearch;
  });

  const STATUS_OPTIONS = [
    { value: "New", label: "New", color: "bg-gray-200 text-gray-700" },
    {
      value: "Responded",
      label: "Responded",
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      value: "Converted",
      label: "Converted",
      color: "bg-green-100 text-green-700",
    },
  ];

  const [pending, startTransition] = useTransition();

  return (
    <>
      {/* FILTER + SEARCH ROW */}
      <div className="flex flex-wrap items-end gap-4 mb-6">
        {uniqueProperties.length > 1 && (
          <div>
            <label className="block text-xs font-semibold mb-1 text-gray-700">
              Property
            </label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition w-48"
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

        <div>
          <label className="block text-xs font-semibold mb-1 text-gray-700">
            Search
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search name, email, phone…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition w-64"
            />
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {filteredLeads.length === 0 ? (
        <p className="text-gray-600">No leads found for selected property.</p>
      ) : (
        <div className="overflow-x-auto border rounded">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-800 border-b">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Property</th>
                <th className="p-3">Budget</th>
                <th className="p-3">Preferred Contact</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-t hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedLead(lead)}
                >
                  <td className="p-3">{lead.name}</td>
                  <td className="p-3">
                    <span
                      className={`inline-block text-xs font-semibold px-2 py-1 rounded
                        ${
                          lead.status === "Converted"
                            ? "bg-green-100 text-green-700"
                            : lead.status === "Responded"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-200 text-gray-700"
                        }
                      `}
                    >
                      {lead.status || "New"}
                    </span>
                  </td>

                  <td className="p-3">{lead.email}</td>
                  <td className="p-3">{lead.phone || "—"}</td>
                  <td className="p-3">
                    <a
                      href={`/listings/${lead.propertyId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      {lead.propertyTitle}
                    </a>
                  </td>

                  <td className="p-3">{lead.budgetRange || "—"}</td>
                  <td className="p-3">{lead.preferredContactMethod || "—"}</td>
                  <td className="p-3">
                    {lead.createdAt
                      ? format(new Date(lead.createdAt), "dd MMM yyyy HH:mm")
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Dialog
            open={!!selectedLead}
            onOpenChange={() => setSelectedLead(null)}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Lead Details</DialogTitle>
                <DialogDescription>
                  Detailed information about this inquiry.
                </DialogDescription>
              </DialogHeader>
              {selectedLead && (
                <div className="space-y-3 text-sm text-gray-800">
                  {/* STATUS BADGE + DROPDOWN */}
                  <div>
                    <label className="block text-xs font-medium mb-1">
                      Status:
                    </label>
                    <span
                      className={`inline-block text-xs font-semibold px-2 py-1 rounded mr-3
                      ${
                        STATUS_OPTIONS.find(
                          (o) => o.value === (selectedLead.status || "New")
                        )?.color
                      }`}
                    >
                      {selectedLead.status || "New"}
                    </span>
                    <select
                      value={selectedLead.status || "New"}
                      onChange={(e) => {
                        const newStatus = e.target.value as LeadStatus;
                        startTransition(async () => {
                          await updateLeadStatus(selectedLead.id, newStatus);
                          setSelectedLead({
                            ...selectedLead,
                            status: newStatus,
                          });
                          toast.success("Lead status updated!");
                        });
                      }}
                      disabled={pending}
                      className="border rounded px-3 py-1 text-sm"
                    >
                      {STATUS_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* REST OF DETAILS... */}
                  <div>
                    <strong>Name:</strong> {selectedLead.name}
                  </div>
                  <div>
                    <strong>Email:</strong> {selectedLead.email}
                  </div>
                  <div>
                    <strong>Phone:</strong> {selectedLead.phone || "—"}
                  </div>
                  <div>
                    <strong>Property:</strong>{" "}
                    <a
                      href={`/listings/${selectedLead.propertyId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      {selectedLead.propertyTitle}
                    </a>
                  </div>
                  <div>
                    <strong>Budget Range:</strong>{" "}
                    {selectedLead.budgetRange || "—"}
                  </div>
                  <div>
                    <strong>Preferred Contact:</strong>{" "}
                    {selectedLead.preferredContactMethod || "—"}
                  </div>
                  <div>
                    <strong>Date:</strong>{" "}
                    {selectedLead.createdAt
                      ? format(
                          new Date(selectedLead.createdAt),
                          "dd MMM yyyy HH:mm"
                        )
                      : "—"}
                  </div>
                  <div>
                    <strong>Message:</strong>
                    <div className="mt-1 bg-gray-100 rounded p-2">
                      {selectedLead.message || "—"}
                    </div>
                  </div>
                </div>
              )}
              <DialogClose asChild>
                <button className="mt-6 w-full bg-black text-white px-4 py-2 rounded">
                  Close
                </button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </>
  );
}
