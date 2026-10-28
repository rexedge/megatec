import "server-only";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import { db, type Database } from "@/lib/db";
import { STATION_ACCESSORIES } from "@/lib/nav";
import { buildSearchIndex } from "@/lib/search";
import * as seed from "@/lib/content/seed";
import type {
  Category,
  DrawerExtra,
  ProjectCategory,
  ClientLogo,
  NavProduct,
  PageProduct,
  PartGroup,
  Project,
  SearchEntry,
  SparePart,
  Testimonial,
} from "@/lib/content/types";

/**
 * Everything the pages show that MEGA-TEC edits in the admin: products and their
 * categories, the spare parts list, projects, testimonials and client logos.
 *
 * With DATABASE_URL set, it reads the database, cached until the admin changes
 * something: each save calls revalidateTag on the matching CONTENT_TAGS entry.
 * Without it (production until go-live, and Vercel previews), it serves the built-in
 * seed content, which is exactly what `pnpm db:seed` loads, so the site looks the same
 * either way.
 */

export const CONTENT_TAGS = {
  catalog: "catalog",
  parts: "parts",
  showcase: "showcase",
} as const;

/**
 * Wraps a database read in the cross-request cache with its tag, and in React's
 * per-render cache so a page that asks twice queries once. Without a database it
 * returns the seed content.
 */
function source<T>(
  tag: string,
  fromDb: (database: Database) => Promise<T>,
  fromSeed: () => T
): () => Promise<T> {
  const database = db;
  if (!database) return cache(async () => fromSeed());
  return cache(unstable_cache(() => fromDb(database), ["content", tag, fromDb.name], { tags: [tag] }));
}

const order = [{ sortOrder: "asc" as const }, { id: "asc" as const }];

export const getCatalog = source<Category[]>(
  CONTENT_TAGS.catalog,
  async function catalog(database) {
    const categories = await database.category.findMany({
      orderBy: { sortOrder: "asc" },
      include: {
        subcategories: {
          where: { published: true },
          orderBy: order,
          include: { products: { where: { published: true }, orderBy: order } },
        },
      },
    });

    return categories.map((category) => ({
      slug: category.slug,
      name: category.name,
      menuDescription: category.menuDescription,
      icon: category.icon,
      title: category.title,
      meta: category.meta,
      headline: category.headline,
      intro: category.intro,
      cta: category.cta,
      bullets: category.bullets as string[],
      subs: category.subcategories.map((sub) => ({
        slug: sub.slug,
        name: sub.name,
        title: sub.title,
        meta: sub.meta,
        h1: sub.h1,
        intro: sub.intro as string[],
        form: sub.formHeading,
        filters: sub.filters,
        products: sub.products.map(
          (product): PageProduct => ({
            id: product.slug,
            name: product.name,
            blurb: product.blurb,
            best: product.bestSeller,
            tag: product.tag,
            badge: product.badge,
            cells: product.cells as [string, string][],
            description: product.description,
            extras: product.extras as DrawerExtra[],
            warranty: product.warranty,
            image: product.image,
            sheet: product.sheet,
          })
        ),
      })),
    }));
  },
  () => seed.SEED_CATEGORIES
);

export const getSpareParts = source<{ groups: PartGroup[]; parts: SparePart[] }>(
  CONTENT_TAGS.parts,
  async function spareParts(database) {
    const [groups, parts] = await Promise.all([
      database.partGroup.findMany({ orderBy: { sortOrder: "asc" } }),
      database.sparePart.findMany({
        where: { published: true },
        orderBy: order,
        include: { group: { select: { name: true } } },
      }),
    ]);
    return {
      groups: groups.map((group) => ({ name: group.name, label: group.label })),
      parts: parts.map((part) => ({
        n: part.number,
        name: part.name,
        fit: part.fit,
        group: part.group.name,
        image: part.image,
        ...(part.href ? { href: part.href } : {}),
      })),
    };
  },
  () => ({ groups: seed.SEED_PART_GROUPS, parts: seed.SEED_SPARE_PARTS })
);

export const getProjects = source<Project[]>(
  CONTENT_TAGS.showcase,
  async function projects(database) {
    const rows = await database.project.findMany({ where: { published: true }, orderBy: order });
    return rows.map((row) => ({
      name: row.name,
      location: row.location,
      categories: row.categories as ProjectCategory[],
      description: row.description,
      ...(row.image ? { image: row.image } : {}),
      ...(row.imagePosition ? { imagePosition: row.imagePosition } : {}),
      onHome: row.onHome,
      onProjectsPage: row.onProjectsPage,
    }));
  },
  () => seed.SEED_PROJECTS
);

export const getTestimonials = source<Testimonial[]>(
  CONTENT_TAGS.showcase,
  async function testimonials(database) {
    const rows = await database.testimonial.findMany({
      where: { published: true },
      orderBy: order,
    });
    return rows.map((row) => ({ quote: row.quote, ...(row.company ? { company: row.company } : {}) }));
  },
  () => seed.SEED_TESTIMONIALS
);

export const getClientLogos = source<ClientLogo[]>(
  CONTENT_TAGS.showcase,
  async function clientLogos(database) {
    const rows = await database.clientLogo.findMany({ where: { published: true }, orderBy: order });
    return rows.map((row) => ({
      name: row.name,
      src: row.image,
      width: row.width,
      height: row.height,
    }));
  },
  () => seed.SEED_CLIENT_LOGOS
);

/** One category page's content, or undefined for an unknown address. */
export async function getCategory(slug: string) {
  return (await getCatalog()).find((category) => category.slug === slug);
}

/** One sub-category page's content with its category, or undefined for an unknown address. */
export async function getSubCategory(categorySlug: string, subSlug: string) {
  const category = await getCategory(categorySlug);
  const sub = category?.subs.find((s) => s.slug === subSlug);
  return category && sub ? { category, sub } : undefined;
}

/** Products by id, for pages that feature a few of them (the landing pages). */
export async function getProductsById(ids: string[]) {
  const all = new Map(
    (await getCatalog()).flatMap((c) => c.subs).flatMap((s) => s.products).map((p) => [p.id, p])
  );
  return Object.fromEntries(ids.map((id) => [id, all.get(id)])) as Record<
    string,
    PageProduct | undefined
  >;
}

/** The PRODUCTS menu: each category with its product count and sub-category pages (ST-01). */
export async function getNavProducts(): Promise<NavProduct[]> {
  const [catalog, { parts }] = await Promise.all([getCatalog(), getSpareParts()]);
  return [
    ...catalog.map((category) => {
      const href = `/products/${category.slug}`;
      return {
        title: category.name,
        description: category.menuDescription,
        href,
        icon: category.icon,
        count: category.subs.reduce((total, sub) => total + sub.products.length, 0),
        subs: category.subs.map((sub) => ({ title: sub.name, href: `${href}/${sub.slug}` })),
      };
    }),
    { ...STATION_ACCESSORIES, count: parts.length, subs: [] },
  ];
}

/** Everything the site search can find, for the search dialog. */
export async function getSearchIndex(): Promise<SearchEntry[]> {
  const [nav, catalog, { parts }] = await Promise.all([
    getNavProducts(),
    getCatalog(),
    getSpareParts(),
  ]);
  return buildSearchIndex(nav, catalog, parts);
}
