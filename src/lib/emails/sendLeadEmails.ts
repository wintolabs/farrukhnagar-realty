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
  // ─────────────────────────────────────────────────────────
  // ADMIN NOTIFICATION (property inquiry) ───────────────────
  const adminHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>New Property Inquiry</title>
      <style>
        body  { margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#333; }
        .box  { max-width:600px;margin:0 auto;padding:24px; }
        h3    { margin:0 0 16px;font-size:20px;color:#111; }
        table { width:100%;border-collapse:collapse; }
        td    { padding:8px 0;vertical-align:top; }
        .lbl  { width:160px;font-weight:600;color:#555; }
      </style>
    </head>
    <body>
      <div class="box">
        <h3>🏡 New Property Inquiry</h3>
        <table>
          <tr><td class="lbl">Name:</td><td>${lead.name}</td></tr>
          <tr><td class="lbl">Email:</td><td>${lead.email}</td></tr>
          <tr><td class="lbl">Phone:</td><td>${lead.phone}</td></tr>
          <tr><td class="lbl">Property:</td><td>${lead.propertyTitle}</td></tr>
          <tr><td class="lbl">Budget Range:</td><td>${lead.budgetRange || "Not specified"}</td></tr>
          <tr><td class="lbl">Preferred Contact:</td><td>${lead.preferredContactMethod || "Not specified"}</td></tr>
          <tr><td class="lbl">Message:</td><td>${(lead.message || "—").replace(/\n/g, "<br/>")}</td></tr>
        </table>
      </div>
    </body>
    </html>
    `;

  // ─────────────────────────────────────────────────────────
  // USER AUTO-REPLY (property inquiry) ──────────────────────
  const userHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Your Inquiry – Farrukhnagar Realty</title>
      <style>
        body { margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#333; }
        .box { max-width:600px;margin:0 auto;padding:24px;line-height:1.55; }
        h2  { margin:0 0 16px;font-size:18px;color:#111; }
      </style>
    </head>
    <body>
      <div class="box">
        <h2>Hi ${lead.name},</h2>
        <p>Thank you for your interest in <strong>${lead.propertyTitle}</strong>.</p>
        <p>Our team will review your inquiry and contact you shortly to discuss the details.</p>
        <p>If you have additional questions, feel free to reply to this email or call us at <strong>+91 12345 67890</strong>.</p>
        <p style="margin:32px 0 0;">– Farrukhnagar Realty</p>
      </div>
    </body>
    </html>
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
