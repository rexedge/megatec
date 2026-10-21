import Image from "next/image";
import { ClientLogos } from "@/components/sections/client-logos";
import { TrustBar } from "@/components/sections/trust-bar";
import { Container } from "@/components/ui/container";
import { TextLink } from "@/components/ui/text-link";
import { WhatsappButton } from "@/components/ui/whatsapp-button";

/** Copy is from the Core Site Pages document, Homepage hero and Section 1 (punch list HM-02, HM-04). */
const TRUST = [
  "1,500+ Stations Equipped Nationwide",
  "SON-Certified & NMDPRA-Compliant Installations",
  "NMDPRA-Certified Calibration & Metering",
  "Assembled & Tested in Nigeria, Spare Parts Always Available",
];

export function Hero() {
  return (
    <section className="bg-hero-tint pt-8 pb-6 sm:pt-16 sm:pb-20 lg:pt-24 lg:pb-28">
      <Container className="flex flex-col items-center text-center">
        <span className="mb-8 inline-flex items-center rounded-full bg-accent-soft px-3 py-2 text-sm text-text">
          Nigeria&apos;s No. 1 in fuel &amp; LPG dispensing
        </span>

        <h1 className="max-w-5xl text-4xl font-semibold tracking-tight text-balance text-ink sm:text-6xl lg:text-7xl">
          Powering Nigeria&apos;s fuel and energy stations, from the ground up
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-body">
          Fuel dispensers, LPG systems, CNG infrastructure and EV chargers. Assembled and tested in
          Nigeria, installed nationwide, and backed by spare parts that are always available.
        </p>

        <div className="mt-6 flex flex-col items-center gap-x-8 gap-y-4 sm:mt-10 sm:flex-row">
          <WhatsappButton variant="leaf" message="Hi MEGA-TEC, I'd like to discuss a project.">
            Discuss Your Project on WhatsApp
          </WhatsappButton>
          <TextLink href="#products">Explore Our Solutions</TextLink>
        </div>

        {/* A real MEGA-TEC forecourt stands in until the supplied hero photo arrives (HM-03);
            the cut-out dispenser is not shipped. */}
        <div className="relative mt-8 sm:mt-16 aspect-video w-full overflow-hidden rounded-3xl bg-surface-soft">
          <Image
            src="/images/installations/nepal-umuola-forecourt-1.jpg"
            alt="MEGA-TEC fuel dispensers installed at a Nepal Energies filling station in Umuola"
            fill
            sizes="(min-width: 1280px) 1280px, 100vw"
            quality={90}
            className="object-cover"
            priority
          />
        </div>

        <div className="mt-8 w-full sm:mt-12">
          <TrustBar items={TRUST} />
        </div>
      </Container>

      <ClientLogos className="mt-8 sm:mt-16" />
    </section>
  );
}
