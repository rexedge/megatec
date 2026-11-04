import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/fields";
import { requireStaff } from "@/lib/auth";
import { rowId } from "@/lib/admin/order";
import { db } from "@/lib/db";
import { PageForm } from "../page-form";

export const metadata: Metadata = { title: "Edit a product page" };

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  await requireStaff();
  const id = rowId((await params).id);
  const page = id ? await db!.subcategory.findUnique({ where: { id }, include: { category: true } }) : null;
  if (!page) notFound();

  return (
    <>
      <PageHeader
        title={`Edit the ${page.name} page`}
        intro={`In ${page.category.name}. Its products are edited under Products.`}
        back={{ href: `/admin/product-pages#page-${page.id}`, label: "Product pages" }}
      />
      <PageForm
        id={page.id}
        path={`/products/${page.category.slug}/${page.slug}`}
        values={{
          name: page.name,
          h1: page.h1 ?? "",
          intro: page.intro as string[],
          formHeading: page.formHeading,
          title: page.title,
          meta: page.meta,
          published: page.published,
        }}
      />
    </>
  );
}
