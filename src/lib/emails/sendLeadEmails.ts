import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendLeadEmails(lead: {
  name: string;
  email: string;
  phone: string;
  message?: string;
  propertyTitle: string;
  budgetRange?: string;
  preferredContactMethod?: string;
}) {
  const adminHtml = `
    <p><strong>New property inquiry received:</strong></p>
    <ul>
      <li><strong>Name:</strong> ${lead.name}</li>
      <li><strong>Email:</strong> ${lead.email}</li>
      <li><strong>Phone:</strong> ${lead.phone}</li>
      <li><strong>Property:</strong> ${lead.propertyTitle}</li>
      <li><strong>Budget Range:</strong> ${lead.budgetRange || "Not specified"}</li>
      <li><strong>Preferred Contact:</strong> ${lead.preferredContactMethod || "Not specified"}</li>
      <li><strong>Message:</strong> ${lead.message || "—"}</li>
    </ul>
  `;

  const userHtml = `
    <p>Hi ${lead.name},</p>
    <p>Thank you for your interest in <strong>${lead.propertyTitle}</strong>.</p>
    <p>Our team will review your inquiry and get in touch with you shortly.</p>
    <p>– Farrukhnagar Realty</p>
  `;

  try {
    await resend.emails.send({
      from: process.env.SENDER_EMAIL!,
      to: process.env.ADMIN_EMAIL!,
      subject: "📩 New Property Inquiry Received",
      html: adminHtml,
    });
  } catch (err) {
    console.error("❌ Admin email failed:", err);
  }

  try {
    await resend.emails.send({
      from: process.env.SENDER_EMAIL!,
      to: lead.email,
      subject: "Thank you for contacting Farrukhnagar Realty 🏠",
      html: userHtml,
    });
  } catch (err) {
    console.error("❌ User email failed:", err);
  }
}
