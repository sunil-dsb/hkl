import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import Footer from "@/components/layout/Footer";
import Announcement from "@/components/common/Announcement";
import FooterCta from "@/components/layout/FooterCta";
import Faqs from "@/components/home/Faqs";
import FoundingMembers from "@/components/home/FoundingMembers";
import ThoughtCard from "@/components/home/ThoughtCard";
import StoriesOfImpact from "@/components/home/StoriesOfImpact";
import TimelineSection from "@/components/home/TimelineSection";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <div className="absolute top-0 left-0 w-full z-20">
        <Announcement />
      </div>
      <HeroSection />

      {/* REST OF PAGE */}
      <div>
        <AboutSection />
        <StoriesOfImpact />
        <ThoughtCard />
        <FoundingMembers />
        <Faqs />
        <FooterCta />
        <Footer />
      </div>
    </main>
  );
}
