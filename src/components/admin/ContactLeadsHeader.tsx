// src/components/admin/ContactLeadsHeader.tsx
"use client";

import { MessageSquare } from "lucide-react";

export function ContactLeadsHeader() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-blue-100 rounded-xl">
          <MessageSquare className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contact Us Leads</h1>
          <p className="text-gray-600 text-base">
            Manage and track all contact form inquiries
          </p>
        </div>
      </div>
    </div>
  );
}
