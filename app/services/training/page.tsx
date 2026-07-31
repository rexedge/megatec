import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { ContactSection } from "@/components/sections/contact-section";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Training and Capacity Building for Operators | Megatec",
  description:
    "Megatec Pumps' expert-led training programs help forecourt operators run fuel and gas dispensing equipment safely, accurately, and profitably.",
};

const MODULES = [
  {
    title: "Module 1: Safe Fuel & LPG Dispenser Operation",
    intro: "This foundational module is essential for all forecourt staff.",
    items: [
      "Correct procedures for starting and shutting down dispensers.",
      "Proper handling of nozzles, hoses, and breakaways.",
      "Understanding dispenser displays, sales data, and totalizers.",
      "Specific safety protocols for dispensing Petrol (PMS), Diesel (AGO), and Liquefied Petroleum Gas (LPG).",
    ],
    image: "/images/landing/rectangle-training.png",
  },
  {
    title: "Module 2: Forecourt Safety and Emergency Response",
    intro: "We equip your team to be proactive about safety and confident in an emergency.",
    items: [
      "Identifying and managing potential hazards (e.g., fuel spills, static electricity).",
      "Correct use of fire extinguishers and other safety equipment.",
      "Step-by-step emergency shutdown procedures.",
      "Managing customer and vehicle traffic safely on the forecourt.",
    ],
    image: "/images/landing/rectangle-maintenance.png",
  },
  {
    title: "Module 3: Accurate Dispensing and Loss Prevention",
    intro: "Protect your profits by empowering your staff to be vigilant.",
    items: [
      "How to conduct daily meter readings and reconciliations.",
      'Identifying signs of meter malfunction or "creep".',
      "Techniques to prevent product theft and spillage during dispensing.",
      "Understanding the financial impact of inaccurate measurements.",
    ],
    image: "/images/landing/rectangle-fuel-dispensers.png",
  },
  {
    title: "Module 4: Basic Troubleshooting and Daily Checks",
    intro:
      "Reduce reliance on technicians for minor issues. This module teaches operators how to:",
    items: [
      "Perform essential daily equipment checks.",
      "Identify and report early warning signs of equipment failure.",
      "Resolve common, simple issues like a jammed nozzle or a communications reset.",
    ],
    image: "/images/landing/rectangle-technical-support.png",
  },
  {
    title: "Module 5: Customer Service Excellence at the Pump",
    intro: "Turn every customer interaction into a positive experience.",
    items: [
      "Professional greetings and communication skills.",
      "Effectively handling customer queries and complaints.",
      "Opportunities for upselling (e.g., lubricants, car care products).",
      "Maintaining a clean and welcoming forecourt environment.",
    ],
    image: "/images/landing/rectangle-installation.png",
  },
  {
    title: "Module 6: Regulatory Compliance (NMDPRA Standards)",
    intro:
      "Ensure your team understands and operates within the required legal framework, covering key operational guidelines set by the Nigerian Midstream and Downstream Petroleum Regulatory Authority (NMDPRA).",
    items: [],
    image: "/images/landing/rectangle-cng.png",
  },
];

const ADVANTAGES = [
  {
    title: "Expert instructors",
    description:
      "Our training is delivered by experienced field technicians and engineers who work with this equipment every day. They provide real-world insights, not just textbook theory.",
  },
  {
    title: "Hands-on, practical approach",
    description:
      "Training combines theory with supervised, real-equipment practice on your own dispensers, so operators build muscle memory, not just knowledge.",
  },
  {
    title: "Customisable curriculum",
    description:
      "We work with you to tailor the training modules to address the specific needs of your team, the equipment at your station, and your business goals.",
  },
];

const MORE_ADVANTAGES = [
  {
    title: "Flexible Delivery",
    description:
      "We can conduct training on-site at your filling station to minimize disruption, or at one of our designated training locations.",
  },
  {
    title: "Certification of Completion",
    description:
      "Upon successful completion, participants receive a certificate from Megatec Pumps, acknowledging their new skills and enhancing their professional development.",
  },
];

export default function TrainingPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Training and capacity building for operators" },
        ]}
      />

      <section className="py-16 lg:py-20">
        <Container>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-ink lg:text-6xl">
            Training and capacity building for operators
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-body">
            Invest in your team with Megatec Pumps&apos; training programs. Enhance safety,
            boost customer satisfaction, and reduce operational costs with our expert-led
            courses designed for the Nigerian downstream petroleum sector.
          </p>
        </Container>
      </section>

      <section className="pb-20 lg:pb-28">
        <Container>
          <div className="flex flex-col gap-16">
            {MODULES.map((module, index) => {
              const imageFirst = index % 2 === 0;
              return (
                <div key={module.title} className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
                  <div
                    className={cn(
                      "relative aspect-4/3 overflow-hidden rounded-xl bg-surface-soft",
                      imageFirst ? "lg:order-1" : "lg:order-2"
                    )}
                  >
                    <Image
                      src={module.image}
                      alt={module.title}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className={imageFirst ? "lg:order-2" : "lg:order-1"}>
                    <h2 className="text-2xl font-semibold tracking-tight text-ink lg:text-3xl">
                      {module.title}
                    </h2>
                    <p className="mt-4 text-body leading-relaxed">{module.intro}</p>
                    {module.items.length > 0 && (
                      <ul className="mt-3 flex flex-col gap-2">
                        {module.items.map((item) => (
                          <li key={item} className="flex gap-3 text-body leading-relaxed">
                            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="pb-20 lg:pb-28">
        <Container>
          <p className="text-sm font-medium tracking-tight text-body">
            The Megatec Pumps Training Advantage
          </p>
          <div className="mt-6 grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-3">
            {ADVANTAGES.map((item) => (
              <div key={item.title}>
                <h3 className="text-2xl font-semibold tracking-tight text-ink">{item.title}</h3>
                <p className="mt-4 text-body leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2">
            {MORE_ADVANTAGES.map((item) => (
              <div key={item.title}>
                <h3 className="text-2xl font-semibold tracking-tight text-ink">{item.title}</h3>
                <p className="mt-4 text-body leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <ContactSection />
    </>
  );
}
