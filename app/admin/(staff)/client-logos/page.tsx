import type { Metadata } from "next";
import { FormMessage } from "@/components/admin/auth-card";
import { HiddenPill, PageHeader, Panel } from "@/components/admin/fields";
import { RowActions } from "@/components/admin/row-actions";
import { requireStaff } from "@/lib/auth";
import { ADMIN_ORDER } from "@/lib/admin/order";
import { db } from "@/lib/db";
import { deleteLogo, moveLogo, setLogoPublished } from "./actions";

export const metadata: Metadata = { title: "Client logos" };

/** The client logos under the homepage's hero, in the order they scroll past. */
export default async function ClientLogosPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  await requireStaff();
  const [rows, { saved }] = await Promise.all([db!.clientLogo.findMany({ orderBy: ADMIN_ORDER }), searchParams]);

  return (
    <>
      <PageHeader
        title="Client logos"
        intro="The logos that scroll past under the homepage's headline, in this order."
        back={{ href: "/admin", label: "Content" }}
        action={{ href: "/admin/client-logos/new", label: "Add a logo" }}
      />
      {saved && (
        <div className="mt-6">
          <FormMessage tone="ok">Saved. The homepage shows the change now.</FormMessage>
        </div>
      )}
      <Panel className="divide-border/70 mt-8 divide-y">
        {rows.length === 0 && <p className="text-body p-8 text-center">No logos yet.</p>}
        {rows.map((row, i) => (
          <div key={row.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <div className="bg-surface-soft flex h-16 w-36 shrink-0 items-center justify-center rounded-lg p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={row.image} alt="" className={`max-h-12 max-w-full object-contain ${row.published ? "" : "opacity-50"}`} />
              </div>
              <p className="text-ink font-medium">
                {row.name}
                {!row.published && <HiddenPill />}
              </p>
            </div>
            <RowActions
              editHref={`/admin/client-logos/${row.id}`}
              name="this logo"
              first={i === 0}
              last={i === rows.length - 1}
              published={row.published}
              move={moveLogo.bind(null, row.id)}
              setPublished={setLogoPublished.bind(null, row.id)}
              remove={deleteLogo.bind(null, row.id)}
            />
          </div>
        ))}
      </Panel>
    </>
  );
}
