import dynamic from "next/dynamic";
import { Header } from "@/components/layout/header";
import { HeroSection } from "@/components/sections/hero-section";

// Lazy loaded components (Below-the-fold)
const LogoCarousel = dynamic(
  () => import("@/components/ui/logo-carousel").then(mod => ({ default: mod.LogoCarousel })),
  { ssr: true }
);

const AnimatedSection = dynamic(
  () => import("@/components/ui/animated-section").then(mod => ({ default: mod.AnimatedSection })),
  { ssr: true }
);

const WorkSection = dynamic(
  () => import("@/components/sections/work-section").then(mod => ({ default: mod.WorkSection })),
  { ssr: true }
);

const ExperienceSection = dynamic(
  () => import("@/components/sections/experience-section").then(mod => ({ default: mod.ExperienceSection })),
  { ssr: true }
);

const AboutSection = dynamic(
  () => import("@/components/sections/about-section").then(mod => ({ default: mod.AboutSection })),
  { ssr: true }
);

const ContactSection = dynamic(
  () => import("@/components/sections/contact-section").then(mod => ({ default: mod.ContactSection })),
  { ssr: true }
);

const Footer = dynamic(
  () => import("@/components/layout/footer").then(mod => ({ default: mod.Footer })),
  { ssr: true }
);

// Componente da página inicial
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
