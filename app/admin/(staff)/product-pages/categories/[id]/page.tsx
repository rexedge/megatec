import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/fields";
import { requireStaff } from "@/lib/auth";
import { rowId } from "@/lib/admin/order";
import { db } from "@/lib/db";
import { CategoryForm } from "../../category-form";

export const metadata: Metadata = { title: "Edit a category page" };

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  await requireStaff();
  const id = rowId((await params).id);
  const category = id ? await db!.category.findUnique({ where: { id } }) : null;
  if (!category) notFound();

  return (
    <>
      <PageHeader
        title={`Edit the ${category.name} page`}
        back={{ href: `/admin/product-pages#category-${category.id}`, label: "Product pages" }}
      />
      <CategoryForm
        id={category.id}
        values={{
          slug: category.slug,
          name: category.name,
          menuDescription: category.menuDescription,
          headline: category.headline,
          intro: category.intro,
          cta: category.cta,
          bullets: category.bullets as string[],
          title: category.title,
          meta: category.meta,
        }}
      />
    </>
  );
}
