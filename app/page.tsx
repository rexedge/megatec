import { Hero } from "@/components/sections/hero";
import { ProductsSection } from "@/components/sections/products-section";
import { ServicesSection } from "@/components/sections/services-section";
import { WorkflowSection } from "@/components/sections/workflow-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { StatsCta } from "@/components/sections/stats-cta";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductsSection />
      <ServicesSection />
      <WorkflowSection />
      <ProjectsSection />
      <StatsCta />
      <ContactSection />
    </>
  );
}
