import type { Metadata } from "next";
import { FormMessage } from "@/components/admin/auth-card";
import { HiddenPill, PageHeader, Panel } from "@/components/admin/fields";
import { RowActions } from "@/components/admin/row-actions";
import { requireStaff } from "@/lib/auth";
import { ADMIN_ORDER } from "@/lib/admin/order";
import { db } from "@/lib/db";
import { deletePart, movePart, setPartPublished } from "./actions";

export const metadata: Metadata = { title: "Spare parts" };

/** The Station Accessories spare parts list, group by group, in the site's order. */
export default async function SparePartsAdminPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  await requireStaff();
  const [groups, { saved }] = await Promise.all([
    db!.partGroup.findMany({
      orderBy: { sortOrder: "asc" },
      include: { parts: { orderBy: ADMIN_ORDER } },
    }),
    searchParams,
  ]);
  const total = groups.reduce((sum, group) => sum + group.parts.length, 0);

  return (
    <>
      <PageHeader
        title="Spare parts"
        intro={`The ${total} parts on the Station Accessories page, in its groups and order. Hidden parts stay here but don't show on the site.`}
        back={{ href: "/admin", label: "Content" }}
        action={{ href: "/admin/spare-parts/new", label: "Add a part" }}
      />
      {saved && (
        <div className="mt-6">
          <FormMessage tone="ok">Saved. The Station Accessories page shows the change now.</FormMessage>
        </div>
      )}

      <nav aria-label="Groups" className="mt-8 flex flex-wrap gap-2">
        {groups.map((group) => (
          <a
            key={group.id}
            href={`#group-${group.id}`}
            className="border-border text-ink hover:border-ink rounded-full border bg-white px-4 py-1.5 text-sm font-medium transition-colors"
          >
            {group.label} <span className="text-body font-normal">({group.parts.length})</span>
          </a>
        ))}
      </nav>

      {groups.map((group) => (
        <section key={group.id} id={`group-${group.id}`} className="mt-10 scroll-mt-6">
          <h2 className="text-ink text-xl font-semibold tracking-tight">{group.label}</h2>
          <Panel className="divide-border/70 mt-4 divide-y">
            {group.parts.length === 0 && <p className="text-body p-6 text-sm">No parts in this group.</p>}
            {group.parts.map((part, i) => (
              <div key={part.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className={`flex min-w-0 items-center gap-4 ${part.published ? "" : "opacity-60"}`}>
                  {part.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={part.image} alt="" className="bg-surface-soft h-14 w-14 shrink-0 rounded-lg object-contain p-1" />
                  ) : (
                    <div className="bg-surface-soft text-body/70 flex h-14 w-14 shrink-0 items-center justify-center rounded-lg text-[10px]">
                      No photo
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-ink font-medium">
                      {part.name}
                      {!part.published && <HiddenPill />}
                    </p>
                    <p className="text-body text-sm">
                      {part.fit}
                      {part.href && <span className="text-body/70"> · links to {part.href}</span>}
                    </p>
                  </div>
                </div>
                <RowActions
                  editHref={`/admin/spare-parts/${part.id}`}
                  name="this part"
                  first={i === 0}
                  last={i === group.parts.length - 1}
                  published={part.published}
                  move={movePart.bind(null, part.id)}
                  setPublished={setPartPublished.bind(null, part.id)}
                  remove={deletePart.bind(null, part.id)}
                />
              </div>
            ))}
          </Panel>
        </section>
      ))}
    </>
  );
}
