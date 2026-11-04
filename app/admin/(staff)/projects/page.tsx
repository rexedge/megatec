import type { Metadata } from "next";
import { FormMessage } from "@/components/admin/auth-card";
import { HiddenPill, PageHeader, Panel } from "@/components/admin/fields";
import { RowActions } from "@/components/admin/row-actions";
import { requireStaff } from "@/lib/auth";
import { ADMIN_ORDER } from "@/lib/admin/order";
import { db } from "@/lib/db";
import { deleteProject, moveProject, setProjectPublished } from "./actions";

export const metadata: Metadata = { title: "Projects" };

function Where({ on, children }: { on: boolean; children: React.ReactNode }) {
  return on ? <span className="bg-hero-tint text-sea rounded-full px-2 py-0.5 text-xs font-medium">{children}</span> : null;
}

/** The projects on the homepage and the Projects & Installations page, in their order. */
export default async function ProjectsAdminPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  await requireStaff();
  const [rows, { saved }] = await Promise.all([db!.project.findMany({ orderBy: ADMIN_ORDER }), searchParams]);

  return (
    <>
      <PageHeader
        title="Projects"
        intro="Installations shown on the homepage and on the Projects & Installations page, in this order. Each project says which of the two it appears on."
        back={{ href: "/admin", label: "Content" }}
        action={{ href: "/admin/projects/new", label: "Add a project" }}
      />
      {saved && (
        <div className="mt-6">
          <FormMessage tone="ok">Saved. The site shows the change now.</FormMessage>
        </div>
      )}
      <Panel className="divide-border/70 mt-8 divide-y">
        {rows.length === 0 && <p className="text-body p-8 text-center">No projects yet.</p>}
        {rows.map((row, i) => (
          <div key={row.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className={`flex min-w-0 items-center gap-4 ${row.published ? "" : "opacity-60"}`}>
              {row.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={row.image} alt="" className="bg-surface-soft h-16 w-24 shrink-0 rounded-lg object-cover" />
              ) : (
                <div className="bg-accent text-body flex h-16 w-24 shrink-0 items-center justify-center rounded-lg text-xs">
                  No photo
                </div>
              )}
              <div className="min-w-0">
                <p className="text-ink font-medium">
                  {row.name}
                  {row.location && <span className="text-body font-normal">, {row.location}</span>}
                  {!row.published && <HiddenPill />}
                </p>
                <p className="text-body mt-0.5 text-sm">{(row.categories as string[]).join(" · ")}</p>
                <p className="mt-1.5 flex flex-wrap gap-1.5">
                  <Where on={row.onHome}>Homepage</Where>
                  <Where on={row.onProjectsPage}>Projects page</Where>
                </p>
              </div>
            </div>
            <RowActions
              editHref={`/admin/projects/${row.id}`}
              name="this project"
              first={i === 0}
              last={i === rows.length - 1}
              published={row.published}
              move={moveProject.bind(null, row.id)}
              setPublished={setProjectPublished.bind(null, row.id)}
              remove={deleteProject.bind(null, row.id)}
            />
          </div>
        ))}
      </Panel>
    </>
  );
}
