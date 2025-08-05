// src/components/forms/PropertyInquiryForm.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Send, CheckCircle, Loader2 } from "lucide-react";

interface PropertyInquiryFormProps {
  propertyId: string;
  propertyTitle: string;
}

export function PropertyInquiryForm({
  propertyId,
  propertyTitle,
}: PropertyInquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    budgetRange: "",
    preferredContactMethod: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/property-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          propertyId,
          propertyTitle,
        }),
      });

      if (!res.ok) throw new Error("Submission failed");

      toast.success("Inquiry submitted successfully!");
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
          <p className="text-gray-600 mb-6">
            We&apos;ve received your inquiry for{" "}
            <strong>{propertyTitle}</strong>. Our team will contact you within
            24 hours.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 text-sm">
              📧 Check your email for a confirmation message
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        Interested in this property?
      </h3>
      <p className="text-gray-600 mb-6">
        Fill out the form below and we&apos;ll get back to you shortly.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label
              htmlFor="name"
              className="text-sm font-semibold text-gray-700"
            >
              Full Name *
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={`mt-1 ${errors.name ? "border-red-500" : ""}`}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <Label
              htmlFor="email"
              className="text-sm font-semibold text-gray-700"
            >
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={`mt-1 ${errors.email ? "border-red-500" : ""}`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label
              htmlFor="phone"
              className="text-sm font-semibold text-gray-700"
            >
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="mt-1"
              placeholder="+91 98765 43210"
            />
          </div>

          <div>
            <Label
              htmlFor="budgetRange"
              className="text-sm font-semibold text-gray-700"
            >
              Budget Range
            </Label>
            <Select onValueChange={(val) => handleChange("budgetRange", val)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="< ₹10L">&lt; ₹10 Lakhs</SelectItem>
                <SelectItem value="₹10L – ₹25L">₹10L – ₹25L</SelectItem>
                <SelectItem value="₹25L – ₹50L">₹25L – ₹50L</SelectItem>
                <SelectItem value="₹50L – ₹1Cr">₹50L – ₹1 Crore</SelectItem>
                <SelectItem value="₹1Cr+">₹1 Crore+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label
            htmlFor="preferredContactMethod"
            className="text-sm font-semibold text-gray-700"
          >
            Preferred Contact Method
          </Label>
          <Select
            onValueChange={(val) => handleChange("preferredContactMethod", val)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="How should we contact you?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Email">Email</SelectItem>
              <SelectItem value="Phone">Phone Call</SelectItem>
              <SelectItem value="WhatsApp">WhatsApp</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label
            htmlFor="message"
            className="text-sm font-semibold text-gray-700"
          >
            Additional Message
          </Label>
          <Textarea
            id="message"
            rows={4}
            value={formData.message}
            onChange={(e) => handleChange("message", e.target.value)}
            className="mt-1 resize-none"
            placeholder="Tell us more about your requirements..."
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 text-lg font-semibold"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Submit Inquiry
            </>
          )}
        </Button>
      </form>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-600 text-center">
          🔒 Your information is secure and will only be used to contact you
          about this property.
        </p>
      </div>
    </div>
  );
}
