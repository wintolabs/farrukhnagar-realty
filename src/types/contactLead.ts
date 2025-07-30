export type ContactLeadStatus = "New" | "Responded" | "Converted";

export interface ContactLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt?: string | null;
  status?: ContactLeadStatus;
}
