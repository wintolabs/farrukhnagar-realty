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
    <section className="bg-white mt-6 sm:mt-8 lg:mt-10">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Responsive */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2
            className="text-gray-900 font-semibold"
            style={{
              fontFamily: "Poppins",
              fontWeight: 600,
              fontSize: "clamp(1.75rem, 5vw, 3rem)", // 28px to 48px responsive
              lineHeight: "120%",
            }}
          >
            Why Choose Farrukhnagar Realty?
          </h2>
        </div>

        {/* Photo-Enhanced Feature Cards - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
            >
              {/* Image Section - Responsive height */}
              <div className="relative h-64 sm:h-72 lg:h-80 xl:h-92 overflow-hidden">
                <div
                  className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${feature.image})` }}
                />

                {/* Floating Stat - Responsive positioning and typography */}
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 p-3 sm:p-4 text-left backdrop-blur-sm rounded-xl">
                  <div
                    className="text-white mb-1"
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: 400,
                      fontSize: "clamp(1.5rem, 4vw, 2rem)", // 24px to 32px responsive
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
                      fontSize: "clamp(0.75rem, 2vw, 0.875rem)", // 12px to 14px responsive
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
