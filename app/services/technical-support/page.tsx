import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { ContactSection } from "@/components/sections/contact-section";
import { StatsCta } from "@/components/sections/stats-cta";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Technical Support and Troubleshooting | Megatec",
  description:
    "Megatec Pumps' technical support team diagnoses and resolves fuel dispenser, pump, and payment system issues fast, minimizing downtime across Nigeria.",
};

const GALLERY = [
  "/images/landing/rectangle-technical-support.png",
  "/images/landing/rectangle-fuel-dispensers.png",
  "/images/landing/rectangle-maintenance.png",
];

const SUPPORT_TIERS = [
  {
    number: "01",
    title: "Remote Phone & Online Support:",
    intro:
      "Your first line of defense. Many common issues can be resolved quickly over the phone with our experienced technicians guiding your on-site staff. This service is ideal for:",
    items: [
      "Interpreting and clearing error codes.",
      "Troubleshooting communication issues with Point of Sale (POS) systems.",
      "Walking through basic resets and diagnostic procedures.",
      "Identifying if an on-site visit is truly necessary.",
    ],
  },
  {
    number: "02",
    title: "On-Site Expert Troubleshooting & Diagnostics:",
    intro:
      "For complex or persistent issues, we dispatch our highly skilled field technicians directly to your location. They arrive equipped with:",
    items: [
      "Advanced diagnostic tools to accurately pinpoint faults.",
      "A comprehensive inventory of common spare parts.",
      "The expertise to perform immediate on-site repairs.",
    ],
  },
  {
    number: "03",
    title: "24/7 Emergency Hotline For Contract Clients:",
    intro: "",
    items: [
      "For our partners on a service contract, we offer a 24/7 emergency hotline, ensuring you have access to expert advice and priority dispatch anytime, day or night.",
    ],
  },
];

const PROBLEMS = [
  {
    title: "Dispenser Not Pumping or Slow Fuel Flow",
    description:
      "We diagnose the entire system, from blocked filters and faulty motors to issues with the Submersible Turbine Pump (STP).",
    image: "/images/landing/rectangle-fuel-dispensers.png",
  },
  {
    title: "Inaccurate Metering and Calibration Drift",
    description:
      "If customers are complaining about short-fuelling or your stock reconciliation is off, we can troubleshoot the pulsar, meter, or electronic components causing the inaccuracy.",
    image: "/images/landing/rectangle-cng.png",
  },
  {
    title: "Blank or Faulty Dispenser Displays",
    description:
      "We can quickly identify and resolve issues with power supply units, display boards, and communication wiring that cause screen failures.",
    image: "/images/landing/rectangle-lpg.png",
  },
  {
    title: "Persistent Error Codes and Electronic Faults",
    description:
      "Don't just reset the error; let us find the cause. We troubleshoot main control boards, card readers, and other electronic components to provide a lasting fix.",
    image: "/images/landing/rectangle-technical-support.png",
  },
  {
    title: "Communication Errors with POS or Automation Systems",
    description:
      "If your pumps aren't communicating with your console or payment terminal, we can diagnose the interface cards, network cables, and software settings to restore connectivity.",
    image: "/images/landing/rectangle-installation.png",
  },
  {
    title: "Leaks and Mechanical Failures",
    description:
      "We provide urgent support to identify the source of fuel or vapour leaks and troubleshoot mechanical components like swivels, hoses, and shear valves.",
    image: "/images/landing/rectangle-maintenance.png",
  },
];

export default function TechnicalSupportPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Technical support and troubleshooting" },
        ]}
      />

      <section className="py-16 lg:py-20">
        <Container>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-ink lg:text-6xl">
            Technical support and troubleshooting
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-body">
            <span className="font-medium text-ink">Nigeria Fuel Dispenser Support: </span>
            We offer fast and reliable solutions to keep your station running smoothly. Our
            expert technical support team quickly diagnoses and resolves issues with fuel
            dispensers, pumps, and payment systems, minimizing downtime and protecting your
            revenue.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {GALLERY.map((src) => (
              <div key={src} className="relative aspect-square overflow-hidden rounded-xl bg-surface-soft">
                <Image src={src} alt="" fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20 lg:pb-28">
        <Container>
          <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-ink lg:text-5xl">
            Our Technical Support and Troubleshooting Services
          </h2>
          <p className="mt-4 text-lg text-body">
            We offer multi-level support designed to provide the fastest and most
            cost-effective solution for your specific problem.
          </p>

          <div className="mt-14 flex flex-col">
            {SUPPORT_TIERS.map((tier) => (
              <details
                key={tier.number}
                className="group border-b border-border py-6"
                open={tier.number === "01"}
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                  <span className="flex gap-4">
                    <span className="text-sm text-body">.{tier.number}</span>
                    <span className="text-2xl font-semibold tracking-tight text-ink">
                      {tier.title}
                    </span>
                  </span>
                  <span className="mt-1 shrink-0 text-2xl text-body group-open:hidden">+</span>
                  <span className="mt-1 hidden shrink-0 text-2xl text-body group-open:inline">
                    &minus;
                  </span>
                </summary>
                <div className="mt-4 pl-9 text-body leading-relaxed">
                  {tier.intro && <p>{tier.intro}</p>}
                  <ul className="mt-3 flex flex-col gap-2">
                    {tier.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20 lg:pb-28">
        <Container>
          <h2 className="max-w-3xl text-4xl font-semibold tracking-tight text-ink lg:text-5xl">
            Common Fuelling Equipment Problems We Diagnose &amp; Solve
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-body">
            Our team has extensive experience resolving a wide array of technical challenges
            across all major equipment brands. If you&apos;re facing any of these issues, call
            us immediately:
          </p>

          <div className="mt-16 flex flex-col gap-16">
            {PROBLEMS.map((problem, index) => {
              const imageFirst = index % 2 === 0;
              return (
                <div
                  key={problem.title}
                  className={cn(
                    "grid grid-cols-1 items-center gap-10 lg:grid-cols-2",
                  )}
                >
                  <div
                    className={cn(
                      "relative aspect-4/3 overflow-hidden rounded-xl bg-surface-soft",
                      imageFirst ? "lg:order-1" : "lg:order-2"
                    )}
                  >
                    <Image
                      src={problem.image}
                      alt={problem.title}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className={imageFirst ? "lg:order-2" : "lg:order-1"}>
                    <h3 className="text-2xl font-semibold tracking-tight text-ink lg:text-3xl">
                      {problem.title}
                    </h3>
                    <p className="mt-4 text-body leading-relaxed">{problem.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <ContactSection />
      <WhyChooseUs />
      <StatsCta
        title="Stop Troubleshooting Alone. Get Expert Help Now."
        description="Let's discuss how Megatec's engineering solutions can drive efficiency and safety into your fuel distribution network."
      />
    </>
  );
}
