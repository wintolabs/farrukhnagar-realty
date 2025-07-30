// src/types/lead.ts

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  propertyId: string;
  propertyTitle: string;
  budgetRange?: string;
  preferredContactMethod?: string;
  createdAt: string | null;
  status: LeadStatus;
}

export type NewLeadInput = Omit<Lead, "id" | "createdAt" | "status">;

export type LeadStatus = "New" | "Responded" | "Converted";
