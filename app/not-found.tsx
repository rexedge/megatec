import type { Metadata } from "next";
import Link from "next/link";
import { Dispenser } from "@/components/not-found/dispenser";
import { SearchTrigger } from "@/components/not-found/search-trigger";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { CategoryIcon } from "@/components/ui/products-menu";
import { WhatsappButton } from "@/components/ui/whatsapp-button";
import { getNavProducts, getSearchIndex } from "@/lib/content";
import { STATION_ACCESSORIES } from "@/lib/nav";

/**
 * The page for any address the site does not have (and for notFound(), e.g. a product
 * that was taken down). It keeps the header and footer, says plainly what happened, and
 * offers the ways on: home, search, each product range, and a person on WhatsApp.
 * Next marks 404 responses noindex itself.
 */
export const metadata: Metadata = {
  title: "Page not found | MEGA-TEC",
};

const MORE = [
  { title: "Services", href: "/services" },
  { title: "Projects", href: "/projects" },
  { title: "About us", href: "/about" },
  { title: "Contact", href: "/contact" },
];

function countLabel(href: string, count: number) {
  if (href === STATION_ACCESSORIES.href) return `${count} spare parts`;
  return `${count} ${count === 1 ? "product" : "products"}`;
}

export default async function NotFound() {
  const [products, searchIndex] = await Promise.all([getNavProducts(), getSearchIndex()]);

  return (
    <>
      <section className="py-8 sm:py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div className="order-2 lg:order-1">
              <p className="text-sea text-sm font-semibold tracking-[0.14em] uppercase">
                Error 404 · Page not found
              </p>
              <h1 className="text-ink mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                This page has run dry.
              </h1>
              <p className="text-body mt-5 max-w-xl text-lg leading-relaxed">
                The link may be out of date, or the page has moved. Everything we supply, install
                and maintain is still here: search for it, or go straight to a range below.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/" variant="dark">
                  Back to the homepage
                </Button>
                <SearchTrigger index={searchIndex} />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="bg-hero-tint mx-auto flex max-w-[240px] items-end justify-center rounded-3xl px-6 pt-8 pb-4 sm:max-w-[320px] lg:max-w-[420px] lg:px-10 lg:pt-12">
                <Dispenser className="h-auto w-full" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-12 sm:pb-20 lg:pb-28">
        <Container>
          <h2 className="text-ink text-2xl font-semibold tracking-tight sm:text-3xl">Our product ranges</h2>
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {products.map((product) => (
              <li key={product.href}>
                <Link
                  href={product.href}
                  className="group border-border hover:border-sea flex h-full items-center gap-4 rounded-2xl border bg-white p-4 transition-colors lg:flex-col lg:items-start lg:p-5"
                >
                  <CategoryIcon product={product} />
                  <span className="min-w-0">
                    <span className="text-ink group-hover:text-sea block font-semibold tracking-tight transition-colors">
                      {product.title}
                    </span>
                    <span className="text-body block text-sm">{countLabel(product.href, product.count)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="bg-accent mt-10 flex flex-col gap-6 rounded-3xl p-6 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div>
              <h2 className="text-text text-2xl font-semibold tracking-tight sm:text-3xl">Still can&rsquo;t find it?</h2>
              <p className="text-body mt-2 max-w-xl">
                Tell our team what you&rsquo;re looking for and we&rsquo;ll point you to it, or try{" "}
                {MORE.map((link, i) => (
                  <span key={link.href}>
                    <Link href={link.href} className="text-ink font-medium underline underline-offset-4 hover:no-underline">
                      {link.title}
                    </Link>
                    {i < MORE.length - 2 ? ", " : i === MORE.length - 2 ? " or " : "."}
                  </span>
                ))}
              </p>
            </div>
            <WhatsappButton
              variant="leaf"
              className="shrink-0"
              message="Hi MEGA-TEC, I couldn't find a page on your website. Could you help me?"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
