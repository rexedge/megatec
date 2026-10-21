import { SPARE_PARTS } from "@/lib/spare-parts";
import { PRODUCT_CATEGORIES } from "@/lib/product-pages";
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
    title: "Projects & Installations",
    context: "Page",
    href: "/projects",
    keywords: "our installations completed work nepal energies sterling canico stations nationwide",
  },
  {
    title: "Contact",
    context: "Page",
    href: "/contact",
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
    context: "Products",
    href: product.href,
    keywords: product.description,
  })),

  ...SERVICES.map((service) => ({
    title: service.title,
    context: "Services",
    href: service.href,
    keywords: "service support megatec",
  })),

  // Fuel, CNG, LPG and EV products link to their sub-category page; spare parts to the list.
  ...PRODUCT_CATEGORIES.flatMap((category) =>
    category.subs.flatMap((sub) =>
      sub.products.map((product) => ({
        title: product.name,
        context: category.name,
        href: `/products/${category.slug}/${sub.slug}`,
        keywords: [product.blurb, ...product.cells.map(([, value]) => value)].join(" "),
      }))
    )
  ),

  ...SPARE_PARTS.map((part) => ({
    title: part.name,
    context: "Spare parts",
    href: part.href ?? "/products/station-accessories",
    keywords: `${part.fit} ${part.group}`,
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
