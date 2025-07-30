"use client";

import { useState } from "react";
import { toast } from "sonner";

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Message sent successfully!");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        toast.error(data.message || "Failed to send message.");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-md w-full p-4">
      <h2 className="text-2xl font-bold mb-2 text-[#232323]">
        Let&apos;s talk
      </h2>
      <p className="mb-4 text-gray-500">
        Fill out the form and we will get back to you soon.
      </p>
      <div>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Full Name"
          className="w-full bg-white border-none rounded-full px-5 py-3 shadow focus:ring-2 focus:ring-emerald-200 transition"
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="Email"
          className="w-full bg-white border-none rounded-full px-5 py-3 shadow focus:ring-2 focus:ring-emerald-200 transition"
        />
      </div>
      <div>
        <input
          type="tel"
          name="phone"
          pattern="[0-9]{10}"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full bg-white border-none rounded-full px-5 py-3 shadow focus:ring-2 focus:ring-emerald-200 transition"
        />
      </div>
      <div>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={3}
          required
          placeholder="Type your message..."
          className="w-full bg-white border-none rounded-2xl px-5 py-3 shadow focus:ring-2 focus:ring-emerald-200 transition resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#726bfa] text-white py-3 rounded-full font-semibold text-base shadow-md hover:bg-[#5c53cb] transition"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
