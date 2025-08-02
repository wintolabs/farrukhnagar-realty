"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

export function ContactCTA({ propertyTitle }: { propertyTitle: string }) {
  const encodedMessage = encodeURIComponent(
    `Hello, I'm interested in the property: "${propertyTitle}". Please share more details.`
  );

  const whatsappUrl = `https://wa.me/91${whatsappNumber}?text=${encodedMessage}`;

  return (
    <div className="mt-10 border-t pt-6">
      <h3 className="text-xl font-semibold mb-2">
        Interested in this property?
      </h3>
      <p className="text-gray-600 mb-4">
        Contact us now to schedule a visit or get more information.
      </p>
      <Button asChild className="bg-green-600 hover:bg-green-700">
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          <MessageCircle className="w-4 h-4 mr-2" />
          Chat on WhatsApp
        </a>
      </Button>
    </div>
  );
}
