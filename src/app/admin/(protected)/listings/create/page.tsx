// src/app/admin/(protected)/listings/create/page.tsx
"use client";

import { addProperty } from "@/lib/firestore";
import PropertyForm from "@/components/forms/PropertyForm";
import { Property } from "@/types/property";

export default function CreatePropertyPage() {
  const handleCreate = async (data: Omit<Property, "id">) => {
    await addProperty(data);
  };

  return (
    <main className="min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <PropertyForm mode="create" onSubmit={handleCreate} />
      </div>
    </main>
  );
}
