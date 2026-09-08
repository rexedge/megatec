"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/sections/product-card";
import {
  CATALOGUE_FACETS,
  getCategory,
  productsIn,
  type CategorySlug,
  type FacetKey,
} from "@/lib/catalogue";
import { cn } from "@/lib/cn";

const ALL = "All";

type Selection = Record<FacetKey, string>;

const EMPTY: Selection = {
  flowRate: ALL,
  nozzles: ALL,
  application: ALL,
  fuelType: ALL,
};

export function Catalogue({ category }: { category: CategorySlug }) {
  const { title, description } = getCategory(category);
  const products = useMemo(() => productsIn(category), [category]);

  const [filtersOpen, setFiltersOpen] = useState(true);
  const [selection, setSelection] = useState<Selection>(EMPTY);

  /** Every value present in this category, per facet, in first-seen order. */
  const options = useMemo(() => {
    const result = {} as Record<FacetKey, string[]>;
    for (const { key } of CATALOGUE_FACETS) {
      result[key] = [...new Set(products.map((product) => product[key]))];
    }
    return result;
  }, [products]);

  const visible = products.filter((product) =>
    CATALOGUE_FACETS.every(
      ({ key }) => selection[key] === ALL || product[key] === selection[key]
    )
  );

  const active = CATALOGUE_FACETS.filter(({ key }) => selection[key] !== ALL);

  return (
    <section className="py-12 lg:py-16">
      <Container>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-ink lg:text-6xl">
          {title}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-body">{description}</p>

        <button
          type="button"
          onClick={() => setFiltersOpen((open) => !open)}
          aria-expanded={filtersOpen}
          className="mt-8 inline-flex items-center gap-3 rounded-lg border border-border px-5 py-3 text-base text-ink transition-colors hover:bg-surface-soft"
        >
          <FilterIcon />
          Filters
        </button>

        {filtersOpen && (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CATALOGUE_FACETS.map(({ key, label }) => (
              <div key={key} className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-4">
                  <label htmlFor={`filter-${key}`} className="text-sm text-body">
                    {label}
                  </label>
                  <button
                    type="button"
                    onClick={() => setSelection((current) => ({ ...current, [key]: ALL }))}
                    className="text-sm text-body transition-colors hover:text-ink"
                  >
                    Clear
                  </button>
                </div>
                <div className="relative">
                  <select
                    id={`filter-${key}`}
                    value={selection[key]}
                    onChange={(event) =>
                      setSelection((current) => ({ ...current, [key]: event.target.value }))
                    }
                    className="w-full appearance-none rounded-lg bg-surface-soft px-4 py-3.5 pr-11 text-ink focus:ring-2 focus:ring-sky focus:outline-none"
                  >
                    <option value={ALL}>{ALL}</option>
                    {options[key].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-body" />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {active.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setSelection((current) => ({ ...current, [key]: ALL }))}
                className="inline-flex items-center gap-2 rounded-lg bg-surface-soft px-3 py-2 text-sm text-ink transition-colors hover:bg-muted"
              >
                <span className="sr-only">Remove {label} filter: </span>
                {selection[key]}
                <CloseIcon />
              </button>
            ))}
          </div>
          <p aria-live="polite" className="text-sm text-body">
            Showing {visible.length} of {products.length}
          </p>
        </div>

        {visible.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((product) => (
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
                specSheetHref={
                  product.specSheet ? `/spec-sheets/${product.specSheet}` : undefined
                }
              />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-border/70 p-12 text-center">
            <p className="text-lg text-ink">Nothing matches these filters.</p>
            <button
              type="button"
              onClick={() => setSelection(EMPTY)}
              className="mt-3 text-base font-medium text-sky underline underline-offset-4"
            >
              Clear all filters
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}

function FilterIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M4 7h16M7 12h10M10 17h4" />
    </svg>
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-5 w-5", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
