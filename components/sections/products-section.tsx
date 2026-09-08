import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PRODUCTS } from "@/lib/nav";

const CARD_IMAGES: Record<string, string> = {
  "/products/fuel-dispensers": "/images/landing/rectangle-fuel-dispensers.png",
  "/products/cng": "/images/landing/rectangle-cng.png",
  "/products/lpg": "/images/landing/rectangle-lpg.png",
  "/products/ev-chargers": "/images/landing/rectangle-ev-charger.png",
  "/products/station-accessories": "/images/landing/rectangle-station-accessories.png",
};

export function ProductsSection() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <h2 className="max-w-md text-4xl font-semibold tracking-tight text-ink lg:text-5xl">
            Extensive range of products
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-body">
            We specialize in the mechanical heart of energy distribution. From traditional
            petroleum to the emerging EV landscape, our systems are designed for
            high-availability performance.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {PRODUCTS.map((product) => (
            <Link key={product.href} href={product.href} className="group flex flex-col gap-6">
              <div className="border-t border-border pt-6">
                <h3 className="text-xl font-medium tracking-tight text-ink">{product.title}</h3>
              </div>
              <div className="relative aspect-square overflow-hidden rounded-lg bg-surface-soft">
                <Image
                  src={CARD_IMAGES[product.href]}
                  alt={product.title}
                  fill
                  sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col items-start gap-6">
                <p className="text-body">{product.description}</p>
                <ArrowCircle />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ArrowCircle() {
  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-soft">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#091A23">
        <path d="M8 11H17.17L12.59 6.41L14 5L20 11L14 17L12.59 15.59L17.17 13H8V11Z" />
      </svg>
    </span>
  );
}
