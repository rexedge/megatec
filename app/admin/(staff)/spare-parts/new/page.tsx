import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/fields";
import { requireStaff } from "@/lib/auth";
import { db } from "@/lib/db";
import { PartForm } from "../part-form";

export const metadata: Metadata = { title: "Add a part" };

export default async function NewPartPage() {
  await requireStaff();
  const groups = await db!.partGroup.findMany({ orderBy: { sortOrder: "asc" }, select: { id: true, label: true } });
  return (
    <>
      <PageHeader
        title="Add a part"
        intro="It goes at the end of its group; move it up afterwards if you like."
        back={{ href: "/admin/spare-parts", label: "Spare parts" }}
      />
      <PartForm
        id={null}
        groups={groups}
        values={{ groupId: null, name: "", fit: "", image: null, href: "", published: true }}
      />
    </>
  );
}
