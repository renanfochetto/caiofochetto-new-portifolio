import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { LogoCarousel } from "@/components/logo-carousel";
import { AnimatedSection } from "@/components/animated-section";
import { WorkSection } from "@/components/work-section";
import { ExperienceSection } from "@/components/experience-section";
import { AboutSection } from "@/components/about-section";
import { Footer } from "@/components/footer";

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