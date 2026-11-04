import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/fields";
import { requireStaff } from "@/lib/auth";
import { rowId } from "@/lib/admin/order";
import type { ProjectCategory } from "@/lib/content/types";
import { db } from "@/lib/db";
import { ProjectForm } from "../project-form";

export const metadata: Metadata = { title: "Edit a project" };

const FOCUS_NAME: Record<string, string> = { "center top": "top", "center bottom": "bottom" };

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  await requireStaff();
  const id = rowId((await params).id);
  const row = id ? await db!.project.findUnique({ where: { id } }) : null;
  if (!row) notFound();

  return (
    <>
      <PageHeader title={`Edit ${row.name}`} back={{ href: "/admin/projects", label: "Projects" }} />
      <ProjectForm
        id={row.id}
        values={{
          name: row.name,
          location: row.location,
          description: row.description,
          categories: row.categories as ProjectCategory[],
          image: row.image,
          focus: (row.imagePosition && FOCUS_NAME[row.imagePosition]) || "center",
          onHome: row.onHome,
          onProjectsPage: row.onProjectsPage,
          published: row.published,
        }}
      />
    </>
  );
}
