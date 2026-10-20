import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { WhatsappButton } from "@/components/ui/whatsapp-button";
import { ContactSection } from "@/components/sections/contact-section";
import { TrustBar } from "@/components/sections/trust-bar";

/** Copy is verbatim from the Services Pages document, "Category page: Services" (punch list SV-01). */
export const metadata: Metadata = {
  title: "Services | Installation, Maintenance & Support | MEGA-TEC",
  description:
    "MEGA-TEC provides installation, maintenance, technical support and training for fuel, LPG, CNG and EV equipment across Nigeria. Certified technicians, nationwide coverage.",
};

const TRUST_ITEMS = [
  "Certified Technicians Nationwide",
  "24-Hour Response Time",
  "1-Year Warranty on All Dispensers",
  "Spare Parts Always Available",
];

/** No Custom Integration tile: Mega-Tec has not supplied real detail for it yet. */
const SERVICES = [
  {
    title: "Installation & Commissioning",
    href: "/services/installation-and-commissioning",
    image: "/images/landing/rectangle-installation.png",
  },
  {
    title: "Maintenance & Repair",
    href: "/services/maintenance-and-repair",
    image: "/images/landing/rectangle-maintenance.png",
  },
  {
    title: "Technical Support & Troubleshooting",
    href: "/services/technical-support",
    image: "/images/landing/rectangle-technical-support.png",
  },
  {
    title: "Training & Capacity Building",
    href: "/services/training",
    image: "/images/landing/rectangle-training.png",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services" }]} />

      <section className="py-6 sm:py-16 lg:py-20">
        <Container>
          <h1 className="text-ink max-w-4xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            Full-service support, from installation to the lifetime of your equipment
          </h1>
          <p className="text-body mt-6 max-w-3xl text-lg leading-relaxed">
            Buying the right equipment is only half the job. MEGA-TEC installs it properly, keeps
            it running, and supports your team for as long as you operate it, with certified
            technicians available nationwide.
          </p>
          <div className="mt-8">
            <WhatsappButton
              variant="leaf"
              message="Hi MEGA-TEC, I'd like to talk to your team about your services."
            >
              Talk to Our Team on WhatsApp
            </WhatsappButton>
          </div>
        </Container>
      </section>

      <section className="py-6 sm:pt-0 sm:pb-12">
        <Container>
          <TrustBar items={TRUST_ITEMS} />
        </Container>
      </section>

      <section className="py-6 sm:pt-0 sm:pb-20 lg:pb-28">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-10">
            {SERVICES.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group border-border/70 flex flex-col overflow-hidden rounded-2xl border"
              >
                <div className="bg-surface-soft relative aspect-video overflow-hidden">
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between gap-4 p-6 sm:p-8">
                  <h2 className="text-ink text-xl font-medium tracking-tight">{service.title}</h2>
                  <svg
                    viewBox="0 0 24 24"
                    className="text-ink h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <ContactSection buttonLabel="Talk to Our Team on WhatsApp" />
    </>
  );
}
