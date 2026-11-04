import type { Metadata } from "next";
import { FormMessage } from "@/components/admin/auth-card";
import { HiddenPill, PageHeader, Panel } from "@/components/admin/fields";
import { RowActions } from "@/components/admin/row-actions";
import { requireStaff } from "@/lib/auth";
import { ADMIN_ORDER } from "@/lib/admin/order";
import { db } from "@/lib/db";
import { deleteTestimonial, moveTestimonial, setTestimonialPublished } from "./actions";

export const metadata: Metadata = { title: "Testimonials" };

/** The homepage's customer quotes, in the order the homepage shows them. */
export default async function TestimonialsPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  await requireStaff();
  const [rows, { saved }] = await Promise.all([
    db!.testimonial.findMany({ orderBy: ADMIN_ORDER }),
    searchParams,
  ]);

  return (
    <>
      <PageHeader
        title="Testimonials"
        intro="The customer quotes on the homepage, in this order. Hidden quotes stay here but don't show on the site."
        back={{ href: "/admin", label: "Content" }}
        action={{ href: "/admin/testimonials/new", label: "Add a quote" }}
      />

      {saved && (
        <div className="mt-6">
          <FormMessage tone="ok">Saved. The homepage shows the change now.</FormMessage>
        </div>
      )}

      {rows.length === 0 ? (
        <Panel className="mt-8 p-8 text-center">
          <p className="text-body">No quotes yet. The homepage leaves out its testimonials section until there is one.</p>
        </Panel>
      ) : (
        <Panel className="divide-border/70 mt-8 divide-y">
          {rows.map((row, i) => (
            <div key={row.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 max-w-2xl">
                <p className={`text-ink line-clamp-3 leading-relaxed ${row.published ? "" : "opacity-60"}`}>
                  &ldquo;{row.quote}&rdquo;
                </p>
                <p className="text-body mt-1.5 text-sm">
                  {row.company ?? <span className="italic">No name given</span>}
                  {!row.published && <HiddenPill />}
                </p>
              </div>
              <RowActions
                editHref={`/admin/testimonials/${row.id}`}
                name="this quote"
                first={i === 0}
                last={i === rows.length - 1}
                published={row.published}
                move={moveTestimonial.bind(null, row.id)}
                setPublished={setTestimonialPublished.bind(null, row.id)}
                remove={deleteTestimonial.bind(null, row.id)}
              />
            </div>
          ))}
        </Panel>
      )}
    </>
  );
}
