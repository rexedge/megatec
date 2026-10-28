export type { NavProduct } from "@/lib/content/types";

export type NavService = {
  title: string;
  href: string;
};

/**
 * The PRODUCTS menu itself comes from the content layer (getNavProducts in
 * lib/content), since MEGA-TEC can add sub-categories in the admin. This entry is
 * the one category that is a page of its own, the spare parts list.
 */
export const STATION_ACCESSORIES = {
  title: "Station Accessories",
  description: "Comprehensive station accessories to enhance functionality and safety.",
  href: "/products/station-accessories",
  icon: "/images/brand/icon-station.png",
};

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
