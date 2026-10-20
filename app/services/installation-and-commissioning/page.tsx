import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { WhatsappButton } from "@/components/ui/whatsapp-button";
import { ContactSection } from "@/components/sections/contact-section";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { ServiceHero } from "@/components/sections/service-hero";

/**
 * Copy is verbatim from the Services Pages document, "Sub-page: Installation &
 * Commissioning" (punch list SV-02 to SV-05, MO-03).
 */
export const metadata: Metadata = {
  title: "Installation & Commissioning Nigeria | MEGA-TEC",
  description:
    "Expert installation and commissioning of fuel, LPG, CNG and EV equipment across Nigeria. Site assessment, professional installation, full calibration and NMDPRA sign-off.",
};

const STEPS = [
  {
    title: "Site assessment & equipment recommendation",
    description: "We evaluate your site before any equipment decision is made.",
  },
  {
    title: "Supply & professional installation",
    description: "Certified technicians, industry-standard practices throughout.",
  },
  {
    title: "Calibration, testing & commissioning",
    description: "Full meter calibration and NMDPRA sign-off on completion.",
  },
];

export default function InstallationAndCommissioningPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Installation & Commissioning" },
        ]}
      />

      <ServiceHero
        title="Expert installation and setup, from site assessment to sign-off"
        description="Expert installation and setup of MEGA-TEC systems, ensuring seamless integration and peak performance from day one. Every project follows the same disciplined process, whether it's a single dispenser or a full station."
        image="/images/landing/rectangle-installation.png"
        imageAlt="Technicians installing a fuel dispenser on a forecourt"
      />

      <section className="py-6 sm:pt-0 sm:pb-16 lg:pb-20">
        <Container>
          <ProcessTimeline steps={STEPS} />

          <p className="bg-surface-soft text-body mt-10 max-w-3xl rounded-2xl p-6 text-lg leading-relaxed sm:mt-14 sm:p-8">
            <strong className="text-ink font-medium">Typical timeline:</strong> Project review and
            engineering design takes 2 to 3 days. Procurement, installation, electrical
            integration, testing, calibration, commissioning and operator training typically takes
            a further 3 to 7 days, depending on project scope.
          </p>

          <div className="mt-8">
            <WhatsappButton
              variant="leaf"
              message="Hi MEGA-TEC, I'd like to discuss installation and commissioning."
            >
              Talk to Our Team on WhatsApp
            </WhatsappButton>
          </div>
        </Container>
      </section>

      <ContactSection buttonLabel="Talk to Our Team on WhatsApp" />
    </>
  );
}
