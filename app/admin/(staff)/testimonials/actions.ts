"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireStaff } from "@/lib/auth";
import { ADMIN_ORDER, reorder, rowId } from "@/lib/admin/order";
import { CONTENT_TAGS } from "@/lib/content";
import { db } from "@/lib/db";
import type { ActionResult } from "@/components/admin/row-actions";

/**
 * Editing the homepage's customer quotes. Every action checks that someone is signed in,
 * and every change refreshes the site's cached showcase content at once (updateTag), so the
 * homepage shows it on the next visit.
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
  const quote = String(form.get("quote") ?? "").trim();
  const company = String(form.get("company") ?? "").trim();
  const published = form.get("published") === "on";

  if (!quote) return { error: "Write the quote." };
  if (quote.length > 1200) return { error: "Keep the quote under 1,200 characters; the homepage shows it in full." };
  if (company.length > 200) return { error: "Keep the name under 200 characters." };

  const data = { quote, company: company || null, published };
  const database = db!;
  if (id === null) {
    const last = await database.testimonial.findFirst({ orderBy: { sortOrder: "desc" }, select: { sortOrder: true } });
    await database.testimonial.create({ data: { ...data, sortOrder: (last?.sortOrder ?? -1) + 1 } });
  } else {
    const found = await database.testimonial.updateMany({ where: { id }, data });
    if (found.count === 0) return { error: "This quote has been deleted by someone else." };
  }
  changed();
  redirect(`${LIST}?saved=1`);
}

// The row id is bound on the server, but arrives back from the browser like any input.
export async function moveTestimonial(id: number, by: number): Promise<ActionResult> {
  await requireStaff();
  if (!rowId(id)) return;
  const database = db!;
  const rows = await database.testimonial.findMany({ orderBy: ADMIN_ORDER, select: { id: true } });
  const ids = reorder(rows.map((row) => row.id), id, by);
  if (!ids) return;
  await database.$transaction(
    ids.map((each, sortOrder) => database.testimonial.update({ where: { id: each }, data: { sortOrder } }))
  );
  changed();
}

export async function setTestimonialPublished(id: number, published: boolean): Promise<ActionResult> {
  await requireStaff();
  if (!rowId(id)) return;
  await db!.testimonial.updateMany({ where: { id }, data: { published: published === true } });
  changed();
}

export async function deleteTestimonial(id: number): Promise<ActionResult> {
  await requireStaff();
  if (!rowId(id)) return;
  await db!.testimonial.deleteMany({ where: { id } });
  changed();
}
