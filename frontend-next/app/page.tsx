import Header from "./components/Header";
import Footer from "./components/Footer";
import PinterestHero from "./components/PinterestHero";
import LandingInfoSection from "./components/LandingInfoSection";

export default function HomePage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Header is absolute in its definition, will overlap hero */}
      <Header />

      {/* Dynamic Pinterest Hero */}
      <PinterestHero />

      {/* Dynamic Info Sections below */}
      <LandingInfoSection />

      <Footer />
    </main>
  );
}
