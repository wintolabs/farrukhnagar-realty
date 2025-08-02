import Contact from "@/components/home/Contact";
import DroneVideo from "@/components/home/DroneVideo";
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
      <PropertyTypes />
      <WhyChooseUs />
      <ProcessSection />
      <FeaturedListings properties={properties} />
      <DroneVideo />
      <Contact />
    </>
  );
}
