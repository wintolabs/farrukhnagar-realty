"use client";
import { useState, useTransition } from "react";
import { format } from "date-fns";
import { updateContactLeadStatus } from "@/lib/firestore";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { ContactLead, ContactLeadStatus } from "@/types/contactLead";

export function ContactLeadsTable({ leads }: { leads: ContactLead[] }) {
  const [selectedLead, setSelectedLead] = useState<ContactLead | null>(null);
  const [pending, startTransition] = useTransition();

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

  return (
    <div className="overflow-x-auto border rounded">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-800 border-b">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Status</th>
            <th className="p-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr
              key={lead.id}
              className="border-t hover:bg-gray-50 cursor-pointer"
              onClick={() => setSelectedLead(lead)}
            >
              <td className="p-3">{lead.name}</td>
              <td className="p-3">{lead.email}</td>
              <td className="p-3">{lead.phone}</td>
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
              <td className="p-3">
                {lead.createdAt
                  ? format(new Date(lead.createdAt), "dd MMM yyyy HH:mm")
                  : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Lead Details</DialogTitle>
            <DialogDescription>
              Detailed information about this inquiry.
            </DialogDescription>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-3 text-sm text-gray-800">
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
                    const newStatus = e.target.value as ContactLeadStatus;
                    startTransition(async () => {
                      await updateContactLeadStatus(selectedLead.id, newStatus);
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
              <div>
                <strong>Name:</strong> {selectedLead.name}
              </div>
              <div>
                <strong>Email:</strong> {selectedLead.email}
              </div>
              <div>
                <strong>Phone:</strong> {selectedLead.phone}
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
                  {selectedLead.message}
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
  );
}
