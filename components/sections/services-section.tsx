import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { WhatsappButton } from "@/components/ui/whatsapp-button";
import { cn } from "@/lib/cn";

const SERVICES = [
  {
    title: "Installation and commissioning",
    description:
      "Expert installation and setup of MEGA-TEC systems, ensuring seamless integration and peak performance from day one. Every project follows the same disciplined process, whether it's a single dispenser or a full station.",
    href: "/services/installation-and-commissioning",
    image: "/images/landing/rectangle-installation.png",
    message: "Hi MEGA-TEC, I'd like to discuss installation and commissioning.",
  },
  {
    title: "Technical support and troubleshooting",
    description:
      "When something goes wrong, you need answers fast. Our technical team responds within 24 hours, with technicians based nationwide so help is never far away.",
    href: "/services/technical-support",
    image: "/images/landing/rectangle-technical-support.png",
    message: "Hi MEGA-TEC, I'd like to discuss technical support and troubleshooting.",
  },
  {
    title: "Expert and qualified maintenance and repair services",
    description:
      "Certified technicians providing comprehensive maintenance and swift repairs, ensuring the longevity and reliability of your equipment. We stock the spare parts our dispensers run on, so a breakdown is never a long wait.",
    href: "/services/maintenance-and-repair",
    image: "/images/landing/rectangle-maintenance.png",
    message: "Hi MEGA-TEC, I'd like to discuss maintenance and repair services.",
  },
  {
    title: "Training and capacity building for operators",
    description:
      "New equipment is only as good as the people running it. MEGA-TEC trains station operators to use, maintain and troubleshoot their equipment safely and effectively, so your team is confident from day one.",
    href: "/services/training",
    image: "/images/landing/rectangle-training.png",
    message: "Hi MEGA-TEC, I'd like to discuss operator training.",
  },
];

export function ServicesSection() {
  return (
    <section className="py-6 sm:py-20 lg:py-28">
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

        <div className="mt-8 sm:mt-14 flex flex-col gap-6 sm:gap-10">
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
                      Talk to Our Team on WhatsApp
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
