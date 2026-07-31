import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";

const SERVICE_CARDS = [
  {
    title: "Installation and commissioning",
    description:
      "High-precision dispensing systems and underground tank management for global retail networks.",
    href: "/services/installation-and-commissioning",
    image: "/images/landing/rectangle-installation.png",
  },
  {
    title: "Technical support and troubleshooting",
    description:
      "High-precision dispensing systems and underground tank management for global retail networks.",
    href: "/services/technical-support",
    image: "/images/landing/rectangle-technical-support.png",
  },
  {
    title: "Expert and qualified maintenance and repair services",
    description:
      "High-precision dispensing systems and underground tank management for global retail networks.",
    href: "/services/maintenance-and-repair",
    image: "/images/landing/rectangle-maintenance.png",
  },
  {
    title: "Training and capacity building for operators",
    description:
      "High-precision dispensing systems and underground tank management for global retail networks.",
    href: "/services/training",
    image: "/images/landing/rectangle-training.png",
  },
];

export function ServicesSection() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <h2 className="max-w-md text-4xl font-semibold tracking-tight text-ink lg:text-5xl">
            We provide the following services
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-body">
            We specialize in the mechanical heart of energy distribution. From traditional
            petroleum to the emerging EV landscape, our systems are designed for
            high-availability performance.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICE_CARDS.map((service) => (
            <Link key={service.title} href={service.href} className="group flex flex-col gap-6">
              <div className="border-t border-border pt-6">
                <h3 className="text-xl font-medium tracking-tight text-ink">{service.title}</h3>
              </div>
              <div className="relative aspect-square overflow-hidden rounded-lg bg-surface-soft">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex items-start justify-between gap-4">
                <p className="text-body">{service.description}</p>
                <ArrowCircle />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ArrowCircle() {
  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-soft">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#091A23">
        <path d="M8 11H17.17L12.59 6.41L14 5L20 11L14 17L12.59 15.59L17.17 13H8V11Z" />
      </svg>
    </span>
  );
}
