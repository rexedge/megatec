import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ProductHero } from "@/components/sections/product-hero";
import { ProductCard } from "@/components/sections/product-card";
import { ContactSection } from "@/components/sections/contact-section";
import { ShieldIcon, PinIcon, WrenchIcon, AwardIcon } from "@/components/icons/badge-icons";

export const metadata: Metadata = {
  title: "LPG Solutions | Megatec",
  description:
    "Megatec supplies, installs and sets up LPG systems for gas plants and retail outlets in Nigeria — skid plants, storage tanks, dispensers and safety systems.",
};

const BADGES = [
  { label: "NMDPRA Safety Compliance Verified", icon: <ShieldIcon /> },
  { label: "500+ LPG Units Installed Nationwide", icon: <PinIcon /> },
  { label: "Calibration-Certified Technicians", icon: <WrenchIcon /> },
  { label: "Assembled & Tested in Nigeria", icon: <AwardIcon /> },
];

const SYSTEMS = [
  { title: "LPG skid plants", description: "Turnkey mini plant solutions." },
  { title: "LPG storage tanks", description: "Bulk & bullet tanks, all capacities." },
  { title: "LPG dispenser", description: "Retail & bulk dispenser units." },
  { title: "Safety valves & shutdowns", description: "Relief & emergency systems." },
];

const PRODUCTS = [
  {
    title: "LPG Dispenser – Single Nozzle",
    specs: [
      "Single nozzle · ±0.3% meter accuracy",
      "Air separator · standard meter",
      "7-yr memory · 10-min backup",
    ],
    spec: "LPG_Dispenser_Single_Nozzle.pdf",
    bestSeller: true,
  },
  {
    title: "LPG Dispenser – Double Nozzle",
    specs: [
      "Two nozzles · ±0.3% meter accuracy",
      "Dual meters · dual air separators",
      "7-yr memory · 10-min backup",
    ],
    spec: "LPG_Dispenser_Double_Nozzle.pdf",
  },
];

const WORKFLOW = [
  {
    title: "Site evaluation & layout planning",
    description: "We assess the site before any equipment decision is made.",
  },
  {
    title: "Equipment recommendation & proposal",
    description: "Sized and specified for your specific requirements.",
  },
  {
    title: "Supply & logistics coordination",
    description: "Equipment sourced and delivered to site.",
  },
  {
    title: "Installation & pressure testing",
    description: "Full pressure testing before product is introduced.",
  },
  {
    title: "Commissioning & NMDPRA sign-off",
    description: "Calibration, certification and regulatory documentation handled.",
  },
];

const TESTIMONIALS = [
  {
    quote: "30 LPG dispenser units supplied as part of a multi-contract partnership.",
    attribution: "Nepal Energies, Nationwide",
  },
  {
    quote:
      "24/7 technical assistance and proactive system monitoring ensure smooth operations and immediate troubleshooting.",
    attribution: "An electric charging station in Abuja",
  },
  {
    quote:
      "Cost-effective, transparent, and flexible pricing makes world-class fuel tech accessible to businesses of all sizes.",
    attribution: "Lagos Metro Fuel Hub",
  },
];

export default function LpgPage() {
  return (
    <>
      <ProductHero
        title="LPG dispensing systems for gas plants & retail outlets in Nigeria"
        description="From skid-mounted plants to retail dispenser setups, MEGA-TEC supplies, installs and sets up LPG systems that are safe, accurate and built to NMDPRA standards."
        image="/images/products/lpg-hero.png"
        imageAlt="Megatec LPG dispensing in Nigeria"
        whatsappMessage="Hi Megatec, I'd like to discuss an LPG systems project."
        whatsappLabel="Discuss your project on WhatsApp"
        badges={BADGES}
      />

      <section className="py-20 lg:py-28">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-ink lg:text-5xl">
              LPG systems we supply
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-body">
              Identify your requirement — tap any category below for details.
            </p>
          </div>
          <div className="mx-auto mt-14 flex max-w-4xl flex-col gap-4">
            {SYSTEMS.map((system, index) => (
              <div
                key={system.title}
                className="flex items-center gap-6 rounded-xl border border-border/70 p-6"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-lg font-semibold text-ink">
                  {index + 1}
                </span>
                <div>
                  <p className="text-lg font-medium tracking-tight text-ink">{system.title}</p>
                  <p className="mt-1 text-body">{system.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-surface-soft/60 py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {PRODUCTS.map((product) => (
              <div
                key={product.title}
                className={product.bestSeller ? "rounded-2xl ring-2 ring-leaf" : undefined}
              >
                <ProductCard
                  image="/images/landing/rectangle-lpg.png"
                  title={product.title}
                  specs={product.specs}
                  whatsappMessage={`Hi Megatec, I'd like to enquire about the ${product.title}.`}
                  specSheetHref={`/spec-sheets/${product.spec}`}
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 lg:py-28">
        <Container className="text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-ink lg:text-5xl">
            Deployment workflow
          </h2>
          <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
            {WORKFLOW.map((step, index) => (
              <div key={step.title} className="flex flex-col items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-base font-semibold text-ink">
                  {index + 1}
                </span>
                <p className="font-medium tracking-tight text-ink">{step.title}</p>
                <p className="text-sm text-body">{step.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-surface-soft/60 py-20 lg:py-28">
        <Container className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-ink lg:text-4xl">
            Download product specifications
          </h2>
          <p className="mt-4 max-w-xl text-body">
            Download the full technical datasheet for our LPG equipment range.
          </p>
          <Button href="/spec-sheets/LPG_Dispenser_Single_Nozzle.pdf" variant="secondary" className="mt-6">
            Download product specs
          </Button>
        </Container>
      </section>

      <section className="py-20 lg:py-28">
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
