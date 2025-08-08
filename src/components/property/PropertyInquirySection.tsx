// src/components/property/PropertyInquirySection.tsx

"use client";
import { Property } from "@/types/property";
import { PropertyInquiryForm } from "@/components/forms/PropertyInquiryForm";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PropertyInquirySectionProps {
  property: Property;
  propertyId: string;
}

export function PropertyInquirySection({
  property,
  propertyId,
}: PropertyInquirySectionProps) {
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9876543210";
  const email =
    process.env.NEXT_PUBLIC_ADMIN_EMAIL || "farrukhnagarrealty@gmail.com";

  if (property.status === "Sold") {
    return (
      <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🏠</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Property Sold
          </h3>
          <p className="text-gray-600 mb-6">
            This property has been marked as sold. Please explore our other
            available listings.
          </p>
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
            Browse Other Properties
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Get in Touch</h3>
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start text-left h-auto p-4"
            onClick={() => window.open(`tel:+91${whatsappNumber}`)}
          >
            <Phone className="w-5 h-5 mr-3 text-emerald-600" />
            <div>
              <div className="font-semibold">Call Us</div>
              <div className="text-sm text-gray-600">+91 {whatsappNumber}</div>
            </div>
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start text-left h-auto p-4"
            onClick={() => window.open(`mailto:${email}`)}
          >
            <Mail className="w-5 h-5 mr-3 text-emerald-600" />
            <div>
              <div className="font-semibold">Email Us</div>
              <div className="text-sm text-gray-600">{}</div>
            </div>
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start text-left h-auto p-4"
            onClick={() => {
              const message = `Hi, I'd like to know more about ${property.title}.`;
              const whatsappUrl = `https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(message)}`;
              window.open(whatsappUrl);
            }}
          >
            <MessageCircle className="w-5 h-5 mr-3 text-emerald-600" />
            <div>
              <div className="font-semibold">WhatsApp</div>
              <div className="text-sm text-gray-600">Quick Response</div>
            </div>
          </Button>
        </div>
      </div>

      {/* Inquiry Form */}
      <PropertyInquiryForm
        propertyId={propertyId}
        propertyTitle={property.title}
      />
    </div>
  );
}
