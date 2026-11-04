import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/fields";
import { requireStaff } from "@/lib/auth";
import { rowId } from "@/lib/admin/order";
import { db } from "@/lib/db";
import { pageChoices, productValues } from "../data";
import { ProductForm, type ProductValues } from "../product-form";

export const metadata: Metadata = { title: "Add a product" };

const EMPTY: ProductValues = {
  subcategoryId: null,
  name: "",
  blurb: "",
  best: false,
  tag: "",
  badge: "",
  details: [["", ""]],
  description: "",
  extras: [],
  warranty: "",
  image: null,
  sheet: null,
  published: true,
};

/** A new product: blank, or filled in from another one (?from=its id, the list's Duplicate). */
export default async function NewProductPage({ searchParams }: { searchParams: Promise<{ from?: string }> }) {
  await requireStaff();
  const fromId = rowId((await searchParams).from);
  const [pages, original] = await Promise.all([
    pageChoices(),
    fromId ? db!.product.findUnique({ where: { id: fromId } }) : null,
  ]);

  return (
    <>
      <PageHeader
        title={original ? `Add a product like ${original.name}` : "Add a product"}
        intro={
          original
            ? "Everything is copied from it, photo and spec sheet included: change what differs, and give it its own name. It goes at the end of its page."
            : "It goes at the end of its page; move it up afterwards if you like."
        }
        back={{ href: original ? `/admin/products#page-${original.subcategoryId}` : "/admin/products", label: "Products" }}
      />
      <ProductForm id={null} pages={pages} values={original ? productValues(original) : EMPTY} />
    </>
  );
}
