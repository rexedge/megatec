import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/sections/product-card";
import { getCategory, productsIn, type CategorySlug } from "@/lib/catalogue";

/**
 * A category's product list. It has no filters: punch list ST-08 removes the
 * generic four (flow rate, nozzle count, application, fuel type) from every
 * product page. The filters it keeps arrive with their pages: nozzle and meter
 * type on the Fuel Dispensers sub-category (PF-01), category pills and search
 * on the Station Accessories parts list (PA-01).
 */
export function Catalogue({ category }: { category: CategorySlug }) {
  const { title, description } = getCategory(category);
  const products = productsIn(category);

  return (
    <section className="py-6 sm:py-12 lg:py-16">
      <Container>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-ink lg:text-6xl">
          {title}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-body">{description}</p>

        <p className="mt-8 text-sm text-body">Showing {products.length} products</p>

        <div className="mt-8 grid grid-cols-1 gap-3 min-[320px]:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              title={product.name}
              specs={product.specs}
              bestSeller={product.bestSeller}
              nmdpra={product.nmdpra}
              ctaLabel="Enquire on WhatsApp"
              ctaVariant="dark"
              whatsappMessage={`Hi Megatec, I'd like to enquire about the ${product.name}.`}
              specSheetHref={product.specSheet ? `/spec-sheets/${product.specSheet}` : undefined}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
