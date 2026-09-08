import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { WhatsappButton } from "@/components/ui/whatsapp-button";
import { cn } from "@/lib/cn";

const SERVICES = [
  {
    title: "Installation and commissioning",
    description:
      "Expert installation and setup of Megatec systems, ensuring seamless integration and peak performance from day one.",
    href: "/services/installation-and-commissioning",
    image: "/images/landing/rectangle-installation.png",
    message: "Hi Megatec, I'd like to discuss installation and commissioning.",
  },
  {
    title: "Technical support and troubleshooting",
    description:
      "Rapid response technical assistance and remote diagnostics to minimize downtime and maximize operational efficiency.",
    href: "/services/technical-support",
    image: "/images/landing/rectangle-technical-support.png",
    message: "Hi Megatec, I'd like to discuss technical support and troubleshooting.",
  },
  {
    title: "Expert and qualified maintenance and repair services",
    description:
      "Certified technicians providing comprehensive maintenance and swift repairs, ensuring the longevity and reliability of your equipment.",
    href: "/services/maintenance-and-repair",
    image: "/images/landing/rectangle-maintenance.png",
    message: "Hi Megatec, I'd like to discuss maintenance and repair services.",
  },
  {
    title: "Training and capacity building for operators",
    description:
      "Hands-on training programs designed to empower your team with the knowledge and skills for optimal system operation and safety.",
    href: "/services/training",
    image: "/images/landing/rectangle-training.png",
    message: "Hi Megatec, I'd like to discuss operator training.",
  },
];

export function ServicesSection() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <h2 className="text-ink max-w-md text-4xl font-semibold tracking-tight lg:text-5xl">
            We provide the following services
          </h2>
          <p className="text-body max-w-xl text-lg leading-relaxed">
            We specialize in the mechanical heart of energy distribution. From traditional
            petroleum to the emerging EV landscape, our systems are designed for
            high-availability performance.
          </p>
        </div>

        <div className="mt-14 flex flex-col gap-10">
          {SERVICES.map((service, index) => {
            const imageFirst = index % 2 === 1;
            return (
              <div
                key={service.title}
                className="grid grid-cols-1 overflow-hidden rounded-2xl md:grid-cols-2"
              >
                <div
                  className={cn(
                    "bg-surface-soft flex flex-col justify-center gap-6 p-10 lg:p-16",
                    imageFirst && "md:order-2"
                  )}
                >
                  <h3 className="text-ink text-3xl font-semibold tracking-tight lg:text-4xl">
                    <Link href={service.href} className="hover:underline">
                      {service.title}
                    </Link>
                  </h3>
                  <p className="text-body max-w-md leading-relaxed">{service.description}</p>
                  <div>
                    <WhatsappButton variant="sky" message={service.message}>
                      Chat on whatsapp
                    </WhatsappButton>
                  </div>
                </div>

                <div
                  className={cn(
                    "bg-muted relative min-h-70 md:min-h-105",
                    imageFirst && "md:order-1"
                  )}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
