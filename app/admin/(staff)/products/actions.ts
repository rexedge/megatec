"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireStaff } from "@/lib/auth";
import { checked, photoAddress, sheetAddress, stillUploading, text, texts } from "@/lib/admin/form";
import { firstFreeKey, keyFromName } from "@/lib/admin/keys";
import { rowId } from "@/lib/admin/order";
import { deleteRow, moveRow, nextSortOrder, setRowPublished } from "@/lib/admin/rows";
import { CONTENT_TAGS } from "@/lib/content";
import type { DrawerExtra } from "@/lib/content/types";
import { db } from "@/lib/db";
import type { ActionResult } from "@/components/admin/row-actions";

/**
 * Editing the products on the sub-category pages: their cards and details panels. Products
 * are ordered within their page. Every change also refreshes the PRODUCTS menu's counts and
 * the site search, which read the same content.
 */

const LIST = "/admin/products";
export type ProductFormState = { error?: string } | null;

const MAX_DETAILS = 12;
const MAX_EXTRAS = 20;
const EXTRA_KINDS: DrawerExtra["t"][] = ["p", "h", "li"];

function changed() {
  updateTag(CONTENT_TAGS.catalog);
  revalidatePath(LIST);
}

/** The product's key on the site: from its name, with -2, -3… after it if that is taken. */
async function freeKey(name: string) {
  const base = keyFromName(name, "product");
  const taken = await db!.product.findMany({ where: { slug: { startsWith: base } }, select: { slug: true } });
  return firstFreeKey(base, new Set(taken.map((p) => p.slug)));
}

type Read<T> = { value: T } | { error: string };

function readDetails(form: FormData): Read<[string, string][]> {
  const labels = texts(form, "detailLabel");
  const values = texts(form, "detailValue");
  const details: [string, string][] = [];
  for (let i = 0; i < labels.length; i++) {
    const [label, value] = [labels[i], values[i] ?? ""];
    if (!label && !value) continue;
    if (!label || !value) return { error: `Detail ${i + 1} needs both a label and a value.` };
    if (label.length > 40 || value.length > 160) {
      return { error: `Keep detail ${i + 1} short: a label under 40 characters and a value under 160.` };
    }
    if (details.some(([other]) => other.toLowerCase() === label.toLowerCase())) {
      return { error: `Two details are called “${label}”. Give each its own label.` };
    }
    details.push([label, value]);
  }
  if (details.length === 0) return { error: "Give at least one detail for the grid, e.g. Flow rate · 5–50 L/min." };
  if (details.length > MAX_DETAILS) return { error: `The grid takes up to ${MAX_DETAILS} details.` };
  return { value: details };
}

function readExtras(form: FormData): Read<DrawerExtra[]> {
  const kinds = texts(form, "extraKind");
  const lines = texts(form, "extraText");
  const extras: DrawerExtra[] = [];
  for (let i = 0; i < lines.length; i++) {
    if (!lines[i]) continue;
    const kind = kinds[i] as DrawerExtra["t"];
    if (!EXTRA_KINDS.includes(kind)) return { error: `Choose what block ${i + 1} of the extra text is.` };
    if (lines[i].length > 800) return { error: `Block ${i + 1} of the extra text is too long; split it under 800 characters.` };
    extras.push({ t: kind, x: lines[i] });
  }
  if (extras.length > MAX_EXTRAS) return { error: `The extra text takes up to ${MAX_EXTRAS} blocks.` };
  return { value: extras };
}

export async function saveProduct(id: number | null, _: ProductFormState, form: FormData): Promise<ProductFormState> {
  await requireStaff();
  if (id !== null && !rowId(id)) return { error: "This product can't be found." };
  if (stillUploading(form)) return { error: "Wait for the photo or spec sheet to finish uploading, then save." };

  const subcategoryId = rowId(text(form, "subcategory"));
  const name = text(form, "name");
  const blurb = text(form, "blurb");
  const tag = text(form, "tag");
  const badge = text(form, "badge");
  const description = text(form, "description");
  const warranty = text(form, "warranty");
  const image = photoAddress(text(form, "image"));
  const sheet = sheetAddress(text(form, "sheet"));
  const details = readDetails(form);
  const extras = readExtras(form);

  const database = db!;
  const sub = subcategoryId ? await database.subcategory.findUnique({ where: { id: subcategoryId } }) : null;
  if (!sub) return { error: "Choose the page the product is on." };
  if (!name) return { error: "Give the product's name." };
  if (name.length > 120) return { error: "Keep the name under 120 characters." };
  if (!blurb) return { error: "Write the short line under the name on the card." };
  if (blurb.length > 200) return { error: "Keep the card's line under 200 characters." };
  if (tag.length > 40) return { error: "Keep the photo label under 40 characters, e.g. NMDPRA." };
  if (image === undefined) return { error: "That photo isn't one uploaded here. Upload it again." };
  if (!badge) return { error: "Write the line at the top of the details panel, e.g. NMDPRA compliant · MEGA-TEC supply & install." };
  if (badge.length > 120) return { error: "Keep the line at the top of the details panel under 120 characters." };
  if ("error" in details) return details;
  if (!description) return { error: "Write the product's description." };
  if (description.length > 2000) return { error: "Keep the description under 2,000 characters; put the rest in the extra text." };
  if ("error" in extras) return extras;
  if (!warranty) return { error: "Say what warranty it comes with, e.g. 1-year warranty." };
  if (warranty.length > 120) return { error: "Keep the warranty line under 120 characters." };
  if (sheet === undefined) return { error: "That spec sheet isn't one uploaded here. Upload it again." };

  const twin = await database.product.findFirst({
    where: { subcategoryId: sub.id, name: { equals: name, mode: "insensitive" }, ...(id === null ? {} : { id: { not: id } }) },
    select: { id: true },
  });
  if (twin) return { error: "Another product on this page already has that name. Give this one its own." };

  const data = {
    subcategoryId: sub.id,
    name,
    blurb,
    bestSeller: checked(form, "best"),
    tag: tag || null,
    badge,
    cells: details.value,
    description,
    extras: extras.value,
    warranty,
    image,
    sheet,
    published: checked(form, "published"),
  };
  if (id === null) {
    await database.product.create({
      data: { ...data, slug: await freeKey(name), sortOrder: await nextSortOrder("product", { subcategoryId: sub.id }) },
    });
  } else {
    const current = await database.product.findUnique({ where: { id }, select: { subcategoryId: true } });
    if (!current) return { error: "This product has been deleted by someone else." };
    // A product moved to another page goes to the end of it.
    const sortOrder =
      current.subcategoryId === sub.id ? undefined : await nextSortOrder("product", { subcategoryId: sub.id });
    await database.product.update({ where: { id }, data: { ...data, ...(sortOrder === undefined ? {} : { sortOrder }) } });
  }
  changed();
  redirect(`${LIST}?saved=1#page-${sub.id}`);
}

export async function moveProduct(id: number, by: number): Promise<ActionResult> {
  await requireStaff();
  if (await moveRow("product", id, by, (row) => ({ subcategoryId: row.subcategoryId }))) changed();
}

export async function setProductPublished(id: number, published: boolean): Promise<ActionResult> {
  await requireStaff();
  if (await setRowPublished("product", id, published)) changed();
}

export async function deleteProduct(id: number): Promise<ActionResult> {
  await requireStaff();
  if (await deleteRow("product", id)) changed();
}
