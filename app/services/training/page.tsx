import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { WhatsappButton } from "@/components/ui/whatsapp-button";
import { ContactSection } from "@/components/sections/contact-section";
import { ServiceHero } from "@/components/sections/service-hero";

/**
 * Copy is verbatim from the Services Pages document, "Sub-page: Training &
 * Capacity Building" (punch list SV-08). The document is explicit: do not state a
 * certificate of completion, a module list, a duration or a format, because
 * Mega-Tec has not confirmed any of them. Add them only if Mega-Tec supplies
 * real detail.
 */
export const metadata: Metadata = {
  title: "Training & Capacity Building Nigeria | MEGA-TEC",
  description:
    "MEGA-TEC trains station operators to use and maintain fuel, LPG, CNG and EV equipment safely and effectively.",
};

export default function TrainingPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Training & Capacity Building" },
        ]}
      />

      <ServiceHero
        title="Training your team to get the most from your equipment"
        description="New equipment is only as good as the people running it. MEGA-TEC trains station operators to use, maintain and troubleshoot their equipment safely and effectively, so your team is confident from day one."
        image="/images/landing/rectangle-training.png"
        imageAlt="Station operators in a training session"
      />

      <section className="py-6 sm:pt-0 sm:pb-16 lg:pb-20">
        <Container>
          <WhatsappButton
            variant="leaf"
            message="Hi MEGA-TEC, I'd like to discuss training for my station team."
          >
            Talk to Our Team on WhatsApp
          </WhatsappButton>
        </Container>
      </section>

      <ContactSection buttonLabel="Talk to Our Team on WhatsApp" />
    </>
  );
}
