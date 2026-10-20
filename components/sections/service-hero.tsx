import Image from "next/image";
import { Container } from "@/components/ui/container";

/** The opening block of a Services sub-page: the H1, its description and a picture. */
export function ServiceHero({
  title,
  description,
  image,
  imageAlt,
}: {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <section className="py-6 sm:py-16 lg:py-20">
      <Container>
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <h1 className="text-ink text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="text-body mt-6 max-w-2xl text-lg leading-relaxed">{description}</p>
          </div>
          <div className="bg-surface-soft relative aspect-4/3 overflow-hidden rounded-2xl">
            <Image
              src={image}
              alt={imageAlt}
              fill
              loading="eager"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
