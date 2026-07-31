import Image from "next/image";
import { Container } from "@/components/ui/container";
import { WhatsappButton } from "@/components/ui/whatsapp-button";

export type ProductHeroBadge = {
  label: string;
  icon: React.ReactNode;
};

export function ProductHero({
  title,
  description,
  image,
  imageAlt,
  whatsappMessage,
  whatsappLabel = "Chat on WhatsApp",
  badges,
}: {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  whatsappMessage: string;
  whatsappLabel?: string;
  badges?: ProductHeroBadge[];
}) {
  return (
    <section>
      <div className="relative flex min-h-[560px] flex-col justify-end overflow-hidden lg:min-h-svh">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
        <Container className="relative py-16">
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90">{description}</p>
          <div className="mt-8">
            <WhatsappButton variant="leaf" message={whatsappMessage}>
              {whatsappLabel}
            </WhatsappButton>
          </div>
        </Container>
      </div>

      {badges && badges.length > 0 && (
        <div className="bg-surface-soft py-10">
          <Container>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {badges.map((badge) => (
                <div key={badge.label} className="flex flex-col items-center gap-3 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-ink">
                    {badge.icon}
                  </span>
                  <p className="text-sm font-medium text-ink">{badge.label}</p>
                </div>
              ))}
            </div>
          </Container>
        </div>
      )}
    </section>
  );
}
