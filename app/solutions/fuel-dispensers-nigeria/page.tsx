import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, productsJsonLd } from "@/components/ui/json-ld";
import { absoluteUrl } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { RangeLink } from "@/components/ui/range-link";
import { SpecSheetButton } from "@/components/ui/spec-sheet-button";
import { ProductHero } from "@/components/sections/product-hero";
import { ProductCard } from "@/components/sections/product-card";
import { TrustSection } from "@/components/sections/trust-bar";
import { LandingProjects } from "@/components/sections/landing-projects";
import { LandingForm } from "@/components/sections/landing-form";
import { ShieldIcon, PinIcon, WrenchIcon, AwardIcon } from "@/components/icons/badge-icons";
import { catalogueHref, productsIn } from "@/lib/catalogue";

/** Copy is from the Landing Page Copy document, LP1 (punch list LF-01 to LF-03). */
export const metadata: Metadata = {
  title: "Fuel Dispensers Nigeria | Supply, Installation & Calibration | MEGA-TEC",
  description:
    "MEGA-TEC assembles, installs and calibrates fuel dispensers for Nigerian stations and depots. Tested before delivery. Spare parts always available. Nationwide support.",
};

const TRUST = [
  "SON-Certified & NMDPRA-Compliant Installations",
  "1,500+ Stations Equipped Nationwide",
  "NMDPRA-Certified Calibration & Metering",
  "Assembled & Tested in Nigeria, Spare Parts Always Available",
];

/** The six best sellers, with the document's own spec lines. Card 1 is the best seller. */
const FEATURED = [
  {
    id: "mt-plus-single-tb",
    name: "MT PLUS – Single Nozzle (TB)",
    specs: [
      "Flow rate: 5–50 L/min · ±0.3% accuracy",
      "Bennett meter · Tokheim unit",
      "Single nozzle · PMS, AGO or DPK",
    ],
  },
  {
    id: "mt-pro-double-tb-d1",
    name: "MT PRO – Double Nozzle (TB-D1)",
    specs: [
      "Flow rate: 5–50 L/min · ±0.3% accuracy",
      "Bennett meter · Tokheim unit",
      "Serves two vehicles · PMS, AGO or DPK",
    ],
  },
  {
    id: "mt-pro-single-tt",
    name: "MT PRO – Single Nozzle (TT)",
    specs: [
      "Flow rate: 5–50 L/min · ±0.3% accuracy",
      "Tokheim meter & unit",
      "Single nozzle · PMS, AGO or DPK",
    ],
  },
  {
    id: "mt-plus-single-bb",
    name: "MT PLUS – Single Nozzle (BB)",
    specs: [
      "Flow rate: 5–50 L/min · ±0.3% accuracy",
      "Bennett meter & unit",
      "7-yr memory · 10-min backup",
    ],
  },
  {
    id: "mt-plus-submersible-double",
    name: "MT PLUS SUBMERSIBLE – Double Nozzle",
    specs: [
      "For submersible (STP) systems · ±0.3% accuracy",
      "Bennett meter · solenoid valve · CPU control",
      "Double nozzle · PMS, AGO or DPK",
    ],
  },
  {
    id: "gear-pump-single",
    name: "GEAR PUMP – Single Nozzle (High Flow)",
    specs: [
      "High flow rate: 60–100 L/min · ±0.3% accuracy",
      "Self-priming gear pump · oil separator",
      "Single nozzle · built for depots",
    ],
  },
];

const WHY = [
  {
    icon: <WrenchIcon />,
    title: "Assembled & tested in Nigeria",
    text: "Every pump is checked and working before it leaves us.",
  },
  {
    icon: <PinIcon />,
    title: "Spare parts always available",
    text: "Parts are sold openly here, so your pump is never stranded.",
  },
  {
    icon: <AwardIcon />,
    title: "Any engineer can fix it",
    text: "You are not tied to one supplier for repairs.",
  },
  {
    icon: <ShieldIcon />,
    title: "We answer after installation",
    text: "Response within 24 hours. 1-year warranty on every dispenser. Branches nationwide.",
  },
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
    image: "/images/projects/nepal-energies.jpg",
    imagePosition: "top",
  },
  // No photo yet: Sterling's is still to be supplied, so the card is text only.
  {
    title: "Sterling Oil & Gas, Lagos, Akwa Ibom & PH",
    description:
      "Dispenser supply with professionally handled installation and calibration, operating efficiently since commissioning.",
  },
];

export default function FuelDispensersPage() {
  const catalogue = productsIn("fuel-dispensers");
  const featured = FEATURED.map((item) => {
    const product = catalogue.find((entry) => entry.id === item.id);
    if (!product) throw new Error(`Unknown fuel dispenser: ${item.id}`);
    return { ...item, product };
  });

  return (
    <>
      {productsJsonLd(featured.map(({ product, name, specs }) => ({ name, description: specs.join(". "), image: product.image, path: "/solutions/fuel-dispensers-nigeria" })), absoluteUrl).map((data) => (
        <JsonLd key={data.name} data={data} />
      ))}
      <ProductHero
        eyebrow="Nigeria's No. 1 in Fuel & LPG dispensing"
        title="Reliable fuel dispensers for Nigerian filling stations"
        description="Supply, installation, calibration and after-sales support. Assembled and tested in Nigeria. SON-certified. Available nationwide."
        image="/images/installations/nepal-umuola-forecourt-1.jpg"
        imageAlt="MEGA-TEC fuel dispensers installed at a Nepal Energies filling station in Umuola"
        whatsappMessage="Hi MEGA-TEC, I'd like to discuss a fuel dispenser project."
        whatsappLabel="Discuss Your Project on WhatsApp"
        extra={
          <Link
            href="/projects"
            className="text-white/90 underline underline-offset-4 hover:text-white"
          >
            View Our Installations →
          </Link>
        }
      />

      <TrustSection items={TRUST} />

      <section className="py-6 sm:py-20 lg:py-28">
        <Container>
          <div className="text-center">
            <h2 className="text-ink text-4xl font-semibold tracking-tight lg:text-5xl">
              Best selling dispensers
            </h2>
            <p className="text-body mx-auto mt-4 max-w-2xl text-lg">
              Our best-selling dispensers for Nigerian stations and depots, assembled, tested and
              calibrated before delivery, with a 1-year warranty.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 min-[320px]:grid-cols-2 sm:mt-14 sm:gap-8">
            {featured.map(({ product, name, specs }, index) => (
              <ProductCard
                key={product.id}
                image={product.image}
                title={name}
                specs={specs}
                bestSeller={index === 0}
                nmdpra={index > 0}
                whatsappMessage={`Hi MEGA-TEC, I'd like to enquire about the ${name} fuel dispenser.`}
                specSheetHref={product.specSheet ? `/spec-sheets/${product.specSheet}` : undefined}
              />
            ))}
          </div>

          <RangeLink href={catalogueHref("fuel-dispensers")}>
            See Our Full Fuel Dispenser Range
          </RangeLink>
        </Container>
      </section>

      <section className="py-6 sm:py-20 lg:py-28">
        <Container className="max-w-3xl">
          <h2 className="text-ink text-4xl font-semibold tracking-tight text-balance lg:text-5xl">
            A poorly calibrated dispenser costs your station money every single day
          </h2>
          <p className="text-body mt-6 text-lg leading-relaxed">
            Meter inaccuracy is revenue leaking out of your tanks. Even a 2% meter error on a busy
            station represents significant daily loss, multiplied across every nozzle, every
            shift.
          </p>
          <p className="text-body mt-4 text-lg leading-relaxed">
            Beyond lost revenue, NMDPRA sanctions for non-compliant equipment can escalate to
            licence review, a threat no station owner can afford to ignore.
          </p>
          <p className="text-ink mt-8 text-xl font-medium tracking-tight">
            Every MEGA-TEC dispenser is calibrated before delivery and checked again on-site, so
            every litre is a litre you&apos;re paid for. Our calibration and metering process is
            NMDPRA-certified.
          </p>
        </Container>
      </section>

      <section className="bg-surface-soft/60 py-6 sm:py-20 lg:py-28">
        <Container>
          <h2 className="text-ink max-w-3xl text-4xl font-semibold tracking-tight text-balance lg:text-5xl">
            One bad part should never turn your pump into scrap
          </h2>
          <p className="text-body mt-6 max-w-3xl text-lg leading-relaxed">
            Many imported pumps get abandoned the day one part fails, and the brand that made it
            has stopped producing spare parts. MEGA-TEC is different. We assemble and test our
            pumps here in Nigeria, using parts that any engineer in this country can find and
            fix.
          </p>
          <ul className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6">
            {WHY.map((item) => (
              <li key={item.title} className="flex gap-4 rounded-2xl bg-white p-6">
                <span className="bg-accent-soft text-ink flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                  {item.icon}
                </span>
                <div>
                  <p className="text-ink text-lg font-medium tracking-tight">{item.title}</p>
                  <p className="text-body mt-1">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-6 sm:py-20 lg:py-28">
        <Container className="text-center">
          <h2 className="text-ink text-4xl font-semibold tracking-tight lg:text-5xl">
            Our installation process
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:mt-16 sm:grid-cols-3 sm:gap-12">
            {INSTALL_STEPS.map((step, index) => (
              <div key={step.title} className="flex flex-col items-center gap-4">
                <span className="bg-accent text-ink flex h-12 w-12 items-center justify-center rounded-full text-lg font-semibold">
                  {index + 1}
                </span>
                <div>
                  <p className="text-ink text-xl font-medium tracking-tight">{step.title}</p>
                  <p className="text-body mt-2">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-surface-soft/60 py-6 sm:py-20 lg:py-28">
        <Container className="flex flex-col items-center text-center">
          <h2 className="text-ink text-3xl font-semibold tracking-tight lg:text-4xl">
            Get the full dispenser specifications
          </h2>
          <SpecSheetButton
            href="/spec-sheets/Fuel_Range_Comparison.pdf"
            description="Compare fuel dispensers, gear pumps, submersibles and compact units at a glance."
            className="mt-6"
          >
            Download Specifications ↓
          </SpecSheetButton>
        </Container>
      </section>

      <LandingProjects heading="Trusted by Nigeria's serious fuel operators" projects={PROJECTS} />

      <LandingForm
        heading="Ready to set up your station? Let's talk."
        buttonLabel="Discuss Your Project on WhatsApp"
        needKey="need"
        template="Hi MEGA-TEC, my name is {name}. I'm interested in {need}. Please call me on {phone}."
        fields={[
          { key: "name", label: "Your Name", required: true, placeholder: "Enter your name" },
          {
            key: "phone",
            label: "Phone Number",
            required: true,
            placeholder: "e.g. 0803 123 4567",
          },
          {
            key: "need",
            label: "Tell us what you need",
            required: true,
            placeholder: "e.g. four double-nozzle dispensers for a new station",
          },
        ]}
      />
    </>
  );
}
