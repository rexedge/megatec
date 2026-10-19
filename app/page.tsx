import { Hero } from "@/components/sections/hero";
import { ProductsSection } from "@/components/sections/products-section";
import { ServicesSection } from "@/components/sections/services-section";
import { WhyMegaTec } from "@/components/sections/why-mega-tec";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { StatsCta } from "@/components/sections/stats-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductsSection />
      <ServicesSection />
      <WhyMegaTec />
      <TestimonialsSection />
      <ContactSection showBranches />
      <ProjectsSection />
      <StatsCta />
    </>
  );
}
