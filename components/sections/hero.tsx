import Image from "next/image";
import { ClientLogos } from "@/components/sections/client-logos";
import { TrustBar } from "@/components/sections/trust-bar";
import { Container } from "@/components/ui/container";
import { StoryVideo } from "@/components/ui/story-video";
import { TextLink } from "@/components/ui/text-link";
import { WhatsappButton } from "@/components/ui/whatsapp-button";

/** Copy is from the Core Site Pages document, Homepage hero and Section 1 (punch list HM-02, HM-04). */
const TRUST = [
  "1,500+ Stations Equipped Nationwide",
  "SON-Certified & NMDPRA-Compliant Installations",
  "NMDPRA-Certified Calibration & Metering",
  "Assembled & Tested in Nigeria, Spare Parts Always Available",
];

/**
 * The Home hero, built like the four landing pages' (R2-13): one full-width photo
 * with a dark overlay, and the eyebrow, headline, text and buttons over it. The
 * header sits over the photo too (HERO_PAGES). The green WhatsApp button has to be
 * on the first screen of a laptop (about 665px tall) and of a phone, so the text
 * is set from the bottom of the photo and the phone sizes are one step smaller.
 * The trust bar and the client logos follow directly below.
 *
 * The photo is the Nepal Energies forecourt at Umuola, 2221px wide (row 35 keeps it).
 */
export function Hero() {
  return (
    <>
      <section className="relative flex min-h-[540px] flex-col justify-end overflow-hidden lg:min-h-svh">
        <Image
          src="/images/installations/nepal-umuola-forecourt-1.jpg"
          alt="MEGA-TEC fuel dispensers installed at a Nepal Energies filling station in Umuola"
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20" />
        {/* The header overlays this hero with white links; keep them legible over bright skies. */}
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/60 to-transparent" />

        <Container className="relative pt-36 pb-8 sm:pb-12 lg:pt-40 lg:pb-14">
          <p className="bg-leaf-dark mb-4 inline-block max-w-full rounded-full px-4 py-2 text-sm font-medium text-white sm:mb-6">
            Nigeria&apos;s No. 1 in fuel &amp; LPG dispensing
          </p>

          <h1 className="max-w-4xl text-3xl font-semibold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl">
            Powering Nigeria&apos;s fuel and energy stations, from the ground up
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 sm:mt-6 sm:text-lg">
            Fuel dispensers, LPG systems, CNG infrastructure and EV chargers. Assembled and tested in
            Nigeria, installed nationwide, and backed by spare parts that are always available.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 sm:mt-8 sm:gap-y-4">
            <WhatsappButton variant="leaf" message="Hi MEGA-TEC, I'd like to discuss a project.">
              Discuss Your Project on WhatsApp
            </WhatsappButton>
            <StoryVideo />
            <TextLink href="#products" light>
              Explore Our Solutions
            </TextLink>
          </div>
        </Container>
      </section>

      <section className="bg-hero-tint pt-6 pb-6 sm:pt-12 sm:pb-20 lg:pb-28">
        <Container>
          <TrustBar items={TRUST} />
        </Container>

        <ClientLogos className="mt-8 sm:mt-16" />
      </section>
    </>
  );
}
