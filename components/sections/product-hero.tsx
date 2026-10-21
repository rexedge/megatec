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
  whatsappLabel = "Talk to Our Team on WhatsApp",
  email,
  badges,
  eyebrow,
  extra,
}: {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  whatsappMessage: string;
  whatsappLabel?: string;
  /** Offered beside the WhatsApp button, for pages where an email address is the brief. */
  email?: string;
  badges?: ProductHeroBadge[];
  /** Green pill above the headline (the landing pages' only credibility line, LE-03). */
  eyebrow?: string;
  /** A TEXT LINK under the button, e.g. "View Our Installations →". */
  extra?: React.ReactNode;
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
        {/* The header overlays this hero with white links; keep them legible over bright skies. */}
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/60 to-transparent" />
        <Container className="relative pt-28 pb-8 sm:pb-16">
          {eyebrow && (
            <p className="bg-leaf-dark mb-6 inline-block max-w-full rounded-full px-4 py-2 text-sm font-medium text-white">
              {eyebrow}
            </p>
          )}
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90">{description}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <WhatsappButton variant="leaf" message={whatsappMessage}>
              {whatsappLabel}
            </WhatsappButton>
            {email && (
              <a
                href={`mailto:${email}`}
                className="text-white/90 underline underline-offset-4 hover:text-white"
              >
                or email {email}
              </a>
            )}
            {extra}
          </div>
        </Container>
      </div>

      {badges && badges.length > 0 && (
        <div className="bg-surface-soft py-6 sm:py-10">
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
