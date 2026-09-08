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

export const SOCIAL_LINKS = [
  { label: "Facebook", href: "#", icon: "/images/landing/icon-social-facebook.svg" },
  { label: "Instagram", href: "#", icon: "/images/landing/icon-social-instagram.svg" },
  { label: "X", href: "#", icon: "/images/landing/icon-social-x.svg" },
  { label: "LinkedIn", href: "#", icon: "/images/landing/icon-social-linkedin.svg" },
  { label: "Youtube", href: "#", icon: "/images/landing/icon-social-youtube.svg" },
];
