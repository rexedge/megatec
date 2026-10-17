export type NavProduct = {
  title: string;
  description: string;
  href: string;
  icon: string;
};

export type NavService = {
  title: string;
  href: string;
};

export const PRODUCTS: NavProduct[] = [
  {
    title: "Fuel Dispensers",
    description:
      "Installation and commissioning of fuel dispensers and gas dispensing systems.",
    href: "/products/fuel-dispensers",
    icon: "/images/brand/icon-fuel-dispensers.png",
  },
  {
    title: "CNG Systems",
    description:
      "Reliable CNG solutions engineered for optimal performance and safety.",
    href: "/products/cng",
    icon: "/images/brand/icon-cng.png",
  },
  {
    title: "LPG Solutions",
    description:
      "Innovative LPG solutions for seamless integration and maximum uptime.",
    href: "/products/lpg",
    icon: "/images/brand/icon-lpg.png",
  },
  {
    title: "Electric Car Chargers",
    description:
      "Durable EV charging infrastructure engineered for safe, high-uptime performance.",
    href: "/products/ev-chargers",
    icon: "/images/brand/icon-ev-charger.svg",
  },
  {
    title: "Station Accessories",
    description:
      "Comprehensive station accessories to enhance functionality and safety.",
    href: "/products/station-accessories",
    icon: "/images/brand/icon-station.png",
  },
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
export const HERO_PAGES = [...LANDING_PAGES, "/products/station-accessories"];

export const SERVICES: NavService[] = [
  {
    title: "Installation and commissioning of fuel dispensers",
    href: "/services/installation-and-commissioning",
  },
  {
    title: "Maintenance and repair services for fueling equipment",
    href: "/services/maintenance-and-repair",
  },
  {
    title: "Technical support and troubleshooting",
    href: "/services/technical-support",
  },
  {
    title: "Training and capacity building for operators",
    href: "/services/training",
  },
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
