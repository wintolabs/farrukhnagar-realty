"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { Property } from "@/types/property";

type PropertyFormProps = {
  mode: "create" | "edit";
  property?: Property;
  onSubmit?: (data: Omit<Property, "id">) => Promise<void>;
};

export default function PropertyForm({
  mode,
  property,
  onSubmit,
}: PropertyFormProps) {
  const router = useRouter();
  const [uploadedUrls, setUploadedUrls] = useState<string[]>(
    property?.images || []
  );

  const [formData, setFormData] = useState({
    title: property?.title || "",
    price: property?.price.toString() || "",
    location: property?.location || "",
    area: property?.area || "",
    type: property?.type || "Residential",
    status: property?.status || "Available",
    tags: property?.tags.join(", ") || "",
    description: property?.description || "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.price || !formData.location) {
      toast.error(
        "Please fill all required fields and upload at least one image."
      );
      return;
    }

    const payload: Omit<Property, "id"> = {
      title: formData.title,
      price: Number(formData.price),
      location: formData.location,
      area: formData.area,
      type: formData.type as Property["type"],
      status: formData.status as Property["status"],
      tags: formData.tags.split(",").map((t) => t.trim()),
      description: formData.description,
      images: uploadedUrls,
      createdAt: property?.createdAt || new Date().toISOString(),
      isSold: formData.status === "Sold",
    };

    try {
      if (onSubmit) {
        await onSubmit(payload);
        toast.success(
          mode === "edit" ? "Property updated!" : "Property added!"
        );
      }

      router.push("/admin");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Property Title"
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price (₹)"
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <input
          name="area"
          value={formData.area}
          onChange={handleChange}
          placeholder="Area (e.g., 200 sq. yd)"
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
        >
          <option>Residential</option>
          <option>Commercial</option>
          <option>Plot</option>
          <option>Agricultural</option>
        </select>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
        >
          <option>Available</option>
          <option>Sold</option>
        </select>
      </div>

      <input
        name="tags"
        value={formData.tags}
        onChange={handleChange}
        placeholder="Tags (comma-separated)"
        className="w-full p-3 border border-gray-300 rounded-md"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        rows={4}
        className="w-full p-3 border border-gray-300 rounded-md"
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload Images
        </label>
        <ImageUploadField value={uploadedUrls} onChange={setUploadedUrls} />
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-900 transition"
      >
        {mode === "edit" ? "Update Property" : "Submit Property"}
      </button>
    </form>
  );
}
