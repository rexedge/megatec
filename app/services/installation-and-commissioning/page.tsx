import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { WhatsappButton } from "@/components/ui/whatsapp-button";
import { ContactSection } from "@/components/sections/contact-section";
import { StatsCta } from "@/components/sections/stats-cta";
import { WhyChooseUs } from "@/components/sections/why-choose-us";

export const metadata: Metadata = {
  title: "Installation and Commissioning of Fuel Dispensers | Megatec",
  description:
    "Expert installation and commissioning of fuel and gas dispensing systems in Nigeria — precision, safety, and regulatory compliance for your fuelling station.",
};

const SERVICE_GROUPS = [
  {
    title: "Fuel Dispenser Installation:",
    items: [
      "Installation of all types of dispensers: Single, dual, and multi-product dispensers (MPDs).",
      "Expertise with leading brands (e.g., Wayne, Gilbarco, Tokheim).",
      "Submersible Turbine Pump (STP) and suction system installations.",
      "Piping, electrical wiring, and forecourt integration.",
    ],
  },
  {
    title: "Gas Dispensing Systems Installation:",
    items: [
      "LPG (Autogas) Dispensers: Complete installation of LPG dispensers, including piping from storage tanks, safety valve integration, and leak detection systems.",
      "CNG Dispensers: Specialised installation for Compressed Natural Gas systems, ensuring high-pressure integrity and safety compliance.",
    ],
  },
  {
    title: "System Commissioning & Calibration:",
    items: [
      '"Wet" and "Dry" Testing: Rigorous testing procedures to ensure all components are functioning correctly before introducing product.',
      "Meter Calibration: Precise calibration using certified master meters to ensure every litre is accounted for, protecting your customers and your profits.",
      "Flow Rate Optimisation: Adjusting flow rates for optimal dispensing speed and customer satisfaction.",
      "Safety System Checks: Verification of emergency shut-off valves, shear valves, and other critical safety features.",
    ],
  },
  {
    title: "Upgrades & Retrofitting:",
    items: [
      "Seamlessly upgrade your old or outdated dispensers with modern, efficient models.",
      "Retrofit your existing systems with pay-at-the-pump technology, card readers, and station automation systems.",
    ],
  },
];

export default function InstallationAndCommissioningPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Installation and commissioning of fuel dispensers" },
        ]}
      />

      <section className="py-16 lg:py-20">
        <Container>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-ink lg:text-6xl">
            Installation and commissioning of fuel dispensers
          </h1>
          <div className="mt-8 max-w-3xl space-y-4 text-lg leading-relaxed text-body">
            <p>
              Expert Installation &amp; Commissioning of Fuel and Gas Dispensing Systems in
              Nigeria. Precision, Safety, and Regulatory Compliance for Your Fuelling Station.
              Power your business with flawlessly installed and accurately calibrated
              dispensing systems.
            </p>
            <p>
              At Megatec Pumps, we provide end-to-end solutions for the installation and
              commissioning of fuel dispensers (PMS, AGO, DPK) and gas dispensing systems (LPG,
              CNG). We ensure your operations run safely, efficiently, and profitably from day
              one.
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-20 lg:pb-28">
        <Container>
          <h2 className="text-4xl font-semibold tracking-tight text-ink lg:text-5xl">
            What We Do: Expertise in Action
          </h2>
          <div className="mt-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.2fr_1fr]">
            <div className="relative aspect-3/4 overflow-hidden rounded-xl bg-surface-soft">
              <Image
                src="/images/landing/rectangle-installation.png"
                alt="Fuel dispenser installation"
                fill
                sizes="(min-width: 1024px) 25vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-6 text-body leading-relaxed">
              <p>
                <span className="font-medium text-ink">Advanced Fuel Dispensing Systems: </span>
                We design, engineer, and manufacture a diverse range of fuel dispensers for
                retail forecourts, commercial fleets, marinas, and private fueling stations.
                Our systems are renowned for their measurement accuracy, durable construction,
                and user-friendly interfaces.
              </p>
              <p>
                <span className="font-medium text-ink">
                  Comprehensive Gas Dispensing Solutions:{" "}
                </span>
                We are at the forefront of providing safe and efficient solutions for a variety
                of gases, including Compressed Natural Gas (CNG), Liquefied Petroleum Gas
                (LPG), and other alternative fuels. Our expertise ensures compliance with the
                strictest safety protocols.
              </p>
            </div>
            <div className="relative aspect-3/4 overflow-hidden rounded-xl bg-surface-soft">
              <Image
                src="/images/landing/rectangle-fuel-dispensers.png"
                alt="Fuel dispenser equipment"
                fill
                sizes="(min-width: 1024px) 25vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-20 lg:pb-28">
        <Container>
          <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-ink lg:text-5xl">
            Our Comprehensive Installation &amp; Commissioning Services
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-body">
            We offer a complete suite of services tailored to meet the specific needs of
            independent and network-branded filling stations, commercial fleet operators, and
            industrial facilities across Nigeria.
          </p>

          <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-2">
            {SERVICE_GROUPS.map((group) => (
              <div key={group.title}>
                <h3 className="text-xl font-medium tracking-tight text-ink">{group.title}</h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3 text-body leading-relaxed">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <WhatsappButton message="Hi Megatec, I'd like to discuss installation and commissioning for my fuelling station.">
              Discuss your project on WhatsApp
            </WhatsappButton>
          </div>
        </Container>
      </section>

      <ContactSection />
      <WhyChooseUs />
      <StatsCta />
    </>
  );
}
