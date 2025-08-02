import {
  ArrowRight,
  Building,
  CheckCircle,
  HeartHandshake,
  Home,
  Landmark,
  MapPin,
  MessageCircle,
  Scale,
  ShieldCheck,
  SquareStack,
  TreePine,
  Users,
} from "lucide-react";

export default function ServicesPage() {
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9876543210";

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
    {
      icon: Building,
      name: "Residential",
      description: "Homes & Apartments",
      color: "emerald",
    },
    {
      icon: Landmark,
      name: "Commercial",
      description: "Shops & Offices",
      color: "blue",
    },
    {
      icon: TreePine,
      name: "Agricultural",
      description: "Farmland & Plots",
      color: "green",
    },
    {
      icon: SquareStack,
      name: "Investment",
      description: "Portfolio Building",
      color: "purple",
    },
  ];

  const processSteps = [
    {
      number: "1",
      title: "Consultation",
      description: "Understanding your needs and property goals",
      color: "emerald",
    },
    {
      number: "2",
      title: "Verification",
      description: "Complete legal and title verification process",
      color: "blue",
    },
    {
      number: "3",
      title: "Documentation",
      description: "Preparing and processing all legal documents",
      color: "purple",
    },
    {
      number: "4",
      title: "Support",
      description: "Ongoing assistance after transaction completion",
      color: "orange",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Enhanced Hero Section */}
      <section className="relative py-16 sm:py-20 px-4 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center bg-emerald-100 text-emerald-800 rounded-full px-4 py-2 text-sm font-semibold mb-8 hover:bg-emerald-200 transition-colors">
            🏠 Comprehensive Real Estate Solutions
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Your Complete
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              {" "}
              Property Partner
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
            From initial consultation to post-sale support, we provide
            end-to-end real estate and legal solutions for buyers, sellers, and
            investors in Farrukhnagar.
          </p>

          {/* Enhanced Property Types Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {propertyTypes.map((type, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 bg-${type.color}-100 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}
                >
                  <type.icon
                    className={`w-5 h-5 sm:w-6 sm:h-6 text-${type.color}-600`}
                  />
                </div>
                <div className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
                  {type.name}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  {type.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16 lg:py-20">
        {/* Enhanced Main Services Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 rounded-full px-4 py-2 text-sm font-semibold mb-6">
              🔧 Our Services
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Expert Services for Every Need
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Each service is designed to protect your investment and ensure a
              smooth, legally compliant property transaction.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group bg-gradient-to-br ${service.bgGradient} rounded-3xl p-2 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}
              >
                <div className="bg-white rounded-2xl p-8 lg:p-10 h-full">
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
                        className="flex items-start gap-3"
                      >
                        <CheckCircle
                          className={`w-5 h-5 text-${service.color}-600 flex-shrink-0 mt-0.5`}
                        />
                        <span className="text-gray-700 leading-relaxed">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Enhanced Process Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-purple-100 text-purple-800 rounded-full px-4 py-2 text-sm font-semibold mb-6">
              📋 Our Process
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Our Proven Process
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A systematic approach that ensures every detail is handled with
              precision and care.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="group text-center">
                <div
                  className={`w-16 h-16 bg-${step.color}-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                >
                  <span className={`text-2xl font-bold text-${step.color}-600`}>
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Enhanced Why Choose Us Section */}
        <section className="mb-20">
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 lg:p-12 border border-gray-100">
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-emerald-100 text-emerald-800 rounded-full px-4 py-2 text-sm font-semibold mb-6">
                ⭐ Why Choose Us
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
                Why Farrukhnagar Families Trust Us
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Our commitment to excellence and client satisfaction sets us
                apart
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Scale,
                  title: "Licensed Advocates",
                  description:
                    "In-house legal team ensuring complete compliance",
                  color: "emerald",
                },
                {
                  icon: MapPin,
                  title: "Local Expertise",
                  description:
                    "25+ years of deep Farrukhnagar market knowledge",
                  color: "blue",
                },
                {
                  icon: Users,
                  title: "Family Business",
                  description: "Personal attention and long-term relationships",
                  color: "orange",
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="group text-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className={`w-20 h-20 bg-${benefit.color}-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <benefit.icon
                      className={`w-10 h-10 text-${benefit.color}-600`}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Custom Requirements CTA */}
        <section>
          <div className="bg-gradient-to-r from-emerald-500 via-emerald-600 to-blue-600 rounded-3xl p-10 lg:p-12 text-white text-center shadow-2xl">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
                Have Unique Property Requirements?
              </h2>
              <p className="text-xl opacity-90 mb-8 leading-relaxed">
                Every client is unique, and so are their property needs.
                Let&apos;s discuss your specific requirements and create a
                custom solution.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`https://wa.me/91${whatsappNumber}?text=Hi, I have specific property requirements and would like to discuss custom solutions.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-white text-emerald-600 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Get Custom Consultation
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-emerald-600 transition-all duration-300 hover:scale-105"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Schedule Meeting
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
