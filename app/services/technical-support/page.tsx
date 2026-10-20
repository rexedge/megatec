import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { WhatsappButton } from "@/components/ui/whatsapp-button";
import { ContactSection } from "@/components/sections/contact-section";
import { IncludedList } from "@/components/sections/included-list";
import { ServiceHero } from "@/components/sections/service-hero";
import { SUPPORT_EMAIL } from "@/lib/contact";

/**
 * Copy is verbatim from the Services Pages document, "Sub-page: Technical Support
 * & Troubleshooting" (punch list SV-06). The document says not to add "remote
 * diagnostics", which Mega-Tec has not confirmed, or any 24/7 line: support is 8am
 * to 5pm, Monday to Saturday.
 */
export const metadata: Metadata = {
  title: "Technical Support Nigeria | MEGA-TEC",
  description:
    "Fast technical support and troubleshooting for MEGA-TEC equipment across Nigeria. Response within 24 hours.",
};

const INCLUDED = [
  "Response within 24 hours",
  "Support available 8am to 5pm, Monday to Saturday",
  "Nationwide technician coverage",
];

export default function TechnicalSupportPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Technical Support & Troubleshooting" },
        ]}
      />

      <ServiceHero
        title="Technical support that responds within 24 hours"
        description="When something goes wrong, you need answers fast. Our technical team responds within 24 hours, with technicians based nationwide so help is never far away."
        image="/images/landing/rectangle-technical-support.png"
        imageAlt="Technicians reviewing a fault on a dispenser"
      />

      <section className="py-6 sm:pt-0 sm:pb-16 lg:pb-20">
        <Container>
          <div className="max-w-3xl">
            <IncludedList items={INCLUDED} />
          </div>

          <div className="mt-8">
            <WhatsappButton
              variant="leaf"
              message="Hi MEGA-TEC, I'd like to talk to your technical support team."
            >
              Talk to Our Team on WhatsApp
            </WhatsappButton>
          </div>
        </Container>
      </section>

      <ContactSection email={SUPPORT_EMAIL} buttonLabel="Talk to Our Team on WhatsApp" />
    </>
  );
}
