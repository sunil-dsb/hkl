import Announcement from "@/components/common/Announcement";
import Faqs from "@/components/home/Faqs";
import FoundingMembers from "@/components/home/FoundingMembers";
import StoriesOfImpact from "@/components/home/StoriesOfImpact";
import ThoughtCard from "@/components/home/ThoughtCard";
import Footer from "@/components/layout/Footer";
import FooterCta from "@/components/layout/FooterCta";
import HeroAnimatedSection from "./HeroAnimatedSection";

export default function page() {
  return (
    <main className="relative min-h-screen">
      <div className="absolute top-0 left-0 w-full z-20">
        <Announcement />
      </div>
      <HeroAnimatedSection />
      <div>
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
