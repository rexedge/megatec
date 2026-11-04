import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/fields";
import { requireStaff } from "@/lib/auth";
import { rowId } from "@/lib/admin/order";
import { db } from "@/lib/db";
import { TestimonialForm } from "../testimonial-form";

export const metadata: Metadata = { title: "Edit a quote" };

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  await requireStaff();
  const id = rowId((await params).id);
  const row = id ? await db!.testimonial.findUnique({ where: { id } }) : null;
  if (!row) notFound();

  return (
    <>
      <PageHeader title="Edit a quote" back={{ href: "/admin/testimonials", label: "Testimonials" }} />
      <TestimonialForm
        id={row.id}
        values={{ quote: row.quote, company: row.company ?? "", published: row.published }}
      />
    </>
  );
}
