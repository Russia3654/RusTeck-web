import CircuitBackground from "@/components/CircuitBackground";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import PricingPreview from "@/components/PricingPreview";

export default function Home() {
  return (
    <main>
      <CircuitBackground />
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <PricingPreview />
      <Footer />
    </main>
  );
}