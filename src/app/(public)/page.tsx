import ContactSection from "@/components/home/Contact";
import { FeaturedListings } from "@/components/home/FeaturedListings";
import Hero from "@/components/home/Hero";
import ProcessSection from "@/components/home/ProcessSection";
import { PropertyTypes } from "@/components/home/PropertyTypes";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { getAllProperties } from "@/lib/firestore";

export default async function Home() {
  const properties = await getAllProperties();

  return (
    <>
      <Hero />
      <ProcessSection />
      <FeaturedListings properties={properties} />
      <section className="relative w-full py-0 md:py-8 overflow-hidden">
        <video
          className="w-full object-cover max-h-[680px] rounded-xl shadow-md"
          src="/videos/drone-farrukhnagar.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </section>
      <WhyChooseUs />
      <PropertyTypes />
      <ContactSection />
    </>
  );
}
