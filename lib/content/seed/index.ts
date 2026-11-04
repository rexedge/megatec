import type { Category } from "@/lib/content/types";
import { SEED_CATALOG } from "@/lib/content/seed/catalog";

export { SEED_PART_GROUPS, SEED_SPARE_PARTS } from "@/lib/content/seed/spare-parts";
export { SEED_CLIENT_LOGOS, SEED_PROJECTS, SEED_TESTIMONIALS } from "@/lib/content/seed/showcase";

/** What the PRODUCTS menu says under each category, and its icon. */
const MENU: Record<string, { menuDescription: string; icon: string }> = {
  "fuel-solutions": {
    menuDescription:
      "Installation and commissioning of fuel dispensers and gas dispensing systems.",
    icon: "/images/brand/icon-fuel-dispensers.png",
  },
  "cng-solutions": {
    menuDescription: "Reliable CNG solutions engineered for optimal performance and safety.",
    icon: "/images/brand/icon-cng.png",
  },
  "lpg-solutions": {
    menuDescription: "Innovative LPG solutions for seamless integration and maximum uptime.",
    icon: "/images/brand/icon-lpg.png",
  },
  "ev-chargers": {
    menuDescription:
      "Durable EV charging infrastructure engineered for safe, high-uptime performance.",
    icon: "/images/brand/icon-ev-charger.svg",
  },
};

/** The four product categories as first published, complete with menu lines and filters. */
export const SEED_CATEGORIES: Category[] = SEED_CATALOG.map((category) => ({
  ...category,
  ...MENU[category.slug],
  subs: category.subs.map((sub) => ({ ...sub, filters: sub.slug === "fuel-dispensers" })),
}));
