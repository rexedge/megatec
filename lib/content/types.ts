/**
 * The shapes the site's pages render. The content layer (lib/content) returns these
 * whether it reads the database or the built-in seed content, so pages never know
 * which one they got.
 */

export type DrawerExtra = { t: "p" | "h" | "li"; x: string };

export type PageProduct = {
  /** The product's address key; also its id in the database. */
  id: string;
  name: string;
  /** The italic line under the name on the card. */
  blurb: string;
  best: boolean;
  /** The pill on the card image: "NMDPRA" for regulated dispensing equipment. */
  tag: string | null;
  /** The badge line at the top of the drawer. */
  badge: string;
  /** The drawer's spec grid: label, value. */
  cells: [string, string][];
  description: string;
  /** Extra drawer copy after the description (conversion kit: how it works, what is in it). */
  extras: DrawerExtra[];
  warranty: string;
  /** null where there is no photo yet: the card shows the muted MEGA-TEC logo. */
  image: string | null;
  /** Filename under /public/spec-sheets, or a /media/ path once uploaded. */
  sheet: string | null;
};

export type SubCategory = {
  slug: string;
  name: string;
  title: string;
  meta: string;
  h1: string | null;
  intro: string[];
  /** The headline over the short form at the foot of the page. */
  form: string;
  /** Offers the Single/Double nozzle and Bennett/Tokheim meter filters (ST-08). */
  filters: boolean;
  products: PageProduct[];
};

export type Category = {
  slug: string;
  name: string;
  /** The line under the name in the PRODUCTS menu and in search. */
  menuDescription: string;
  /** The menu icon, under /public. */
  icon: string;
  title: string;
  meta: string;
  headline: string;
  intro: string;
  cta: string;
  bullets: string[];
  subs: SubCategory[];
};

export type PartGroup = {
  /** The group's name as the 05 doc writes it ("METERS & UNITS"). */
  name: string;
  /** The filter pill's wording ("Meters & Units"). */
  label: string;
};

export type SparePart = {
  n: number;
  name: string;
  /** Which dispensers it fits. */
  fit: string;
  group: string;
  /** null where there is no photo yet: the card shows the muted MEGA-TEC logo. */
  image: string | null;
  /** The CNG items link to their product page instead of being described here (PA-03). */
  href?: string;
};

export type ProjectCategory = "Fuel Dispensers" | "LPG" | "CNG" | "EV Chargers";

export type Project = {
  name: string;
  /** Empty where MEGA-TEC has not supplied one yet. */
  location: string;
  categories: ProjectCategory[];
  description: string;
  /** Left out where the photo has not been supplied: the card shows text only. */
  image?: string;
  imagePosition?: string;
  /** Shown in Home's project section. */
  onHome: boolean;
  /** Shown on the Projects & Installations page. */
  onProjectsPage: boolean;
};

export type Testimonial = {
  quote: string;
  /** The company, with the person's role where known. Blank for unattributed quotes. */
  company?: string;
};

export type ClientLogo = {
  name: string;
  src: string;
  width: number;
  height: number;
};

/** A category in the PRODUCTS menu. */
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

export type SearchEntry = {
  title: string;
  /** Shown under the title, e.g. "Fuel Solutions" or "Page". */
  context: string;
  href: string;
  /** Extra words that should find this entry without being shown. */
  keywords: string;
};
