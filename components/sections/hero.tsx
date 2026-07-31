import Image from "next/image";
import { Container } from "@/components/ui/container";
import { WhatsappButton } from "@/components/ui/whatsapp-button";

const CLIENT_LOGOS = [
  { src: "/images/landing/logo-1.svg", width: 124, height: 34 },
  { src: "/images/landing/logo-2.svg", width: 85, height: 28 },
  { src: "/images/landing/logo-3.svg", width: 73, height: 27 },
  { src: "/images/landing/logo-4.svg", width: 96, height: 20 },
  { src: "/images/landing/logo-5.svg", width: 71, height: 31 },
  { src: "/images/landing/logo-6.svg", width: 123, height: 20 },
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

        <div className="mt-20 flex w-full flex-wrap items-center justify-center gap-x-16 gap-y-6">
          {CLIENT_LOGOS.map((logo) => (
            <Image
              key={logo.src}
              src={logo.src}
              alt=""
              width={logo.width}
              height={logo.height}
              className="h-6 w-auto opacity-70 grayscale sm:h-7"
            />
          ))}
        </div>

        <div className="relative mt-16 aspect-video w-full overflow-hidden rounded-3xl bg-surface-soft">
          <Image
            src="/images/landing/rectangle-fuel-dispensers.png"
            alt="Megatec fuel dispensing equipment"
            fill
            sizes="(min-width: 1280px) 1280px, 100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <Image
              src="/images/landing/play-button.svg"
              alt="Play video"
              width={64}
              height={64}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
