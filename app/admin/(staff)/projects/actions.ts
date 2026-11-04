"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireStaff } from "@/lib/auth";
import { checked, photoAddress, stillUploading, text } from "@/lib/admin/form";
import { rowId } from "@/lib/admin/order";
import { deleteRow, moveRow, nextSortOrder, setRowPublished } from "@/lib/admin/rows";
import { CONTENT_TAGS } from "@/lib/content";
import { PROJECT_CATEGORIES, type ProjectCategory } from "@/lib/content/types";
import { db } from "@/lib/db";
import type { ActionResult } from "@/components/admin/row-actions";

/** Editing the projects on the homepage and the Projects & Installations page. */

const LIST = "/admin/projects";
export type ProjectFormState = { error?: string } | null;

/** Where the photo is cropped from: the middle (stored as null), the top or the bottom. */
const FOCUS: Record<string, string | null> = { center: null, top: "center top", bottom: "center bottom" };

function changed() {
  updateTag(CONTENT_TAGS.showcase);
  revalidatePath(LIST);
}

export async function saveProject(id: number | null, _: ProjectFormState, form: FormData): Promise<ProjectFormState> {
  await requireStaff();
  if (id !== null && !rowId(id)) return { error: "This project can't be found." };
  if (stillUploading(form)) return { error: "Wait for the photo to finish uploading, then save." };

  const name = text(form, "name");
  const location = text(form, "location");
  const description = text(form, "description");
  const categories = form
    .getAll("categories")
    .map(String)
    .filter((value): value is ProjectCategory => PROJECT_CATEGORIES.includes(value as ProjectCategory));
  const image = photoAddress(text(form, "image"));
  const focus = text(form, "focus") || "center";

  if (!name) return { error: "Give the client or project name." };
  if (name.length > 120 || location.length > 120) return { error: "Keep the name and the place under 120 characters each." };
  if (!description) return { error: "Describe the project in a sentence or two." };
  if (description.length > 600) return { error: "Keep the description under 600 characters; it shows in full on the card." };
  if (categories.length === 0) return { error: "Tick at least one kind of work; the Projects page filters by them." };
  if (image === undefined) return { error: "That photo isn't one uploaded here. Upload it again." };
  if (!Object.keys(FOCUS).includes(focus)) return { error: "Choose where to crop the photo from." };

  const data = {
    name,
    location,
    description,
    categories,
    image,
    imagePosition: image ? FOCUS[focus] : null,
    onHome: checked(form, "onHome"),
    onProjectsPage: checked(form, "onProjectsPage"),
    published: checked(form, "published"),
  };
  if (id === null) {
    await db!.project.create({ data: { ...data, sortOrder: await nextSortOrder("project") } });
  } else {
    const found = await db!.project.updateMany({ where: { id }, data });
    if (found.count === 0) return { error: "This project has been deleted by someone else." };
  }
  changed();
  redirect(`${LIST}?saved=1`);
}

export async function moveProject(id: number, by: number): Promise<ActionResult> {
  await requireStaff();
  if (await moveRow("project", id, by)) changed();
}

export async function setProjectPublished(id: number, published: boolean): Promise<ActionResult> {
  await requireStaff();
  if (await setRowPublished("project", id, published)) changed();
}

export async function deleteProject(id: number): Promise<ActionResult> {
  await requireStaff();
  if (await deleteRow("project", id)) changed();
}
