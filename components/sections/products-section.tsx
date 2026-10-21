import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

/**
 * Copy is from the Core Site Pages document, Homepage Section 2 (punch list HM-06).
 * Each card goes to its product category page, never a landing page, and the hero's
 * "Explore Our Solutions" link scrolls here.
 */
const CARDS = [
  {
    title: "Fuel Dispensers",
    description: "Single to multi-product units, supplied, installed and calibrated.",
    link: "Explore Fuel Dispensers",
    href: "/products/fuel-solutions",
    image: "/images/landing/rectangle-fuel-dispensers.png",
  },
  {
    title: "LPG Systems",
    description: "Dispensers, skid plants and storage, built to NMDPRA standards.",
    link: "Explore LPG Systems",
    href: "/products/lpg-solutions",
    image: "/images/landing/rectangle-lpg.png",
  },
  {
    title: "CNG Infrastructure",
    description: "Complete stations, dispensers and daughter stations for Nigeria's move to CNG.",
    link: "Explore CNG Solutions",
    href: "/products/cng-solutions",
    image: "/images/landing/rectangle-cng.png",
  },
  {
    title: "EV Chargers",
    description: "Commercial fast chargers and home charging, professionally installed.",
    link: "Explore EV Chargers",
    href: "/products/ev-chargers",
    image: "/images/landing/rectangle-ev-charger.png",
  },
];

export function ProductsSection() {
  return (
    <section id="products" className="scroll-mt-36 py-6 sm:py-20 lg:py-28">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <h2 className="max-w-xl text-4xl font-semibold tracking-tight text-balance text-ink lg:text-5xl">
            One partner for every fueling and charging need
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-body">
            From petrol forecourts to the energy transition, MEGA-TEC equips it all.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card) => (
            <Reveal key={card.href}>
            <Link href={card.href} className="group flex flex-col gap-6 transition-transform duration-200 hover:-translate-y-1">
              <div className="border-t border-border pt-6">
                <h3 className="text-xl font-medium tracking-tight text-ink">{card.title}</h3>
              </div>
              <div className="relative aspect-square overflow-hidden rounded-lg bg-surface-soft">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col items-start gap-4">
                <p className="text-body">{card.description}</p>
                <span className="font-medium text-ink underline underline-offset-4">
                  {card.link} →
                </span>
              </div>
            </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
