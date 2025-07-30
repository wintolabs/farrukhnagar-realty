import {
  Award,
  FileText,
  HeartHandshake,
  Home,
  Phone,
  ShieldCheck,
  Verified,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section with Improved Visual Hierarchy */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-emerald-100 text-emerald-800 rounded-full px-6 py-2 text-sm font-semibold mb-6">
              🏠 Trusted Since 2000
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Farrukhnagar&apos;s
              <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                {" "}
                Premier{" "}
              </span>
              Real Estate Experts
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              For over two decades, we&apos;ve been helping families and
              investors find their perfect properties with unwavering integrity
              and local expertise.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                25+
              </div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-sm text-gray-600">Happy Families</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                100%
              </div>
              <div className="text-sm text-gray-600">Legal Compliance</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                ₹50Cr+
              </div>
              <div className="text-sm text-gray-600">Properties Sold</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Our Story - Enhanced Visual Design */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed">
                    Founded with a simple yet powerful vision: to make real
                    estate investment in Farrukhnagar{" "}
                    <strong>safe, transparent, and profitable</strong>
                    for every client.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed">
                    Over 25 years, we&apos;ve built lasting relationships based
                    on
                    <strong> honesty, local expertise,</strong> and genuine care
                    for our clients&apos; success.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed">
                    As licensed advocates, we ensure every transaction is
                    <strong> legally sound</strong> and every client is fully
                    protected throughout their journey.
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Element */}
            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-100 to-blue-100 rounded-3xl p-8 text-center">
                <div className="w-24 h-24 bg-white rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                  <Home className="w-12 h-12 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Family Legacy
                </h3>
                <p className="text-gray-600">
                  Three generations of real estate expertise serving the
                  Farrukhnagar community with dedication and trust.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us - Premium Grid Layout */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Farrukhnagar Realty?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We&apos;re not just real estate agents – we&apos;re your trusted
              partners in building wealth and finding the perfect home.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Home className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                25+ Years Local Expertise
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Deep understanding of Farrukhnagar&apos;s property market,
                trends, and investment opportunities.
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Legal Protection
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Licensed advocates ensuring every document is verified and every
                transaction is legally compliant.
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Verified className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Verified Listings Only
              </h3>
              <p className="text-gray-600 leading-relaxed">
                No fake ads, no spam. Every property is personally verified and
                curated for quality and authenticity.
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FileText className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Complete Transparency
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Clear pricing, detailed documentation, and honest communication
                throughout your property journey.
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <HeartHandshake className="w-7 h-7 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Lifetime Support
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our relationship doesn&apos;t end at closing. We provide ongoing
                support for all your property needs.
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Award className="w-7 h-7 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Award-Winning Service
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Recognized for excellence in customer service and ethical
                business practices in the real estate industry.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section - Modern Layout */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Led by experienced professionals who understand the local market
              and are committed to your success.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md border border-gray-100">
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
                <p className="text-emerald-600 font-semibold mb-4">Founder</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  With over 25 years of experience in Farrukhnagar&apos;s real
                  estate market, Gaurav has helped hundreds of families find
                  their dream homes and build lasting wealth through property
                  investment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-emerald-500 to-blue-600 rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Your Property Journey?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Let our experienced team guide you through every step of your real
              estate investment in Farrukhnagar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hi, I'd like to know more about your services.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-white text-emerald-600 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-colors shadow-lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                Get Free Consultation
              </a>
              <Link
                href="/listings"
                className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-emerald-600 transition-colors"
              >
                <Home className="w-5 h-5 mr-2" />
                Browse Properties
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
