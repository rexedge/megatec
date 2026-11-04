import type { Metadata } from "next";
import Link from "next/link";
import { FormMessage } from "@/components/admin/auth-card";
import { HiddenPill, PageHeader, Panel } from "@/components/admin/fields";
import { RowActions } from "@/components/admin/row-actions";
import { requireStaff } from "@/lib/auth";
import { ADMIN_ORDER } from "@/lib/admin/order";
import { db } from "@/lib/db";
import { deletePage, movePage, setPagePublished } from "./actions";

export const metadata: Metadata = { title: "Product pages" };

const link = "text-sea text-sm font-semibold";

/** The category pages and the product pages under each, in the site's order. */
export default async function ProductPagesAdminPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  await requireStaff();
  const [categories, { saved }] = await Promise.all([
    db!.category.findMany({
      orderBy: { sortOrder: "asc" },
      include: { subcategories: { orderBy: ADMIN_ORDER, include: { _count: { select: { products: true } } } } },
    }),
    searchParams,
  ]);

  return (
    <>
      <PageHeader
        title="Product pages"
        intro="The words on the four category pages and the product pages under them: headings, opening text and how Google lists each page. The products themselves are under Products."
        back={{ href: "/admin", label: "Content" }}
      />
      {saved && (
        <div className="mt-6">
          <FormMessage tone="ok">Saved. The site and the PRODUCTS menu show the change now.</FormMessage>
        </div>
      )}

      {categories.map((category) => (
        <section key={category.id} id={`category-${category.id}`} className="mt-10 scroll-mt-6">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h2 className="text-ink text-xl font-semibold tracking-tight">{category.name}</h2>
            <div className="flex gap-4">
              <Link href={`/admin/product-pages/categories/${category.id}`} className={link}>
                Edit the category page
              </Link>
              <a href={`/products/${category.slug}`} target="_blank" rel="noreferrer" className={link}>
                See it ↗
              </a>
            </div>
          </div>
          <p className="text-body mt-1 text-sm">{category.headline}</p>
          <Panel className="divide-border/70 mt-4 divide-y">
            {category.subcategories.map((page, i) => (
              <div
                key={page.id}
                id={`page-${page.id}`}
                className="flex scroll-mt-6 flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className={`min-w-0 ${page.published ? "" : "opacity-60"}`}>
                  <p className="text-ink font-medium">
                    {page.name}
                    {!page.published && <HiddenPill />}
                  </p>
                  <p className="text-body text-sm">
                    {page._count.products} {page._count.products === 1 ? "product" : "products"} ·{" "}
                    <a href={`/products/${category.slug}/${page.slug}`} target="_blank" rel="noreferrer" className="hover:text-ink underline">
                      /products/{category.slug}/{page.slug}
                    </a>
                  </p>
                </div>
                <RowActions
                  editHref={`/admin/product-pages/${page.id}`}
                  name="this page"
                  first={i === 0}
                  last={i === category.subcategories.length - 1}
                  published={page.published}
                  move={movePage.bind(null, page.id)}
                  setPublished={setPagePublished.bind(null, page.id)}
                  remove={deletePage.bind(null, page.id)}
                />
              </div>
            ))}
            <div className="p-4">
              <Link href={`/admin/product-pages/new?category=${category.id}`} className={link}>
                + Add a product page to {category.name}
              </Link>
            </div>
          </Panel>
        </section>
      ))}
    </>
  );
}
