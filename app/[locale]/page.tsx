import { Header } from "@/components/layout/header";
import { Hero } from "@/components/sections/hero";
import { LogoCarousel } from "@/components/ui/logo-carousel";
import { AnimatedSection } from "@/components/ui/animated-section";
import { WorkSection } from "@/components/sections/work-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { AboutSection } from "@/components/sections/about-section";
import { Footer } from "@/components/layout/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />

        {/* Carrossel aparece APÓS o hero, só visível com scroll */}
        <AnimatedSection className="px-6 pb-16 lg:px-8">
          <div className="mx-auto w-full max-w-6xl">
            <LogoCarousel />
          </div>
        </AnimatedSection>

        <WorkSection />
        <ExperienceSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}
