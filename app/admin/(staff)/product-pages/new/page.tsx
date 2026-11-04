import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/fields";
import { requireStaff } from "@/lib/auth";
import { rowId } from "@/lib/admin/order";
import { db } from "@/lib/db";
import { PageForm } from "../page-form";

export const metadata: Metadata = { title: "Add a product page" };

/** A new, empty product page; its products are added under Products afterwards. */
export default async function NewProductPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  await requireStaff();
  const categories = await db!.category.findMany({ orderBy: { sortOrder: "asc" }, select: { id: true, name: true, slug: true } });
  const chosen = rowId((await searchParams).category);
  const start = categories.find((category) => category.id === chosen) ?? null;

  return (
    <>
      <PageHeader
        title="Add a product page"
        intro="It starts hidden, last in its category. Add its products under Products, choosing this page, then show the page here."
        back={{ href: start ? `/admin/product-pages#category-${start.id}` : "/admin/product-pages", label: "Product pages" }}
      />
      <PageForm
        id={null}
        path={start ? `/products/${start.slug}` : "/products"}
        categories={categories.map(({ id, name }) => ({ id, name }))}
        categoryId={start?.id ?? null}
        values={{ name: "", h1: "", intro: [], formHeading: "", title: "", meta: "", published: false }}
      />
    </>
  );
}
