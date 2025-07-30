// types/property.ts

export interface Property {
  id: string; // always present when used in app
  title: string;
  price: number;
  location: string;
  area: string;
  type: "Residential" | "Commercial" | "Plot" | "Agricultural";
  status: "Available" | "Sold";
  tags: string[];
  description: string;
  images: string[];
  createdAt: string;
  updatedAt?: string | null;
  isSold?: boolean;
  isDeleted?: boolean;
}

// Use for creating a new property (e.g. form input)
export type NewPropertyInput = Omit<
  Property,
  "id" | "createdAt" | "updatedAt" | "isSold" | "isDeleted"
>;

// Use for updating a property (you don’t need to include `id`)
export type UpdatePropertyInput = Omit<Property, "id" | "createdAt">;
