import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { AddStaffForm, StaffRow } from "./staff-forms";

export const metadata: Metadata = { title: "Staff" };

/** Who can sign in to the admin. Admins only. */
export default async function StaffPage() {
  const { user: me } = await requireAdmin();
  const staff = await db!.user.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      sessions: { select: { createdAt: true }, orderBy: { createdAt: "desc" }, take: 1 },
    },
  });

  return (
    <>
      <h1 className="text-ink text-3xl font-semibold tracking-tight">Staff</h1>
      <p className="text-body mt-2 max-w-2xl">
        Everyone here can sign in and change the website&apos;s content. Admins can also add
        and remove staff. A new person gets an email with a link to choose their own password.
      </p>

      <section className="border-border/70 mt-8 rounded-2xl border bg-white p-5 sm:p-6">
        <h2 className="text-ink text-lg font-semibold tracking-tight">Add a member of staff</h2>
        <AddStaffForm />
      </section>

      <ul className="border-border/70 mt-8 divide-y divide-border/70 rounded-2xl border bg-white">
        {staff.map((person) => (
          <StaffRow
            key={person.id}
            id={person.id}
            name={person.name}
            email={person.email}
            role={person.role === "admin" ? "admin" : "user"}
            lastSignIn={person.sessions[0]?.createdAt.toISOString() ?? null}
            isMe={person.id === me.id}
          />
        ))}
      </ul>
    </>
  );
}
