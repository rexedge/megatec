import type { Metadata } from "next";
import { JsonLd, productsJsonLd } from "@/components/ui/json-ld";
import { absoluteUrl } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { RangeLink } from "@/components/ui/range-link";
import { SpecSheetButton, SpecSheetLink } from "@/components/ui/spec-sheet-button";
import { CheckIcon } from "@/components/ui/check-icon";
import { ProductHero } from "@/components/sections/product-hero";
import { TrustSection } from "@/components/sections/trust-bar";
import { EquipmentList } from "@/components/sections/equipment-list";
import { LandingForm } from "@/components/sections/landing-form";
import { BuildingIcon, TruckIcon, ChartIcon } from "@/components/icons/badge-icons";
import { catalogueHref, productsIn } from "@/lib/catalogue";

/** Copy is from the Landing Page Copy document, LP2 (punch list LC-01 to LC-03). */
export const metadata: Metadata = {
  title: "CNG Station Equipment Nigeria | Supply, Installation & Consultation | MEGA-TEC",
  description:
    "MEGA-TEC supplies and installs CNG station infrastructure in Nigeria, dispensers, daughter stations, storage and conversion kits. Built for the CNG transition. Talk to our technical team.",
};

const TRUST = [
  "Full CNG Systems Integrator",
  "NMDPRA-Compliant Installations",
  "NMDPRA-Certified Calibration & Metering",
  "Assembled & Tested in Nigeria",
];

const SYSTEM_COMPONENTS = [
  {
    title: "Gas supply & inlet connection",
    description: "We handle sourcing and connection design.",
  },
  {
    title: "Compression system",
    description: "High-pressure compressors sized for your throughput.",
  },
  {
    title: "High & medium pressure storage",
    description: "Cylinder banks and storage tubes configured to your capacity.",
  },
  {
    title: "CNG dispenser units",
    description: "Accurate, calibrated, NMDPRA-compliant.",
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

/** The five items, with the document's spec lines. Images come from the catalogue entry named by `id`. */
const EQUIPMENT = [
  {
    id: "cng-dispenser-single",
    title: "CNG Dispenser",
    bestSeller: true,
    specs: [
      "Single or double-nozzle options, serves one or two vehicles",
      "Flow range 2 to 30 kg/min, ±0.5% accuracy",
      "Working pressure up to 25MPa",
      "1-year warranty",
    ],
  },
  {
    id: "cng-daughter-station",
    title: "CNG Daughter Station (Skid Station)",
    specs: [
      "Complete station that works without a gas pipeline",
      "Includes compressor, storage cylinders, dispensers, alarm and PLC control",
      "Receives, stores and dispenses gas brought in by truck",
      "Comes with a warranty",
    ],
  },
  {
    id: "cng-storage-tubes",
    title: "CNG Storage Tube (40ft)",
    specs: [
      "12-tube container, up to 7,800 Nm³ capacity under 25MPa",
      "Working pressure 20 to 25MPa, tested to 33.4MPa",
      "Built for a 20-year working life",
      "Comes with a warranty",
    ],
  },
  {
    id: "cng-conversion-kit",
    title: "CNG Conversion Kit",
    specs: [
      "Converts petrol vehicles to run on CNG, and petrol still works too",
      "For fleets and individual vehicles",
      "Cuts running cost compared to petrol",
      "Includes pressure reducer, injectors, sensors, filler valve, gauge and fittings",
      "Pairs with 65L and 75L vehicle cylinders",
      "Comes with a warranty",
    ],
  },
  {
    id: "cng-cylinder-65l",
    title: "CNG Vehicle Cylinders (65L and 75L)",
    specs: [
      "65L and 75L water-capacity options, for on-board gas storage in cars",
      "Works with the MEGA-TEC CNG Conversion Kit",
      "200 bar (20MPa) working pressure, the standard for vehicle cylinders",
      "Full 65L holds about 16 cubic metres of gas, 75L about 19",
      "Comes with a warranty",
    ],
  },
];

const SAFETY = [
  "Pressure integrity testing on all installations.",
  "Emergency shutoff and blowdown systems fitted as standard.",
  "Full NMDPRA compliance for CNG stations.",
  "Certified installation technicians, not subcontracted labour.",
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
    description: "Building CNG-first infrastructure from scratch.",
    icon: <ChartIcon />,
  },
];

const GUIDE = "/spec-sheets/CNG_Range_Comparison.pdf";
const GUIDE_NOTE = "The CNG station setup guide, with the CNG range at a glance.";

export default function CngPage() {
  const catalogue = productsIn("cng");
  const items = EQUIPMENT.map((item) => {
    const product = catalogue.find((entry) => entry.id === item.id);
    if (!product) throw new Error(`Unknown CNG product: ${item.id}`);
    return { ...item, image: product.image };
  });

  return (
    <>
      {productsJsonLd(items.map((item) => ({ name: item.title, description: item.specs.join(". "), image: item.image, path: "/solutions/cng-equipment-nigeria" })), absoluteUrl).map((data) => (
        <JsonLd key={data.name} data={data} />
      ))}
      <ProductHero
        eyebrow="1,500+ stations equipped across Nigeria"
        title="CNG station infrastructure for Nigeria: supply, installation & technical consultation"
        description="As Nigeria moves quickly towards CNG, MEGA-TEC helps station investors and fleet operators build compliant, profitable CNG infrastructure from the ground up."
        image="/images/products/cng-tube-trailer.jpg"
        imageAlt="MEGA-TEC CNG tube trailer"
        whatsappMessage="Hi MEGA-TEC, I'd like to discuss a CNG station project."
        whatsappLabel="Discuss Your CNG Project on WhatsApp"
        extra={
          <SpecSheetLink
            href={GUIDE}
            description={GUIDE_NOTE}
            className="text-white/90 underline underline-offset-4 hover:text-white"
          >
            Download Our CNG Station Setup Guide ↓
          </SpecSheetLink>
        }
      />

      <section className="py-6 sm:py-20 lg:py-28">
        <Container className="max-w-3xl">
          <h2 className="text-ink text-4xl font-semibold tracking-tight text-balance lg:text-5xl">
            Nigeria&apos;s CNG opportunity is here, and it&apos;s moving fast
          </h2>
          <p className="text-body mt-6 text-lg leading-relaxed">
            The removal of petrol subsidy has transformed the economics of CNG almost overnight,
            making CNG far cheaper to run than petrol. With the government now backing CNG
            expansion and a rapidly growing fleet of CNG-converted buses, taxis and trucks already
            on Nigerian roads every month, demand for proper CNG refuelling stations is quickly
            rising.
          </p>
          <p className="text-ink mt-8 text-xl font-medium tracking-tight">
            MEGA-TEC positions you ahead of this demand, with infrastructure built to last.
          </p>
        </Container>
      </section>

      <TrustSection items={TRUST} />

      <section className="bg-surface-soft/60 py-6 sm:py-20 lg:py-28">
        <Container className="max-w-4xl">
          <h2 className="text-ink text-4xl font-semibold tracking-tight text-balance lg:text-5xl">
            What a complete CNG station requires
          </h2>
          <p className="text-body mt-4 text-lg leading-relaxed">
            A CNG station is a complete high-pressure system. MEGA-TEC delivers the full system,
            not just the equipment.
          </p>
          <ol className="mt-8 flex flex-col gap-4 sm:mt-12">
            {SYSTEM_COMPONENTS.map((item, index) => (
              <li key={item.title} className="flex items-start gap-5 rounded-2xl bg-white p-5 sm:p-6">
                <span className="bg-accent text-ink flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-semibold">
                  {index + 1}
                </span>
                <div>
                  <p className="text-ink text-lg font-medium tracking-tight">{item.title}</p>
                  <p className="text-body mt-1">{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <EquipmentList
        heading="CNG equipment we supply"
        intro="The MEGA-TEC CNG range. Enquire about the equipment you need. Dispensers carry a 1-year warranty; all other CNG equipment comes with a warranty."
        items={items}
        messageFor={(title) => `Hi MEGA-TEC, I'd like to enquire about the ${title}.`}
      />
      <Container className="-mt-4 pb-6 sm:pb-12">
        <RangeLink href={catalogueHref("cng")}>See Full CNG Equipment Range</RangeLink>
      </Container>

      <section className="bg-surface-soft/60 py-6 sm:py-20 lg:py-28">
        <Container className="max-w-4xl">
          <h2 className="text-ink text-3xl font-semibold tracking-tight text-balance lg:text-4xl">
            CNG infrastructure runs at very high pressure. There is no room for shortcuts.
          </h2>
          <ul className="mt-8 flex flex-col gap-4">
            {SAFETY.map((point) => (
              <li key={point} className="text-ink flex gap-3 text-lg leading-relaxed">
                <CheckIcon />
                {point}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-6 sm:py-20 lg:py-28">
        <Container>
          <h2 className="text-ink text-center text-3xl font-semibold tracking-tight lg:text-4xl">
            Who this is for
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:mt-14 sm:grid-cols-3">
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

      <section className="bg-surface-soft/60 py-6 sm:py-20 lg:py-28">
        <Container className="flex flex-col items-center text-center">
          <h2 className="text-ink text-3xl font-semibold tracking-tight lg:text-4xl">
            Get the full CNG station setup guide
          </h2>
          <SpecSheetButton href={GUIDE} description={GUIDE_NOTE} className="mt-6">
            Download CNG Guide ↓
          </SpecSheetButton>
        </Container>
      </section>

      <LandingForm
        heading="Not sure where to start with CNG? That's exactly what our consultation is for."
        buttonLabel="Talk to Our CNG Team on WhatsApp"
        template="Hi MEGA-TEC, my name is {name}[ from {company}]. I'm exploring a CNG project[ in {location}][ ({stage})]. Please call me on {phone}."
        fields={[
          { key: "name", label: "Your Name", required: true, placeholder: "Enter your name" },
          {
            key: "phone",
            label: "Phone Number",
            required: true,
            placeholder: "e.g. 0803 123 4567",
          },
          { key: "company", label: "Company / organization (optional)" },
          {
            key: "location",
            label: "Project location",
            placeholder: "Where is your project located?",
          },
          {
            key: "stage",
            label: "Project stage",
            kind: "select",
            options: ["Just exploring", "Have a site", "Ready to procure"],
          },
        ]}
      />
    </>
  );
}
