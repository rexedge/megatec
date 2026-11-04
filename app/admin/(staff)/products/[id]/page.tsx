import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/fields";
import { requireStaff } from "@/lib/auth";
import { rowId } from "@/lib/admin/order";
import { db } from "@/lib/db";
import { pageChoices, productValues } from "../data";
import { ProductForm } from "../product-form";

export const metadata: Metadata = { title: "Edit a product" };

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  await requireStaff();
  const id = rowId((await params).id);
  const [product, pages] = await Promise.all([
    id ? db!.product.findUnique({ where: { id } }) : null,
    pageChoices(),
  ]);
  if (!product) notFound();

  return (
    <>
      <PageHeader title={`Edit ${product.name}`} back={{ href: `/admin/products#page-${product.subcategoryId}`, label: "Products" }} />
      <ProductForm id={product.id} pages={pages} values={productValues(product)} />
    </>
  );
}
