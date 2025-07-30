import { NextResponse } from "next/server";
import { sendContactEmails } from "@/lib/emails/sendContactEmails";
import { addContactLead } from "@/lib/firestore";

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 }
      );
    }

    // Save to Firestore:
    await addContactLead({ name, email, phone, message });

    // Then send email
    await sendContactEmails({ name, email, phone, message });

    return NextResponse.json(
      { message: "Your message has been sent successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json(
      { message: "An error occurred while sending your message." },
      { status: 500 }
    );
  }
}
