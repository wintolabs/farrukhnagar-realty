import { ContactForm } from "@/components/forms/ContactForm";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9876543210";
  const email = process.env.ADMIN_EMAIL || "farrukhnagarrealty@gmail.com";

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      value: `+91 ${whatsappNumber}`,
      link: `tel:+91${whatsappNumber}`,
      color: "emerald",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: "Chat with us instantly",
      link: `https://wa.me/91${whatsappNumber}?text=Hi,  I'm interested in your real estate services in Farrukhnagar.`,
      color: "green",
    },
    {
      icon: Mail,
      title: "Email Us",
      value: email,
      link: `mailto:${email}`,
      color: "blue",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      value: "Farrukhnagar, Haryana",
      link: "#",
      color: "purple",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 px-4 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center bg-emerald-100 text-emerald-800 rounded-full px-4 py-2 text-sm font-semibold mb-8">
            📞 Get In Touch
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Let&apos;s Discuss Your
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              {" "}
              Property Goals
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ready to make your property dreams come true? Our expert team is
            here to guide you through every step of your real estate journey in
            Farrukhnagar.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Contact Methods Grid */}
        <section className="mb-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.link}
                target={info.link.startsWith("http") ? "_blank" : "_self"}
                rel={
                  info.link.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 bg-${info.color}-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <info.icon className={`w-6 h-6 text-${info.color}-600`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {info.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {info.value}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* Main Content Grid */}
        <section className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>

          {/* Additional Information */}
          <div className="space-y-8">
            {/* Business Hours */}
            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-3xl p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Business Hours
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Monday - Saturday</span>
                  <span className="font-semibold text-gray-900">
                    9:00 AM - 7:00 PM
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Sunday</span>
                  <span className="font-semibold text-gray-900">
                    10:00 AM - 5:00 PM
                  </span>
                </div>
                <div className="mt-4 p-3 bg-white rounded-xl">
                  <p className="text-sm text-gray-600">
                    <strong>Emergency consultations</strong> available 24/7 for
                    existing clients
                  </p>
                </div>
              </div>
            </div>

            {/* Why Contact Us */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Why Contact Us?
              </h3>
              <div className="space-y-4">
                {[
                  "Free initial consultation and property assessment",
                  "Expert legal guidance from licensed advocates",
                  "Personalized property recommendations",
                  "Transparent pricing with no hidden costs",
                  "Lifetime support for all your property needs",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-emerald-500 to-blue-600 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Need Immediate Assistance?
              </h3>
              <p className="opacity-90 mb-6">
                For urgent property matters or quick questions, reach out to us
                directly
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/91${whatsappNumber}?text=Hi, I need immediate assistance with a property matter.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-white text-emerald-600 px-6 py-3 rounded-2xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp Now
                </a>
                <a
                  href={`tel:+91${whatsappNumber}`}
                  className="inline-flex items-center justify-center border-2 border-white text-white px-6 py-3 rounded-2xl font-semibold hover:bg-white hover:text-emerald-600 transition-colors"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
