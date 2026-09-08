import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { RangeLink } from "@/components/ui/range-link";
import { SpecSheetButton } from "@/components/ui/spec-sheet-button";
import { ProductHero } from "@/components/sections/product-hero";
import { ProductCard } from "@/components/sections/product-card";
import { ProductProjects } from "@/components/sections/product-projects";
import { ContactSection } from "@/components/sections/contact-section";
import { ShieldIcon, PinIcon, WrenchIcon, AwardIcon } from "@/components/icons/badge-icons";
import { catalogueHref, productsIn } from "@/lib/catalogue";

export const metadata: Metadata = {
  title: "Fuel Dispensers | Megatec",
  description:
    "Megatec supplies, installs, calibrates and supports fuel dispensers for Nigerian filling stations — SON-certified, NMDPRA-compliant, available nationwide.",
};

const BADGES = [
  { label: "SON-Certified & NMDPRA-Compliant Installations", icon: <ShieldIcon /> },
  { label: "1,500+ Stations Equipped Nationwide", icon: <PinIcon /> },
  { label: "Calibration-Certified Technicians", icon: <WrenchIcon /> },
  {
    label: "Assembled & Tested in Nigeria, Spare Parts Always Available",
    icon: <AwardIcon />,
  },
];

/** The six units featured on the landing page; the rest live in the catalogue. */
const FEATURED = [
  "mt-plus-single-tb",
  "mt-pro-double-tb-d1",
  "mt-pro-single-tt",
  "mt-plus-single-bb",
  "mt-plus-submersible-double",
  "gear-pump-single",
];

const INSTALL_STEPS = [
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

const PROJECTS = [
  {
    title: "Nepal Energies, Nationwide",
    description:
      "300+ dispensers and 30 LPG units supplied across repeat contracts, delivering smoother operations and reduced downtime across their stations.",
    image: "/images/factory/mt-plus-d1tt/mt-plus-d1tt-double-nozzle-2.png",
  },
  {
    title: "An electric charging station in Abuja",
    description:
      "24/7 technical assistance and proactive system monitoring ensure smooth operations and immediate troubleshooting.",
    image: "/images/landing/project-abuja-ev.png",
  },
  {
    title: "Sterling Oil & Gas, Lagos, Akwa Ibom & PH",
    description:
      "Dispenser supply with professionally handled installation and calibration, operating efficiently since commissioning.",
    image: "/images/factory/mt-pro-d2-bb/mt-pro-d2-bb-4.png",
  },
];

export default function FuelDispensersPage() {
  const catalogue = productsIn("fuel-dispensers");
  const featured = FEATURED.map((id) => {
    const product = catalogue.find((item) => item.id === id);
    if (!product) throw new Error(`Unknown fuel dispenser: ${id}`);
    return product;
  });

  return (
    <>
      <ProductHero
        title="Reliable fuel dispensers for Nigerian filling stations"
        description="Supply, installation, calibration and after-sales support. Assembled and tested in Nigeria. SON-certified. Available nationwide."
        image="/images/products/fuel-dispenser-hero.png"
        imageAlt="Megatec fuel dispenser at a Nigerian filling station"
        whatsappMessage="Hi Megatec, I'd like to discuss a fuel dispenser project."
        whatsappLabel="Discuss your project on WhatsApp"
        badges={BADGES}
      />

      <section className="py-20 lg:py-28">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-ink lg:text-5xl">
              Best selling dispensers
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-body">
              Our most trusted units for Nigerian filling stations and depots — tried, tested
              and NMDPRA-certified.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product) => (
              <ProductCard
                key={product.id}
                image={product.image}
                title={product.name}
                specs={product.specs}
                bestSeller={product.bestSeller}
                nmdpra={product.nmdpra}
                whatsappMessage={`Hi Megatec, I'd like to enquire about the ${product.name} fuel dispenser.`}
                specSheetHref={
                  product.specSheet ? `/spec-sheets/${product.specSheet}` : undefined
                }
              />
            ))}
          </div>

          <RangeLink href={catalogueHref("fuel-dispensers")}>See full product range</RangeLink>
        </Container>
      </section>

      <section className="py-20 lg:py-28">
        <Container className="max-w-3xl">
          <h2 className="text-4xl font-semibold tracking-tight text-ink lg:text-5xl">
            A poorly calibrated dispenser costs your station money every single day
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-body">
            Meter inaccuracy is revenue leaking out of your tanks. Even a 2% meter error on a
            busy station represents significant daily loss — multiplied across every nozzle,
            every shift. Beyond lost revenue, NMDPRA sanctions for non-compliant equipment can
            escalate to licence review — a threat no station owner can afford to ignore.
          </p>
          <p className="mt-8 text-xl font-medium tracking-tight text-ink">
            &mdash; &ldquo;Mega Tec&apos;s calibration service ensures every litre dispensed is
            accounted for — protecting your revenue and your licence.&rdquo;
          </p>
        </Container>
      </section>

      <section className="bg-surface-soft/60 py-20 lg:py-28">
        <Container className="text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-ink lg:text-5xl">
            Our installation process
          </h2>
          <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-3">
            {INSTALL_STEPS.map((step, index) => (
              <div key={step.title} className="flex flex-col items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-lg font-semibold text-ink">
                  {index + 1}
                </span>
                <div>
                  <p className="text-xl font-medium tracking-tight text-ink">{step.title}</p>
                  <p className="mt-2 text-body">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 lg:py-28">
        <Container className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-ink lg:text-4xl">
            Download product specifications
          </h2>
          <p className="mt-4 max-w-xl text-body">
            Download the full technical datasheet for our fuel dispenser range.
          </p>
          <SpecSheetButton
            href="/spec-sheets/MT_PLUS_Single_Nozzle_TB.pdf"
            description="Download the full technical datasheet for our fuel dispenser range."
            className="mt-6"
          >
            Download product specs
          </SpecSheetButton>
        </Container>
      </section>

      <ProductProjects projects={PROJECTS} />

      <ContactSection />
    </>
  );
}
