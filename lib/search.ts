import { CATALOGUE, catalogueHref, getCategory } from "@/lib/catalogue";
import { PRODUCTS, SERVICES } from "@/lib/nav";

export type SearchEntry = {
  title: string;
  /** Where the result sits — shown under the title. */
  context: string;
  href: string;
  /** Extra text matched against, but not displayed. */
  keywords: string;
};

const PAGES: SearchEntry[] = [
  {
    title: "Home",
    context: "Page",
    href: "/",
    keywords: "landing fuel infrastructure solutions megatec",
  },
  {
    title: "About us",
    context: "Page",
    href: "/about",
    keywords: "our story mission journey expertise company history",
  },
  {
    title: "Contact",
    context: "Page",
    href: "/#contact",
    keywords: "get in touch head office lagos phone email enquiry quote",
  },
  {
    title: "All services",
    context: "Page",
    href: "/services",
    keywords: "installation maintenance repair technical support training",
  },
];

/**
 * A flat index built at module scope from the same data the pages render, so a
 * new product or service shows up in search without a second edit.
 */
export const SEARCH_INDEX: SearchEntry[] = [
  ...PAGES,

  ...PRODUCTS.map((product) => ({
    title: product.title,
    context: "Solutions",
    href: product.href,
    keywords: product.description,
  })),

  ...SERVICES.map((service) => ({
    title: service.title,
    context: "Services",
    href: service.href,
    keywords: "service support megatec",
  })),

  ...CATALOGUE.map((product) => ({
    title: product.name,
    context: getCategory(product.category).title,
    href: catalogueHref(product.category),
    keywords: [
      ...product.specs,
      product.flowRate,
      product.nozzles,
      product.application,
      product.fuelType,
    ].join(" "),
  })),
];

export function searchSite(query: string, limit = 8): SearchEntry[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];

  return SEARCH_INDEX.map((entry) => {
    const title = entry.title.toLowerCase();
    const haystack = `${title} ${entry.context} ${entry.keywords}`.toLowerCase();

    let score = 0;
    for (const term of terms) {
      if (title.startsWith(term)) score += 4;
      else if (title.includes(term)) score += 3;
      else if (haystack.includes(term)) score += 1;
      else return { entry, score: -1 };
    }
    return { entry, score };
  })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((result) => result.entry);
}
