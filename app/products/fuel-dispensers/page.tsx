import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ProductHero } from "@/components/sections/product-hero";
import { ProductCard } from "@/components/sections/product-card";
import { ContactSection } from "@/components/sections/contact-section";
import { ShieldIcon, PinIcon, WrenchIcon, AwardIcon } from "@/components/icons/badge-icons";
import { cn } from "@/lib/cn";

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

const PRODUCTS = [
  {
    title: "MT PLUS – Single Nozzle (TB)",
    image: "/images/factory/mt-plus-single-tb/mt-plus-tb-3.png",
    specs: [
      "Flow rate: 5–50 L/min · ±0.3% accuracy",
      "Bennett meter · Tokheim unit",
      "Single nozzle · PMS, AGO or DPK",
    ],
    spec: "MT_PLUS_Single_Nozzle_TB.pdf",
    bestSeller: true,
  },
  {
    title: "MT PRO – Double Nozzle (TB-D1)",
    image: "/images/factory/mtr-pro-d1tb/mt-pro-d1-tb6.png",
    specs: [
      "Flow rate: 5–50 L/min · ±0.3% accuracy",
      "Bennett meter · Tokheim unit",
      "Serves two vehicles · PMS, AGO or DPK",
    ],
    spec: "MT_PRO_Double_Nozzle_TB_D1.pdf",
  },
  {
    title: "MT PRO – Single Nozzle (TT)",
    image: "/images/factory/mtr-pro-single/mtr-pro-single-5.png",
    specs: [
      "Flow rate: 5–50 L/min · ±0.3% accuracy",
      "Tokheim meter & unit",
      "Single nozzle · PMS, AGO or DPK",
    ],
    spec: "MT_PRO_Single_Nozzle_TT.pdf",
  },
  {
    title: "MT PLUS – Single Nozzle (BB)",
    image: "/images/factory/bb-single-mt-pro/bb-single-mt-pro-7.png",
    specs: [
      "Flow rate: 5–50 L/min · ±0.3% accuracy",
      "Bennett meter & unit",
      "7-yr memory · 10-min backup",
    ],
    spec: "MT_PLUS_Single_Nozzle_BB.pdf",
  },
  {
    title: "MT PLUS SUBMERSIBLE – Dual Nozzle",
    image: "/images/factory/submersible-mt-plus-d1/submersible-mt-plus-d1-2.png",
    specs: [
      "For submersible (STP) systems · ±0.3% accuracy",
      "Bennett meter · solenoid valve · CPU control",
      "Dual nozzle · PMS, AGO or DPK",
    ],
    spec: "MT_PLUS_Submersible_Double_Nozzle.pdf",
  },
  {
    title: "GEAR PUMP – Single Nozzle",
    image: "/images/factory/oil-dispenser/oil-dispenser-5.png",
    specs: [
      "High flow rate: 5–100 L/min · ±0.3% accuracy",
      "Self-priming gear pump · oil separator",
      "Single nozzle · built for depots",
    ],
    spec: "Gear_Pump_Single_Nozzle.pdf",
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

const TESTIMONIALS = [
  {
    quote:
      "300+ dispensers and 30 LPG units supplied across repeat contracts, delivering smoother operations and reduced downtime across their stations.",
    attribution: "Nepal Energies, Nationwide",
  },
  {
    quote:
      "24/7 technical assistance and proactive system monitoring ensure smooth operations and immediate troubleshooting.",
    attribution: "An electric charging station in Abuja",
  },
  {
    quote:
      "Dispenser supply with professionally handled installation and calibration, operating efficiently since commissioning.",
    attribution: "Sterling Oil & Gas, Lagos, Akwa Ibom & PH",
  },
];

export default function FuelDispensersPage() {
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
            {PRODUCTS.map((product) => (
              <div
                key={product.title}
                className={cn(
                  "rounded-2xl",
                  product.bestSeller && "ring-2 ring-leaf"
                )}
              >
                <ProductCard
                  image={product.image}
                  title={product.title}
                  specs={product.specs}
                  whatsappMessage={`Hi Megatec, I'd like to enquire about the ${product.title} fuel dispenser.`}
                  specSheetHref={`/spec-sheets/${product.spec}`}
                />
              </div>
            ))}
          </div>
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
          <Button href="/spec-sheets/MT_PLUS_Single_Nozzle_TB.pdf" variant="secondary" className="mt-6">
            Download product specs
          </Button>
        </Container>
      </section>

      <section className="pb-20 lg:pb-28">
        <Container>
          <p className="text-sm font-medium tracking-tight text-body">Our portfolio</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight text-ink lg:text-5xl">
            Real world projects
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {TESTIMONIALS.map((testimonial) => (
              <div
                key={testimonial.attribution}
                className="flex flex-col gap-6 rounded-2xl border border-border/70 p-8"
              >
                <p className="text-body leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
                <p className="mt-auto text-sm font-medium tracking-tight text-ink">
                  {testimonial.attribution}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <ContactSection />
    </>
  );
}
