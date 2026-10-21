import { getCategory, productsIn, type CategorySlug } from "@/lib/catalogue";
import { SPARE_PARTS } from "@/lib/spare-parts";
import { PRODUCT_CATEGORIES } from "@/lib/product-pages";

export type NavProduct = {
  title: string;
  description: string;
  href: string;
  icon: string;
  /** Products in the category, shown in the menu (punch list ST-01's "18 products"). */
  count: number;
  /** The category's sub-category pages (ST-01), for the menu to expand. */
  subs: { title: string; href: string }[];
};

export type NavService = {
  title: string;
  href: string;
};

function category(slug: CategorySlug, href: string, icon: string): NavProduct {
  const { title, description } = getCategory(slug);
  // The four categories with sub-category pages count what those pages list.
  const page = PRODUCT_CATEGORIES.find((c) => `/products/${c.slug}` === href);
  const count = page
    ? page.subs.reduce((total, sub) => total + sub.products.length, 0)
    : slug === "station-accessories"
      ? SPARE_PARTS.length
      : productsIn(slug).length;
  const subs = (page?.subs ?? []).map((sub) => ({
    title: sub.name,
    href: `${href}/${sub.slug}`,
  }));
  return { title, description, href, icon, count, subs };
}

/**
 * The PRODUCTS menu (ST-01): the five category pages, which the footer's
 * Products list and Home's product cards link to as well (ST-05). Landing pages
 * never appear here: they are for Google Ads only (ST-02).
 */
export const PRODUCTS: NavProduct[] = [
  category("fuel-dispensers", "/products/fuel-solutions", "/images/brand/icon-fuel-dispensers.png"),
  category("cng", "/products/cng-solutions", "/images/brand/icon-cng.png"),
  category("lpg", "/products/lpg-solutions", "/images/brand/icon-lpg.png"),
  category("ev-chargers", "/products/ev-chargers", "/images/brand/icon-ev-charger.svg"),
  category("station-accessories", "/products/station-accessories", "/images/brand/icon-station.png"),
];

/**
 * The four Google Ads landing pages (punch list ST-02). They stay calm — no video,
 * no heavy motion, and the floating WhatsApp button does not pulse on them
 * (MO-04, MO-11) — and they open on a full-bleed hero the header sits over.
 */
export const LANDING_PAGES = [
  "/solutions/fuel-dispensers-nigeria",
  "/solutions/cng-equipment-nigeria",
  "/solutions/lpg-equipment-nigeria",
  "/solutions/ev-chargers-nigeria",
];

/** Pages that open on a full-bleed hero, so the header is see-through over it. */
export const HERO_PAGES = LANDING_PAGES;

export const SERVICES: NavService[] = [
  { title: "Installation & Commissioning", href: "/services/installation-and-commissioning" },
  { title: "Maintenance & Repair", href: "/services/maintenance-and-repair" },
  { title: "Technical Support & Troubleshooting", href: "/services/technical-support" },
  { title: "Training & Capacity Building", href: "/services/training" },
];

/**
 * Mega-Tec's social profiles, handle @megatecpumps (punch list SW-11). Only
 * accounts that exist are listed: X and LinkedIn stay hidden until Mega-Tec
 * opens them, YouTube until they send its link. Their icons are already in
 * /images/landing/ (icon-social-x.svg, icon-social-linkedin.svg,
 * icon-social-youtube.svg).
 */
export const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/megatecpumps",
    icon: "/images/landing/icon-social-facebook.svg",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/megatecpumps/",
    icon: "/images/landing/icon-social-instagram.svg",
  },
];
