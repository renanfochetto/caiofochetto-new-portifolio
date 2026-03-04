import { Header } from "@/components/layout/header";
import { HeroSection } from "@/components/sections/hero-section";
import { LogoCarousel } from "@/components/ui/logo-carousel";
import { AnimatedSection } from "@/components/ui/animated-section";
import { WorkSection } from "@/components/sections/work-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { Footer } from "@/components/layout/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main id="main-content">
        <HeroSection />
        <AnimatedSection className="px-6 pb-16 lg:px-8">
          <div className="mx-auto w-full max-w-6xl">
            <LogoCarousel />
          </div>
        </AnimatedSection>
        <WorkSection />
        <ExperienceSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
