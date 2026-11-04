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

/** Editing the client logos that scroll under the homepage's hero. */

const LIST = "/admin/client-logos";
export type LogoFormState = { error?: string } | null;

function changed() {
  updateTag(CONTENT_TAGS.showcase);
  revalidatePath(LIST);
}

function size(value: string) {
  const n = Math.round(Number(value));
  return Number.isFinite(n) && n > 0 && n <= 20000 ? n : null;
}

export async function saveLogo(id: number | null, _: LogoFormState, form: FormData): Promise<LogoFormState> {
  await requireStaff();
  if (id !== null && !rowId(id)) return { error: "This logo can't be found." };
  if (stillUploading(form)) return { error: "Wait for the logo to finish uploading, then save." };

  const name = text(form, "name");
  const image = photoAddress(text(form, "image"));
  const width = size(text(form, "width"));
  const height = size(text(form, "height"));

  if (!name) return { error: "Give the client's name. Screen readers read it out in place of the logo." };
  if (name.length > 120) return { error: "Keep the name under 120 characters." };
  if (image === undefined) return { error: "That logo isn't one uploaded here. Upload it again." };
  if (!image) return { error: "Upload the logo." };
  if (!width || !height) return { error: "The logo's size is missing. Upload it again." };

  const data = { name, image, width, height, published: checked(form, "published") };
  if (id === null) {
    await db!.clientLogo.create({ data: { ...data, sortOrder: await nextSortOrder("clientLogo") } });
  } else {
    const found = await db!.clientLogo.updateMany({ where: { id }, data });
    if (found.count === 0) return { error: "This logo has been deleted by someone else." };
  }
  changed();
  redirect(`${LIST}?saved=1`);
}

export async function moveLogo(id: number, by: number): Promise<ActionResult> {
  await requireStaff();
  if (await moveRow("clientLogo", id, by)) changed();
}

export async function setLogoPublished(id: number, published: boolean): Promise<ActionResult> {
  await requireStaff();
  if (await setRowPublished("clientLogo", id, published)) changed();
}

export async function deleteLogo(id: number): Promise<ActionResult> {
  await requireStaff();
  if (await deleteRow("clientLogo", id)) changed();
}
