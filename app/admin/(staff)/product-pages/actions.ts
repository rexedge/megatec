"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireStaff } from "@/lib/auth";
import { checked, text, texts } from "@/lib/admin/form";
import { firstFreeKey, keyFromName } from "@/lib/admin/keys";
import { rowId } from "@/lib/admin/order";
import { moveRow, nextSortOrder, setRowPublished } from "@/lib/admin/rows";
import { CONTENT_TAGS } from "@/lib/content";
import { db } from "@/lib/db";
import type { ActionResult } from "@/components/admin/row-actions";

/**
 * Editing the words on the product pages: the four category pages (Fuel, CNG, LPG, EV) and
 * the product pages under them. Adding, ordering and hiding a product page also changes the
 * PRODUCTS menu and the category page's tiles, which read the same content.
 */

const LIST = "/admin/product-pages";
export type PageFormState = { error?: string } | null;

function changed() {
  updateTag(CONTENT_TAGS.catalog);
  revalidatePath(LIST);
}

/** Checks a field: its text, or what to tell the user. */
function required(value: string, max: number, missing: string, tooLong: string) {
  if (!value) return { error: missing };
  if (value.length > max) return { error: tooLong };
  return null;
}

function searchListing(form: FormData) {
  const title = text(form, "title");
  const meta = text(form, "meta");
  return {
    title,
    meta,
    problem:
      required(title, 120, "Give the page's title in Google.", "Keep the title in Google under 120 characters; Google shows about 60.") ??
      required(meta, 320, "Give the page's description in Google.", "Keep the description in Google under 320 characters; Google shows about 155."),
  };
}

export async function saveCategory(id: number, _: PageFormState, form: FormData): Promise<PageFormState> {
  await requireStaff();
  if (!rowId(id)) return { error: "This category can't be found." };

  const name = text(form, "name");
  const menuDescription = text(form, "menuDescription");
  const headline = text(form, "headline");
  const intro = text(form, "intro");
  const cta = text(form, "cta");
  const bullets = texts(form, "bullet").filter(Boolean);
  const listing = searchListing(form);

  const problem =
    required(name, 60, "Give the category's name.", "Keep the name under 60 characters.") ??
    required(menuDescription, 160, "Write the line under its name in the PRODUCTS menu.", "Keep the menu line under 160 characters.") ??
    required(headline, 200, "Write the page's headline.", "Keep the headline under 200 characters.") ??
    required(intro, 1000, "Write the paragraph under the headline.", "Keep the paragraph under 1,000 characters.") ??
    required(cta, 60, "Write the words on the WhatsApp button.", "Keep the button's words under 60 characters.") ??
    listing.problem;
  if (problem) return problem;
  if (bullets.length === 0) return { error: "Give at least one ticked line, e.g. “NMDPRA-compliant installation”." };
  if (bullets.length > 6) return { error: "The ticked lines take up to 6; four fill the grid." };
  if (bullets.some((line) => line.length > 120)) return { error: "Keep each ticked line under 120 characters." };
  if (new Set(bullets.map((line) => line.toLowerCase())).size < bullets.length) return { error: "Two ticked lines are the same." };

  const updated = await db!.category.updateMany({
    where: { id },
    data: { name, menuDescription, headline, intro, cta, bullets, title: listing.title, meta: listing.meta },
  });
  if (updated.count === 0) return { error: "This category can't be found." };
  changed();
  redirect(`${LIST}?saved=1#category-${id}`);
}

export async function savePage(id: number | null, _: PageFormState, form: FormData): Promise<PageFormState> {
  await requireStaff();
  if (id !== null && !rowId(id)) return { error: "This page can't be found." };

  const database = db!;
  const current = id === null ? null : await database.subcategory.findUnique({ where: { id } });
  if (id !== null && !current) return { error: "This page has been deleted by someone else." };
  // A page stays in its category: moving it would change its address.
  const categoryId = current?.categoryId ?? rowId(text(form, "category"));
  const category = categoryId ? await database.category.findUnique({ where: { id: categoryId } }) : null;
  if (!category) return { error: "Choose the category the page is in." };

  const name = text(form, "name");
  const h1 = text(form, "h1");
  const intro = texts(form, "intro").filter(Boolean);
  const formHeading = text(form, "formHeading");
  const listing = searchListing(form);

  const problem =
    required(name, 80, "Give the page's name.", "Keep the name under 80 characters.") ??
    (h1.length > 200 ? { error: "Keep the headline under 200 characters." } : null) ??
    required(formHeading, 160, "Write the headline over the enquiry form.", "Keep the form's headline under 160 characters.") ??
    listing.problem;
  if (problem) return problem;
  if (intro.length > 6) return { error: "The opening text takes up to 6 paragraphs." };
  if (intro.some((paragraph) => paragraph.length > 1000)) return { error: "Keep each paragraph under 1,000 characters." };

  const twin = await database.subcategory.findFirst({
    where: { categoryId: category.id, name: { equals: name, mode: "insensitive" }, ...(id === null ? {} : { id: { not: id } }) },
    select: { id: true },
  });
  if (twin) return { error: `${category.name} already has a page called that. Give this one its own name.` };

  const data = { name, h1: h1 || null, intro, formHeading, title: listing.title, meta: listing.meta, published: checked(form, "published") };
  let saved = id;
  if (id === null) {
    const base = keyFromName(name, "page");
    const taken = await database.subcategory.findMany({
      where: { categoryId: category.id, slug: { startsWith: base } },
      select: { slug: true },
    });
    const created = await database.subcategory.create({
      data: {
        ...data,
        categoryId: category.id,
        slug: firstFreeKey(base, new Set(taken.map((page) => page.slug))),
        sortOrder: await nextSortOrder("subcategory", { categoryId: category.id }),
      },
    });
    saved = created.id;
  } else {
    await database.subcategory.update({ where: { id }, data });
  }
  changed();
  redirect(`${LIST}?saved=1#page-${saved}`);
}

export async function movePage(id: number, by: number): Promise<ActionResult> {
  await requireStaff();
  if (await moveRow("subcategory", id, by, (row) => ({ categoryId: row.categoryId }))) changed();
}

export async function setPagePublished(id: number, published: boolean): Promise<ActionResult> {
  await requireStaff();
  if (await setRowPublished("subcategory", id, published)) changed();
}

/** Only an empty page can go: its products would have nowhere to show. */
export async function deletePage(id: number): Promise<ActionResult> {
  await requireStaff();
  const pageId = rowId(id);
  if (!pageId) return;
  const products = await db!.product.count({ where: { subcategoryId: pageId } });
  if (products > 0) {
    return { error: `Move or delete its ${products} ${products === 1 ? "product" : "products"} first (in Products).` };
  }
  if ((await db!.subcategory.deleteMany({ where: { id: pageId } })).count > 0) changed();
}
