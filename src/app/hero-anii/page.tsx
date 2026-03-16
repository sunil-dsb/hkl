import Announcement from "@/components/common/Announcement";
import Faqs from "@/components/home/Faqs";
import FoundingMembers from "@/components/home/FoundingMembers";
import StoriesOfImpact from "@/components/home/StoriesOfImpact";
import ThoughtCard from "@/components/home/ThoughtCard";
import Footer from "@/components/layout/Footer";
import FooterCta from "@/components/layout/FooterCta";
import HeroAnimatedCenteredSection from "./HeroAnimatedCenteredSection";

export default function page() {
  return (
    <main className="relative min-h-screen">
      <div className="absolute left-0 top-0 z-20 w-full">
        <Announcement />
      </div>
      <HeroAnimatedCenteredSection />
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
