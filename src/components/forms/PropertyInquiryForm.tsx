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

interface PropertyInquiryFormProps {
  propertyId: string;
  propertyTitle: string;
}

export function PropertyInquiryForm({
  propertyId,
  propertyTitle,
}: PropertyInquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    budgetRange: "",
    preferredContactMethod: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
    }
  };

  if (submitted) {
    return (
      <div className="mt-6 p-4 border rounded text-green-700 bg-green-50">
        📩 Thank you! We’ve received your inquiry and will contact you shortly.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 space-y-4 border p-6 rounded-md"
    >
      <h2 className="text-xl font-semibold mb-2">
        Interested in this property? Contact us below:
      </h2>

      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          type="tel"
          pattern="[0-9]{10}"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="budgetRange">Budget Range</Label>
        <Select onValueChange={(val) => handleChange("budgetRange", val)}>
          <SelectTrigger>
            <SelectValue placeholder="Select your budget range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="< ₹10L">&lt; ₹10L</SelectItem>
            <SelectItem value="₹10L – ₹25L">₹10L – ₹25L</SelectItem>
            <SelectItem value="₹25L – ₹50L">₹25L – ₹50L</SelectItem>
            <SelectItem value="₹50L+">₹50L+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="preferredContactMethod">Preferred Contact Method</Label>
        <Select
          onValueChange={(val) => handleChange("preferredContactMethod", val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a contact method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Email">Email</SelectItem>
            <SelectItem value="Phone">Phone</SelectItem>
            <SelectItem value="WhatsApp">WhatsApp</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="message">Message (Optional)</Label>
        <Textarea
          id="message"
          rows={4}
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
        />
      </div>

      <Button type="submit" className="w-full">
        Submit Inquiry
      </Button>
    </form>
  );
}
