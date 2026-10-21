import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { ClosingCta } from "@/components/sections/closing-cta";
import { ProductGrid } from "@/components/sections/product-grid";
import { JsonLd, productsJsonLd } from "@/components/ui/json-ld";
import { PRODUCT_CATEGORIES } from "@/lib/product-pages";
import { absoluteUrl } from "@/lib/site";

/**
 * A sub-category page (05 doc, "SUB-CATEGORY" sections): the two-up product grid
 * with each product's drawer, and a short enquiry form at the foot. Only the Fuel
 * Dispensers page has filters (ST-08).
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCT_CATEGORIES.flatMap((category) =>
    category.subs.map((sub) => ({ category: category.slug, sub: sub.slug }))
  );
}

type Props = { params: Promise<{ category: string; sub: string }> };

function find(category: string, sub: string) {
  const page = PRODUCT_CATEGORIES.find((c) => c.slug === category);
  const subPage = page?.subs.find((s) => s.slug === sub);
  return page && subPage ? { page, subPage } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, sub } = await params;
  const found = find(category, sub);
  return found ? { title: found.subPage.title, description: found.subPage.meta } : {};
}

export default async function SubCategoryPage({ params }: Props) {
  const { category, sub } = await params;
  const found = find(category, sub);
  if (!found) notFound();
  const { page, subPage } = found;

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: page.name, href: `/products/${page.slug}` },
          { label: subPage.name },
        ]}
      />

      {productsJsonLd(
        subPage.products.map((product) => ({
          name: product.name,
          description: product.description,
          image: product.image,
          path: `/products/${page.slug}/${subPage.slug}`,
        })),
        absoluteUrl
      ).map((data) => (
        <JsonLd key={data.name} data={data} />
      ))}

      <section className="py-6 sm:py-12 lg:py-16">
        <Container>
          <h1 className="text-ink max-w-4xl text-3xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {subPage.h1 ?? subPage.name}
          </h1>
          {subPage.intro.map((line) => (
            <p key={line} className="text-body mt-6 max-w-3xl text-lg leading-relaxed">
              {line}
            </p>
          ))}

          <div className="mt-8 sm:mt-12">
            <ProductGrid
              products={subPage.products}
              filters={subPage.slug === "fuel-dispensers"}
            />
          </div>
        </Container>
      </section>

      <ClosingCta title={subPage.form} />
    </>
  );
}
