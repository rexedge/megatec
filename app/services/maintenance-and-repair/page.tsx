import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { WhatsappButton } from "@/components/ui/whatsapp-button";
import { ContactSection } from "@/components/sections/contact-section";
import { IncludedList } from "@/components/sections/included-list";
import { ServiceHero } from "@/components/sections/service-hero";
import { SUPPORT_EMAIL } from "@/lib/contact";

/**
 * Copy is verbatim from the Services Pages document, "Sub-page: Maintenance &
 * Repair" (punch list SV-07). The warranty line follows SW-08: one year on fuel,
 * LPG and CNG dispensers, and "comes with a warranty" for everything else.
 */
export const metadata: Metadata = {
  title: "Maintenance & Repair Nigeria | MEGA-TEC",
  description:
    "Certified maintenance and repair for fuel, LPG, CNG and EV equipment. Nationwide technicians, all spare parts stocked, 1-year warranty on dispensers.",
};

const INCLUDED = [
  "Maintenance contracts available on request, at a separate cost",
  "Technicians available nationwide, not just Lagos",
  "All MEGA-TEC dispenser spare parts stocked and available",
  "1-year warranty on all fuel, LPG and CNG dispensers. EV chargers and other MEGA-TEC equipment also come with a warranty.",
];

export default function MaintenanceAndRepairPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Maintenance & Repair" },
        ]}
      />

      <ServiceHero
        title="Certified maintenance and repair, wherever your station is"
        description="Certified technicians providing comprehensive maintenance and swift repairs, ensuring the longevity and reliability of your equipment. We stock the spare parts our dispensers run on, so a breakdown is never a long wait."
        image="/images/landing/rectangle-maintenance.png"
        imageAlt="Technicians servicing fuel dispenser equipment"
      />

      <section className="py-6 sm:pt-0 sm:pb-16 lg:pb-20">
        <Container>
          <div className="max-w-3xl">
            <IncludedList items={INCLUDED} />
          </div>

          <div className="mt-8">
            <WhatsappButton
              variant="leaf"
              message="Hi MEGA-TEC, I'd like to discuss maintenance and repair."
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
