import {
  Award,
  FileText,
  HeartHandshake,
  Home,
  ShieldCheck,
  Verified,
  MessageCircle,
  Star,
  Users,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9876543210";

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section - Normal Sizing */}
      <section className="relative py-16 sm:py-20 px-4 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-emerald-100 text-emerald-800 rounded-full px-4 py-2 text-sm font-semibold mb-6 hover:bg-emerald-200 transition-colors">
              🏠 Trusted Since 2000
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Farrukhnagar&apos;s
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                {" "}
                Premier{" "}
              </span>
              Real Estate Experts
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              For over two decades, we&apos;ve been helping families and
              investors find their perfect properties with unwavering integrity
              and local expertise.
            </p>
          </div>

          {/* Stats Cards - Normal Sizing */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
            {[
              {
                number: "25+",
                label: "Years Experience",
                icon: TrendingUp,
                color: "emerald",
              },
              {
                number: "500+",
                label: "Happy Families",
                icon: Users,
                color: "blue",
              },
              {
                number: "100%",
                label: "Legal Compliance",
                icon: ShieldCheck,
                color: "orange",
              },
              {
                number: "₹50Cr+",
                label: "Properties Sold",
                icon: Star,
                color: "purple",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-4 sm:p-6 text-center shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className={`w-10 h-10 mx-auto mb-3 rounded-xl bg-${stat.color}-100 flex items-center justify-center group-hover:scale-110 transition-transform`}
                >
                  <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
                </div>
                <div
                  className={`text-2xl sm:text-3xl font-bold text-${stat.color}-600 mb-2`}
                >
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Our Story - Normal Sizing */}
        <section className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-blue-100 text-blue-800 rounded-full px-4 py-2 text-sm font-semibold mb-6">
                📖 Our Journey
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Building Trust, One Property at a Time
              </h2>
              <div className="space-y-6">
                {[
                  {
                    icon: "🎯",
                    title: "Founded with Vision",
                    description:
                      "Started with a simple yet powerful vision: to make real estate investment in Farrukhnagar safe, transparent, and profitable for every client.",
                  },
                  {
                    icon: "🤝",
                    title: "Relationship-First Approach",
                    description:
                      "Over 25 years, we&apos;ve built lasting relationships based on honesty, local expertise, and genuine care for our clients&apos; success.",
                  },
                  {
                    icon: "⚖️",
                    title: "Legal Excellence",
                    description:
                      "As licensed advocates, we ensure every transaction is legally sound and every client is fully protected throughout their journey.",
                  },
                ].map((point, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-blue-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <span className="text-lg">{point.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {point.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Visual Element */}
            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 rounded-3xl p-8 text-center border border-gray-100 shadow-xl">
                <div className="w-20 h-20 bg-white rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                  <Home className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Family Legacy
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Three generations of real estate expertise serving the
                  Farrukhnagar community with dedication, integrity, and
                  unwavering trust.
                </p>
                <div className="flex justify-center gap-2 mt-6">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-emerald-400 rounded-full"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us - Normal Sizing */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-emerald-100 text-emerald-800 rounded-full px-4 py-2 text-sm font-semibold mb-6">
              ⭐ Why Choose Us
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Why Choose Farrukhnagar Realty?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              We&apos;re not just real estate agents – we&apos;re your trusted
              partners in building wealth and finding the perfect home.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {[
              {
                icon: Home,
                title: "25+ Years Local Expertise",
                description:
                  "Deep understanding of Farrukhnagar&apos;s property market, trends, and investment opportunities.",
                color: "emerald",
              },
              {
                icon: ShieldCheck,
                title: "Legal Protection",
                description:
                  "Licensed advocates ensuring every document is verified and every transaction is legally compliant.",
                color: "blue",
              },
              {
                icon: Verified,
                title: "Verified Listings Only",
                description:
                  "No fake ads, no spam. Every property is personally verified and curated for quality and authenticity.",
                color: "orange",
              },
              {
                icon: FileText,
                title: "Complete Transparency",
                description:
                  "Clear pricing, detailed documentation, and honest communication throughout your property journey.",
                color: "purple",
              },
              {
                icon: HeartHandshake,
                title: "Lifetime Support",
                description:
                  "Our relationship doesn&apos;t end at closing. We provide ongoing support for all your property needs.",
                color: "pink",
              },
              {
                icon: Award,
                title: "Award-Winning Service",
                description:
                  "Recognized for excellence in customer service and ethical business practices in the real estate industry.",
                color: "teal",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`w-14 h-14 bg-${feature.color}-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon
                    className={`w-7 h-7 text-${feature.color}-600`}
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section - Normal Sizing */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 rounded-full px-4 py-2 text-sm font-semibold mb-6">
              👨‍💼 Leadership
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Meet Our Expert Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Led by experienced professionals who understand the local market
              and are committed to your success.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              <div className="text-center">
                <div className="relative w-40 h-40 mx-auto mb-6">
                  <Image
                    src="/images/gaurav.jpeg"
                    alt="Gaurav Yadav"
                    fill
                    className="rounded-full border-4 border-white shadow-lg object-cover"
                  />
                  <div className="absolute bottom-2 right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-md border-2 border-white">
                    <Verified className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Gaurav Yadav
                </h3>
                <p className="text-emerald-600 font-semibold mb-4">
                  Founder & CEO
                </p>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  With over 25 years of experience in Farrukhnagar&apos;s real
                  estate market, Gaurav has helped hundreds of families find
                  their dream homes and build lasting wealth through property
                  investment.
                </p>
                <div className="flex justify-center gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action - Normal Sizing */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-emerald-500 via-emerald-600 to-blue-600 rounded-3xl p-12 text-white shadow-xl">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
                Ready to Start Your Property Journey?
              </h2>
              <p className="text-xl opacity-90 mb-8 leading-relaxed">
                Let our experienced team guide you through every step of your
                real estate investment in Farrukhnagar.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`https://wa.me/91${whatsappNumber}?text=Hi, I&apos;d like to know more about your services.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-white text-emerald-600 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Get Free Consultation
                </a>
                <Link
                  href="/listings"
                  className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-emerald-600 transition-all duration-300 hover:scale-105"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Browse Properties
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
