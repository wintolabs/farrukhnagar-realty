import { ContactForm } from "@/components/forms/ContactForm";

export default function ContactPage() {
  return (
    <div className="py-16 px-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <p className="text-gray-600 mb-8">
        Have a question or want to schedule a consultation? Fill out the form
        below and we’ll get back to you.
      </p>
      <ContactForm />
    </div>
  );
}
