import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { RangeLink } from "@/components/ui/range-link";
import { SpecSheetButton } from "@/components/ui/spec-sheet-button";
import { ProductHero } from "@/components/sections/product-hero";
import { ProductCard } from "@/components/sections/product-card";
import { ContactSection } from "@/components/sections/contact-section";
import { ShieldIcon, PinIcon, WrenchIcon, AwardIcon } from "@/components/icons/badge-icons";
import { catalogueHref, productsIn } from "@/lib/catalogue";

export const metadata: Metadata = {
  title: "Station Accessories | Megatec",
  description:
    "Nozzles, hoses, meters, filters, valves, motors and control boards for Nigerian filling stations — genuine Megatec spares, held in stock and shipped nationwide.",
};

const BADGES = [
  { label: "Genuine Parts, Not Copies", icon: <ShieldIcon /> },
  { label: "Held in Stock in Lagos", icon: <PinIcon /> },
  { label: "Fitted by Certified Technicians", icon: <WrenchIcon /> },
  { label: "Supplied Nationwide", icon: <AwardIcon /> },
];

const HIGHLIGHT_IDS = [
  "auto-shutoff-nozzle",
  "dispensing-hose",
  "bennett-meter",
  "dispenser-filter",
  "fuel-solenoid-valve",
  "complete-panel-mt2",
];

const CATEGORIES = [
  {
    title: "Nozzles, hoses & reels",
    description:
      "Everything the customer touches — automatic shut-off nozzles, fuel-resistant hoses, holders and retractable reels.",
  },
  {
    title: "Meters & flow measurement",
    description:
      "Bennett and Tokheim metering units, 2-inch and 3-inch bulk flow meters, totalizers and calibration measures.",
  },
  {
    title: "Filters & valves",
    description:
      "Inline dispenser filters, Bennett elements, fuel solenoid valves, submersible shut-off valves and LPG safety valves.",
  },
  {
    title: "Electronics & control",
    description:
      "Displays, preset boards, power boards, CPU looms and complete drop-in control panels for MT PLUS, MT PRO and MT2.",
  },
];

const WHY = [
  {
    title: "Downtime costs more than the part",
    description:
      "A dispenser out of service is revenue standing still. We hold the fast-moving items so a failed nozzle or board is a same-week fix, not a shipping-container wait.",
  },
  {
    title: "Counterfeit parts fail calibration",
    description:
      "Copy meters and boards drift out of tolerance quickly, and a drifting meter is an NMDPRA problem as well as a revenue one. Everything we supply is the genuine part.",
  },
  {
    title: "Fitted properly, or supplied to your team",
    description:
      "Our technicians can install and recalibrate on site, or we can ship the part to your own maintenance team with the fitting notes.",
  },
];

export default function StationAccessoriesPage() {
  const products = productsIn("station-accessories");
  const highlights = HIGHLIGHT_IDS.map((id) => {
    const product = products.find((item) => item.id === id);
    if (!product) throw new Error(`Unknown station accessory: ${id}`);
    return product;
  });

  return (
    <>
      <ProductHero
        title="Station accessories and genuine spare parts, held in stock"
        description="Nozzles, hoses, meters, filters, valves, motors and control boards for fuel, LPG and CNG dispensers — supplied nationwide and fitted by certified technicians."
        image="/images/products/station-accessories-hero.png"
        imageAlt="Megatec dispenser control boards, displays and components"
        whatsappMessage="Hi Megatec, I'd like to enquire about station accessories and spare parts."
        whatsappLabel="Discuss your parts list on WhatsApp"
        badges={BADGES}
      />

      <section className="py-20 lg:py-28">
        <Container>
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-ink lg:text-5xl">
              What we stock
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-body">
              Comprehensive station accessories to enhance functionality and safety.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-2">
            {CATEGORIES.map((item, index) => (
              <div key={item.title} className="flex gap-5">
                <span className="bg-accent text-ink flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-semibold">
                  {index + 1}
                </span>
                <div>
                  <p className="text-ink text-lg font-medium tracking-tight">{item.title}</p>
                  <p className="text-body mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-surface-soft/60 py-20 lg:py-28">
        <Container>
          <div className="text-center">
            <h2 className="text-ink text-4xl font-semibold tracking-tight lg:text-5xl">
              Fast-moving parts
            </h2>
            <p className="text-body mx-auto mt-4 max-w-2xl text-lg">
              The items our customers replace most often — send us your list and we&apos;ll
              confirm availability the same day.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((product) => (
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

          <RangeLink href={catalogueHref("station-accessories")}>
            See full accessories range
          </RangeLink>
        </Container>
      </section>

      <section className="bg-navy py-20 lg:py-28">
        <Container>
          <h2 className="text-navy-text max-w-4xl text-3xl font-semibold tracking-tight lg:text-4xl">
            The wrong spare part is more expensive than the right one
          </h2>
          <div className="mt-12 flex flex-col gap-4">
            {WHY.map((item, index) => (
              <div
                key={item.title}
                className="flex items-start gap-5 rounded-2xl bg-white p-6 lg:p-7"
              >
                <span className="bg-sky flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <div>
                  <p className="text-ink text-lg font-medium tracking-tight">{item.title}</p>
                  <p className="text-body mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 lg:py-28">
        <Container className="flex flex-col items-center text-center">
          <h2 className="text-ink text-3xl font-semibold tracking-tight lg:text-4xl">
            Download product specifications
          </h2>
          <p className="text-body mt-4 max-w-xl">
            Download the technical datasheet for the dispensers these parts are built for.
          </p>
          <SpecSheetButton
            href="/spec-sheets/MT_PLUS_Single_Nozzle_TB.pdf"
            description="Download the full technical datasheet for our dispenser range."
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
