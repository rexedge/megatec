import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SpecSheetButton, SpecSheetLink } from "@/components/ui/spec-sheet-button";
import { TextLink } from "@/components/ui/text-link";
import { WhatsappButton } from "@/components/ui/whatsapp-button";
import { CheckIcon } from "@/components/ui/check-icon";
import { LandingForm } from "@/components/sections/landing-form";
import {
  AwardIcon,
  BoltIcon,
  BuildingIcon,
  CardIcon,
  ChartIcon,
  DisplayIcon,
  PinIcon,
  ScaleIcon,
  WrenchIcon,
} from "@/components/icons/badge-icons";
import { cn } from "@/lib/cn";
import { catalogueHref, productsIn } from "@/lib/catalogue";

/** Copy is from the Landing Page Copy document, LP4 (punch list LE-01 to LE-05). */
export const metadata: Metadata = {
  title: "EV Chargers Nigeria | Commercial & Home Fast Charging Installation | MEGA-TEC",
  description:
    "MEGA-TEC supplies and installs DC fast EV charging infrastructure across Nigeria: 60KW commercial and 40KW home/estate units, professionally installed with full support.",
};

const GUIDE = "/spec-sheets/EV_Range_Comparison.pdf";
const GUIDE_NOTE = "Both MEGA-TEC EV chargers, side by side.";

const COMMERCIAL_FEATURES = [
  { icon: <BoltIcon />, title: "60KW fast charging, two vehicles at once", text: "Dual-gun cabinet built for high-traffic sites." },
  { icon: <CardIcon />, title: "Card & QR payment built in", text: "Ready to earn revenue from day one." },
  { icon: <DisplayIcon />, title: "7-inch display, network-connected", text: "Ethernet and 3G/4G monitoring." },
  { icon: <ChartIcon />, title: "Scalable installation", text: "Start with one cabinet, expand as demand grows." },
];

const RESIDENTIAL_FEATURES = [
  { icon: <BoltIcon />, title: "40KW DC fast charging", text: "Real fast charging, not a slow trickle unit." },
  { icon: <ScaleIcon />, title: "Compact wall-mounted design", text: "Small footprint (about 55 × 55 × 28cm), clean and unobtrusive." },
  { icon: <DisplayIcon />, title: "7-inch touchscreen, network-ready", text: "Ethernet and 3G/4G connectivity built in." },
  { icon: <WrenchIcon />, title: "Professional installation", text: "Fitted and commissioned by MEGA-TEC technicians." },
];

const COMMERCIAL_AUDIENCE = [
  "Hotels & Hospitality",
  "Corporate Campuses",
  "Filling Stations & Forecourts",
  "Residential Estates",
];

const ROI = [
  {
    icon: <BuildingIcon />,
    text: "Hotels with EV charging attract international guests and corporate travel accounts who now expect it.",
  },
  {
    icon: <PinIcon />,
    text: "Estates and developments with charging infrastructure command premium pricing and attract higher-income residents.",
  },
  {
    icon: <AwardIcon />,
    text: "Filling stations with EV charging capture a new, growing revenue stream alongside traditional fuel.",
  },
];

export default function EvChargersPage() {
  const [commercial, residential] = ["ev-commercial-60kw", "ev-residential-40kw"].map((id) => {
    const product = productsIn("ev-chargers").find((entry) => entry.id === id);
    if (!product) throw new Error(`Unknown EV charger: ${id}`);
    return product;
  });

  return (
    <>
      {/* The render has its words baked in, so the headline sits beside it, never over it. */}
      <section className="bg-navy">
        <Container className="grid grid-cols-1 items-center gap-8 pt-40 pb-10 lg:grid-cols-[1fr_1.1fr] lg:gap-12 lg:py-32">
          <div>
            <p className="bg-leaf-dark mb-6 inline-block max-w-full rounded-full px-4 py-2 text-sm font-medium text-white">
              Now installing EV charging infrastructure nationwide
            </p>
            <h1 className="text-navy-text text-4xl font-semibold tracking-tight text-balance lg:text-5xl">
              EV charging infrastructure for Nigeria: commercial &amp; residential solutions
            </h1>
            <p className="text-navy-text/90 mt-6 text-lg leading-relaxed">
              Whether you&apos;re equipping a hotel, estate, corporate campus or your own home,
              MEGA-TEC supplies and installs the right EV charging solution with full technical
              support.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <WhatsappButton
                variant="leaf"
                message="Hi MEGA-TEC, I'd like to discuss an EV charging project."
              >
                Discuss Your Project on WhatsApp
              </WhatsappButton>
              <SpecSheetLink
                href={GUIDE}
                description={GUIDE_NOTE}
                className="text-navy-text underline underline-offset-4 hover:text-white"
              >
                Download Our EV Charger Guide ↓
              </SpecSheetLink>
            </div>
          </div>
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl lg:aspect-16/10">
            <Image
              src="/images/products/ev-charger-render.jpg"
              alt="MEGA-TEC DC fast charger on a city street at dusk"
              fill
              priority
              quality={90}
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover object-[65%_50%] lg:object-center"
            />
          </div>
        </Container>
      </section>

      <section className="py-6 sm:py-20 lg:py-28">
        <Container className="max-w-4xl">
          <p className="text-ink text-2xl leading-snug font-semibold tracking-tight text-balance sm:text-3xl">
            Nigeria&apos;s EV adoption is accelerating. Corporate fleets are converting. Hotels and
            luxury estates are adding charging as a standard amenity, and forward-looking filling
            stations are already capturing this new revenue stream. The infrastructure question is
            no longer &ldquo;if&rdquo;, it&apos;s who installs it right.
          </p>
        </Container>
      </section>

      <section className="bg-surface-soft/60 py-6 sm:py-20 lg:py-28">
        <Container>
          <div className="text-center">
            <h2 className="text-ink text-4xl font-semibold tracking-tight lg:text-5xl">
              Which solution is right for you?
            </h2>
            <p className="text-body mx-auto mt-4 max-w-2xl text-lg">
              Two distinct paths, pick yours to start the right conversation.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:mt-14 lg:grid-cols-2 lg:gap-8">
            <Panel
              featured
              title="60KW DC dual-gun fast charger"
              audience="For: Hotels, Estates, Filling Stations, Corporate Campuses, Fleet Depots"
              detail="Floor-standing · charges two vehicles at once · around 40 minutes to an hour for a typical EV"
              button="Discuss Commercial Installation on WhatsApp"
              message="Hi MEGA-TEC, I'd like to discuss a commercial EV charger installation."
            />
            <Panel
              title="40KW DC wall-mounted fast charger"
              audience="For: Homes, estates and small commercial sites with three-phase power"
              detail="Compact · single gun · around 1 to 1.5 hours for a typical EV"
              button="Discuss Home Installation on WhatsApp"
              message="Hi MEGA-TEC, I'd like to discuss a home EV charger installation."
            />
          </div>
        </Container>
      </section>

      <section className="py-6 sm:py-20 lg:py-28">
        <Container>
          <h2 className="text-ink max-w-3xl text-4xl font-semibold tracking-tight text-balance lg:text-5xl">
            Industrial EV charging for high-traffic commercial sites
          </h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {COMMERCIAL_AUDIENCE.map((item) => (
              <li
                key={item}
                className="bg-accent text-ink rounded-full px-4 py-2 text-sm font-medium"
              >
                {item}
              </li>
            ))}
          </ul>
          <Features items={COMMERCIAL_FEATURES} />
          <ChargerCard
            image={commercial.image}
            title="MEGA-TEC EV – Commercial DC Fast Charger"
            specs={[
              "60KW · dual gun · 200–1000VDC output",
              "Floor-standing (about 70 × 60 × 170cm) · card/QR payment",
              "7-inch display · IP55 weatherproof",
              "Best for: hotels, stations, fleet depots",
              "Comes with a warranty",
            ]}
            message="Hi MEGA-TEC, I'd like to enquire about the MEGA-TEC EV Commercial DC Fast Charger."
            sheet={`/spec-sheets/${commercial.specSheet}`}
            bestSeller
          />
          <div className="mt-8">
            <TextLink href={catalogueHref("ev-chargers")}>See Commercial Charger Details</TextLink>
          </div>
        </Container>
      </section>

      <section className="bg-surface-soft/60 py-6 sm:py-20 lg:py-28">
        <Container>
          <h2 className="text-ink max-w-3xl text-4xl font-semibold tracking-tight text-balance lg:text-5xl">
            Fast home and estate EV charging, compact and professionally installed
          </h2>
          <p className="text-body mt-6 max-w-3xl text-lg leading-relaxed">
            Upscale homes · Residential estates · Small offices and commercial sites with
            three-phase power
          </p>
          <Features items={RESIDENTIAL_FEATURES} />
          <ChargerCard
            image={residential.image}
            title="MEGA-TEC EV – Home & Estate DC Charger"
            specs={[
              "40KW · single gun · 200–1000VDC output",
              "Wall-mounted · three-phase 380V input",
              "7-inch touchscreen · IP55 weatherproof",
              "Best for: Upscale homes & Residential estates",
              "Comes with a warranty",
            ]}
            message="Hi MEGA-TEC, I'd like to enquire about the MEGA-TEC EV Home & Estate DC Charger."
            sheet={`/spec-sheets/${residential.specSheet}`}
          />
          <div className="mt-8">
            <TextLink href={catalogueHref("ev-chargers")}>See Home Charger Details</TextLink>
          </div>
        </Container>
      </section>

      <section className="py-6 sm:py-20 lg:py-28">
        <Container>
          <h2 className="text-ink max-w-3xl text-4xl font-semibold tracking-tight text-balance lg:text-5xl">
            EV charging is now a competitive differentiator for Nigerian businesses
          </h2>
          <ul className="mt-8 grid grid-cols-1 gap-6 sm:mt-12 md:grid-cols-3">
            {ROI.map((item) => (
              <li key={item.text} className="bg-surface-soft flex flex-col gap-4 rounded-2xl p-6">
                <span className="bg-accent-soft text-ink flex h-12 w-12 items-center justify-center rounded-xl">
                  {item.icon}
                </span>
                <p className="text-body leading-relaxed">{item.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-surface-soft/60 py-6 sm:py-20 lg:py-28">
        <Container className="flex flex-col items-center text-center">
          <h2 className="text-ink text-3xl font-semibold tracking-tight lg:text-4xl">
            Get the full EV charger specifications
          </h2>
          <SpecSheetButton href={GUIDE} description={GUIDE_NOTE} className="mt-6">
            Download EV Charger Guide ↓
          </SpecSheetButton>
        </Container>
      </section>

      <LandingForm
        heading="Let's design the right charging setup for your site or home."
        buttonLabel="Talk to Our EV Team on WhatsApp"
        template="Hi MEGA-TEC, my name is {name}[ from {company}]. I'm interested in EV charging[ for a {site}][ ({points} points)]. Please call me on {phone}."
        fields={[
          { key: "name", label: "Your Name", required: true, placeholder: "Enter your name" },
          {
            key: "phone",
            label: "Phone Number",
            required: true,
            placeholder: "e.g. 0803 123 4567",
          },
          { key: "company", label: "Organisation (optional)" },
          {
            key: "site",
            label: "Type of site",
            kind: "select",
            options: [
              "Hotel / hospitality",
              "Residential estate",
              "Filling station",
              "Corporate campus",
              "Private home",
              "Other",
            ],
          },
          {
            key: "points",
            label: "Charging points (optional)",
            kind: "number",
            placeholder: "How many charging points are you considering?",
          },
        ]}
      />
    </>
  );
}

function Panel({
  featured,
  title,
  audience,
  detail,
  button,
  message,
}: {
  featured?: boolean;
  title: string;
  audience: string;
  detail: string;
  button: string;
  message: string;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-4 rounded-2xl border-2 bg-white p-6 sm:p-8",
        featured ? "border-leaf" : "border-border/70"
      )}
    >
      {featured && (
        <span className="text-ink absolute -top-3 left-6 rounded-full bg-amber-400 px-3 py-1 text-xs font-medium">
          Best Seller
        </span>
      )}
      <h3 className="text-ink text-2xl font-semibold tracking-tight">{title}</h3>
      <p className="text-ink font-medium">{audience}</p>
      <p className="text-body leading-relaxed">{detail}</p>
      <WhatsappButton variant="leaf" message={message} className="mt-auto w-full">
        {button}
      </WhatsappButton>
    </div>
  );
}

function Features({
  items,
}: {
  items: { icon: React.ReactNode; title: string; text: string }[];
}) {
  return (
    <ul className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6">
      {items.map((item) => (
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
  );
}

/** One charger, one full-width card (the document: "NOT a grid"). */
function ChargerCard({
  image,
  title,
  specs,
  message,
  sheet,
  bestSeller,
}: {
  image: string;
  title: string;
  specs: string[];
  message: string;
  sheet: string;
  bestSeller?: boolean;
}) {
  return (
    <div
      itemScope
      itemType="https://schema.org/Product"
      className={cn(
        "mt-8 grid grid-cols-1 overflow-hidden rounded-2xl border bg-white sm:mt-12 md:grid-cols-[20rem_1fr]",
        bestSeller ? "border-leaf" : "border-border/70"
      )}
    >
      <div className="bg-surface-soft relative aspect-4/3 md:aspect-auto md:min-h-72">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 768px) 320px, 100vw"
          className="object-contain p-4"
          itemProp="image"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 sm:p-8">
        <h3 className="text-ink text-2xl font-medium tracking-tight" itemProp="name">
          {title}
        </h3>
        <ul className="flex flex-col gap-2" itemProp="description">
          {specs.map((spec) => (
            <li key={spec} className="text-body flex gap-3">
              <CheckIcon />
              {spec}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
          <WhatsappButton variant="leaf" message={message}>
            Talk to Our Team on WhatsApp
          </WhatsappButton>
          <SpecSheetLink
            href={sheet}
            description={`Download the full technical datasheet for the ${title}.`}
            className="text-ink text-sm font-medium underline underline-offset-2"
          >
            Download spec sheet
          </SpecSheetLink>
        </div>
      </div>
    </div>
  );
}
