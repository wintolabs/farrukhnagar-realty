// src/components/forms/PropertyForm.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { Property } from "@/types/property";
import { AlertCircle, Check, X } from "lucide-react";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [allUploadedImages, setAllUploadedImages] = useState<string[]>([]); // Track all uploaded images

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

  // Clear draft and uploaded images on mount for create mode
  useEffect(() => {
    if (mode === "create") {
      const draftKey = "property-draft";
      localStorage.removeItem(draftKey);
    }
  }, [mode]);

  // Track all uploaded images for cleanup
  const handleImageChange = (urls: string[]) => {
    setUploadedUrls(urls);
    // Keep track of all images that were uploaded during this session
    setAllUploadedImages((prev) => [...new Set([...prev, ...urls])]);

    // Clear validation error for images
    if (validationErrors.images) {
      setValidationErrors((prev) => ({ ...prev, images: "" }));
    }
  };

  // Handle image deletion callback
  const handleImageDeleted = (deletedUrl: string) => {
    // Remove from tracking
    setAllUploadedImages((prev) => prev.filter((url) => url !== deletedUrl));
  };

  // Delete all uploaded images from storage
  const deleteAllUploadedImages = async () => {
    const imagesToDelete = allUploadedImages.filter(
      (url) => !property?.images?.includes(url)
    );

    for (const url of imagesToDelete) {
      try {
        const fileKey = url.split("/").pop();
        if (fileKey) {
          await fetch("/api/uploadthing/delete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fileKey }),
          });
        }
      } catch (error) {
        console.error("Error deleting image:", url, error);
      }
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.title.trim()) {
      errors.title = "Property title is required";
    }

    if (!formData.price || Number(formData.price) <= 0) {
      errors.price = "Valid price is required";
    }

    if (!formData.location.trim()) {
      errors.location = "Location is required";
    }

    if (!formData.area.trim()) {
      errors.area = "Area is required";
    }

    if (uploadedUrls.length === 0) {
      errors.images = "At least one image is required";
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors below");
      return;
    }

    setIsSubmitting(true);

    const payload: Omit<Property, "id"> = {
      title: formData.title.trim(),
      price: Number(formData.price),
      location: formData.location.trim(),
      area: formData.area.trim(),
      type: formData.type as Property["type"],
      status: formData.status as Property["status"],
      tags: formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      description: formData.description.trim(),
      images: uploadedUrls,
      createdAt: property?.createdAt || new Date().toISOString(),
      isSold: formData.status === "Sold",
    };

    try {
      if (onSubmit) {
        await onSubmit(payload);
        toast.success(
          mode === "edit"
            ? "Property updated successfully!"
            : "Property created successfully!"
        );
      }

      router.push("/admin");
    } catch (err) {
      console.error("Form submission error:", err);
      toast.error("Failed to save property. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = async () => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel? All changes and uploaded images will be lost."
    );

    if (confirmCancel) {
      // Delete all uploaded images
      await deleteAllUploadedImages();

      // Clear form data
      setFormData({
        title: "",
        price: "",
        location: "",
        area: "",
        type: "Residential",
        status: "Available",
        tags: "",
        description: "",
      });
      setUploadedUrls([]);
      setAllUploadedImages([]);

      toast.success("Changes discarded and images cleaned up");
      router.push("/admin");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {mode === "edit" ? "Edit Property" : "Create New Property"}
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Basic Information
          </h3>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Title *
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Luxurious 3BHK Villa in Farrukhnagar"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                  validationErrors.title ? "border-red-500" : "border-gray-300"
                }`}
              />
              {validationErrors.title && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {validationErrors.title}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (₹) *
              </label>
              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g., 5000000"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                  validationErrors.price ? "border-red-500" : "border-gray-300"
                }`}
              />
              {validationErrors.price && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {validationErrors.price}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location *
              </label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Sector 5, Farrukhnagar"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                  validationErrors.location
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {validationErrors.location && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {validationErrors.location}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Area *
              </label>
              <input
                name="area"
                value={formData.area}
                onChange={handleChange}
                placeholder="e.g., 200 sq. yd"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                  validationErrors.area ? "border-red-500" : "border-gray-300"
                }`}
              />
              {validationErrors.area && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {validationErrors.area}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Plot">Plot</option>
                <option value="Agricultural">Agricultural</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="Available">Available</option>
                <option value="Sold">Sold</option>
              </select>
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Additional Details
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags (comma-separated)
            </label>
            <input
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g., Near Metro, Gated Community, Swimming Pool"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the property features, amenities, nearby facilities..."
              rows={4}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none ${
                validationErrors.description
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {validationErrors.description && (
              <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {validationErrors.description}
              </p>
            )}
          </div>
        </div>

        {/* Image Upload */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <ImageUploadField
            value={uploadedUrls}
            onChange={handleImageChange}
            onImageDeleted={handleImageDeleted}
            required
          />
          {validationErrors.images && (
            <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {validationErrors.images}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white py-4 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {mode === "edit" ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>
                <Check className="w-5 h-5" />
                {mode === "edit" ? "Update Property" : "Create Property"}
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-4 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <X className="w-5 h-5" />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
