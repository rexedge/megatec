import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { WhatsappButton } from "@/components/ui/whatsapp-button";
import { TrustBar } from "@/components/sections/trust-bar";
import { SparePartsList } from "@/components/sections/spare-parts-list";
import { ContactSection } from "@/components/sections/contact-section";

/**
 * Copy is from the Product Catalogue document, "Station Accessories" and its
 * Spare Parts sub-category (punch list PA-01): the spare parts list is the
 * category page, with no sub-category page of its own.
 */
export const metadata: Metadata = {
  title: "Dispenser Spare Parts Nigeria | Meters, Boards, Valves & Nozzles | MEGA-TEC",
  description:
    "Browse MEGA-TEC's spare parts for fuel, LPG and CNG dispensers, Bennett and Tokheim meters, CPUs, display boards, valves, motors, nozzles and hoses. Available nationwide.",
};

const TRUST = [
  "80+ Spare Parts Stocked",
  "Parts Openly Available, Never Monopolised",
  "Fits Fuel, LPG & CNG Dispensers",
  "Nationwide Supply & Support",
];

export default function StationAccessoriesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Station Accessories" }]} />

      <section className="py-6 sm:py-16 lg:py-20">
        <Container>
          <h1 className="text-ink max-w-4xl text-3xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Spare parts and accessories that keep your station running
          </h1>
          <p className="text-body mt-6 max-w-3xl text-lg leading-relaxed">
            A pump should never become scrap over one bad part. MEGA-TEC stocks the spare parts and
            accessories that keep fuel, LPG and CNG dispensers working, meters, boards, valves,
            motors, nozzles and more, all openly available and serviceable by any engineer in
            Nigeria.
          </p>
          <WhatsappButton
            variant="leaf"
            className="mt-8"
            message="Hi MEGA-TEC, I'd like to enquire about a spare part."
          >
            Enquire About Spare Parts on WhatsApp
          </WhatsappButton>
        </Container>
      </section>

      <section className="py-6 sm:pt-0 sm:pb-12">
        <Container>
          <TrustBar items={TRUST} />
        </Container>
      </section>

      <section className="py-6 sm:py-12 lg:py-16">
        <Container>
          <SparePartsList />
          <WhatsappButton
            variant="leaf"
            className="mt-10"
            message="Hi MEGA-TEC, I'd like to enquire about a spare part."
          >
            Enquire About Spare Parts on WhatsApp
          </WhatsappButton>
        </Container>
      </section>

      <ContactSection />
    </>
  );
}
