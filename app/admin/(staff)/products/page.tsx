import type { Metadata } from "next";
import { FormMessage } from "@/components/admin/auth-card";
import { HiddenPill, PageHeader, Panel } from "@/components/admin/fields";
import { RowActions } from "@/components/admin/row-actions";
import { requireStaff } from "@/lib/auth";
import { ADMIN_ORDER } from "@/lib/admin/order";
import { db } from "@/lib/db";
import { deleteProduct, moveProduct, setProductPublished } from "./actions";

export const metadata: Metadata = { title: "Products" };

/** Every product, page by page in the site's order, under its category. */
export default async function ProductsAdminPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  await requireStaff();
  const [categories, { saved }] = await Promise.all([
    db!.category.findMany({
      orderBy: { sortOrder: "asc" },
      include: {
        subcategories: {
          orderBy: ADMIN_ORDER,
          include: { products: { orderBy: ADMIN_ORDER } },
        },
      },
    }),
    searchParams,
  ]);
  const pages = categories.flatMap((category) => category.subcategories);
  const total = pages.reduce((sum, page) => sum + page.products.length, 0);

  return (
    <>
      <PageHeader
        title="Products"
        intro={`The ${total} products on the ${pages.length} product pages, in the site's order. Hidden products stay here but don't show on the site.`}
        back={{ href: "/admin", label: "Content" }}
        action={{ href: "/admin/products/new", label: "Add a product" }}
      />
      {saved && (
        <div className="mt-6">
          <FormMessage tone="ok">Saved. The product page, the PRODUCTS menu and the site search show the change now.</FormMessage>
        </div>
      )}

      <nav aria-label="Product pages" className="mt-8 space-y-3">
        {categories.map((category) => (
          <div key={category.id} className="flex flex-col gap-2 sm:flex-row sm:items-baseline">
            <p className="text-body w-36 shrink-0 text-xs font-medium tracking-wide uppercase">{category.name}</p>
            <div className="flex flex-wrap gap-2">
              {category.subcategories.map((page) => (
                <a
                  key={page.id}
                  href={`#page-${page.id}`}
                  className="border-border text-ink hover:border-ink rounded-full border bg-white px-4 py-1.5 text-sm font-medium transition-colors"
                >
                  {page.name} <span className="text-body font-normal">({page.products.length})</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {categories.map((category) =>
        category.subcategories.map((page) => (
          <section key={page.id} id={`page-${page.id}`} className="mt-10 scroll-mt-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h2 className="text-ink text-xl font-semibold tracking-tight">
                <span className="text-body font-normal">{category.name} › </span>
                {page.name}
                {!page.published && <HiddenPill />}
              </h2>
              <a
                href={`/products/${category.slug}/${page.slug}`}
                target="_blank"
                rel="noreferrer"
                className="text-sea text-sm font-semibold"
              >
                See the page ↗
              </a>
            </div>
            <Panel className="divide-border/70 mt-4 divide-y">
              {page.products.length === 0 && <p className="text-body p-6 text-sm">No products on this page.</p>}
              {page.products.map((product, i) => (
                <div key={product.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className={`flex min-w-0 items-center gap-4 ${product.published ? "" : "opacity-60"}`}>
                    {product.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={product.image} alt="" className="bg-surface-soft h-14 w-[4.7rem] shrink-0 rounded-lg object-cover" />
                    ) : (
                      <div className="bg-surface-soft text-body/70 flex h-14 w-[4.7rem] shrink-0 items-center justify-center rounded-lg text-[10px]">
                        No photo
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-ink font-medium">
                        {product.name}
                        {product.bestSeller && (
                          <span className="text-ink ml-2 rounded-full bg-amber-400 px-2 py-0.5 align-middle text-xs font-medium">
                            Best Seller
                          </span>
                        )}
                        {!product.published && <HiddenPill />}
                      </p>
                      <p className="text-body truncate text-sm">
                        {[product.tag, product.sheet ? "spec sheet" : "no spec sheet"].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                  </div>
                  <RowActions
                    editHref={`/admin/products/${product.id}`}
                    copyHref={`/admin/products/new?from=${product.id}`}
                    name="this product"
                    first={i === 0}
                    last={i === page.products.length - 1}
                    published={product.published}
                    move={moveProduct.bind(null, product.id)}
                    setPublished={setProductPublished.bind(null, product.id)}
                    remove={deleteProduct.bind(null, product.id)}
                  />
                </div>
              ))}
            </Panel>
          </section>
        ))
      )}
    </>
  );
}
