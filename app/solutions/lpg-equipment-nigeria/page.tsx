import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, productsJsonLd } from "@/components/ui/json-ld";
import { absoluteUrl } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { RangeLink } from "@/components/ui/range-link";
import { SpecSheetButton } from "@/components/ui/spec-sheet-button";
import { WhatsappButton } from "@/components/ui/whatsapp-button";
import { CheckIcon } from "@/components/ui/check-icon";
import { ProductHero } from "@/components/sections/product-hero";
import { ProductCard } from "@/components/sections/product-card";
import { TrustSection } from "@/components/sections/trust-bar";
import { LandingProjects } from "@/components/sections/landing-projects";
import { LandingForm } from "@/components/sections/landing-form";
import { BuildingIcon, ScaleIcon, ShieldIcon } from "@/components/icons/badge-icons";
import { catalogueHref, productsIn } from "@/lib/catalogue";

/** Copy is from the Landing Page Copy document, LP3 (punch list LL-01 to LL-04). */
export const metadata: Metadata = {
  title: "LPG Equipment Nigeria | Skid Plants, Dispensers & Storage | MEGA-TEC",
  description:
    "MEGA-TEC supplies, installs and commissions LPG infrastructure for Nigerian gas plants and retail outlets. Dispensers, skid plants, storage tanks. NMDPRA-compliant. Nationwide.",
};

const TRUST = [
  "500+ LPG Units Installed Nationwide",
  "NMDPRA Safety Compliance Verified",
  "NMDPRA-Certified Calibration & Metering",
  "Assembled & Tested in Nigeria",
];

const DISPENSERS = [
  {
    id: "lpg-dispenser-single",
    name: "MT LPG – Single Nozzle",
    specs: [
      "Single nozzle · ±0.3% meter accuracy",
      "Air separator · standard meter",
      "7-yr memory · 10-min backup",
    ],
  },
  {
    id: "lpg-dispenser-double",
    name: "MT LPG – Double Nozzle",
    specs: [
      "Two nozzles · ±0.3% meter accuracy",
      "Two meters · two air separators",
      "7-yr memory · 10-min backup",
    ],
  },
];

const BUILT_TO_FIT = [
  {
    icon: <BuildingIcon />,
    title: "LPG skid plants",
    text: "complete ready-to-run mini-plants, sized to how much gas you move.",
  },
  {
    icon: <ScaleIcon />,
    title: "LPG storage tanks",
    text: "bulk and bullet tanks, in the capacity you need.",
  },
  {
    icon: <ShieldIcon />,
    title: "Safety valves & shutdown systems",
    text: "pressure relief and emergency shutoff.",
  },
];

const SAFETY = [
  "Proper earthing, grounding and bonding on every MEGA-TEC installation.",
  "Pressure relief valves and emergency shutoff systems as standard.",
  "Calibrated dispensers that protect both your customers and your money.",
  "NMDPRA documentation and compliance support throughout the project.",
];

const WORKFLOW = [
  {
    title: "Site evaluation & layout planning",
    description: "We assess the site before any equipment decision is made.",
  },
  {
    title: "Equipment recommendation & proposal",
    description: "Sized to your specific needs.",
  },
  {
    title: "Supply & logistics coordination",
    description: "Equipment sourced and delivered to your location.",
  },
  {
    title: "Installation & pressure testing",
    description: "Full pressure testing before any gas is introduced.",
  },
  {
    title: "Commissioning & NMDPRA sign-off",
    description: "Calibration, certification and regulatory documentation managed.",
  },
];

// The second card (an LPG plant project) and the Nepal photo are still to be supplied
// (LL-04), so only the Nepal card shows, without a photo.
const PROJECTS = [
  {
    title: "Nepal Energies, Nationwide",
    description: "30 LPG dispenser units supplied as part of a multi-contract partnership.",
  },
];

export default function LpgPage() {
  const catalogue = productsIn("lpg");
  const dispensers = DISPENSERS.map((item) => {
    const product = catalogue.find((entry) => entry.id === item.id);
    if (!product) throw new Error(`Unknown LPG product: ${item.id}`);
    return { ...item, product };
  });

  return (
    <>
      {productsJsonLd(dispensers.map(({ product, name, specs }) => ({ name, description: specs.join(". "), image: product.image, path: "/solutions/lpg-equipment-nigeria" })), absoluteUrl).map((data) => (
        <JsonLd key={data.name} data={data} />
      ))}
      <ProductHero
        eyebrow="Nigeria's No. 1 in fuel & LPG dispensing"
        title="LPG dispensing systems for gas plants & retail outlets in Nigeria"
        description="From skid-mounted plants to retail dispenser setups, MEGA-TEC supplies, installs and sets up LPG systems that are safe, accurate and built to NMDPRA standards."
        image="/images/products/lpg-hero.png"
        imageAlt="MEGA-TEC LPG dispensing in Nigeria"
        whatsappMessage="Hi MEGA-TEC, I'd like to discuss an LPG project."
        whatsappLabel="Discuss Your LPG Project on WhatsApp"
        extra={
          <Link
            href="/projects"
            className="text-white/90 underline underline-offset-4 hover:text-white"
          >
            See Our LPG Installations →
          </Link>
        }
      />

      <TrustSection items={TRUST} />

      <section className="bg-surface-soft/60 py-6 sm:py-20 lg:py-16">
        <Container>
          <div className="text-center">
            <h2 className="text-ink text-4xl font-semibold tracking-tight lg:text-5xl">
              LPG systems we supply
            </h2>
            <p className="text-body mx-auto mt-4 max-w-2xl text-lg">
              Identify your requirement. Tap any category below for details. All MEGA-TEC LPG
              dispensers come with a 1-year warranty.
            </p>
          </div>

          <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-3 min-[320px]:grid-cols-2 sm:mt-14 sm:gap-8">
            {dispensers.map(({ product, name, specs }, index) => (
              <ProductCard
                key={product.id}
                image={product.image}
                title={name}
                specs={specs}
                bestSeller={index === 0}
                nmdpra={index > 0}
                whatsappMessage={`Hi MEGA-TEC, I'd like to enquire about the ${name}.`}
                specSheetHref={product.specSheet ? `/spec-sheets/${product.specSheet}` : undefined}
              />
            ))}
          </div>

          <div className="mx-auto mt-8 max-w-4xl rounded-2xl bg-white p-6 sm:mt-12 sm:p-10">
            <h3 className="text-ink text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
              Built and sourced to fit your project requirement
            </h3>
            <p className="text-body mt-4 text-lg leading-relaxed">
              We supply the full LPG system, not just dispensers. Sourced and set up to suit your
              specific project:
            </p>
            <ul className="mt-6 flex flex-col gap-5">
              {BUILT_TO_FIT.map((item) => (
                <li key={item.title} className="flex gap-4">
                  <span className="bg-accent-soft text-ink flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                    {item.icon}
                  </span>
                  <p className="text-body self-center leading-relaxed">
                    <span className="text-ink font-medium">{item.title}</span>: {item.text}
                  </p>
                </li>
              ))}
            </ul>
            <WhatsappButton
              variant="leaf"
              message="Hi MEGA-TEC, I'd like to discuss an LPG requirement."
              className="mt-8 w-full sm:w-auto"
            >
              Discuss Your LPG Requirement on WhatsApp
            </WhatsappButton>
          </div>

          <RangeLink href={catalogueHref("lpg")}>See Full LPG Equipment Range</RangeLink>
        </Container>
      </section>

      <section className="py-6 sm:py-20 lg:py-16">
        <Container className="max-w-4xl">
          <h2 className="text-ink text-3xl font-semibold tracking-tight text-balance lg:text-4xl">
            LPG accidents are costly and dangerous, but they can be prevented
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

      <section className="bg-surface-soft/60 py-6 sm:py-20 lg:py-16">
        <Container className="max-w-4xl">
          <h2 className="text-ink text-4xl font-semibold tracking-tight lg:text-5xl">
            Deployment workflow
          </h2>
          <ol className="mt-8 flex flex-col gap-4 sm:mt-12">
            {WORKFLOW.map((step, index) => (
              <li key={step.title} className="flex items-start gap-5 rounded-2xl bg-white p-5 sm:p-6">
                <span className="bg-accent text-ink flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-semibold">
                  {index + 1}
                </span>
                <div>
                  <p className="text-ink text-lg font-medium tracking-tight">{step.title}</p>
                  <p className="text-body mt-1">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-6 sm:py-20 lg:py-16">
        <Container className="flex flex-col items-center text-center">
          <h2 className="text-ink text-3xl font-semibold tracking-tight lg:text-4xl">
            Get the full LPG equipment specifications
          </h2>
          <SpecSheetButton
            href="/spec-sheets/LPG_Range_Comparison.pdf"
            description="Compare LPG dispensers and the filling scale at a glance."
            className="mt-6"
          >
            Download Specifications ↓
          </SpecSheetButton>
        </Container>
      </section>

      <LandingProjects heading="LPG projects we've delivered" projects={PROJECTS} />

      <LandingForm
        heading="Building or upgrading an LPG plant? Let's make sure it's done right from the start."
        buttonLabel="Talk to Our Team on WhatsApp"
        template="Hi MEGA-TEC, my name is {name}. I'm interested in an LPG project[ ({type})][ in {location}]. Please call me on {phone}."
        fields={[
          { key: "name", label: "Your Name", required: true, placeholder: "Enter your name" },
          {
            key: "phone",
            label: "Phone Number",
            required: true,
            placeholder: "e.g. 0803 123 4567",
          },
          { key: "location", label: "Location", placeholder: "State or city" },
          {
            key: "type",
            label: "Project type",
            kind: "select",
            options: [
              "New plant",
              "Upgrade existing plant",
              "Equipment replacement",
              "Not sure, need advice",
            ],
          },
        ]}
      />
    </>
  );
}
