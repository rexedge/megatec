import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { StatsCta } from "@/components/sections/stats-cta";
import { WhyChooseUs } from "@/components/sections/why-choose-us";

export const metadata: Metadata = {
  title: "Services | Megatec",
  description:
    "From installation to training, Megatec Pumps supports your fuel and gas dispensing infrastructure at every stage of its life.",
};

const SERVICES = [
  {
    title: "Installation and commissioning of fuel dispensers",
    description:
      "Expert installation and commissioning of fuel and gas dispensing systems in Nigeria — precision, safety, and regulatory compliance for your fuelling station.",
    href: "/services/installation-and-commissioning",
    image: "/images/landing/rectangle-installation.png",
  },
  {
    title: "Maintenance and repair services for fueling equipment",
    description:
      "Keep your fuel retail business running smoothly with rapid-response maintenance and repair services across Nigeria.",
    href: "/services/maintenance-and-repair",
    image: "/images/landing/rectangle-maintenance.png",
  },
  {
    title: "Technical support and troubleshooting",
    description:
      "Fast, reliable diagnosis and repair of fuel dispensers, pumps, and payment systems, minimizing downtime and protecting your revenue.",
    href: "/services/technical-support",
    image: "/images/landing/rectangle-technical-support.png",
  },
  {
    title: "Training and capacity building for operators",
    description:
      "Expert-led training programs that boost safety, accuracy, and customer satisfaction for your forecourt team.",
    href: "/services/training",
    image: "/images/landing/rectangle-training.png",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services" }]} />

      <section className="py-16 lg:py-20">
        <Container>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-ink lg:text-6xl">
            Our Services
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-body">
            We support your fuel and gas dispensing infrastructure at every stage of its life
            &mdash; from first installation, through certified maintenance and technical
            support, to training the team that runs it every day.
          </p>
        </Container>
      </section>

      <section className="pb-20 lg:pb-28">
        <Container>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
            {SERVICES.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border/70"
              >
                <div className="relative aspect-video overflow-hidden bg-surface-soft">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-8">
                  <h2 className="text-xl font-medium tracking-tight text-ink">
                    {service.title}
                  </h2>
                  <p className="text-body leading-relaxed">{service.description}</p>
                  <span className="mt-auto pt-4 text-sm font-medium tracking-tight text-ink">
                    Learn more &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <WhyChooseUs />
      <StatsCta />
    </>
  );
}
