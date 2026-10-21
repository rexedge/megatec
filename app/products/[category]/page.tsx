import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { WhatsappButton } from "@/components/ui/whatsapp-button";
import { TrustBar } from "@/components/sections/trust-bar";
import { PRODUCT_CATEGORIES } from "@/lib/product-pages";

/**
 * The four category pages (05 doc, "CATEGORY" sections): a signpost with trust
 * lines and a tile for each sub-category. No product grid and no form: the
 * visitor converts one click deeper (punch list PF-01, PC-01, PL-01, PE-01).
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCT_CATEGORIES.map((category) => ({ category: category.slug }));
}

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const page = PRODUCT_CATEGORIES.find((c) => c.slug === category);
  return page ? { title: page.title, description: page.meta } : {};
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const page = PRODUCT_CATEGORIES.find((c) => c.slug === category);
  if (!page) notFound();

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: page.name }]} />

      <section className="py-6 sm:py-16 lg:py-20">
        <Container>
          <h1 className="text-ink max-w-4xl text-3xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {page.headline}
          </h1>
          <p className="text-body mt-6 max-w-3xl text-lg leading-relaxed">{page.intro}</p>
          <WhatsappButton
            variant="leaf"
            className="mt-8"
            message={`Hi MEGA-TEC, I'd like to talk to your team about ${page.name}.`}
          >
            {page.cta}
          </WhatsappButton>
        </Container>
      </section>

      <section className="py-6 sm:pt-0 sm:pb-12">
        <Container>
          <TrustBar items={page.bullets} />
        </Container>
      </section>

      <section className="py-6 sm:pb-20 lg:pb-28">
        <Container>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {page.subs.map((sub) => (
              <li key={sub.slug}>
                <Link
                  href={`/products/${page.slug}/${sub.slug}`}
                  className="bg-surface-soft hover:bg-accent/50 flex h-full flex-col justify-between gap-6 rounded-2xl p-6 transition-colors"
                >
                  <span>
                    <span className="text-ink block text-xl font-medium tracking-tight">
                      {sub.name}
                    </span>
                    <span className="text-body mt-2 block text-sm">
                      {sub.products.length} {sub.products.length === 1 ? "product" : "products"}
                    </span>
                  </span>
                  <span className="text-ink font-medium">View range →</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
