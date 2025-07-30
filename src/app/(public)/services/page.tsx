import {
  ArrowRight,
  Building,
  CheckCircle,
  HeartHandshake,
  Home,
  Landmark,
  MapPin,
  Phone,
  Scale,
  ShieldCheck,
  SquareStack,
  TreePine,
  Users,
} from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      icon: Home,
      title: "Property Consulting",
      description:
        "Expert guidance for all your real estate needs in Farrukhnagar",
      features: [
        "Residential property consultation",
        "Commercial investment advice",
        "Agricultural land guidance",
        "Plot selection & evaluation",
        "Market analysis & pricing",
      ],
      color: "emerald",
      bgGradient: "from-emerald-50 to-green-50",
    },
    {
      icon: ShieldCheck,
      title: "Legal Verification & Documentation",
      description: "Complete legal protection with our licensed advocate team",
      features: [
        "Title verification & due diligence",
        "Sale deed preparation",
        "Transfer deed documentation",
        "Lease agreement drafting",
        "Legal compliance assurance",
      ],
      color: "blue",
      bgGradient: "from-blue-50 to-indigo-50",
    },
    {
      icon: Scale,
      title: "Registry & Mutation Assistance",
      description: "Seamless government procedures handled by experts",
      features: [
        "Property registration support",
        "Mutation process guidance",
        "Government office liaison",
        "Document submission",
        "Legal compliance monitoring",
      ],
      color: "purple",
      bgGradient: "from-purple-50 to-violet-50",
    },
    {
      icon: HeartHandshake,
      title: "Post-Sale Support",
      description: "Lifetime support for your property ownership journey",
      features: [
        "Name change in revenue records",
        "Utility connection assistance",
        "Property maintenance guidance",
        "Legal query resolution",
        "Ongoing consultation",
      ],
      color: "orange",
      bgGradient: "from-orange-50 to-amber-50",
    },
  ];

  const propertyTypes = [
    { icon: Building, name: "Residential", description: "Homes & Apartments" },
    { icon: Landmark, name: "Commercial", description: "Shops & Offices" },
    { icon: TreePine, name: "Agricultural", description: "Farmland & Plots" },
    {
      icon: SquareStack,
      name: "Investment",
      description: "Portfolio Building",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-emerald-50">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center bg-emerald-100 text-emerald-800 rounded-full px-6 py-2 text-sm font-semibold mb-6">
            🏠 Comprehensive Real Estate Solutions
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Your Complete
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              {" "}
              Property Partner
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
            From initial consultation to post-sale support, we provide
            end-to-end real estate and legal solutions for buyers, sellers, and
            investors in Farrukhnagar.
          </p>

          {/* Property Types Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {propertyTypes.map((type, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100"
              >
                <type.icon className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <div className="text-sm font-semibold text-gray-900">
                  {type.name}
                </div>
                <div className="text-xs text-gray-600">{type.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Main Services Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Expert Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Each service is designed to protect your investment and ensure a
              smooth, legally compliant property transaction.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group bg-gradient-to-br ${service.bgGradient} rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="bg-white rounded-2xl p-12">
                  <div
                    className={`w-16 h-16 bg-${service.color}-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <service.icon
                      className={`w-8 h-8 text-${service.color}-600`}
                    />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle
                          className={`w-5 h-5 text-${service.color}-600 flex-shrink-0`}
                        />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Process Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Proven Process
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A systematic approach that ensures every detail is handled with
              precision and care.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-emerald-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Consultation
              </h3>
              <p className="text-gray-600">
                Understanding your needs and property goals
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Verification
              </h3>
              <p className="text-gray-600">
                Complete legal and title verification process
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Documentation
              </h3>
              <p className="text-gray-600">
                Preparing and processing all legal documents
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Support
              </h3>
              <p className="text-gray-600">
                Ongoing assistance after transaction completion
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="mb-20">
          <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Farrukhnagar Families Trust Us
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our commitment to excellence and client satisfaction sets us
                apart
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Scale className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Licensed Advocates
                </h3>
                <p className="text-gray-600">
                  In-house legal team ensuring complete compliance
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Local Expertise
                </h3>
                <p className="text-gray-600">
                  25+ years of deep Farrukhnagar market knowledge
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Family Business
                </h3>
                <p className="text-gray-600">
                  Personal attention and long-term relationships
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Custom Requirements CTA */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-emerald-500 to-blue-600 rounded-3xl p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">
              Have Unique Property Requirements?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Every client is unique, and so are their property needs.
              Let&apos;s discuss your specific requirements and create a custom
              solution.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hi, I have specific property requirements and would like to discuss custom solutions.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-white text-emerald-600 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-colors shadow-lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                Get Custom Consultation
              </a>
              <a
                href="/contact"
                className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-emerald-600 transition-colors"
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Schedule Meeting
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
