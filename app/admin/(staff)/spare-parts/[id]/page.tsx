import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/fields";
import { requireStaff } from "@/lib/auth";
import { rowId } from "@/lib/admin/order";
import { db } from "@/lib/db";
import { PartForm } from "../part-form";

export const metadata: Metadata = { title: "Edit a part" };

export default async function EditPartPage({ params }: { params: Promise<{ id: string }> }) {
  await requireStaff();
  const id = rowId((await params).id);
  const [part, groups] = await Promise.all([
    id ? db!.sparePart.findUnique({ where: { id } }) : null,
    db!.partGroup.findMany({ orderBy: { sortOrder: "asc" }, select: { id: true, label: true } }),
  ]);
  if (!part) notFound();

  return (
    <>
      <PageHeader title={`Edit ${part.name}`} back={{ href: `/admin/spare-parts#group-${part.groupId}`, label: "Spare parts" }} />
      <PartForm
        id={part.id}
        groups={groups}
        values={{
          groupId: part.groupId,
          name: part.name,
          fit: part.fit,
          image: part.image,
          href: part.href ?? "",
          published: part.published,
        }}
      />
    </>
  );
}
