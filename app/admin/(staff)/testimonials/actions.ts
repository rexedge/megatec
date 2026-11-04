"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireStaff } from "@/lib/auth";
import { checked, text } from "@/lib/admin/form";
import { rowId } from "@/lib/admin/order";
import { deleteRow, moveRow, nextSortOrder, setRowPublished } from "@/lib/admin/rows";
import { CONTENT_TAGS } from "@/lib/content";
import { db } from "@/lib/db";
import type { ActionResult } from "@/components/admin/row-actions";

/**
 * Editing the homepage's customer quotes. Every action checks that someone is signed in,
 * and every change refreshes the site's cached showcase content at once (updateTag), so the
 * homepage shows it on the next visit. Row ids are bound on the server but come back from
 * the browser like any input, so the helpers check them.
 */

const LIST = "/admin/testimonials";
export type TestimonialFormState = { error?: string } | null;

function changed() {
  updateTag(CONTENT_TAGS.showcase);
  revalidatePath(LIST);
}

/** Adds a quote (id null) at the end of the list, or saves changes to one. */
export async function saveTestimonial(
  id: number | null,
  _: TestimonialFormState,
  form: FormData
): Promise<TestimonialFormState> {
  await requireStaff();
  if (id !== null && !rowId(id)) return { error: "This quote can't be found." };
  const quote = text(form, "quote");
  const company = text(form, "company");

  if (!quote) return { error: "Write the quote." };
  if (quote.length > 1200) return { error: "Keep the quote under 1,200 characters; the homepage shows it in full." };
  if (company.length > 200) return { error: "Keep the name under 200 characters." };

  const data = { quote, company: company || null, published: checked(form, "published") };
  if (id === null) {
    await db!.testimonial.create({ data: { ...data, sortOrder: await nextSortOrder("testimonial") } });
  } else {
    const found = await db!.testimonial.updateMany({ where: { id }, data });
    if (found.count === 0) return { error: "This quote has been deleted by someone else." };
  }
  changed();
  redirect(`${LIST}?saved=1`);
}

export async function moveTestimonial(id: number, by: number): Promise<ActionResult> {
  await requireStaff();
  if (await moveRow("testimonial", id, by)) changed();
}

export async function setTestimonialPublished(id: number, published: boolean): Promise<ActionResult> {
  await requireStaff();
  if (await setRowPublished("testimonial", id, published)) changed();
}

export async function deleteTestimonial(id: number): Promise<ActionResult> {
  await requireStaff();
  if (await deleteRow("testimonial", id)) changed();
}
