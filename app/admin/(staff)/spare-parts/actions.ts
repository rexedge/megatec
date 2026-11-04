"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireStaff } from "@/lib/auth";
import { checked, photoAddress, stillUploading, text } from "@/lib/admin/form";
import { rowId } from "@/lib/admin/order";
import { deleteRow, moveRow, nextSortOrder, setRowPublished } from "@/lib/admin/rows";
import { CONTENT_TAGS } from "@/lib/content";
import { db } from "@/lib/db";
import type { ActionResult } from "@/components/admin/row-actions";

/**
 * Editing the spare parts list (Station Accessories). Parts are ordered within their group;
 * every change also refreshes the PRODUCTS menu's count and the site search, which read
 * the same content.
 */

const LIST = "/admin/spare-parts";
export type PartFormState = { error?: string } | null;

/** A link on the site itself, e.g. /products/cng-solutions/cng-conversion-kit. */
const SITE_PATH = /^\/(?!\/)[\w\-./?=&#%]*$/;

function changed() {
  updateTag(CONTENT_TAGS.parts);
  revalidatePath(LIST);
}

export async function savePart(id: number | null, _: PartFormState, form: FormData): Promise<PartFormState> {
  await requireStaff();
  if (id !== null && !rowId(id)) return { error: "This part can't be found." };
  if (stillUploading(form)) return { error: "Wait for the photo to finish uploading, then save." };

  const groupId = rowId(text(form, "group"));
  const name = text(form, "name");
  const fit = text(form, "fit");
  const image = photoAddress(text(form, "image"));
  const href = text(form, "href");

  const database = db!;
  const group = groupId ? await database.partGroup.findUnique({ where: { id: groupId } }) : null;
  if (!group) return { error: "Choose the part's group." };
  if (!name) return { error: "Give the part's name." };
  if (!fit) return { error: "Say which dispensers it fits, e.g. “Fuel dispensers”." };
  if (name.length > 120 || fit.length > 120) return { error: "Keep the name and the fit under 120 characters each." };
  if (image === undefined) return { error: "That photo isn't one uploaded here. Upload it again." };
  if (href && (!SITE_PATH.test(href) || href.length > 200)) {
    return { error: "The link must be a page on this site, starting with /, e.g. /products/cng-solutions." };
  }

  const data = { groupId: group.id, name, fit, image, href: href || null, published: checked(form, "published") };
  if (id === null) {
    const last = await database.sparePart.findFirst({ orderBy: { number: "desc" }, select: { number: true } });
    await database.sparePart.create({
      data: {
        ...data,
        // The part's own key on the site; the next free one.
        number: (last?.number ?? 0) + 1,
        sortOrder: await nextSortOrder("sparePart", { groupId: group.id }),
      },
    });
  } else {
    const current = await database.sparePart.findUnique({ where: { id }, select: { groupId: true } });
    if (!current) return { error: "This part has been deleted by someone else." };
    // A part moved to another group goes to the end of it.
    const sortOrder = current.groupId === group.id ? undefined : await nextSortOrder("sparePart", { groupId: group.id });
    await database.sparePart.update({ where: { id }, data: { ...data, ...(sortOrder === undefined ? {} : { sortOrder }) } });
  }
  changed();
  redirect(`${LIST}?saved=1#group-${group.id}`);
}

export async function movePart(id: number, by: number): Promise<ActionResult> {
  await requireStaff();
  if (await moveRow("sparePart", id, by, (row) => ({ groupId: row.groupId }))) changed();
}

export async function setPartPublished(id: number, published: boolean): Promise<ActionResult> {
  await requireStaff();
  if (await setRowPublished("sparePart", id, published)) changed();
}

export async function deletePart(id: number): Promise<ActionResult> {
  await requireStaff();
  if (await deleteRow("sparePart", id)) changed();
}
