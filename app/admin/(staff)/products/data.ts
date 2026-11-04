import "server-only";
import type { Product } from "@/lib/generated/prisma/client";
import { ADMIN_ORDER } from "@/lib/admin/order";
import type { DrawerExtra } from "@/lib/content/types";
import { db } from "@/lib/db";
import type { PageChoice, ProductValues } from "./product-form";

/** The product pages a product can go on, under their categories, in the site's order. */
export async function pageChoices(): Promise<PageChoice[]> {
  const categories = await db!.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { subcategories: { orderBy: ADMIN_ORDER, select: { id: true, name: true, filters: true } } },
  });
  return categories.map((category) => ({ category: category.name, pages: category.subcategories }));
}

/** A product as its form starts out. */
export function productValues(product: Product): ProductValues {
  return {
    subcategoryId: product.subcategoryId,
    name: product.name,
    blurb: product.blurb,
    best: product.bestSeller,
    tag: product.tag ?? "",
    badge: product.badge,
    details: product.cells as [string, string][],
    description: product.description,
    extras: product.extras as DrawerExtra[],
    warranty: product.warranty,
    image: product.image,
    sheet: product.sheet,
    published: product.published,
  };
}
