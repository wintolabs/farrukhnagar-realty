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

  const adminHtml = `
    <h3>New Contact Form Submission</h3>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone || "N/A"}</p>
    <p><strong>Message:</strong><br/>${message}</p>
  `;

  const userHtml = `
    <p>Hi ${name},</p>
    <p>Thank you for reaching out to us. We've received your message and will get back to you shortly.</p>
    <p>Best regards,<br/>Farrukhnagar Realty Team</p>
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
