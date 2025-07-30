import { NextRequest, NextResponse } from "next/server";
import { addLead } from "@/lib/firestore";
import { sendLeadEmails } from "@/lib/emails/sendLeadEmails";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      message,
      propertyId,
      propertyTitle,
      budgetRange,
      preferredContactMethod,
    } = body;

    if (!name || !email || !phone || !propertyId || !propertyTitle) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save to Firestore
    await addLead({
      name,
      email,
      phone,
      message,
      propertyId,
      propertyTitle,
      budgetRange,
      preferredContactMethod,
    });

    // Send emails
    await sendLeadEmails({
      name,
      email,
      phone,
      message,
      propertyTitle,
      budgetRange,
      preferredContactMethod,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error in property inquiry route:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
