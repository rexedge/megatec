import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ProductHero } from "@/components/sections/product-hero";
import { ProductCard } from "@/components/sections/product-card";
import { ContactSection } from "@/components/sections/contact-section";
import {
  ShieldIcon,
  PinIcon,
  WrenchIcon,
  AwardIcon,
  BoltIcon,
  CardIcon,
  DisplayIcon,
  ScaleIcon,
} from "@/components/icons/badge-icons";

export const metadata: Metadata = {
  title: "Electric Car Chargers | Megatec",
  description:
    "Megatec supplies and installs commercial and residential EV charging infrastructure across Nigeria, backed by NMDPRA-compliant installation and full technical support.",
};

const BADGES = [
  { label: "NMDPRA Compliant Installations", icon: <ShieldIcon /> },
  { label: "120+ Stations Installed Nationwide", icon: <PinIcon /> },
  { label: "Calibration-Certified Technicians", icon: <WrenchIcon /> },
  { label: "Authorised Supplier — Tatsuno, Gilbarco, Wayne", icon: <AwardIcon /> },
];

const COMMERCIAL_FEATURES = [
  {
    icon: <BoltIcon />,
    lead: "60KW fast charging, two vehicles at once:",
    text: "Dual-gun cabinet built for high-traffic sites.",
  },
  {
    icon: <CardIcon />,
    lead: "Card & QR payment built in:",
    text: "Ready to earn revenue from day one.",
  },
  {
    icon: <DisplayIcon />,
    lead: "7-inch display, network-connected:",
    text: "Ethernet and 3G/4G monitoring.",
  },
  {
    icon: <ScaleIcon />,
    lead: "Scalable installation:",
    text: "Start with one cabinet, expand as demand grows.",
  },
];

const RESIDENTIAL_FEATURES = [
  { lead: "40KW DC fast charging:", text: "Real fast charging, not a slow trickle unit." },
  {
    lead: "Compact wall-mounted design:",
    text: "Small footprint (about 55 × 55 × 28cm).",
  },
  {
    lead: "7-inch touchscreen, network-ready:",
    text: "Ethernet and 3G/4G connectivity built in.",
  },
  {
    lead: "Professional installation:",
    text: "Fitted and commissioned by MEGA-TEC technicians.",
  },
];

const BUSINESS_CASE = [
  "Hotels with EV charging attract international guests and corporate travel accounts who now expect it.",
  "Estates and developments with charging infrastructure command premium pricing and attract higher-income residents.",
  "Filling stations with EV charging capture a new, growing revenue stream alongside traditional fuel.",
];

export default function EvChargersPage() {
  return (
    <>
      <ProductHero
        title="EV charging infrastructure for Nigeria: commercial & residential solutions"
        description="Whether you're equipping a hotel, estate, corporate campus or your own home, MEGA-TEC supplies and installs the right EV charging solution with full technical support."
        image="/images/products/ev-hero.png"
        imageAlt="Megatec EV charging station"
        whatsappMessage="Hi Megatec, I'd like to discuss an EV charging project."
        whatsappLabel="Discuss your EV charging project on WhatsApp"
        badges={BADGES}
      />

      <section className="py-20 lg:py-28">
        <Container>
          <p className="text-sm font-medium tracking-tight text-body">Commercial</p>
          <h2 className="mt-2 max-w-3xl text-4xl font-semibold tracking-tight text-ink lg:text-5xl">
            Industrial EV charging for high-traffic commercial sites
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              {COMMERCIAL_FEATURES.map((feature) => (
                <div
                  key={feature.lead}
                  className="flex items-center gap-4 rounded-xl border border-border/70 bg-white p-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-ink">
                    {feature.icon}
                  </span>
                  <p className="text-body">
                    <span className="font-medium text-ink">{feature.lead}</span> {feature.text}
                  </p>
                </div>
              ))}
            </div>

            <ProductCard
              tag="Commercial / Industrial"
              image="/images/products/ev-commercial-charger.png"
              title="MT EV — Commercial DC Fast Charger"
              subtitle="Charge time: 30–60 minutes"
              specs={[
                "60KW · dual gun · 200–1000VDC output",
                "Floor-standing (about 70 × 60 × 170cm)",
                "7-inch display · IP55 weatherproof",
              ]}
              whatsappMessage="Hi Megatec, I'd like to enquire about the MT EV Commercial DC Fast Charger."
              specSheetHref="/spec-sheets/EV_Commercial_DC_Fast_Charger_60KW.pdf"
            />
          </div>
        </Container>
      </section>

      <section className="bg-surface-soft/60 py-20 lg:py-28">
        <Container>
          <p className="text-sm font-medium tracking-tight text-body">Residential</p>
          <h2 className="mt-2 max-w-3xl text-4xl font-semibold tracking-tight text-ink lg:text-5xl">
            Fast home and estate EV charging, compact and professionally installed
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              {RESIDENTIAL_FEATURES.map((feature, index) => (
                <div key={feature.lead} className="flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-ink">
                    {index + 1}
                  </span>
                  <p className="text-body">
                    <span className="font-medium text-ink">{feature.lead}</span> {feature.text}
                  </p>
                </div>
              ))}
            </div>

            <ProductCard
              tag="Home"
              image="/images/products/ev-residential-charger.png"
              title="MT EV — Home & Estate DC Charger"
              specs={[
                "40KW · single gun · 200–1000VDC output",
                "Wall-mounted · three-phase 380V input",
                "7-inch touchscreen · IP55 weatherproof",
              ]}
              whatsappMessage="Hi Megatec, I'd like to enquire about the MT EV Home & Estate DC Charger."
              specSheetHref="/spec-sheets/EV_Home_Estate_DC_Charger_40KW.pdf"
            />
          </div>
        </Container>
      </section>

      <section className="py-20 lg:py-28">
        <Container className="text-center">
          <h2 className="mx-auto max-w-2xl text-4xl font-semibold tracking-tight text-ink lg:text-5xl">
            EV charging is now a competitive differentiator for Nigerian businesses
          </h2>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {BUSINESS_CASE.map((reason, index) => (
              <div
                key={reason}
                className="flex flex-col items-center gap-4 rounded-xl border border-border/70 p-8"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-semibold text-ink">
                  {index + 1}
                </span>
                <p className="text-body">{reason}</p>
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
            Download the full technical datasheets for our EV charger range.
          </p>
          <Button
            href="/spec-sheets/EV_Commercial_DC_Fast_Charger_60KW.pdf"
            variant="secondary"
            className="mt-6"
          >
            Download product specs
          </Button>
        </Container>
      </section>

      <ContactSection />
    </>
  );
}
