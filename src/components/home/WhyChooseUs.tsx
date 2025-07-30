// components/home/WhyChooseUs.tsx

export function WhyChooseUs() {
  const features = [
    {
      image: "/images/whychooseus/1.jpg", // Aerial view of Farrukhnagar
      stat: "100%",
      statLabel: "Local Coverage",
    },
    {
      image: "/images/whychooseus/2.jpg", // Professional photo of legal documents/team
      stat: "25+",
      statLabel: "Years Experience",
    },
    {
      image: "/images/whychooseus/3.jpg", // High-quality property showcase
      stat: "18%",
      statLabel: "Average ROI",
    },
    {
      image: "/images/whychooseus/4.jpg", // High-quality property showcase
      stat: "250+",
      statLabel: "Properties Sold",
    },
  ];

  return (
    <section className="bg-white mt-10">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2
            className="text-gray-900"
            style={{
              fontFamily: "Poppins",
              fontWeight: 600,
              fontSize: "48px",
              lineHeight: "120%",
            }}
          >
            Why Choose Farrukhnagar Realty?
          </h2>
        </div>

        {/* Photo-Enhanced Feature Cards */}
        <div className="grid lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
            >
              {/* Image Section */}
              <div className="relative h-92 overflow-hidden">
                <div
                  className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${feature.image})` }}
                />

                {/* Floating Stat */}

                <div className="absolute bottom-4 left-4 right-4 p-4 text-left backdrop-blur-sm rounded-xl">
                  <div
                    className="text-white mb-1"
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: 400,
                      fontSize: "32px",
                      lineHeight: "1",
                      textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                    }}
                  >
                    {feature.stat}
                  </div>
                  <div
                    className="text-white/90"
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: 300,
                      fontSize: "14px",
                      textShadow: "0 1px 2px rgba(0,0,0,0.5)",
                    }}
                  >
                    {feature.statLabel}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
