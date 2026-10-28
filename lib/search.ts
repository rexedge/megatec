import type { Category, NavProduct, SearchEntry, SparePart } from "@/lib/content/types";
import { SERVICES } from "@/lib/nav";

export type { SearchEntry };

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
 * The flat search index, built on the server from the same content the pages render
 * (getSearchIndex in lib/content) and handed to the search dialog, so a product added
 * in the admin is findable without a second edit.
 */
export function buildSearchIndex(
  nav: NavProduct[],
  catalog: Category[],
  parts: SparePart[]
): SearchEntry[] {
  return [
    ...PAGES,

    ...nav.map((product) => ({
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
    ...catalog.flatMap((category) =>
      category.subs.flatMap((sub) =>
        sub.products.map((product) => ({
          title: product.name,
          context: category.name,
          href: `/products/${category.slug}/${sub.slug}`,
          keywords: [product.blurb, ...product.cells.map(([, value]) => value)].join(" "),
        }))
      )
    ),

    ...parts.map((part) => ({
      title: part.name,
      context: "Spare parts",
      href: part.href ?? "/products/station-accessories",
      keywords: `${part.fit} ${part.group}`,
    })),
  ];
}

export function searchSite(index: SearchEntry[], query: string, limit = 8): SearchEntry[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];

  return index.map((entry) => {
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
