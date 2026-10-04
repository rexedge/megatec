import Image from "next/image";
import { Container } from "@/components/ui/container";
import { WhatsappButton } from "@/components/ui/whatsapp-button";

/**
 * The client logos Megatec supplied, in the order they numbered them. These
 * replaced the seven in the Figma export, of which only MRS was a named client.
 *
 * TODO(assets): written permission to display each logo is still unconfirmed.
 * Asset request item 3.
 */
const CLIENT_LOGOS = [
  { name: "Lado Oil", src: "/images/clients/lado-oil.png", width: 243, height: 67 },
  { name: "Masters Energy", src: "/images/clients/masters-energy.png", width: 446, height: 445 },
  { name: "SEEPCO", src: "/images/clients/seepco.png", width: 143, height: 190 },
  { name: "NIPCO Gas", src: "/images/clients/nipco.png", width: 341, height: 127 },
  { name: "Nepal Energies", src: "/images/clients/nepal-energies.png", width: 410, height: 125 },
  { name: "CRCC and CCECC", src: "/images/clients/crcc-ccecc.png", width: 341, height: 161 },
  { name: "MRS", src: "/images/clients/mrs.png", width: 318, height: 339 },
  { name: "United States Embassy", src: "/images/clients/us-embassy.png", width: 448, height: 446 },
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
