"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <div className="relative w-full max-w-[1380px] mx-auto">
        {/* Responsive container with flexible height */}
        <div className="relative min-h-[500px] sm:min-h-[600px] lg:h-[617px] rounded-[15px] overflow-hidden">
          {/* Background gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, #C1DEE8 0%, #FBD9B9 100%)",
            }}
          >
            {/* Texture overlay */}
            <div
              className="absolute inset-0 opacity-[0.4] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' seed='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
                mixBlendMode: "overlay",
              }}
            />
          </div>

          {/* Main content grid */}
          <div className="relative z-10 h-full grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* LEFT: Content Section - Responsive */}
            <div className="flex flex-col justify-center px-6 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 lg:py-16">
              {/* Welcome Text */}
              <p
                className="text-gray-800 mb-4 sm:mb-6 lg:mb-8 text-sm sm:text-base"
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 400,
                  lineHeight: "120%",
                }}
              >
                Welcome to Farrukhnagar Realty
              </p>

              {/* Main Headline - Responsive Typography */}
              <h1
                className="text-gray-900 mb-6 sm:mb-8 lg:mb-12 font-semibold leading-tight"
                style={{
                  fontFamily: "Poppins",
                  fontSize: "clamp(2.5rem, 5vw, 4.2rem)", // Responsive font size
                  lineHeight: "1.2",
                }}
              >
                Manage Your
                <br />
                Property
              </h1>

              {/* Description - Responsive */}
              <p
                className="text-gray-700 mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg max-w-md lg:max-w-lg"
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 400,
                  lineHeight: "1.5",
                }}
              >
                You will have everything nearby - expressways, metro
                connections, schools, the heritage Farrukhnagar neighborhood,
                etc
              </p>

              {/* Email Input - Premium Responsive Design */}
              {/* <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl"> */}
              {/* <form className="space-y-4 sm:space-y-0"> */}
              {/* Mobile-First Stacked Layout */}
              {/* <div className="sm:hidden space-y-3">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full px-4 py-4 bg-white border border-gray-300 rounded-2xl text-gray-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-base placeholder:text-gray-500 shadow-sm"
                      style={{ fontFamily: "Poppins" }}
                    />
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 font-semibold rounded-2xl transition-colors text-base shadow-lg">
                      Get a Quote
                    </Button>
                  </div> */}

              {/* Desktop/Tablet Inline Layout */}
              {/* <div className="hidden sm:flex bg-white rounded-full border border-gray-200 shadow-lg overflow-hidden h-12 lg:h-14">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      className="flex-1 px-6 bg-transparent text-gray-800 border-none focus:ring-0 focus:outline-none text-sm lg:text-base placeholder:text-gray-500 h-full"
                      style={{ fontFamily: "Poppins" }}
                    />
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 lg:px-8 font-semibold rounded-none rounded-r-full transition-colors text-sm lg:text-base h-full flex-shrink-0">
                      Get a Quote
                    </Button>
                  </div>
                </form> */}
              {/* </div> */}
            </div>

            {/* RIGHT: Building Image Section - Responsive */}
            <div className="relative flex items-center justify-center lg:justify-end p-4 sm:p-6 lg:p-0">
              {/* Main building image container */}
              <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none lg:w-full lg:h-full">
                <div className="relative aspect-[785/667] lg:absolute lg:inset-0">
                  <Image
                    src="/images/building-1.png"
                    alt="Modern Property"
                    fill
                    className="object-contain lg:object-cover"
                    style={{
                      filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.15))",
                    }}
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 785px"
                  />
                </div>

                {/* Floating Stats Cards - Responsive positioning */}

                {/* Happy Investors Card */}
                <div className="absolute bottom-4 sm:bottom-8 lg:bottom-16 left-2 sm:left-4 lg:left-8 bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-3 sm:p-4 lg:p-5 z-30 transform scale-75 sm:scale-90 lg:scale-100">
                  <div
                    className="text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-600 mb-1"
                    style={{ fontFamily: "Poppins" }}
                  >
                    500+
                  </div>
                  <div
                    className="text-xs sm:text-sm text-gray-600 font-medium"
                    style={{ fontFamily: "Poppins" }}
                  >
                    Happy Investors
                  </div>
                </div>

                {/* Properties Sold Card */}
                <div className="absolute top-4 sm:top-6 lg:top-8 right-2 sm:right-4 lg:right-8 bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-3 sm:p-4 lg:p-5 z-30 transform scale-75 sm:scale-90 lg:scale-100">
                  <div
                    className="text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-600 mb-1"
                    style={{ fontFamily: "Poppins" }}
                  >
                    ₹50Cr+
                  </div>
                  <div
                    className="text-xs sm:text-sm text-gray-600 font-medium"
                    style={{ fontFamily: "Poppins" }}
                  >
                    Properties Sold
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
