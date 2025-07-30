// app/listings/page.tsx

import { PropertyGrid } from "@/components/home/PropertyGrid";
import { getAllProperties } from "@/lib/firestore";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Listings | Farrukhnagar Realty",
  description: "Explore our handpicked real estate properties for sale.",
};

export default async function ListingsPage() {
  const properties = await getAllProperties();

  return <PropertyGrid properties={properties} />;
}
