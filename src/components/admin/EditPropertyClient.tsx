"use client";

import { Property } from "@/types/property";
import { updateProperty } from "@/lib/firestore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import PropertyForm from "@/components/forms/PropertyForm";

export default function EditPropertyClient({
  property,
}: {
  property: Property;
}) {
  const router = useRouter();

  const handleUpdate = async (updatedData: Omit<Property, "id">) => {
    try {
      await updateProperty(property.id!, updatedData);
      router.push("/admin");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update property.");
    }
  };

  return (
    <PropertyForm mode="edit" property={property} onSubmit={handleUpdate} />
  );
}
