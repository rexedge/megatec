import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { ContactSection } from "@/components/sections/contact-section";
import { StatsCta } from "@/components/sections/stats-cta";
import { WhyChooseUs } from "@/components/sections/why-choose-us";

export const metadata: Metadata = {
  title: "Maintenance and Repair Services for Fueling Equipment | Megatec",
  description:
    "Megatec Pumps' maintenance and repair services keep fuel dispensing equipment running at peak performance, with rapid-response support across Nigeria.",
};

const SERVICES = [
  {
    number: "01",
    title: "Scheduled Preventive Maintenance Programs",
    intro:
      "The most effective way to avoid costly repairs is to prevent them. Our customisable maintenance plans include:",
    items: [
      "Regular inspection of all mechanical and electronic components.",
      "Filter cleaning and replacement.",
      "Hose, nozzle, and swivel inspection.",
      "Leak detection and prevention checks.",
      "Routine meter accuracy verification.",
    ],
  },
  {
    number: "02",
    title: "Emergency Repair Services",
    intro:
      "When a breakdown occurs, you need a partner who responds fast. Our mobile technical teams are strategically located to provide:",
    items: [
      "Rapid on-site diagnostics and troubleshooting.",
      "24/7 emergency support for contract clients.",
      "Efficient repair of fuel leaks, electrical faults, and mechanical failures.",
    ],
  },
  {
    number: "03",
    title: "Fuel Dispenser & Pump Repair",
    intro: "We specialise in resolving all dispenser-related problems, including:",
    items: [
      'Inaccurate fuel metering and "meter creep".',
      "Faulty displays and pulsar errors.",
      "Slow fuel flow and pumping issues.",
      "Replacement of worn-out belts, motors, and pumping units.",
    ],
  },
  {
    number: "04",
    title: "Precision Calibration And Metering Services",
    intro:
      "Dispensing accuracy is critical for your profitability and regulatory compliance. We offer:",
    items: [
      "Highly accurate meter calibration using NMDPRA-approved master meters.",
      "Sealing of meters post-calibration to prevent tampering.",
      "Detailed calibration certificates for your records.",
    ],
  },
  {
    number: "05",
    title: "Submersible Turbine Pump (STP) & Piping Services",
    intro: "Our expertise extends beyond the dispenser. We also service and repair:",
    items: [
      "Malfunctioning Submersible Turbine Pumps (STPs).",
      "Underground piping leaks and blockages.",
      "Line leak detection system issues.",
    ],
  },
  {
    number: "06",
    title: "LPG & Gas Dispensing System Maintenance",
    intro:
      "Safety and reliability are paramount for gas systems. We provide specialised maintenance for LPG and CNG dispensers, focusing on leak checks, valve integrity, and safety shut-off system functionality.",
    items: [],
  },
];

export default function MaintenanceAndRepairPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Maintenance and repair services for fueling equipment" },
        ]}
      />

      <section className="py-16 lg:py-20">
        <Container>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-ink lg:text-6xl">
            Maintenance and repair services for fueling equipment
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-body">
            Keep your fuel retail business running smoothly with Megatec Pumps&apos; expert
            maintenance and repair services. Downtime can lead to lost revenue and safety
            risks. We offer rapid-response solutions across Nigeria to ensure your equipment
            operates at peak performance. From emergency repairs to proactive maintenance
            plans, we&apos;re here to protect your investment and ensure the reliability of
            your forecourt assets.
          </p>
          <p className="mt-8 max-w-2xl text-xl font-medium tracking-tight text-ink">
            &mdash; &ldquo;Maximise Uptime, Ensure Accuracy, and Protect Your Investment with
            Megatec Pumps&rdquo;
          </p>
        </Container>
      </section>

      <section className="pb-20 lg:pb-28">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr]">
            <div className="relative aspect-3/4 overflow-hidden rounded-xl bg-surface-soft lg:sticky lg:top-28 lg:h-fit">
              <Image
                src="/images/landing/rectangle-maintenance.png"
                alt="Megatec maintenance and repair technician"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col">
              {SERVICES.map((service) => (
                <details key={service.number} className="group border-b border-border py-6" open={service.number === "01"}>
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                    <span className="flex gap-4">
                      <span className="text-sm text-body">.{service.number}</span>
                      <span className="text-2xl font-semibold tracking-tight text-ink">
                        {service.title}
                      </span>
                    </span>
                    <span className="mt-1 shrink-0 text-2xl text-body group-open:hidden">+</span>
                    <span className="mt-1 hidden shrink-0 text-2xl text-body group-open:inline">
                      &minus;
                    </span>
                  </summary>
                  <div className="mt-4 pl-0 text-body leading-relaxed lg:pl-9">
                    <p>{service.intro}</p>
                    {service.items.length > 0 && (
                      <ul className="mt-3 flex flex-col gap-2">
                        {service.items.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <ContactSection />
      <WhyChooseUs />
      <StatsCta
        title="Keep Your Forecourt Pumping. Contact Us Today!"
        description="Let's discuss how Megatec's engineering solutions can drive efficiency and safety into your fuel distribution network."
      />
    </>
  );
}
