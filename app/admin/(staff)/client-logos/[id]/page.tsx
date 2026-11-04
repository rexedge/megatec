import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/fields";
import { requireStaff } from "@/lib/auth";
import { rowId } from "@/lib/admin/order";
import { db } from "@/lib/db";
import { LogoForm } from "../logo-form";

export const metadata: Metadata = { title: "Edit a logo" };

export default async function EditLogoPage({ params }: { params: Promise<{ id: string }> }) {
  await requireStaff();
  const id = rowId((await params).id);
  const row = id ? await db!.clientLogo.findUnique({ where: { id } }) : null;
  if (!row) notFound();

  return (
    <>
      <PageHeader title={`Edit ${row.name}`} back={{ href: "/admin/client-logos", label: "Client logos" }} />
      <LogoForm
        id={row.id}
        values={{ name: row.name, image: row.image, width: row.width, height: row.height, published: row.published }}
      />
    </>
  );
}
