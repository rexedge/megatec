import Image from "next/image";
import { Container } from "@/components/ui/container";
import { WhatsappButton } from "@/components/ui/whatsapp-button";

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
            src="/images/landing/rectangle-fuel-dispensers.png"
            alt="Megatec fuel dispensing equipment"
            fill
            sizes="(min-width: 1280px) 1280px, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </Container>
    </section>
  );
}
