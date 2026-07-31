import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ProductHero } from "@/components/sections/product-hero";
import { ProductCard } from "@/components/sections/product-card";
import { ContactSection } from "@/components/sections/contact-section";
import { ShieldIcon, PinIcon, WrenchIcon, AwardIcon } from "@/components/icons/badge-icons";

export const metadata: Metadata = {
  title: "CNG Systems | Megatec",
  description:
    "Megatec supplies, installs and commissions complete CNG station infrastructure in Nigeria — compression, storage, dispensers, safety systems and NMDPRA compliance.",
};

const BADGES = [
  { label: "NMDPRA Compliant Installations", icon: <ShieldIcon /> },
  { label: "Full CNG Systems Integrator", icon: <AwardIcon /> },
  { label: "Calibration-Certified Technicians", icon: <WrenchIcon /> },
  { label: "Assembled & Tested in Nigeria", icon: <PinIcon /> },
];

const SYSTEM_COMPONENTS = [
  {
    title: "Gas supply & inlet connection",
    description: "Mega Tec handles sourcing and connection design.",
  },
  {
    title: "Compression system",
    description: "High-pressure compressors sized for your throughput.",
  },
  {
    title: "High & medium pressure storage cylinder banks",
    description: "Cylinder banks and storage tubes configured to your capacity.",
  },
  {
    title: "CNG dispenser units",
    description: "Accurate, calibrated, NMDPRA compliant.",
  },
  {
    title: "Safety & emergency shutdown systems",
    description: "Full pressure integrity and blowdown systems.",
  },
  {
    title: "Control & monitoring panel",
    description: "Operational oversight from day one.",
  },
  {
    title: "NMDPRA approval & documentation support",
    description: "Compliance managed throughout.",
  },
];

const CARD_IMAGES = [
  "/images/landing/rectangle-cng.png",
  "/images/products/cng-hero.png",
  "/images/landing/rectangle-installation.png",
];

const PRODUCTS = [
  {
    title: "CNG Dispenser",
    specs: [
      "Single or double-nozzle options",
      "Flow range 2 to 30 kg/min, ±0.5% accuracy",
      "Working pressure up to 25MPa",
    ],
    spec: "CNG_Dispenser_Single_Nozzle.pdf",
    bestSeller: true,
  },
  {
    title: "CNG Daughter Station",
    specs: [
      "Complete station that works without a gas pipeline",
      "Includes compressor, storage cylinders, dispensers, alarm and PLC control",
      "Receives, stores and dispenses gas brought in by truck",
    ],
    spec: "CNG_Daughter_Station.pdf",
  },
  {
    title: "CNG Storage Tubes (40ft)",
    specs: [
      "12-tube container, up to 7,800 Nm³ capacity under 25MPa",
      "Working pressure 20 to 25MPa, tested to 33.4MPa",
      "Built for a 20-year working life",
    ],
    spec: "CNG_Storage_Tubes_40ft.pdf",
  },
  {
    title: "CNG Vehicle Conversion Kit",
    specs: [
      "Converts petrol vehicles to run on CNG",
      "For fleets and individual vehicles",
      "Cuts running cost compared to petrol",
    ],
  },
  {
    title: "CNG Control & Monitoring Panel",
    specs: [
      "Industrial HMI display",
      "Remote connectivity option",
      "Multi-point alarm capability",
    ],
  },
];

const TRUST_POINTS = [
  "Pressure integrity testing standards on all installations.",
  "Emergency shutoff and blowdown systems as standard.",
  "Full NMDPRA compliance requirements for CNG stations.",
  "Certified installation technicians — not subcontracted labour.",
];

const AUDIENCES = [
  { title: "Filling station owners", description: "Adding CNG to an existing forecourt." },
  { title: "Fleet operators", description: "Building a private CNG refuelling facility." },
  { title: "New station investors", description: "CNG-first infrastructure from scratch." },
];

export default function CngPage() {
  return (
    <>
      <ProductHero
        title="CNG station infrastructure for Nigeria: supply, installation & technical consultation"
        description="As Nigeria moves quickly towards CNG, MEGA-TEC helps station investors and fleet operators build compliant, profitable CNG infrastructure from the ground up."
        image="/images/products/cng-hero.png"
        imageAlt="Megatec CNG filling station"
        whatsappMessage="Hi Megatec, I'd like to discuss a CNG station project."
        whatsappLabel="Discuss your CNG project on WhatsApp"
        badges={BADGES}
      />

      <section className="py-20 lg:py-28">
        <Container className="max-w-3xl">
          <h2 className="text-4xl font-semibold tracking-tight text-ink lg:text-5xl">
            Nigeria&apos;s CNG opportunity is here — and it&apos;s moving fast
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-body">
            The removal of petrol subsidy has transformed the economics of CNG almost
            overnight, making CNG far cheaper to run than petrol. With the government now
            backing CNG expansion and a rapidly growing fleet of CNG-converted buses, taxis
            and trucks already on Nigerian roads every month, demand for proper CNG refuelling
            stations is quickly rising.
          </p>
          <p className="mt-8 text-xl font-medium tracking-tight text-ink">
            &mdash; &ldquo;Mega Tec positions you ahead of this demand with infrastructure
            built to last.&rdquo;
          </p>
        </Container>
      </section>

      <section className="bg-surface-soft/60 py-20 lg:py-28">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-ink lg:text-5xl">
              What a complete CNG station requires
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-body">
              Mega Tec delivers the full system — not just the equipment.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-2">
            {SYSTEM_COMPONENTS.map((item, index) => (
              <div key={item.title} className="flex gap-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-lg font-semibold text-ink">
                  {index + 1}
                </span>
                <div>
                  <p className="text-lg font-medium tracking-tight text-ink">{item.title}</p>
                  <p className="mt-1 text-body">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 lg:py-28">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-ink lg:text-5xl">
              CNG equipment we supply &amp; install
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-body">
              Industrial infrastructure — enquire about the complete system.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((product, index) => (
              <div key={product.title} className={product.bestSeller ? "rounded-2xl ring-2 ring-leaf" : undefined}>
                <ProductCard
                  image={CARD_IMAGES[index % CARD_IMAGES.length]}
                  title={product.title}
                  specs={product.specs}
                  whatsappMessage={`Hi Megatec, I'd like to enquire about the ${product.title}.`}
                  specSheetHref={product.spec ? `/spec-sheets/${product.spec}` : undefined}
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-surface-soft/60 py-20 lg:py-28">
        <Container className="max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight text-ink lg:text-4xl">
            CNG infrastructure runs at very high pressure. There is no room for shortcuts.
          </h2>
          <ul className="mt-10 flex flex-col gap-6">
            {TRUST_POINTS.map((point, index) => (
              <li key={point} className="flex items-start gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-ink">
                  {index + 1}
                </span>
                <p className="pt-1 text-lg text-ink">{point}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-20 lg:py-28">
        <Container>
          <h2 className="text-center text-3xl font-semibold tracking-tight text-ink lg:text-4xl">
            Who this is for
          </h2>
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {AUDIENCES.map((audience) => (
              <div key={audience.title} className="text-center">
                <p className="text-xl font-medium tracking-tight text-ink">{audience.title}</p>
                <p className="mt-2 text-body">{audience.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20 lg:pb-28">
        <Container className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-ink lg:text-4xl">
            Download product specifications
          </h2>
          <p className="mt-4 max-w-xl text-body">
            Download the full technical datasheet for our CNG equipment range.
          </p>
          <Button href="/spec-sheets/CNG_Dispenser_Single_Nozzle.pdf" variant="secondary" className="mt-6">
            Download product specs
          </Button>
        </Container>
      </section>

      <ContactSection />
    </>
  );
}
