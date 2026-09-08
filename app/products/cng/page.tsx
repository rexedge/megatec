import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { RangeLink } from "@/components/ui/range-link";
import { SpecSheetButton } from "@/components/ui/spec-sheet-button";
import { ProductHero } from "@/components/sections/product-hero";
import { ProductCard } from "@/components/sections/product-card";
import { ContactSection } from "@/components/sections/contact-section";
import {
  ShieldIcon,
  PinIcon,
  WrenchIcon,
  AwardIcon,
  BuildingIcon,
  TruckIcon,
  ChartIcon,
} from "@/components/icons/badge-icons";
import { catalogueHref, productsIn } from "@/lib/catalogue";

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

/** The units featured on the landing page; the rest live in the catalogue. */
const FEATURED = [
  "cng-dispenser-single",
  "cng-daughter-station",
  "cng-storage-tubes",
  "cng-conversion-kit",
  "cng-control-panel",
];

const TRUST_POINTS = [
  {
    title: "Pressure integrity testing standards on all installations.",
    description:
      "From wellhead to dispenser, Mega Tec manages gas sourcing and connection design.",
  },
  {
    title: "Emergency shutoff and blowdown systems as standard.",
    description: "Scalable compression for growing demand.",
  },
  {
    title: "Full NMDPRA compliance requirements for CNG stations.",
    description: "Optimized for your station's needs.",
  },
  {
    title: "Certified installation technicians — not subcontracted labour.",
    description: "Precise metering for accurate billing.",
  },
];

const AUDIENCES = [
  {
    title: "Filling station owners",
    description: "Adding CNG to an existing forecourt.",
    icon: <BuildingIcon />,
  },
  {
    title: "Fleet operators",
    description: "Building a private CNG refuelling facility.",
    icon: <TruckIcon />,
  },
  {
    title: "New station investors",
    description: "CNG-first infrastructure from scratch.",
    icon: <ChartIcon />,
  },
];

export default function CngPage() {
  const catalogue = productsIn("cng");
  const featured = FEATURED.map((id) => {
    const product = catalogue.find((item) => item.id === id);
    if (!product) throw new Error(`Unknown CNG product: ${id}`);
    return product;
  });

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
            {featured.map((product) => (
              <ProductCard
                key={product.id}
                image={product.image}
                title={product.name}
                specs={product.specs}
                bestSeller={product.bestSeller}
                nmdpra={product.nmdpra}
                whatsappMessage={`Hi Megatec, I'd like to enquire about the ${product.name}.`}
                specSheetHref={
                  product.specSheet ? `/spec-sheets/${product.specSheet}` : undefined
                }
              />
            ))}
          </div>

          <RangeLink href={catalogueHref("cng")}>See full CNG equipment range</RangeLink>
        </Container>
      </section>

      <section className="bg-navy py-20 lg:py-28">
        <Container>
          <h2 className="text-navy-text max-w-4xl text-3xl font-semibold tracking-tight lg:text-4xl">
            CNG infrastructure runs at very high pressure. There is no room for shortcuts.
          </h2>
          <ul className="mt-12 flex flex-col gap-4">
            {TRUST_POINTS.map((point, index) => (
              <li
                key={point.title}
                className="flex items-start gap-5 rounded-2xl bg-white p-6 lg:p-7"
              >
                <span className="bg-sky flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <div>
                  <p className="text-ink text-lg font-medium tracking-tight">{point.title}</p>
                  <p className="text-body mt-1">{point.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-surface-soft/60 py-20 lg:py-28">
        <Container>
          <h2 className="text-ink text-center text-3xl font-semibold tracking-tight lg:text-4xl">
            Who this is for
          </h2>
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {AUDIENCES.map((audience) => (
              <div
                key={audience.title}
                className="border-border/70 flex flex-col items-center gap-4 rounded-2xl border bg-white p-8 text-center"
              >
                <span className="bg-sky flex h-11 w-11 items-center justify-center rounded-full text-white">
                  {audience.icon}
                </span>
                <div>
                  <p className="text-ink text-xl font-medium tracking-tight">{audience.title}</p>
                  <p className="text-body mt-2">{audience.description}</p>
                </div>
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
          <SpecSheetButton
            href="/spec-sheets/CNG_Dispenser_Single_Nozzle.pdf"
            description="Download the full technical datasheet for our CNG equipment range."
            className="mt-6"
          >
            Download product specs
          </SpecSheetButton>
        </Container>
      </section>

      <ContactSection />
    </>
  );
}
