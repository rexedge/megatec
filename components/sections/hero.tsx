import Image from "next/image";
import { Container } from "@/components/ui/container";
import { WhatsappButton } from "@/components/ui/whatsapp-button";

/** Clients shown in the Figma landing page, extracted from the design export. */
const CLIENT_LOGOS = [
  { name: "Northwest Petroleum & Gas", src: "/images/clients/northwest.png", width: 300, height: 240 },
  { name: "Mikano International", src: "/images/clients/mikano.png", width: 300, height: 154 },
  { name: "MRS", src: "/images/clients/mrs.png", width: 280, height: 300 },
  { name: "Eterna", src: "/images/clients/eterna.png", width: 287, height: 300 },
  { name: "Flour Mills of Nigeria", src: "/images/clients/fmn.png", width: 300, height: 233 },
  { name: "Enyo Retail and Supply", src: "/images/clients/enyo.png", width: 300, height: 83 },
  { name: "Dangote", src: "/images/clients/dangote.png", width: 300, height: 167 },
];

export function Hero() {
  return (
    <section className="bg-hero-tint pt-16 pb-20 lg:pt-24 lg:pb-28">
      <Container className="flex flex-col items-center text-center">
        <span className="mb-8 inline-flex items-center rounded-full bg-accent-soft px-3 py-2 text-sm text-text">
          ENGINEERING EXCELLENCE
        </span>

        <h1 className="max-w-5xl text-4xl font-semibold tracking-tight text-ink sm:text-6xl lg:text-7xl">
          Powering fuel infrastructure solutions on the market
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-relaxed text-body">
          High-fidelity precision engineering for modern energy landscapes. We
          provide the durable mechanics and intelligent systems that keep fuels
          moving with zero compromise.
        </p>

        <div className="mt-10">
          <WhatsappButton variant="sky">Talk to our team on whatsapp</WhatsappButton>
        </div>

        <div className="relative mt-16 aspect-video w-full overflow-hidden rounded-3xl bg-surface-soft">
          <Image
            src="/images/landing/hero-dispenser.png"
            alt="Megatec fuel dispensing equipment"
            fill
            sizes="(min-width: 1280px) 1280px, 100vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="mt-16 flex w-full flex-wrap items-center justify-center gap-x-12 gap-y-8 lg:gap-x-16">
          {CLIENT_LOGOS.map((logo) => (
            <Image
              key={logo.src}
              src={logo.src}
              alt={logo.name}
              width={logo.width}
              height={logo.height}
              className="max-h-11 w-auto max-w-24 object-contain opacity-80 grayscale sm:max-h-14 sm:max-w-28"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
