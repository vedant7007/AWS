import HeroSection from "@/components/hero/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import CoursesSection from "@/components/sections/CoursesSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import JoinCTA from "@/components/sections/JoinCTA";
import FAQSection from "@/components/sections/FAQSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <CoursesSection />
      <BenefitsSection />
      <AchievementsSection />
      <TestimonialsSection />
      <JoinCTA />
      <FAQSection />
    </>
  );
}
