import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmails({
  name,
  email,
  phone,
  message,
}: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
  const SENDER_EMAIL = process.env.SENDER_EMAIL!;

  // ─────────────────────────────────────────────────────────
  // ADMIN NOTIFICATION (contact form) ───────────────────────
  const adminHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>New Contact Inquiry</title>
        <style>
          body   { margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#333; }
          .box   { max-width:600px;margin:0 auto;padding:24px; }
          h3     { margin:0 0 16px;font-size:20px;color:#111; }
          table  { width:100%;border-collapse:collapse; }
          td     { padding:8px 0;vertical-align:top; }
          .lbl   { width:140px;font-weight:600;color:#555; }
        </style>
      </head>
      <body>
        <div class="box">
          <h3>📝 New Contact Form Submission</h3>
          <table>
            <tr><td class="lbl">Name:</td><td>${name}</td></tr>
            <tr><td class="lbl">Email:</td><td>${email}</td></tr>
            <tr><td class="lbl">Phone:</td><td>${phone || "N/A"}</td></tr>
            <tr><td class="lbl">Message:</td><td>${message.replace(/\n/g, "<br/>")}</td></tr>
          </table>
        </div>
      </body>
      </html>
      `;

  // ─────────────────────────────────────────────────────────
  // USER AUTO-REPLY (contact form) ──────────────────────────
  const userHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Thank You – Farrukhnagar Realty</title>
      <style>
        body { margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#333; }
        .box { max-width:600px;margin:0 auto;padding:24px;line-height:1.55; }
        h2  { margin:0 0 16px;font-size:18px;color:#111; }
      </style>
    </head>
    <body>
      <div class="box">
        <h2>Hi ${name},</h2>
        <p>Thank you for contacting Farrukhnagar Realty. We’ve received your message and a member of our team will get back to you within 24 hours.</p>
        <p>If your inquiry is urgent, feel free to call us at <strong>+91 12345 67890</strong>.</p>
        <p style="margin:32px 0 0;">Best regards,<br/><strong>Farrukhnagar Realty Team</strong></p>
      </div>
    </body>
    </html>
    `;

  await resend.emails.send({
    from: SENDER_EMAIL,
    to: ADMIN_EMAIL,
    subject: "📩 New Inquiry from Contact Page",
    html: adminHtml,
  });

  await resend.emails.send({
    from: SENDER_EMAIL,
    to: email,
    subject: "Thank you for contacting Farrukhnagar Realty 🏠",
    html: userHtml,
  });
}
